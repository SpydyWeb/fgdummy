export const AnnuityData = {
  "lifecertificatesubmitted": {
    "Existing_Details": [
      {
        "name": "LastCOEUpdateDate",
        "label": "Last COE Update Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last COE Update Date",
        "placeholder": "Last COE Update Date"
      },
      {
        "name": "COEValidFrom",
        "label": "COE Valid From",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "COE Valid From",
        "placeholder": "COE Valid From"
      },
      {
        "name": "COEValidTo",
        "label": "COE Valid To",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "COE Valid To",
        "placeholder": "COE Valid To"
      },
      {
        "name": "AnnuityMode",
        "label": "Annuity Mode",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Mode",
        "placeholder": "Annuity Mode"
      },
      {
        "name": "AnnuityAmount",
        "label": "Annuity Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Amount",
        "placeholder": "Annuity Amount"
      },
      {
        "name": "AnnuityPlan",
        "label": "Annuity Plan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Plan",
        "placeholder": "Annuity Plan"
      }
    ],
    "Update_New_Details": [
      {
        "name": "CertifyingAuthorityName",
        "label": "Certifying Authority Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Certifying Authority Name",
        "placeholder": "Certifying Authority Name"
      },
      {
        "name": "CertifyingDesignation",
        "label": "Certifying Designation",
        "inputType": "text",
        "required": true,
        "validationmsg": "Certifying Designation",
        "placeholder": "Certifying Designation"
      },
      {
        "name": "CertifyingAuthorityAddress",
        "label": "Certifying Authority Address",
        "inputType": "text",
        "required": true,
        "validationmsg": "Certifying Authority Address",
        "placeholder": "Certifying Authority Address"
      },
      {
        "name": "CertifyingDate",
        "label": "Certifying Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Certifying Date",
        "placeholder": "Certifying Date"
      },
      {
        "name": "COEValidFrom",
        "label": "COE Valid From",
        "inputType": "futuredates",
        "required": true,
        "disabled": true,
        "validationmsg": "COE Valid From",
        "placeholder": "COE Valid From"
      },
      {
        "name": "COEValidTo",
        "label": "COE Valid To",
        "inputType": "date",
        "required": true,
        "disabled": true,
        "validationmsg": "COE Valid To",
        "placeholder": "COE Valid To"
      },
      {
        "name": "requestform",
        "indexName": "Minor Alteration",
        "label": "Upload Certificate of Existence",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Certificate of Existence",
        "placeholder": "Request Form"
      },
      {
        "name": "idProof",
        "label": "ID Proof of Requestor",
        "inputType": "text",
        "linkValue": " List of Acceptable ID proofs",
        "required": false,
        "validationmsg": "ID Proof of Requestor",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Life Certificate Submitted",
        "icon": "upload"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Share_CEO_Details": [
      {
        "name": "SendCOELink",
        "label": "Send COE Link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Send COE Link",
        "placeholder": "Send COE Link"
      }
    ],
    "POS_Details": [
      {
        "name": "New Update Details",
        "label": "View Updated Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "CertifyingAuthorityName",
        "label": "Certifying Authority Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Certifying Authority Name",
        "placeholder": "Certifying Authority Name",
        "posEdit": true
      },
      {
        "name": "CertifyingDesignation",
        "label": "Certifying Designation",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Certifying Designation",
        "placeholder": "Certifying Designation",
        "posEdit": true
      },
      {
        "name": "CertifyingAuthorityAddress",
        "label": "Certifying Authority Address",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Certifying Authority Address",
        "placeholder": "Certifying Authority Address",
        "posEdit": true
      },
      {
        "name": "CertifyingDate",
        "label": "Certifying Date",
        "inputType": "nofuturedates",
        "required": false,
        "disabled": true,
        "validationmsg": "Certifying Date",
        "placeholder": "Certifying Date",
        "posEdit": true
      },
      {
        "name": "COEValidFrom",
        "label": "COE Valid From",
        "inputType": "futuredates",
        "required": false,
        "disabled": true,
        "validationmsg": "COE Valid From",
        "placeholder": "COE Valid From"
      },
      {
        "name": "COEValidTo",
        "label": "COE Valid To",
        "inputType": "date",
        "required": false,
        "disabled": true,
        "validationmsg": "COE Valid To",
        "placeholder": "COE Valid To"
      },
      {
        "name": "AnnuityMode",
        "label": "Annuity Mode",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Mode",
        "placeholder": "Annuity Mode"
      },
      {
        "name": "AnnuityAmount",
        "label": "Annuity Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Amount",
        "placeholder": "Annuity Amount"
      },
      {
        "name": "AnnuityPlan",
        "label": "Annuity Plan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Annuity Plan",
        "placeholder": "Annuity Plan"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": true,
        "hide": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Select a Validate Siganture",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "disabled": true,
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  }
};