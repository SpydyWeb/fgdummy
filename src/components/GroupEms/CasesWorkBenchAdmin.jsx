import React, { useEffect, useState } from "react";
import {
  Spin,
  Card,
  Button,
  message,
  Row,
  Col,
  Form,
  Select,
  Input,
  Divider,
  Typography,
  Checkbox,
  Tabs, // ADDED
} from "antd";
import {
  RollbackOutlined,
  PaperClipOutlined,
  SendOutlined,
  ClockCircleOutlined,
  FieldTimeOutlined,
  CalendarOutlined,
  HourglassOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import apicalls from "../../api/apiCalls";
import DatePipe from "./Common/DatePipe";
import { useSelector } from "react-redux";
import AttachmentUploader from "./Common/AttachmentUploader";
import TrailMailDetails from "./TrailMailDetails";
import { Modal } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import "./GroupEms.css";
const { Text } = Typography;

const CasesWorkBenchAdmin = ({
  inboxEmailId,
  emailResponseId,
  onBack,
  userProfileInfo,
}) => {
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [userList, setUserList] = useState([]);
  const [userListLoading, setUserListLoading] = useState(false);
  const [ctstList, setCtstList] = useState([]);
  const [callTypeOptions, setCallTypeOptions] = useState([]);
  const [subTypeOptions, setSubTypeOptions] = useState([]);
  const [showTrailModal, setShowTrailModal] = useState(false);
  const [spamFlag, setSpamFlag] = useState(false);
  const [forwardFlag, setForwardFlag] = useState(false);
  const [forwardCategory, setForwardCategory] = useState(null);
  const [forwardSubmitted, setForwardSubmitted] = useState(false);
  const [composeBodyExtra, setComposeBodyExtra] = useState("");
  const [forwardAttachmentsPayload, setForwardAttachmentsPayload] = useState(
    []
  ); // ADDED
  const [productType, setProductType] = useState(null);
  const [priority, setPriority] = useState(null);
  const [smartCallTypeOptions, setSmartCallTypeOptions] = useState([]);
  const [selectedCallComposite, setSelectedCallComposite] = useState(null);
  const isLocked =
    caseData &&
    ["PENDING", "CLOSED"].includes((caseData.Status || "").toUpperCase());
  const isForwardLockedView =
    isLocked && caseData?.IsForwardedToInternalTeam === true;
  const [assignLoading, setAssignLoading] = useState(false);
  const [form] = Form.useForm();

  const reduxProfile = useSelector(
    (state) => state?.userProfileInfo?.profileObj
  );
  const profile =
    reduxProfile || userProfileInfo?.profileObj || userProfileInfo || {};
  const currentUsrId =
    profile?.usrID ||
    profile?.UsrID ||
    profile?.userName ||
    localStorage.getItem("usrID") ||
    sessionStorage.getItem("usrID") ||
    "";
  const currentRoleId =
    profile?.roleID ||
    profile?.RoleID ||
    profile?.role ||
    parseInt(
      localStorage.getItem("roleID") || sessionStorage.getItem("roleID") || "0",
      10
    ) ||
    null;

  const callTypeId = Form.useWatch("callTypeId", form);
  const subTypeId = Form.useWatch("subTypeId", form);
  const assignToVal = Form.useWatch("assignTo", form);
  const productTypeVal = Form.useWatch("productType", form);
  const priorityVal = Form.useWatch("priority", form);

  const requiredFields = [
    "productType",
    "callTypeId",
    "subTypeId",
    "priority",
    "assignTo",
  ];
  const formErrors = form.getFieldsError(requiredFields);
  const canSubmit =
    !isLocked &&
    requiredFields.every((f) => form.getFieldValue(f)) &&
    formErrors.every((e) => e.errors.length === 0);

  useEffect(() => {
    fetchCaseDetails();
    fetchGroupEmsUsers();
    fetchCTSTList();
  }, [inboxEmailId, emailResponseId]);

  useEffect(() => {
    if (!caseData) return;
    const status = (caseData.Status || "").toUpperCase();
    if (status === "PENDING" || status === "CLOSED") {
      if (caseData.IsSpamEMS) setSpamFlag(true);
      if (caseData.IsForwardedToInternalTeam) {
        setForwardFlag(true);
        setForwardCategory(caseData.ForwardedToInternalTeamAction || null);
        setForwardSubmitted(true);
        form.setFieldsValue({
          forwardTo: caseData.UserIdOfForwardedTo || "",
          forwardCc: caseData.UserIdOfForwardedCc || "",
          forwardSubject: caseData.ForwardedToInternalTeamSubject || "",
          forwardNotes: caseData.ForwardedToInternalTeamBody || "",
        });
        setComposeBodyExtra(caseData.ForwardedToInternalTeamBody || "");
      }
      if (caseData.ProductType) {
        setProductType(caseData.ProductType);
        setPriority(caseData.Priority || null);
        form.setFieldsValue({
          productType: caseData.ProductType,
          callTypeId: caseData.CallTypeId || null,
          subTypeId: caseData.SubTypeId || null,
          priority: caseData.Priority || null,
          assignTo: caseData.AssignedTo || null,
          note: caseData.InternalNote || "",
        });
      }
    }
  }, [caseData, form]);

  useEffect(() => {
    if (caseData?.CallTypeId && ctstList.length) {
      const subs = ctstList
        .filter((x) => (x.callTypeId ?? x.CallTypeId) === caseData.CallTypeId)
        .map((x) => ({
          subTypeId: x.subTypeId ?? x.SubTypeId,
          subType: x.subType ?? x.SubType,
        }));
      setSubTypeOptions(subs);
      if (
        caseData.SubTypeId &&
        subs.find((s) => s.subTypeId === caseData.SubTypeId)
      ) {
        form.setFieldsValue({ subTypeId: caseData.SubTypeId });
      }
    }
  }, [caseData?.CallTypeId, caseData?.SubTypeId, ctstList, form]);

  useEffect(() => {
    if (!caseData) return;
    if (!smartCallTypeOptions.length) return;
    if (caseData.SubTypeId) {
      const subComposite = `ST_${caseData.CallTypeId}_${caseData.SubTypeId}`;
      if (smartCallTypeOptions.some((o) => o.value === subComposite)) {
        setSelectedCallComposite(subComposite);
        form.setFieldsValue({
          callTypeComposite: subComposite,
          callTypeId: caseData.CallTypeId,
          subTypeId: caseData.SubTypeId,
        });
        return;
      }
    }
    if (caseData.CallTypeId) {
      const callComposite = `CT_${caseData.CallTypeId}`;
      if (smartCallTypeOptions.some((o) => o.value === callComposite)) {
        setSelectedCallComposite(callComposite);
        form.setFieldsValue({
          callTypeComposite: callComposite,
          callTypeId: caseData.CallTypeId,
        });
      }
    }
  }, [caseData?.CallTypeId, caseData?.SubTypeId, smartCallTypeOptions, form]);

  const fetchCaseDetails = async () => {
    setLoading(true);
    try {
      const res = await apicalls.GetCaseDetails({
        inboxEmailId,
        emailResponseId,
      });
      const raw = res?.data || {};
      const attachmentsRaw = raw.attachments || raw.Attachments || [];
      const attachments = Array.isArray(attachmentsRaw)
        ? attachmentsRaw.map((a) => ({
            FileName:
              a.FileName || a.Name || a.name || a.AttachmentId || "File",
            BlobUrl: a.BlobUrl || a.blobUrl || a.Url || a.url || "",
            ContentType: a.ContentType || a.contentType || "",
            Size: a.Size || a.size || 0,
          }))
        : [];
      setCaseData({
        InboxEmailId: raw.inboxEmailId ?? raw.InboxEmailId ?? inboxEmailId,
        EmailResponseId:
          raw.emailResponseId ?? raw.EmailResponseId ?? emailResponseId,
        Id: raw.id ?? raw.Id,
        ReceivedDateTime: raw.receivedDateTime ?? raw.ReceivedDateTime,
        HasAttachments:
          raw.hasAttachments ?? raw.HasAttachments ?? attachments.length > 0,
        InternetMessageId: raw.internetMessageId ?? raw.InternetMessageId,
        Subject: raw.subject ?? raw.Subject ?? "",
        BodyPreview: raw.bodyPreview ?? raw.BodyPreview ?? "",
        Importance: raw.importance ?? raw.Importance,
        ConversationId: raw.conversationId ?? raw.ConversationId,
        IsRead: raw.isRead ?? raw.IsRead,
        IsHtml: raw.isHtml ?? raw.IsHtml,
        Body: raw.body ?? raw.Body ?? "",
        From: raw.from ?? raw.From ?? "",
        ToRecipients: raw.toRecipients ?? raw.ToRecipients ?? "",
        CcRecipients: raw.ccRecipients ?? raw.CcRecipients ?? "",
        BccRecipients: raw.bccRecipients ?? raw.BccRecipients ?? "",
        ReplyTo: raw.replyTo ?? raw.ReplyTo,
        CreatedOn: raw.createdOn ?? raw.CreatedOn,
        Status: raw.status ?? raw.Status ?? "",
        IsSpamEMS: raw.isSpamEMS ?? raw.IsSpamEMS,
        AssignedTo: raw.assignedTo ?? raw.AssignedTo,
        ParentInboxEmailId: raw.parentInboxEmailId ?? raw.ParentInboxEmailId,
        TrailFound: raw.trailFound ?? raw.TrailFound,
        ClosedDateTime: raw.closedDateTime ?? raw.ClosedDateTime,
        ModifiedByUsrId: raw.modifiedByUsrId ?? raw.ModifiedByUsrId,
        ModifiedByRoleId: raw.modifiedByRoleId ?? raw.ModifiedByRoleId,
        ModifiedOn: raw.modifiedOn ?? raw.ModifiedOn,
        IsForwardedToInternalTeam:
          raw.isForwardedToInternalTeam ?? raw.IsForwardedToInternalTeam,
        ForwardedToInternalTeamAction:
          raw.forwardedToInternalTeamAction ??
          raw.ForwardedToInternalTeamAction,
        UserIdOfForwardedTo:
          raw.userIdOfForwardedTo ?? raw.UserIdOfForwardedTo ?? "",
        UserIdOfForwardedCc:
          raw.userIdOfForwardedCc ?? raw.UserIdOfForwardedCc ?? "",
        ForwardedToInternalTeamSubject:
          raw.forwardedToInternalTeamSubject ??
          raw.ForwardedToInternalTeamSubject ??
          "",
        ForwardedToInternalTeamBody:
          raw.forwardedToInternalTeamBody ??
          raw.ForwardedToInternalTeamBody ??
          "",
        ProductType: raw.productType ?? raw.ProductType ?? null,
        CallTypeId: raw.callTypeId ?? raw.CallTypeId ?? null,
        SubTypeId: raw.subTypeId ?? raw.SubTypeId ?? null,
        Priority: raw.priority ?? raw.Priority ?? null,
        InternalNote: raw.internalNote ?? raw.InternalNote ?? "",
        Attachments: attachments,
        UserDraftBody: raw.userDraftBody ?? raw.UserDraftBody ?? "",
        CommunicationSent:
          raw.communicationSent ?? raw.CommunicationSent ?? false,
        AssignedDateTime: raw.assignedDateTime ?? raw.AssignedDateTime ?? null,
        TatDays: raw.tatDays ?? raw.TatDays ?? null,
        DueDateTime: raw.dueDateTime ?? raw.DueDateTime ?? null,
        ClosedAgingDays: raw.closedAgingDays ?? raw.ClosedAgingDays ?? null,
        WithinTatAtClose: raw.withinTatAtClose ?? raw.WithinTatAtClose ?? null,
        CurrentAgingDays: raw.currentAgingDays ?? raw.CurrentAgingDays ?? null,
        OverDueDays: raw.overDueDays ?? raw.OverDueDays ?? null,
        RecivedOnMailBox: raw.recivedOnMailBox ?? raw.RecivedOnMailBox ?? null,
      });
    } catch {
      message.error("Failed to load case details");
    } finally {
      setLoading(false);
    }
  };

  const fetchGroupEmsUsers = async () => {
    setUserListLoading(true);
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
      setUserList(cleaned);
    } catch {
      message.info("Failed to load users");
    } finally {
      setUserListLoading(false);
    }
  };

  const fetchCTSTList = async () => {
    try {
      const res = await apicalls.GetGroupEmsCTSTList({});
      const list =
        res?.data?.GroupEmsCTSTList ||
        res?.data?.groupEmsCTSTList ||
        res?.GroupEmsCTSTList ||
        [];
      setCtstList(Array.isArray(list) ? list : []);
      const uniqCallTypes = [];
      (list || []).forEach((x) => {
        const cId = x.callTypeId ?? x.CallTypeId;
        if (!uniqCallTypes.find((c) => c.callTypeId === cId)) {
          uniqCallTypes.push({
            callTypeId: cId,
            callType: x.callType ?? x.CallType,
          });
        }
      });
      setCallTypeOptions(uniqCallTypes);
      const smart = [];
      // Call type rows
      uniqCallTypes.forEach((ct) => {
        smart.push({
          value: `CT_${ct.callTypeId}`,
          label: ct.callType,
          display: ct.callType,
          callTypeId: ct.callTypeId,
        });
      });
      // Sub type rows
      (list || []).forEach((x) => {
        const cId = x.callTypeId ?? x.CallTypeId;
        const cName = x.callType ?? x.CallType ?? "";
        const sId = x.subTypeId ?? x.SubTypeId;
        const sName = x.subType ?? x.SubType ?? "";
        smart.push({
          value: `ST_${cId}_${sId}`,
          label: `${cName} | ${sName}`,
          display: cName,
          callTypeId: cId,
          subTypeId: sId,
        });
      });
      setSmartCallTypeOptions(smart);
    } catch {
      message.info("Failed to load call/sub types");
    }
  };

  const handleSmartCallTypeSelect = (val) => {
    const found = smartCallTypeOptions.find((o) => o.value === val);
    if (!found) return;
    setSelectedCallComposite(val);
    form.setFieldsValue({
      callTypeComposite: val, // UI field
      callTypeId: found.callTypeId, // hidden numeric id
      subTypeId: found.subTypeId ?? null, // hidden subtype id (or null)
    });
    const subs = ctstList
      .filter((x) => (x.callTypeId ?? x.CallTypeId) === found.callTypeId)
      .map((x) => ({
        subTypeId: x.subTypeId ?? x.SubTypeId,
        subType: x.subType ?? x.SubType,
      }));
    setSubTypeOptions(subs);
    setPriority(null);
    form.setFieldsValue({ assignTo: null, priority: null });
  };

  // Custom filter (place with other helpers):
  const smartFilterOption = (input, option) =>
    (option?.label || "").toLowerCase().includes(input.toLowerCase());

  const handleSpamToggle = (e) => {
    const val = e.target.checked;
    setSpamFlag(val);
    if (val) {
      setForwardFlag(false);
      setForwardCategory(null);
      setForwardSubmitted(false);
      setProductType(null);
      setPriority(null);
      form.setFieldsValue({
        productType: null,
        callTypeId: null,
        subTypeId: null,
        assignTo: null,
        forwardTo: null,
        forwardCc: null,
        forwardSubject: null,
      });
      setSubTypeOptions([]);
    }
  };

  const handleForwardToggle = (e) => {
    const val = e.target.checked;
    setForwardFlag(val);
    if (!val) {
      setForwardCategory(null);
      setForwardSubmitted(false);
    } else {
      setProductType(null);
      setPriority(null);
      form.setFieldsValue({
        productType: null,
        callTypeId: null,
        subTypeId: null,
        assignTo: null,
      });
      setSubTypeOptions([]);
    }
  };

  const handleForwardInitialSubmit = () => {
    if (spamFlag) return;
    if (!forwardCategory) {
      message.warning("Select forward category");
      return;
    }
    setForwardSubmitted(true);
  };

  const handleMarkSpam = async () => {
    if (!caseData?.InboxEmailId) return;
    setAssignLoading(true);
    try {
      const res = await apicalls.MarkCaseAsSpam({
        inboxEmailId: caseData.InboxEmailId,
        usrID: currentUsrId,
        roleID: currentRoleId,
      });
      const result =
        res?.data?.Result ??
        res?.data?.result ??
        res?.Result ??
        res?.result ??
        false;
      if (result) {
        message.success("Marked as spam");
        setCaseData((c) => ({
          ...c,
          Status: "CLOSED",
          IsSpamEMS: true,
          AssignedTo: currentUsrId,
        }));
        onBack && onBack();
      } else {
        message.error("Failed to mark as spam");
        await fetchCaseDetails();
      }
    } catch {
      message.error("Spam mark failed");
      await fetchCaseDetails();
    } finally {
      setAssignLoading(false);
    }
  };

  function toHtmlWithLineBreaks(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r\n|\r|\n/g, "<br>");
  }

  const buildDraftBodyFragment = (raw) => {
    const safe = (raw ?? "").trim(); // Add .trim() here

    let sanitized = safe
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<(meta|link|head)[^>]*>/gi, "");

    const containsHtml = /<[^>]+>/.test(sanitized);
    const html = containsHtml
      ? sanitized
      : `<p>${toHtmlWithLineBreaks(sanitized)}</p>`;

    const escHtml = html
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\r/g, "")
      .replace(/\n/g, "\\n");
    return escHtml;
  };

  const handleSendForwardEmail = async () => {
    if (!caseData?.InboxEmailId) return;
    const to = form.getFieldValue("forwardTo");
    const cc = form.getFieldValue("forwardCc");
    const subject = form.getFieldValue("forwardSubject");
    const draftBody = form.getFieldValue("forwardNotes"); // Changed variable name

    if (!forwardCategory) {
      message.warning("Select category");
      return;
    }
    if (!to) {
      message.warning("To required");
      return;
    }
    if (!draftBody) {
      // Changed validation message
      message.warning("Draft body required");
      return;
    }
    if (!subject) {
      message.warning("Subject required");
      return;
    }

    setAssignLoading(true);
    try {
      // Build the email body with just the draft content
      const emailBody = `<div style="font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5;">${draftBody.replace(
        /\n/g,
        "<br>"
      )}</div>`;

      const finalBody = buildDraftBodyFragment(emailBody);

      const normalizedAttachments = (forwardAttachmentsPayload || []).map(
        (a) => ({
          fileName: a.fileName || a.FileName || "",
          contentType: a.contentType || a.ContentType || "",
          base64: a.base64 || a.Base64 || "",
          size: a.size || a.Size || 0,
        })
      );

      const payload = {
        inboxEmailId: caseData.InboxEmailId,
        emailResponseId: caseData.EmailResponseId,
        recivedMailBoxId: caseData.ToRecipients, // Fixed property name
        usrID: currentUsrId,
        roleID: currentRoleId,
        forwardCategory: forwardCategory,
        forwardTo: to,
        forwardCc: cc || "",
        forwardSubject: subject,
        forwardBody: finalBody,
        attachments: normalizedAttachments,
      };

      const res = await apicalls.ForwardToInternalTeam(payload);
      const successFlag =
        res?.data?.Result ??
        res?.data?.result ??
        res?.Result ??
        res?.result ??
        false;
      const serverMessage =
        res?.data?.Message ||
        res?.Message ||
        res?.data?.message ||
        res?.message ||
        (successFlag ? "Email forwarded successfully." : "Forward failed.");

      if (successFlag) {
        message.success(serverMessage);
        setCaseData((c) => ({
          ...c,
          IsForwardedToInternalTeam: true,
          ForwardedToInternalTeamAction: forwardCategory,
          UserIdOfForwardedTo: to,
          UserIdOfForwardedCc: cc || "",
          ForwardedToInternalTeamSubject: subject,
          ForwardedToInternalTeamBody: draftBody,
        }));
        onBack && onBack();
      } else {
        message.error(serverMessage);
      }
    } catch (error) {
      console.error("Forward email error:", error);
      message.error("Forward failed");
    } finally {
      setAssignLoading(false);
    }
  };

  /*   const onCallTypeChange = (val) => {
    form.setFieldsValue({ callTypeId: val, subTypeId: null });
    setPriority(null);
    form.setFieldsValue({ assignTo: null });
    const subs = ctstList
      .filter((x) => (x.callTypeId ?? x.CallTypeId) === val)
      .map((x) => ({
        subTypeId: x.subTypeId ?? x.SubTypeId,
        subType: x.subType ?? x.SubType,
      }));
    setSubTypeOptions(subs);
  }; */

  const onSubTypeChange = (val) => {
    form.setFieldsValue({ subTypeId: val });
    setPriority(null);
    form.setFieldsValue({ assignTo: null });
  };

  const getDraftPlain = (raw) => {
    if (!raw) return "";
    const m = raw.match(/"Body":"([\s\S]*?)"$/);
    let txt = m ? m[1] : raw;
    txt = txt.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    if (/<[^>]+>/.test(txt)) {
      txt = txt
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/gi, " ");
    }
    return txt.trim();
  };

  const handleRaiseSR = async () => {
    if (!caseData?.InboxEmailId) {
      message.warning("Missing case");
      return;
    }
    try {
      await form.validateFields(requiredFields);
    } catch {
      message.warning("Fill all required fields");
      return;
    }
    const internalNote = form.getFieldValue("note") || "";
    const payload = {
      inboxEmailId: caseData.InboxEmailId,
      productType: form.getFieldValue("productType"),
      callTypeId: form.getFieldValue("callTypeId"),
      subTypeId: form.getFieldValue("subTypeId"),
      priority: form.getFieldValue("priority"),
      assignTo: form.getFieldValue("assignTo"),
      internalNote,
      modifiedByUsrId: currentUsrId,
      modifiedByRoleId: currentRoleId ?? 0,
    };
    setAssignLoading(true);
    try {
      const res = await apicalls.AssignEmsCaseToUser(payload);
      const ok =
        res?.data?.Result ??
        res?.data?.result ??
        res?.Result ??
        res?.result ??
        true;
      if (ok) {
        message.success("Assigned successfully");
        setCaseData((c) => ({
          ...c,
          Status: "PENDING",
          AssignedTo: payload.assignTo,
        }));
        onBack && onBack();
      } else {
        message.error(
          res?.data?.Message || res?.Message || "Assignment failed"
        );
      }
    } catch {
      message.error("Assignment error");
    } finally {
      setAssignLoading(false);
    }
  };

  /*   const cleanForwardedBody = (raw) => {
    if (!raw) return "<i>No forwarded body captured</i>";
    let s = raw.trim();
    const m = s.match(/"MailBody":"([\s\S]*)"?$/);
    if (m) s = m[1];
    s = s.replace(/\\n/g, "<br/>").replace(/\\"/g, '"');
    s = s.replace(/(<br\/?>\s*){3,}/g, "<br/><br/>");
    s = s.replace(/^(<br\/?>)+/, "").replace(/(<br\/?>)+$/, "");
    return s || "<i>No forwarded body captured</i>";
  }; */

  const renderAttachmentList = (list) =>
    (list || []).length
      ? list.map((a, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            <PaperClipOutlined />
            <Button
              type="link"
              size="small"
              onClick={() =>
                a.BlobUrl
                  ? window.open(a.BlobUrl, "_blank")
                  : message.info("No URL")
              }
            >
              {a.FileName || a.fileName || "File"}
            </Button>
            {a.Size ? (
              <span style={{ color: "#888", fontSize: 11 }}>
                {(a.Size / 1024).toFixed(1)} KB
              </span>
            ) : null}
          </div>
        ))
      : "No attachments";

  const showMetricsRibbon =
    caseData &&
    ["PENDING", "CLOSED"].includes((caseData.Status || "").toUpperCase());

  const ribbonMetrics = [
    {
      label: "Assigned",
      icon: <ClockCircleOutlined style={{ color: "#d4380d" }} />,
      value: caseData?.AssignedDateTime ? (
        <DatePipe value={caseData.AssignedDateTime} />
      ) : (
        "-"
      ),
    },
    {
      label: "TAT Days",
      icon: <FieldTimeOutlined style={{ color: "#d4380d" }} />,
      value: caseData?.TatDays ?? "-",
    },
    {
      label: "Due",
      icon: <CalendarOutlined style={{ color: "#d4380d" }} />,
      value: caseData?.DueDateTime ? (
        <DatePipe value={caseData.DueDateTime} />
      ) : (
        "-"
      ),
    },
    {
      label: "Closed Aging",
      icon: <HourglassOutlined style={{ color: "#d4380d" }} />,
      value: caseData?.ClosedAgingDays ?? "-",
    },
    {
      label: "Within TAT At Close",
      icon: <CheckCircleOutlined style={{ color: "#389e0d" }} />,
      value:
        caseData?.WithinTatAtClose == null
          ? "-"
          : caseData.WithinTatAtClose
          ? "Yes"
          : "No",
    },
    {
      label: "Current Aging",
      icon: <DashboardOutlined style={{ color: "#d4380d" }} />,
      value: caseData?.CurrentAgingDays ?? "-",
    },
    {
      label: "Over Due Days",
      icon: <ExclamationCircleOutlined style={{ color: "#cf1322" }} />,
      value: caseData?.OverDueDays ?? "-",
    },
  ];

  const isForwardEmailStage =
    forwardFlag && forwardCategory && forwardSubmitted && !spamFlag;
  const isSRStage = !spamFlag && !forwardFlag;

  return (
    <div className="groupems-admin-dashboard">
      <div className="groupems-dashboard-inner">
        <Row style={{ marginBottom: 12, marginTop: 6 }}>
          <Col>
            <Button
              className="groupems-back-btn"
              icon={<RollbackOutlined />}
              onClick={onBack}
            >
              Back
            </Button>
          </Col>
        </Row>

        {showMetricsRibbon && (
          <div className="ems-metrics-ribbon">
            <div className="ems-metrics-row-static">
              {ribbonMetrics.map((m, i) => (
                <div key={i} className="ems-metric-chip">
                  <span className="ems-metric-icon">{m.icon}</span>
                  <span className="ems-metric-label">{m.label}:</span>
                  <span className="ems-metric-value">{m.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Spin spinning={loading}>
          <Row
            gutter={16}
            className="groupems-two-col-row"
            style={{ flexWrap: "nowrap" }}
          >
            <Col
              flex="0 0 50%"
              className="groupems-col-equal"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Card
                title={
                  isForwardEmailStage && !isForwardLockedView
                    ? "Forward Email"
                    : "Workbench"
                }
                bordered
                className="groupems-equal-card"
              >
                <Form
                  form={form}
                  layout="vertical"
                   className="draft-form"
                >
                  {/* FORWARD EMAIL FORM - LEFT PANEL */}
                  {isForwardEmailStage && !isForwardLockedView && (
                    <>
                      <Form.Item
                        label="To"
                        name="forwardTo"
                        rules={[{ required: true, message: "To required" }]}
                      >
                        <Input placeholder="Recipient email(s)" />
                      </Form.Item>

                      <Form.Item label="CC" name="forwardCc">
                        <Input placeholder="CC email(s)" />
                      </Form.Item>

                      <Form.Item
                        label="Subject"
                        name="forwardSubject"
                        initialValue={`FW: ${caseData?.EmailResponseId}_${
                          caseData?.Subject || ""
                        }`}
                        rules={[
                          { required: true, message: "Subject required" },
                        ]}
                      >
                        <Input />
                      </Form.Item>

                      <Form.Item label="Attachments">
                        <AttachmentUploader
                          emailResponseId={caseData?.EmailResponseId}
                          onChange={setForwardAttachmentsPayload}
                          disabled={assignLoading}
                          buttonClassName="attachment-upload-btn"
                          buttonText="Upload Attachments"
                        />
                      </Form.Item>

                      <Form.Item
                        label="Draft Body"
                        name="forwardNotes"
                        rules={[
                          {
                            required: true,
                            message: "Draft body required",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={10}
                          value={composeBodyExtra}
                          onChange={(e) => {
                            setComposeBodyExtra(e.target.value);
                            form.setFieldsValue({
                              forwardNotes: e.target.value,
                            });
                          }}
                          placeholder="Compose your email body here..."
                          style={{
                            fontFamily: "Arial, sans-serif",
                            fontSize: "13px",
                            lineHeight: "1.5",
                            width: "100%", // Add this line
                            maxWidth: "none", // Add this line
                          }}
                        />
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#666",
                            marginTop: "4px",
                            fontStyle: "italic",
                          }}
                        >
                          This will be the main email body content sent to the
                          recipient.
                        </div>
                      </Form.Item>

                      <Row gutter={12}>
                        <Col>
                          <Button
                            type="primary"
                            icon={<SendOutlined />}
                            loading={assignLoading}
                            disabled={isLocked}
                            onClick={handleSendForwardEmail}
                          >
                            Send
                          </Button>
                        </Col>
                        <Col>
                          <Button onClick={() => setForwardSubmitted(false)}>
                            Back
                          </Button>
                        </Col>
                        <Col>
                          <Button onClick={onBack}>Close</Button>
                        </Col>
                      </Row>

                      <Divider style={{ margin: "20px 0" }} />
                    </>
                  )}

                  {/* EXISTING WORKBENCH CONTENT */}
                  {!isForwardEmailStage && (
                    <>
                      {caseData?.TrailFound &&
                        caseData?.ParentInboxEmailId > 0 && (
                          <Row gutter={12} className="trail-mail-row">
                            <Col>
                              <Button
                                icon={<LinkOutlined />}
                                onClick={() => setShowTrailModal(true)}
                                type="default"
                                className="trail-mail-btn"
                              >
                                Trail Mail
                              </Button>
                            </Col>
                          </Row>
                        )}

                      <Row gutter={12}>
                        <Col span={12}>
                          <Checkbox
                            checked={spamFlag}
                            onChange={handleSpamToggle}
                            disabled={isLocked}
                          >
                            Mark as Spam
                          </Checkbox>
                        </Col>
                        <Col span={12}>
                          <Checkbox
                            checked={forwardFlag}
                            onChange={handleForwardToggle}
                            disabled={spamFlag || isLocked}
                          >
                            Forward To Internal Team
                          </Checkbox>
                        </Col>
                      </Row>

                      <Divider style={{ margin: 12 }} />

                      {spamFlag && (
                        <Button
                          type="primary"
                          loading={assignLoading}
                          onClick={handleMarkSpam}
                          style={{ marginBottom: 12 }}
                        >
                          Submit Spam
                        </Button>
                      )}

                      {!spamFlag && forwardFlag && (
                        <>
                          <Form.Item
                            label="Internal Forward Category"
                            required
                            validateStatus={
                              !forwardCategory && forwardSubmitted
                                ? "error"
                                : ""
                            }
                            help={
                              !forwardCategory && forwardSubmitted
                                ? "Category required"
                                : null
                            }
                          >
                            <Select
                              placeholder="Select category"
                              value={forwardCategory}
                              onChange={(v) => setForwardCategory(v)}
                              disabled={isLocked || forwardSubmitted}
                            >
                              <Select.Option value="Non-Life">
                                Non-Life
                              </Select.Option>
                              <Select.Option value="Life">Life</Select.Option>
                              <Select.Option value="Internal">
                                Internal
                              </Select.Option>
                            </Select>
                          </Form.Item>
                          <Button
                            type="primary"
                            disabled={!forwardCategory || forwardSubmitted}
                            onClick={handleForwardInitialSubmit}
                          >
                            Continue
                          </Button>
                        </>
                      )}

                      {isSRStage && (
                        <>
                          <Form.Item
                            label="Product Type"
                            name="productType"
                            rules={[
                              { required: true, message: "Select product" },
                            ]}
                          >
                            <Select
                              placeholder="Select product"
                              disabled={isLocked}
                              onChange={(v) => {
                                setProductType(v);
                                form.setFieldsValue({
                                  productType: v,
                                  callTypeId: null,
                                  subTypeId: null,
                                  priority: null,
                                  assignTo: null,
                                });
                                setSubTypeOptions([]);
                                setPriority(null);
                              }}
                              value={productTypeVal}
                            >
                              <Select.Option value="GTL">GTL</Select.Option>
                              <Select.Option value="GCL">GCL</Select.Option>
                              <Select.Option value="FUND">FUND</Select.Option>
                            </Select>
                          </Form.Item>

                          <Row gutter={12}>
                            <Col span={12}>
                              <Form.Item
                                label="Call Type"
                                name="callTypeComposite"
                                rules={[
                                  {
                                    required: true,
                                    message: "Select call type",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select call type"
                                  disabled={isLocked}
                                  showSearch
                                  allowClear
                                  optionFilterProp="label"
                                  optionLabelProp="data-display"
                                  filterOption={smartFilterOption}
                                  onChange={handleSmartCallTypeSelect}
                                >
                                  {smartCallTypeOptions.map((o) => (
                                    <Select.Option
                                      key={o.value}
                                      value={o.value}
                                      label={o.label}
                                      data-display={o.display}
                                    >
                                      {o.label}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={12}>
                              <Form.Item
                                label="Sub Type"
                                name="subTypeId"
                                rules={[
                                  {
                                    required: true,
                                    message: "Select sub type",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select sub type"
                                  disabled={isLocked}
                                  onChange={onSubTypeChange}
                                  showSearch
                                  optionFilterProp="children"
                                >
                                  {subTypeOptions.map((st) => (
                                    <Select.Option
                                      key={st.subTypeId}
                                      value={st.subTypeId}
                                    >
                                      {st.subType}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Row gutter={12}>
                            <Col span={6}>
                              <Form.Item
                                label="Priority"
                                name="priority"
                                rules={[
                                  {
                                    required: true,
                                    message: "Select priority",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="Select priority"
                                  disabled={isLocked}
                                  value={priorityVal}
                                  onChange={(v) => {
                                    setPriority(v);
                                    form.setFieldsValue({ priority: v });
                                  }}
                                >
                                  <Select.Option value="High">
                                    High
                                  </Select.Option>
                                  <Select.Option value="Medium">
                                    Medium
                                  </Select.Option>
                                  <Select.Option value="Low">Low</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col span={18}>
                              <Form.Item
                                label="Assign To"
                                name="assignTo"
                                rules={[
                                  { required: true, message: "Select user" },
                                ]}
                              >
                                <Select
                                  placeholder={
                                    userListLoading
                                      ? "Loading..."
                                      : "Select user"
                                  }
                                  loading={userListLoading}
                                  disabled={isLocked || userListLoading}
                                  showSearch
                                  optionFilterProp="children"
                                >
                                  {userList.map((u) => (
                                    <Select.Option key={u} value={u}>
                                      {u}
                                    </Select.Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          </Row>

                          <Form.Item label="Internal Note" name="note">
                            <Input.TextArea rows={4} placeholder="Add note" />
                          </Form.Item>

                          <Row gutter={12}>
                            <Col>
                              <Button
                                type="primary"
                                loading={assignLoading}
                                disabled={!canSubmit}
                                onClick={handleRaiseSR}
                              >
                                Submit
                              </Button>
                            </Col>
                            <Col>
                              <Button onClick={onBack}>Close</Button>
                            </Col>
                          </Row>
                        </>
                      )}

                      <Divider style={{ margin: 12 }} />

                      {caseData && (
                        <>
                          <Row gutter={8}>
                            <Col span={12}>
                              <Text strong>Email Response Id:</Text>
                              <div>{caseData.EmailResponseId}</div>
                            </Col>
                            <Col span={12}>
                              <Text strong>Status:</Text>
                              <div>{caseData.Status}</div>
                            </Col>
                            <Col span={12} style={{ marginTop: 8 }}>
                              <Text strong>Received:</Text>
                              <div>
                                <DatePipe value={caseData.ReceivedDateTime} />
                              </div>
                            </Col>
                            <Col span={12} style={{ marginTop: 8 }}>
                              <Text strong>Attachments:</Text>
                              <div>
                                {caseData.HasAttachments
                                  ? `${
                                      (caseData.Attachments || []).length
                                    } file(s)`
                                  : "None"}
                              </div>
                            </Col>
                            <Col span={12} style={{ marginTop: 8 }}>
                              <Text strong>Received On Mailbox:</Text>
                              <div>{caseData.RecivedOnMailBox || "-"}</div>
                            </Col>
                          </Row>

                          {String(caseData.Status || "").toUpperCase() ===
                            "CLOSED" && (
                            <div style={{ marginTop: 12 }}>
                              <Divider style={{ margin: "12px 0" }} />
                              <Row gutter={8}>
                                <Col span={12}>
                                  <Text strong>Communication Sent:</Text>
                                  <div>
                                    {caseData.CommunicationSent ? "Yes" : "No"}
                                  </div>
                                </Col>
                              </Row>
                              {caseData.UserDraftBody && (
                                <Form name="trigger" layout="vertical">
                                  <Form.Item
                                    label="Draft Body Sent:"
                                    style={{ marginTop: 12 }}
                                  >
                                    <Input.TextArea
                                      value={getDraftPlain(
                                        caseData.UserDraftBody
                                      )}
                                      autoSize={{ minRows: 4, maxRows: 50 }}
                                      readOnly
                                    />
                                  </Form.Item>
                                </Form>
                              )}

                              <Divider style={{ margin: "12px 0" }} />
                              <Text strong>Attachments (Detailed):</Text>
                              <div style={{ fontSize: 12, marginTop: 4 }}>
                                {caseData.Attachments &&
                                caseData.Attachments.length > 0
                                  ? caseData.Attachments.map((a, i) => (
                                      <div
                                        key={i}
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-start", // Changed from center to flex-start
                                          gap: 6,
                                          marginBottom: 6, // Added spacing between items
                                          padding: 4, // Added padding
                                          border: "1px solid #f0f0f0", // Added border
                                          borderRadius: 4, // Added border radius
                                          background: "#fafafa", // Added background
                                        }}
                                      >
                                        <PaperClipOutlined
                                          style={{
                                            marginTop: 2,
                                            flexShrink: 0,
                                          }}
                                        />
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          {" "}
                                          {/* Added wrapper div */}
                                          <Button
                                            type="link"
                                            size="small"
                                            onClick={() =>
                                              a.BlobUrl
                                                ? window.open(
                                                    a.BlobUrl,
                                                    "_blank"
                                                  )
                                                : message.info(
                                                    "No attachment URL"
                                                  )
                                            }
                                            style={{
                                              padding: 0,
                                              textAlign: "left",
                                              height: "auto", // Allow height to expand
                                              whiteSpace: "normal", // Allow text wrapping
                                              wordBreak: "break-word", // Break long words
                                              lineHeight: "1.3", // Better line spacing
                                            }}
                                          >
                                            <span
                                              style={{
                                                display: "block", // Changed to block
                                                width: "100%", // Full width
                                                whiteSpace: "normal", // Allow wrapping
                                                wordBreak: "break-word", // Break long words
                                                overflowWrap: "anywhere", // Break anywhere if needed
                                                lineHeight: "1.3",
                                                fontSize: "12px",
                                              }}
                                            >
                                              {a.FileName || "File"}
                                            </span>
                                          </Button>
                                          {a.Size && (
                                            <div
                                              style={{
                                                color: "#888",
                                                fontSize: 11,
                                                marginTop: 2,
                                              }}
                                            >
                                              {(a.Size / 1024).toFixed(1)} KB
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    ))
                                  : "No attachments"}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {/* LOCKED VIEW CONTENT IN LEFT PANEL */}
                  {isForwardLockedView && (
                    <>
                      <div style={{ marginBottom: 12 }}>
                        <Text type="secondary">
                          This email has been forwarded to internal team and is
                          now locked.
                        </Text>
                      </div>
                      <Divider style={{ margin: 12 }} />
                    </>
                  )}

                  {/* ...rest of existing case data display... */}
                </Form>
              </Card>
            </Col>

            <Col
              flex="0 0 50%"
              className="groupems-col-equal"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Card
                title={
                  isForwardLockedView
                    ? "Internal Forwarded Email Details"
                    : isForwardEmailStage
                    ? "Forward Email"
                    : "Email Content"
                }
                bordered
                className="groupems-equal-card"
              >
                <div className="groupems-card-inner-scroll">
                  {!caseData && !loading && <p>No data</p>}

                  {caseData && !isForwardEmailStage && (
                    <>
                      <div className="email-meta">
                        <div className="email-meta-row">
                          <span className="email-meta-label">From</span>
                          <span className="email-meta-value">
                            {caseData.From || "-"}
                          </span>
                        </div>
                        <div className="email-meta-row">
                          <span className="email-meta-label">Subject</span>
                          <span className="email-meta-value">
                            {caseData.Subject || "-"}
                          </span>
                        </div>
                        <div className="email-meta-row">
                          <span className="email-meta-label">
                            To Recipients
                          </span>
                          <span className="email-meta-value">
                            {caseData.ToRecipients || "-"}
                          </span>
                        </div>
                      </div>

                      <Divider style={{ margin: "8px 0" }} />
                      <div>
                        <Text strong>Attachments:</Text>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          {caseData.HasAttachments &&
                          caseData.Attachments.length > 0
                            ? caseData.Attachments.map((a, i) => (
                                <div
                                  key={i}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                  }}
                                >
                                  <PaperClipOutlined />
                                  <Button
                                    type="link"
                                    size="small"
                                    onClick={() => {
                                      if (a.BlobUrl)
                                        window.open(a.BlobUrl, "_blank");
                                      else message.info("No attachment URL");
                                    }}
                                  >
                                    {a.FileName}
                                  </Button>
                                  {a.Size ? (
                                    <span
                                      style={{ color: "#888", fontSize: 11 }}
                                    >
                                      {(a.Size / 1024).toFixed(1)} KB
                                    </span>
                                  ) : null}
                                </div>
                              ))
                            : "No attachments"}
                        </div>
                      </div>

                      <Divider style={{ margin: "8px 0" }} />
                      <Text strong>Body:</Text>
                      <div
                        style={{
                          maxHeight: 500,
                          overflowY: "auto",
                          overflowX: "auto",
                          border: "1px solid #f0f0f0",
                          padding: 8,
                          borderRadius: 4,
                          background: "#fafafa",
                          fontSize: 12,
                          marginTop: 4,
                        }}
                        className="email-html-body"
                        dangerouslySetInnerHTML={{
                          __html: caseData.Body || "<i>No body content</i>",
                        }}
                      />
                    </>
                  )}

                  {caseData &&
                    isForwardEmailStage &&
                    (isForwardLockedView ? (
                      // RIGHT PANEL - Locked View (Email Details)
                      <div>
                        {/* Forwarded To */}
                        <div className="email-meta">
                          <div className="email-meta-row">
                            <span className="email-meta-label">
                              Forwarded To
                            </span>
                            <span className="email-meta-value email-meta-wrap">
                              {caseData.UserIdOfForwardedTo || "-"}
                            </span>
                          </div>
                        </div>

                        {/* Forwarded CC */}
                        <div className="email-meta" style={{ marginTop: 8 }}>
                          <div className="email-meta-row">
                            <span className="email-meta-label">
                              Forwarded CC
                            </span>
                            <span className="email-meta-value email-meta-wrap">
                              {caseData.UserIdOfForwardedCc || "-"}
                            </span>
                          </div>
                        </div>

                        {/* Attachments */}
                        <Divider style={{ margin: "12px 0 8px 0" }} />
                        <Text strong>Attachments:</Text>
                        <div
                          style={{
                            fontSize: 12,
                            marginTop: 4,
                            marginBottom: 12,
                          }}
                        >
                          {renderAttachmentList(caseData.Attachments)}
                        </div>

                        {/* Received Email Content */}
                        <Divider style={{ margin: "8px 0" }} />
                        <Text strong>Received Email Content:</Text>
                        <div
                          style={{
                            marginTop: 8,
                            border: "1px solid #d9d9d9",
                            borderRadius: 4,
                            background: "#fafafa",
                            padding: 8,
                            maxHeight: 300,
                            overflowY: "auto",
                            overflowX: "auto",
                            fontSize: 12,
                            lineHeight: 1.4,
                          }}
                          className="email-html-body"
                          dangerouslySetInnerHTML={{
                            __html:
                              caseData.Body?.trim() ||
                              "<i>No original body content</i>",
                          }}
                        />

                        <Divider style={{ margin: "16px 0 12px 0" }} />
                        <Button onClick={onBack}>Close</Button>
                      </div>
                    ) : (
                      // RIGHT PANEL - Show Original Email Content
                      <div>
                        <div className="email-meta">
                          <div className="email-meta-row">
                            <span className="email-meta-label">From :-</span>
                            <span className="email-meta-value">
                              {caseData.From || "-"}
                            </span>
                          </div>
                          <div className="email-meta-row">
                            <span className="email-meta-label">Subject:-</span>
                            <span className="email-meta-value">
                              {caseData.Subject || "-"}
                            </span>
                          </div>
                          <div className="email-meta-row">
                            <span className="email-meta-label">
                              To Recipients:-
                            </span>
                            <span className="email-meta-value">
                              {caseData.ToRecipients || "-"}
                            </span>
                          </div>
                        </div>

                        <Divider style={{ margin: "8px 0" }} />
                        <Text strong>Attachments:</Text>
                        <div style={{ fontSize: 12, marginTop: 4 }}>
                          {renderAttachmentList(caseData.Attachments)}
                        </div>

                        <Divider style={{ margin: "8px 0" }} />
                        <Text strong>Received Email:</Text>
                        <div
                          style={{
                            maxHeight: 500, // ADDED: Fixed height
                            overflowY: "auto", // ADDED: Vertical scrollbar
                            overflowX: "auto", // ADDED: Horizontal scrollbar
                            border: "1px solid #f0f0f0",
                            padding: 8,
                            borderRadius: 4,
                            background: "#fafafa",
                            fontSize: 12,
                            marginTop: 4,
                          }}
                          className="email-html-body"
                          dangerouslySetInnerHTML={{
                            __html: caseData.Body || "<i>No body content</i>",
                          }}
                        />
                      </div>
                    ))}
                </div>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
      <Modal
        open={showTrailModal}
        onCancel={() => setShowTrailModal(false)}
        footer={null}
        width={900}
        title="Trail Mail Details"
        destroyOnClose
      >
        <TrailMailDetails
          parentInboxEmailId={caseData?.ParentInboxEmailId}
          onClose={() => setShowTrailModal(false)}
        />
      </Modal>
    </div>
  );
};

export default CasesWorkBenchAdmin;
