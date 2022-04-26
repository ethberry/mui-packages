/**
 * Taken, CommonJS-ified, and heavily modified from:
 * https://github.com/flyingsparx/NodeDirectUploader
 */

import mime from "mime-types";

export function getFileMimeType(file) {
  return file.type || mime.lookup(file.name);
}

export function S3Upload(options) {
  if (options == null) {
    options = {};
  }
  for (const option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      this[option] = options[option];
    }
  }
  const files = this.fileElement ? this.fileElement.files : this.files || [];
  this.handleFileSelect(files);
}

S3Upload.prototype.server = "";
S3Upload.prototype.signingUrl = "/sign-s3";
S3Upload.prototype.signingUrlMethod = "GET";
S3Upload.prototype.successResponses = [200, 201];
S3Upload.prototype.fileElement = null;
S3Upload.prototype.files = null;

S3Upload.prototype.onFinishS3Put = function (signResult, _file) {
  return console.info("base.onFinishS3Put()", signResult.publicUrl);
};

S3Upload.prototype.preprocess = function (file, next) {
  console.info("base.preprocess()", file);
  return next(file);
};

S3Upload.prototype.onProgress = function (percent, status, _file) {
  return console.info("base.onProgress()", percent, status);
};

S3Upload.prototype.onError = function (status, _file) {
  return console.info("base.onError()", status);
};

S3Upload.prototype.onSignedUrl = function (_result) {};

S3Upload.prototype.scrubFilename = function (filename) {
  return filename.replace(/[^\w\d_\-.]+/gi, "");
};

S3Upload.prototype.handleFileSelect = function (files) {
  const result = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    this.preprocess(
      file,
      function (processedFile) {
        this.onProgress(0, "Waiting", processedFile);
        result.push(this.uploadFile(processedFile));
        return result;
      }.bind(this),
    );
  }
};

S3Upload.prototype.createCORSRequest = function (method, url, opts = {}) {
  let xhr = new XMLHttpRequest();

  if (xhr.withCredentials != null) {
    xhr.open(method, url, true);
    if (opts.withCredentials != null) {
      xhr.withCredentials = opts.withCredentials;
    }
  } else if (typeof XDomainRequest !== "undefined") {
    // eslint-disable-next-line no-undef
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    xhr = null;
  }
  return xhr;
};

S3Upload.prototype._getErrorRequestContext = function (xhr) {
  return {
    response: xhr.responseText,
    status: xhr.status,
    statusText: xhr.statusText,
    readyState: xhr.readyState,
  };
};

S3Upload.prototype.executeOnSignedUrl = function (file, callback) {
  const fileName = this.scrubFilename(file.name);
  let queryString = "?objectName=" + fileName + "&contentType=" + encodeURIComponent(getFileMimeType(file));
  if (this.s3path) {
    queryString += "&path=" + encodeURIComponent(this.s3path);
  }
  if (this.signingUrlQueryParams) {
    const signingUrlQueryParams =
      typeof this.signingUrlQueryParams === "function" ? this.signingUrlQueryParams() : this.signingUrlQueryParams;
    Object.keys(signingUrlQueryParams).forEach(function (key) {
      const val = signingUrlQueryParams[key];
      queryString += "&" + key + "=" + val;
    });
  }
  const xhr = this.createCORSRequest(this.signingUrlMethod, this.server + this.signingUrl + queryString, {
    withCredentials: this.signingUrlWithCredentials,
  });
  if (this.signingUrlHeaders) {
    const signingUrlHeaders =
      typeof this.signingUrlHeaders === "function" ? this.signingUrlHeaders() : this.signingUrlHeaders;
    Object.keys(signingUrlHeaders).forEach(function (key) {
      const val = signingUrlHeaders[key];
      xhr.setRequestHeader(key, val);
    });
  }

  if (xhr.overrideMimeType) {
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
  }

  xhr.onreadystatechange = function () {
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
        "Could not contact request signing server. Status = " + xhr.status,
        file,
        this._getErrorRequestContext(xhr),
      );
    }
  }.bind(this);
  return xhr.send();
};

S3Upload.prototype.uploadToS3 = function (file, signResult) {
  const xhr = this.createCORSRequest("PUT", signResult.signedUrl);
  if (!xhr) {
    this.onError("CORS not supported", file, {});
  } else {
    xhr.onload = function () {
      if (this.successResponses.indexOf(xhr.status) >= 0) {
        this.onProgress(100, "Upload completed", file);
        return this.onFinishS3Put(signResult, file);
      } else {
        return this.onError("Upload error: " + xhr.status, file, this._getErrorRequestContext(xhr));
      }
    }.bind(this);
    xhr.onerror = function () {
      return this.onError("XHR error", file, this._getErrorRequestContext(xhr));
    }.bind(this);
    xhr.upload.onprogress = function (e) {
      let percentLoaded;
      if (e.lengthComputable) {
        percentLoaded = Math.round((e.loaded / e.total) * 100);
        return this.onProgress(percentLoaded, percentLoaded === 100 ? "Finalizing" : "Uploading", file);
      }
    }.bind(this);
  }

  const headers = {};
  headers["content-type"] = getFileMimeType(file);

  if (this.contentDisposition) {
    let disposition = this.contentDisposition;
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
  if (!this.uploadRequestHeaders) {
    xhr.setRequestHeader("x-amz-acl", "public-read");
  }
  [signResult.headers, this.uploadRequestHeaders].filter(Boolean).forEach(function (hdrs) {
    Object.entries(hdrs).forEach(function (pair) {
      headers[pair[0].toLowerCase()] = pair[1];
    });
  });
  Object.entries(headers).forEach(function (pair) {
    xhr.setRequestHeader(pair[0], pair[1]);
  });
  this.httprequest = xhr;
  return xhr.send(file);
};

S3Upload.prototype.uploadFile = function (file) {
  const uploadToS3Callback = this.uploadToS3.bind(this, file);

  if (this.getSignedUrl) {
    return this.getSignedUrl(file, uploadToS3Callback);
  }

  return this.executeOnSignedUrl(file, uploadToS3Callback);
};

S3Upload.prototype.abortUpload = function () {
  if (this.httprequest) {
    this.httprequest.abort();
  }
};
