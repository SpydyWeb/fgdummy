import React, { useState } from 'react';
import { Modal, Input, Upload, Button, Typography, message } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';

const { Dragger } = Upload;
const { Title } = Typography;

const UploadFileModal = ({ visible, onClose,selectedFiles,setSelectedFiles,setUploadVisible }) => {
  const [batchId, setBatchId] = useState('');
  const [fileList, setFileList] = useState([]);

  

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
    >
     <div
  style={{
    border: '1px solid ',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  }}
>
  {/* Header */}
  <h2
    style={{
      // borderBottom: '1px solid',
      color:'#c21b17',
      paddingBottom: '20px',
      marginBottom: '20px',
      fontWeight: 'normal', // Removed bold
    }}
  >
    Upload File
  </h2>

  {/* Label */}
  <div
    style={{
      textAlign: 'left',
      marginBottom: '5px',
      borderRadius: '10px',
    }}
    rules={[
      {
        pattern: /^\d+$/,
        message: 'Only numbers are allowed',
      },
    ]}
  >
    Batch ID
  </div>

  {/* Input */}
  <input
  type="text"
  placeholder="Enter Text: Numeric"
  style={{
    width: '100%',
    padding: '10px',
    border: '1px solid',
    fontSize: '14px',
    marginBottom: '20px',
    borderRadius: '10px',
  }}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }}
/>


  {/* Upload Box */}
  <div
    style={{
      border: '1px solid ',
      padding: '30px 10px',
      marginBottom: '20px',
      cursor: 'pointer',
      borderRadius: '10px',
    }}
  >
 <Upload.Dragger
  name="file"
  multiple={true}
  showUploadList={false}
  style={{ border: 'none' }}
  beforeUpload={(file, fileList) => {
    // Combine previously selected files with new ones (avoid duplicates if needed)
    const updatedFiles = [...selectedFiles, ...fileList];

    // Optionally remove duplicate file names
    const uniqueFiles = Array.from(
      new Map(updatedFiles.map(f => [f.name, f])).values()
    );

    setSelectedFiles(uniqueFiles);
    return false; // Prevent auto-upload
  }}
>
  <div>
    <UploadOutlined style={{ fontSize: '32px', color: '#595959' }} />
    <div style={{ marginTop: '10px', fontSize: '14px', color: '#595959' }}>
      Choose files or Drag them here
    </div>

    {selectedFiles.length > 0 && (
      <div style={{ marginTop: '15px', textAlign: 'left' }}>
        <strong>Total Files:</strong> {selectedFiles.length}
        <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
          {selectedFiles.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</Upload.Dragger>


    {/* <Upload.Dragger
      name="file"
      multiple={false}
      showUploadList={false}
      style={{ border: 'none' }}
      customRequest={({ file, onSuccess }) => {
        console.log(file);
        setTimeout(() => onSuccess('ok'), 1000);
      }}
    >
      <div>
        <UploadOutlined style={{ fontSize: '32px', color: '#595959' }} />
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#595959' }}>
          Choose a file or Drag it here
        </div>
      </div>
    </Upload.Dragger> */}
  </div>

  {/* Upload Button */}
  <Button
    type="primary"
    style={{
      backgroundColor: '#c21b17',
      borderColor: '#c21b17',
      color: '#fff',
      width: '100%',
      height: '40px',
      fontSize: '16px',
      borderRadius: '6px',
      fontWeight: 'normal', // Removed bold
    }}
    onClick={() => {
      if (selectedFiles.length === 0) {
        message.warning("Please select at least one file.");
        return;
      }
  
      // Handle file upload logic here
      // For example, call your API or store them locally
      console.log("Uploading files:", selectedFiles);
  
      // Clear the file list if you want
      setSelectedFiles([]);
  
      // Close the modal
      setUploadVisible(false);
    }}
  >
    Upload
  </Button>
</div>
    </Modal>
  );
};

export default UploadFileModal;
