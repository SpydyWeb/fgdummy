import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
  Tabs,
  DatePicker,
  Input,
  message,
  Tooltip,
  Modal,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  RollbackOutlined,
  ReloadOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  SearchOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./TatHolidayMenu.css";
import apicalls from "../../api/apiCalls";

const { Text } = Typography;
const { Option } = Select;

const TatHolidayMenu = ({ onBack }) => {
  const [tatForm] = Form.useForm();
  const [holidayForm] = Form.useForm();

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

  const [tatData, setTatData] = useState([]);
  const [holidayData, setHolidayData] = useState([]);
  const [callTypeOptions, setCallTypeOptions] = useState([]);
  const [subTypeMap, setSubTypeMap] = useState({});

  const [loadingTat, setLoadingTat] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);
  const [savingTat, setSavingTat] = useState(false);
  const [savingHoliday, setSavingHoliday] = useState(false);

  const [editKey, setEditKey] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [activeTab, setActiveTab] = useState("tat");
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [newCallTypeId, setNewCallTypeId] = useState(null);

  // column search state
  const [searchTexts, setSearchTexts] = useState({});
  const searchInputRef = useRef(null);

  useEffect(() => {
    fetchCTST();
    fetchTatMaster();
    fetchHolidays();
  }, []);

  const fetchCTST = async () => {
    try {
      if (!apicalls?.GetGroupEmsCTSTList) {
        message.error("API GetGroupEmsCTSTList not available");
        return;
      }
      const res = await apicalls.GetGroupEmsCTSTList({});
      const list =
        res?.data?.GroupEmsCTSTList ||
        res?.data?.groupEmsCTSTList ||
        res?.GroupEmsCTSTList ||
        [];
      const calls = [];
      const subs = {};
      list.forEach((x) => {
        const cId = String(x.callTypeId ?? x.CallTypeId ?? "").trim();
        const cName = (x.callType ?? x.CallType ?? "").trim();
        const sIdRaw = x.subTypeId ?? x.SubTypeId;
        const sName = (x.subType ?? x.SubType ?? "").trim();
        if (cId && cName) {
          if (!calls.find((c) => c.callTypeId === cId)) {
            calls.push({ callTypeId: cId, callType: cName });
          }
          if (sIdRaw !== undefined && sIdRaw !== null && sName) {
            const sId = String(sIdRaw);
            subs[cId] = subs[cId] || [];
            if (!subs[cId].find((s) => s.subTypeId === sId)) {
              subs[cId].push({ subTypeId: sId, subType: sName });
            }
          }
        }
      });
      setCallTypeOptions(calls);
      setSubTypeMap(subs);
    } catch {
      message.warning("Failed to load Call / Sub Types");
    }
  };

  const fetchTatMaster = async () => {
    setLoadingTat(true);
    try {
      if (!apicalls?.GetTatMasterEntry) {
        message.error("API GetTatMasterEntry not available");
        setLoadingTat(false);
        return;
      }
      const res = await apicalls.GetTatMasterEntry({
        userId: getCurrentUserId(),
      });
      const list =
        res?.tatMasterEntryList ||
        res?.TatMasterEntryList ||
        res?.data?.tatMasterEntryList ||
        [];
      const normalized = Array.isArray(list)
        ? list.map((r) => {
            const ct = String(r.callTypeId ?? r.CallTypeId ?? "").trim();
            const stRaw = r.subTypeId ?? r.SubTypeId;
            const st =
              stRaw !== null && stRaw !== undefined
                ? String(stRaw).trim()
                : null;
            const tatMasterId = r.tatMasterId ?? r.TatMasterId ?? null;
            return {
              key:
                tatMasterId != null
                  ? `ID_${tatMasterId}`
                  : `${ct}_${st ?? "NULL"}`,
              tatMasterId,
              callTypeId: ct,
              subTypeId: st,
              tatDays: r.tatDays ?? r.TatDays ?? null,
              isActive: r.isActive ?? r.IsActive ?? true,
              createdOn: r.createdOn ?? r.CreatedOn ?? null,
              modifiedOn: r.modifiedOn ?? r.ModifiedOn ?? null,
            };
          })
        : [];
      setTatData(normalized);
    } catch {
      message.error("Failed to load TAT rules");
    } finally {
      setLoadingTat(false);
    }
  };

  const fetchHolidays = async () => {
    setLoadingHoliday(true);
    try {
      if (!apicalls?.GetListOfHolidays) {
        message.error("API GetListOfHolidays not available");
        setLoadingHoliday(false);
        return;
      }
      const res = await apicalls.GetListOfHolidays();
      const listRaw =
        res?.ListOfHolidays ||
        res?.data?.ListOfHolidays ||
        res?.data?.listOfHolidays ||
        res?.listOfHolidays ||
        [];
      const normalized = Array.isArray(listRaw)
        ? listRaw.map((h) => ({
            key: h.HolidayId ?? h.holidayId ?? `${Date.now()}_${Math.random()}`,
            holidayId: h.HolidayId ?? h.holidayId ?? null,
            holidayDate: h.HolidayDate ?? h.holidayDate ?? null,
            holidayName: h.HolidayName ?? h.holidayName ?? "",
            createdOn: h.CreatedOn ?? h.createdOn ?? null,
            createdBy: h.CreatedBy ?? h.createdBy ?? "",
          }))
        : [];
      setHolidayData(normalized);
    } catch {
      message.error("Failed to load holidays");
    } finally {
      setLoadingHoliday(false);
    }
  };

  const formatHolidayDate = (v) => {
    if (!v) return "-";
    const s = String(v).trim();
    return s.includes("T")
      ? s.split("T")[0]
      : s.includes(" ")
      ? s.split(" ")[0]
      : s.slice(0, 10);
  };

  const dateFmt = (v) =>
    v
      ? String(v).length > 10
        ? String(v).slice(0, 19).replace("T", " ")
        : String(v)
      : "-";

  const wrap = (text, width) => (
    <div
      style={{
        maxWidth: width,
        whiteSpace: "normal",
        wordBreak: "break-word",
        lineHeight: "1.2",
      }}
    >
      {text ?? "-"}
    </div>
  );

  // generic search filter dropdown
  const getColumnSearchProps = (dataIndex, displayFn) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInputRef}
          placeholder="Search"
          value={selectedKeys[0]}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedKeys(val ? [val] : []);
          }}
          onPressEnter={() => {
            confirm();
            setSearchTexts((prev) => ({
              ...prev,
              [dataIndex]: selectedKeys[0] || "",
            }));
          }}
          style={{ marginBottom: 8, display: "block" }}
          size="small"
        />
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<SearchOutlined />}
            onClick={() => {
              confirm();
              setSearchTexts((prev) => ({
                ...prev,
                [dataIndex]: selectedKeys[0] || "",
              }));
            }}
          >
            Search
          </Button>
          <Button
            size="small"
            onClick={() => {
              clearFilters();
              setSearchTexts((p) => ({ ...p, [dataIndex]: "" }));
              confirm();
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) => {
      const raw = displayFn ? displayFn(record) : record[dataIndex];
      return String(raw ?? "")
        .toLowerCase()
        .includes(String(value).toLowerCase());
    },
  });

  const holidayColumns = [
    {
      title: "Holiday Date",
      dataIndex: "holidayDate",
      width: 130,
      render: (v) => wrap(formatHolidayDate(v), 120),
      sorter: (a, b) =>
        new Date(a.holidayDate || 0) - new Date(b.holidayDate || 0),
      ...getColumnSearchProps("holidayDate", (r) =>
        formatHolidayDate(r.holidayDate)
      ),
    },
    {
      title: "Name",
      dataIndex: "holidayName",
      width: 180,
      render: (v) => wrap(v, 170),
      sorter: (a, b) =>
        (a.holidayName || "").localeCompare(b.holidayName || ""),
      ...getColumnSearchProps("holidayName"),
    },
    {
      title: "Created On",
      dataIndex: "createdOn",
      width: 150,
      render: (v) => wrap(dateFmt(v), 140),
      sorter: (a, b) => new Date(a.createdOn || 0) - new Date(b.createdOn || 0),
      ...getColumnSearchProps("createdOn", (r) => dateFmt(r.createdOn)),
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      width: 140,
      render: (v) => (
        <span
          style={{
            display: "inline-block",
            maxWidth: 130,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {v || "-"}
        </span>
      ),
      ...getColumnSearchProps("createdBy"),
    },
  ];

  const startAdd = () => {
    setIsAddMode(true);
    setEditKey("NEW");
    setNewCallTypeId(null);
    tatForm.resetFields();
  };

  const startEdit = (row) => {
    setIsAddMode(false);
    setEditKey(row.key);
    setNewCallTypeId(null);
    tatForm.setFieldsValue({
      callTypeId: row.callTypeId,
      subTypeId: row.subTypeId,
      tatDays: row.tatDays,
    });
  };

  const cancelEdit = () => {
    setEditKey(null);
    setIsAddMode(false);
    setNewCallTypeId(null);
    tatForm.resetFields();
  };

  const submitTatRow = async () => {
    try {
      await tatForm.validateFields(["tatDays", "callTypeId", "subTypeId"]);
    } catch {
      return;
    }
    let { callTypeId, subTypeId, tatDays } = tatForm.getFieldsValue();
    if (!isAddMode && editKey) {
      const existing = tatData.find((r) => r.key === editKey);
      if (existing) {
        callTypeId = existing.callTypeId;
        subTypeId = existing.subTypeId;
      }
    }
    if (!callTypeId || !subTypeId || !tatDays) {
      message.error("All fields required");
      return;
    }
    const payload = {
      callTypeId,
      subTypeId,
      tatDays,
      modifiedBy: getCurrentUserId(),
    };
    setSavingTat(true);
    try {
      if (!apicalls?.UpdateTatMasterEntry) {
        message.error("API UpdateTatMasterEntry not available");
        setSavingTat(false);
        return;
      }
      const res = await apicalls.UpdateTatMasterEntry(payload);
      const ok =
        res?.Result ??
        res?.data?.Result ??
        res?.result ??
        res?.data?.result ??
        1;
      if (ok) {
        message.success("TAT saved");
        await fetchTatMaster();
        cancelEdit();
      } else message.error("Save failed");
    } catch {
      message.error("Error saving TAT");
    } finally {
      setSavingTat(false);
    }
  };

  const submitHolidayModal = async () => {
    try {
      const vals = await holidayForm.validateFields();
      const dateStr = vals.holidayDate?.format("YYYY-MM-DD");
      if (!dateStr) {
        message.error("Date required");
        return;
      }
      if (holidayData.some((h) => h.holidayDate === dateStr)) {
        message.info("Duplicate date");
        return;
      }
      setSavingHoliday(true);
      const payload = {
        holidayDate: dateStr,
        holidayName: vals.holidayName || "",
        createdBy: getCurrentUserId(),
      };
      if (!apicalls?.SaveHolidayDetails) {
        message.error("API SaveHolidayDetails not available");
        setSavingHoliday(false);
        return;
      }
      const res = await apicalls.SaveHolidayDetails(payload);
      const ok =
        res?.Result ??
        res?.data?.Result ??
        res?.result ??
        res?.data?.result ??
        1;
      if (ok) {
        message.success("Holiday added");
        setShowHolidayModal(false);
        holidayForm.resetFields();
        fetchHolidays();
      } else message.error("Add failed");
    } catch {
      // validation
    } finally {
      setSavingHoliday(false);
    }
  };

  const onCallTypeChange = (val) => {
    setNewCallTypeId(val || null);
    tatForm.setFieldsValue({ callTypeId: val || null, subTypeId: null });
  };

  const filterOption = (input, option) =>
    (option?.children || "").toLowerCase().includes(input.toLowerCase());

  // Column filters for TAT table
  const tatColumns = [
    {
      title: "Call Type",
      dataIndex: "callTypeId",
      width: 160,
      render: (v, row) =>
        editKey === row.key ? (
          <Form.Item
            name="callTypeId"
            rules={[{ required: true, message: "Required" }]}
            style={{ margin: 0 }}
          >
            <Select
              disabled={!isAddMode}
              placeholder="Select"
              showSearch
              allowClear={isAddMode}
              size="small"
              filterOption={filterOption}
              onChange={isAddMode ? onCallTypeChange : undefined}
              style={{ width: 150 }}
            >
              {callTypeOptions.map((c) => (
                <Option key={c.callTypeId} value={c.callTypeId}>
                  {c.callType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          wrap(
            callTypeOptions.find((c) => c.callTypeId === v)?.callType || v,
            150
          )
        ),
      filters: callTypeOptions.map((c) => ({
        text: c.callType,
        value: c.callTypeId,
      })),
      onFilter: (val, record) => record.callTypeId === val,
    },
    {
      title: "Sub Type",
      dataIndex: "subTypeId",
      width: 160,
      render: (v, row) => {
        const effectiveCallTypeId =
          editKey === row.key
            ? isAddMode
              ? newCallTypeId
              : row.callTypeId
            : null;
        return editKey === row.key ? (
          <Form.Item
            name="subTypeId"
            rules={[{ required: true, message: "Required" }]}
            style={{ margin: 0 }}
          >
            <Select
              disabled={!effectiveCallTypeId || (!isAddMode && row.callTypeId)}
              placeholder="Select"
              showSearch
              allowClear={isAddMode}
              size="small"
              filterOption={filterOption}
              style={{ width: 150 }}
            >
              {(subTypeMap[effectiveCallTypeId] || []).map((s) => (
                <Option key={s.subTypeId} value={s.subTypeId}>
                  {s.subType}
                </Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          wrap(
            (subTypeMap[row.callTypeId] || []).find((s) => s.subTypeId === v)
              ?.subType ||
              (v ?? "-"),
            150
          )
        );
      },
      filters: (() => {
        const set = new Map();
        tatData.forEach((r) => {
          const arr = subTypeMap[r.callTypeId] || [];
          const found = arr.find((s) => s.subTypeId === r.subTypeId);
          if (found)
            set.set(found.subTypeId, {
              text: found.subType,
              value: found.subTypeId,
            });
        });
        return Array.from(set.values());
      })(),
      onFilter: (val, record) => record.subTypeId === val,
    },
    {
      title: "TAT (Days)",
      dataIndex: "tatDays",
      width: 110,
      render: (v, row) =>
        editKey === row.key ? (
          <Form.Item
            name="tatDays"
            rules={[{ required: true, message: "Required" }]}
            style={{ margin: 0 }}
          >
            <InputNumber min={1} max={365} size="small" style={{ width: 90 }} />
          </Form.Item>
        ) : (
          wrap(v, 90)
        ),
      filters: Array.from(
        new Set(tatData.map((r) => r.tatDays).filter((x) => x != null))
      ).map((d) => ({ text: String(d), value: d })),
      onFilter: (val, record) => record.tatDays === val,
      sorter: (a, b) => (a.tatDays || 0) - (b.tatDays || 0),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      width: 90,
      align: "center",
      render: (v) =>
        v ? (
          <CheckCircleTwoTone twoToneColor="#52c41a" />
        ) : (
          <CloseCircleTwoTone twoToneColor="#ff4d4f" />
        ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (val, record) => record.isActive === val,
    },
    {
      title: "Created",
      dataIndex: "createdOn",
      width: 180,
      render: (v) =>
        wrap(v ? v.toString().slice(0, 19).replace("T", " ") : "-", 170),
      ...getColumnSearchProps("createdOn", (r) =>
        r.createdOn ? r.createdOn.toString() : ""
      ),
      sorter: (a, b) => new Date(a.createdOn || 0) - new Date(b.createdOn || 0),
    },
    {
      title: "Modified",
      dataIndex: "modifiedOn",
      width: 180,
      render: (v) =>
        wrap(v ? v.toString().slice(0, 19).replace("T", " ") : "-", 170),
      ...getColumnSearchProps("modifiedOn", (r) =>
        r.modifiedOn ? r.modifiedOn.toString() : ""
      ),
      sorter: (a, b) =>
        new Date(a.modifiedOn || 0) - new Date(b.modifiedOn || 0),
    },
    {
      title: "Action",
      width: 130,
      fixed: "right",
      render: (_, row) =>
        row.isActive ? (
          editKey === row.key ? (
            <Space>
              <Tooltip title="Save">
                <Button
                  type="primary"
                  size="small"
                  icon={<SaveOutlined />}
                  onClick={submitTatRow}
                  loading={savingTat}
                />
              </Tooltip>
              <Tooltip title="Cancel">
                <Button
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={cancelEdit}
                />
              </Tooltip>
            </Space>
          ) : (
            <Button
              size="small"
              icon={<EditOutlined style={{ color: "red" }} />}
              onClick={() => startEdit(row)}
            >
              Edit
            </Button>
          )
        ) : null,
    },
  ];

  const tatDataWithAdd = isAddMode
    ? [
        ...tatData,
        {
          key: "NEW",
          tatMasterId: null,
          callTypeId: null,
          subTypeId: null,
          tatDays: null,
          isActive: true,
          createdOn: null,
          modifiedOn: null,
        },
      ]
    : tatData;

  return (
    <div className="tat-page-wrapper">
      <div className="tat-top-bar">
        <Button
          type="link"
          icon={<RollbackOutlined />}
          onClick={onBack}
          className="tat-back-btn"
        >
          Back
        </Button>
        <Text strong className="tat-title">
          TAT & Holiday Management
        </Text>
        <Space>
          <Button
            size="small"
            icon={<ReloadOutlined />}
            onClick={() => {
              fetchTatMaster();
              fetchHolidays();
            }}
          >
            Refresh
          </Button>
        </Space>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="tat-tabs"
        items={[
          {
            key: "tat",
            label: "TAT Configuration",
            children: (
              <div>
                <div className="tat-actions-bar">
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    disabled={editKey !== null}
                    onClick={startAdd}
                  >
                    Add
                  </Button>
                </div>
                <Form form={tatForm} component={false}>
                  <Table
                    size="small"
                    dataSource={tatDataWithAdd}
                    columns={tatColumns}
                    pagination={false}
                    loading={loadingTat}
                    rowClassName={(r) =>
                      r.key === editKey ? "tat-edit-row" : ""
                    }
                    locale={{ emptyText: "No TAT entries" }}
                    bordered
                    scroll={{ x: 1300 }}
                  />
                </Form>
              </div>
            ),
          },
          {
            key: "holiday",
            label: "Holiday Calendar",
            children: (
              <div>
                <Space style={{ marginBottom: 8 }}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      holidayForm.resetFields();
                      setShowHolidayModal(true);
                    }}
                  >
                    New Holiday
                  </Button>
                  <Button
                    size="small"
                    icon={<ReloadOutlined />}
                    onClick={fetchHolidays}
                  >
                    Refresh
                  </Button>
                </Space>
                <Table
                  size="small"
                  dataSource={holidayData}
                  columns={holidayColumns}
                  pagination={false}
                  className="tat-table"
                  loading={loadingHoliday}
                  locale={{ emptyText: "No holidays" }}
                  bordered
                  rowKey="key"
                  scroll={{ x: 700 }}
                />
                <Modal
                  open={showHolidayModal}
                  onCancel={() => setShowHolidayModal(false)}
                  title="Add Holiday"
                  footer={null}
                  destroyOnClose
                  width={400}
                >
                  <Form
                    form={holidayForm}
                    layout="vertical"
                    onFinish={submitHolidayModal}
                  >
                    <Form.Item
                      name="holidayDate"
                      label="Holiday Date"
                      rules={[{ required: true, message: "Select date" }]}
                    >
                      <DatePicker
                        format="YYYY-MM-DD"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                    <Form.Item name="holidayName" label="Holiday Name">
                      <Input placeholder="Optional name" maxLength={200} />
                    </Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={savingHoliday}
                      >
                        Save
                      </Button>
                      <Button onClick={() => setShowHolidayModal(false)}>
                        Cancel
                      </Button>
                    </Space>
                  </Form>
                </Modal>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default TatHolidayMenu;
