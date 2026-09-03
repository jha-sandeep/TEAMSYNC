import "./PageFeedback.css";
import { AlertCircle, Info } from "lucide-react";

interface PageFeedbackProps {
  type: "loading" | "error" | "info";
  title: string;
  message?: string;
  onRetry?: () => void;
}

function PageFeedback({ type, title, message, onRetry }: PageFeedbackProps) {
  const renderIcon = () => {
    if (type === "loading") {
      return <div className="page-feedback-spinner" aria-hidden="true" />;
    }

    if (type === "error") {
      return (
        <div className="page-feedback-icon page-feedback-icon-error">
          <AlertCircle size={24} aria-hidden="true" />
        </div>
      );
    }

    return (
      <div className="page-feedback-icon page-feedback-icon-info">
        <Info size={24} aria-hidden="true" />
      </div>
    );
  };

  return (
    <div className="page-feedback">
      <div className="page-feedback-content">
        {renderIcon()}

        <h2>{title}</h2>

        {message && <p>{message}</p>}

        {type === "error" && onRetry && (
          <button type="button" className="page-feedback-button" onClick={onRetry}>
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export default PageFeedback;
