export const PaymentRelatedData = {
  "changeinmodefrequency": {
    "BOE_Details": [
      {
        "name": "ModeChangeAllowed",
        "label": "Mode Change Allowed",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Mode Change Allowed",
        "placeholder": "Mode Change Allowed"
      },
      {
        "name": "AllowableModeChangeOptions",
        "label": "Allowable Mode Change Options",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Allowable Mode Change Options",
        "placeholder": "Allowable Mode Change Options"
      }
    ],
    "Existing_ModeFreq_Details": [
      {
        "name": "ECSRequest",
        "label": "Auto Debit Enabled",
        "inputType": "text",
        "required": false,
        "validationmsg": "Auto Debit Enabled",
        "disabled": true,
        "placeholder": "Auto Debit Enabled"
      }
    ],
    "Update_ModeFreq_Details": [
      {
        "name": "Mode_New",
        "label": "Select New Mode",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select New Mode",
        "placeholder": "Select New Mode"
      },
      {
        "name": "ModalPremium",
        "label": "New Modal Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "New Modal Premium",
        "placeholder": "New Modal Premium"
      },
      {
        "name": "AnnualOutgoaspercurrentmode",
        "label": "Annual Outgo as per current mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Select New Mode",
        "placeholder": "Annual Outgo as per current mode"
      },
      {
        "name": "AnnualOutgoasperNewMode",
        "label": "Annual Outgo as per New Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Annual Outgo as per New Mode",
        "placeholder": "Annual Outgo as per New Mode"
      },
      {
        "name": "Difference",
        "label": "Difference",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Difference",
        "placeholder": "Difference"
      },
      {
        "name": "ECSRequest",
        "label": "Auto Debit Enabled",
        "inputType": "text",
        "required": false,
        "validationmsg": "Auto Debit Enabled",
        "disabled": true,
        "placeholder": "Auto Debit Enabled"
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
    "Send_ModeChange_Link": [
      {
        "name": "SendModeChangeLink",
        "label": "Send Mode Change Process",
        "inputType": "icons"
      }
    ],
    "NACH_Details": [
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountHolderName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Confirm Bank Account Number",
        "placeholder": "Confirm Bank Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "Initiate Penny Drop",
        "placeholder": "Initiate Penny Drop"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Date",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Preferred Debit Date",
        "placeholder": "Preferred Debit Date"
      },
      {
        "name": "UploadBankAccountProof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Bank Account Proof",
        "placeholder": "Upload Bank Account Proof"
      }
    ],
    "SI_Details": [
      {
        "name": "CardNumber",
        "label": "Card Number",
        "inputType": "text",
        "required": false,
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "validationmsg": "Card Number",
        "placeholder": "Card Number"
      },
      {
        "name": "ReEnterCardNumber",
        "label": "Re-enter Card Number",
        "inputType": "text",
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Re-enter Card Number",
        "placeholder": "Re-enter Card Number"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "CardType",
        "label": "Card Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Card Type",
        "placeholder": "Card Type"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Date",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Preferred Debit Date",
        "placeholder": "Preferred Debit Date"
      },
      {
        "name": "ExpiryDate",
        "label": "Expiry Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Expiry Date",
        "placeholder": "Expiry Date"
      }
    ],
    "Monthly_MAND_NACH_Details": [
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a IFSC",
        "placeholder": "IFSC"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "AccountHolderName",
        "label": "Account Holder Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Confirm Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Confirm Bank Account Number",
        "placeholder": "Confirm Bank Account Number"
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
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Date",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Preferred Debit Date",
        "placeholder": "Preferred Debit Date"
      },
      {
        "name": "UploadBankAccountProof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof",
        "placeholder": "Upload Bank Account Proof"
      }
    ],
    "Monthly_MAND_SI_Details": [
      {
        "name": "CardNumber",
        "label": "Card Number",
        "inputType": "text",
        "required": true,
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "validationmsg": "Enter a Card Number",
        "placeholder": "Card Number"
      },
      {
        "name": "ReEnterCardNumber",
        "label": "Re-enter Card Number",
        "inputType": "text",
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Re-enter Card Number",
        "placeholder": "Re-enter Card Number"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "CardType",
        "label": "Card Type",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Card Type",
        "placeholder": "Card Type"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Date",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Preferred Debit Date",
        "placeholder": "Preferred Debit Date"
      },
      {
        "name": "ExpiryDate",
        "label": "Expiry Date",
        "inputType": "text",
        "required": true,
        "validationmsg": "Expiry Date",
        "placeholder": "Expiry Date"
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
        "name": "Mode_New",
        "label": "New Mode Selected",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "New Mode Selected",
        "placeholder": "New Mode Selected"
      },
      {
        "name": "ModalPremium",
        "label": "New Modal Premium",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "New Modal Premium",
        "placeholder": "New Modal Premium"
      },
      {
        "name": "MandateRegistrationStatus",
        "label": "Mandate Registration Status",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Mandate Registration Status",
        "placeholder": "Mandate Registration Status"
      },
      {
        "name": "RequestIDNumber",
        "label": "Request ID Number",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request ID Number"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason For Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "hide": true,
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
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Request Mode",
        "placeholder": "Select a Request Mode"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "radio",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      },
      {
        "name": "Comments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
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
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "paymentlink": {
    "isShowBOE": true,
    "isPOSScreen": false,
    "hideRequestDetails": true,
    "hideChecklist": true,
    "isHideRequirementBtn": true,
    "showEmailFields": true,
    "BOE_Details": [
      {
        "name": "totalPremiumDue",
        "label": "Total Premium Due",
        "inputType": "text",
        "linkValue": "Click for details",
        "required": false,
        "validationmsg": "Total Premium Due is Missing",
        "disabled": true,
        "placeholder": "Total Premium Due"
      },
      {
        "name": "interestamt",
        "label": "Interest Amount",
        "inputType": "texts",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "Interest Amount"
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
        "name": "sendpaymentlink2",
        "label": "Share payment link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ]
  },
  "newmandateregistration": {
    "NACH_Details": [
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Method",
        "placeholder": "Payment Method"
      },
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "hide": false,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "hide": false,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "hide": false,
        "disabled": true,
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "hide": false,
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "hide": false,
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ],
    "SI_Details": [],
    "Send_ModeChange_Link": [
      {
        "name": "SendModeChangeLink",
        "label": "Send New Mandate Registration Link",
        "inputType": "icons"
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
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Payment Method",
        "placeholder": "Payment Method"
      },
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "hide": false,
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "hide": false,
        "required": false,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "hide": false,
        "inputType": "text",
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "hide": false,
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "BankIFSC",
        "label": "Bank IFSC",
        "inputType": "text",
        "hide": false,
        "required": true,
        "validationmsg": "",
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "hide": false,
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "hide": false,
        "required": true,
        "validationmsg": "",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "hide": false,
        "inputType": "text",
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ]
  },
  "holdmandate": {
    "BOE_Details": [
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Payment Method"
      }
    ],
    "Send_ModeChange_Link": [
      {
        "name": "SendModeChangeLink",
        "label": "Send  NACH Link",
        "inputType": "icons"
      }
    ],
    "NACH_Details": [
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
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
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ],
    "SI_Details": [
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "CardType",
        "label": "Card Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Card Type",
        "placeholder": "Card Type"
      },
      {
        "name": "CardNumber",
        "label": "Card Number",
        "inputType": "text",
        "required": false,
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "validationmsg": "Card Number",
        "placeholder": "Card Number"
      },
      {
        "name": "Registeredon",
        "label": "Registered on",
        "inputType": "text",
        "required": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
      },
      {
        "name": "SIStatus",
        "label": "SI Status",
        "inputType": "text",
        "required": true,
        "validationmsg": "SI Status",
        "placeholder": "SI Status"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "required": true,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "SIvalidtill",
        "label": "SI valid till",
        "inputType": "text",
        "required": true,
        "validationmsg": "SI valid till",
        "placeholder": "SI valid till"
      }
    ],
    "Register_HOLD_Request": [
      {
        "name": "name",
        "label": "Check Billing Status",
        "inputType": "title"
      },
      {
        "name": "DueDate",
        "label": "Last Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Due Date",
        "placeholder": "Last Due Date"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "HoldPossibleForCurrentDue",
        "label": "Hold possible for current due",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Hold possible for current due",
        "placeholder": "Hold possible for current due"
      }
    ],
    "Register_HOLD_Requests": [
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      }
    ],
    "Customer_Choice_Details": [
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
        "name": "customerchoice",
        "label": "Request By",
        "inputType": "radio",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Request By",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "Request_Details": [
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
        "name": "name",
        "label": "View Current Mandate Details",
        "inputType": "title"
      },
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
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
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "disabled": true,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      },
      {
        "name": "DueDate",
        "label": "Last Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Due Date",
        "placeholder": "Last Due Date"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "File Sent To Bank Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "File Sent To Bank Status",
        "placeholder": "File Sent To Bank Status"
      },
      {
        "name": "HoldPossibleForCurrentDue",
        "label": "Cancel Possible for current due",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cancel Possible for current due",
        "placeholder": "Cancel Possible for current due"
      },
      {
        "name": "Reason",
        "label": "Reason For Cancellation",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Cancellation",
        "placeholder": "Reason For Cancellation"
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
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason For Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "hide": true,
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
        "inputType": "text",
        "required": false,
        "hide": true,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "mandatecancellation": {
    "BOE_Details": [
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Payment Method"
      }
    ],
    "NACH_Details": [
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
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
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "disabled": true,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Date",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ],
    "Register_HOLD_Request": [
      {
        "name": "name",
        "label": "Check Billing Status",
        "inputType": "title"
      },
      {
        "name": "DueDate",
        "label": "Last Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Due Date",
        "placeholder": "Last Due Date"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "HoldPossibleForCurrentDue",
        "label": "Cancel Possible for current due",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cancel Possible for current due",
        "placeholder": "Cancel Possible for current due"
      }
    ],
    "Customer_Choice_Details": [
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
        "name": "customerchoice",
        "label": "Request By",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Request By",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "Request_Details": [
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
        "name": "name",
        "label": "View Billing Status",
        "inputType": "title"
      },
      {
        "name": "DueDate",
        "label": "Last Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Due Date",
        "placeholder": "Last Due Date"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "HoldPossibleForCurrentDue",
        "label": "Cancel Possible for current due",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cancel Possible for current due",
        "placeholder": "Cancel Possible for current due"
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
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason For Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "hide": true,
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
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "restartmandate": {
    "BOE_Details": [
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Payment Method"
      }
    ],
    "NACH_Details": [
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
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
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "disabled": true,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ],
    "SI_Details": [
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "CardType",
        "label": "Card Type",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Card Type",
        "placeholder": "Card Type"
      },
      {
        "name": "CardNumber",
        "label": "Card Number",
        "inputType": "text",
        "required": false,
        "minlength": 16,
        "maxlength": 16,
        "pattern": "numbersOnly",
        "validationmsg": "Card Number",
        "placeholder": "Card Number"
      },
      {
        "name": "Registeredon",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
      },
      {
        "name": "SIStatus",
        "label": "SI Status",
        "inputType": "text",
        "required": false,
        "validationmsg": "SI Status",
        "placeholder": "SI Status"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "ExpiryDate",
        "label": "Expiry Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Expiry Date",
        "placeholder": "Expiry Date"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "SIvalidtill",
        "label": "SI valid till",
        "inputType": "text",
        "required": false,
        "validationmsg": "SI valid till",
        "placeholder": "SI valid till"
      }
    ],
    "Register_HOLD_Request": [
      {
        "name": "name",
        "label": "Check Billing Status",
        "inputType": "title"
      },
      {
        "name": "DueDate",
        "label": "Last Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Due Date",
        "placeholder": "Last Due Date"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "HoldPossibleForCurrentDue",
        "label": "Cancel Possible for current due",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Cancel Possible for current due",
        "placeholder": "Cancel Possible for current due"
      }
    ],
    "Customer_Choice_Details": [
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
        "name": "customerchoice",
        "label": "Request By",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Request By",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
      }
    ],
    "Request_Details": [
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
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason For Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "hide": true,
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
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "redebitstop": {
    "BOE_Details": [
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Payment Method"
      }
    ],
    "NACH_Details": [
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "RegisteredOn",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
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
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "disabled": true,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      }
    ],
    "Request_ReDebit_Details": [
      {
        "name": "ReDebitDate",
        "label": "Re-Debit Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Re-Debit Date",
        "placeholder": "Re-Debit Date"
      },
      {
        "name": "ReDebitAmt",
        "label": "Re-Debit Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Re-Debit Amount",
        "placeholder": "Re-Debit Amount"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "StopReDebitAllow",
        "label": "Stop Re-Debit Allowed",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Stop Re-Debit Allowed",
        "placeholder": "Stop Re-Debit Allowed"
      },
      {
        "name": "Reason",
        "label": "Reason For Not Allowing",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Not Allowing",
        "placeholder": "Reason For Not Allowing"
      },
      {
        "name": "ReasontoStopReDebit",
        "label": "Reason to Stop Re-Debit",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "validationmsg": "Reason to Stop Re-Debit",
        "placeholder": "Reason to Stop Re-Debit"
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
        "name": "name",
        "label": "View Current Mandate Details",
        "inputType": "title"
      },
      {
        "name": "NACHStatus",
        "label": "NACH Status",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "NACH Status",
        "placeholder": "NACH Status"
      },
      {
        "name": "Registeredon",
        "label": "Registered on",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Registered on",
        "placeholder": "Registered on"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Bank Name",
        "placeholder": "Bank Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Bank Account Number",
        "inputType": "number",
        "disabled": true,
        "pattern": "numbersOnly",
        "required": false,
        "validationmsg": "Enter a Bank Account Number",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "text",
        "required": true,
        "validationmsg": "",
        "disabled": true,
        "pattern": "charactersOnly",
        "placeholder": "Bank IFSC"
      },
      {
        "name": "PreferredDebitDate",
        "label": "Preferred Debit Day",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Preferred Debit Day",
        "placeholder": "Preferred Debit Day"
      },
      {
        "name": "MaxDebitAmounat",
        "label": "Max debit amt",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Max debit amt",
        "placeholder": "Max debit amt"
      },
      {
        "name": "NACHValidTill",
        "label": "NACH valid till",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "NACH valid till",
        "placeholder": "NACH valid till"
      },
      {
        "name": "ReDebitDate",
        "label": "Re-Debit Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Re-Debit Date",
        "placeholder": "Re-Debit Date"
      },
      {
        "name": "ReDebitAmt",
        "label": "Re-Debit Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Re-Debit Amount",
        "placeholder": "Re-Debit Amount"
      },
      {
        "name": "FilesenttoBankdate",
        "label": "Last Sent to Bank On",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Sent to Bank On",
        "placeholder": "Last Sent to Bank On"
      },
      {
        "name": "CancelPossibleforcurrentdue",
        "label": "Stop Re-Debit Allowed",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Stop Re-Debit Allowed",
        "placeholder": "Stop Re-Debit Allowed"
      },
      {
        "name": "Reason",
        "label": "Reason For Not Allowing",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Not Allowing",
        "placeholder": "Reason For Not Allowing"
      },
      {
        "name": "ReasontoStopReDebit",
        "label": "Reason to Stop Re-Debit",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason to Stop Re-Debit",
        "placeholder": "Reason to Stop Re-Debit"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "hide": false,
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Delayed Submission",
        "placeholder": "Reason For Delayed Submission"
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
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "POSComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "representcheque": {
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
        "inputType": "futuredates",
        "required": true,
        "disabled": false,
        "validationmsg": "Cheque Representation request date",
        "placeholder": "Cheque Representation request date"
      },
      {
        "name": "ReasonFor_Representation",
        "label": "Reason For Representation",
        "inputType": "text",
        "required": false,
        "validationmsg": "Reason For Representation",
        "placeholder": "Reason For Representation"
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
        "name": "branchreceiveddate",
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
    ],
    "PA_Details": [
      {
        "name": "ReceiptType",
        "label": "Receipt Type",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Receipt Type",
        "placeholder": "Receipt Type"
      },
      {
        "name": "ChequeNumber",
        "label": "Cheque Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "pattern": "numbersOnly",
        "validationmsg": "Cheque Number",
        "placeholder": "Cheque Number"
      },
      {
        "name": "ReceiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Receipt Number",
        "placeholder": "Receipt Number"
      },
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
        "name": "ChequeAmount",
        "label": "Cheque Amount",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Amount",
        "placeholder": "Cheque Amount"
      },
      {
        "name": "ChequeDate",
        "label": "Cheque Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Date",
        "placeholder": "Cheque Date"
      },
      {
        "name": "ChequeExpiryDate",
        "label": "Cheque Expiry Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Expiry Date",
        "placeholder": "Cheque Expiry Date"
      },
      {
        "name": "ChequeDrawnOnBankName",
        "label": "Cheque Drawn On Bank Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Drawn On Bank Name",
        "placeholder": "Cheque Drawn On Bank Name"
      },
      {
        "name": "ChequeRepresentationRequestDate",
        "label": "Cheque Representation Request Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Cheque Representation request date",
        "placeholder": "Cheque Representation request date"
      },
      {
        "name": "ReasonFor_Representation",
        "label": "Reason For Representation",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Representation",
        "placeholder": "Reason For Representation"
      },
      {
        "name": "RequestBy",
        "label": "Request By",
        "inputType": "radio",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Customer Choice",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform",
        "placeholder": "Customer Choice"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      },
      {
        "name": "ChequeReceived",
        "label": "Cheque Received at HO",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select Cheque Received at HO",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ChequeReDepositDate",
        "label": "Cheque ReDeposit Date",
        "inputType": "futuredates",
        "required": true,
        "hide": true,
        "validationmsg": "Select Cheque ReDeposit Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReceiptNo",
        "label": "Receipt No",
        "inputType": "number",
        "pattern": "numbersOnly",
        "maxlength": 8,
        "minlength": 8,
        "required": true,
        "hide": true,
        "validationmsg": "Receipt No",
        "placeholder": "Receipt No"
      },
      {
        "name": "AuthorizerComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "disabled": false,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "renewalstatusenquiry": {
    "Comments": [
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
    ]
  },
  "renewalpaymentoptions": {
    "Comments": [
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
    ]
  }
};