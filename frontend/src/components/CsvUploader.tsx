import React, { useRef, useState } from 'react';
import api from '../api/api';

const CsvUploader: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    const file = fileInput.current?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await api.post('/api/files', formData);
        if (response.status === 200) {
          setMessage('File uploaded successfully!');
        } else {
            setMessage(`Error during CSV upload. ${response.data.error}`);
        }
      } catch (error) {
        setMessage('Error uploading file. Please try again.');
      }
    }
  };

  return (
    <div>
      <label htmlFor="csvFile">File Input:</label>
      <input id="csvFile" type="file" ref={fileInput} placeholder="input file" />
      <button onClick={handleUpload}>Upload CSV</button>
      <div className="message">{message}</div>
    </div>
  );
};

export default CsvUploader;

