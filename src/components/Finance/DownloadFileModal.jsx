import React, { useState } from 'react';
import { Modal, Input, Button, Row, Col, Form } from 'antd';

const DownloadFileModal = ({ visible, onClose,GetPosDownloadFile,batchId,setBatchId }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    // Trigger your download with the validated batchId
    GetPosDownloadFile(values?.batchId);
  };

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
    >
      <h2 style={{ fontWeight: 'bold', marginBottom: 20 }}>Download File</h2>

      <Form
        form={form}
        layout="vertical"
        initialValues={{ batchId: '' }}
        onFinish={onFinish}
      >
       <Form.Item
  name="batchId"
  rules={[
    { required: true, message: 'Please enter Batch ID' },
    { min: 3, message: 'Batch ID must be at least 3 characters' },
  ]}
  style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}
  wrapperCol={{ span: 24 }} // Optional to control wrapper
>
  <Input
    placeholder="Enter Batch ID"
    style={{
      width: '100%', // or fixed like width: '250px'
      maxWidth: '150%',
      textAlign: 'center',
      height: 48,
    }}
  />
        </Form.Item>

        <Row justify="center">
          <Col>
            <Button
              type="primary"
              danger
              htmlType="submit"
              style={{
                minWidth: 120,
                height: 40,
                fontWeight: 'bold',
                borderRadius: 6,
              }}
            >
              Download
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DownloadFileModal;
