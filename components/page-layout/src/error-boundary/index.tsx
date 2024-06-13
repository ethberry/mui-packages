import React, { Component, ErrorInfo, ReactNode } from "react";
import { IconButton } from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { FormattedMessage } from "react-intl";

import { StyledAlert, StyledError, StyledPreBottom, StyledPreTop, StyledPreWrapper } from "./styled";

interface IProps {
  children?: ReactNode;
}

interface IState {
  hasError: boolean;
  error: Error | null;
  errorInfo?: ErrorInfo | null;
}

/* javascript-obfuscator:disable */
const nodeEnv = process.env.NODE_ENV;
/* javascript-obfuscator:enable */

export class ErrorBoundary extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): IState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
    console.error("Uncaught error:", error, errorInfo);
  }

  reloadPage = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <StyledError>
          <StyledAlert
            severity="error"
            action={
              <IconButton size="small" onClick={this.reloadPage}>
                <Refresh />
              </IconButton>
            }
          >
            <FormattedMessage id={`alert.${nodeEnv !== "production" ? "uncaughtError" : "knownError"}`} />
          </StyledAlert>
          {nodeEnv !== "production" ? (
            <StyledPreWrapper>
              <StyledPreTop component="pre">{this.state.error?.toString() || ""}</StyledPreTop>
              <StyledPreBottom component="pre">
                {this.state.errorInfo?.componentStack?.toString() || ""}
              </StyledPreBottom>
            </StyledPreWrapper>
          ) : null}
        </StyledError>
      );
    }

    return this.props.children;
  }
}
