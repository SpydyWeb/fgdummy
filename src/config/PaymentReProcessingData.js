export const PaymentReProcessingData = {
  "unclaimedamountpayout": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      },
      {
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing",
        "hide": false
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
        "inputType": "title",
        "hide": false
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Bank IFSC",
        "placeholder": "Bank IFSC",
        "hide": false
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name",
        "hide": false
      },
      {
        "name": "BranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Name",
        "hide": false
      },
      {
        "name": "AccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Account Type",
        "placeholder": "Account Type",
        "hide": false
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name",
        "hide": false
      },
      {
        "name": "BankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Enter Account Number",
        "hide": false
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number",
        "hide": false
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": true,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop",
        "hide": false
      },
      {
        "name": "NameAsPerPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "posEdit": true,
        "disabled": true,
        "hide": false
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
        "secondRadioValue": "no",
        "hide": false
      }
    ],
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title",
        "hide": false
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof ",
        "hide": false
      },
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "hide": false
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date",
        "hide": false
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date",
        "hide": false
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
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
        "hide": false,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "disabled": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "newbusinessrefund": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      },
      {
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "postissuancerefund": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "survivalbenefit": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "foreclosure": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "maturity": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "surrender": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "annuity": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
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
        "secondRadioValue": "no",
        "hide": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "claims": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "disabled": true
      },
      {
        "name": "NameDeDupematch",
        "label": "De-Dupe match",
        "inputType": "link",
        "linkValue": "View",
        "required": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "loan": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "disabled": true
      },
      {
        "name": "NameDeDupematch",
        "label": "De-Dupe match",
        "inputType": "link",
        "linkValue": "View",
        "required": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  },
  "partialwithdrawal": {
    "BOE_Details": [
      {
        "name": "Payment_Mode",
        "label": "Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Mode",
        "placeholder": "Payment Mode"
      },
      {
        "name": "Payment_Date",
        "label": "Payment Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Date",
        "placeholder": "Payment Date"
      },
      {
        "name": "Payment_Status",
        "label": "Payment Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Status",
        "placeholder": "Payment Status"
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
      },
      {
        "name": "Cheque_Status",
        "label": "Cheque Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      },
      {
        "name": "ChequePOD_No",
        "label": "Cheque POD No",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cheque POD No",
        "placeholder": "Cheque POD No"
      },
      {
        "name": "Reason_For_Reprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      },
      {
        "name": "InitiateReprocessingby",
        "label": "Initiate Reprocessing by",
        "inputType": "title",
        "required": false,
        "validationmsg": "Cheque Status",
        "placeholder": "Cheque Status"
      }
    ],
    "NEFT_Bank_Details": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "bankdetails",
        "label": "Enter Bank Details",
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
        "required": false,
        "disabled": true,
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
    "Initiate_RequestBY": [
      {
        "name": "initiateReprocessing",
        "label": "Initiate Reprocessing",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
      }
    ],
    "Request_Details": [
      {
        "name": "requestformtitle",
        "label": "Upload Documents",
        "inputType": "title"
      },
      {
        "name": "UploadChequeCopy",
        "label": "Upload Bank Account Proof ",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof ",
        "placeholder": "Upload Bank Account Proof "
      },
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
        "required": true,
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
        "name": "reasonForReprocessing",
        "label": "Reason For Reprocessing",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Reason For Reprocessing",
        "placeholder": "Reason For Reprocessing"
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonDelayed",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": true,
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_View_Bank_Details": [
      {
        "name": "ViewBankDetails ",
        "label": "View Bank Details",
        "inputType": "title"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank IFSC",
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
        "validationmsg": "",
        "placeholder": "Bank Name"
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
        "disabled": true,
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "Bank Account Number",
        "disabled": true
      },
      {
        "name": "PennyDropResult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result",
        "disabled": true
      },
      {
        "name": "NameDeDupematch",
        "label": "De-Dupe match",
        "inputType": "link",
        "linkValue": "View",
        "required": false
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
      }
    ],
    "POS_DetailsCorrect": [
      {
        "name": "POSBankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC",
        "disabled": false
      },
      {
        "name": "POSBankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Bank Name",
        "placeholder": "Bank Name",
        "disabled": true
      },
      {
        "name": "POSBranchName",
        "label": "Branch Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Branch Name",
        "placeholder": "Branch Name"
      },
      {
        "name": "POSAccountType",
        "label": "Account Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Account Type",
        "placeholder": "Account Type",
        "disabled": false
      },
      {
        "name": "POSAccHldrName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Account Holder Name",
        "placeholder": "Account Holder Name",
        "disabled": false
      },
      {
        "name": "POSBankAccountNumber",
        "label": "Enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "POSreenteraccountNumber",
        "label": "Re-enter Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-enter Account Number",
        "placeholder": "Re-enter Account Number"
      },
      {
        "name": "POSPennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "disabled": false,
        "hyperLink": true,
        "required": true,
        "validationmsg": "Enter Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "POSNameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Name as per Penny Drop"
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
        "secondRadioValue": "no"
      }
    ],
    "POS_Action": [
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Life Asia Updated",
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
        "placeholder": "Comments Box"
      }
    ]
  }
};