import React, { useEffect, useState } from "react";
import { Spin, Card, Divider, Button, message } from "antd";
import {
  PaperClipOutlined,
  CloseOutlined,
  MailOutlined,
} from "@ant-design/icons";
import apicalls from "../../api/apiCalls";
import DatePipe from "./Common/DatePipe";
import "./TrialMail.css";

const TrailMailDetails = ({ parentInboxEmailId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [trailCase, setTrailCase] = useState(null);

  useEffect(() => {
    if (parentInboxEmailId) fetchTrailCase();
  }, [parentInboxEmailId]);

  const fetchTrailCase = async () => {
    setLoading(true);
    try {
      const res = await apicalls.GetCaseDetails({
        inboxEmailId: parentInboxEmailId,
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
      setTrailCase({
        InboxEmailId:
          raw.inboxEmailId ?? raw.InboxEmailId ?? parentInboxEmailId,
        EmailResponseId: raw.emailResponseId ?? raw.EmailResponseId ?? "",
        Subject: raw.subject ?? raw.Subject ?? "",
        From: raw.from ?? raw.From ?? "",
        ToRecipients: raw.toRecipients ?? raw.ToRecipients ?? "",
        ReceivedDateTime: raw.receivedDateTime ?? raw.ReceivedDateTime,
        Body: raw.body ?? raw.Body ?? "",
        HasAttachments:
          raw.hasAttachments ?? raw.HasAttachments ?? attachments.length > 0,
        Attachments: attachments,
        Status: raw.status ?? raw.Status ?? "",
      });
    } catch {
      message.error("Failed to load trail mail");
    } finally {
      setLoading(false);
    }
  };

  const renderAttachments = (list) =>
    (list || []).length ? (
      list.map((a, i) => (
        <div key={i} className="trail-mail-attachment-item">
          <PaperClipOutlined />
          <Button
            type="link"
            size="small"
            className="trail-mail-attachment-link"
            onClick={() =>
              a.BlobUrl
                ? window.open(a.BlobUrl, "_blank")
                : message.info("No URL")
            }
          >
            {a.FileName || "File"}
          </Button>
          {a.Size ? (
            <span className="trail-mail-attachment-size">
              {(a.Size / 1024).toFixed(1)} KB
            </span>
          ) : null}
        </div>
      ))
    ) : (
      <span className="trail-mail-no-attachments">No attachments</span>
    );

  return (
    <Spin spinning={loading}>
      {!loading && !trailCase && (
        <p className="trail-mail-empty">No trail mail found.</p>
      )}
      {trailCase && (
        <Card size="small" bordered className="trail-mail-card">
          <div className="trail-mail-meta-grid">
            <div className="trail-mail-grid-row">
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">
                  Email Response Id:
                </span>
                <span className="trail-mail-grid-value">
                  {trailCase.EmailResponseId || "-"}
                </span>
              </div>
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">Status:</span>
                <span className="trail-mail-grid-value">
                  {trailCase.Status || "-"}
                </span>
              </div>
            </div>
            <div className="trail-mail-grid-row">
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">From:</span>
                <span className="trail-mail-grid-value">
                  {trailCase.From || "-"}
                </span>
              </div>
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">Subject:</span>
                <span className="trail-mail-grid-value">
                  {trailCase.Subject || "-"}
                </span>
              </div>
            </div>
            <div className="trail-mail-grid-row">
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">To:</span>
                <span className="trail-mail-grid-value">
                  {trailCase.ToRecipients || "-"}
                </span>
              </div>
              <div className="trail-mail-grid-cell">
                <span className="trail-mail-grid-label">Received:</span>
                <span className="trail-mail-grid-value">
                  <DatePipe value={trailCase.ReceivedDateTime} />
                </span>
              </div>
            </div>
          </div>

          {/* Attachments Section */}
          <Divider className="trail-mail-section-divider" />
          <div className="trail-mail-section-header">Attachments</div>
          <div className="trail-mail-attachments-wrapper">
            {renderAttachments(trailCase.Attachments)}
          </div>

          {/* Body Section */}
          <Divider className="trail-mail-section-divider" />
          <div className="trail-mail-section-header">Body</div>
          {/\<\w+/.test(trailCase.Body || "") ? (
            <div
              className="trail-mail-body trail-mail-body-html"
              dangerouslySetInnerHTML={{
                __html: trailCase.Body || "<i>No body content</i>",
              }}
            />
          ) : (
            <pre className="trail-mail-body trail-mail-body-text">
              {(trailCase.Body || "No body content")
                .replace(/\r\n/g, "\n")
                .replace(/\r/g, "\n")}
            </pre>
          )}

          {/* Final Divider + Actions */}
          <Divider className="trail-mail-section-divider" />
          <div className="trail-mail-actions">
            <Button
              icon={<CloseOutlined />}
              onClick={onClose}
              className="trail-mail-close-btn"
            >
              Close
            </Button>
          </div>
        </Card>
      )}
    </Spin>
  );
};

export default TrailMailDetails;
