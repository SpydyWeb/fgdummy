import { Upload, Table, Button, Input, Row, Col, Typography, message } from "antd";
import React, { useState, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";

import axios from "axios";
import apiCalls from "../../api/apiCalls"; // Adjust the path as needed
import { useSelector } from 'react-redux';

const { Title } = Typography;



function BlacklistedPolicyPage() {
  const loginInfo = useSelector(state => state);
const isPOSExec = loginInfo?.userProfileInfo?.profileObj?.roleName?.toLowerCase().includes("pos exec");
  const [tableData, setTableData] = useState([]);
const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchPolicy, setSearchPolicy] = useState("");
  const [filteredData, setFilteredData] = useState([]);

const rowSelection = {
  selectedRowKeys,
  onChange: setSelectedRowKeys,
};
const columns = [
  {
    title: "Policy No",
    dataIndex: "policyNo",
    key: "policyNo",
    onHeaderCell: () => ({
      style: {
        background: "#dddddd",
        color: "#222",
        fontWeight: 700,
      },
    }),
  },
  {
    title: "Hold Reason",
    dataIndex: "holdReason",
    key: "holdReason",
    onHeaderCell: () => ({
      style: {
        background: "#dddddd",
        color: "#222",
        fontWeight: 700,
      },
    }),
  },
  {
  title: "Release Reason",
    dataIndex: "releaseReason",
    key: "releaseReason",
    render: (_, record) => (
      <Input
        value={record.releaseReason || ""}
        onChange={e => record.onReleaseReasonChange(e.target.value)}
        placeholder="Enter release reason"
        disabled={isPOSExec}
      />
    ),
    onHeaderCell: () => ({
      style: {
        background: "#dddddd",
        color: "#222",
        fontWeight: 700,
      },
    }),
  },
];
  

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from backend
  const fetchData = async () => {

    const response = apiCalls.GetBlacklistDataList();
    response
      .then((val) => {
        if (val?.data) {
         setTableData(
      val.data.map(row => ({
        ...row,
        key: row.policyNo, // Ensure key exists for selection
        releaseReason: row.releaseReason || ""
      }))
      );
        } else {
          message.destroy();
          message.error({
            content:
              val?.data?.responseHeader?.message ||
              "Something went wrong please try again!",
            className: "custom-msg",
            duration: 2,
          });
        }
      })
      .catch((err) => {
        message.destroy();
        message.error({
          content: "Failed to fetch data!",
          className: "custom-msg",
          duration: 2,
        });
      });
  };
  // Filter data when tableData or searchPolicy changes
  useEffect(() => {

    if (searchPolicy.trim() === "") {
      setFilteredData(tableData);
    } else {
      setFilteredData(
        tableData.filter(
          (row) =>
            row.policyNo &&
            row.policyNo.toLowerCase().includes(searchPolicy.trim().toLowerCase())
        )
      );
    }
  }, [tableData, searchPolicy]);

   // Get selected rows' data
  const selectedRows = tableData.filter(row => selectedRowKeys.includes(row.key)); // or row.id

const rowsMissingReason = selectedRows.filter(
  row => !row.releaseReason || row.releaseReason.trim() === ""
);
const releaseReason = rowsMissingReason.map(row => row.releaseReason);

  function getLocalISOString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const mins = String(now.getMinutes()).padStart(2, "0");
  const secs = String(now.getSeconds()).padStart(2, "0");
  const ms = String(now.getMilliseconds()).padStart(3, "0");
  return `${year}-${month}-${day}T${hours}:${mins}:${secs}.${ms}`;
}
  // Handle Excel upload and send to backend
const handleExcelUpload = (file) => {
  const reader = new FileReader();
  reader.onload = async (e) => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);

    // Get createdBy from your app's user context or state
    const CreatedUsrId = loginInfo?.userProfileInfo?.profileObj?.userName;

    // Map Excel data to required fields
    const mapped = json.map((row) => ({
      policyNo: row["Policy No"] || row["policyNo"] || "",
      holdReason: row["Hold Reason"] || row["holdReason"] || "",
      holdFlag: "Y",
      releaseFlag: "N",
      holdBy: CreatedUsrId,
      holdDate: getLocalISOString(), // Use current date for holdDate
      systemDate: getLocalISOString(),
    }));

    try {
      const response =await apiCalls.SaveUploadBlacklistData(mapped);
        if(response.status === 200){
             message.success("Excel uploaded and saved!");
      fetchData(); // Refresh grid from DB
        }
   
    } catch {
      message.error("Upload failed!");
    }
  };
  reader.readAsBinaryString(file);
  return false; // Prevent default upload
};
function formatDateTime(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);

  // If invalid date, return original string
  if (isNaN(date.getTime())) return dateString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  const secs = String(date.getSeconds()).padStart(2, "0");

  // Format: DD/MM/YYYY HH:mm:ss
  return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
}

const handleDownload = () => {
  // Use the filteredData or tableData as per your requirement
  const exportData = filteredData.length ? filteredData : tableData;

  // Prepare data for Excel (only the columns you want)
  const excelData = exportData.map(row => ({
   PolicyNo: row.policyNo,
    HoldReason: row.holdReason,
    CreatedBy: row.holdBy,        
    HoldDate: formatDateTime(row.holdDate),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Make header bold (and yellow if you want)
  const header = Object.keys(excelData[0]);
  header.forEach((col, idx) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: idx });
    if (!worksheet[cellAddress]) return;
    worksheet[cellAddress].s = {
      font: { bold: true }, // Bold header
      // fill: { fgColor: { rgb: "FFFF00" } } // Uncomment for yellow background
    };
  });

  
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "BlackListData");

  // Format date as DDMMYYYY
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const fileName = `BlackListData_${day}${month}${year}.xlsx`;


  XLSX.writeFile(workbook, fileName);
};
  // Handle Release Reason input change (local only)
const handleReleaseReasonChange = (value, policyNo) => {

  setTableData(prev =>
    prev.map(row =>
      row.policyNo === policyNo ? { ...row, releaseReason: value } : row
    )
  );
};

  // Add handler to each row for Release Reason input
 const dataWithHandlers = filteredData.map((row, idx) => {

  // Find the index in tableData
  const mainIdx = tableData.findIndex(r => r.policyNo === row.policyNo);
  return {
   ...row,
  key: row.policyNo,
  onReleaseReasonChange: value => handleReleaseReasonChange(value, row.policyNo),
 };
});

  // Handle search input change
  const handleSearchChange = (e) => setSearchPolicy(e.target.value);

  // Handle search button click (not strictly needed, filtering is live)
  const handleSearch = () => {};

  // Handle reset button click
  const handleReset = () => setSearchPolicy("");

  const handleSubmit = async () => {

      if (selectedRowKeys.length === 0) {
    message.error("Please select at least one policy to release.");
    return;
  }
  const selectedRows = tableData.filter(row => selectedRowKeys.includes(row.key));
  const rowsMissingReason = selectedRows.filter(
    row => !row.releaseReason || row.releaseReason.trim() === ""
  );
  if (rowsMissingReason.length > 0) {
    message.error("Please enter release reason for all selected policies.");
    return;
  }
 

  const createdBy =  loginInfo?.userProfileInfo?.profileObj?.userName || "defaultUser";
  const releaseDate = getLocalISOString();

 
  // Prepare data for API
  const updateData = selectedRows.map(row => ({
     srNo: row.srNo,
    policyNo: row.policyNo,
    releaseReason: row.releaseReason || "",
    releaseBy: createdBy,
    releaseFlag: "Y",
    releaseDate,
  }));

  try {
    await apiCalls.SubmitBlacklistData(updateData);
    message.success("Selected policies updated!");
    fetchData(); // Refresh grid
     setSelectedRowKeys([]); // Clear selection after successful submit
  } catch {
    message.error("Update failed!");
  }
};

  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: 32 }}>
      {/* Header */}
      <Row
        justify="center"
        align="middle"
        style={{
          background: "#dddddd",
          height: 36,
          minHeight: 36,
          marginBottom: 24,
          borderRadius: 4,
          padding: "0 16px",
          width: "100%",
        }}
      >
        <Col>
          <span style={{ color: "#222", fontWeight: 700, fontSize: 18 }}>
            Release payout data
          </span>
        </Col>
      </Row>

      {/* Search and Buttons Row */}
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        {/* Left: Policy No Search */}
        <Col>
          <Row align="middle" gutter={8}>
            <Col>
              <span style={{ fontWeight: 600, fontSize: 16 }}>Policy No :</span>
            </Col>
            <Col>
              <Input
                style={{ width: 180 }}
                value={searchPolicy}
                onChange={handleSearchChange}
                placeholder="Enter Policy No"
              />
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ background: "#b21f1f", borderColor: "#b21f1f" }}
                onClick={handleSearch}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ background: "#b21f1f", borderColor: "#b21f1f" }}
                onClick={handleReset}
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Col>
        {/* Right: Excel Uploader & Download Report */}
        <Col>
          <Row align="middle" gutter={8}>
            <Col>
              <Upload
                beforeUpload={handleExcelUpload}
                showUploadList={false}
                accept=".xlsx, .xls"
              >
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  style={{ background: "#b21f1f", borderColor: "#b21f1f", marginRight: 8 }}
                >
                  Excel Uploader
                </Button>
              </Upload>
            </Col>
            <Col>
              <Button
                type="primary"
                style={{ background: "#b21f1f", borderColor: "#b21f1f" }}
                 onClick={handleDownload}
              >
                Download BlackList Data
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Table/Grid */}
      <Table
        columns={columns}
        dataSource={dataWithHandlers}
        rowSelection={isPOSExec ? null : rowSelection} // <-- Disable row selection for POS Exec
        pagination={false}
        bordered
        style={{ background: "#fff", borderRadius: 8, marginBottom: 32 }}
      />

      {/* Submit Button at Bottom */}
      {!isPOSExec && ( // <-- Hide Submit button for POS Exec
      <Row justify="center">
        <Col>
          <Button
            type="primary"
            size="large"
            style={{ background: "#b21f1f", borderColor: "#b21f1f", minWidth: 160 }}
          onClick={handleSubmit}
          >
            Submit
          </Button>
        </Col>
      </Row>
      )}
    </div>
  );
}

export default BlacklistedPolicyPage;