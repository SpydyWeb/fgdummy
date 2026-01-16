export const RefundData = {
  "autopaybouncecharges": {
    "BOE_Details": [
      {
        "name": "UploadSupportingDocument",
        "indexName": "Minor Alteration",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document"
      }
    ],
    "Customer_Choice_Details": [
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
    "Request_Details": [
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": false,
        "required": false,
        "validationmsg": "Select Request Mode",
        "placeholder": "Request Mode"
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
        "name": "UploadSupportingDocument",
        "indexName": "Minor Alteration",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document"
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
        "name": "branchreceiveddate",
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
        "required": false,
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
        "placeholder": "Comment Box"
      }
    ],
    "POS_Title": [
      {
        "name": "NewNomineeDetails",
        "label": "View Account Details & Charges",
        "inputType": "title",
        "icon": "edit"
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
        "inputType": "textarea",
        "disabled": true,
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
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
  "postissuanceexcessrefund": {
    "BOE_Details": [
      {
        "name": "excessRefundAmount",
        "label": "Excess Refund Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Excess Refund Amount"
      },
      {
        "name": "reasonForRefund",
        "label": "Reason For Refund",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Reason For Refund"
      },
      {
        "name": "View Bank Details",
        "label": "View Bank Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "ifsc",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "minlength": 11,
        "maxlength": 11,
        "disabled": true,
        "required": false,
        "placeholder": "IFSC",
        "boeEdit": true
      },
      {
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Bank Name",
        "boeEdit": true
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Branch Name"
      },
      {
        "name": "accountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "placeholder": "Account Type",
        "boeEdit": true
      },
      {
        "name": "accountHolderName",
        "label": "Account Holder Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Account Holder Name",
        "boeEdit": true
      },
      {
        "name": "enterAccountNumber",
        "label": "Enter Account Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Enter Account Number",
        "boeEdit": true
      },
      {
        "name": "reEnterAccountNumber",
        "label": "Re-Enter Account Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Re-Enter Account Number",
        "boeEdit": true
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": false,
        "placeholder": "Initiate Penny Drop",
        "boeEdit": true
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
      },
      {
        "name": "nameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "Upload Doucments",
        "label": "Upload Doucments",
        "inputType": "title"
      },
      {
        "name": "UploadRequestFormEmail",
        "label": "Upload Request Form/Email",
        "inputType": "upload",
        "disabled": false,
        "required": false,
        "placeholder": "Upload Request Form/Email"
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
        "name": "CustomerSiginingDate",
        "label": "Customer Sigining Date",
        "inputType": "date",
        "disabled": false,
        "required": false,
        "placeholder": "Customer Sigining Date"
      },
      {
        "name": "RequestReceivedDate",
        "label": "Request Received Date",
        "inputType": "date",
        "disabled": false,
        "required": false,
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelayedSubmission",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Reason For Delayed Submission"
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
    ]
  },
  "decline": {
    "BOE_Details": [
      {
        "name": "enterRefundAmount",
        "label": "Enter Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Enter Refund Amount"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "proceedFor",
        "label": "Proceed For",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Fund_Transfer": [
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Tranfer To"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Update_Bank_Account_Details": [
      {
        "name": "bankdetails",
        "label": "Update Bank Account Details",
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
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
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
        "required": true,
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
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
    "Customer_Choice": [
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
        "placeholder": "Comment Box"
      }
    ],
    "POS_PA_USER": [
      {
        "name": "enterRefundAmount",
        "label": "Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "requestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request For",
        "placeholder": "Request For"
      },
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "balanceAmountForRefund",
        "label": "Balance Amount for Refund",
        "disabled": true,
        "required": false,
        "inputType": "text"
      },
      {
        "name": "bankdetails",
        "label": "Enter Bank Details for Refund",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "disabled": true,
        "required": false,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "disabled": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
        "name": "paUserAction",
        "label": "PA User Action",
        "inputType": "title"
      },
      {
        "name": "holdRequest",
        "label": "Hold Request",
        "hide": false,
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Hold Request",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "holdRequestTill",
        "label": "Hold Request Till",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Hold Request till",
        "placeholder": "Select a date"
      }
    ]
  },
  "postpone": {
    "BOE_Details": [
      {
        "name": "enterRefundAmount",
        "label": "Enter Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Enter Refund Amount"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "proceedFor",
        "label": "Proceed For",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Fund_Transfer": [
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Tranfer To"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Enter Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Update_Bank_Account_Details": [
      {
        "name": "bankdetails",
        "label": "Update Bank Account Details",
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
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
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
        "required": true,
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
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
    "Customer_Choice": [
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
        "placeholder": "Comment Box"
      }
    ],
    "POS_PA_USER": [
      {
        "name": "enterRefundAmount",
        "label": "Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "requestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request For",
        "placeholder": "Request For"
      },
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "balanceAmountForRefund",
        "label": "Balance Amount for Refund",
        "disabled": true,
        "required": false,
        "inputType": "text"
      },
      {
        "name": "bankdetails",
        "label": "Enter Bank Details for Refund",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "disabled": true,
        "required": false,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "disabled": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
        "name": "paUserAction",
        "label": "PA User Action",
        "inputType": "title"
      },
      {
        "name": "holdRequest",
        "label": "Hold Request",
        "hide": false,
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Hold Request",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "holdRequestTill",
        "label": "Hold Request Till",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Hold Request till",
        "placeholder": "Select a date"
      }
    ]
  },
  "withdrawn": {
    "BOE_Details": [
      {
        "name": "enterRefundAmount",
        "label": "Enter Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Enter Refund Amount"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "proceedFor",
        "label": "Proceed For",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Fund_Transfer": [
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Tranfer To"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Update_Bank_Account_Details": [
      {
        "name": "bankdetails",
        "label": "Update Bank Account Details",
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
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
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
        "required": true,
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
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
    "Customer_Choice": [
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
        "placeholder": "Comment Box"
      }
    ],
    "POS_PA_USER": [
      {
        "name": "enterRefundAmount",
        "label": "Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "requestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request For",
        "placeholder": "Request For"
      },
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "balanceAmountForRefund",
        "label": "Balance Amount for Refund",
        "disabled": true,
        "required": false,
        "inputType": "text"
      },
      {
        "name": "bankdetails",
        "label": "Enter Bank Details for Refund",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "disabled": true,
        "required": false,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "disabled": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
        "name": "paUserAction",
        "label": "PA User Action",
        "inputType": "title"
      },
      {
        "name": "holdRequest",
        "label": "Hold Request",
        "hide": false,
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Hold Request",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "holdRequestTill",
        "label": "Hold Request Till",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Hold Request till",
        "placeholder": "Select a date"
      }
    ]
  },
  "excesspremium": {
    "BOE_Details": [
      {
        "name": "enterRefundAmount",
        "label": "Enter Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Enter Refund Amount"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "proceedFor",
        "label": "Proceed For",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Fund_Transfer": [
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Tranfer To"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": false,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      }
    ],
    "Update_Bank_Account_Details": [
      {
        "name": "bankdetails",
        "label": "Update Bank Account Details",
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
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
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
        "required": true,
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
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
    "Customer_Choice": [
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
        "placeholder": "Comment Box"
      }
    ],
    "POS_PA_USER": [
      {
        "name": "enterRefundAmount",
        "label": "Refund Amount",
        "inputType": "decimal",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "requestFor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Request For",
        "placeholder": "Request For"
      },
      {
        "name": "fundTransferDetails",
        "label": "Fund Transfer Details",
        "inputType": "title"
      },
      {
        "name": "fundTranferTo",
        "label": "Fund Tranfer To",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Refund Amount"
      },
      {
        "name": "fundTransferAmount",
        "label": "Fund Transfer Amount",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationToFTPolicy",
        "label": "Relation to FT Policy",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "nameOfFTPolicyOwner",
        "label": "Name of FT Policy owner",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "title": "Payout",
        "secondTitle": "Fund Transfer",
        "radioValue": "Payout",
        "secondRadioValue": "Fund Transfer"
      },
      {
        "name": "balanceAmountForRefund",
        "label": "Balance Amount for Refund",
        "disabled": true,
        "required": false,
        "inputType": "text"
      },
      {
        "name": "bankdetails",
        "label": "Enter Bank Details for Refund",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "disabled": true,
        "required": false,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "bankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "branchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Branch Name"
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "required": false,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "PennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "disabled": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Name as per Penny Drop",
        "boeEdit": true
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
        "name": "paUserAction",
        "label": "PA User Action",
        "inputType": "title"
      },
      {
        "name": "holdRequest",
        "label": "Hold Request",
        "hide": false,
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Hold Request",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "holdRequestTill",
        "label": "Hold Request Till",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Select Hold Request till",
        "placeholder": "Select a date"
      }
    ]
  }
};