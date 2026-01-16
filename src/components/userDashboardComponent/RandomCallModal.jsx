import React, { useState } from "react";
import { Modal, Form, Row, Col, Input, DatePicker, Select, Button, Tooltip } from "antd";
import CloseIcon from "../../assets/images/close-icon.png";

const { TextArea } = Input;

const RandomCallModal = ({
  visible,
  onClose,
  onFinish,
  form,
  dateFormat,
  disableFutureDates,
  potentialLeadLu,
  handlePotentialLeadChange,
  filterOption,
  leadForOptions,
  onSearch,
  isLeadForDisabled,
}) => {
   const [emailExist] = useState(false);

  const validatePhoneNumber = (_, value) => {
    if (emailExist) {
      return Promise.reject("Mobile number already exists");
    } else if (value && !/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject("Mobile number should start with 6,7,8 or 9 and must be 10 digits");
    } else if (
      value &&
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(
        value
      )
    ) {
      return Promise.reject("Invalid mobile number");
    } 
    else {
      return Promise.resolve();
    }
  };
  const handleKeyDown = (pattern, e, type) => {
    // Get the pressed key
    const key = e.key;
    let specialCharacterRegex = '';
  
    if (pattern === 'numbersOnly') {
  
      const inputValue = e.target.value;
      if (inputValue.includes('.')) {
          specialCharacterRegex = /^[0-9]$/; 
      } else {
          specialCharacterRegex = /^[0-9.]$/;
      }
      
       // specialCharacterRegex = /^[0-9]$/;
    } else if (pattern === 'charactersOnly') {
        specialCharacterRegex = /^[a-zA-Z0-9]$/;
    } else if (pattern === 'alphabatesOnly') {
      specialCharacterRegex = /^[a-zA-Z\s]+$/;
    } else if (pattern === "decimalOnly") {
        const inputValue = e.target.value;
        if (inputValue.includes('.')) {
            specialCharacterRegex = /^[0-9]$/; 
        } else {
            specialCharacterRegex = /^[0-9.]$/;
        }
    }
    else if (pattern === 'NumbersAlphabetscommaonly') {
             specialCharacterRegex =  /^[a-zA-Z0-9, ]*$/;
  } 
  
    if (key === 'Backspace' || key.startsWith('Arrow')) {
        return;
    }
  
    // Check if the pressed key matches the allowed pattern
    if (!specialCharacterRegex.test(key)) {
        e.preventDefault(); // Prevent the key from being entered into the input field
    }
  };
  return (
    <Modal
      title="Random Call"
      open={visible}
      destroyOnClose={true}
      width={700}
      footer={null}
      closeIcon={
        <Tooltip title="Close">
          <span onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </span>
        </Tooltip>
      }
    >
      <Form
        name="wrap"
        labelCol={{ flex: "35%" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Row gutter={[12, 12]} className="mb-16">
          <Col xs={24}>
            <Form.Item label="Received On" name="receiviedOn" className="inputs-label mb-0">
              <DatePicker
                allowClear
                style={{ width: "100%" }}
                className="cust-input"
                format={dateFormat}
                disabledDate={disableFutureDates}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Name" name="name" className="inputs-label mb-0">
              <Input
                className="cust-input modal-input"
                placeholder="Enter a Name"
                maxLength={50}
                minLength={4}
                onKeyDown={(e) => handleKeyDown("alphabatesOnly", e)}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Phone" name="phone" className="inputs-label mb-0" rules={[{ validator: validatePhoneNumber }]}> 
              <Input
                className="cust-input modal-input"
                placeholder="Enter a Phone No"
                maxLength={10}
                minLength={10}
                onKeyDown={(e) => handleKeyDown("numbersOnly", e)}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Is it Potential Lead ?" name="potentialLead" className="inputs-label mb-0" rules={[]}>
              <Select
                showSearch
                allowClear
                className="cust-input calltype-select"
                placeholder="Select Potential Lead"
                onChange={handlePotentialLeadChange}
                options={potentialLeadLu}
                filterOption={filterOption}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Lead For ?" name="leadFor" className="inputs-label mb-0" rules={[]}>
              <Select
                showSearch
                allowClear
                className="cust-input calltype-select"
                placeholder="Select Lead For"
                onSearch={onSearch}
                options={leadForOptions}
                filterOption={filterOption}
                disabled={isLeadForDisabled}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item label="Comments Box" name="comments" className="inputs-label mb-0">
              <TextArea rows={2} maxLength={1000} placeholder="Comments Box" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item className="mb-0">
              <div className="d-flex justify-end">
                <Button type="primary" className="primary-btn mr-12" htmlType="submit">
                  Save & Close
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RandomCallModal;
