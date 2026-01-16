import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Row,Checkbox,Tooltip,Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import apiCalls from "../../api/apiCalls";
import PopupAlert from "../popupAlert";
import CloseIcon from "../../assets/images/close-icon.png";
const SalesInteractionTab = () => {
  const [form] = Form.useForm();
  const { serviceId } = useParams();
  const [srvReqID, setSrvReqID] = useState(0);
  const [alertData, setAlertData] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [previousInteractionDetails, setPreviousInteractionDetails] = useState([]);
  const loginInfo = useSelector((state) => state);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [TicketStatus, setTicketStatus] = useState('');
   const [showViewHistory, setShowViewHistory] = useState(false);
  useEffect(() => {
    fetchCustomerInteractionData();
  }, []);
  const handleViewhistory =(e) => {
    setShowViewHistory(true);
    e.preventDefault();
    };
  const handleCheckboxChange = (method) => {
    setSelectedMethod(method);

    // Reset input fields when switching the selection
    // form.setFieldsValue({
    //   emailID: method === "email" ? form.getFieldValue("emailID") : "",
    //   contactNumber: method === "telephone" ? form.getFieldValue("contactNumber") : "",
    // });
  };
  const fetchCustomerInteractionData = async () => {
    try {
      const response = await apiCalls.getPOSIndividualData(serviceId);
      setTicketStatus(response?.data?.currentStatus);
      if (response?.data?.servRequestIntract) {
        setSrvReqID(response.data.srvReqID || 0);
        bindInteractionData(response.data.servRequestIntract);
      }
    } catch (error) {
      console.error("Error fetching customer interaction data:", error);
    }
  };

  const bindInteractionData = (interactionDetails) => {
    if (interactionDetails && Array.isArray(interactionDetails)) {
      const filteredData = interactionDetails.filter(
        (interaction) => interaction.interactionWith === 2
      );

      const previousData = filteredData.map((interaction) => ({
        srvReqID: interaction.srvReqID || "N/A",
        cnctPersonNum: interaction.cnctPersonNum || "N/A",
        nxtIntrActDt: interaction.nxt_IntrAct_Dt
          ? new Date(interaction.nxt_IntrAct_Dt).toLocaleString()
          : "N/A",
        dispoType: interaction.dispoType || "N/A",
        email_Id: interaction.email_Id || "N/A",
        intrAct_Commt: interaction.intrAct_Commt || "N/A",
      }));

      setPreviousInteractionDetails(previousData);
    }
  };

  const handleMiscSave = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const savePayload = {
          SrvReqRefNo: serviceId,
          SrvReqID: srvReqID,
          InteractionWith: 2,
          CnctPersonNum: values.contactNumber,
          Email_Id: values.emailID,
          IntrAct_Commt: values.description,
        };

        try {
          const response = await apiCalls.SaveComplaintsInteractionDetails(savePayload);
          if (response?.status === 200) {
            setAlertTitle(response?.data?.header || "Success");
            setAlertData(response?.data?.message || "Interaction saved successfully.");
            setShowAlert(true);
            form.resetFields();

            const newInteraction = {
              srvReqID: srvReqID,
              cnctPersonNum: values.contactNumber,
              email_Id: values.emailID,
              intrAct_Commt: values.description,
              nxtIntrActDt: "N/A",
              dispoType: "N/A",
            };

            setPreviousInteractionDetails((prev) => [...prev, newInteraction]);
            form.resetFields();
          }
        } catch (error) {
          console.error("Error saving interaction details:", error);
        }
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  return (
    <Form form={form} layout="vertical" className="sales-interaction-form">
      <Row gutter={[16, 16]} className="mb-16">
      <Col span={24}>
        <Form.Item>
          <h6 className="fw-700" style={{color:"#b21f1f"}}>Choose Interaction Method</h6>
          <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <span style={{marginRight: "5px" }}>Email</span>
            <Checkbox
              checked={selectedMethod === "email"}
              onChange={() => handleCheckboxChange("email")}
            />
            <span style={{ width: "50px" }}></span> {/* Spacing */}
            <span style={{ marginRight: "5px" }}>Telephone</span>
            <Checkbox
              checked={selectedMethod === "telephone"}
              onChange={() => handleCheckboxChange("telephone")}
            />
          </div>
        </Form.Item>
      </Col>
        <Col xs={24} md={9}>
          <Form.Item
            label="Enter Email"
            name="emailID"
            // rules={[{ required: true, message: "Enter Email ID" }]}
          >
            <Input placeholder="Email ID" disabled={selectedMethod !== "email"} />
          </Form.Item>
        </Col>
        <Col xs={24} md={9}>
          <Form.Item
            label="Enter Telephone Number"
            name="contactNumber"
            // rules={[{ required: true, message: "Enter Contact Number" }]}
          >
            <Input placeholder="Contact Number" maxLength={10} disabled={selectedMethod !== "telephone"} />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Enter Interaction Details"
            name="description"
            rules={[{ required: true, message: "Enter Description" }]}
          >
            <TextArea rows={4} maxLength={1000} placeholder="Interaction Details" />
          </Form.Item>
        </Col>
         <Col xs={12} sm={12} md={12} lg={12} xxl={12} className='mb-16'>
                <div>
                <a href="#" onClick={handleViewhistory}style={{color:"#b21f1f"}}>View History</a> </div>
                </Col>
        <Modal
        title={<div style={{ textAlign: "center", fontWeight: "bold" }}></div>}
        open={showViewHistory}
        destroyOnClose={true}
        onCancel={() => setShowViewHistory(false)} // Close modal on cancel
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
        <div style={{ border: "1px solid black", textAlign: "center", overflowX: "auto" }}>
        <table className="responsive-table">
            <thead>
              <tr>
                <th>Contact Number</th>
                <th>Email ID</th>
                <th>Interaction Details</th>
                <th>Interaction Date</th>
              </tr>
            </thead>
            <tbody>
              {previousInteractionDetails.length > 0 ? (
                previousInteractionDetails.map((item, index) => (
                  <tr key={index}>
                    <td>{item.cnctPersonNum}</td>
                    <td>{item.email_Id}</td>
                    <td>{item.intrAct_Commt}</td>
                    <td>{new Date().toLocaleDateString("en-GB")}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center" }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Modal>
        <Col xs={24}>
        <div style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
          <Button type="primary" className="primary-btn mt-4 me-3" htmlType="submit" onClick={handleMiscSave}>
            Save
          </Button>
          </div>
        </Col>
      </Row>
      {showAlert && (
        <PopupAlert alertData={alertData} title={alertTitle} setShowAlert={setShowAlert} />
      )}
    </Form>
  );
};

export default SalesInteractionTab;
