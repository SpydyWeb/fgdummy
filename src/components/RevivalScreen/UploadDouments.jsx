import React from 'react';
import {Form,Upload,Input} from 'antd';

const UploadDouments = (props) => {
  return (
    <>
       <Form.Item
              label={
                <span>
                  {props.label}
                </span>
              }
              name={props.name}
              className="inputs-label mb-0"
            >
               <Upload 
                    //   {...uploadProps} 
                      accept=".png,.jpeg,.jpg,.JPG,.JPEG,.PNG, .PDF, .pdf, .TIFF, .tiff"
                    // customRequest={({ file, onSuccess }) => uploadProps.customRequest({ file, onSuccess, index,item })}
                    //onChange={(info) => handleFileUpload(info, index)} 
                    // onChange={(props) => handleUpload(props)}
                    
                    // action={uploadURL}
                      >
                  <Input
                    placeholder={props.label}
                    type="text"
                    className="cust-input upload-column"
                    size="small"
                    // value={showUploadFile===index ? uploadFiles.name : getUploadVal(item)}
                    // suffix={!props?.hideUploadOption&&suffix}
                    />
                    </Upload>
            </Form.Item>
    </>
  )
}

export default UploadDouments;