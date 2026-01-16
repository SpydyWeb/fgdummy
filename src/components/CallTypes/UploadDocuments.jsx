import React, { useRef, useState } from "react";
import { Input, Radio, Checkbox, Form, DatePicker,Row,Col,Select,Button,Collapse,Upload,message, TimePicker, Tooltip,Space } from "antd";

const UploadDocuments = (props) => {

  const {uploadDoc, setUploadDoc, docList, setDocList} = props;
    
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadDoc(file?.name);
        }
      };

      const handleFileSelectClick = () => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      };

      const addDocToListHandler = (item) => {
        if(item === null || item === undefined || item === ''){
            return null;
        }

        const listOfDocs = [
            ...docList,
            uploadDoc
        ]
        setDocList(listOfDocs);
        setUploadDoc("");
      };

      const deleteListItemHandler = (indexToDelete) => {
        const newList = docList.filter((_, index) => index !== indexToDelete);
        setDocList(newList);
      };      

    return (
            <>
              <div className="d-flex">
                <input 
                    className="upload-input" 
                    label='File Description'
                    placeholder="File Description"
                    value={uploadDoc}
                />

                <Button 
                    type="primary" 
                    className="primary-btn upload-button" 
                    onClick={handleFileSelectClick}
                >
                File Select
                </Button>

                <Button 
                    type="primary" 
                    className="primary-btn upload-button" 
                    onClick={() => addDocToListHandler(uploadDoc)}
                >
                Save
                </Button>

                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

              </div>
                <div className="upload-table">
                <table border className="table assistanceTable uploaded-table">
                  <thead>
                    <tr>
                      <th>Sr No</th>
                      <th>Document Name</th>
                      <th>{''}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                        docList.length > 0 ?
                        docList.map((item, index) => {
                            return  <tr key={index}>
                                      <td>{index + 1}</td>
                                      <td>{item}</td>
                                      <Button 
                                        onClick={() => deleteListItemHandler(index)}
                                        >
                                          <i class="bi bi-trash"></i>
                                      </Button>
                                    </tr>
                            })
                        : 
                          <tr>
                            <td className="min-height"> </td>
                            <td className="min-height"> </td>
                            <td className="min-height"> </td>
                          </tr>
                      }
                  </tbody>
                </table>
                </div>
            </>
    )

};

export default UploadDocuments;