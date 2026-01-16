export const RenewalRelatedData = {
  "gstwaiver": {
    "BOE_Details": [
      {
        "name": "ViewExistingFrequency",
        "label": "View Existing Frequency",
        "inputType": "title"
      },
      {
        "name": "ExistingSurvivalFrequency",
        "label": "Existing Survival Frequency",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Existing Survival Frequency",
        "placeholder": "Existing Survival Frequency"
      },
      {
        "name": "UpdateNewFrequency",
        "label": "Update New Frequency",
        "inputType": "title"
      },
      {
        "name": "NewSurivalFrequency",
        "label": "New Survival Frequency",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "New Survival Frequency",
        "placeholder": "New Survival Frequency"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": false,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "disabled": false,
        "validationmsg": "Select Customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "RequestForm_Fields": [
      {
        "name": "UploadDocumentsForGSTWaiver",
        "label": "Upload Documents For GST Waiver",
        "inputType": "title"
      },
      {
        "name": "requestform",
        "indexName": "Minor Alteration",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form"
      },
      {
        "name": "ApprovalEmail",
        "indexName": "Minor Alteration",
        "label": "Upload Approval Email",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Approval Email",
        "placeholder": "Approval Email"
      },
      {
        "name": "NRI/NREAccountProof",
        "label": "NRI/NRE Account Proof",
        "inputType": "upload",
        "required": false,
        "validationmsg": "NRI/NRE Account Proof",
        "placeholder": "NRI/NRE Account Proof "
      },
      {
        "name": "TaxResidencyCertificate/ResidentCard/Form10-F",
        "label": "Tax Residency Certificate / Resident Card / Form 10-F",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Tax Residency Certificate / Resident Card / Form 10-F",
        "placeholder": "Tax Residency Certificate / Resident Card / Form 10-F"
      },
      {
        "name": "DeclarationforNRIGSTWaiver",
        "label": "Declaration for NRI GST Waiver",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Declaration for NRI GST Waiver",
        "placeholder": "Declaration for NRI GST Waiver"
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
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "hide": false,
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
    "POS_Details": [
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "hide": false,
        "inputType": "radio",
        "disabled": true,
        "required": false,
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
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "viewPOS",
        "label": "PA Action",
        "inputType": "title"
      },
      {
        "name": "LifeAsiaJEPassed",
        "label": "Life Asia JE Passed",
        "inputType": "radio",
        "required": false,
        "validationmsg": "Life Asia JE Passed",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "AuthorizerComments",
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