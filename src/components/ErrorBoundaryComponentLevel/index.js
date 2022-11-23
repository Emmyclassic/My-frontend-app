import { Button } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { GiBrokenPottery } from "react-icons/gi";

class ErrorBoundaryComponentLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      netWorkError: false,
      buttonText: this.props.buttonText,
    };
    this._handleButtonClick = this._handleButtonClick.bind(this);
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("error", error);
    console.log("info", errorInfo);
    // logErrorToMyService(error, errorInfo);
  }

  _handleButtonClick() {
    this.props.handleButtonClick
      ? this.props.handleButtonClick()
      : window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="error-b-c-l">
          <GiBrokenPottery size={100} style={{ alignSelf: "center" }} />
          <p>{this.props.errorMessageText}</p>
          <Button
            value={this.state.buttonText}
            onClick={this._handleButtonClick}
          />
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

ErrorBoundaryComponentLevel.defaultProps = {
  buttonText: "Try again",
  errorMessageText: "Something went wrong",
};

ErrorBoundaryComponentLevel.propTypes = {
  handleButtonClick: PropTypes.func,
  buttonText: PropTypes.string,
  errorMessageText: PropTypes.string,
};

export const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div
      role="alert"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        paddingTop: "30px",
      }}
    >
      <GiBrokenPottery
        size={100}
        style={{ alignSelf: "center" }}
        color="#ef3125"
      />
      <p>Something went wrong:</p>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
};
export default ErrorBoundaryComponentLevel;
