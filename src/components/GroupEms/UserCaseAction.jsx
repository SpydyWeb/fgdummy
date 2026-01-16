import React, { useEffect, useState } from "react";
import {
  Spin,
  Card,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  message,
  Form,
  Input,
  Modal,
  Switch,
} from "antd";
import {
  RollbackOutlined,
  PaperClipOutlined,
  SendOutlined,
  LinkOutlined,
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
import AttachmentUploader from "./Common/AttachmentUploader";
import TrailMailDetails from "./TrailMailDetails";
import "./GroupEms.css";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const { Text } = Typography;
const { TextArea } = Input;

const UserCaseAction = ({ inboxEmailId, emailResponseId, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const [draftBody, setDraftBody] = useState("");
  const [attachmentsPayload, setAttachmentsPayload] = useState([]);
  const [toList, setToList] = useState([]);
  const [ccList, setCcList] = useState([]);
  const [toInput, setToInput] = useState("");
  const [ccInput, setCcInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showTrailModal, setShowTrailModal] = useState(false);
  const [sendMode, setSendMode] = useState(1);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCaseDetails();
  }, [inboxEmailId, emailResponseId]);

  useEffect(() => {
    if (!caseData) return;
    const preTo = splitEmails(caseData.From);
    const preCc = splitEmails(caseData.CcRecipients);
    setToList(preTo);
    setCcList(preCc);
  }, [caseData]);

  useEffect(() => {
    // Match right panel height to left panel height
    const matchHeights = () => {
      const leftCard = document.querySelector(
        ".workbench-left-panel .workbench-card"
      ); // Changed: target the card, not panel
      const rightPanel = document.querySelector(".workbench-right-panel");

      if (leftCard && rightPanel) {
        const leftHeight = leftCard.offsetHeight; // Total card height including header
        document.documentElement.style.setProperty(
          "--left-panel-height",
          `${leftHeight}px`
        );
        rightPanel.classList.add("js-matched-height");
      }
    };

    // Apply after content renders
    const timer = setTimeout(matchHeights, 100);

    return () => clearTimeout(timer);
  }, [caseData]);

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
        Subject: raw.subject ?? raw.Subject ?? "",
        From: raw.from ?? raw.From ?? "",
        ToRecipients: raw.toRecipients ?? raw.ToRecipients ?? "",
        CcRecipients: raw.ccRecipients ?? raw.CcRecipients ?? "",
        Status: raw.status ?? raw.Status ?? "",
        ReceivedDateTime: raw.receivedDateTime ?? raw.ReceivedDateTime,
        Body: raw.body ?? raw.Body ?? "",
        Priority: raw.priority ?? raw.Priority ?? null,
        ProductType: raw.productType ?? raw.ProductType ?? null,
        CallTypeId: raw.callTypeId ?? raw.CallTypeId ?? null,
        CallType: raw.callType ?? raw.CallType ?? null,
        SubTypeId: raw.subTypeId ?? raw.SubTypeId ?? null,
        SubType: raw.subType ?? raw.SubType ?? null,
        IsForwardedToInternalTeam:
          raw.isForwardedToInternalTeam ?? raw.IsForwardedToInternalTeam,
        IsSpamEMS: raw.isSpamEMS ?? raw.IsSpamEMS,
        TrailFound: raw.trailFound ?? raw.TrailFound,
        ParentInboxEmailId: raw.parentInboxEmailId ?? raw.ParentInboxEmailId,
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
        CaseAssignNote: raw.internalNote ?? raw.InternalNote ?? "",
        ToRecipientsAtCaseClosedCommuncation:
          raw.toRecipientsAtCaseClosedCommuncation ??
          raw.ToRecipientsAtCaseClosedCommuncation ??
          "",
        CcRecipientsAtCaseClosedCommuncation:
          raw.ccRecipientsAtCaseClosedCommuncation ??
          raw.CcRecipientsAtCaseClosedCommuncation ??
          "",
        RecivedOnMailBox: raw.recivedOnMailBox ?? raw.RecivedOnMailBox ?? null,
      });
    } catch {
      message.error("Failed to load case details");
    } finally {
      setLoading(false);
    }
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
                a.BlobUrl ? window.open(a.BlobUrl, "_blank") : null
              }
            >
              {a.FileName}
            </Button>
            {a.Size ? (
              <span style={{ color: "#888", fontSize: 11 }}>
                {(a.Size / 1024).toFixed(1)} KB
              </span>
            ) : null}
          </div>
        ))
      : "No attachments";

  const addEmails = (raw, listSetter, inputSetter, existingList) => {
    const items = splitEmails(raw);
    if (!items.length) return;
    const normalized = items.map((e) => e.toLowerCase());
    const next = Array.from(new Set([...(existingList || []), ...normalized]));
    listSetter(next);
    inputSetter("");
  };

  const removeEmail = (idx, list, listSetter) => {
    const next = [...list];
    next.splice(idx, 1);
    listSetter(next);
  };

  function sanitizeCaseHtml(raw) {
    let html = String(raw || "");

    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch) {
      html = bodyMatch[1];
    }

    // Strip document-level and dangerous tags
    html = html
      .replace(/<!DOCTYPE[\s\S]*?>/gi, "")
      .replace(/<\/?(html|head)\b[\s\S]*?>/gi, "")
      .replace(/<meta[^>]*>/gi, "")
      .replace(/<link[^>]*>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

    return html.trim();
  }

  const BuildPreviousMail = (caseData) => {
    const safeCaseBody = sanitizeCaseHtml(caseData?.Body);
    return `
    <div style="font-family: Arial, sans-serif; font-size: 13px;">
      <p><strong class="email-meta-label">From:</strong> ${
        caseData?.From || "-"
      }</p>
      <p><strong class="email-meta-label">To:</strong> ${
        caseData?.ToRecipients || "-"
      }</p>
      <p><strong class="email-meta-label">CC:</strong> ${
        caseData?.CcRecipients || "-"
      }</p>
      <p><strong class="email-meta-label">Subject:</strong> ${
        caseData?.Subject || "-"
      }</p>
      <br />
      <div>
        ${safeCaseBody || "<i>No body content</i>"}
      </div>
    </div>
  `;
  };

  const splitEmails = (txt) =>
    (txt || "")
      .split(/[,;]+/g)
      .map((s) => s.trim())
      .filter(Boolean);

  useEffect(() => {
    fetchCaseDetails();
  }, [inboxEmailId, emailResponseId]);

  function toHtmlWithLineBreaks(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r\n|\r|\n/g, "<br>");
  }

  const buildDraftBodyFragment = (raw) => {
    const safe = (raw ?? "").trim();

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

  const handleSendCommunication = async () => {
    if (!caseData?.InboxEmailId) return;
    if (!draftBody.trim()) {
      message.error("Draft body is required");
      return;
    }
    setSending(true);
    try {
      const normalizedAttachments = (attachmentsPayload || []).map((a) => ({
        fileName: a.fileName || a.FileName || "",
        contentType: a.contentType || a.ContentType || "",
        base64: a.base64 || a.Base64 || "",
        size: a.size || a.Size || 0,
      }));

      const emailBody = `<div style="font-family: Arial, sans-serif; font-size: 13px; line-height: 1.5;">${draftBody.replace(
        /\n/g,
        "<br>"
      )}</div>`;

      const finalBody = buildDraftBodyFragment(emailBody);
      console.log("Final Body:", finalBody);
      const payload = {
        inboxEmailId: caseData.InboxEmailId,
        emailResponseId: caseData.EmailResponseId,
        ToRecipients: toList.join("; "),
        CcRecipients: ccList.join("; "),
        userId: getCurrentUserId(),
        subject: caseData.Subject,
        draftBody: finalBody,
        attachments: normalizedAttachments,
        sendCommunication: sendMode === 1,
        recivedMailBoxId: caseData.ToRecipients,
      };
      const res = await apicalls.UserAssignCaseSubmission?.(payload);
      const apiData = res?.data || res || {};
      const ok = apiData.result ?? apiData.Result ?? false;
      const apiMsg =
        apiData.message ??
        apiData.Message ??
        (sendMode === 1
          ? ok
            ? "Sent and closed."
            : "Send & Close failed."
          : ok
          ? "Saved and closed."
          : "Save & Close failed.");

      if (ok) {
        message.success(apiMsg);
        setDraftBody("");
        setAttachmentsPayload([]);
        onBack && onBack();
      } else {
        message.error(apiMsg || "Action failed");
      }
    } catch {
      message.error(
        sendMode === 1 ? "Send & Close failed" : "Save & Close failed"
      );
    } finally {
      setSending(false);
    }
  };

  const statusUpper = (caseData?.Status || "").toUpperCase();
  const isClosed = statusUpper === "CLOSED";
  const isPending = statusUpper === "PENDING";

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

  const renderChipsInput = (
    label,
    value,
    setValue,
    list,
    setList,
    autoCompleteName,
    inputId,
    autoCompleteToken
  ) => (
    <Form.Item
      label={label}
      required
      className="draft-body-item"
      name={autoCompleteName}
    >
      <div
        style={{
          display: "flex",
          gap: 8,
          alignItems: "flex-start",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <input
          type="text"
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
            height: 0,
            width: 0,
          }}
          tabIndex={-1}
          autoComplete={`${autoCompleteToken}-decoy`}
          name={`${autoCompleteName}-decoy`}
        />
        <div style={{ display: "flex", gap: 6, width: "100%" }}>
          <Input
            id={inputId}
            type="email"
            placeholder={`Type emails separated by comma/semicolon and press Add`}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault();
              addEmails(value, setList, setValue, list);
            }}
            autoComplete={autoCompleteToken}
            name={autoCompleteName}
            inputMode="email"
            aria-label={label}
            autoCapitalize="none"
            autoCorrect="off"
            style={{ width: "100%" }} // was maxWidth: 400
          />
          <Button
            onClick={() => addEmails(value, setList, setValue, list)}
            disabled={!value.trim()}
            className="ant-btn-icon"
            style={{ color: "#c21b17", fontWeight: "bolder" }}
          >
            Add
          </Button>
        </div>
        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", width: "100%" }}
        >
          {list.map((email, i) => (
            <span
              key={`${email}-${i}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "#f5f5f5",
                border: "1px solid #ddd",
                padding: "2px 8px",
                borderRadius: 14,
                fontSize: 12,
              }}
            >
              {email}
              <Button
                type="link"
                size="small"
                onClick={() => removeEmail(i, list, setList)}
                style={{ color: "#b31b24", padding: 0 }}
              >
                remove
              </Button>
            </span>
          ))}
          {!list.length && <span style={{ color: "#888" }}>No recipients</span>}
        </div>
      </div>
    </Form.Item>
  );

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
          {!caseData && !loading && <p>No data</p>}
          {caseData && (
            <div className="workbench-container">
              <div className="workbench-left-panel">
                <Card title="Case Details" bordered className="workbench-card">
                  <div className="workbench-scroll-content">
                    {caseData.TrailFound && caseData.ParentInboxEmailId > 0 && (
                      <Button
                        icon={<LinkOutlined />}
                        size="small"
                        className="trail-mail-btn"
                        onClick={() => setShowTrailModal(true)}
                      >
                        Trail Mail
                      </Button>
                    )}

                    <Row gutter={12}>
                      <Col span={12}>
                        <Text strong>Email Response Id:</Text>
                        <div className="wrap-text">
                          {caseData.EmailResponseId}
                        </div>
                      </Col>
                      <Col span={12}>
                        <Text strong>Status:</Text>
                        <div className="wrap-text">{caseData.Status}</div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Received:</Text>
                        <div className="wrap-text">
                          <DatePipe value={caseData.ReceivedDateTime} />
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Priority:</Text>
                        <div className="wrap-text">
                          {caseData.Priority || "-"}
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Received On Mailbox:</Text>
                        <div className="wrap-text">
                          {caseData.RecivedOnMailBox || "-"}
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Product Type:</Text>
                        <div className="wrap-text">
                          {caseData.ProductType || "-"}
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Call Type:</Text>
                        <div className="wrap-text">
                          {caseData.CallType || caseData.CallTypeId || "-"}
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Sub Type:</Text>
                        <div className="wrap-text">
                          {caseData.SubType || caseData.SubTypeId || "-"}
                        </div>
                      </Col>

                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Forwarded:</Text>
                        <div className="wrap-text">
                          {caseData.IsForwardedToInternalTeam ? "Yes" : "No"}
                        </div>
                      </Col>
                      <Col span={12} style={{ marginTop: 8 }}>
                        <Text strong>Spam:</Text>
                        <div className="wrap-text">
                          {caseData.IsSpamEMS ? "Yes" : "No"}
                        </div>
                      </Col>
                    </Row>

                    <Divider style={{ margin: "12px 0" }} />
                    <Text strong>Attachments:</Text>
                    <div className="attachments-list">
                      {renderAttachmentList(caseData.Attachments)}
                    </div>

                    <Divider style={{ margin: "12px 0" }} />
                    <Row gutter={12}>
                      <Col span={12}>
                        <Text strong>Communication Sent:</Text>
                        <div>{caseData.CommunicationSent ? "Yes" : "No"}</div>
                      </Col>
                    </Row>

                    {caseData.CaseAssignNote && (
                      <Form name="trigger" layout="vertical">
                        <Form.Item
                          label="Case Assign Note"
                          style={{ marginTop: 12 }}
                        >
                          <TextArea
                            value={getDraftPlain(caseData.CaseAssignNote)}
                            autoSize={{ minRows: 4, maxRows: 50 }}
                            readOnly
                          />
                        </Form.Item>
                      </Form>
                    )}

                    {isClosed && (
                      <div className="email-meta">
                        <div className="email-meta-row">
                          <span className="email-meta-label">
                            To (Closed Comm)
                          </span>
                          <span className="email-meta-value email-meta-wrap">
                            {caseData?.ToRecipientsAtCaseClosedCommuncation ||
                              "-"}
                          </span>
                        </div>
                        <div className="email-meta-row">
                          <span className="email-meta-label">
                            CC (Closed Comm)
                          </span>
                          <span className="email-meta-value email-meta-wrap">
                            {caseData?.CcRecipientsAtCaseClosedCommuncation ||
                              "-"}
                          </span>
                        </div>
                      </div>
                    )}

                    {caseData?.UserDraftBody && (
                      <Form name="trigger" layout="vertical">
                        <Form.Item label="Sent Draft Body" style={{ marginTop: 3 }}>
                          <TextArea
                            value={getDraftPlain(caseData.UserDraftBody)}
                            autoSize={{ minRows: 4, maxRows: 50 }}
                            readOnly
                          />
                        </Form.Item>
                      </Form>
                    )}

                    {isPending && (
                      <>
                        <AttachmentUploader
                          emailResponseId={caseData?.EmailResponseId}
                          onChange={setAttachmentsPayload}
                          disabled={sending}
                          buttonClassName="attachment-upload-btn"
                          buttonText="Upload Attachments"
                        />
                      </>
                    )}

                    {sendMode === 0 && (
                      <div style={{ marginTop: 6 }}>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Optional: When using Save & Close (without sending a
                          reply), you may upload a related communication email
                          (.eml or .msg) for future reference if available.
                        </Text>
                      </div>
                    )}

                    {isPending && (
                      <>
                        <Divider style={{ margin: "12px 0" }} />
                        <Form
                          form={form}
                          layout="vertical"
                          className="draft-form"
                        >
                          {renderChipsInput(
                            "To (Recipients)",
                            toInput,
                            setToInput,
                            toList,
                            setToList,
                            "to-recipients",
                            "to-recipients-input",
                            "section-to to"
                          )}
                          {renderChipsInput(
                            "CC (Recipients)",
                            ccInput,
                            setCcInput,
                            ccList,
                            setCcList,
                            "cc-recipients",
                            "cc-recipients-input",
                            "section-cc cc"
                          )}
                          <Form.Item
                            label="Draft Body"
                            required
                            className="draft-body-item"
                          >
                            <TextArea
                              className="draft-body-textarea"
                              rows={15}
                              value={draftBody}
                              onChange={(e) => setDraftBody(e.target.value)}
                              placeholder="Type draft reply / resolution notes"
                              style={{ width: "100%" }}
                            />
                          </Form.Item>
                          {/* <ReactQuill
                          className="quill-container"
                          theme="snow"
                          value={draftBody}
                          onChange={(e) => setDraftBody(e)}
                        /> */}
                          <div className="send-comm-row">
                            <Button
                              type="primary"
                              icon={<SendOutlined />}
                              loading={sending}
                              disabled={sending || !draftBody.trim()}
                              className={
                                sendMode === 1
                                  ? "send-btn send-btn-green"
                                  : "send-btn send-btn-red"
                              }
                              onClick={handleSendCommunication}
                            >
                              {sendMode === 1 ? "Send & Close" : "Save & Close"}
                            </Button>
                            <div className="send-mode-switch">
                              <Switch
                                checked={sendMode === 1}
                                onChange={(checked) =>
                                  setSendMode(checked ? 1 : 0)
                                }
                                checkedChildren="Send & Close"
                                unCheckedChildren="Save & Close"
                                className={
                                  sendMode === 1
                                    ? "comm-switch comm-switch-green"
                                    : "comm-switch comm-switch-red"
                                }
                              />
                            </div>
                          </div>
                        </Form>
                      </>
                    )}

                    {isClosed && (
                      <>
                        <Divider style={{ margin: "12px 0" }} />
                        <Text type="secondary">
                          Case is closed. No further actions available.
                        </Text>
                      </>
                    )}
                  </div>
                </Card>
              </div>

              <div className="workbench-right-panel">
                <Card bordered className="workbench-card" title="Email Content">
                  <div className="workbench-scroll-content">
                    <div
                      className="email-content-body"
                      dangerouslySetInnerHTML={{
                        __html: BuildPreviousMail(caseData),
                      }}
                    />
                  </div>
                </Card>
              </div>
            </div>
          )}
        </Spin>

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
    </div>
  );
};

export default UserCaseAction;
