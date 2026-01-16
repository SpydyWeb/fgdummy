export const ForeclosureData = {
  "foreclosurepayment": {
    "Case_Details": [
      {
        "name": "casestatus",
        "label": "Case Status",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Case Status",
        "disabled": true
      },
      {
        "name": "customertype",
        "label": "Customer Type",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Customer Type",
        "disabled": true
      },
      {
        "name": "assignment",
        "label": "Assignment",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Assignment",
        "disabled": true
      },
      {
        "name": "assigneename",
        "label": "Assignee Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Assignee Name",
        "disabled": true
      },
      {
        "name": "clienttype",
        "label": "Client Type",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Client Type",
        "disabled": true
      },
      {
        "name": "payouttype",
        "label": "Payout Type",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Payout Type",
        "disabled": true
      },
      {
        "name": "requestfor",
        "label": "Request For",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Request For",
        "disabled": true
      },
      {
        "name": "STP",
        "label": "STP",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "STP"
      },
      {
        "name": "childflag",
        "label": "Child CT/ST Flag",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Child CT/ST Flag",
        "disabled": true
      },
      {
        "name": "childstatus",
        "label": "Child CT/ST Status",
        "inputType": "link",
        "linkValue": "View",
        "required": false,
        "validationmsg": "Request Form",
        "placeholder": "Child CT/ST Status"
      },
      {
        "name": "personaldetailschange",
        "label": "Last 06 months personal Details Change",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "Payment_Details": [
      {
        "name": "paymentmethod",
        "label": "Payment Method",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Select Payment Method",
        "placeholder": "Payment Method"
      },
      {
        "name": "paymentduedate",
        "label": "Payment Due Date",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "Payment Due Date"
      },
      {
        "name": "tdsrate",
        "label": "TDS Rate",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "",
        "placeholder": "TDS Rate"
      },
      {
        "name": "tdsamount",
        "label": "TDS Amount",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "TDS Amount"
      },
      {
        "name": "outstandingloan",
        "label": "Outstanding loan",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "outstandingloanamount",
        "label": "Outstanding Loan Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Outstanding Loan Amount",
        "disabled": true
      },
      {
        "name": "payoutamount",
        "label": "Payout Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Payout Amount"
      }
    ],
    "Fund_Transfer": [
      {
        "name": "fundtransferto",
        "label": "Fund Transfer To",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Fund Transfer To"
      },
      {
        "name": "fundtransferamount",
        "label": "Fund Transfer Amount",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Fund Transfer Amount"
      },
      {
        "name": "relationtoftpolicy",
        "label": "Relation To FT Policy",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Relation To FT Policy"
      },
      {
        "name": "nameofftpolicyowner",
        "label": "Name of FT Policy Owner",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name of FT Policy Owner"
      }
    ],
    "KYC_Details": [
      {
        "name": "pan",
        "label": "PAN",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "PAN",
        "disabled": true
      },
      {
        "name": "PANValidationResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "PAN Validation Result",
        "disabled": true
      },
      {
        "name": "revalidatepan",
        "label": "Re-Validate PAN",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "enterpan",
        "label": "Enter PAN",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "hide": true,
        "placeholder": "Enter PAN"
      },
      {
        "name": "nameonpan",
        "label": "Name on PAN",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Name on PAN"
      },
      {
        "name": "namematch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": false,
        "required": false,
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      }
    ],
    "Bank_Details": [
      {
        "name": "ifsc",
        "label": "IFSC",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "IFSC"
      },
      {
        "name": "bankname",
        "label": "Bank Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "Bank Name"
      },
      {
        "name": "branchname",
        "label": "Branch Name",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "disabled": true,
        "placeholder": "Branch Name"
      },
      {
        "name": "accountType",
        "label": "Account Type",
        "inputType": "text",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "Account Type"
      },
      {
        "name": "bankaccountnumber",
        "label": "Bank Account Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "pennydropresult",
        "label": "Penny Drop Result",
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Penny Drop Result"
      }
    ]
  }
};