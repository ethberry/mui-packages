/**
 * Taken, CommonJS-ified, and heavily modified from:
 * https://github.com/flyingsparx/NodeDirectUploader
 */

import mime from "mime-types";

export function getFileMimeType(file: File) {
  return file.type || mime.lookup(file.name) || "";
}

export interface IS3Response {
  signedUrl: string;
  publicUrl: string;
  filename: string;
  fileKey: string;
  headers: Record<string, string>;
}

export interface IS3ErrorContext {
  response: string;
  status: number;
  statusText: string;
  readyState: number;
}

export interface IS3UploadOptions {
  files: Array<File>;
  withCredentials?: boolean;
  getSignedUrl?: (file: File, signResult: any) => string;
  signingUrlQueryParams?: Record<string, string> | (() => Record<string, string>);
  signingUrlHeaders?: Record<string, string> | (() => Record<string, string>);
  uploadRequestHeaders?: Record<string, string>;
  onFinishS3Put?: (signResult: any, file: File) => void;
  s3path: string;
  signingUrlMethod: string;
  signingUrl: string;
  server: string;
  contentDisposition: "inline" | "attachment" | "auto";
}

const defaults: IS3UploadOptions = {
  server: "",
  signingUrl: "/sign-s3",
  signingUrlMethod: "GET",
  files: [],
  s3path: "",
  contentDisposition: "auto",
};

export class S3Upload {
  options: IS3UploadOptions;
  httprequest: null | XMLHttpRequest;
  successResponses = [200, 201];

  constructor(options: Partial<IS3UploadOptions> = {}) {
    this.options = Object.assign({}, defaults, options);

    this.handleFileSelect(this.options.files);
  }

  onFinishS3Put(signResult: IS3Response, _file: File) {
    return console.info("base.onFinishS3Put()", signResult.publicUrl);
  }

  preprocess(file: File, next: (file: File) => void) {
    console.info("base.preprocess()", file);
    return next(file);
  }

  onProgress(percent: number, status: string, _file: File) {
    return console.info("base.onProgress()", percent, status);
  }

  onError(status: string, _file: File, _context?: IS3ErrorContext) {
    return console.info("base.onError()", status);
  }

  onSignedUrl(_result: any) {}

  scrubFilename(filename: string) {
    return filename.replace(/[^\w\d_\-.]+/gi, "");
  }

  handleFileSelect(files: Array<File>) {
    files.forEach((file: File) => {
      this.preprocess(file, (processedFile: File) => {
        this.onProgress(0, "Waiting", processedFile);
        this.uploadFile(processedFile);
      });
    });
  }

  createCORSRequest(method: string, url: string, opts: Partial<IS3UploadOptions> = {}) {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    if (opts.withCredentials !== void 0) {
      xhr.withCredentials = opts.withCredentials;
    }

    return xhr;
  }

  _getErrorRequestContext(xhr: XMLHttpRequest): IS3ErrorContext {
    return {
      response: xhr.responseText,
      status: xhr.status,
      statusText: xhr.statusText,
      readyState: xhr.readyState,
    };
  }

  executeOnSignedUrl(file: File, callback: (result: IS3Response) => void) {
    const fileName = this.scrubFilename(file.name);
    let queryString = "?objectName=" + fileName + "&contentType=" + encodeURIComponent(getFileMimeType(file));
    if (this.options.s3path) {
      queryString += "&path=" + encodeURIComponent(this.options.s3path);
    }
    if (this.options.signingUrlQueryParams) {
      const signingUrlQueryParams =
        typeof this.options.signingUrlQueryParams === "function"
          ? this.options.signingUrlQueryParams()
          : this.options.signingUrlQueryParams;
      Object.keys(signingUrlQueryParams).forEach(function (key) {
        const val = signingUrlQueryParams[key];
        queryString += "&" + key + "=" + val;
      });
    }
    const xhr = this.createCORSRequest(
      this.options.signingUrlMethod,
      this.options.server + this.options.signingUrl + queryString,
      {
        withCredentials: this.options.withCredentials,
      },
    );
    if (this.options.signingUrlHeaders) {
      const signingUrlHeaders =
        typeof this.options.signingUrlHeaders === "function"
          ? this.options.signingUrlHeaders()
          : this.options.signingUrlHeaders;
      Object.keys(signingUrlHeaders).forEach(function (key) {
        const val = signingUrlHeaders[key];
        xhr.setRequestHeader(key, val);
      });
    }

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType("text/plain; charset=x-user-defined");
    }

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && this.successResponses.indexOf(xhr.status) >= 0) {
        let result;
        try {
          result = JSON.parse(xhr.responseText);
          this.onSignedUrl(result);
        } catch (error) {
          this.onError("Invalid response from server", file, this._getErrorRequestContext(xhr));
          return false;
        }
        return callback(result);
      } else if (xhr.readyState === 4 && this.successResponses.indexOf(xhr.status) < 0) {
        return this.onError(
          `Could not contact request signing server. Status = ${xhr.status}`,
          file,
          this._getErrorRequestContext(xhr),
        );
      }
    };

    return xhr.send();
  }

  uploadToS3(file: File, signResult: IS3Response) {
    const xhr = this.createCORSRequest("PUT", signResult.signedUrl);
    if (!xhr) {
      this.onError("CORS not supported", file);
    } else {
      xhr.onload = () => {
        if (this.successResponses.indexOf(xhr.status) >= 0) {
          this.onProgress(100, "Upload completed", file);
          return this.onFinishS3Put(signResult, file);
        } else {
          return this.onError(`Upload error: ${xhr.status}`, file, this._getErrorRequestContext(xhr));
        }
      };
      xhr.onerror = () => {
        return this.onError("XHR error", file, this._getErrorRequestContext(xhr));
      };
      xhr.upload.onprogress = e => {
        let percentLoaded;
        if (e.lengthComputable) {
          percentLoaded = Math.round((e.loaded / e.total) * 100);
          return this.onProgress(percentLoaded, percentLoaded === 100 ? "Finalizing" : "Uploading", file);
        }
      };
    }

    const headers: Record<string, string> = {};
    headers["content-type"] = getFileMimeType(file);

    if (this.options.contentDisposition) {
      let disposition = this.options.contentDisposition;
      if (disposition === "auto") {
        if (getFileMimeType(file).substr(0, 6) === "image/") {
          disposition = "inline";
        } else {
          disposition = "attachment";
        }
      }

      const fileName = this.scrubFilename(file.name);
      headers["content-disposition"] = `${disposition}; filename="${fileName}"`;
    }
    if (!this.options.uploadRequestHeaders) {
      Object.assign(headers, {
        "x-amz-acl": "public-read",
      });
    } else {
      Object.assign(headers, this.options.uploadRequestHeaders);
    }

    Object.assign(headers, signResult.headers);

    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key.toLowerCase(), value);
    });

    this.httprequest = xhr;
    return xhr.send(file);
  }

  uploadFile(file: File) {
    const uploadToS3Callback = this.uploadToS3.bind(this, file);

    if (this.options.getSignedUrl) {
      this.options.getSignedUrl(file, (signResult: any) => {
        this.uploadToS3(file, signResult);
      });
    }

    this.executeOnSignedUrl(file, uploadToS3Callback);
  }

  abortUpload() {
    if (this.httprequest) {
      this.httprequest.abort();
    }
  }
}
