export const Data = {
  "mobilenumberupdate": {
    "BOE_Details": [
      {
        "name": "custRole",
        "label": "Mobile Number to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "disabled": false,
        "validationmsg": "Select Mobile Number to be Updated For ",
        "placeholder": "Select"
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
        "name": "Mobile_Old",
        "label": "Existing Mobile",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Existing Mobie Missing",
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "placeholder": "Existing Mobile"
      },
      {
        "name": "Mobile_New",
        "label": "New Mobile",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "disabled": false,
        "validationmsg": "Enter New Mobile",
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "placeholder": "New Mobile"
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
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Mobile Number to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Request ID No",
        "disabled": true,
        "placeholder": "Request ID No"
      },
      {
        "name": "Mobile_Old",
        "label": "Existing Mobile",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Existing Mobile Missing",
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "placeholder": "Existing Mobile"
      },
      {
        "name": "Mobile_New",
        "label": "New Mobile",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter New Mobile",
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "placeholder": "New Mobile"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request By"
      },
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
        "name": "DedupeMatch",
        "label": "Dedupe Match Details",
        "inputType": "linkradio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "class": "disabled",
        "inputType": "radio",
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
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "Checklist": [
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
      }
    ],
    "Comments": [
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "emailupdate": {
    "BOE_Details": [
      {
        "name": "custRole",
        "label": "Email Id to be Updated For?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Email Id to be Updated For",
        "placeholder": "Select"
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
        "name": "Email_Old",
        "label": "Existing Email",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Existing Email is missing",
        "placeholder": "Existing Email"
      },
      {
        "name": "Email_New",
        "label": "New Email",
        "inputType": "email",
        "required": true,
        "validationmsg": "Enter New Email",
        "placeholder": "New Email"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Email Id to be Updated For?",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "Request ID No"
      },
      {
        "name": "Email_Old",
        "label": "Existing Email",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Existing Email"
      },
      {
        "name": "Email_New",
        "label": "New Email",
        "inputType": "email",
        "required": true,
        "validationmsg": "Enter New Email",
        "placeholder": "New Email"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request By"
      },
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
        "name": "DedupeMatch",
        "label": "Dedupe Match Details",
        "inputType": "linkradio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
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
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "class": "disabled",
        "hide": false,
        "disabled": true,
        "inputType": "radio",
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
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "Buttons": [
      {
        "label": "Send OTP"
      }
    ],
    "Checklist": [
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
        "placeholder": "Select a date",
        "required": true,
        "validationmsg": "Select Customer Signing Date"
      },
      {
        "name": "branchreceivedate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date",
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
      }
    ],
    "Comments": [
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      }
    ]
  },
  "alternatenumberupdate": {
    "BOE_Details": [
      {
        "name": "custRole",
        "label": "Alternate Number to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Alternate Number to be Updated For",
        "placeholder": "Select"
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
        "name": "AlternateNo_Old",
        "label": "Existing Alternate Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Existing Alternate Number Missing",
        "placeholder": "Existing Alternate Number"
      },
      {
        "name": "AlternateNo_New",
        "label": "New Alternate Number",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Enter New Alternate Number",
        "placeholder": "New Alternate Number"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Alternate Number to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Alternate Number to be Updated For",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Request ID No",
        "placeholder": "Request ID No",
        "disabled": true
      },
      {
        "name": "AlternateNo_Old",
        "label": "Existing Alternate Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Existing Alternate Number Missing",
        "placeholder": "Existing Alternate Number"
      },
      {
        "name": "AlternateNo_New",
        "label": "New Alternate Number",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Enter New Alternate Number",
        "placeholder": "New Alternate Number"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request By"
      },
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
        "name": "DedupeMatch",
        "label": "Dedupe Match Details",
        "inputType": "linkradio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "hide": false,
        "class": "disabled",
        "inputType": "radio",
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
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comment Box"
      }
    ],
    "Buttons": [
      {
        "label": "Send OTP"
      }
    ],
    "Checklist": [
      {
        "name": "requestform",
        "indexName": "Minor Alteration",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Request Form"
      },
      {
        "name": "customersigningdate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "placeholder": "Select a date",
        "required": true,
        "validationmsg": "Select Customer Signing Date"
      },
      {
        "name": "branchreceivedate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "placeholder": "Select a date",
        "required": true,
        "validationmsg": "Select Request Received Date"
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
      }
    ],
    "Comments": [
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      }
    ]
  },
  "worknumberupdate": {
    "BOE_Details": [
      {
        "name": "custRole",
        "label": "Work Number to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select",
        "placeholder": "Select"
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
        "name": "WorkNo_Old",
        "label": "Existing Work Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "",
        "placeholder": "Existing Work Number"
      },
      {
        "name": "WorkNo_New",
        "label": "New Work Number",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Enter New Work Number",
        "placeholder": "New Work Number"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Work Number to be Updated For ?",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Request ID No",
        "disabled": true
      },
      {
        "name": "WorkNo_Old",
        "label": "Existing Work Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "",
        "placeholder": "Existing Work Number"
      },
      {
        "name": "WorkNo_New",
        "label": "New Work Number",
        "inputType": "phonenumber",
        "pattern": "numbersOnly",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Enter New Work Number",
        "placeholder": "New Work Number"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request By"
      },
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
        "name": "DedupeMatch",
        "label": "Dedupe Match Details",
        "inputType": "linkradio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "hide": false,
        "class": "disabled",
        "inputType": "radio",
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
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Buttons": [
      {
        "label": "Send OTP"
      }
    ],
    "Checklist": [
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
      }
    ],
    "Comments": [
      {
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delayed Submission"
      }
    ]
  },
  "addresschange": {
    "Change_Fields": [
      {
        "name": "custRole",
        "label": "Address Details to be Updated For ?",
        "inputType": "dropdown",
        "disable": false,
        "required": true,
        "validationmsg": "Select Address Details",
        "placeholder": "Select"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Select a Request Mode"
      },
      {
        "name": "Request_for",
        "label": "Request For",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request For",
        "placeholder": "Select a RequestFor"
      }
    ],
    "BOE_Details": [
      {
        "name": "existingdetails",
        "label": "Current Address",
        "inputType": "title"
      },
      {
        "name": "Old_Address",
        "label": "",
        "inputType": "textbox",
        "required": false,
        "disabled": true,
        "validationmsg": "Current Address Missing",
        "placeholder": "Current Address"
      },
      {
        "name": "existingdetails",
        "label": "New Address",
        "inputType": "title"
      },
      {
        "name": "New_Line1",
        "label": "Line1",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "maxlength": 30,
        "validationmsg": "Enter Line1",
        "placeholder": "Line1"
      },
      {
        "name": "New_Line2",
        "label": "Line2",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "maxlength": 30,
        "validationmsg": "Enter Line2",
        "placeholder": "Line2"
      },
      {
        "name": "New_LandMark",
        "label": "Landmark",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "maxlength": 30,
        "validationmsg": "Enter Landmark",
        "placeholder": "Landmark"
      },
      {
        "name": "New_Pincode",
        "label": "Pin Code",
        "inputType": "number",
        "pattern": "numbersOnly",
        "maxlength": 6,
        "minlength": 6,
        "message": "Enter 6 Digits",
        "required": true,
        "validationmsg": "Enter Pin Code",
        "placeholder": "Pin Code"
      },
      {
        "name": "New_City",
        "label": "City",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": false,
        "validationmsg": "Enter City",
        "placeholder": "City",
        "disabled": false
      },
      {
        "name": "New_State",
        "label": "State",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": false,
        "validationmsg": "Enter State",
        "placeholder": "State",
        "disabled": false
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Address Details Updated For",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Address Details",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Request ID No"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Request Mode",
        "placeholder": "Select a Request Mode"
      },
      {
        "name": "existingdetails",
        "label": "Current Address",
        "inputType": "title"
      },
      {
        "name": "Old_Address",
        "label": "",
        "inputType": "textbox",
        "disabled": true,
        "required": false,
        "validationmsg": "Current Address Missing",
        "placeholder": "Current Address"
      },
      {
        "name": "existingdetails",
        "label": "New Address Updated",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "New_Line1",
        "label": "Line1",
        "inputType": "text",
        "pattern": "addressline",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter Line1",
        "placeholder": "Line1"
      },
      {
        "name": "New_Line2",
        "label": "Line2",
        "inputType": "text",
        "pattern": "addressline",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter Line2",
        "placeholder": "Line2"
      },
      {
        "name": "New_LandMark",
        "label": "Landmark",
        "inputType": "text",
        "pattern": "addressline",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter Landmark",
        "placeholder": "Landmark"
      },
      {
        "name": "New_Pincode",
        "label": "Pin Code",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter Pin Code",
        "maxlength": 6,
        "minlength": 6,
        "placeholder": "Pin Code"
      },
      {
        "name": "New_City",
        "label": "City",
        "inputType": "text",
        "disabled": false,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter City",
        "placeholder": "City"
      },
      {
        "name": "New_State",
        "label": "State",
        "inputType": "text",
        "disabled": false,
        "posEdit": true,
        "required": false,
        "validationmsg": "Enter State",
        "placeholder": "State"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Select Reason For Delayed Submission",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "hide": false,
        "class": "disabled",
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
        "label": "Requestor Comments",
        "inputType": "textarea",
        "disabled": true,
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Buttons": [
      {
        "label": "Aadhar Check"
      },
      {
        "label": "Send OTP"
      }
    ],
    "Request_Details": [
      {
        "name": "reasonforchange",
        "label": "Reason For Change / Update",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Reason For Change / Update",
        "placeholder": "Reason for change/update"
      },
      {
        "name": "requestsource",
        "label": "Request Source",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Source",
        "placeholder": "Request Source"
      },
      {
        "name": "requestdate",
        "label": "Request Date & Time",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select Request Date & Time",
        "placeholder": ""
      },
      {
        "name": "customersigning",
        "label": "Customer Signing Date & Time",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date & Time",
        "placeholder": ""
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "validationmsg": "Select Reason For Delayed Submission",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "requestmode",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Checklist": [
      {
        "name": "requestform",
        "indexName": "Address Proof",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form"
      },
      {
        "name": "addressProof",
        "label": "Upload Address Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable Address Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
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
        "hide": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission",
        "required": true,
        "validationmsg": "Enter Reason for Delayed Submission"
      }
    ],
    "BOE_Comments": [
      {
        "name": "BOEComments",
        "label": "BOE  Comments",
        "inputType": "textarea",
        "disabled": true,
        "maxlength": 500,
        "required": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "POS Comments",
        "inputType": "textarea",
        "disabled": true,
        "maxlength": 500,
        "required": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "Commentss",
        "label": "Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "landmarkaddition": {
    "Change_Fields": [
      {
        "name": "custRole",
        "label": "Address Details to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Select"
      },
      {
        "name": "requestFor",
        "label": "Request For",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request For",
        "placeholder": "Select a RequestFor"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Select a Request Mode"
      }
    ],
    "BOE_Details": [
      {
        "name": "New_LandMark",
        "label": "Add LandMark",
        "inputType": "text",
        "isLandMark": true,
        "required": true,
        "maxlength": 30,
        "validationmsg": "Enter Add LandMark",
        "placeholder": "Add LandMark"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Address Details to be Updated For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Address Details",
        "placeholder": "Select"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Request ID No"
      },
      {
        "name": "existingdetails",
        "label": "Current Address",
        "inputType": "title"
      },
      {
        "name": "existingAddress",
        "label": "",
        "inputType": "textbox",
        "required": false,
        "validationmsg": "Current Address Missing",
        "placeholder": "Current Address"
      },
      {
        "name": "existingdetails",
        "label": "New Address",
        "inputType": "title"
      },
      {
        "name": "newlin1",
        "label": "Line1",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "validationmsg": "Enter Line1",
        "placeholder": "Line1"
      },
      {
        "name": "newlin2",
        "label": "Line2",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "validationmsg": "Enter Line2",
        "placeholder": "Line2"
      },
      {
        "name": "newlin3",
        "label": "Land Mark",
        "inputType": "text",
        "required": true,
        "pattern": "addressline",
        "validationmsg": "Enter Land Mark",
        "placeholder": "Land Mark"
      },
      {
        "name": "newpincode",
        "label": "Pin Code",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Pin Code",
        "placeholder": "Pin Code"
      },
      {
        "name": "newcity",
        "label": "City",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter City",
        "placeholder": "City"
      },
      {
        "name": "newstate",
        "label": "State",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter State",
        "placeholder": "State"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": 1,
        "secondRadioValue": 2,
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "requestmode",
        "label": "",
        "inputType": "textarea",
        "maxlength": 500,
        "required": true,
        "validationmsg": "",
        "placeholder": "Comment Box"
      }
    ],
    "Buttons": [
      {
        "label": "Aadhar Check"
      },
      {
        "label": "Send OTP"
      }
    ],
    "Request_Details": [
      {
        "name": "reasonforchange",
        "label": "Reason For Change / Update",
        "inputType": "text",
        "required": true,
        "validationmsg": "Select Reason For Change",
        "placeholder": "Reason for change/update"
      },
      {
        "name": "requestsource",
        "label": "Request Source",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Source",
        "placeholder": "Request Source"
      },
      {
        "name": "requestdate",
        "label": "Request Date & Time",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select Request Date",
        "placeholder": ""
      },
      {
        "name": "customersigning",
        "label": "Customer Signing Date & Time",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select Customer Signing Date ",
        "placeholder": ""
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "validationmsg": "Select Reason For Delay",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "requestmode",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Checklist": [
      {
        "name": "requestform",
        "indexName": "Bank Details Updation",
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
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Reason For Submission",
        "placeholder": "Reason for Delayed Submission"
      }
    ]
  },
  "existingcontactdetails": {
    "BOE_Details": [
      {
        "name": "MobileNumber",
        "label": "Mobile Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Mobile Number",
        "placeholder": "Mobile Number"
      },
      {
        "name": "AlternateNumber",
        "label": "Alternate Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Alternate Number",
        "placeholder": "Alternate Number"
      },
      {
        "name": "WorkNumber",
        "label": "Work Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Work Number",
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "placeholder": "Work Number"
      },
      {
        "name": "EmailID",
        "label": "Email ID",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Email ID",
        "placeholder": "Email ID"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "Address",
        "label": "Address",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Address",
        "placeholder": "Address"
      }
    ]
  },
  "bankdetailsupdation": {
    "BOE_Details": [
      {
        "name": "assistFor",
        "label": "Assist For",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Assist For",
        "title": "Query",
        "secondTitle": "Request",
        "radioValue": "query",
        "secondRadioValue": "request"
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
        "name": "custRole",
        "label": "Bank Details For ?",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Bank Details For",
        "placeholder": "Select"
      }
    ],
    "Existing_Bank_Details": [
      {
        "name": "existBankDetails",
        "label": "Existing Bank Details",
        "inputType": "title"
      },
      {
        "name": "Bank_IFSC_Old",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "IFSC"
      },
      {
        "name": "Bank_Name_Old",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "Acc_Type_Old",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Account Type"
      },
      {
        "name": "Acc_HldrName_Old",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "Acc_Number_Old",
        "label": "Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Account Number"
      }
    ],
    "Query_Bank_Fields": [
      {
        "name": "sendBankUpdateProcess",
        "label": "Send Bank Update Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Previously Retained Count"
      }
    ],
    "Bank_Details": [],
    "New_Bank_Details": [
      {
        "name": "newBankDetails",
        "label": "Update New Bank Details",
        "inputType": "title"
      },
      {
        "name": "Bank_IFSC_New",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC"
      },
      {
        "name": "Bank_Name_New",
        "label": "Bank Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "Branch_Name_New",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "Acc_Type_New",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "Acc_HldrName_New",
        "label": "Account Holder Name",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "disabled": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "Acc_Number_New",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "reenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "chequeCopy",
        "label": "Uplaod Cheque Copy",
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Uplaod Cheque Copy",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "customerchoice",
        "label": "Customer Choice",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select customer Choice",
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
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Bank Details Updation"
      }
    ],
    "Authorization_Letter": [
      {
        "name": "authorizationLetter",
        "label": "Upload Authorization Letter",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Authorization Letter",
        "placeholder": "Upload Authorization Letter",
        "indexName": "Bank Details Updation"
      }
    ],
    "Date_Fields": [
      {
        "name": "Req_Via",
        "label": "Request Received Via",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Received Via",
        "placeholder": "Request Received Via"
      },
      {
        "name": "requestform",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Bank Details Updation"
      },
      {
        "name": "customerSigningDate",
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
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delay",
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
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "ThirdParty_Fields": [
      {
        "name": "Req_Via",
        "label": "Request Received Via",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Received Via",
        "placeholder": "Request Received Via"
      },
      {
        "name": "requestform",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Bank Details Updation"
      },
      {
        "name": "authorizationLetter",
        "label": "Upload Authorization Letter",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Authorization Letter",
        "placeholder": "Upload Authorization Letter",
        "indexName": "Bank Details Updation"
      },
      {
        "name": "addressProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of valid proof to display",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "customerSigningDate",
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
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delay",
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
      },
      {
        "name": "Comments",
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
        "name": "custRole",
        "label": "Bank Details Update For ?",
        "disabled": true,
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select",
        "placeholder": "Select"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "disabled": true,
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "srvReqID",
        "label": "Request ID No",
        "disabled": true,
        "inputType": "text",
        "placeholder": "Request ID No"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request By"
      },
      {
        "name": "Req_Via",
        "label": "Request Received Via",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Received Via",
        "placeholder": "Request Received Via"
      },
      {
        "name": "existBankDetails",
        "label": "View New Bank Details",
        "inputType": "title"
      },
      {
        "name": "Bank_IFSC_New",
        "label": "IFSC",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "IFSC"
      },
      {
        "name": "Bank_Name_New",
        "label": "Bank Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "Branch_Name_New",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "Acc_Type_New",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Account Type"
      },
      {
        "name": "Acc_HldrName_New",
        "label": "Account Holder Name",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "Acc_Number_New",
        "label": "Account Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Account Number"
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Penny Drop Result",
        "placeholder": "Penny Drop Result"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "dedupeCheck",
        "label": "Dedupe Match Details",
        "inputType": "textlink",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "disabled": true,
        "validationmsg": "Comments",
        "placeholder": "Requester Comments"
      },
      {
        "name": "AreDetailsCorrect",
        "label": "Are Bank Details Correct",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select a Are Details Correct",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "POSBank_IFSC_New",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false,
        "hide": true
      },
      {
        "name": "POSBank_Name_New",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true,
        "hide": true
      },
      {
        "name": "POSBranch_Name_New",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name",
        "hide": true
      },
      {
        "name": "POSAcc_Type_New",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false,
        "hide": true
      },
      {
        "name": "POSAcc_HldrName_New",
        "label": "Account Holder Name",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": true,
        "hide": true
      },
      {
        "name": "POSAcc_Number_New",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number",
        "hide": true
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number",
        "hide": true
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop",
        "hide": true
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop",
        "hide": true
      },
      {
        "name": "POSNameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "hide": true
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "hide": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "hide": false,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": true,
        "hide": true,
        "required": false,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
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
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "sharestatementlink": {
    "BOE_Details": [
      {
        "name": "shareprocess",
        "label": "Share Statement / Link",
        "inputType": "titlecheckbox",
        "loan": true,
        "required": true,
        "validationmsg": ""
      }
    ],
    "Share_Process_Details": [
      {
        "name": "SENTLOANREPAYMENTLINK",
        "label": "Send Loan Repayment Link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      },
      {
        "name": "LOANSTATEMENT",
        "label": "Send Loan Statement",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Share_Loan_Process_Details": [
      {
        "name": "SENDLOANPROCESS",
        "label": "Send Loan Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": ""
      }
    ]
  },
  "eligibleloandetailsenquiry": {
    "Eligible_Loan_Details": [
      {
        "name": "LoanApplicable",
        "label": "Loan Applicable",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Applicable",
        "placeholder": "Loan Applicable"
      },
      {
        "name": "LoanPercent",
        "label": "Loan %",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "hide": true,
        "validationmsg": "Enter Loan %",
        "placeholder": "Loan %"
      },
      {
        "name": "MaxLoanvalue",
        "label": "Max Loan value",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Max Loan value",
        "placeholder": "Max Loan value"
      },
      {
        "name": "LoanValueDate",
        "label": "Loan Value Date",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Value Date",
        "placeholder": "Loan Value Date"
      },
      {
        "name": "NoOfTimesLoanTakenInThePolicy",
        "label": "No of times loan taken in the policy",
        "hide": true,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Taken",
        "placeholder": "No of times loan taken in the policy"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Share_Loan_Process_Details": [
      {
        "name": "SENDLOANPROCESS",
        "label": "Send Loan Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": ""
      }
    ]
  },
  "existingloandetailsenquiry": {
    "Existing_Loan_Details": [
      {
        "name": "LoanDisbursed",
        "label": "Loan Disbursed on",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Disbursed on",
        "placeholder": "Loan Disbursed on"
      },
      {
        "name": "LoanInterest",
        "label": "Loan Interest %",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Interest %",
        "placeholder": "Loan Interest %"
      },
      {
        "name": "OriginalLoanAmount",
        "label": "Original Loan Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Original Loan Amount",
        "placeholder": "Original Loan Amount"
      },
      {
        "name": "OutstandingPrincipalAmount",
        "label": "Outstanding Principal Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Outstanding Principal Amount",
        "placeholder": "Outstanding Principal Amount"
      },
      {
        "name": "TotalLoanInterest",
        "label": "Total Loan Interest",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Total Loan Interest",
        "placeholder": "Total Loan Interest"
      },
      {
        "name": "TotalLoanAmountRepaid",
        "label": "Total Loan Amount Repaid",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Total Loan Amount Repaid",
        "placeholder": "Total Loan Amount Repaid"
      },
      {
        "name": "LoanOutstanding",
        "label": "Loan Outstanding",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Outstanding",
        "placeholder": "Loan Outstanding"
      },
      {
        "name": "LastLoanRepaidDate",
        "label": "Last Loan Repaid Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Last Loan Repaid Date",
        "placeholder": "Last Loan Repaid Date"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ]
  },
  "loanrequest": {
    "BOE_Details": [
      {
        "name": "MaxLoanEligible",
        "label": "Max Loan Eligible",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Enter Max Loan Eligible",
        "placeholder": "Max Loan Eligible"
      },
      {
        "name": "LoanValueRequested",
        "label": "Loan Value requested",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Loan Value requested",
        "placeholder": "Loan Value requested"
      },
      {
        "name": "NoOfTimesLoanTakenInThePolicy",
        "label": "No of times loan taken in the policy",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter No of Tokens",
        "placeholder": "No of times loan taken in the policy"
      },
      {
        "name": "PANNumber",
        "label": "PAN",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "validationmsg": "PAN Number",
        "placeholder": "PAN Number"
      },
      {
        "name": "PANResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PANResult"
      },
      {
        "name": "NameinPAN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PAN Name"
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
        "name": "FundTransfer",
        "label": "Do You Wish to opt for Fund Transfer",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Do You Wish to opt for Fund Transfer",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ReasonForFundTransfer",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Reason For Fund Transfer",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Reason For Fund Transfer"
      },
      {
        "name": "FundTransferTo",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Fund Transfer To",
        "inputType": "number",
        "pattern": "numbersOnly",
        "maxlength": 8,
        "minlength": 8,
        "required": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "d_FundTransfer": true,
        "hide": true,
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "label": "Fund Transfer Amount",
        "required": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationToFTPolicy",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Relation To FT Policy",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Relation To FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Name of Fund Transfer Policy Owner"
      },
      {
        "name": "BalanceAmountForLoan",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Balance Amount For Loan",
        "disabled": true,
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Balance Amount For Loan"
      },
      {
        "name": "viewRequestDetails",
        "label": "Enter Bank Details for Loan Request",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "validationmsg": "",
        "maxlength": 11,
        "minlength": 11,
        "placeholder": "Bank IFSC"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "BankAccountProof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Bank Account Proof",
        "indexName": "Loan Request"
      }
    ],
    "View_Documents_title": [
      {
        "name": "uploadDocuments",
        "label": "Upload Documents For Loan Request",
        "inputType": "accordian"
      }
    ],
    "View_Documents": [
      {
        "name": "surrenderForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Request Form",
        "indexName": "Loan Request"
      },
      {
        "name": "policyBond",
        "label": "Upload Policy Bond",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Policy Bond/Indemnity",
        "indexName": "Loan Request"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "addressProof",
        "label": "Upload Address Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable Address Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "uploadPAN",
        "label": "Upload PAN Card",
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload PAN Card",
        "indexName": "Loan Request"
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
        "hide": false,
        "required": true,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Reason For Delayed Submission "
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
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "View_Bank_Details": [
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "validationmsg": "",
        "maxlength": 11,
        "minlength": 11,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameOnAccount",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "BankAccountProof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Bank Account Proof",
        "indexName": "Loan Request"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delayed Submission"
      }
    ],
    "POS_Details": [
      {
        "name": "MaxLoanEligible",
        "label": "Max Loan Eligible",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Max Loan Eligible",
        "placeholder": "Max Loan Eligible"
      },
      {
        "name": "LoanValueRequested",
        "label": "Loan Value requested",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Value requested",
        "placeholder": "Loan Value requested"
      },
      {
        "name": "NoOfTimesLoanTakenInThePolicy",
        "label": "No of times loan taken in the policy",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Loan Taken",
        "placeholder": "No of times loan taken in the policy"
      },
      {
        "name": "PANNumber",
        "label": "PAN",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "validationmsg": "PAN Number",
        "placeholder": "PAN Number"
      },
      {
        "name": "PANResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PANResult"
      },
      {
        "name": "NameinPAN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PAN Name"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": " Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "FundTransfer",
        "label": "Request For Fund Transfer",
        "inputType": "radio",
        "class": "disabled",
        "required": false,
        "validationmsg": "Do You Wish to opt for Fund Transfer",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "disabled": true,
        "hide": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delay"
      },
      {
        "name": "validatesignature",
        "label": "Validated Signature",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Signature Validated",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "text",
        "disabled": true,
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      },
      {
        "name": "ReasonForFundTransfer",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Reason For Fund Transfer",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Reason For Fund Transfer"
      },
      {
        "name": "FundTransferTo",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationToFTPolicy",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Relation To FT Policy",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Relation To FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Name of Fund Transfer Policy Owner"
      },
      {
        "name": "BalanceAmountForLoan",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Balance Amount For Loan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Balance Amount For Loan"
      },
      {
        "name": "viewRequestDetails",
        "label": "Bank Deails For Loan Request",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "ifsccodenumber",
        "required": false,
        "validationmsg": "",
        "maxlength": 11,
        "minlength": 11,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameAsperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "class": "disabled",
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "View_POS_Action_title": [
      {
        "name": "viewPOS",
        "label": "POS Action",
        "inputType": "accordian"
      }
    ],
    "POS_Action": [
      {
        "name": "paymentMode",
        "label": "Payment Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Payment Mode"
      },
      {
        "name": "ChangeInLast60Days",
        "label": "Any personal details change in last 60 days",
        "disabled": true,
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Any personal details change in last 60 days"
      },
      {
        "name": "PolicyLoggedLast",
        "label": "If any policy logged in the last 6 months",
        "disabled": true,
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "If any policy logged in the last 6 months"
      },
      {
        "name": "ViewFinalPayableAmount",
        "label": "View Final Payable Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "View Final Payable Amount"
      },
      {
        "name": "InitiatePennyDropPOS2",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsperPennyDropPOS2",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatchPOS",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "BankAccountDeDupe",
        "label": "Bank account de-dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "SignatureChange",
        "label": "Signature Change",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
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
    ],
    "POS_Manger_Details": [
      {
        "name": "MaxLoanEligible",
        "label": "Max Loan Eligible",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Max Loan Eligible",
        "placeholder": "Max Loan Eligible"
      },
      {
        "name": "LoanValueRequested",
        "label": "Loan Value requested",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Loan Value requested",
        "placeholder": "Loan Value requested"
      },
      {
        "name": "NoOfTimesLoanTakenInThePolicy",
        "label": "No of times loan taken in the policy",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Loan Taken",
        "placeholder": "No of times loan taken in the policy"
      },
      {
        "name": "PANNumber",
        "label": "PAN",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "validationmsg": "PAN Number",
        "placeholder": "PAN Number"
      },
      {
        "name": "PANResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PANResult"
      },
      {
        "name": "NameinPAN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PAN Name"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": " Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Select Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "disabled": true,
        "hide": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delay"
      },
      {
        "name": "validatesignature",
        "label": "Validated Signature",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Signature Validated",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "text",
        "disabled": true,
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      },
      {
        "name": "ReasonForFundTransfer",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Reason For Fund Transfer",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Reason For Fund Transfer"
      },
      {
        "name": "FundTransferTo",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationToFTPolicy",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Relation To FT Policy",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Relation To FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Name of Fund Transfer Policy Owner"
      },
      {
        "name": "BalanceAmountForLoan",
        "d_FundTransfer": true,
        "hide": true,
        "label": "Balance Amount For Loan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Balance Amount For Loan"
      },
      {
        "name": "viewRequestDetails",
        "label": "Bank Details For Loan Payout",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": false,
        "validationmsg": "",
        "maxlength": 11,
        "minlength": 11,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameAsperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "class": "disabled",
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "POS_Manger_POS_Action_title": [
      {
        "name": "viewPOS",
        "label": "POS Manager Action",
        "inputType": "accordian"
      }
    ],
    "POS_Manger_Action": [
      {
        "name": "BankAccountDeDupe",
        "label": "Bank Account De-Dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Check",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "SignatureChange",
        "label": "Signature Change",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "POSManagerRemarks",
        "label": "POS Manager Remarks",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "loanrepayment": {
    "BOE_Details": [
      {
        "name": "LoanRepaymentDetails",
        "label": "Loan Repayment Details",
        "inputType": "title"
      },
      {
        "name": "ReceiptedBy",
        "label": "Receipted By",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "disabled": false,
        "validationmsg": "Receipted By",
        "placeholder": "Receipted By"
      },
      {
        "name": "ReceiptedBranch",
        "label": "Receipted Branch",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "disabled": false,
        "validationmsg": "Receipted Branch",
        "placeholder": "Receipted Branch"
      },
      {
        "name": "RepaymentAmount",
        "label": "Repayment Amount",
        "inputType": "text",
        "pattern": "numbersOnly",
        "required": true,
        "disabled": false,
        "validationmsg": "Repayment Amount",
        "placeholder": "Repayment Amount"
      },
      {
        "name": "DateOfRepayment",
        "label": "Date of Repayment",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Date of Repayment",
        "placeholder": "Date of Repayment"
      },
      {
        "name": "ModeOfRepayment",
        "label": "Mode of Repayment",
        "inputType": "dropdown",
        "required": true,
        "disabled": false,
        "validationmsg": "Mode of Repayment",
        "placeholder": "Mode of Repayment"
      },
      {
        "name": "SplitPaymentDetails",
        "label": "Enter Split Payment Details",
        "inputType": "text",
        "pattern": "AlphaNumeric",
        "required": true,
        "validationmsg": "Enter Split Payment Details",
        "hide": true,
        "placeholder": "Enter Split Payment Details"
      },
      {
        "name": "UTRChequeNumber",
        "label": "Enter UTR/Cheque Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "hide": false,
        "placeholder": "UTR/Cheque Number"
      },
      {
        "name": "ReceiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "pattern": "AlphaNumeric",
        "required": true,
        "disabled": false,
        "validationmsg": "Receipt Number",
        "placeholder": "Receipt Number"
      },
      {
        "name": "RepaymentType",
        "label": "Repayment Type",
        "inputType": "dropdown",
        "required": true,
        "disabled": false,
        "validationmsg": "Repayment Type",
        "placeholder": "Repayment Type"
      },
      {
        "name": "outstandingLoan",
        "label": "Outstanding Loan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request Form",
        "placeholder": "Outstanding Loan"
      },
      {
        "name": "UploadDocuments",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Request Form",
        "hide": false,
        "placeholder": "Upload Request Form",
        "icon": "upload"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Cheque Copy",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Cheque Copy",
        "hide": false,
        "placeholder": "Upload Cheque Copy",
        "icon": "upload"
      },
      {
        "name": "UploadReceiptCopy",
        "label": "Upload Loan Repayment Receipt Copy",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Receipt Copy",
        "placeholder": "Upload Receipt Copy",
        "icon": "upload"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date & Time",
        "placeholder": ""
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Request Received Date"
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
        "name": "comment",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "POS_Details": [
      {
        "name": "LoanRepaymentDetails",
        "label": "Loan Repayment Details",
        "inputType": "title"
      },
      {
        "name": "ReceiptedBy",
        "label": "Receipted By",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "disabled": true,
        "validationmsg": "Receipted By",
        "placeholder": "Receipted By"
      },
      {
        "name": "ReceiptedBranch",
        "label": "Receipted Branch",
        "inputType": "text",
        "pattern": "alphabatesOnly",
        "required": true,
        "disabled": true,
        "validationmsg": "Receipted Branch",
        "placeholder": "Receipted Branch"
      },
      {
        "name": "RepaymentAmount",
        "label": "Repayment Amount",
        "inputType": "text",
        "pattern": "numbersOnly",
        "required": true,
        "disabled": true,
        "validationmsg": "Repayment Amount",
        "placeholder": "Repayment Amount"
      },
      {
        "name": "DateOfRepayment",
        "label": "Date of Repayment",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Date of Repayment",
        "placeholder": "Date of Repayment"
      },
      {
        "name": "ModeOfRepayment",
        "label": "Mode of Repayment",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "validationmsg": "Mode of Repayment",
        "placeholder": "Mode of Repayment"
      },
      {
        "name": "UTRChequeNumber",
        "label": "Enter UTR/Cheque Number",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "",
        "hide": false,
        "placeholder": "UTR/Cheque Number"
      },
      {
        "name": "ReceiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "pattern": "AlphaNumeric",
        "required": true,
        "disabled": true,
        "validationmsg": "Receipt Number",
        "placeholder": "Receipt Number"
      },
      {
        "name": "RepaymentType",
        "label": "Repayment Type",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "validationmsg": "Repayment Type",
        "placeholder": "Repayment Type"
      },
      {
        "name": "outstandingLoan",
        "label": "Outstanding Loan",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request Form",
        "placeholder": "Outstanding Loan"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Customer Signing Date & Time",
        "placeholder": ""
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "comment",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      },
      {
        "name": "POSAction",
        "label": "POS Action",
        "inputType": "title"
      },
      {
        "name": "CompleteRepayment",
        "label": "Complete Repayment Done",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Complete Repayment Done",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "PolicyBondwithFGI",
        "label": "Policy Bond with GCI",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Policy Bond with GCI",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ReAssignmentDone",
        "label": "Re-Assignment Done",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Re-Assignment Done",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "statusenquiry": {
    "BOE_Details": [
      {
        "name": "SourceofQuery",
        "label": "Source of Query",
        "inputType": "text",
        "required": true,
        "validationmsg": "Source of Query",
        "placeholder": "Source of Query"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "Comments",
        "label": "Comment Box",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "surrenderquery": {
    "BOE_Details": [
      {
        "name": "TotalSurrenderValue",
        "label": "Total Fund / Surrender Value",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Total Surrender Value"
      },
      {
        "name": "assistFor",
        "label": "Assist For",
        "inputType": "radios",
        "required": false,
        "validationmsg": "Select Assist For ",
        "options": [
          {
            "label": "Retention",
            "value": "retention"
          },
          {
            "label": "Request",
            "value": "request"
          }
        ]
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Query_Fields": [
      {
        "name": "IssueDate",
        "label": "Policy can be Surrendered After",
        "inputType": "date",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy can be Surrendered After"
      }
    ],
    "Query_Process": [
      {
        "name": "generateFundStatement",
        "hide": false,
        "label": "Generate Fund Statement",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Previously Retained Count"
      },
      {
        "name": "sendRequestForm",
        "label": "Surrender Value Letter",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Loan Available"
      }
    ]
  },
  "surrenderretention": {
    "BOE_Details": [
      {
        "name": "TotalSurrenderValue",
        "label": "Total Fund / Surrender Value",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Total Surrender Value"
      },
      {
        "name": "assistFor",
        "label": "Assist For",
        "inputType": "radios",
        "required": true,
        "validationmsg": "",
        "options": [
          {
            "label": "Retention",
            "value": "retention"
          },
          {
            "label": "Request",
            "value": "request"
          }
        ]
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Retention_Fields": [
      {
        "name": "validatesignature",
        "label": "",
        "inputType": "producticons"
      }
    ],
    "customerChoice": [
      {
        "name": "customerRetained",
        "label": "Is Customer Retained",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "CustomerRetained": [
      {
        "name": "customerRetained",
        "label": "Is Customer Retained",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "surrenderLetter",
        "label": "Upload Retention Letter",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Retention Letter",
        "indexName": "Surrender Form"
      },
      {
        "name": "comment",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "RetainedFields": []
  },
  "RevivalWithDGH": {},
  "surrenderrequest": {
    "BOE_Details": [
      {
        "name": "TotalSurrenderValue",
        "label": "Total Fund / Surrender Value",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Total Surrender Value"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "EarlySurrenderFlag",
        "label": "IsEarly Surrender",
        "inputType": "radio",
        "disabled": true,
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "RequestTime",
        "hide": false,
        "label": "Request Time",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Time",
        "placeholder": "Request Time"
      },
      {
        "name": "FundTransfer",
        "label": "Do you Wish to opt for Fund Transfer",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Fund Transfer",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "FundTransferAmount": true,
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter FundTransfer Amount",
        "placeholder": "Fund Transfer Amount",
        "hide": true
      },
      {
        "name": "surrenderreason",
        "label": "Surrender Reason",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Surrender Reason",
        "placeholder": "Surrender Reason",
        "options": [
          {
            "label": "Financial problem",
            "value": "FINP"
          },
          {
            "label": "Investment in new policy",
            "value": "IINP"
          },
          {
            "label": "Medical reason",
            "value": "MEDR"
          },
          {
            "label": "Personal Reason",
            "value": "PERS"
          },
          {
            "label": "Not satisfied with Fund Value",
            "value": "REASONCD"
          },
          {
            "label": "Service Issue",
            "value": "SEIS"
          }
        ]
      }
    ],
    "Request_Fields": [
      {
        "name": "FundTransfer",
        "label": "Do you Wish to opt for Fund Transfer",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Fund Transfer",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "FundTransfer_Fields": [
      {
        "name": "RequestTime",
        "hide": false,
        "label": "Request Time",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Request Time"
      },
      {
        "name": "ReasonForSurrender",
        "label": "Reason For Surrender",
        "d_FundTransfer": true,
        "required": true,
        "inputType": "dropdown",
        "placeholder": "Reason for Surrender"
      },
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "d_FundTransfer": true,
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "d_FundTransfer": true,
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationsToFTPolicy",
        "label": "Relations to FT Policy",
        "d_FundTransfer": true,
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "NameOfFundTransferPolicyOwner",
        "label": "Name of Fund Transfer Policy Owner",
        "d_FundTransfer": true,
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Name of Fund Transfer Policy Owner"
      },
      {
        "name": "BalanceAmountForSurrender",
        "label": "Balance Amount for Surrender",
        "d_FundTransfer": true,
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Balance Amount for Surrender"
      },
      {
        "name": "Enter Bank Details For Surrender",
        "label": "Enter Bank Details For Surrender",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
        "pattern": "charactersOnly"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadBankAccountProof",
        "indexName": "Upload Bank Account Proof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Proof"
      },
      {
        "name": "Upload Documents For Surrender Request",
        "label": "Upload Documents For Surrender Request",
        "inputType": "title"
      },
      {
        "name": "surrenderForm",
        "indexName": "Surrender ",
        "label": "Upload Surrender Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Surrender Form"
      },
      {
        "name": "policyBond",
        "indexName": "Surrender ",
        "label": "Upload Policy Bond",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Bond/Indemnity"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "addressProof",
        "label": "Upload Address Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable Address Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "CustSignDateTime",
        "label": "Customer Signing Date",
        "required": true,
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "required": true,
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
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
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "BOE_Bank_Details_Fields": [
      {
        "name": "Enter Bank Details For Surrender",
        "label": "Enter Bank Details For Surrender",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
        "pattern": "charactersOnly"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "PennyDropReason",
        "label": "Penny Drop Reason",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Reason"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadBankAccountProof",
        "indexName": "Upload Bank Account Proof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Submit Bank Account Proof",
        "placeholder": "Bank Account Proof"
      },
      {
        "name": "Upload Documents For Surrender Request",
        "label": "Upload Documents For Surrender Request",
        "inputType": "title"
      },
      {
        "name": "surrenderForm",
        "indexName": "Surrender ",
        "label": "Upload Surrender Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Surrender Form"
      },
      {
        "name": "policyBond",
        "indexName": "Surrender ",
        "label": "Upload Policy Bond",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Bond/Indemnity"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "addressProof",
        "label": "Upload Address Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable Address Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "CustSignDateTime",
        "label": "Customer Signing Date",
        "required": true,
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "required": true,
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "required": true,
        "inputType": "text",
        "placeholder": "",
        "hide": true,
        "d_BranchReceivedDate": true
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
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "Bank_Fields": [
      {
        "name": "ReasonForSurrender",
        "label": "Reason For Surrender",
        "inputType": "dropdown",
        "placeholder": "Reason for Surrender"
      },
      {
        "name": "surrenderForm",
        "indexName": "Surrender ",
        "label": "Upload Surrender Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Surrender Form"
      },
      {
        "name": "policyBond",
        "indexName": "Surrender ",
        "label": "Upload Policy Bond",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Bond/Indemnity"
      },
      {
        "name": "policyOwnerIDProof",
        "indexName": "Surrender ",
        "label": "Upload Policy Owner ID Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Owner ID Proof"
      },
      {
        "name": "policyOwnerAccProof",
        "indexName": "Surrender ",
        "label": "Upload Policy Owner bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Owner bank Account Proof"
      },
      {
        "name": "CustSignDateTime",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "placeholder": "Select a date"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Name as Mentioned in The Bank A/C",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Name as Mentioned in The Bank A/C"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "required": true,
        "validationmsg": "",
        "pattern": "numbersOnly",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Confirm Bank Account Number",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "required": true,
        "inputType": "text",
        "placeholder": ""
      }
    ],
    "RetainedFields": [
      {
        "name": "sendSurrenderProcess",
        "label": "Send Surrender Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Previously Retained Count"
      },
      {
        "name": "generateFundStatement",
        "label": "Generate Fund Statement",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Previously Retained Count"
      },
      {
        "name": "sendRequestForm",
        "label": "Surrender Value Letter",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Loan Available"
      }
    ],
    "POS_Details": [
      {
        "name": "TotalSurrenderValue",
        "label": "Total Fund / Surrender Value",
        "disabled": true,
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Surrender Value"
      },
      {
        "name": "RequestFor",
        "label": "Request For",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Request For"
      },
      {
        "name": "EarlySurrenderFlag",
        "label": "IsEarly Surrender",
        "inputType": "radio",
        "disabled": true,
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "surrenderreason",
        "label": "Surrender Reason",
        "inputType": "dropdown",
        "disabled": true,
        "required": true,
        "validationmsg": "Select Surrender Reason",
        "placeholder": "Surrender Reason"
      },
      {
        "name": "FundTransfer",
        "label": "Do you Wish to opt for Fund Transfer",
        "inputType": "radio",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Fund Transfer",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "d_FundTransfer": true,
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "CustSignDateTime",
        "label": "Customer Signing Date",
        "disabled": true,
        "required": false,
        "inputType": "text",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "disabled": true,
        "required": false,
        "inputType": "text",
        "placeholder": "Select a date"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "RequestTime",
        "hide": false,
        "label": "Request Time",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Request Time"
      },
      {
        "name": "BranchRemarks",
        "label": "Branch Remarks",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Remarks"
      },
      {
        "name": "viewRequestDetails",
        "label": "Bank Details For Surrender",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "ifsccodenumber",
        "minlength": 11,
        "maxlength": 11,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": true,
        "required": true,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "viewRequestDetails",
        "label": "Request Details",
        "inputType": "title",
        "d_FundTransfer": true,
        "hide": true
      },
      {
        "name": "BalanceAmountForSurrender",
        "label": "Balance Amount for Surrender",
        "d_FundTransfer": true,
        "hide": true,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Balance Amount for Surrender"
      }
    ],
    "View_POS_Action_title": [
      {
        "name": "viewPOS",
        "label": "POS Action",
        "inputType": "accordian"
      }
    ],
    "POS_Action": [
      {
        "name": "paymentMode",
        "label": "Payment Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Payment Mode"
      },
      {
        "name": "ChangeInLast60Days",
        "label": "Any personal details change in last 60 days",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Any personal details change in last 60 days"
      },
      {
        "name": "ViewFinalPayableAmount",
        "label": "View Final Payable Amount",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "View Final Payable Amount"
      },
      {
        "name": "InitiatePennyDropPOS",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsPerPennyDropPOS",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NameMatchPOS",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "BankAccountDeDupe",
        "label": "Bank account de-dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "negavativeListVerification",
        "label": "Is Banned Entity Verfied?",
        "inputType": "radio",
        "hide": true,
        "required": true,
        "validationmsg": "Select Yes/No",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "isBlacklistedPolicy",
        "label": "Blacklisted Policy",
        "inputType": "radio",
        "hide": false,
        "required": true,
        "validationmsg": "Select Yes/No",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "SignatureChange",
        "label": "Signature Change",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_Manager_Details": [
      {
        "name": "TotalSurrenderValue",
        "label": "Total Fund / Surrender Value",
        "disabled": true,
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Total Surrender Value"
      },
      {
        "name": "RequestFor",
        "label": "Request For",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Request For"
      },
      {
        "name": "RequestTime",
        "hide": false,
        "label": "Request Time",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Request Time"
      },
      {
        "name": "CustSignDateTime",
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
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delay",
        "disabled": true,
        "inputType": "text",
        "hide": false,
        "placeholder": "Reason for delay"
      },
      {
        "name": "BranchRemarks",
        "label": "Branch Remarks",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Remarks"
      },
      {
        "name": "viewRequestDetails",
        "label": "Bank Details For Surrender",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "minlength": 11,
        "maxlength": 11,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "viewRequestDetails",
        "label": "Request Details",
        "inputType": "title",
        "d_FundTransfer": true,
        "hide": true
      },
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "inputType": "text",
        "d_FundTransfer": true,
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "d_FundTransfer": true,
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationsToFTPolicy",
        "label": "Relations to FT Policy",
        "inputType": "text",
        "d_FundTransfer": true,
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "NameOfFundTransferPolicyOwner",
        "label": "Name of FT Policy Owner",
        "d_FundTransfer": true,
        "hide": true,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Name of Fund Transfer Policy Owner"
      },
      {
        "name": "BalanceAmountForSurrender",
        "label": "Balance Amount for Surrender",
        "d_FundTransfer": true,
        "hide": true,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Balance Amount for Surrender"
      }
    ],
    "View_POS_Manager_Action_title": [
      {
        "name": "viewPOS",
        "label": "POS Manager Action",
        "inputType": "accordian"
      }
    ],
    "POS_Manager_Action": [
      {
        "name": "paymentMode",
        "label": "Payment Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Payment Mode"
      },
      {
        "name": "ChangeInLast60Days",
        "label": "Any personal details change in last 60 days",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Any personal details change in last 60 days"
      },
      {
        "name": "PolicyLoggedLast",
        "label": "If any policy logged in the last 6 months",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "If any policy logged in the last 6 months"
      },
      {
        "name": "ViewFinalPayableAmount",
        "label": "View Final Payable Amount",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "View Final Payable Amount"
      },
      {
        "name": "BankAccountDeDupe",
        "label": "Bank account de-dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "SignatureChange",
        "label": "Signature Change",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Add_CC": [
      {
        "name": "payableAmount",
        "label": "",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Email to Compliance"
      },
      {
        "name": "sendEmail",
        "label": "",
        "inputType": "text",
        "hyperLinks": "Send",
        "required": false,
        "validationmsg": "",
        "placeholder": "Enter CC Email"
      }
    ]
  },
  "rechecksurrenderpayout": {
    "BOE_Details": [
      {
        "name": "surrenderRequestDate",
        "label": "Surrender Request Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Surrender Request Date",
        "placeholder": "Select a date"
      },
      {
        "name": "SurrenderValueDate",
        "label": "Surrender Value Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Surrender Value Date",
        "placeholder": "Select a date"
      },
      {
        "name": "Surrenderpos",
        "label": "Request For",
        "disabled": true,
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Request For",
        "placeholder": "Request For"
      },
      {
        "name": "SurrenderValuePayable",
        "label": "Surrender Value Payable",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Surrender Value Payable"
      },
      {
        "name": "SurrenderValuePaid",
        "label": "Surrender Value Paid",
        "inputType": "link",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Surrender Value Paid"
      }
    ],
    "Fund_Transfer_Fields": [
      {
        "name": "FundTransfer",
        "label": "Fund Transfer",
        "inputType": "text",
        "required": false,
        "validationmsg": "Fund Transfer",
        "placeholder": "Fund Transfer"
      },
      {
        "name": "FundTransferPolicy",
        "label": "Fund transfer Policy / Application ",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Fund transfer Policy / Application "
      },
      {
        "name": "BalanceAmount",
        "label": "Balance Amount for Surrender",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Balance Amount for Surrender"
      }
    ],
    "Other_Fileds": [
      {
        "name": "PaymentDate",
        "label": "Payment Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Payment Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForReEvaluation",
        "label": "Reason for re-evaluation",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason for re-evaluation",
        "placeholder": "Reason for re-evaluation"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
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
        "name": "surrenderRequestDate",
        "label": "Surrender Request Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Surrender Request Date",
        "placeholder": "DD/MM/YYYY",
        "disabled": true
      },
      {
        "name": "SurrenderValueDate",
        "label": "Surrender Value Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Surrender Value Date",
        "placeholder": "Select a date",
        "disabled": true
      },
      {
        "name": "SurrenderValuePayable",
        "label": "Surrender Value Payable",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Surrender Value Payable",
        "disabled": true
      },
      {
        "name": "SurrenderValuePaid",
        "label": "Surrender Value Paid",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Surrender Value Paid",
        "disabled": true
      },
      {
        "name": "PaymentDate",
        "label": "Payment Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Payment Date",
        "placeholder": "DD/MM/YYYY",
        "disabled": true
      },
      {
        "name": "Surrenderpos",
        "label": "Reason For Surrender",
        "inputType": "text",
        "required": false,
        "validationmsg": "Select Reason For Surrender",
        "placeholder": "Reason For Surrender",
        "disabled": true
      },
      {
        "name": "decision",
        "label": "Decision",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Decision Required",
        "placeholder": "Decision"
      }
    ]
  },
  "changeinnominee": {
    "BOE_Details": [
      {
        "name": "NominationChangeAllowed",
        "label": "Nomination Change Allowed ",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Nomination Change Allowed ",
        "placeholder": "Select"
      }
    ],
    "Existing_Nominee_Details": [
      {
        "name": "ExistingNomineeDetails",
        "label": "View Existing Nominee Details",
        "inputType": "title"
      },
      {
        "name": "NomineeName",
        "label": "Nominee Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Nominee Name",
        "placeholder": "Nominee Name"
      },
      {
        "name": "NomineeDOB",
        "label": "Nominee DOB",
        "inputType": "text",
        "required": true,
        "validationmsg": "Nominee DOB",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "RelationshipwithLifeAssured",
        "label": "Relationship with Life Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Relationship with Life Assured",
        "placeholder": "Relationship with Life Assured"
      },
      {
        "name": "Share",
        "label": "% Share",
        "inputType": "text",
        "required": true,
        "validationmsg": "% Share",
        "placeholder": "% Share"
      },
      {
        "name": "AppointeeName",
        "label": "Appointee Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee Name",
        "placeholder": "Appointee Name"
      },
      {
        "name": "AppointeeName1",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name"
      },
      {
        "name": "AppointeeName2",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name"
      },
      {
        "name": "AppointeeDOB",
        "label": "Appointee DOB",
        "inputType": "text",
        "required": true,
        "validationmsg": "Appointee DOB",
        "placeholder": "Appointee DOB"
      },
      {
        "name": "RelationshipwithLifeAssured",
        "label": "Relationship with Life Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Relationship with Life Assured",
        "placeholder": "Relationship with Life Assured"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "New_Nominee_Details": [
      {
        "name": "NewNomineeDetails",
        "label": "Update New Nominee Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "NomineeName",
        "label": "Nominee Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Nominee Name",
        "placeholder": "Nominee Name"
      },
      {
        "name": "NomineeDOB",
        "label": "Nominee DOB",
        "inputType": "date",
        "required": true,
        "validationmsg": "Nominee DOB",
        "placeholder": "Nominee DOB"
      },
      {
        "name": "RelationshipwithLifeAssured",
        "label": "Relationship with Life Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Relationship with Life Assured",
        "placeholder": "Relationship with Life Assured"
      },
      {
        "name": "Share",
        "label": "% Share",
        "inputType": "text",
        "required": true,
        "validationmsg": "% Share",
        "placeholder": "% Share"
      },
      {
        "name": "AppointeeName",
        "label": "Appointee Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee Name",
        "placeholder": "Appointee Name"
      },
      {
        "name": "AppointeeName1",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name"
      },
      {
        "name": "AppointeeName2",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name"
      },
      {
        "name": "AppointeeDOB",
        "label": "Appointee DOB",
        "inputType": "text",
        "required": true,
        "validationmsg": "Appointee DOB",
        "placeholder": "Appointee DOB"
      },
      {
        "name": "RelationshipwithLifeAssured",
        "label": "Relationship with Life Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Relationship with Life Assured",
        "placeholder": "Relationship with Life Assured"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      }
    ],
    "POS_UpdateNomineeTitle": [
      {
        "name": "NewNomineeDetails",
        "label": "Update New Nominee Details",
        "inputType": "title",
        "icon": "edit"
      }
    ],
    "Share_Nominee_process": [
      {
        "name": "ShareNomineeChangeProcess",
        "label": "Share Nominee Change Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Share Nominee Change Process",
        "placeholder": "Send Via"
      }
    ],
    "Request_Details": [
      {
        "name": "NewOwnerClientID",
        "label": "Search By Client ID",
        "inputType": "suffix",
        "required": true,
        "disabled": true,
        "validationmsg": "Search By Client ID",
        "placeholder": "Search By Client ID"
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
        "name": "requestform",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Change or Correction in the Nominee"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date & Time",
        "placeholder": ""
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
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
        "required": false,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "Comments",
        "label": " Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "changeinappointee": {
    "Existing_Appointee_Details": [
      { 
        "name": "AppointeSalutation_Old",
        "label": "Appointee Salutation ",
        "inputType": "dropdown",
        "required": false,
        "disabled":true,
        "validationmsg": "Select a Salutation",
        "placeholder": "Salutation" 
      },
      {
        "name": "AppointeFirstName_Old",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name"
      },
      {
        "name": "AppointeLastName_Old",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name"
      },
      {
        "name": "AppointeDOB_Old",
        "label": "Appointee DOB",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Appointee DOB",
        "placeholder": "DD/MM/YYYY"
      }
    ],
    "New_Appointee_Details": [
      {
        "name": "NewOwnerClientID",
        "label": "Search By Client ID",
        "inputType": "suffix",
        "required": true,
        "disabled": true,
        "validationmsg": "Search By Client ID",
        "placeholder": "Search By Client ID"
      },
      { 
        "name": "AppointeSalutation_New",
        "label": "Appointee Salutation ",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select a Salutation",
        "placeholder": "Salutation" 
      },
      {
        "name": "AppointeFirstName_New",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name"
      },
      {
        "name": "AppointeLastName_New",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name"
      },
      {
        "name": "AppointeDOB_New",
        "label": "Appointee DOB",
        "inputType": "date",
        "required": false,
        "validationmsg": "Appointee DOB",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "AppointeRealtionshipWithPolicyowner_New",
        "label": "Relationship with Policy Owner",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Relationship with Policy Owner",
        "placeholder": "Select a Relationship with Policy Owner"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ],
    "Request_Details": [
      {
        "name": "requestform",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Appointee"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Customer Signing Date & Time",
        "placeholder": ""
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
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
        "placeholder": "Comment Box"
      }
    ],
    "Share_Appointee_process": [
      {
        "name": "ShareNomineeChangeProcess",
        "label": "Send Appointee Change Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Send Appointee Change Process",
        "placeholder": "Send Via"
      }
    ],
    "POS_Details": [
      {
        "name": "ExistingAppoineeDetails",
        "label": "Existing Appointee Details",
        "inputType": "title",
        "required": false,
        "validationmsg": "Existing Appoinee Details",
        "placeholder": "Existing Appoinee Details"
      },
      { 
        "name": "AppointeSalutation_Old",
        "label": "Appointee Salutation ",
        "inputType": "dropdown",
        "required": false,
        "disabled":true,
        "validationmsg": "Select a Salutation",
        "placeholder": "Salutation"
      },
      {
        "name": "AppointeFirstName_Old",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name"
      },
      {
        "name": "AppointeLastName_Old",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name"
      },
      {
        "name": "AppointeDOB_Old",
        "label": "Appointee DOB",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Appointee DOB",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "AppointeRealtionshipWithPolicyowner_Old",
        "label": "Relationship with Policy Owner",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Relationship with Policy Owner",
        "placeholder": "Relationship with Policy Owner"
      },
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
        "name": "NewAppointeeDetails",
        "label": "New Appointee Details",
        "inputType": "title",
        "icon": "edit"
      },
      { 
        "name": "AppointeSalutation_New",
        "label": "Appointee Salutation ",
        "inputType": "dropdown",
        "required": false,
        "disabled":true,
        "validationmsg": "Select a Salutation",
        "placeholder": "Salutation",
        "posEdit": true 
      },
      {
        "name": "AppointeFirstName_New",
        "label": "Appointee First Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee First Name",
        "placeholder": "Appointee First Name",
        "posEdit": true
      },
      {
        "name": "AppointeLastName_New",
        "label": "Appointee Last Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Appointee Last Name",
        "placeholder": "Appointee Last Name",
        "posEdit": true
      },
      {
        "name": "AppointeDOB_New",
        "label": "Appointee DOB",
        "inputType": "date",
        "required": true,
        "disabled": true,
        "validationmsg": "Appointee DOB",
        "placeholder": "DD/MM/YYYY",
        "posEdit": true
      },
      {
        "name": "AppointeRealtionshipWithPolicyowner_New",
        "label": "Relationship with Policy Owner",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "Relationship with Policy Owner",
        "placeholder": "Select a Relationship with Policy Owner",
        "posEdit": true
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      }
    ]
  },
  "rideraddition": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "BOE_Details": [
      {
        "name": "existingrider",
        "label": "Existing Rider",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Existing Rider"
      },
      {
        "name": "ridersumassured",
        "label": "Rider Sum Assured",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Rider Sum Assured"
      },
      {
        "name": "newterm",
        "label": "Addition / Deletion Allowed",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Addition / Deletion Allowed"
      },
      {
        "name": "selectride",
        "label": "Select Rider",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Select Rider"
      },
      {
        "name": "selectride",
        "label": "Select Rider",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "",
        "placeholder": "Select Rider"
      },
      {
        "name": "sumassured",
        "label": "Sum Assured",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Sum Assured"
      },
      {
        "name": "termchanegprocess",
        "label": "Send Rider Addition / Deletion Process",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Rider Addition / Deletion Process"
      },
      {
        "name": "riderrequestform",
        "label": "Send Rider Addition/Deletion Request Form",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Rider Addition/Deletion Request Form"
      }
    ],
    "Request_Details": [
      {
        "name": "reasonforchange",
        "label": "Reason For Change / Update",
        "inputType": "dropdown",
        "placeholder": "Reason for change/update"
      },
      {
        "name": "requestsource",
        "label": "Request Source",
        "inputType": "dropdown",
        "placeholder": "Request Source"
      },
      {
        "name": "requestdate",
        "label": "Request Date & Time",
        "inputType": "date",
        "placeholder": ""
      },
      {
        "name": "customersigning",
        "label": "Customer Signing Date & Time",
        "inputType": "date",
        "placeholder": ""
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      }
    ],
    "Checklist": [
      {
        "name": "validatesignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": false,
        "validationmsg": "Validate Signature",
        "placeholder": "Validate Signature"
      },
      {
        "name": "requestform",
        "label": "Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Request Form"
      },
      {
        "name": "requestform",
        "label": "Supporting Document",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Supporting Document"
      }
    ]
  },
  "statusenquiryss": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideRequestDetails": true,
    "hideChecklist": true,
    "isHideRequirementBtn": true,
    "BOE_Details": [
      {
        "name": "panupdate",
        "label": "Partial Withdrawal Applicable",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Partial Withdrawal Applicable"
      },
      {
        "name": "name",
        "label": "Partial Withdrawal Can Be Made After",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "dob",
        "label": "Total Fund Value (1)",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Fund Value"
      },
      {
        "name": "panno",
        "label": "Max Partial Withdrawal Possible",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Max Partial Withdrawal Possible"
      },
      {
        "name": "panvalidation",
        "label": "Partial Withdrawal Value Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "panaadharseeding",
        "label": "Partial Withdrawal Amt Requested",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Partial Withdrawal Amt Requested"
      },
      {
        "name": "uploadpan",
        "label": "TDS Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "TDS Amount"
      },
      {
        "name": "fillingcheck",
        "label": "TDS %",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "TDS %"
      },
      {
        "name": "generalfunletter",
        "label": "General Fund Value Letter",
        "inputType": "radios",
        "required": true,
        "validationmsg": ""
      },
      {
        "name": "withdrawalprocess",
        "label": "Send Partial Withdrawal Process",
        "inputType": "radios",
        "required": true,
        "validationmsg": ""
      }
    ]
  },
  "freelookrequest": {
    "hideRequestDetails": true,
    "isPOSScreen": true,
    "Details": [
      {
        "name": "policyno",
        "label": "Dispatch mode",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch mode"
      },
      {
        "name": "policystatus",
        "label": "Policy Issuance",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Issuance"
      },
      {
        "name": "annuitantname",
        "label": "Dispatch Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Date"
      },
      {
        "name": "annuitantname",
        "label": "FLC Period Ends On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "FLC Period Ends On"
      },
      {
        "name": "plan",
        "label": "POD No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "POD No"
      },
      {
        "name": "coevalidatefrom",
        "label": "FLC Period",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "FLC Period"
      },
      {
        "name": "coevalidateto",
        "label": "Received On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received On"
      },
      {
        "name": "kycno",
        "label": "Received By",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Received By"
      },
      {
        "name": "annuitantmode",
        "label": "Retention Tools",
        "inputType": "link",
        "linkValue": "link",
        "required": false,
        "validationmsg": "",
        "placeholder": "Retention Tools"
      },
      {
        "name": "annuitantamt",
        "label": "FAQs",
        "inputType": "link",
        "linkValue": "link",
        "required": false,
        "validationmsg": "",
        "placeholder": "FAQs"
      },
      {
        "name": "coevalidatefrom",
        "label": "RTO Status",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "RTO Status"
      },
      {
        "name": "coevalidateto",
        "label": "Medical Cost",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Medical Cost"
      },
      {
        "name": "annuitantmode",
        "label": "Policy Redispatch",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Redispatch"
      },
      {
        "name": "kycno",
        "label": "KYC No",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "KYC No"
      },
      {
        "name": "annuitantamt",
        "label": "Dispatch Mode",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Mode"
      },
      {
        "name": "coevalidateto",
        "label": "SB Payout",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "SB Payout"
      },
      {
        "name": "annuitantmode",
        "label": "Dispatch Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Date"
      },
      {
        "name": "kycno",
        "label": "Welcome Call Date",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Welcome Call Date"
      },
      {
        "name": "annuitantamt",
        "label": "POD No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "POD No"
      },
      {
        "name": "welcomecallcomment",
        "label": "Welcome Call Comments",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Welcome Call Comments"
      },
      {
        "name": "annuitantamt",
        "label": "Received On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received On"
      },
      {
        "name": "coevalidateto",
        "label": "Free-Look Reason",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Free-Look Reason"
      },
      {
        "name": "receivedby",
        "label": "Received By",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received By"
      }
    ],
    "Details_Checklist": [
      {
        "name": "uploadpod",
        "label": "Upload POD",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload POD"
      },
      {
        "name": "retentionletter",
        "label": "Upload Retention Letter",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Retention Letter"
      },
      {
        "name": "signingdate",
        "label": "Customer Signing Date & Time",
        "inputType": "date",
        "required": true,
        "validationmsg": "",
        "placeholder": "Customer Signing Date & Time"
      }
    ],
    "Details_Buttons": [
      {
        "label": "Close"
      },
      {
        "label": "Register Freelook"
      }
    ],
    "BOE_Details": [
      {
        "name": "policyno",
        "label": "Policy No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy No"
      },
      {
        "name": "policystatus",
        "label": "Policy Status",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Status"
      },
      {
        "name": "annuitantname",
        "label": "PO Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "PO Name"
      },
      {
        "name": "annuitantname",
        "label": "LA Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "LA Name"
      },
      {
        "name": "plan",
        "label": "Plan",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Plan"
      },
      {
        "name": "coevalidatefrom",
        "label": "Premium",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium"
      },
      {
        "name": "kycno",
        "label": "KYC No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "KYC No"
      },
      {
        "name": "dispatchmode",
        "label": "Dispatch mode",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch mode"
      },
      {
        "name": "policystatus",
        "label": "Policy Issuance",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Issuance"
      },
      {
        "name": "annuitantname",
        "label": "Dispatch Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Date"
      },
      {
        "name": "annuitantname",
        "label": "FLC Period Ends On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "FLC Period Ends On"
      },
      {
        "name": "plan",
        "label": "POD No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "POD No"
      },
      {
        "name": "coevalidatefrom",
        "label": "FLC Period",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "FLC Period"
      },
      {
        "name": "coevalidateto",
        "label": "Received On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received On"
      },
      {
        "name": "annuitantmode",
        "label": "Retention Tools",
        "inputType": "link",
        "linkValue": "link",
        "required": false,
        "validationmsg": "",
        "placeholder": "Retention Tools"
      },
      {
        "name": "annuitantamt",
        "label": "FAQs",
        "inputType": "link",
        "linkValue": "link",
        "required": false,
        "validationmsg": "",
        "placeholder": "FAQs"
      },
      {
        "name": "receivedby",
        "label": "Received By",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Received By"
      },
      {
        "name": "coevalidatefrom",
        "label": "RTO Status",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "RTO Status"
      },
      {
        "name": "coevalidateto",
        "label": "Medical Cost",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Medical Cost"
      },
      {
        "name": "annuitantmode",
        "label": "Policy Redispatch",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Redispatch"
      },
      {
        "name": "kycno",
        "label": "KYC No",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "KYC No"
      },
      {
        "name": "annuitantamt",
        "label": "Dispatch Mode",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Mode"
      },
      {
        "name": "coevalidateto",
        "label": "SB Payout",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "SB Payout"
      },
      {
        "name": "annuitantmode",
        "label": "Dispatch Date",
        "inputType": "date",
        "required": false,
        "validationmsg": "",
        "placeholder": "Dispatch Date"
      },
      {
        "name": "welcomecalldate",
        "label": "Welcome Call Date",
        "inputType": "date",
        "required": true,
        "validationmsg": "",
        "placeholder": "Welcome Call Date"
      },
      {
        "name": "annuitantamt",
        "label": "POD No",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "POD No"
      },
      {
        "name": "welcomecallcomment",
        "label": "Welcome Call Comments",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Welcome Call Comments"
      },
      {
        "name": "annuitantamt",
        "label": "Received On",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received On"
      },
      {
        "name": "coevalidateto",
        "label": "Free-Look Reason",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Free-Look Reason"
      },
      {
        "name": "annuitantmode",
        "label": "Received By",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Received By"
      },
      {
        "name": "annuitantamt",
        "label": "Name as Mentioned in The Bank A/C",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as Mentioned in The Bank A/C"
      },
      {
        "name": "bankifsc",
        "label": "Bank IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "annuitantamt",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "coevalidateto",
        "label": "Bank Account Number",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "annuitantmode",
        "label": "Confirm Bank Account Number",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "annuitantmode",
        "label": "Confirm Bank Account Number",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "fundtransfer",
        "label": "Fund Transfer To",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "placeholder": "Confirm Bank Account Number"
      }
    ],
    "Buttons": [
      {
        "label": "Penny Drop"
      },
      {
        "label": "KYC Check"
      }
    ],
    "POS_Buttons": [
      {
        "label": "Penny Drop"
      },
      {
        "label": "KYC Check"
      },
      {
        "label": "Pass JV For FT"
      }
    ],
    "Transfer_Fields": [
      {
        "name": "fundtransfers",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "ftamount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "ftpolicy",
        "label": "Relations to FT Policy",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "ftamtowner",
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Name of Fund Transfer Policy Owner"
      }
    ],
    "Checklist": [
      {
        "name": "validatesignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": ""
      },
      {
        "name": "aadharupdateprocess",
        "label": "Upload Customer Photo",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Customer Photo"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Upload Customer Video",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Customer Video"
      },
      {
        "name": "aadharupdateprocess",
        "label": "FLC Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "FLC Form"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Policy Bond / Idemnity",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Bond / Idemnity"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Policy Owner ID Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Owner ID Proof"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Policy Owner Address proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Owner Address proof"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Policy Owner Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Policy Owner Bank Account Proof"
      },
      {
        "name": "aadharupdateprocess",
        "label": "PAN Aadhar Linked",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "PAN Aadhar Linked"
      },
      {
        "name": "aadharupdateprocess",
        "label": "Upload Out Freelook Email",
        "inputType": "upload",
        "required": true,
        "validationmsg": "",
        "placeholder": "Upload Out Freelook Email"
      }
    ]
  },
  "renewalpremiumreceipt": {
    "isShowBOE": true,
    "hideChecklist": true,
    "hideRequestDetails": true,
    "isHideRequirementBtn": true,
    "showEmailFields": true,
    "BOE_Details": [
      {
        "name": "ViewDocumentsSubmitted",
        "indexName": "View Documents Submitted",
        "label": "View Receipts",
        "inputType": "link",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      }
    ],
    "Send_Fields": [
      {
        "name": "sendpaymentlink2",
        "label": "Share Renewal Premium Receipt",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ],
    "RENEWAL_LAST5_OPEN_TICKETS": [
      {
        "title": "Sr No",
        "field": "srno"
      },
      {
        "title": "Id No",
        "field": "idno"
      },
      {
        "title": "Payment Receipt Date",
        "field": "paymentreceiptdate"
      },
      {
        "title": "Amount",
        "field": "amount"
      },
      {
        "title": "Payment Mode",
        "field": "paymentmode"
      },
      {
        "title": "",
        "field": ""
      }
    ],
    "Table_Data": [
      {
        "srno": 1,
        "idno": "100",
        "paymentreceiptdate": "10/09/2023",
        "amount": "2,000",
        "paymentmode": "Cash "
      },
      {
        "srno": 2,
        "idno": "100",
        "paymentreceiptdate": "11/09/2023",
        "amount": "4,000",
        "paymentmode": "Cash "
      },
      {
        "srno": 3,
        "idno": "100",
        "paymentreceiptdate": "12/09/2023",
        "amount": "6,000",
        "paymentmode": "Digital"
      },
      {
        "srno": 4,
        "idno": "100",
        "paymentreceiptdate": "13/09/2023",
        "amount": "8,000",
        "paymentmode": "Cash"
      },
      {
        "srno": 5,
        "idno": "100",
        "paymentreceiptdate": "14/09/2023",
        "amount": "10,000",
        "paymentmode": "Digital"
      }
    ]
  },
  "premiumpaidcertificate": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideRequestDetails": true,
    "hideChecklist": true,
    "isHideRequirementBtn": true,
    "showEmailFields": true,
    "BOE_Details": [
      {
        "name": "premiumpaidcertificate",
        "label": "PPC for the Year",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select PPC for the Year",
        "placeholder": "PPC for the Year"
      },
      {
        "name": "shareppc",
        "label": "Share PPC",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "discontinuancenotice": {
    "BOE_Details": [
      {
        "name": "documenttype",
        "label": "Document Name",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "",
        "placeholder": "Document Name"
      },
      {
        "name": "premiumpaidcertificate",
        "label": "Discontinuance Notice",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Paid Certificate"
      },
      {
        "name": "sendpaymentlink2",
        "label": "Share payment link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "forms": {
    "BOE_Details": [
      {
        "name": "sisDocumentType",
        "label": "Document Name",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select a Documnet Name",
        "placeholder": "Document Name"
      },
      {
        "name": "sendVia",
        "label": "Send Via",
        "inputType": "icons",
        "required": true,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "benefitillustration": {
    "BOE_Details": [
      {
        "name": "sendVia",
        "label": "Send Via",
        "inputType": "icons",
        "required": true,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ],
    "Buttons": [
      {
        "label": "Send",
        "isShowPOS": false
      }
    ]
  },
  "firstpremiumreceipt": {
    "BOE_Details": [
      {
        "name": "sendVia",
        "label": "Send Via",
        "inputType": "icons",
        "required": true,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "unitstatement": {
    "BOE_Details": [
      {
        "name": "FromDate",
        "label": "From Date",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select a From Date",
        "placeholder": "From Date"
      },
      {
        "name": "ToDate",
        "label": "To Date",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select a To Date",
        "placeholder": "Select Date"
      },
      {
        "name": "sendVia",
        "label": "Send Via",
        "inputType": "icons",
        "required": true,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "discontinouancenotice": {
    "BOE_Details": [
      {
        "name": "sendVia",
        "label": "Send Via",
        "inputType": "icons",
        "required": true,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "bonus": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideRequestDetails": true,
    "hideChecklist": true,
    "isHideRequirementBtn": true,
    "showEmailFields": true,
    "BOE_Details": [
      {
        "name": "documenttype",
        "label": "Document Name",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "",
        "placeholder": "Document Name"
      },
      {
        "name": "bonusletter",
        "label": "Bonus Letter",
        "inputType": "date",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bonus Letter"
      },
      {
        "name": "sendpaymentlink2",
        "label": "Share Bonus Letter",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ],
    "Buttons": [
      {
        "label": "Send",
        "isShowPOS": false
      }
    ]
  },
  "partialwithdrawalquery": {
    "BOE_Details": [
      {
        "name": "options2",
        "label": "Partial Withdrawal Applicable",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Partial Withdrawal Applicable",
        "placeholder": "Partial Withdrawal Applicable",
        "disabled": true,
        "hide": false
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "PartialWithdrawalcanbemadeafter",
        "label": "Partial Withdrawal can be made after",
        "inputType": "text",
        "required": false,
        "validationmsg": "Partial Withdrawal can be made after",
        "placeholder": "Partial Withdrawal can be made after",
        "disabled": true,
        "hide": false
      }
    ],
    "WithdrawApplicableYes": [
      {
        "name": "TotalFundValue",
        "label": "Total Fund Value",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "Total Fund Value",
        "placeholder": "Total Fund Value",
        "disabled": true
      },
      {
        "name": "MaxPartialWithdrawalpossible",
        "label": "Max Partial Withdrawal possible",
        "inputType": "text",
        "required": false,
        "validationmsg": "Max Partial Withdrawal possible",
        "placeholder": "Max Partial Withdrawal possible",
        "disabled": true
      }
    ],
    "ShareProcess": [
      {
        "name": "sendpaymentlink2",
        "label": "Share Process Information",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      },
      {
        "name": "sendpaymentlink2",
        "label": "Share Fund Statement",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "partialwithdrawalrequest": {
    "BOE_Details": [
      {
        "name": "TotalFundValue",
        "label": "Total Fund Value",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "Total Fund Value",
        "placeholder": "Total Fund Value",
        "disabled": true
      },
      {
        "name": "MaxPartialWithdwral",
        "label": "Max Partial Withdwral",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter Amount",
        "placeholder": "Enter Amount",
        "disabled": true
      },
      {
        "name": "PayableAmount",
        "label": "Enter Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter Amount",
        "placeholder": "Enter Amount"
      },
      {
        "name": "FundTransfer",
        "label": "Do you wish to Opt for Fund Transfer",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Do you wish to Opt for Fund Transfer",
        "placeholder": "Do you wish to Opt for Fund Transfer"
      },
      {
        "name": "RequestTime",
        "label": "Request Time",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Request Time",
        "placeholder": "Request Time"
      },
      {
        "name": "ReasonForPartialWithdrawal",
        "label": "Reason For Partial Withdrawal",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Reason For Partial Withdrawal",
        "placeholder": "Reason For Partial Withdrawal"
      }
    ],
    "OPTForFundTransferYes": [
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": true,
        "validationmsg": "Fund Transfer To",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Fund Transfer Amount",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationstoFTPolicy",
        "label": "Relations to FT Policy",
        "inputType": "text",
        "required": true,
        "validationmsg": "Relations to FT Policy",
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": true,
        "validationmsg": "Name of Fund Transfer Policy Owner",
        "placeholder": "Name of Fund Transfer Policy Owner"
      }
    ],
    "Upload_Fields": [
      {
        "name": "",
        "label": "Upload Documents for Partial Withdrawal",
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
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "addressProof",
        "label": "Upload Address Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable Address Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Bank Details Updation",
        "icon": "upload"
      },
      {
        "name": "UploadPolicyBankAccountProof",
        "indexName": "Minor Alteration",
        "label": "Upload Policy Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Policy Bank Account Proof",
        "placeholder": "Upload Policy Bank Account Proof"
      }
    ],
    "Bank_Details": [
      {
        "name": "updateBankDetails",
        "label": "Update Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "Request_Fields": [
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
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "",
        "placeholder": "Comments"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Reason For Delay",
        "placeholder": "Reason for Delayed Submission"
      }
    ],
    "POS_Details": [
      {
        "name": "TotalFundValue",
        "label": "Total Fund Value",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Total Fund Value",
        "placeholder": "Total Fund Value"
      },
      {
        "name": "RequestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "validationmsg": "Request For",
        "placeholder": "Request For",
        "disabled": true
      },
      {
        "name": "EnteredAmount",
        "label": "Amount For Partial Withdrawal",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Amount For Partial Withdrawal",
        "placeholder": "Amount For Partial Withdrawal"
      },
      {
        "name": "FundTransferAmount",
        "label": "Amount For Fund Transfer",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Amount For Fund Transfer",
        "placeholder": "Amount For Fund Transfer"
      },
      {
        "name": "RequestTime",
        "label": "Request Time",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Time",
        "placeholder": "Request Time"
      },
      {
        "name": "Comments",
        "label": "Branch Remarks",
        "inputType": "text",
        "required": false,
        "validationmsg": "Branch Remarks",
        "placeholder": "Branch Remarks",
        "disabled": true
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "class": "disabled",
        "required": false,
        "validationmsg": "Signature Validated",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "ViewBankDetails",
        "label": "View Bank Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": false,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
        "disabled": true,
        "posEdit": true
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "disabled": true,
        "posEdit": true
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Type",
        "placeholder": "Account Type",
        "posEdit": true
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name",
        "posEdit": true
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true,
        "posEdit": true
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "Penny Drop Result",
        "placeholder": "Penny Drop Result",
        "disabled": true,
        "posEdit": true
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "",
        "disabled": true
      },
      {
        "name": "viewRequestDetails",
        "label": "View Fund Transfer Details",
        "inputType": "title",
        "hide": true,
        "fundTrnsfer": "yes"
      },
      {
        "name": "ReasonForPartialWithdrawal",
        "label": "Reason For Partial Withdrawal",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Partial Withdrawal",
        "placeholder": "Reason For Partial Withdrawal"
      },
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Fund Transfer To",
        "hide": true,
        "fundTrnsfer": "yes"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Fund Transfer Amount",
        "hide": true,
        "fundTrnsfer": "yes"
      },
      {
        "name": "RelationstoFTPolicy",
        "label": "Relations to FT Policy",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Relations to FT Policy",
        "hide": true,
        "fundTrnsfer": "yes"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "showRqstField": false,
        "placeholder": "Name of Fund Transfer Policy Owner",
        "hide": true,
        "fundTrnsfer": "yes"
      }
    ],
    "POS_View_FundTransfer_Details": [
      {
        "name": "ViewFundTransferDetails",
        "label": "View Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "ReasonForPartialWithdrawal",
        "label": "Reason For Partial Withdrawal",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Partial Withdrawal",
        "placeholder": "Reason For Partial Withdrawal"
      },
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "validationmsg": "Fund Transfer To",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "Fund Transfer Amount",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationstoFTPolicy",
        "label": "Relations to FT Policy",
        "inputType": "text",
        "required": false,
        "validationmsg": "Relations to FT Policy",
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": false,
        "validationmsg": "Name of Fund Transfer Policy Owner",
        "placeholder": "Name of Fund Transfer Policy Owner"
      }
    ],
    "POS_Action": [
      {
        "name": "viewPOS",
        "label": "POS Action",
        "inputType": "title"
      },
      {
        "name": "paymentMode",
        "label": "Payment Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Payment Mode"
      },
      {
        "name": "ChangeInLast60Days",
        "label": "Any personal details change in last 60 days",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Any personal details change in last 60 days",
        "disabled": true
      },
      {
        "name": "PolicyLoggedLast",
        "label": "If any policy logged in the last 6 months",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "If any policy logged in the last 6 months",
        "disabled": true
      },
      {
        "name": "ViewFinalPayableAmount",
        "label": "View Final Payable Amount",
        "hyperLink": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "View Final Payable Amount"
      },
      {
        "name": "BankAccountDeDupe",
        "label": "Bank account de-dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "POScomment",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ],
    "POS_Details_Manager": [
      {
        "name": "TotalFundValue",
        "label": "Total Fund Value",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Total Fund Value",
        "placeholder": "Total Fund Value"
      },
      {
        "name": "RequestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "validationmsg": "Request For",
        "placeholder": "Request For",
        "disabled": true
      },
      {
        "name": "EnteredAmount",
        "label": "Amount For Partial Withdrawal",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Amount For Partial Withdrawal",
        "placeholder": "Amount For Partial Withdrawal"
      },
      {
        "name": "ReasonForPartialWithdrawal",
        "label": "Reason For Partial Withdrawal",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Partial Withdrawal",
        "placeholder": "Reason For Partial Withdrawal"
      },
      {
        "name": "FundTransferAmount",
        "label": "Amount For Fund Transfer",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Amount For Fund Transfer",
        "placeholder": "Amount For Fund Transfer"
      },
      {
        "name": "RequestTime",
        "label": "Request Time",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Time",
        "placeholder": "Request Time"
      },
      {
        "name": "Comments",
        "label": "Branch Remarks",
        "inputType": "text",
        "required": false,
        "validationmsg": "Branch Remarks",
        "placeholder": "Branch Remarks",
        "disabled": true
      },
      {
        "name": "POScomment",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "class": "disabled",
        "required": false,
        "validationmsg": "Signature Validated",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      }
    ],
    "POS_View_FundTransfer_Details_Manager": [
      {
        "name": "ViewFundTransferDetails",
        "label": "View Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "FundTransferTo",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "validationmsg": "Fund Transfer To",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "FundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "Fund Transfer Amount",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "RelationstoFTPolicy",
        "label": "Relations to FT Policy",
        "inputType": "text",
        "required": false,
        "validationmsg": "Relations to FT Policy",
        "placeholder": "Relations to FT Policy"
      },
      {
        "name": "NameofFundTransferPolicyOwner",
        "label": "Name of Fund Transfer Policy Owner",
        "inputType": "text",
        "required": false,
        "validationmsg": "Name of Fund Transfer Policy Owner",
        "placeholder": "Name of Fund Transfer Policy Owner"
      }
    ],
    "POS_Action_Manager": [
      {
        "name": "viewPOS",
        "label": "POS Action",
        "inputType": "title"
      },
      {
        "name": "STPFailedReason",
        "label": "STP Failed Reason",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "STP Failed Reason"
      },
      {
        "name": "paymentMode",
        "label": "Payment Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Payment Mode"
      },
      {
        "name": "ChangeInLast60Days",
        "label": "Any personal details change in last 60 days",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "Any personal details change in last 60 days",
        "disabled": true
      },
      {
        "name": "PolicyLoggedLast",
        "label": "If any policy logged in the last 6 months",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "",
        "placeholder": "If any policy logged in the last 6 months",
        "disabled": true
      },
      {
        "name": "ViewFinalPayableAmount",
        "label": "View Final Payable Amount",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "View Final Payable Amount"
      },
      {
        "name": "BankAccountDeDupe",
        "label": "Bank account de-dupe",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank account de-dupe"
      },
      {
        "name": "negavativeList",
        "label": "OFAC List Match",
        "inputType": "textlink",
        "linkValue": "View",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      },
      {
        "name": "POSManagerRemarks",
        "label": "POS Manager Remarks",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "POS Manager Remarks",
        "placeholder": "POS Manager Remarks"
      }
    ],
    "Add_CC": [
      {
        "name": "payableAmount",
        "label": "",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Email to Compliance"
      },
      {
        "name": "sendEmail",
        "label": "",
        "inputType": "text",
        "hyperLinks": "Send",
        "required": false,
        "validationmsg": "",
        "placeholder": "Enter CC Email"
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
        "placeholder": "Comment Box"
      }
    ]
  },
  "revivalquotation1": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideChecklist": true,
    "hideRequestDetails": true,
    "isHideRequirementBtn": true,
    "BOE_Details": [
      {
        "name": "policyno",
        "label": "Out of Revival",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Out of Revival"
      },
      {
        "name": "policystatus",
        "label": "Total Base Premium + Tax",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Base Premium + Tax"
      },
      {
        "name": "annuitantname",
        "label": "Interest Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Amount"
      },
      {
        "name": "annuitantname",
        "label": "Amt in Suspense (Debit/Credit)",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Amt in Suspense (Debit/Credit)"
      },
      {
        "name": "plan",
        "label": "Total Premium Due",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Premium Due"
      },
      {
        "name": "policyno",
        "label": "Interest Waiver & Amt",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver & Amt"
      },
      {
        "name": "policystatus",
        "label": "OverDue Period",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "OverDue Period"
      },
      {
        "name": "annuitantname",
        "label": "DGH Required",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DGH Required"
      },
      {
        "name": "annuitantname",
        "label": "Premium Holiday",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday"
      },
      {
        "name": "annuitantname",
        "label": "Interest Waiver",
        "inputType": "link",
        "linkValue": "Email Link",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver"
      },
      {
        "name": "plan",
        "label": "Renewal Pick Up Request",
        "inputType": "title",
        "required": false,
        "validationmsg": "",
        "placeholder": "Renewal Pick Up Request"
      },
      {
        "name": "btns",
        "label": "",
        "inputType": "radiobtns",
        "required": false,
        "validationmsg": "",
        "placeholder": "Address"
      },
      {
        "name": "policyno",
        "label": "Address",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Address"
      },
      {
        "name": "policyno",
        "label": "Address",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Address"
      },
      {
        "name": "policystatus",
        "label": "Date & Time",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "annuitantname",
        "label": "Send Revival Quotation",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "DGH Required"
      },
      {
        "name": "annuitantname",
        "label": "Send Payment/Revival Link",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday"
      },
      {
        "name": "annuitantname",
        "label": "Send Revival Requirements",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday"
      }
    ]
  },
  "revivalstatusenquiry": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideChecklist": true,
    "hideRequestDetails": true,
    "isHideRequirementBtn": true,
    "BOE_Details": [
      {
        "name": "policyno",
        "label": "Out of Revival",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Out of Revival"
      },
      {
        "name": "policystatus",
        "label": "Auto Pay",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Auto Pay"
      },
      {
        "name": "annuitantname",
        "label": "Base Prem",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Base Prem"
      },
      {
        "name": "annuitantname",
        "label": "GST",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "GST"
      },
      {
        "name": "plan",
        "label": "Interest Amt",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Amt"
      },
      {
        "name": "policyno",
        "label": "Amt in Suspense (debit/credit)",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Amt in Suspense (debit/credit)"
      },
      {
        "name": "policystatus",
        "label": "Total Premium Due",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Premium Due"
      },
      {
        "name": "annuitantname",
        "label": "Interest Waiver",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver"
      },
      {
        "name": "annuitantname",
        "label": "Overdue Period",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Overdue Period"
      },
      {
        "name": "annuitantname",
        "label": "DGH Required",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DGH Required"
      },
      {
        "name": "plan",
        "label": "Premium Holiday",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday"
      },
      {
        "name": "policystatus",
        "label": "Balance No of Years to Pay",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Balance No of Years to Pay"
      },
      {
        "name": "policyno",
        "label": "No of Years Premium Paid",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "No of Years Premium Paid"
      },
      {
        "name": "policyno",
        "label": "",
        "inputType": "link",
        "linkValue": "Last 5 Payment Details",
        "required": false,
        "validationmsg": "",
        "placeholder": "Last 5 Payment Details"
      },
      {
        "name": "policystatus",
        "label": "Interest Waiver",
        "inputType": "link",
        "linkValue": "Email Link",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver"
      },
      {
        "name": "annuitantname",
        "label": "Send Payment/Revival Link",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Payment/Revival Link"
      },
      {
        "name": "annuitantname",
        "label": "Send Revival Quotation",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Revival Quotation"
      },
      {
        "name": "annuitantname",
        "label": "Send Revival Requirements",
        "inputType": "radios",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Revival Requirements"
      },
      {
        "name": "policystatus",
        "label": "One Time Transaction",
        "inputType": "titlecheckbox",
        "required": false,
        "validationmsg": "",
        "placeholder": "Total Premium Due"
      },
      {
        "name": "annuitantname",
        "label": "Interest Waiver",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver"
      }
    ],
    "OneTimeTransaction": [
      {
        "name": "annuitantname",
        "label": "Re-debit Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Re-debit Amount"
      },
      {
        "name": "annuitantname",
        "label": "Re-debit Date",
        "inputType": "date",
        "required": false,
        "validationmsg": "",
        "placeholder": "DD/MM/YYYY"
      }
    ],
    "Buttons": [
      {
        "label": "Send OTP"
      }
    ]
  },
  "medicalreportsrequired": {
    "BOE_Details": [
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "hide": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form"
      },
      {
        "name": "UploadApprovalEmail",
        "label": "Upload Approval Email",
        "inputType": "upload",
        "required": true,
        "hide": true,
        "validationmsg": "Upload Approval Email",
        "placeholder": "Upload Approval Email"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "hide": false,
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "branchreceiveddate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "hide": false,
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      }
    ],
    "ReasonSubmission": [
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "required": true,
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
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
        "name": "RequestorComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "hide": true,
        "required": false,
        "disabled": true,
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "required": false,
        "validationmsg": "Comments",
        "placeholder": "Comments"
      }
    ],
    "Send_Medical_Reports": [
      {
        "name": "sendVia",
        "label": "Send Medical Reports",
        "inputType": "icons"
      }
    ]
  },
  "appointmentformedicaltest": {
    "BOE_Details": [
      {
        "name": "Home_medical",
        "label": "Medical Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Home Medical",
        "placeholder": "Home Medical"
      },
      {
        "name": "Preferred_Date",
        "label": "Prefered Date",
        "inputType": "nofuturedates",
        "pastDate": true,
        "required": true,
        "validationmsg": "Prefered Call Back Date",
        "placeholder": "Prefered Call Back Date"
      },
      {
        "name": "Preferred_Time",
        "label": "Prefered Time",
        "inputType": "time",
        "required": true,
        "validationmsg": "Prefered Call Back Time",
        "placeholder": "Prefered Call Back Time"
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
        "name": "Comments",
        "label": "Requestor  Comments",
        "inputType": "text",
        "required": false,
        "validationmsg": "Comments",
        "placeholder": "Comments"
      }
    ],
    "POS_Details": [
      {
        "name": "ViewAppointmentDetails",
        "label": "View Appointment Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "Home_medical",
        "label": "Medical Type",
        "inputType": "text",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Home Medical",
        "placeholder": "Home Medical"
      },
      {
        "name": "Preferred_Date",
        "label": "Prefered Date",
        "inputType": "nofuturedates",
        "pastDate": true,
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Prefered Call Back Date",
        "placeholder": "Prefered Call Back Date"
      },
      {
        "name": "Preferred_Time",
        "label": "Prefered Time",
        "inputType": "time",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Prefered Call Back Time",
        "placeholder": "Prefered Call Back Time"
      },
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Comments",
        "placeholder": "Comments"
      },
      {
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "text",
        "required": false,
        "validationmsg": "Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "switch": {
    "BOE_Details": [
      {
        "name": "ViewExistingDetails",
        "label": "Existing Details",
        "inputType": "title"
      }
    ],
    "View_Existing_Details_title": [
      {
        "name": "ViewExistingDetails",
        "label": "Existing Details",
        "inputType": "title"
      }
    ],
    "Initiate_RequestBY": [
      {
        "name": "RequestTime",
        "label": "Request Time",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Time",
        "placeholder": "Request Time"
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
        "name": "customerchoice",
        "label": "Initiate Request By",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select ValidatedBy",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform"
      },
      {
        "name": "datechoice",
        "label": "Date",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select dateoption",
        "title": "Current Date",
        "secondTitle": "Backdated Date",
        "radioValue": "current",
        "secondRadioValue": "backdated",
        "initialValue": "current"
      }
    ],
    "Effective_Date": [
      {
        "name": "FundDate",
        "label": "Effective Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Effective Date",
        "placeholder": "Effective Date"
      }
    ],
    "Request_Details": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      }
    ]
  },
  "fundvalue": {
    "BOE_Details": [
      {
        "name": "ViewExistingDetails",
        "label": "Existing Details",
        "inputType": "title"
      }
    ],
    "View_Existing_Details_title": [
      {
        "name": "ViewExistingDetails",
        "label": "Existing Details",
        "inputType": "title"
      }
    ],
    "Initiate_RequestBY1": [
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      }
    ]
  },
  "premiumredirection": {
    "Additionalnoteforcustomer": [],
    "BOE_Details": [
      {
        "name": "ExistingDetails",
        "label": "Existing Details",
        "inputType": "title"
      }
    ],
    "Initiate_RequestBY": [
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "customerchoice",
        "label": "Initiate Request By",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select ValidatedBy",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform"
      }
    ],
    "Request_Details": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      }
    ]
  }
};