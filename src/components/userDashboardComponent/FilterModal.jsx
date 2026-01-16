import React from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Tooltip,
} from "antd";
import CloseIcon from "../../assets/images/close-icon.png";
import moment from "moment";
import { filterOption } from "../../utils/HelperUtilites";

const FilterModal = ({
  isOpen,
  onClose,
  form,
  onFinish,
  callTypes,
  subTypes,
  requestModes,
  statuses,
  onSearch,
  onCallTypeChange,
  rules,
  dateFormat,
  loggedUser,
}) => {
  const paymentMethodLU = [
    { label: "NEFT", value: "neft" },
    { label: "Cheque", value: "cheque" },
  ];

  const dateRules = [
    {
      required: false,
      message: "Please select a valid date",
    },
  ];

  const disableFutureDates = (current) => {
    return current && current > moment().endOf("day");
  };
  const ageingListLU = Array.from({ length: 15 }, (_, index) => ({
    label: index + 1,
    value: index + 1,
  }));
  return (
    <Modal
      className="po-modal"
      title="Advance Search"
      open={isOpen}
      destroyOnClose
      width={420}
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
        labelCol={{ flex: "35%" }}
        wrapperCol={{ flex: 1 }}
        labelAlign="left"
        labelWrap
        colon={false}
      >
        <Row gutter={[12, 12]} className="mb-10">
          <Col className="m-10" xs={24}>
            <Form.Item
              name="PolicyNo"
              label="Policy No"
              className="inputs-label mb-0"
            >
              <Input
                placeholder="Enter Policy No"
                className="cust-input modal-input"
                maxLength={100}
              />
            </Form.Item>
          </Col>

          {loggedUser?.roleName?.includes("NB User") && (
            <Col xs={24}>
              <Form.Item
                name="RequestIDNo"
                label="Request ID No"
                className="inputs-label mb-0"
              >
                <Input
                  placeholder="Enter Request ID No"
                  className="cust-input policy-input"
                  maxLength={100}
                />
              </Form.Item>
            </Col>
          )}

          <Col className="m-10" xs={24}>
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

          <Col className="m-10" xs={24}>
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

          <Col className="m-10" xs={24}>
            <Form.Item label="Mode" name="mode">
              <Select
                allowClear
                placeholder="Select Mode"
                options={requestModes}
                filterOption={filterOption}
                showSearch
              />
            </Form.Item>
          </Col>

          {!loggedUser?.roleName?.toLowerCase()?.includes("boe user") &&
            !loggedUser?.roleName?.toLowerCase()?.includes("pos exec") && (
              <>
                <Col className="m-10" xs={24}>
                  <Form.Item
                    label="Payout Method"
                    name="payoutMode"
                    className="inputs-label mb-0"
                  >
                    <Select
                      showSearch
                      allowClear
                      className="cust-input"
                      maxLength={100}
                      placeholder="Select Mode"
                      options={paymentMethodLU}
                      filterOption={filterOption}
                    />
                  </Form.Item>
                </Col>{" "}
              </>
            )}
          {loggedUser?.roleName?.toLowerCase()?.includes("pos exec") && (
            <>
              <Col className="m-10" xs={24}>
                <Form.Item
                  label="From Date"
                  name="FormDate"
                  className="inputs-label mb-0"
                  rules={dateRules}
                >
                  <DatePicker
                    allowClear
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>

              <Col className="m-10" xs={24}>
                <Form.Item
                  label="To Date"
                  name="ToDate"
                  className="inputs-label mb-0"
                  rules={dateRules}
                >
                  <DatePicker
                    allowClear
                    style={{ width: "100%" }}
                    className="cust-input"
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          <Col className="m-10" xs={24}>
            <Form.Item label="Status" name="status">
              <Select
                allowClear
                placeholder="Select Status"
                options={statuses}
                 filterOption={filterOption}
                showSearch
              />
            </Form.Item>
          </Col>

          {loggedUser?.roleName?.toLowerCase()?.includes("boe user") && (
            <>
              <Col className="m-10" xs={24}>
                <Form.Item label="From Date" name="FromDate" rules={rules}>
                  <DatePicker
                    allowClear
                    style={{ width: "100%" }}
                    format={dateFormat}
                    disabledDate={disableFutureDates}
                  />
                </Form.Item>
              </Col>
              <Col className="m-10" xs={24}>
                <Form.Item label="To Date" name="ToDate" rules={rules}>
                  <DatePicker
                    allowClear
                    style={{ width: "100%" }}
                    format={dateFormat}
                    disabledDate={disableFutureDates}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          {!loggedUser?.roleName?.toLowerCase()?.includes("boe user") && (
            <Col xs={24}>
              <Form.Item
                name="Ageing"
                label="Ageing"
                className="inputs-label mb-0"
              >
                <Select
                  showSearch
                  allowClear
                  className="cust-input"
                  maxLength={100}
                  placeholder="Select Ageing"
                  options={ageingListLU}
                />
              </Form.Item>
            </Col>
          )}

          <Col className="m-10" xs={24}>
            <Form.Item>
              <div className="d-flex justify-end">
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FilterModal;
