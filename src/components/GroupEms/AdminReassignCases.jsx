import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Select,
  Table,
  Checkbox,
  Row,
  Col,
  Space,
  message,
  Spin,
  Tooltip,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import apicalls from "../../api/apiCalls";
import { useSelector } from "react-redux";

const AdminReassignCases = ({ onClose }) => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [existingUserId, setExistingUserId] = useState(null);
  const [newUserId, setNewUserId] = useState(null);
  const [casesLoading, setCasesLoading] = useState(false);
  const [cases, setCases] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const START_DATE = dayjs("2025-01-01");
  const END_DATE = dayjs("9999-01-01");
  const PENDING_STATUS = "PENDING";

  const reduxProfile = useSelector((s) => s?.userProfileInfo?.profileObj);
  const profile =
    reduxProfile ||
    window.userProfileInfo?.profileObj ||
    window.userProfileInfo ||
    {};
  const getCurrentUserId = () =>
    profile?.usrID ||
    profile?.UsrID ||
    profile?.userName ||
    localStorage.getItem("usrID") ||
    sessionStorage.getItem("usrID") ||
    "";

  useEffect(() => {
    const fetchUsers = async () => {
      setUsersLoading(true);
      try {
        const res = await apicalls.GetGroupEmsUserList({});
        const list =
          res?.data?.GroupEmsUsers ||
          res?.data?.groupEmsUsers ||
          res?.GroupEmsUsers ||
          [];
        const cleaned = Array.isArray(list)
          ? list
              .map((u) => u.UsrID || u.usrID || u.userId || u.userid)
              .filter(Boolean)
          : [];
        setUsers(cleaned);
      } catch {
        message.error("Failed to load users");
      } finally {
        setUsersLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const fetchExistingUserCases = async (usrId) => {
    if (!usrId) {
      setCases([]);
      setSelectedIds([]);
      return;
    }
    setCasesLoading(true);
    try {
      const payload = {
        fromDate: START_DATE.format("YYYY-MM-DD"),
        toDate: END_DATE.format("YYYY-MM-DD"),
        statusCondition: PENDING_STATUS,
        userId: usrId,
      };
      const res = await apicalls.GetUsersAssignedEmails(payload);
      const data = res?.data || {};
      const rawList =
        data.emails || data.Emails || (Array.isArray(data) ? data : []);
      const list = rawList.map((e, i) => ({
        key: e.InboxEmailId ?? e.inboxEmailId ?? i,
        InboxEmailId: e.InboxEmailId ?? e.inboxEmailId ?? i,
        EmailResponseId: e.EmailResponseId ?? e.emailResponseId ?? "-",
        ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime ?? null,
        Subject: e.Subject ?? e.subject ?? "",
        From: e.From ?? e.from ?? "",
      }));
      setCases(list);
      setSelectedIds([]);
    } catch {
      message.error("Failed to load cases");
    } finally {
      setCasesLoading(false);
    }
  };

  const handleExistingUserChange = (val) => {
    setExistingUserId(val);
    fetchExistingUserCases(val);
  };

  const toggleOne = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };
  const selectAll = () => setSelectedIds(cases.map((c) => c.InboxEmailId));
  const deselectAll = () => setSelectedIds([]);

  const handleSubmit = async () => {
    if (!existingUserId) {
      message.warning("Select current assignee");
      return;
    }
    if (!newUserId) {
      message.warning("Select new assignee");
      return;
    }
    if (existingUserId === newUserId) {
      message.warning("Existing and new assignee cannot be same");
      return;
    }
    if (!selectedIds.length) {
      message.warning("Select at least one case");
      return;
    }
    const payload = {
      ActionedUserID: getCurrentUserId(),
      ExisitngUserID: existingUserId,
      NewUserID: newUserId,
      InboxEmailIds: selectedIds,
    };
    console.log("AdminReassignCases submit payload:", payload);
    setSubmitLoading(true);
    try {
      const res = await apicalls.AdminReassignCases(payload);
      const ok =
        res?.data?.Result ||
        res?.data?.result ||
        res?.Result ||
        res?.result ||
        false;
      if (ok) {
        message.success("Reassignment successful");
        onClose && onClose();
      } else {
        message.error(
          res?.data?.Message || res?.Message || "Reassignment failed"
        );
      }
    } catch {
      message.error("Reassignment error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const wrapCell = (v) => (
    <div style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
      {v || "-"}
    </div>
  );

  const columns = [
    {
      title: (
        <Checkbox
          checked={cases.length > 0 && selectedIds.length === cases.length}
          indeterminate={
            selectedIds.length > 0 && selectedIds.length < cases.length
          }
          onChange={(e) => (e.target.checked ? selectAll() : deselectAll())}
        />
      ),
      dataIndex: "select",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedIds.includes(record.InboxEmailId)}
          onChange={(e) => toggleOne(record.InboxEmailId, e.target.checked)}
        />
      ),
    },
    {
      title: "Email Response ID",
      dataIndex: "EmailResponseId",
      width: 140,
      render: (v) => <Tooltip title={v}>{wrapCell(v)}</Tooltip>,
    },
    {
      title: "From",
      dataIndex: "From",
      width: 180,
      render: (v) => <Tooltip title={v}>{wrapCell(v)}</Tooltip>,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      render: (v) => <Tooltip title={v}>{wrapCell(v)}</Tooltip>,
    },
    {
      title: "Received DateTime",
      dataIndex: "ReceivedDateTime",
      width: 170,
      render: (v) => wrapCell(v ? dayjs(v).format("YYYY-MM-DD HH:mm") : "-"),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: 640,
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#c40000",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: 0.5,
        }}
      >
        <span>Reassign Cases Window</span>
        <Button
          type="text"
          icon={<CloseOutlined style={{ color: "#fff", fontSize: 16 }} />}
          onClick={onClose}
        />
      </div>

      <div style={{ flex: 1, padding: 16, overflowY: "auto" }}>
        <Row gutter={12} style={{ marginBottom: 12 }}>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label
                style={{ fontWeight: 600, fontSize: 13, display: "block" }}
              >
                Existing Assignee
              </label>
              <Select
                placeholder="Select existing user"
                value={existingUserId}
                loading={usersLoading}
                onChange={handleExistingUserChange}
                showSearch
                optionFilterProp="children"
                style={{ width: "100%" }}
              >
                {users.map((u) => (
                  <Select.Option key={u} value={u}>
                    {u}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
          <Col span={12}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <label
                style={{ fontWeight: 600, fontSize: 13, display: "block" }}
              >
                New Assignee
              </label>
              <Select
                placeholder="Select new user"
                value={newUserId}
                loading={usersLoading}
                onChange={setNewUserId}
                showSearch
                optionFilterProp="children"
                style={{ width: "100%" }}
              >
                {users.map((u) => (
                  <Select.Option key={u} value={u}>
                    {u}
                  </Select.Option>
                ))}
              </Select>
            </Space>
          </Col>
        </Row>

        <Divider style={{ margin: "12px 0" }} />

        <Row justify="space-between" align="middle" style={{ marginBottom: 8 }}>
          <Space>
            <Button
              size="small"
              onClick={selectAll}
              disabled={!cases.length}
              style={{
                background: "#c40000",
                color: "#fff",
                fontWeight: 600,
                borderColor: "#c40000",
              }}
            >
              Select All
            </Button>
            <Button
              size="small"
              onClick={deselectAll}
              disabled={!selectedIds.length}
              style={{
                background: "#c40000",
                color: "#fff",
                fontWeight: 600,
                borderColor: "#c40000",
              }}
            >
              Deselect
            </Button>
          </Space>
          <span style={{ fontSize: 12 }}>
            Selected: {selectedIds.length} / {cases.length}
          </span>
        </Row>

        <Spin spinning={casesLoading}>
          <Table
            size="small"
            columns={columns}
            dataSource={cases}
            pagination={false}
            scroll={{ y: 300 }}
            rowKey="InboxEmailId"
          />
        </Spin>
      </div>

      <div
        style={{
          padding: "10px 16px",
          borderTop: "1px solid #f0f0f0",
          background: "#fafafa",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        <Button onClick={onClose}>Close</Button>
        <Button
          type="primary"
          disabled={
            !existingUserId ||
            !newUserId ||
            existingUserId === newUserId ||
            !selectedIds.length
          }
          loading={submitLoading}
          onClick={handleSubmit}
        >
          Reassign
        </Button>
      </div>
    </div>
  );
};

export default AdminReassignCases;
