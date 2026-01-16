export const ChequeRepresentationData = {
  "renewal": {
    "BOE_Details": [
      {
        "name": "ReceiptType",
        "label": "Receipt Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Receipt Type",
        "placeholder": "Receipt Type"
      },
      {
        "name": "ChequeNumber",
        "label": "Cheque Number",
        "inputType": "text",
        "required": true,
        "pattern": "numbersOnly",
        "disabled": false,
        "validationmsg": "Cheque Number",
        "placeholder": "Cheque Number"
      }
    ],
    "CheckNumber_Fields": [
      {
        "name": "ChequeBounceReason",
        "label": "Cheque Bounce Reason",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Bounce Reason",
        "placeholder": "Cheque Bounce Reason"
      },
      {
        "name": "ChequeReceivedAtHO",
        "label": "Cheque Received at HO",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Cheque Received at HO",
        "placeholder": "Cheque Received at HO"
      },
      {
        "name": "ReceiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Receipt Number",
        "placeholder": "Receipt Number"
      },
      {
        "name": "ChequeAmount",
        "label": "Cheque Amount",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Amount",
        "placeholder": "Cheque Amount"
      },
      {
        "name": "ChequeDate",
        "label": "Cheque Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Date",
        "placeholder": "Cheque Date"
      },
      {
        "name": "ChequeExpiryDate",
        "label": "Cheque Expiry Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Expiry Date",
        "placeholder": "Cheque Expiry Date"
      },
      {
        "name": "ChequeDrawnOnBankName",
        "label": "Cheque Drawn On Bank Name",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Drawn On Bank Name",
        "placeholder": "Cheque Drawn On Bank Name"
      },
      {
        "name": "ChequeRepresentationRequestDate",
        "label": "Cheque Representation Request Date",
        "inputType": "date",
        "required": true,
        "disabled": false,
        "validationmsg": "Cheque Representation request date",
        "placeholder": "Cheque Representation request date"
      },
      {
        "name": "ReasonFor_Representation",
        "label": "Reason For Representation",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Representation",
        "placeholder": "Reason For Representation"
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
        "name": "requestform",
        "indexName": "Minor Alteration",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form"
      },
      {
        "name": "customersigningdate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "branchreceivedate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "validatesignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "Comments": [
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "newbusiness": {
    "BOE_Details": [
      {
        "name": "ReceiptType",
        "label": "Receipt Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Receipt Type",
        "placeholder": "Receipt Type"
      },
      {
        "name": "ChequeNumber",
        "label": "Cheque Number",
        "inputType": "text",
        "required": true,
        "pattern": "numbersOnly",
        "disabled": false,
        "validationmsg": "Cheque Number",
        "placeholder": "Cheque Number"
      }
    ],
    "CheckNumber_Fields": [
      {
        "name": "ChequeBounceReason",
        "label": "Cheque Bounce Reason",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Bounce Reason",
        "placeholder": "Cheque Bounce Reason"
      },
      {
        "name": "ChequeReceivedAtHO",
        "label": "Cheque Received at HO",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Cheque Received at HO",
        "placeholder": "Cheque Received at HO"
      },
      {
        "name": "ReceiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Receipt Number",
        "placeholder": "Receipt Number"
      },
      {
        "name": "ChequeAmount",
        "label": "Cheque Amount",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Amount",
        "placeholder": "Cheque Amount"
      },
      {
        "name": "ChequeDate",
        "label": "Cheque Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Date",
        "placeholder": "Cheque Date"
      },
      {
        "name": "ChequeExpiryDate",
        "label": "Cheque Expiry Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Expiry Date",
        "placeholder": "Cheque Expiry Date"
      },
      {
        "name": "ChequeDrawnOnBankName",
        "label": "Cheque Drawn On Bank Name",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Cheque Drawn On Bank Name",
        "placeholder": "Cheque Drawn On Bank Name"
      },
      {
        "name": "ChequeRepresentationRequestDate",
        "label": "Cheque Representation Request Date",
        "inputType": "date",
        "required": true,
        "disabled": false,
        "validationmsg": "Cheque Representation request date",
        "placeholder": "Cheque Representation request date"
      },
      {
        "name": "ReasonFor_Representation",
        "label": "Reason For Representation",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Representation",
        "placeholder": "Reason For Representation"
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
        "name": "requestform",
        "indexName": "Minor Alteration",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form"
      },
      {
        "name": "customersigningdate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "branchreceivedate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "validatesignature",
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
      }
    ],
    "Comments": [
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  }
};