export const RevivalData = {
  "revivalquotation": {
    "BOE_Details": [
      {
        "name": "outofRevival",
        "label": "Is Policy within Revival Period",
        "inputType": "text",
        "required": false,
        "validationmsg": "Total Premium Due",
        "placeholder": "Is Policy within Revival Period",
        "disabled": true
      },
      {
        "name": "totalPremiumDue",
        "label": "Total Premium Due",
        "inputType": "text",
        "linkValue": "Click for bifurcations",
        "disabled": true,
        "placeholder": "Total Premium Due"
      },
      {
        "name": "overduePeriod",
        "label": "Overdue period",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Overdue period",
        "placeholder": "Overdue period",
        "disabled": true
      },
      {
        "name": "DGHRequired",
        "label": "DGH Required",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DGH Required",
        "disabled": true
      },
      {
        "name": "PremiumHoliday",
        "label": "Premium Holiday",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday",
        "disabled": true
      },
      {
        "name": "SendRevivalQuotation",
        "label": "Send Revival Quotation & Payment Link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
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
        "name": "emailId",
        "label": "Email ID",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Email ID",
        "disabled": true
      }
    ],
    "Out_Of_Revival": [
      {
        "name": "outOfRevival",
        "label": "Out Of Revival",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Out Of Revival",
        "placeholder": "Out Of Revival"
      }
    ],
    "Out_Of_Revival_Yes_Fields": [
      {
        "name": "totalPremiumDue",
        "label": "Total Premium Due",
        "inputType": "text",
        "hyperLink": true,
        "required": false,
        "validationmsg": "Total Premium Due",
        "placeholder": "Total Premium Due"
      },
      {
        "name": "overduePeriod",
        "label": "Overdue period",
        "inputType": "text",
        "required": false,
        "validationmsg": "Enter Overdue period",
        "placeholder": "Overdue period"
      },
      {
        "name": "InterestWaiverCampaign",
        "label": "Interest Waiver Campaign ",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver Campaign "
      },
      {
        "name": "InterestWaiverCampaignAmount",
        "label": "Interest Waiver Campaign Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Interest Waiver Campaign Amount"
      },
      {
        "name": "PremiumHoliday",
        "label": "Premium Holiday",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Premium Holiday"
      },
      {
        "name": "AmountPayableafterinterestwaiver",
        "label": "Amount Payable after interest waiver",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Amount Payable after interest waiver"
      },
      {
        "name": "SendRevivalQuotation",
        "label": "Send Revival Quotation and Payment Link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ],
    "POS_Details": [
      {
        "name": "DGHRequired",
        "label": "DGH Required",
        "inputType": "dropdown",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Out Of Revival",
        "placeholder": "DGH Required"
      },
      {
        "name": "paymentVia",
        "label": "Payment Via",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Payment Via",
        "placeholder": "Payment Via"
      }
    ],
    "Cash_Details": [
      {
        "name": "amount",
        "label": "Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Amount"
      },
      {
        "name": "receiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Receipt Number"
      },
      {
        "name": "uploadIncomeProof",
        "label": "Upload Income Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Income Proof",
        "placeholder": "Upload Income Proof"
      },
      {
        "name": "validdghform",
        "label": "",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Upload DGH Form",
        "secondTitle": "Fill DGH Form",
        "radioValue": "uploaddghform",
        "secondRadioValue": "filldghform"
      },
      {
        "name": "uploadDGHForm",
        "label": "Upload DGH Form",
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "Upload DGH Form",
        "placeholder": "Upload DGH Form"
      }
    ],
    "Cheque_Details": [
      {
        "name": "amount",
        "label": "Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Amount"
      },
      {
        "name": "receiptNumber",
        "label": "Receipt Number",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Receipt Number"
      },
      {
        "name": "chequeNumber ",
        "label": "Cheque Number ",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Cheque Number "
      },
      {
        "name": "ChequeDate ",
        "label": "Cheque Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "DD/MM/YYYY"
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
        "name": "uploadIncomeProof",
        "label": "Upload Income Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Income Proof",
        "placeholder": "Upload Income Proof",
        "indexName": "Revival DGH"
      },
      {
        "name": "validdghform",
        "label": "",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Upload DGH Form",
        "secondTitle": "Fill DGH Form",
        "radioValue": "uploaddghform",
        "secondRadioValue": "filldghform"
      },
      {
        "name": "uploadDGHForm",
        "label": "Upload DGH Form",
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "Upload DGH Form",
        "placeholder": "Upload DGH Form",
        "indexName": "Revival DGH"
      }
    ],
    "Online_Details": [
      {
        "name": "SendRevivalLink",
        "label": "Send Revival Link",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      },
      {
        "name": "uploadIncomeProof",
        "label": "Upload Income Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Income Proof",
        "placeholder": "Upload Income Proof",
        "indexName": "Revival DGH"
      },
      {
        "name": "validdghform",
        "label": "",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Upload DGH Form",
        "secondTitle": "Fill DGH Form",
        "radioValue": "uploaddghform",
        "secondRadioValue": "filldghform"
      },
      {
        "name": "uploadDGHForm",
        "label": "Upload DGH Form",
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "Upload DGH Form",
        "placeholder": "Upload DGH Form",
        "indexName": "Revival DGH"
      }
    ]
  },
  "revivalwithdgh": {
    "BOE_Details": [
      {
        "name": "IsPolicywithinRevivalPeriod",
        "label": "Is Policy within Revival Period",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "NoofDaysfromPTD",
        "label": "No of Days from PTD",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "No of Days from PTD"
      },
      {
        "name": "PlanType",
        "label": "Plan Type",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Plan Type"
      },
      {
        "name": "ProductCode",
        "label": "Product Code",
        "inputType": "text",
        "required": false,
        "placeholder": "Product Code",
        "disabled": true
      },
      {
        "name": "AreAllQuestionsInformationproperlyfilledinDGH",
        "label": "Are All Questions/Information properly filled in DGH?",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "Areanysupportingreportshealthquestionnairesgiven",
        "label": "Are any supporting reports/health questionnaires given?",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadDGHForm",
        "label": "Upload DGH Form",
        "inputType": "upload",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload DGH Form"
      },
      {
        "name": "UploadSupplementaryQuestionaires",
        "label": "Upload Supplementary Questionaires",
        "inputType": "upload",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Supplementary Questionaires"
      },
      {
        "name": "UploadSupportingDocuments",
        "label": "Upload Supporting Documents",
        "inputType": "upload",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Supporting Documents"
      },
      {
        "name": "UploadLifeAssuredIDProof",
        "label": "Upload Life Assured ID Proof",
        "inputType": "upload",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "Upload Life Assured ID Proof"
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
        "name": "ReasonForDelayedSubmission",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Reason For Delayed",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "SignatureValidated",
        "label": "Signature Validated",
        "inputType": "radio",
        "required": false,
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
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_Details": [
      {
        "name": "IsPolicywithinRevivalPeriod",
        "label": "Is Policy within Revival Period",
        "inputType": "text",
        "disabled": true,
        "required": false
      },
      {
        "name": "NoofDaysfromPTD",
        "label": "No of Days from PTD",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "No of Days from PTD"
      },
      {
        "name": "PlanType",
        "label": "Plan Type",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "placeholder": "Plan Type"
      },
      {
        "name": "ProductCode",
        "label": "Product Code",
        "inputType": "text",
        "required": false,
        "placeholder": "Product Code",
        "disabled": true
      },
      {
        "name": "AreAllQuestionsInformationproperlyfilledinDGH",
        "label": "Are All Questions/Information properly filled in DGH?",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "disabled": true
      },
      {
        "name": "Areanysupportingreportshealthquestionnairesgiven",
        "label": "Are any supporting reports/health questionnaires given?",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "disabled": true
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Mode",
        "placeholder": "Request Mode"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "RequestReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelayedSubmission",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "required": false,
        "placeholder": "Reason For Delayed Submission",
        "disabled": true
      },
      {
        "name": "SignatureValidated",
        "label": "Signature Validated",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "disabled": true
      },
      {
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box",
        "disabled": true
      },
      {
        "name": "GST",
        "label": "POS Action",
        "inputType": "title",
        "disabled": false,
        "required": false,
        "validationmsg": "GST",
        "placeholder": "GST"
      },
      {
        "name": "uwdecision",
        "label": "UW Decision",
        "inputType": "dropdown",
        "disabled": false,
        "required": false,
        "placeholder": "UW Decision"
      },
      {
        "name": "Updatelifeasia",
        "label": "Update Life Asia",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "RaiseRequestForRefund",
        "label": "Raise Request For Refund",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "enterTicketIDforRefund",
        "label": "Enter Ticket ID for Refund Code",
        "inputType": "text",
        "required": false,
        "placeholder": "Enter Ticket ID for Refund",
        "disabled": false
      },
      {
        "name": "AuthorizerComments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "disabled": false,
        "required": false,
        "validationmsg": "Authorizer Comments",
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
        "name": "validatesignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "placeholder": "Validate Signature"
      },
      {
        "name": "validatesignature",
        "label": "Request Form",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Request Form"
      },
      {
        "name": "dghcopy",
        "label": "DGH Copy",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "DGH Copy"
      },
      {
        "name": "covidquestionaire",
        "label": "Covid Questionaire",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Covid Questionaire"
      },
      {
        "name": "policyowner",
        "label": "Policy Owner ID Proof",
        "inputType": "upload",
        "required": false,
        "validationmsg": "",
        "placeholder": "Policy Owner ID Proof"
      },
      {
        "name": "dateoflastdelivery",
        "label": "Date of last delivery",
        "inputType": "date",
        "required": false,
        "validationmsg": "",
        "placeholder": ""
      }
    ]
  },
  "revivalpickup": {
    "BOE_Details": [
      {
        "name": "DuePremium",
        "label": "Due Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Due Premium",
        "placeholder": "Due Premium"
      },
      {
        "name": "LastPremiumPaymentMode",
        "label": "Last Premium Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Premium Payment Mode",
        "placeholder": "Last Premium Payment Mode"
      },
      {
        "name": "OutofRevival",
        "label": "Out of Revival",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Out of Revival",
        "placeholder": "Out of Revival"
      },
      {
        "name": "DGHrequried",
        "label": "DGH requried",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "DGH requried",
        "placeholder": "DGH requried"
      },
      {
        "name": "RevivalPickUpFor",
        "label": "Revival Pick Up For",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Revival Pick Up For",
        "placeholder": "Revival Pick Up For"
      },
      {
        "name": "PickUpDate",
        "label": "Pick Up Date",
        "inputType": "date",
        "required": false,
        "validationmsg": "Pick Up Date",
        "placeholder": "Pick Up Date"
      },
      {
        "name": "PickUpTime",
        "label": "Pick Up Time",
        "inputType": "time",
        "required": false,
        "validationmsg": "Pick Up Time",
        "placeholder": "Pick Up Time"
      },
      {
        "name": "PickUpAddress",
        "label": "Pick Up Address",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "validationmsg": "Select a Validate Siganture",
        "title": "Registered Address",
        "secondTitle": "New Address",
        "radioValue": "registeredaddress",
        "secondRadioValue": "newaddress"
      },
      {
        "name": "EnterAddress",
        "label": "Enter Address",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Address",
        "placeholder": "Enter Address"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Request Source",
        "placeholder": "Request Source"
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
        "name": "DuePremium",
        "label": "Due Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Due Premium",
        "placeholder": "Due Premium"
      },
      {
        "name": "LastPremiumPaymentMode",
        "label": "Last Premium Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Premium Payment Mode",
        "placeholder": "Last Premium Payment Mode"
      },
      {
        "name": "OutofRevival",
        "label": "Out of Revival",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Out of Revival",
        "placeholder": "Out of Revival"
      },
      {
        "name": "DGHrequried",
        "label": "DGH requried",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "DGH requried",
        "placeholder": "DGH requried"
      },
      {
        "name": "RevivalPickUpFor",
        "label": "Revival Pick Up For",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Revival Pick Up For",
        "placeholder": "Revival Pick Up For"
      },
      {
        "name": "PickUpDate",
        "label": "Pick Up Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Pick Up Date",
        "placeholder": "Pick Up Date"
      },
      {
        "name": "PickUpTime",
        "label": "Pick Up Time",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Pick Up Time",
        "placeholder": "Pick Up Time"
      },
      {
        "name": "PickUpAddress",
        "label": "Pick Up Address",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Select a Validate Siganture",
        "title": "Registered Address",
        "secondTitle": "New Address",
        "radioValue": "registeredaddress",
        "secondRadioValue": "newaddress"
      },
      {
        "name": "EnterAddress",
        "label": "Enter Address",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Address",
        "placeholder": "Enter Address"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Source",
        "placeholder": "Request Source"
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
  },
  "statusenquiry": {
    "ViewExisting_Details": [
      {
        "name": "OutofRevival",
        "label": "Out Of Revival",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Out Of Revival",
        "placeholder": "Out Of Revival"
      },
      {
        "name": "PaymentMethod",
        "label": "Payment Method",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Payment Method",
        "placeholder": "Payment Method"
      },
      {
        "name": "AutoPayStatus",
        "label": "Auto Pay Status",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Auto Pay Status",
        "placeholder": "Auto Pay Status"
      },
      {
        "name": "TotalBasePremium",
        "label": "Total Base Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Total Base Premium",
        "placeholder": "Total Base Premium"
      },
      {
        "name": "GST",
        "label": "GST",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "GST",
        "placeholder": "GST"
      },
      {
        "name": "InterestAmount",
        "label": "Interest Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Interest Amount",
        "placeholder": "Interest Amount"
      },
      {
        "name": "SuspenseAmount",
        "label": "Suspense Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Suspense Amount",
        "placeholder": "Suspense Amount"
      },
      {
        "name": "TotalDuePremium",
        "label": "Total Due Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Total Due Premium",
        "placeholder": "Total Due Premium"
      },
      {
        "name": "InterestWaiver",
        "label": "Interest Waiver",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Interest Waiver",
        "placeholder": "Interest Waiver"
      },
      {
        "name": "InterestWaiverAmount",
        "label": "Interest Waiver Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Interest Waiver Amount",
        "placeholder": "Interest Waiver Amount"
      },
      {
        "name": "OverDuePeriod",
        "label": "Over Due Period",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Over Due Period",
        "placeholder": "Over Due Period"
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
        "name": "DGHRequired",
        "label": "DGH Required",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "DGH Required",
        "placeholder": "DGH Required"
      },
      {
        "name": "PremiumHoliday",
        "label": "Premium Holiday",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Premium Holiday",
        "placeholder": "Premium Holiday"
      },
      {
        "name": "NumberofYearsPremiumPaid",
        "label": "Number of Years Premium Paid",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Number of Years Premium Paid",
        "placeholder": "Number of Years Premium Paid"
      }
    ],
    "Share_Process_Details": [
      {
        "name": "SharePaymentLink",
        "label": "Share Payment Link",
        "inputType": "icons",
        "required": true,
        "validationmsg": "Select Atleast One Communication"
      },
      {
        "name": "ShareRevialProcess",
        "label": "Share Revial Process",
        "inputType": "icons",
        "required": true,
        "validationmsg": "Select Atleast One Communication"
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
        "name": "DuePremium",
        "label": "Due Premium",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Due Premium",
        "placeholder": "Due Premium"
      },
      {
        "name": "LastPremiumPaymentMode",
        "label": "Last Premium Payment Mode",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Last Premium Payment Mode",
        "placeholder": "Last Premium Payment Mode"
      },
      {
        "name": "OutofRevival",
        "label": "Out of Revival",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Out of Revival",
        "placeholder": "Out of Revival"
      },
      {
        "name": "DGHrequried",
        "label": "DGH requried",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "DGH requried",
        "placeholder": "DGH requried"
      },
      {
        "name": "RevivalPickUpFor",
        "label": "Revival Pick Up For",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Revival Pick Up For",
        "placeholder": "Revival Pick Up For"
      },
      {
        "name": "PickUpDate",
        "label": "Pick Up Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Pick Up Date",
        "placeholder": "Pick Up Date"
      },
      {
        "name": "PickUpTime",
        "label": "Pick Up Time",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Pick Up Time",
        "placeholder": "Pick Up Time"
      },
      {
        "name": "PickUpAddress",
        "label": "Pick Up Address",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "Select a Validate Siganture",
        "title": "Registered Address",
        "secondTitle": "New Address",
        "radioValue": "registeredaddress",
        "secondRadioValue": "newaddress"
      },
      {
        "name": "EnterAddress",
        "label": "Enter Address",
        "inputType": "text",
        "hide": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Enter Address",
        "placeholder": "Enter Address"
      },
      {
        "name": "requestchannel",
        "label": "Request Mode",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Source",
        "placeholder": "Request Source"
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