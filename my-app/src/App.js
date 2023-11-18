import React, { useState } from "react";
import axios from "axios";

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const defaultFileName = "Data_1.xlsx"; // Default file name

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("uploadFile", file);

      const response = await axios.post(
        "http://localhost:5000/uploadConfigExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.status === 1) {
        setUploadStatus("File uploaded successfully!");
        // Set default file name after successful upload
        setFile(new File([file], defaultFileName, { type: file.type }));
        console.log("Server response data:", response.data); // Log server response
      } else {
        setUploadStatus("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file: ", error);
      setUploadStatus("Error uploading file.");
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUploader;
