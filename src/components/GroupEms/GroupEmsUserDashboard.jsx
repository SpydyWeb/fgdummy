import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  DatePicker,
  Select,
  Button,
  Row,
  Col,
  Table,
  Spin,
  Tag,
  Input,
  Checkbox,
  message,
  Tooltip,
} from "antd";
import {
  ReloadOutlined,
  SwapRightOutlined,
  WarningOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import apicalls from "../../api/apiCalls";
import "./GroupEms.css";
import UserCaseAction from "./UserCaseAction";

const { Option } = Select;

let persistedUserAssignedSearchParams = null;

const GroupEmsUserDashboard = () => {
  const [form] = Form.useForm();
  const [loadingCounts, setLoadingCounts] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [userOverview, setUserOverview] = useState({
    pending: 0,
    closed: 0,
    total: 0,
  });
  const [filterSets, setFilterSets] = useState({
    EmailResponseId: [],
    ReceivedDateTime: [],
    Subject: [],
    From: [],
    Priority: [],
    Status: [],
  });
  const [searchParams, setSearchParams] = useState(
    persistedUserAssignedSearchParams
  );
  const [selectedCase, setSelectedCase] = useState(null);
  const didInit = useRef(false);

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

  const getCurrentWeekRange = () => {
    const today = dayjs();
    const startOfWeek = today.startOf("week").add(1, "day");
    const endOfWeek = startOfWeek.add(6, "day").endOf("day");
    return { start: startOfWeek, end: endOfWeek };
  };

  useEffect(() => {
    const uniq = (arr) => [...new Set(arr.filter(Boolean))];
    setFilterSets({
      EmailResponseId: uniq(emails.map((e) => e.EmailResponseId)),
      ReceivedDateTime: uniq(
        emails.map(
          (e) =>
            e.ReceivedDateTime &&
            dayjs(e.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
        )
      ),
      Subject: uniq(emails.map((e) => e.Subject)),
      From: uniq(emails.map((e) => e.From)),
      Priority: uniq(emails.map((e) => e.Priority)),
      Status: uniq(emails.map((e) => (e.Status || "").toUpperCase())),
    });
  }, [emails]);

  const fetchUserDashboardCounts = async () => {
    setLoadingCounts(true);
    try {
      const res = await apicalls.GetUserDashboardCasesCount({
        userId: getCurrentUserId(),
      });
      const data = res?.data || {};
      const pendingCount =
        data.pendingCount ??
        data.PendingCount ??
        data.pending ??
        data.Pending ??
        0;
      const closedCount =
        data.closedCount ?? data.ClosedCount ?? data.closed ?? data.Closed ?? 0;
      const totalCount =
        data.totalCount ??
        data.TotalCount ??
        data.total ??
        data.Total ??
        pendingCount + closedCount;
      setUserOverview({
        pending: pendingCount,
        closed: closedCount,
        total: totalCount,
      });
    } catch {
      // silent
    } finally {
      setLoadingCounts(false);
    }
  };

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    fetchUserDashboardCounts();
    if (!searchParams) {
      const { start, end } = getCurrentWeekRange();
      const initial = {
        fromDate: start.format("YYYY-MM-DD"),
        toDate: end.format("YYYY-MM-DD"),
        statusCondition: "ALL",
      };
      form.setFieldsValue({
        fromDate: start,
        toDate: end,
        status: "ALL",
      });
      setSearchParams(initial);
      persistedUserAssignedSearchParams = initial;
      fetchUserAssignedEmails(initial);
    } else {
      form.setFieldsValue({
        fromDate: dayjs(searchParams.fromDate),
        toDate: dayjs(searchParams.toDate),
        status: searchParams.statusCondition,
      });
      fetchUserAssignedEmails(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserAssignedEmails = async (overridePayload) => {
    setTableLoading(true);
    try {
      let payload;
      if (overridePayload) {
        payload = overridePayload;
      } else {
        const vals = form.getFieldsValue();
        payload = {
          fromDate: vals.fromDate
            ? vals.fromDate.format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
          toDate: vals.toDate
            ? vals.toDate.format("YYYY-MM-DD")
            : dayjs().format("YYYY-MM-DD"),
          statusCondition: (vals.status || "ALL").toUpperCase(),
        };
      }
      payload.userId = getCurrentUserId();

      const res = await apicalls.GetUsersAssignedEmails(payload);
      handleEmailResponse(res);
    } catch {
      message.destroy();
      message.error({
        content: "Failed to load assigned emails",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setTableLoading(false);
    }
  };

  const handleEmailResponse = (res) => {
    const data = res?.data || {};
    const rawList =
      data.emails || data.Emails || (Array.isArray(data) ? data : []);
    const list = rawList.map((e, i) => ({
      InboxEmailId: e.InboxEmailId ?? e.inboxEmailId ?? i,
      EmailResponseId: e.EmailResponseId ?? e.emailResponseId,
      ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime,
      Subject: e.Subject ?? e.subject,
      From: e.From ?? e.from,
      Status: e.Status ?? e.status,
      Priority: e.Priority ?? e.priority ?? null,
      IsForwardedToInternalTeam:
        e.IsForwardedToInternalTeam ?? e.isForwardedToInternalTeam ?? null,
      IsSpamEMS: e.IsSpamEMS ?? e.isSpamEMS ?? null,
    }));
    setEmails(list);
    const total =
      data.totalCount ?? data.TotalCount ?? data.count ?? list.length;
    setTotalCount(total);
  };

  const handleSearch = () => {
    const vals = form.getFieldsValue();
    const payload = {
      fromDate: vals.fromDate
        ? vals.fromDate.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      toDate: vals.toDate
        ? vals.toDate.format("YYYY-MM-DD")
        : dayjs().format("YYYY-MM-DD"),
      statusCondition: (vals.status || "PENDING").toUpperCase(),
    };
    setSearchParams(payload);
    persistedUserAssignedSearchParams = payload;
    fetchUserAssignedEmails(payload);
    fetchUserDashboardCounts();
  };

  const refreshAll = () => {
    fetchUserDashboardCounts();
    if (searchParams) fetchUserAssignedEmails(searchParams);
    else handleSearch();
  };

  const FilterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    dataIndex,
    formatter,
    values,
  }) => {
    const [searchText, setSearchText] = useState("");
    const filteredValues = (values || []).filter((v) =>
      (v || "").toString().toLowerCase().includes(searchText.toLowerCase())
    );
    const toggleValue = (val) => {
      const exists = selectedKeys.includes(val);
      const next = exists
        ? selectedKeys.filter((k) => k !== val)
        : [...selectedKeys, val];
      setSelectedKeys(next);
    };
    return (
      <div
        style={{ padding: 8, width: 240 }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          placeholder={`Search ${dataIndex}`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: 8 }}
          allowClear
          size="small"
        />
        <div style={{ maxHeight: 180, overflowY: "auto", marginBottom: 8 }}>
          {filteredValues.map((v) => (
            <Checkbox
              key={v}
              checked={selectedKeys.includes(v)}
              onChange={() => toggleValue(v)}
              style={{ display: "block", margin: "4px 0" }}
            >
              {formatter(v)}
            </Checkbox>
          ))}
          {filteredValues.length === 0 && (
            <div style={{ fontSize: 12, fontStyle: "italic" }}>No values</div>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            type="primary"
            size="small"
            onClick={() => confirm()}
            disabled={selectedKeys.length === 0}
          >
            Apply
          </Button>
          <Button
            size="small"
            onClick={() => {
              clearFilters?.();
              confirm();
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    );
  };

  const getFilterDropdown =
    (dataIndex, displayFormatter = (v) => v) =>
    (props) =>
      (
        <FilterDropdown
          {...props}
          dataIndex={dataIndex}
          formatter={displayFormatter}
          values={filterSets[dataIndex] || []}
        />
      );

  const textFilterOnFilter =
    (dataIndex, recordFormatter = (r) => r[dataIndex]) =>
    (value, record) => {
      const val = recordFormatter(record);
      if (Array.isArray(value)) {
        return value.some((v) => (val || "").toString() === v);
      }
      return (val || "").toString() === value;
    };

  const truncate = (val, max = 36) =>
    !val ? "-" : val.length > max ? val.slice(0, max).trim() + "..." : val;

  const columns = [
    {
      title: "Email Response Id",
      dataIndex: "EmailResponseId",
      sorter: (a, b) =>
        (a.EmailResponseId || "").localeCompare(b.EmailResponseId || ""),
      render: (val, record) => (
        <Tooltip title={val || "-"}>
          <span
            className="groupems-cell-click groupems-cell-ellipsis"
            onClick={() => setSelectedCase(record)}
          >
            {val || "-"}
          </span>
        </Tooltip>
      ),
      filterDropdown: getFilterDropdown("EmailResponseId"),
      onFilter: textFilterOnFilter("EmailResponseId"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      width: 150,
    },
    {
      title: "Received Date Time",
      dataIndex: "ReceivedDateTime",
      sorter: (a, b) =>
        new Date(a.ReceivedDateTime || 0) - new Date(b.ReceivedDateTime || 0),
      render: (_, r) =>
        r.ReceivedDateTime
          ? dayjs(r.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
          : "-",
      filterDropdown: getFilterDropdown("ReceivedDateTime"),
      onFilter: (values, record) => {
        const formatted = record.ReceivedDateTime
          ? dayjs(record.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
          : "";
        return values.includes(formatted);
      },
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      width: 170,
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      sorter: (a, b) => (a.Subject || "").localeCompare(b.Subject || ""),
      render: (val, record) => (
        <Tooltip title={val || "-"}>
          <span
            className="groupems-cell-click groupems-cell-ellipsis groupems-subject-text"
            onClick={() => setSelectedCase(record)}
          >
            {truncate(val, 45)}
          </span>
        </Tooltip>
      ),
      filterDropdown: getFilterDropdown("Subject"),
      onFilter: textFilterOnFilter("Subject"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      width: 340,
    },
    {
      title: "From",
      dataIndex: "From",
      sorter: (a, b) => (a.From || "").localeCompare(b.From || ""),
      render: (val) => (
        <Tooltip title={val || "-"}>
          <span className="groupems-cell-ellipsis">{truncate(val, 28)}</span>
        </Tooltip>
      ),
      filterDropdown: getFilterDropdown("From"),
      onFilter: textFilterOnFilter("From"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      width: 220,
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => (a.Status || "").localeCompare(b.Status || ""),
      filterDropdown: getFilterDropdown("Status", (v) => v),
      onFilter: textFilterOnFilter("Status", (r) =>
        (r.Status || "").toUpperCase()
      ),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      render: (s) => {
        const color =
          s === "PENDING" ? "orange" : s === "CLOSED" ? "green" : "default";
        return <Tag color={color}>{s || "-"}</Tag>;
      },
      width: 110,
    },
    {
      title: "Priority",
      dataIndex: "Priority",
      filters: [
        { text: "High", value: "High" },
        { text: "Medium", value: "Medium" },
        { text: "Low", value: "Low" },
        { text: "(None)", value: "__NONE__" },
      ],
      onFilter: (value, record) => {
        if (value === "__NONE__") return !record.Priority;
        return (record.Priority || "").toLowerCase() === value.toLowerCase();
      },
      render: (p) => {
        if (!p) return <span>-</span>;
        const c = p === "High" ? "red" : p === "Medium" ? "gold" : "default";
        return <Tag color={c}>{p}</Tag>;
      },
      width: 100,
    },
    {
      title: "Taken Actions",
      dataIndex: "TakenActions",
      width: 220,
      filters: [
        { text: "Forwarded", value: "FORWARDED" },
        { text: "Spam", value: "SPAM" },
        { text: "No Action", value: "NONE" },
      ],
      onFilter: (val, record) => {
        const f = record.IsForwardedToInternalTeam === true;
        const s = record.IsSpamEMS === true;
        switch (val) {
          case "FORWARDED":
            return f;
          case "SPAM":
            return s;
          case "NONE":
            return !f && !s;
          default:
            return true;
        }
      },
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      render: (_, record) => {
        if (!["PENDING", "CLOSED"].includes(record.Status))
          return <span>-</span>;
        const pills = [];
        if (record.IsForwardedToInternalTeam === true) {
          pills.push(
            <span className="ems-pill ems-pill-forward" key="forward">
              <SwapRightOutlined /> Forwarded
            </span>
          );
        }
        if (record.IsSpamEMS === true) {
          pills.push(
            <span className="ems-pill ems-pill-spam" key="spam">
              <WarningOutlined /> Spam
            </span>
          );
        }
        if (!record.IsForwardedToInternalTeam && !record.IsSpamEMS) {
          pills.push(
            <span className="ems-pill ems-pill-neutral" key="none">
              No Action
            </span>
          );
        }
        return <div className="ems-pill-group">{pills}</div>;
      },
    },
  ];

  /*   const tableOnRow = (record) => ({
      onClick: () => setSelectedCase(record),
      style: { cursor: "pointer" },
    }); */

  const handleBackFromCase = () => {
    setSelectedCase(null);
    fetchUserDashboardCounts();
    if (searchParams) fetchUserAssignedEmails(searchParams);
  };

  if (selectedCase) {
    return (
      <UserCaseAction
        inboxEmailId={selectedCase.InboxEmailId}
        emailResponseId={selectedCase.EmailResponseId}
        onBack={handleBackFromCase}
      />
    );
  }

  return (
    <div className="groupems-user-main-wrapper">
      <div className="groupems-user-main-card">
        <Spin spinning={loadingCounts}>
          <div className="user-card-stats-row">
            <div className="groupems-card user-stat-card">
              <div className="groupems-card-content">
                <div className="groupems-card-number">
                  {userOverview.pending}
                </div>
                <div className="groupems-card-label">Pending Tickets</div>
              </div>
            </div>
            <div className="groupems-card user-stat-card">
              <div className="groupems-card-content">
                <div className="groupems-card-number">
                  {userOverview.closed}
                </div>
                <div className="groupems-card-label">Closed Tickets</div>
              </div>
            </div>
            <div className="groupems-card user-stat-card">
              <div className="groupems-card-content">
                <div className="groupems-card-number">{userOverview.total}</div>
                <div className="groupems-card-label">Total Tickets</div>
              </div>
            </div>
          </div>
        </Spin>

        <div className="user-filter-bar-card">
          <Form form={form} layout="vertical" className="w-100">
            <Row gutter={[16, 12]} align="bottom">
              <Col xs={24} md={6}>
                <Form.Item
                  label="From Date"
                  name="fromDate"
                  className="inputs-label mb-0"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    className="cust-input"
                    format="DD/MM/YYYY"
                    disabledDate={(c) => c && c > dayjs().endOf("day")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="To Date"
                  name="toDate"
                  className="inputs-label mb-0"
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    className="cust-input"
                    format="DD/MM/YYYY"
                    disabledDate={(c) => c && c > dayjs().endOf("day")}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={6}>
                <Form.Item
                  label="Status"
                  name="status"
                  className="inputs-label mb-0"
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Select Status"
                    className="cust-input"
                  >
                    <Option value="ALL">ALL</Option>
                    <Option value="PENDING">Pending</Option>
                    <Option value="CLOSED">Closed</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col
                xs={24}
                md={6}
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-end",
                }}
              >
                <Button
                  type="primary"
                  className="primary-btn flex-grow-1"
                  onClick={handleSearch}
                >
                  Search
                </Button>
                <Button
                  type="default"
                  className="refresh-inline-btn"
                  icon={
                    <ReloadOutlined style={{ color: "#fff", fontSize: 16 }} />
                  }
                  onClick={refreshAll}
                />
              </Col>
            </Row>
          </Form>
        </div>

        <Spin spinning={tableLoading}>
          <div className="user-table-card">
            <Table
              className="custom-table"
              columns={columns}
              dataSource={emails.map((e, i) => ({ ...e, key: `USR-${i}` }))}
              pagination={{
                pageSize: 100,
                showSizeChanger: false,
                total: totalCount,
                showTotal: (t) => `Total ${t} emails`,
              }}
              rowKey="InboxEmailId"
              size="middle"
              showSorterTooltip={{ target: "sorter-icon" }}
              onRow={() => ({})}
              scroll={{ x: 1300 }}
            />
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default GroupEmsUserDashboard;
