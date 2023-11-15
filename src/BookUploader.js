import React, { useState } from "react";

const BookUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onUpload(file);
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
};

export default BookUploader;
