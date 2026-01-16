import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Modal,
  Tooltip,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import apiCalls from "../../api/apiCalls";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import CloseIcon from "../../assets/images/close-icon.png";

const CustomerInteractionTab = () => {
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const [isLoading, setIsLoading] = useState(false);
  const [previousInteractionDetails, setPreviousInteractionDetails] = useState([]);
  const loginInfo = useSelector((state) => state);
  const [ticketStatus, setTicketStatus] = useState('');
  const { serviceId } = useParams();
  const [srvReqID, setSrvReqID] = useState(0);
  const [showViewHistory, setShowViewHistory] = useState(false);

  const DispositionLU = [
    { label: "Contacted", value: "contacted" },
    { label: "Not Contacted", value: "notContacted" },
    { label: "Wrong No", value: "wrongNo" },
    { label: "Switched Off", value: "switchedOff" },
    { label: "Not Reachable", value: "notReachable" },
  ];

  const featureDateDisabled = (current) =>
    current && current < dayjs().startOf("day");

  const validatePhoneNumber = (_, value) => {
    if (value && !/^[6-9]\d{9}$/.test(value)) {
      return Promise.reject("Mobile number must start with 6-9 and be 10 digits");
    }
    return Promise.resolve();
  };

  useEffect(() => {
    getPOSIndividualData();
  }, []);

  const handleViewHistory = (e) => {
    e.preventDefault();
    setShowViewHistory(true);
  };

  const getPOSIndividualData = async () => {
    try {
      setIsLoading(true);
      const response = await apiCalls.getPOSIndividualData(serviceId);
      const srvReqIDFromData = response?.data?.srvReqID || 0;
      setSrvReqID(srvReqIDFromData);
      setTicketStatus(response?.data?.currentStatus);
      setFormFieldsData(response.data?.servRequestIntract || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setFormFieldsData = (interactions) => {
    const formattedInteractions = interactions.map((item) => ({
      callTime: item.intrAct_Dt
        ? dayjs(item.intrAct_Dt).format(dateFormat)
        : "N/A",
      contactNo: item.cnctPersonNum || "N/A",
      disposition: item.dispoType || "N/A",
      interactionDetails: item.intrAct_Commt || "No interaction details provided",
      nextInteractionDate: item.nxt_IntrAct_Dt
        ? dayjs(item.nxt_IntrAct_Dt).format(dateFormat)
        : "N/A",
    }));

    setPreviousInteractionDetails(formattedInteractions); // no filtering or deduplication
  };

  const handleMiscSave = () => {
    form.validateFields().then(async (values) => {
      const obj = {
        SrvReqRefNo: serviceId,
        SrvReqID: srvReqID,
        InteractionWith: 1,
        CnctPersonNum: values.contactNumber,
        DispoType: values.disposition,
        IntrAct_Commt: values.description,
        Nxt_IntrAct_Dt: values.nextInteractionDate
          ? dayjs(values.nextInteractionDate).format("YYYY-MM-DD")
          : null,
        IntrAct_Dt: values.callTime
          ? dayjs(values.callTime).format("YYYY-MM-DD")
          : null,
      };

      try {
        const response = await apiCalls.SaveComplaintsInteractionDetails(obj);

        if (Array.isArray(response?.data?.servRequestIntract)) {
          setFormFieldsData(response.data.servRequestIntract);
        } else {
          await getPOSIndividualData();
        }

        form.resetFields();
      } catch (error) {
        console.error("Error saving interaction:", error);
      }
    });
  };

  return (
    <Form form={form} className="customer-interaction-form" layout="vertical">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={9}>
          <Form.Item label="Call Date" name="callTime" rules={[{ required: true }]}>
            <DatePicker
              format={dateFormat}
              disabledDate={featureDateDisabled}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={9}>
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[{ required: true }, { validator: validatePhoneNumber }]}
          >
            <Input maxLength={10} />
          </Form.Item>
        </Col>

        <Col xs={24} md={9}>
          <Form.Item label="Disposition" name="disposition">
            <Select options={DispositionLU} placeholder="Select Disposition" />
          </Form.Item>
        </Col>

        <Col xs={24} md={9}>
          <Form.Item label="Next Interaction Date" name="nextInteractionDate">
            <DatePicker
              format={dateFormat}
              disabledDate={featureDateDisabled}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            label="Add Interaction Details"
            name="description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} maxLength={1000} />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <a href="#" onClick={handleViewHistory} style={{ color: "#b21f1f" }}>
            View History
          </a>
        </Col>

        <Modal
          title={<div style={{ textAlign: "center", fontWeight: "bold" }}>Interaction History</div>}
          open={showViewHistory}
          destroyOnClose
          onCancel={() => setShowViewHistory(false)}
          closeIcon={
            <Tooltip title="Close">
              <span onClick={() => setShowViewHistory(false)} style={{ cursor: "pointer" }}>
                <img src={CloseIcon} alt="Close" />
              </span>
            </Tooltip>
          }
          footer={null}
          width={1000}
          className="mt-62"
        >
          <div
            style={{
              border: "1px solid black",
              textAlign: "center",
              overflowX: "auto",
            }}
          >
            <table className="responsive-table">
              <thead>
                <tr>
                  <th>Call Date</th>
                  <th>Disposition</th>
                  <th>Contact No</th>
                  <th>Interaction Details</th>
                  <th>Next Interaction Date</th>
                </tr>
              </thead>
              <tbody>
                {previousInteractionDetails.length > 0 ? (
                  previousInteractionDetails.map((item, index) => (
                    <tr key={index}>
                      <td>{item.callTime}</td>
                      <td>{item.disposition}</td>
                      <td>{item.contactNo}</td>
                      <td>{item.interactionDetails}</td>
                      <td>{item.nextInteractionDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ padding: "10px" }}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Modal>

        <Col xs={24} style={{ marginTop: "16px" }}>
          <div style={{ display: "flex", justifyContent: "left", width: "100%" }}>
            <Button
              type="primary"
              onClick={handleMiscSave}
            >
              Save
            </Button>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default CustomerInteractionTab;
