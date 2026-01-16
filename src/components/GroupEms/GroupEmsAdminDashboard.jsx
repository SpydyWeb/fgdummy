import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  DatePicker,
  Select,
  Button,
  Table,
  Spin,
  message,
  Tabs,
  Input,
  Checkbox,
  Tag,
  Modal,
  Tooltip,
} from "antd";
import {
  ReloadOutlined,
  FileExcelOutlined,
  SwapRightOutlined,
  WarningOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import TatHolidayMenu from "./TatHolidayMenu";
import apicalls from "../../api/apiCalls";
import dayjs from "dayjs";
import "./GroupEms.css";
import DatePipe from "./Common/DatePipe";
import CasesWorkBenchAdmin from "./CasesWorkBenchAdmin";
import BulkSpamUpdate from "./BulkSpamUpdate";
import AdminReassignCases from "./AdminReassignCases";
import ReusableTable from "../Common/ReusableTable";
const { Option } = Select;

const GroupEmsAdminDashboard = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [overview, setOverview] = useState({
    new: 0,
    pending: 0,
    closed: 0,
    total: 0,
  });
  const [emails, setEmails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [activeTab, setActiveTab] = useState("NEW");
  const [userCases, setUserCases] = useState([]);
  const [userCasesTotalCount, setUserCasesTotalCount] = useState(0);
  const [loadingUserCases, setLoadingUserCases] = useState(false);
  const [filterSets, setFilterSets] = useState({
    EmailResponseId: [],
    ReceivedDateTime: [],
    Subject: [],
    From: [],
    Status: [],
  });
  const [assignedEmails, setAssignedEmails] = useState([]);
  const [showTatConfig, setShowTatConfig] = useState(false);
  const [showBulkSpam, setShowBulkSpam] = useState(false);
  const [assignedTotalCount, setAssignedTotalCount] = useState(0);
  const [assignedLoading, setAssignedLoading] = useState(false);
  const [filterSetsAssigned, setFilterSetsAssigned] = useState({
    EmailResponseId: [],
    ReceivedDateTime: [],
    Subject: [],
    From: [],
    AssignedTo: [],
    Status: [],
    Priority: [],
  });
  const [selectedCase, setSelectedCase] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [assignedSearchParams, setAssignedSearchParams] = useState(null);
  const didInitAssigned = useRef(false);
  const [showReassignModal, setShowReassignModal] = useState(false);

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
      Status: uniq(emails.map((e) => (e.Status || "").toUpperCase())),
    });
  }, [emails]);

  useEffect(() => {
    fetchDashboardCounts();
    fetchInitialEmails();
    fetchUserCasesCount();
    fetchInitialAssignedCases();
  }, []);

  const handleBack = () => {
    setSelectedCase(null);
    fetchDashboardCounts();
    fetchInitialEmails();
    fetchUserCasesCount();
    if (assignedSearchParams) {
      form.setFieldsValue({
        fromDate: dayjs(assignedSearchParams.fromDate),
        toDate: dayjs(assignedSearchParams.toDate),
        status: assignedSearchParams.statusCondition,
      });
      fetchAssignedCases(assignedSearchParams);
    }
  };

  useEffect(() => {
    if (didInitAssigned.current) return;
    didInitAssigned.current = true;
    if (!assignedSearchParams) {
      const { start, end } = getCurrentWeekRange();
      const initial = {
        fromDate: start.format("YYYY-MM-DD"),
        toDate: end.format("YYYY-MM-DD"),
        statusCondition: "PENDING",
      };
      form.setFieldsValue({ fromDate: start, toDate: end, status: "PENDING" });
      setAssignedSearchParams(initial);
      fetchAssignedCases(initial);
    }
  }, [assignedSearchParams, form]);

  const getCurrentWeekRange = () => {
    const today = dayjs();
    const startOfWeek = today.startOf("week").add(1, "day");
    const endOfWeek = startOfWeek.add(6, "day").endOf("day");
    return { start: startOfWeek, end: endOfWeek };
  };

  const fetchInitialAssignedCases = async () => {
    setAssignedLoading(true);
    try {
      const { start, end } = getCurrentWeekRange();
      form.setFieldsValue({ fromDate: start, toDate: end, status: "ALL" });
      const payload = {
        fromDate: start.format("YYYY-MM-DD"),
        toDate: end.format("YYYY-MM-DD"),
        statusCondition: "ALL",
      };
      const res = await apicalls.GetRecivedEmails(payload);
      const data = res?.data || {};
      const rawList =
        data.emails || data.Emails || (Array.isArray(data) ? data : []);
      const list = rawList.map((e) => ({
        InboxEmailId: e.InboxEmailId ?? e.inboxEmailId,
        EmailResponseId: e.EmailResponseId ?? e.emailResponseId,
        ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime,
        Subject: e.Subject ?? e.subject,
        From: e.From ?? e.from,
        AssignedTo: e.AssignedTo ?? e.assignedTo ?? "",
        Status: e.Status ?? e.status,
        Priority: e.Priority ?? e.priority ?? null,
        IsForwardedToInternalTeam:
          e.IsForwardedToInternalTeam ?? e.isForwardedToInternalTeam ?? null,
        IsSpamEMS: e.IsSpamEMS ?? e.isSpamEMS ?? null,
      }));
      setAssignedEmails(list);
      const total =
        data.totalCount ?? data.TotalCount ?? data.count ?? list.length;
      setAssignedTotalCount(total);
      applyAssignedOverviewCounts(data);
    } catch {
      /* empty */
    } finally {
      setAssignedLoading(false);
    }
  };

  useEffect(() => {
    const uniq = (arr) => [...new Set(arr.filter(Boolean))];
    setFilterSetsAssigned({
      EmailResponseId: uniq(assignedEmails.map((e) => e.EmailResponseId)),
      ReceivedDateTime: uniq(
        assignedEmails.map(
          (e) =>
            e.ReceivedDateTime &&
            dayjs(e.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
        )
      ),
      Subject: uniq(assignedEmails.map((e) => e.Subject)),
      From: uniq(assignedEmails.map((e) => e.From)),
      AssignedTo: uniq(assignedEmails.map((e) => e.AssignedTo)),
      Status: uniq(assignedEmails.map((e) => (e.Status || "").toUpperCase())),
      Priority: uniq(assignedEmails.map((e) => e.Priority)),
    });
  }, [assignedEmails]);

  const fetchDashboardCounts = async () => {
    try {
      const res = await apicalls.GetDashboardCasesCount({});
      const data = res?.data || {};
      const newCount =
        data.newCount ?? data.NewCount ?? data.new ?? data.New ?? 0;
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
        newCount + pendingCount + closedCount;
      setOverview({
        new: newCount,
        pending: pendingCount,
        closed: closedCount,
        total: totalCount,
      });
    } catch {
      /* empty */
    }
  };

  const fetchInitialEmails = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        fromDate: "2025-01-01",
        toDate: dayjs().format("YYYY-MM-DD"),
        statusCondition: "NEW",
      };
      const res = await apicalls.GetRecivedEmails(payload);
      handleEmailResponse(res);
    } catch {
      setError("Failed to load emails");
      message.destroy();
      message.error({
        content: "Failed to load emails",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailResponse = (res) => {
    const data = res?.data || {};
    const rawList =
      data.emails || data.Emails || (Array.isArray(data) ? data : []);
    const list = rawList.map((e) => ({
      InboxEmailId: e.InboxEmailId ?? e.inboxEmailId,
      EmailResponseId: e.EmailResponseId ?? e.emailResponseId,
      ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime,
      Subject: e.Subject ?? e.subject,
      From: e.From ?? e.from,
      Status: e.Status ?? e.status,
    }));
    setEmails(list);
    const total =
      data.totalCount ?? data.TotalCount ?? data.count ?? list.length;
    setTotalCount(total);
  };

  const fetchAssignedCases = async (payloadOverride) => {
    setAssignedLoading(true);
    try {
      let payload;
      if (payloadOverride) {
        payload = payloadOverride;
      } else {
        const vals = form.getFieldsValue();
        const fromDate = vals.fromDate
          ? vals.fromDate.format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD");
        const toDate = vals.toDate
          ? vals.toDate.format("YYYY-MM-DD")
          : dayjs().format("YYYY-MM-DD");
        payload = {
          fromDate,
          toDate,
          statusCondition: (vals.status || "PENDING").toUpperCase(),
        };
      }
      const res = await apicalls.GetRecivedEmails(payload);
      const data = res?.data || {};
      const rawList =
        data.emails || data.Emails || (Array.isArray(data) ? data : []);
      const list = rawList.map((e, i) => ({
        InboxEmailId: e.InboxEmailId ?? e.inboxEmailId ?? i,
        EmailResponseId: e.EmailResponseId ?? e.emailResponseId,
        ReceivedDateTime: e.ReceivedDateTime ?? e.receivedDateTime,
        Subject: e.Subject ?? e.subject,
        From: e.From ?? e.from,
        AssignedTo: e.AssignedTo ?? e.assignedTo ?? "",
        Status: e.Status ?? e.status,
        Priority: e.Priority ?? e.priority ?? null,
        IsForwardedToInternalTeam:
          e.IsForwardedToInternalTeam ?? e.isForwardedToInternalTeam ?? null,
        IsSpamEMS: e.IsSpamEMS ?? e.isSpamEMS ?? null,
      }));
      setAssignedEmails(list);
      setAssignedTotalCount(
        data.totalCount ?? data.TotalCount ?? data.count ?? list.length
      );
      applyAssignedOverviewCounts(data);
      const uniq = (arr) => [...new Set(arr.filter(Boolean))];
      setFilterSetsAssigned({
        EmailResponseId: uniq(list.map((e) => e.EmailResponseId)),
        ReceivedDateTime: uniq(
          list.map(
            (e) =>
              e.ReceivedDateTime &&
              dayjs(e.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
          )
        ),
        Subject: uniq(list.map((e) => e.Subject)),
        From: uniq(list.map((e) => e.From)),
        AssignedTo: uniq(list.map((e) => e.AssignedTo)),
        Status: uniq(list.map((e) => (e.Status || "").toUpperCase())),
        Priority: uniq(list.map((e) => e.Priority)),
      });
    } catch {
      message.destroy();
      message.error({
        content: "Failed to load assigned cases",
        className: "custom-msg",
        duration: 2,
      });
    } finally {
      setAssignedLoading(false);
    }
  };

  const handleAssignedSearch = () => {
    if (activeTab !== "ASSIGNED") setActiveTab("ASSIGNED");
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
    setAssignedSearchParams(payload);
    fetchAssignedCases(payload);
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
    (dataIndex, displayFormatter = (v) => v, source = "new") =>
    (props) =>
      (
        <FilterDropdown
          {...props}
          dataIndex={dataIndex}
          formatter={displayFormatter}
          values={
            source === "assigned"
              ? filterSetsAssigned[dataIndex] || []
              : filterSets[dataIndex] || []
          }
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

  const truncateSubject = (val) => {
    if (!val) return "-";
    const max = 30; // adjust if needed
    return val.length > max ? val.slice(0, max).trim() + "..." : val;
  };

  const truncateGeneric = (val, max = 20) => {
    if (!val) return "-";
    return val.length > max ? val.slice(0, max).trim() + "..." : val;
  };

  // NEW tab columns (click only on EmailResponseId & Subject)
  const buildColumns = () => [
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
    },
    {
      title: "Received Date Time",
      dataIndex: "ReceivedDateTime",
      sorter: (a, b) =>
        new Date(a.ReceivedDateTime || 0) - new Date(b.ReceivedDateTime || 0),
      render: (_, r) => {
        const dt = r.ReceivedDateTime ? dayjs(r.ReceivedDateTime) : null;
        const daysPassed = dt
          ? dayjs().startOf("day").diff(dt.startOf("day"), "day")
          : null;
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DatePipe value={r.ReceivedDateTime} />
            {daysPassed !== null && (
              <span
                title={`${daysPassed} day(s) since received`}
                className="day-badge"
                style={{
                  minWidth: 24,
                  height: 24,
                  lineHeight: "24px",
                  fontSize: 11,
                }}
              >
                {daysPassed}
              </span>
            )}
          </div>
        );
      },
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
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      sorter: (a, b) => (a.Subject || "").localeCompare(b.Subject || ""),
      render: (val, record) => {
        const short = truncateSubject(val);
        return (
          <Tooltip title={val || "-"}>
            <span
              className="groupems-cell-click groupems-cell-ellipsis groupems-subject-text"
              onClick={() => setSelectedCase(record)}
            >
              {short}
            </span>
          </Tooltip>
        );
      },
      filterDropdown: getFilterDropdown("Subject"),
      onFilter: textFilterOnFilter("Subject"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "From",
      dataIndex: "From",
      sorter: (a, b) => (a.From || "").localeCompare(b.From || ""),
      render: (val) => {
        const short = truncateGeneric(val, 25);
        return (
          <Tooltip title={val || "-"}>
            <span className="groupems-cell-ellipsis">{short}</span>
          </Tooltip>
        );
      },
      filterDropdown: getFilterDropdown("From"),
      onFilter: textFilterOnFilter("From"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => (a.Status || "").localeCompare(b.Status || ""),
      render: (val) => (
        <Tooltip title={val || "-"}>
          <span className="groupems-cell-ellipsis">{val || "-"}</span>
        </Tooltip>
      ),
      filterDropdown: getFilterDropdown("Status", (v) => v),
      onFilter: textFilterOnFilter("Status", (r) =>
        (r.Status || "").toUpperCase()
      ),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
  ];

  // ASSIGNED tab columns (click only on EmailResponseId & Subject)
  const buildAssignedColumns = () => [
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
      filterDropdown: getFilterDropdown(
        "EmailResponseId",
        (v) => v,
        "assigned"
      ),
      onFilter: textFilterOnFilter("EmailResponseId"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "Received Date Time",
      dataIndex: "ReceivedDateTime",
      sorter: (a, b) =>
        new Date(a.ReceivedDateTime || 0) - new Date(b.ReceivedDateTime || 0),
      render: (_, r) => <DatePipe value={r.ReceivedDateTime} />,
      filterDropdown: getFilterDropdown(
        "ReceivedDateTime",
        (v) => v,
        "assigned"
      ),
      onFilter: (values, record) => {
        const formatted = record.ReceivedDateTime
          ? dayjs(record.ReceivedDateTime).format("DD/MM/YYYY | HH:mm")
          : "";
        return values.includes(formatted);
      },
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "Subject",
      dataIndex: "Subject",
      sorter: (a, b) => (a.Subject || "").localeCompare(b.Subject || ""),
      render: (val, record) => {
        const short = truncateSubject(val);
        return (
          <Tooltip title={val || "-"}>
            <span
              className="groupems-cell-click groupems-cell-ellipsis groupems-subject-text"
              onClick={() => setSelectedCase(record)}
            >
              {short}
            </span>
          </Tooltip>
        );
      },
      filterDropdown: getFilterDropdown("Subject", (v) => v, "assigned"),
      onFilter: textFilterOnFilter("Subject"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "From",
      dataIndex: "From",
      sorter: (a, b) => (a.From || "").localeCompare(b.From || ""),
      render: (val) => {
        const short = truncateGeneric(val, 25);
        return (
          <Tooltip title={val || "-"}>
            <span className="groupems-cell-ellipsis">{short}</span>
          </Tooltip>
        );
      },
      filterDropdown: getFilterDropdown("From", (v) => v, "assigned"),
      onFilter: textFilterOnFilter("From"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "Assigned To",
      dataIndex: "AssignedTo",
      sorter: (a, b) => (a.AssignedTo || "").localeCompare(b.AssignedTo || ""),
      render: (val) => {
        const short = truncateGeneric(val, 18);
        return (
          <Tooltip title={val || "-"}>
            <span className="groupems-cell-ellipsis">{short}</span>
          </Tooltip>
        );
      },
      filterDropdown: getFilterDropdown("AssignedTo", (v) => v, "assigned"),
      onFilter: textFilterOnFilter("AssignedTo"),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => (a.Status || "").localeCompare(b.Status || ""),
      filterDropdown: getFilterDropdown("Status", (v) => v, "assigned"),
      onFilter: textFilterOnFilter("Status", (r) =>
        (r.Status || "").toUpperCase()
      ),
      filterIcon: (filtered) => (
        <span style={{ color: filtered ? "#c21b17" : undefined }}>▼</span>
      ),
      render: (s) => {
        const color =
          s === "NEW"
            ? "geekblue"
            : s === "PENDING"
            ? "orange"
            : s === "CLOSED"
            ? "green"
            : "default";
        return <Tag color={color}>{s || "-"}</Tag>;
      },
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
    },
    {
      title: "Taken Actions",
      dataIndex: "TakenActions",
      width: 220,
      filters: [
        { text: "Forwarded", value: "FORWARDED" },
        { text: "Spam", value: "SPAM" },
      ],
      onFilter: (val, record) => {
        const f = record.IsForwardedToInternalTeam === true;
        const s = record.IsSpamEMS === true;
        if (val === "FORWARDED") return f;
        if (val === "SPAM") return s;
        return true;
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
              <SwapRightOutlined /> Forwarded Case
            </span>
          );
        }
        if (record.IsSpamEMS === true) {
          pills.push(
            <span className="ems-pill ems-pill-spam" key="spam">
              <WarningOutlined /> Spam Case
            </span>
          );
        }
        return (
          <div className="ems-pill-group">
            {pills.length ? pills : <span>-</span>}
          </div>
        );
      },
    },
  ];

  const tableOnChange = () => {};

  const fetchUserCasesCount = async () => {
    setLoadingUserCases(true);
    try {
      const res = await apicalls.GetUserCasesCount({});
      const rawContainer = res?.data ?? res ?? {};
      const raw =
        (Array.isArray(rawContainer) && rawContainer) ||
        rawContainer.userCasesCount ||
        [];
      const arrSource = Array.isArray(raw)
        ? raw
        : Object.values(raw).find((v) => Array.isArray(v)) || [];
      const list = arrSource.map((u, i) => {
        const usrId = u.UsrID ?? u.usrID ?? u.userId ?? u.UserId ?? "";
        const pending = u.PendingCount ?? u.pendingCount ?? 0;
        const closed = u.ClosedCount ?? u.closedCount ?? 0;
        const total = u.TotalCount ?? u.totalCount ?? pending + closed;
        return {
          key: usrId || i,
          UsrID: usrId,
          PendingCount: pending,
          ClosedCount: closed,
          TotalCount: total,
        };
      });
      setUserCases(list);
      setUserCasesTotalCount(list.length);
    } catch {
      setUserCases([]);
      setUserCasesTotalCount(0);
    } finally {
      setLoadingUserCases(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setReportLoading(true);
      const { fromDate, toDate, status } = form.getFieldsValue();
      const payload = {
        fromDate: fromDate ? dayjs(fromDate).format("YYYY-MM-DD") : null,
        toDate: toDate ? dayjs(toDate).format("YYYY-MM-DD") : null,
        statusCondition: status || "ALL",
      };
      const res = await apicalls.GetGrpEmsReportBasedOnCondition(payload);
      const fileName =
        res?.data?.fileName ||
        res?.fileName ||
        `AssignedCases_${Date.now()}.xlsx`;
      let b64 = res?.data?.reportBase64 || res?.ReportBase64 || "";
      if (b64) {
        b64 = b64.replace(/^data:.*?base64,/, "").trim();
        const isLikelyBase64 = /^[A-Za-z0-9+/=\r\n]+$/.test(b64);
        if (!isLikelyBase64) {
          message.error("Invalid base64 report data");
        } else {
          const lowerName = fileName.toLowerCase();
          const mime = lowerName.endsWith(".xls")
            ? "application/vnd.ms-excel"
            : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
          const byteChars = atob(b64);
          const byteArray = new Uint8Array(byteChars.length);
          for (let i = 0; i < byteChars.length; i++)
            byteArray[i] = byteChars.charCodeAt(i);
          const blob = new Blob([byteArray], { type: mime });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download =
            fileName.endsWith(".xls") || fileName.endsWith(".xlsx")
              ? fileName
              : fileName + ".xlsx";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => URL.revokeObjectURL(link.href), 250);
          message.success("Excel report downloaded");
        }
        return;
      }
      const rows =
        res?.data?.rows || res?.rows || res?.data?.Items || res?.Items || [];
      if (Array.isArray(rows) && rows.length) {
        const headers = Object.keys(rows[0]);
        const csv = [
          headers.join(","),
          ...rows.map((r) =>
            headers
              .map((h) =>
                (r[h] ?? "")
                  .toString()
                  .replace(/"/g, '""')
                  .replace(/\r?\n/g, " ")
              )
              .map((v) => `"${v}"`)
              .join(",")
          ),
        ].join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileName.replace(/\.xlsx?$/i, "") + ".csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(link.href), 250);
        message.success("CSV report downloaded");
        return;
      }
      message.info("No report data found");
    } catch {
      message.error("Report download failed");
    } finally {
      setReportLoading(false);
    }
  };

  const applyAssignedOverviewCounts = (data) => {
    if (activeTab !== "ASSIGNED") return;
    const newCount =
      data.newCount ?? data.NewCount ?? data.new ?? data.New ?? 0;
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
      newCount + pendingCount + closedCount;
    setOverview({
      new: newCount,
      pending: pendingCount,
      closed: closedCount,
      total: totalCount,
    });
  };

  const userCasesColumns = [
    {
      title: "User ID",
      dataIndex: "UsrID",
      sorter: (a, b) => (a.UsrID || "").localeCompare(b.UsrID || ""),
      filters: userCases.map((x) => ({ text: x.UsrID, value: x.UsrID })),
      onFilter: (val, record) => record.UsrID === val,
    },
    {
      title: "Pending",
      dataIndex: "PendingCount",
      sorter: (a, b) => (a.PendingCount || 0) - (b.PendingCount || 0),
    },
    {
      title: "Closed",
      dataIndex: "ClosedCount",
      sorter: (a, b) => (a.ClosedCount || 0) - (b.ClosedCount || 0),
    },
    {
      title: "Total",
      dataIndex: "TotalCount",
      sorter: (a, b) => (a.TotalCount || 0) - (b.TotalCount || 0),
    },
  ];

  if (showTatConfig) {
    return (
      <TatHolidayMenu
        onBack={() => {
          setShowTatConfig(false);
          handleBack();
        }}
      />
    );
  }

  if (showBulkSpam) {
    return (
      <BulkSpamUpdate
        onBack={() => {
          setShowBulkSpam(false);
          handleBack();
        }}
      />
    );
  }
  if (selectedCase) {
    return (
      <CasesWorkBenchAdmin
        inboxEmailId={selectedCase.InboxEmailId}
        emailResponseId={selectedCase.EmailResponseId}
        onBack={handleBack}
      />
    );
  }

  return (
    <div className="groupems-admin-dashboard">
      <div className="groupems-dashboard-inner">
        <div className="groupems-overview-wrapper mb-16 mt-20">
          <div className="groupems-card">
            <div className="groupems-card-content">
              <div className="groupems-card-number">{overview.new}</div>
              <div className="groupems-card-label">New Tickets</div>
            </div>
          </div>
          <div className="groupems-card">
            <div className="groupems-card-content">
              <div className="groupems-card-number">{overview.pending}</div>
              <div className="groupems-card-label">Pending Tickets</div>
            </div>
          </div>
          <div className="groupems-card">
            <div className="groupems-card-content">
              <div className="groupems-card-number">{overview.closed}</div>
              <div className="groupems-card-label">Closed Tickets</div>
            </div>
          </div>
          <div className="groupems-card">
            <div className="groupems-card-content">
              <div className="groupems-card-number">{overview.total}</div>
              <div className="groupems-card-label">Total Tickets</div>
            </div>
          </div>
        </div>

        <Spin spinning={loading}>
          {error && <p className="error-text italic mb-8">{error}</p>}
          <div className="groupems-tabs-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 4,
              }}
            >
              <Button
                type="text"
                onClick={handleBack}
                icon={
                  <ReloadOutlined style={{ color: "#ff4d4f", fontSize: 18 }} />
                }
                title="Refresh"
              />
              <Button
                type="text"
                onClick={() => {
                  setSelectedCase(null);
                  setShowTatConfig(true);
                }}
                icon={
                  <ClockCircleOutlined
                    style={{ color: "#0958d9", fontSize: 18 }}
                  />
                }
                title="TAT / Holidays"
              />
              <Button
                type="text"
                onClick={() => {
                  setSelectedCase(null);
                  setShowBulkSpam(true);
                }}
                icon={
                  <WarningOutlined style={{ color: "#c21b17", fontSize: 18 }} />
                }
                title="Bulk Spam Update"
              />
            </div>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={[
                {
                  key: "NEW",
                  label: "New Cases",
                  children: (
                    <ReusableTable
                      className="custom-table"
                      columns={buildColumns()}
                      data={emails.map((e, i) => ({ ...e, key: i }))}
                      pagination={{
                        pageSize: 100,
                        showSizeChanger: false,
                        total: totalCount,
                        showTotal: (t) => `Total ${t} emails`,
                      }}
                      rowKey="InboxEmailId"
                      size="middle"
                      onChange={tableOnChange}
                      showSorterTooltip={{ target: "sorter-icon" }}
                      onRow={() => ({})}
                    />
                  ),
                },
                {
                  key: "USERCASES",
                  label: "User Cases",
                  children: (
                    <Spin spinning={loadingUserCases}>
                      <ReusableTable
                        className="custom-table"
                        columns={userCasesColumns}
                        data={userCases}
                        pagination={{
                          pageSize: 100,
                          showSizeChanger: false,
                          total: userCasesTotalCount,
                          showTotal: (t) => `Total ${t} users`,
                        }}
                        rowKey="UsrID"
                        size="middle"
                        onRow={() => ({})}
                      />
                    </Spin>
                  ),
                },
                {
                  key: "ASSIGNED",
                  label: "Assigned Cases",
                  children: (
                    <>
                      <div className="assigned-filter-wrapper mb-12">
                        <Form
                          form={form}
                          layout="vertical"
                          className="assigned-filter-form"
                        >
                          {/* First Row - Filter Fields and Search Button */}
                          <div
                            style={{
                              display: "flex",
                              gap: "16px",
                              alignItems: "end",
                              marginBottom: "12px",
                              flexWrap: "wrap",
                            }}
                          >
                            <div style={{ flex: "1", minWidth: "200px" }}>
                              <Form.Item
                                label="From Date"
                                name="fromDate"
                                className="inputs-label mb-0"
                                style={{ marginBottom: 0 }}
                              >
                                <DatePicker
                                  style={{ width: "100%" }}
                                  className="cust-input"
                                  format="DD/MM/YYYY"
                                  disabledDate={(c) =>
                                    c && c > dayjs().endOf("day")
                                  }
                                />
                              </Form.Item>
                            </div>

                            <div style={{ flex: "1", minWidth: "200px" }}>
                              <Form.Item
                                label="To Date"
                                name="toDate"
                                className="inputs-label mb-0"
                                style={{ marginBottom: 0 }}
                              >
                                <DatePicker
                                  style={{ width: "100%" }}
                                  className="cust-input"
                                  format="DD/MM/YYYY"
                                  disabledDate={(c) =>
                                    c && c > dayjs().endOf("day")
                                  }
                                />
                              </Form.Item>
                            </div>

                            <div style={{ flex: "1", minWidth: "180px" }}>
                              <Form.Item
                                label="Status"
                                name="status"
                                className="inputs-label mb-0"
                                style={{ marginBottom: 0 }}
                              >
                                <Select
                                  showSearch
                                  allowClear
                                  placeholder="Select Status"
                                  className="cust-input"
                                  style={{ width: "100%" }}
                                >
                                  <Option value="ALL">ALL</Option>
                                  <Option value="NEW">NEW</Option>
                                  <Option value="PENDING">Pending</Option>
                                  <Option value="CLOSED">Closed</Option>
                                </Select>
                              </Form.Item>
                            </div>

                            <div style={{ flexShrink: 0 }}>
                              <Button
                                type="primary"
                                className="primary-btn"
                                onClick={handleAssignedSearch}
                                style={{ height: "32px" }}
                              >
                                Search
                              </Button>
                            </div>
                          </div>

                          {/* Second Row - Action Buttons (Right Aligned) */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "12px",
                              flexWrap: "wrap",
                            }}
                          >
                            <Button
                              type="primary"
                              className="primary-btn"
                              icon={<FileExcelOutlined />}
                              onClick={handleDownloadReport}
                              loading={reportLoading}
                            >
                              Download Report
                            </Button>
                            <Button
                              type="primary"
                              danger
                              className="primary-btn"
                              onClick={() => setShowReassignModal(true)}
                            >
                              Reassign Cases
                            </Button>
                          </div>
                        </Form>
                      </div>
                      <Spin spinning={assignedLoading}>
                        <ReusableTable
                          className="custom-table"
                          columns={buildAssignedColumns()}
                          data={assignedEmails.map((e, i) => ({
                            ...e,
                            key: `AS-${i}`,
                          }))}
                          pagination={{
                            pageSize: 100,
                            showSizeChanger: false,
                            total: assignedTotalCount,
                            showTotal: (t) => `Total ${t} emails`,
                          }}
                          rowKey="InboxEmailId"
                          size="middle"
                          showSorterTooltip={{ target: "sorter-icon" }}
                          onChange={tableOnChange}
                          onRow={() => ({})}
                        />
                      </Spin>
                    </>
                  ),
                },
              ]}
              className="groupems-ant-tabs"
            />
          </div>
        </Spin>
      </div>
      <Modal
        open={showReassignModal}
        onCancel={() => setShowReassignModal(false)}
        footer={null}
        width={1000}
        destroyOnClose
        centered
        title={null}
        bodyStyle={{ padding: 0 }}
        closable={false}
      >
        <AdminReassignCases onClose={() => setShowReassignModal(false)} />
      </Modal>
    </div>
  );
};

export default GroupEmsAdminDashboard;
