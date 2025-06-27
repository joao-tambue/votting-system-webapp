import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  backdrop?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = "Carregando...",
  backdrop = true,
  size = "lg",
}) => {
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${
        backdrop ? "bg-black bg-opacity-50" : ""
      }`}
    >
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <LoadingSpinner size={size} color="primary" />
          </div>
          <p className="text-gray-700 font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
