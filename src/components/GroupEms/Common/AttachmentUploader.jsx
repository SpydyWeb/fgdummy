import React, { useState, useCallback, useRef } from "react";
import { Upload, Button, message } from "antd";
import "../GroupEms.css";

const MAX_ATTACH_COUNT = 10; // Updated from 5 to 10
const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // Updated from 10MB to 24MB

const allowedExt = new Set([
  // Existing formats
  ".pdf",
  ".xlsx",
  ".xls",
  ".doc",
  ".docx",
  ".png",
  ".jpg",
  ".jpeg",
  ".eml",
  ".msg",

  // Video & Multimedia
  ".mp4",
  ".mov",
  ".avi",
  ".flv",
  ".mkv",
  ".wmv",

  // Presentations
  ".ppt",
  ".pptx",
  ".odp",
  ".key",

  // Archives & Compression
  ".zip",
  ".rar",
  ".7z",

  // Audio
  ".mp3",
  ".wav",
  ".mid",
  ".midi",
  ".wma",

  // Documents & Text
  ".txt",
  ".rtf",
  ".odt",
  ".csv",
  ".md",
]);

const specialMimeMap = {
  ".eml": "message/rfc822",
  ".msg": "application/vnd.ms-outlook",
  // Video & Multimedia
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".flv": "video/x-flv",
  ".mkv": "video/x-matroska",
  ".wmv": "video/x-ms-wmv",
  // Presentations
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".odp": "application/vnd.oasis.opendocument.presentation",
  ".key": "application/x-iwork-keynote-sffkey",
  // Archives & Compression
  ".zip": "application/zip",
  ".rar": "application/x-rar-compressed",
  ".7z": "application/x-7z-compressed",
  // Audio
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".mid": "audio/midi",
  ".midi": "audio/midi",
  ".wma": "audio/x-ms-wma",
  // Documents & Text
  ".txt": "text/plain",
  ".rtf": "application/rtf",
  ".odt": "application/vnd.oasis.opendocument.text",
  ".csv": "text/csv",
  ".md": "text/markdown",
};

// Safe extension extractor
const getExtension = (name = "") => {
  const clean = name.trim().toLowerCase();
  const lastDot = clean.lastIndexOf(".");
  return lastDot >= 0 ? clean.slice(lastDot) : "";
};

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || "";
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const AttachmentUploader = ({
  emailResponseId,
  onChange,
  disabled = false,
  buttonText = "Upload (max 10 files, total 24MB)", // Updated button text
  buttonClassName = "attachment-upload-btn",
}) => {
  const [files, setFiles] = useState([]);
  const filesRef = useRef([]);

  const emitPayload = useCallback(
    (list) => {
      const payload = list.map((f) => {
        const ext = getExtension(f.prefixedName);
        return {
          fileName: f.prefixedName,
          contentType: f.type || specialMimeMap[ext] || "",
          base64: f.base64,
          size: f.size,
        };
      });
      onChange && onChange(payload);
    },
    [onChange]
  );

  const addFile = (fileObj) => {
    filesRef.current = [...filesRef.current, fileObj];
    setFiles(filesRef.current);
    emitPayload(filesRef.current);
  };

  const beforeUpload = async (file) => {
    if (disabled) return Upload.LIST_IGNORE;

    const ext = getExtension(file.name);
    if (!allowedExt.has(ext)) {
      message.error(`Invalid file type: ${ext}. Please check allowed formats.`);
      return Upload.LIST_IGNORE;
    }

    if (filesRef.current.length >= MAX_ATTACH_COUNT) {
      message.error("Maximum 10 files allowed");
      return Upload.LIST_IGNORE;
    }

    const newTotalSize =
      filesRef.current.reduce((sum, f) => sum + f.size, 0) + file.size;

    if (newTotalSize > MAX_TOTAL_SIZE) {
      const currentSizeMB = (
        filesRef.current.reduce((sum, f) => sum + f.size, 0) /
        (1024 * 1024)
      ).toFixed(1);
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
      message.error(
        `Total size exceeds 24MB limit. Current: ${currentSizeMB}MB + New file: ${fileSizeMB}MB`
      );
      return Upload.LIST_IGNORE;
    }

    if (!emailResponseId) {
      message.error("Missing emailResponseId");
      return Upload.LIST_IGNORE;
    }

    try {
      const base64 = await fileToBase64(file);
      const prefixedName = `${emailResponseId}_${file.name}`;
      addFile({
        uid: file.uid,
        originalName: file.name,
        prefixedName,
        type: file.type || specialMimeMap[ext] || "", // Use mapped MIME type if available
        size: file.size,
        base64,
      });

      message.success(`File "${file.name}" uploaded successfully`);
    } catch (error) {
      console.error("File read error:", error);
      message.error(`Failed to read file: ${file.name}`);
    }

    return Upload.LIST_IGNORE; // prevent auto upload
  };

  const onRemove = (file) => {
    filesRef.current = filesRef.current.filter((f) => f.uid !== file.uid);
    setFiles(filesRef.current);
    emitPayload(filesRef.current);
    message.info(`File removed: ${file.name}`);
  };

  // Build accept list (extensions only for reliability)
  const acceptList = Array.from(allowedExt).join(",");

  // Calculate current total size for display
  const currentTotalSize = files.reduce((sum, f) => sum + f.size, 0);
  const currentSizeMB = (currentTotalSize / (1024 * 1024)).toFixed(1);
  const maxSizeMB = (MAX_TOTAL_SIZE / (1024 * 1024)).toFixed(0);

  return (
    <div>
      <Upload
        multiple
        beforeUpload={beforeUpload}
        onRemove={onRemove}
        fileList={files.map((f) => ({
          uid: f.uid,
          name: f.prefixedName,
          status: "done",
          size: f.size,
        }))}
        accept={acceptList}
        disabled={disabled}
      >
        <Button className={buttonClassName} disabled={disabled}>
          {buttonText}
        </Button>
      </Upload>

      {/* Show current usage */}
      {files.length > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
          Files: {files.length}/{MAX_ATTACH_COUNT} | Size: {currentSizeMB}/
          {maxSizeMB}MB
        </div>
      )}

      {/* Show supported formats (optional, can be shown on hover or info icon) */}
      <div style={{ marginTop: 4, fontSize: 11, color: "#999" }}>
        Supported: Documents, Images, Videos, Audio, Archives, Presentations
      </div>
    </div>
  );
};

export default AttachmentUploader;
