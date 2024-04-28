import { useState } from 'react';
import { CSVImporter } from 'csv-import-react';
//To install use npm install csv-import-react

// CUSTOM COMPONENTS
import NavBar from '../../../AccessoryComponents/Nav/Nav';

export default function FileUploadPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [fileHeaders, setFileHeaders] = useState([]);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const headers = content.trim().split('\n')[0].split(',');
      setFileHeaders(headers);
      setIsOpen(true);
    };
    reader.readAsText(file);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setFileHeaders([]);
  };

  return (
    <>
      <NavBar />
      <h1>File Upload Page</h1>
      <input
        type="file"
        onChange={(e) => handleFileChange(e.target.files[0])}
      />

      <CSVImporter
        modalIsOpen={isOpen}
        modalOnCloseTriggered={handleCloseModal}
        onComplete={(data) => console.log(data)}
        template={{
          columns: fileHeaders.map((header) => ({
            name: header.trim(), // Use header as column name
            key: header.trim().toLowerCase().replace(/\s+/g, '_'), // Generate key based on header
            description: `The ${header.trim()} field in the CSV`, // Description based on header
            suggested_mappings: [header.trim()], // Suggested mappings based on header
          })),
        }}
      />
    </>
  );
}
