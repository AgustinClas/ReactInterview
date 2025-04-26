import React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg p-8 relative">
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-primary-light border-opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
