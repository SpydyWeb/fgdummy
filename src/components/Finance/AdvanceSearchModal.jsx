import React from "react";
import { Modal, Form, Row, Col, Input, Select, DatePicker, Button, Tooltip } from "antd";
import CloseIcon from "../../assets/images/close-icon.png";
import dayjs from 'dayjs';

const AdvanceSearchModal = ({
  isOpen,
  onClose,
  form,
  onFinish,
  callTypes,
  subTypes,
  requestModes,
  statuses,
  onSearch,
  filterOption,
  onCallTypeChange,
  rules,
  dateFormat,
  loggedUser
}) => {
  const paymentMethodLU= [
    { label: 'NEFT', value: 'neft' },
    { label: 'Cheque', value: 'cheque' },
    { label: 'Demand Draft', value: 'demandDraft' },
    ];
     const departmentLU= [
    { label: 'Claims', value: 'Claims' },
    { label: 'POS', value: 'POS' },
     { label: 'PA', value: 'PA' },
      { label: 'NB', value: 'NB' },
    ];
     const fileDownloadLU= [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
    ];
 const amountOptions = [
  { label: 'Rs 1 - Rs 1,00,000', value: '1-100000' },
  { label: 'Rs 1,00,001 - Rs 10,00,000', value: '100001-1000000' },
  { label: 'Rs 10,00,000 - Rs 25,00,000', value: '1000001-2500000' },
  { label: 'Rs 25,00,001 - Rs 50,00,000', value: '2500001-5000000' },
  { label: 'Rs 50,00,001 - Rs 1,00,00,000', value: '5000001-10000000' },
  { label: 'Rs 1,00,00,001 and above', value: '10000001+' },
];
    // Custom validator for FromDate
  const validateFromDate = (_, value) => {
    const toDate = form.getFieldValue('ToDate');
    if (value && value.isAfter(dayjs(), 'day')) {
      return Promise.reject(new Error('From Date must be today or a past date.'));
    }
    if (value && toDate && value.isAfter(toDate, 'day')) {
      return Promise.reject(new Error('From Date must be before To Date.'));
    }
    return Promise.resolve();
  };

  // Custom validator for ToDate
  const validateToDate = (_, value) => {
    const fromDate = form.getFieldValue('FromDate');
    if (value && value.isAfter(dayjs(), 'day')) {
      return Promise.reject(new Error('To Date must be today or a past date.'));
    }
    if (value && fromDate && value.isBefore(fromDate, 'day')) {
      return Promise.reject(new Error('To Date must be after From Date.'));
    }
    return Promise.resolve();
  };

 
    return (
       <Modal
      title="Apply Filters"
      // open={visible}
      onCancel={onClose}
      // footer={null}
      width={700}
      centered
      // className="po-modal"
      open={isOpen}
      destroyOnClose
      closeIcon={
        <Tooltip title="Close">
          <span onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </span>
        </Tooltip>
      }
      footer={null}
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="From Date"
              name="FromDate"
              rules={[{ validator: validateFromDate }]}
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="To Date"
              name="ToDate"
              rules={[{ validator: validateToDate }]}
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="RequestIDNo"
              label="Ticket ID"
              rules={[
                { pattern: /^[a-zA-Z0-9]*$/, message: "Ticket ID must be alphanumeric" },
              ]}
            >
              <Input placeholder="Enter Ticket ID" maxLength={100} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Call Type" name="callType">
              <Select
                showSearch
                allowClear
                placeholder="Select Call Type"
                onSearch={onSearch}
                options={callTypes}
                filterOption={filterOption}
                onChange={onCallTypeChange}
              />
            </Form.Item>
          </Col>
 <Col span={12}>
            <Form.Item label="Sub Type" name="subType">
              <Select
                showSearch
                allowClear
                placeholder="Select Sub Type"
                onSearch={onSearch}
                options={subTypes}
                filterOption={filterOption}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="PolicyNo"
              label="Policy No"
              rules={[
                { pattern: /^[0-9]*$/, message: "Policy No must be numeric" },
              ]}
            >
              <Input placeholder="Enter Policy No" maxLength={100} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Payment Mode"
              name="payoutMode"
            >
              <Select
                showSearch
                allowClear
                placeholder="Select Mode"
                options={paymentMethodLU}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="Amount"
              label="Amount"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const validValues = amountOptions.map((opt) => opt.value);
                    return validValues.includes(value)
                      ? Promise.resolve()
                      : Promise.reject(new Error("Select a valid amount bracket"));
                  },
                },
              ]}
            >
              <Select
                placeholder="Select Amount Range"
                options={amountOptions}
                allowClear
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Status"
              name="status"
            >
              <Select
                allowClear
                placeholder="Select Status"
                options={statuses}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Department"
              name="Department"
            >
              <Select
                showSearch
                allowClear
                placeholder="Select Department"
                options={departmentLU}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Last Approved By"
              name="LastApproved"
              rules={rules}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Batch ID"
              name="BatchID"
            >
              <Input placeholder="Enter Batch ID" />
            </Form.Item>
          </Col>
            <Col span={12}>
            <Form.Item
              label="File Downloaded"
              name="IsFileDownload"
            >
              <Select
                showSearch
                allowClear
                placeholder="Select File Downloaded"
                options={fileDownloadLU}
              />
            </Form.Item>
          </Col>


          {/* Buttons */}
          {/* <Col span={4} className="mt-20 mr-8">
            <Button  type="primary" onClick={onClose}>
              Cancel
            </Button>
            </Col> */}
              
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 16 }}>
    <div style={{ display: 'flex', gap: 16 }}>
      <Button type="primary" onClick={onClose}>
        Cancel
      </Button>
      <Button type="primary" htmlType="submit">
        Apply
      </Button>
    </div>
  </div>


        </Row>
      </Form>
    </Modal>
   
  );
};

export default AdvanceSearchModal;
