import React, { useEffect } from "react";
import { Form, Input, Radio, Button, DatePicker, Select, Row, Col } from "antd";
import { PosPayoutExecUserData } from "../../mainconfig";
import {
  UploadOutlined , EditOutlined, CloseOutlined
} from '@ant-design/icons';

const { Option } = Select;

const PosPayoutExeuForm = ({ formType, handleRadioChange, data, assignment, customerType, state, handleSubmit, onBlurInput, handleTextLink }) => {
  const [form] = Form.useForm();

  const GetMethodResult = (type) => {
    if (data?.maturity?.maturityChecks) {
      const panEnquiryCheck = data?.maturity?.maturityChecks.find(check => check.type === type);
      const panEnquiryResult = JSON.parse(panEnquiryCheck.result);
      return panEnquiryResult;
    }
  };

  const paymentmethod = [
    { label: 'Cheque', value: 'cheque' },
    { label: 'NEFT', value: 'NEFT' },
  ];

  const dropdownOptionsMapping = {
    paymentmethod: paymentmethod,
  };

  const getDropdownOptions = (name) => {
    const lowerCaseName = name.toLowerCase();
    return dropdownOptionsMapping[lowerCaseName] || [];
  };



  const renderFormItems = (section, formType) => {
    return (
      <>
        {section.map((item, index) => (
          <>
            {item.inputType === "title" && !item?.hide && (
              <Col span={24} key={`${index}-title`} style={{ marginBottom: '10px' }}>
                <h6><b>{item.label} {!item?.hideIcon && <EditOutlined className="editIconn"/> } </b></h6>
              </Col>
            )}
            
            {/* Render form inputs except for titles */}
            {item.inputType !== "title" && !item?.hide && (
              <Col xs={24} sm={24} md={12} lg={12} key={index}>
                {item.inputType === "radio" ? (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Radio.Group onChange={(e) => handleRadioChange(item, e)}>
                      <Radio value={item.radioValue}>{item.title}</Radio>
                      <Radio value={item.secondRadioValue}>{item.secondTitle}</Radio>
                    </Radio.Group>
                  </Form.Item>
                ) : item.inputType === "date" ? (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                ) : item.inputType === "dropdown" ? (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Select
                      placeholder={item.placeholder}
                      options={getDropdownOptions(item.name)}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                ) : item.inputType === "link" ? (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <span className="link-txt" onClick={() => handleTextLink(item)}>
                      {item.linkValue}
                    </span>
                  </Form.Item>
                ) : (
                  <Form.Item
                    label={item.label}
                    name={item.name}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Input
                      type={item.inputType}
                      placeholder={item.placeholder}
                      disabled={item.disabled}
                      onBlur={(e) => onBlurInput(e.target.value, item)}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                )}
              </Col>
            )}
          </>
        ))}
      </>
    );
  };
  
  
  

  

  return (
    <Form form={form} layout="horizontal"> {/* Added Form Wrapper */}
      <Row gutter={[16, 16]}>
        {PosPayoutExecUserData.posPayoutExeuData[formType] &&
          renderFormItems(PosPayoutExecUserData.posPayoutExeuData[formType], formType)}
      </Row>
    </Form>
  );
};

export default PosPayoutExeuForm;