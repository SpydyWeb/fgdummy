import React, { useState } from "react";
import {
  Input,
  Button,
  Table,
  Modal,
  Form,
  Tooltip,
  Space,
  message,
  Radio,
  DatePicker,
  Row,
  Col,
  Card,
} from "antd";
import apiCalls from "../api/apiCalls";
import moment from "moment";
import { ErrorHandler } from "./errorHandler";
import CloseIcon from "../assets/images/close-icon.png";
import dayjs from "dayjs";

const ClientListModal = ({
  visible,
  clientForm,
  setIsShowClientListModal,
  userID,
  setClientLoading,
  customerData,
  inputFields,
  setUpdateFields,
  selectedSubType,
  empID,
  setBankAccNo,
  updateNomineeData,
  setUpdateNomineeData,
  isTableSearch,
  tableIndex,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const dateFormat = "DD/MM/YYYY";
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowGridColumns, setIsShowGridColumns] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [inputValue, setInputValue] = useState("");
  //const [updateFields, setUpdateFields] = useState(false);
  const [selection, setSelection] = useState("identifier");
  const [showTotalPages, setShowTotalpages] = useState(null);

  const columns = [
    { title: "Client ID", dataIndex: "poClientID", key: "poClientID" },
    { title: "Policy No", dataIndex: "policyNo", key: "policyNo" },
    { title: "Name", dataIndex: "poName", key: "poName" },
    { title: "Mobile", dataIndex: "mobileNo", key: "mobileNo" },
    { title: "Email ID", dataIndex: "emailID", key: "emailID" },
    { title: "PAN", dataIndex: "pan", key: "pan" },
    {
      title: "DoB",
      dataIndex: "dob",
      showSorterTooltip: false,
      // sorter: {
      //   compare: (a, b) => moment(a.dob).diff(moment(b.dob)),
      // },
      render: (_, record) => (
        <Space size="middle">
          {record?.dob ? moment(record.dob).local().format("DD/MM/YYYY") : ""}
        </Space>
      ),
    },
  ];

  const clientColumns = [
    { title: "Client ID", dataIndex: "clntnum", key: "clntnum" },
    {
      title: "Name",
      key: "name",
      render: (_, record) =>
        `${record.lgivname || ""} ${record.lsurname || ""}`.trim(),
    },
    { title: "Mobile", dataIndex: "rmblphone", key: "rmblphone" },
    { title: "Email ID", dataIndex: "rinternet", key: "rinternet" },
    { title: "PAN", dataIndex: "rtaxidnum", key: "rtaxidnum" },
    // {
    //     title: "Address",
    //     key: "address",
    //     render: (_, record) =>
    //       [record.cltaddR01, record.cltaddR02, record.cltaddR03, record.cltaddR04, record.cltaddR05,record.cltpcode]
    //         .filter(Boolean) // Removes undefined/null values
    //         .join(", ") // Joins address parts with a comma
    //   }
    {
      title: "DoB",
      dataIndex: "clTdob",
      showSorterTooltip: false,
      render: (_, record) => (
        <Space size="middle">
          {record?.clTdob
            ? moment(record.clTdob).local().format("DD/MM/YYYY")
            : ""}
        </Space>
      ),
    },
  ];

  const fieldMappings = {
    AddressLine1_New: ["cltaddR01", "cltaddR01"],
    AddressLine2_New: ["cltaddR02", "cltaddR02"],
    AddressLine3_New: ["cltaddR03", "cltaddR03"],
    City_New: ["cltaddR04", "cltaddR04"],
    State_New: ["cltaddR05", "cltaddR05"],
    NewOwnerClientID: ["clntnum", "clntnum"],
    MobileNumber_New: ["rmblphone", "rmblphone"],
    PANNumber: ["rtaxidnum", "rtaxidnum"],
    PINCode: ["cltpcode", "cltpcode"],
    ProposerDOB_New: ["clTdob", "clTdob"], // Uncomment if needed with date conversion
    ProposerEmailID_New: ["rinternet", "rinternet"],
    ProposerFirstName_New: ["lgivname", "lgivname"],
    ProposerLastName_New: ["lsurname", "lsurname"],
    Salutation: ["salutl", "salutl"],

    MaritialStatus: ["marryd", "marryd"],
    PolicyOwnerFirstName_New: ["lgivname", "lgivname"],
    PolicyOwnerLastName_New: ["lsurname", "lsurname"],
    AddressLine1: ["cltaddR01", "cltaddR01"],
    AddressLine2: ["cltaddR03", "cltaddR03"],
    AddressLine3: ["cltaddR03", "cltaddR03"],
    PINCode_Old: ["cltpcode", "cltpcode"],
    City_Old: ["cltaddR04", "cltaddR04"],
    State_Old: ["cltaddR05", "cltaddR05"],
    AssigneeFirstName: ["lgivname", "lgivname"],
    AssigneeLastName: ["lsurname", "lsurname"],
    AssigneeDOB: ["clTdob", "clTdob"],
    AssigneeMobileNo: ["rmblphone", "rmblphone"],
    AssigneeEmailID: ["rinternet", "rinternet"],
  };

  const fieldMappingsScreen1 = {
    bank_IFSC: "BankIFSC",
    bank_Name: "BankName",
    branchName: "BranchName",
    acc_Type: "AccountType",
    acc_HldrName: "NameAsMentionedInTheBank",
  };

  const rowSelection = {
    type: "radio", // Enables single row selection
    selectedRowKeys,
    onChange: (keys) => {
      setSelectedRowKeys(keys.length ? [keys[0]] : []);
    },
    onSelect: (record) => {
      setSelectedRowKeys([record.poClientID || record.clntnum]); // Store key
      setSelectedRowData(record); // Store selected row data
    },
  };

  const handleRadioChange = (e) => {
    setSelection(e.target.value);
    form.resetFields();
  };

  const onFinish = (values) => {
    getSearchData(values);
  };

  const getSearchData = async (values) => {
    setIsLoading(true);
    setData([]);
    const value = values?.identifier?.trim();
    //if (!value) return;
    // Initialize search object

    let searchObj = {
      requestheader: {
        source: "",
        policyNo: "",
        applicationNo: "",
        dob: values?.dob ? convertDOB(values.dob) : "",
      },
      requestBody: {
        mobileNo: "",
        emailID: "",
        pan: "",
        customerID: "",
        firstName: values?.firstName || "",
        middleName: "",
        lastName: values?.lastName || "",
      },
    };

    if (value) {
      // Helper functions
      const isEmail = (val) => /\S+@\S+\.\S+/.test(val);
      const isMobile = (val) => /^\d{10}$/.test(val);
      const isPAN = (val) => /^[A-Z]{5}\d{4}[A-Z]$/.test(val);

      if (value?.toLowerCase().startsWith("sr")) {
        searchObj.requestBody.isSrSearch = true;
        searchObj.requestheader.ServiceRequestID = value;
      } else if (isEmail(value)) {
        searchObj.requestBody.emailID = value;
      } else if (isMobile(value)) {
        searchObj.requestBody.mobileNo = value;
      } else if (isPAN(value)) {
        searchObj.requestBody.pan = value;
      } else {
        // Assuming non-numeric values of length 10 are PANs, others are applicationNo/policyNo
        searchObj.requestheader.applicationNo = isNaN(+value) ? value : "";
        searchObj.requestheader.policyNo = !isNaN(+value) ? value : "";
        searchObj.requestBody.customerID = !isNaN(+value) ? value : "";
      }
    }

    try {
      const { data } = await apiCalls.GetClientDedupeData(searchObj);
      setData(data?.responseBody?.searchDetails);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const convertDOB = (selectedDate) => {
    if (!selectedDate) return ""; // Handle empty or invalid dates gracefully
    const dob = dayjs(selectedDate);

    if (!dob.isValid()) return ""; // Check if the date is valid

    const formattedDOB = dob.format("YYYYMMDD"); // Format as "YYYYMMDD"
    return formattedDOB;
  };

  const handleSubmit = (serachProperty) => {
    setIsShowGridColumns(false);
    form
      .validateFields()
      .then((values) => {
        console.log("Form Values:", values);
        if (serachProperty === "email") {
          getSearchData(values);
        } else if (serachProperty === "clientspolicy") {
          setIsShowGridColumns(true);
          handleSearchClientData(values);
        }
      })
      .catch((errorInfo) => {
        ErrorHandler(errorInfo);
      });
  };

  const handleSearchClientData = async (values) => {
    setIsLoading(true);
    setData([]);
    const policyNo = values?.identifier?.trim();
    try {
      const res = await apiCalls.GetPolicyClientDtls(policyNo, userID);
      // Convert objects to list format
      const lifeAssuredData =
        res?.data?.lifeAssured && customerData?.laName !== customerData?.poName
          ? [{ ...res?.data?.lifeAssured?.responseBody, type: "LifeAssured" }]
          : [];
      const proposerData = res?.data?.proposer
        ? [{ ...res?.data?.proposer?.responseBody, type: "Proposer" }]
        : [];

      // Merge all lists into a single array
      const mergedData = [
        ...res?.data?.appointees.map((item) => ({
          ...item,
          type: "Appointee",
        })),
        ...res?.data?.nominees.map((item) => ({ ...item, type: "Nominee" })),
        ...lifeAssuredData,
        ...proposerData,
      ];
      setData(mergedData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      message.error({
        content: error || "Something went wrong, please try again!",
        className: "custom-msg",
        duration: 2,
      });
    }
  };


  const handleOk = async () => {
    setIsLoading(true);
    setClientLoading(true);

    try {
      const clientNumber =
        selectedRowData?.poClientID || selectedRowData?.clntnum;
      const bankClientNumber =
        selectedRowData?.clntnum || selectedRowData?.poClientID;
      const selectedPolicyNo =
        selectedRowData?.policyNo || selectedRowData?.policyNo;

      // Call both APIs simultaneously
      const [clientResponse, bankResponse] = await Promise.all([
        getClientEnquiry(clientNumber),
        getBankDetails(
          bankClientNumber,
          selectedPolicyNo,
          fieldMappingsScreen1
        ),
      ]);

      let updatedFields = {};

      // Merge Client API Response
      if (clientResponse && !isTableSearch) {
        await Promise.all(
          Object.keys(fieldMappings).map(async (field) => {
            const key = isShowGridColumns
              ? fieldMappings[field][0]
              : fieldMappings[field][1];
            let value = clientResponse?.[key] || "";

            // Format DOB if required
            if (
              (field === "ProposerDOB_New" || field === "AssigneeDOB") &&
              value
            ) {
              value = dayjs(value);
            }
            updatedFields[field] = value;

            // Check PAN details if PANNumber is present
            if (field === "PANNumber" && value) {
              const panDetails = await CheckPANdetails(value);
              updatedFields = { ...updatedFields, ...panDetails };
            }
          })
        );
      }

      // Merge Bank API Response
      if (bankResponse && !isTableSearch) {
        Object.keys(bankResponse).forEach((key) => {
          updatedFields[key] = bankResponse[key];
        });
      }

      if (selectedSubType === "reassignment" && isTableSearch) {
        // const updatedData = [...updateNomineeData];
        // updatedData[0].ClientID_New = clientResponse?.clntnum || "";
        // updatedData[0].NomineeFirstName_New = clientResponse?.lgivname || "";
        // updatedData[0].NomineeLastName_New = clientResponse?.lsurname || "";
        // setUpdateNomineeData(updatedData);
        clientForm.setFieldsValue({
          updateNomineeData: {
            [tableIndex ? tableIndex + 1 : 1]: {
              ClientID_New: clientResponse?.clntnum || "",
              NomineeFirstName_New: clientResponse?.lgivname || "",
              NomineeLastName_New: clientResponse?.lsurname || "",
              NomineeDOB_New: dayjs(clientResponse?.clTdob) || "",
              // RealtionshipWithPolicyowner_New: null,
              // Share_New: 0,
              // Role_New: null,
              // isMinor: false
            },
          },
        });
      }
      if(selectedSubType === "absoluteconditionalassignment")
      {
          updatedFields["ExistingClient"]="yes";//Added by sayali on 16/07/2025 for Added nominee details in Assignment
      }
      if (selectedSubType === "changeinnominee" || (selectedSubType === "changeinownership" && isTableSearch)) {
        clientForm.setFieldsValue({
          updateNomineeData: {
            [tableIndex ? tableIndex + 1 : 1]: {
              ClientID_New: clientResponse?.clntnum || "",
              NomineeFirstName_New: clientResponse?.lgivname || "",
              NomineeLastName_New: clientResponse?.lsurname || "",
              NomineeDOB_New: dayjs(clientResponse?.clTdob) || "",
            },
          },
        });
      }

      if (selectedSubType === "changeinappointee") {
        clientForm.setFieldsValue({
          AppointeFirstName_New: clientResponse?.lgivname || "",
          AppointeLastName_New: clientResponse?.lsurname || "",
          AppointeDOB_New: clientResponse?.clTdob
            ? dayjs(clientResponse?.clTdob)
            : null,
        });
      }

      // Set all merged fields at once
      clientForm?.setFieldsValue(updatedFields);
      setUpdateFields((prev) => !prev); // Force parent re-render
    } catch (error) {
      ErrorHandler("Something went wrong, please try again!");
    } finally {
      setIsLoading(false);
      setClientLoading(false);
      onClose();
    }
  };

  const CheckPANdetails = async (panNo) => {
    try {
      setIsLoading(true);
      const response = await apiCalls.getCheckPANdetails(
        panNo,
        customerData?.policyNo
      );
      const res = response?.data?.responseBody;
      let panFields = {};

      if (res?.errorcode !== "1") {
        panFields = {
          PANResult: res?.description,
          PANRevalidationResult: res?.description,
          PANValidationStatus: res?.description,
          PanValidation: res?.description,
          NameinPAN: `${res?.firstName || ""} ${res?.middleName || ""} ${
            res?.lastName || ""
          }`.trim(),
          NameinPANN: `${res?.firstName || ""} ${res?.middleName || ""} ${
            res?.lastName || ""
          }`.trim(),
        };
      } else {
        panFields = {
          PanValidation: res?.errormessage,
          PANResult: res?.errormessage,
          PANValidationStatus: res?.errormessage,
          PANRevalidationResult: res?.errormessage,
          NameinPANN: res?.errormessage,
        };
        message.error({
          content:
            res?.errormessage || "Something went wrong please try again!",
          className: "custom-msg",
          duration: 2,
        });
      }

      return panFields;
    } catch (err) {
      message.error({
        content: "Something went wrong while fetching PAN details!",
        className: "custom-msg",
        duration: 2,
      });
      return {};
    } finally {
      setIsLoading(false);
    }
  };

  const getClientEnquiry = async (clientNumber) => {
    try {
      const obj = { clientNumber };
      const response = await apiCalls.getClientEnquiry(obj, empID);
      return response?.data?.responseBody || {};
    } catch (error) {
      ErrorHandler("Failed to fetch client enquiry data");
      return {};
    }
  };

  const getBankDetails = async (clientID, policyNumber, bankFieldMappings) => {
    let obj = {
      policyNo: policyNumber || "",
      clientId: clientID || "",
    };

    try {
      const response = await apiCalls.getBankDeatils(obj);
      if (Array.isArray(response?.data) && response?.data?.length > 0) {
        const bankDetails = response.data[0];
        let updatedFields = {};

        Object.keys(bankDetails)?.forEach((key) => {
          let mappedField = bankFieldMappings[key] || key;

          if (key === "acc_Number" && bankDetails[key]?.length > 4) {
            if (selectedSubType === "absoluteconditionalassignment")//Added by sayali on 17-07-2025 absoluteassignment name changes as absoluteconditionalassignment
              setBankAccNo(bankDetails[key]);
            const lastFourDigits = bankDetails[key].slice(-4);
            updatedFields[
              bankFieldMappings["BankAccountNumber"] || "BankAccountNumber"
            ] = "*".repeat(bankDetails[key].length - 4) + lastFourDigits;
            updatedFields[
              bankFieldMappings["ConfirmBankAccountNumber"] ||
                "ConfirmBankAccountNumber"
            ] = bankDetails[key];
          } else {
            updatedFields[mappedField] = bankDetails[key];
          }
        });

        // Capitalize IFSC and fetch bank details
        const ifscKey = bankFieldMappings["BankIFSC"] || "BankIFSC";
        if (updatedFields[ifscKey]) {
          updatedFields[ifscKey] = updatedFields[ifscKey].toUpperCase();
          const ifscResponse = await getIFSCBankDetails(updatedFields[ifscKey]);
          if (ifscResponse) {
            updatedFields["BankName"] = ifscResponse.bank;
            updatedFields["BranchName"] = ifscResponse.branch;
          }
        }

        // Convert AccountType to integer
        const accountTypeKey =
          bankFieldMappings["AccountType"] || "AccountType";
        if (updatedFields[accountTypeKey]) {
          updatedFields[accountTypeKey] = parseInt(
            updatedFields[accountTypeKey]
          );
        }

        return updatedFields;
      } else {
        message.info({
          content: "No bank details found.",
          className: "custom-msg",
          duration: 2,
        });
        return {};
      }
    } catch (error) {
      message.error({
        content: error?.message || "Failed to fetch bank details.",
        className: "custom-msg",
        duration: 2,
      });
      return {};
    }
  };

  const getIFSCBankDetails = async (ifscCode) => {
    try {
      const response = await apiCalls.getIFSCBanks(ifscCode);
      if (response.statusText && response?.data?.length > 0) {
        form.setFieldsValue({
          BankName: response.data[0]?.bank,
          BranchName: response.data[0]?.branch,
        });
        return response.data[0];
      } else {
        message.error({
          content: response?.data?.responseBody?.errormessage || "Invalid IFSC",
          className: "custom-msg",
          duration: 2,
        });
        form.setFieldsValue({
          BankIFSC: "",
          BankName: "",
        });
        return null;
      }
    } catch (error) {
      message.error({
        content: "Failed to fetch IFSC details.",
        className: "custom-msg",
        duration: 2,
      });
      return null;
    }
  };

  const handleNewClient = () => {
    clientForm?.setFieldsValue({
      NewOwnerClientID: "New Client ID",
    });
    //Added by sayali on 16/07/2025 for Added nominee details in Assignment
    if(selectedSubType === "absoluteconditionalassignment")
      {
        clientForm?.setFieldsValue({
        ExistingClient: "no",
        });
      }
    onClose();
  };

  const onClose = () => {
    setIsLoading(false);
    setIsShowClientListModal(false);
    setData([]);
    setSelectedRowKeys([]);
    setSelectedRowData(null);
    form.setFieldsValue({
      identifier: "",
    });
  };

  return (
    <Modal
      title="Client List"
      open={visible}
      width={800}
      destroyOnClose={true}
      closeIcon={
        <Tooltip title="Close">
          <span onClick={() => onClose(false)}>
            <img src={CloseIcon} alt=""></img>
          </span>
        </Tooltip>
      }
      footer={null}
    >
      <Form
        name="wrap"
        labelCol={{
          flex: "35%",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Radio.Group
          onChange={handleRadioChange}
          value={selection}
          className="mb-16"
        >
          <Radio value="identifier">Identifier</Radio>
          <Radio value="nameDob">Name + DOB</Radio>
        </Radio.Group>

        {selection === "identifier" && (
          <Row
            gutter={[24, 24]}
            justify="center"
            align="middle"
            className="mb-16"
            style={{ height: "100%" }}
          >
            <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
              <Form.Item
                name="identifier"
                label=""
                className="inputs-label"
                rules={[
                  { required: true, message: "Please enter PAN/Email/Mobile!" },
                ]}
              >
                <Input placeholder="PAN/Email/Mobile" className="cust-input" />
              </Form.Item>
            </Col>
          </Row>
        )}

        {/* {selection === 'nameDob' && (
  <Row gutter={[16, 16]} className="reasons-list">
     <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
      <Form.Item
        name="firstName"
        label="F Name"
        className="inputs-label"
        rules={[{ required: true, message: 'Please enter First Name!' }]}
      >
        <Input placeholder="First Name" className="cust-input" />
      </Form.Item>
    </Col>

     <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
      <Form.Item
        name="lastName"
        label="L Name"
        className="inputs-label"
        rules={[{ required: true, message: 'Please enter Last Name!' }]}
      >
        <Input placeholder="Last Name" className="cust-input" />
      </Form.Item>
    </Col>

     <Col xs={24} sm={24} md={12} lg={12} xxl={12}>
      <Form.Item
        name="dob"
        label="DOB"
        className="inputs-label"
        rules={[{ required: true, message: 'Please enter DOB!' }]}
      >
        <DatePicker
          style={{ width: '100%' }}
          placeholder="Select DOB"
          className="cust-input"
          allowClear={false}
          format={dateFormat}
        />
      </Form.Item>
    </Col>
  </Row>
)} */}

        {selection === "nameDob" && (
          <Row gutter={[24, 24]} justify="space-between" className="mb-16">
            <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
              <Form.Item
                name="firstName"
                rules={[
                  { required: true, message: "Please enter First Name!" },
                ]}
              >
                <Input placeholder="First Name" className="cust-input" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please enter Last Name!" }]}
              >
                <Input placeholder="Last Name" className="cust-input" />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={7} lg={7} xxl={7}>
              <Form.Item
                name="dob"
                rules={[{ required: true, message: "Please enter DOB!" }]}
              >
                <DatePicker
                  placeholder="DoB"
                  className="cust-input"
                  style={{ width: "100%" }}
                  allowClear={false}
                  format={dateFormat}
                />
              </Form.Item>
            </Col>
          </Row>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Form.Item>
            <Button type="primary" className="primary-btn" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </div>

        <Table
          rowKey={(record) => record.poClientID || record.clntnum} // Unique row identifier
          columns={columns}
          dataSource={data}
          rowSelection={rowSelection}
          loading={isLoading}
          locale={{
            emptyText: "No Data Available",
          }}
          //bordered={true}
          x={true}
          pagination={{
            //pageSizeOptions: ["5", "10", "15", "15"],
            pageSize: 10,
            //showSizeChanger: true,
            defaultPageSize: 5,
            // size:"small",
            total: showTotalPages,
            //showTotal: `Total ${showTotalPages} items`
          }}
        />

        {/* <div className="table-scroll">
<div className="table-container">
 
<Table className="responsive-table"
  rowKey={(record) => record.poClientID || record.clntnum} // Unique row identifier
  columns={isShowGridColumns ? clientColumns : columns}
  dataSource={data}
  rowSelection={rowSelection}
  loading={isLoading}
  locale={{ emptyText: 'No Data Available' }}
  pagination={false}
  // pagination={{
  //  // pageSizeOptions: ['5', '10', '15', '20'], // Options for page size
  //   pageSize: 10,
  //   //showSizeChanger: true,                    // Allow users to change page size
  //   defaultPageSize: 5,                      // Default number of items per page
  //   total: null,                    // Total number of items
  //  // showTotal: (total) => `Total ${total} items`, // Display total items
  //   //showQuickJumper: true,                    // Enable quick jump to page
  // }}
/>
</div>
</div> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Button
            type="primary"
            danger
            onClick={handleOk}
            // disabled={selectedRowKeys?.length === 0}
          >
            Ok
          </Button>
          <Button type="primary" danger onClick={handleNewClient}>
            New Client
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ClientListModal;
