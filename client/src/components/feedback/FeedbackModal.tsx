import "./FeedbackModal.css";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";

interface FeedbackModalProps {
  type: "loading" | "success" | "error" | "info";
  title: string;
  message?: string;
  onClose?: () => void;
  onRetry?: () => void;
}

function FeedbackModal({ type, title, message, onClose, onRetry }: FeedbackModalProps) {
  const renderIcon = () => {
    if (type === "loading") {
      return <div className="feedback-spinner" aria-hidden="true" />;
    }

    if (type === "success") {
      return (
        <div className="feedback-icon feedback-icon-success">
          <CheckCircle2 size={28} aria-hidden="true" />
        </div>
      );
    }

    if (type === "error") {
      return (
        <div className="feedback-icon feedback-icon-error">
          <AlertCircle size={28} aria-hidden="true" />
        </div>
      );
    }

    return (
      <div className="feedback-icon feedback-icon-info">
        <Info size={28} aria-hidden="true" />
      </div>
    );
  };

  return (
    <div className="feedback-overlay">
      <div
        className="feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
      >
        {renderIcon()}
        {/* {type === "loading" && <div className="feedback-spinner" aria-hidden="true" />} */}
        <h2 id="feedback-modal-title">{title}</h2>
        {message && <p>{message}</p>}
        {type !== "loading" && (onClose || onRetry) && (
          <button type="button" onClick={onRetry ?? onClose}>
            {onRetry ? "Retry" : "Close"}
          </button>
        )}
      </div>
    </div>
  );
}

export default FeedbackModal;
