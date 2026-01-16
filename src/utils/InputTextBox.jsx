import React, { useEffect } from "react";
import { Form, Input, Radio, Button, DatePicker, Select, Row, Col } from "antd";
import { ForeclosureData } from "../mainconfig";

const { Option } = Select;

const ForeclosureForm = ({ formType, handleRadioChange, data, assignment, customerType, state, handleSubmit, onBlurInput, handleTextLink }) => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   const initialValues = {
  //     casestatus: state?.caseStatus,
  //     customertype: customerType,
  //     assignment: assignment,
  //     childflag: data?.maturity?.isAnyTicketsOpen || '',
  //     assigneename: data?.maturity?.isAssigned === false ? "" : data?.maturity?.isAssigned,
  //     clienttype: data?.maturity?.clientType,
  //     payouttype: state?.callTypeName,
  //     STP: state?.stpFailReason,
  //     childstatus: "",
  //     pan: GetMethodResult("PANENQUIRY")?.responseBody?.panNumber,
  //     PANValidationResult: GetMethodResult("PANENQUIRY")?.responseBody?.description,
  //     bankname: GetMethodResult("BANK")?.Bank_Name,
  //     branchname: GetMethodResult("BANK")?.Bank_Name,
  //     bankaccountnumber: GetMethodResult("BANK")?.Acc_Number,
  //     ifsc: GetMethodResult("BANK")?.Bank_IFSC,
  //     payoutamount: data?.maturity?.approxMaturityAmount,
  //     outstandingloan: data?.maturity?.isExistingLoan === false ? "no" : "yes",
  //     paymentduedate: data?.maturity?.maturityDate


  //   };





  //   form.setFieldsValue(initialValues);
  // }, [data]); // Update when data changes
  const GetMethodResult = (type) => {
    if (data?.maturity?.maturityChecks) {
      const panEnquiryCheck = data?.maturity?.maturityChecks.find(check => check.type === type);
      const panEnquiryResult = JSON.parse(panEnquiryCheck.result);
      return panEnquiryResult;
    }

  }

  const paymentmethod = [
    { label: 'Cheque', value: 'cheque' },
    { label: 'NEFT', value: 'NEFT' },
  ]

  const dropdownOptionsMapping = {
    paymentmethod: paymentmethod,
  }

  const getDropdownOptions = (name) => {
    const lowerCaseName = name.toLowerCase();
    return dropdownOptionsMapping[lowerCaseName] || [];
  };


  const renderFormItems = (section) =>
    section.map((item, index) => (
      <Col xs={24} sm={24} md={12} lg={12} xxl={12} key={index}>
        {item.inputType === "radio" ? (
          <Form.Item
            label={item.label}
            name={item.name}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
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
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        ) : item.inputType === "dropdown" ? (
          <Form.Item
            label={item.label}
            name={item.name}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <Select
              className="cust-input"
              maxLength={100}
              placeholder={item.placeholder}
              // onChange={(e) => handleDropdownChange(e, item)}
              options={getDropdownOptions(item.name)}
            ></Select>
          </Form.Item>
        ) : item.inputType === "link" ? (
          <Form.Item
            label={item.label}
            name={item.name}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <span className="link-txt" onClick={() => handleTextLink(item)}>{item.linkValue}</span>
          </Form.Item>
        ) : (
          !item.hide &&
          <Form.Item
            label={item.label}
            name={item.name}
            wrapperCol={{ span: 18 }}
            labelCol={{ span: 6 }}
          >
            <Input type={item.inputType} placeholder={item.placeholder} disabled={item.disabled} onBlur={(e) => onBlurInput(e.target.value, item)} />
          </Form.Item>
        )}

      </Col>
    ));




  return (
    <Row gutter={[16, 16]}>
      {ForeclosureData.foreclosurepayment[formType] &&
        renderFormItems(ForeclosureData.foreclosurepayment[formType])}
    </Row>
    // </Form>
  );
};

export default ForeclosureForm;
