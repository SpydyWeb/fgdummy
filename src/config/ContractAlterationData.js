export const ContractAlterationData = {
  "changeinname": {
    "Existing_Details": [
      {
        "name": "Update_Existing",
        "label": "View Existing Details Of ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "View Existing Details Of ?",
        "placeholder": "Select View Existing Details Of ?"
      },
      {
        "name": "Salutation_Old",
        "label": "Salutation ",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Salutation Missing",
        "placeholder": "Salutation"
      },
      {
        "name": "FirstName_Old",
        "label": "First Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "First Name Missing",
        "placeholder": "Enter First Name"
      },
      {
        "name": "LastName_Old",
        "label": "Last Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Last Name Missing",
        "placeholder": "Enter Last Name"
      }
    ],
    "Update_New_Details": [
      {
        "name": "ModifiedClientID",
        "label": "Update Details For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Update Details For ?",
        "placeholder": "Select Update Details For ?"
      },
      {
        "name": "ModifiedClientID",
        "label": "Update New Details Of ?",
        "inputType": "dropdown",
        "hide": true,
        "required": true,
        "validationmsg": "Select a Update New Details Of",
        "placeholder": "Select Update New Details Of"
      },
      {
        "name": "Salutation_New",
        "label": "Salutation ",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select a Salutation",
        "placeholder": "Salutation"
      },
      {
        "name": "Marital_New",
        "label": "Marital status ",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select a Marital status",
        "placeholder": "Marital status"
      },
      {
        "name": "gender",
        "label": "Gender ",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select a Gender",
        "placeholder": "Gender"
      },
      {
        "name": "FirstName_New",
        "label": "First Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter First Name",
        "placeholder": "Enter First Name"
      },
      {
        "name": "LastName_New",
        "label": "Last Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter Last Name",
        "placeholder": "Enter Last Name"
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
        "name": "Stage_Document",
        "label": "Error at NB Stage ?",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select a Error at NB Stage",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "RequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Changeor Correction in the Name"
      },
      {
        "name": "UploadNameChangeProof",
        "label": "Upload Name Change Proof",
        "inputType": "upload",
        "hide": false,
        "required": false,
        "validationmsg": "Upload Name Change Proof",
        "placeholder": "Upload Name Change Proof",
        "indexName": "Changeor Correction in the Name"
      },
      {
        "name": "idProof",
        "label": "Upload Inception ID Proof",
        "inputType": "text",
        "linkValue": "List of Acceptable ID Proofs",
        "required": true,
        "validationmsg": "",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Changeor Correction in the Name",
        "icon": "upload"
      },
      {
        "name": "Validate_Signature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select a Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "hide": true,
        "placeholder": "Reason for Delayed Submission"
      },
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
    "Share_Process_Details": [
      {
        "name": "ShareProcessCommunication ",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select a PAN update Process",
        "placeholder": "PAN update Process "
      }
    ],
    "POS_Details": [
      {
        "name": "ViewNewNameDetails",
        "label": "Edit New Name Details",
        "inputType": "title",
        "required": false,
        "icon": "edit"
      },
      {
        "name": "RefertoNBStageDocument",
        "label": "Error at NB Stage ?",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ModifiedClientID",
        "label": "Request For",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Request For",
        "placeholder": "Request For"
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
        "name": "Salutation_New",
        "label": "Salutation ",
        "inputType": "dropdown",
        "posEdit": true,
        "disabled": true,
        "required": false,
        "validationmsg": "Salutation ",
        "placeholder": "Salutation"
      },
      {
        "name": "FirstName_New",
        "label": "First Name",
        "inputType": "text",
        "posEdit": true,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Enter First Name"
      },
      {
        "name": "LastName_New",
        "label": "Last Name",
        "inputType": "text",
        "posEdit": true,
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "placeholder": "Enter Last Name"
      },
      {
        "name": "DedupeMatch",
        "label": "OFAC List Match",
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
        "name": "ValidateSignature",
        "label": "Validate Signature",
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
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": true,
        "hide": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "Comments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "Comment",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
      }
    ]
  },
  "panupdate": {
    "Existing_PAN_Details": [
      {
        "name": "PanUpdateFor_Old",
        "label": "View PAN For",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "View PAN For",
        "placeholder": "View PAN For"
      },
      {
        "name": "DOB_Old",
        "label": "DOB",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "DOB",
        "placeholder": "DOB"
      },
      {
        "name": "ExistingPanNo",
        "label": "Existing PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Existing PAN",
        "placeholder": "Existing PAN"
      }
    ],
    "Update_PAN_Details": [
      {
        "name": "PanUpdateFor_New",
        "label": "Update PAN For",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Update PAN Number Of",
        "placeholder": "Update PAN Number Of"
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
        "name": "Name_New",
        "label": "Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Name",
        "placeholder": "Name"
      },
      {
        "name": "DOB_New",
        "label": "DOB",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "DOB",
        "placeholder": "DOB"
      },
      {
        "name": "NewPanNo",
        "label": "Enter PAN",
        "inputType": "pannumber",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "message": "Enter 10 Digits",
        "validationmsg": "Enter PAN Number",
        "placeholder": "Enter PAN Number"
      },
      {
        "name": "PanValidation",
        "label": "PAN Validation Result",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "PAN Validation Result",
        "placeholder": "PAN Validation Result"
      },
      {
        "name": "NameinPAN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Name as per PAN"
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
      { name: "DOBinPAN",label: "DOB as per PAN",inputType: "text",disabled:true,placeholder:"DOB as per PAN"},
      {
        "name": "UploadPANCard",
        "label": "Upload PAN Card",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload PAN Card",
        "placeholder": "Upload PAN Card",
        "indexName": "Pan Card"
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
        "name": "BranchReceivedDate",
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
    "Share_Process_Details": [
      {
        "name": "PANupdateProcess ",
        "label": "PAN Update Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select a PAN update Process",
        "placeholder": "PAN update Process "
      }
    ],
    "POS_Details": [
      {
        "name": "PanUpdateFor_New",
        "label": "Update PAN For",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Update PAN Number Of",
        "placeholder": "Update PAN Number Of"
      },
      {
        "name": "NewPanNo",
        "label": "PAN",
        "inputType": "pannumber",
        "required": false,
        "disabled": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "message": "Enter 10 Digits",
        "validationmsg": "Enter PAN Number",
        "placeholder": "Enter PAN Number"
      },
      {
        "name": "PanValidation",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "placeholder": "PAN Validation Result"
      },
      {
        "name": "NameinPAN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Name as per PAN"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "disabled": true,
        "validationmsg": "Select Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "RequestType",
        "label": "Request Type",
        "inputType": "text",
        "disabled": true,
        "placeholder": "Request Type"
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
        "name": "RequestorComments",
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comments"
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
        "name": "validatesignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "hide": true,
        "validationmsg": "Select Validate Signature",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "PANDetailsCorrect",
        "label": "Are PAN Details Correct?",
        "inputType": "radio",
        "disabled": false,
        "required": true,
        "validationmsg": "Select PAN Details Correct",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "ReEnterPanNo_New",
        "label": "Enter PAN",
        "inputType": "pannumber",
        "required": true,
        "hide": true,
        "disabled": false,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "message": "Enter 10 Digits",
        "validationmsg": "Enter PAN Number",
        "placeholder": "Enter PAN Number"
      },
      {
        "name": "PANRevalidationResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "hide": true,
        "required": false,
        "validationmsg": "PAN Revalidation Result",
        "placeholder": "PAN Revalidation Result"
      },
      {
        "name": "NameinPANN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "hide": true,
        "placeholder": "Name as per PAN"
      },
      {
        "name": "POSNameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "required": false,
        "hide": true,
        "validationmsg": "Select Name Match",
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
        "disabled": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Authorizer Comments"
      }
    ]
  },
  "gstinupdate": {
    "Existing_GSTIN_Details": [
      {
        "name": "ExistingGSTINNumber",
        "label": "GSTIN Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "GSTIN Number is missing",
        "placeholder": "GSTIN Number"
      }
    ],
    "Update_GSTIN_Details": [
      {
        "name": "NewGSTINNumber",
        "label": "GSTIN Number",
        "inputType": "gstinnumber",
        "required": true,
        "minlength": 15,
        "maxlength": 15,
        "validationmsg": "GSTIN Number",
        "placeholder": "GSTIN Number"
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
        "name": "UploadGSTINCertificate",
        "label": "Upload GSTIN Certificate",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload GSTIN Certificate",
        "placeholder": "Upload GSTIN Certificate",
        "indexName": "Minor Alteration"
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
        "name": "EditDetails",
        "label": "Edit Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "ExistingGSTINNumber",
        "label": "Existing GSTIN Number",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Existing GSTIN Number",
        "placeholder": "Existing GSTIN Number"
      },
      {
        "name": "NewGSTINNumber",
        "label": "New GSTIN Number",
        "inputType": "gstinnumber",
        "minlength": 15,
        "maxlength": 15,
        "required": true,
        "disabled": true,
        "validationmsg": "New GSTIN Number",
        "placeholder": "New GSTIN Number",
        "posEdit": true
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
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "disabled": true,
        "validationmsg": "Comments",
        "placeholder": "Branch Comment"
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
  "changeinownership": {
    "Existing_Owner_Details": [
      {
        "name": "ClientId_Old",
        "label": "Existing Client Code",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Existing Client Code",
        "placeholder": "Existing Client Code"
      },
      {
        "name": "ProposerFirstName_Old",
        "label": "Proposer First Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Proposer First Name",
        "placeholder": "Proposer First Name"
      },
      {
        "name": "ProposerLastName_Old",
        "label": "Proposer Last Name",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Proposer Last Name",
        "placeholder": "Proposer Last Name"
      },
      {
        "name": "ProposerDOB_Old",
        "label": "Proposer DOB",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Proposer DOB",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "AddressLine1_Old",
        "label": "Address Line 1",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Address Line 1",
        "placeholder": "Address Line 1"
      },
      {
        "name": "AddressLine2_Old",
        "label": "Address Line 2",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Address Line 2",
        "placeholder": "Address Line 2"
      },
      {
        "name": "AddressLine3_Old",
        "label": "Landmark",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Landmark",
        "placeholder": "Landmark"
      },
      {
        "name": "PINCode_Old",
        "label": "Pin Code",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Pin Code",
        "placeholder": "Pin Code"
      },
      {
        "name": "City_Old",
        "label": "City",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "City",
        "placeholder": "City"
      },
      {
        "name": "State_Old",
        "label": "State",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "State",
        "placeholder": "State"
      },
      {
        "name": "MobileNumber_Old",
        "label": "Proposer Mobile Number ",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Proposer Mobile Number ",
        "placeholder": "Proposer Mobile Number "
      },
      {
        "name": "ProposerEmailID_Old",
        "label": "Proposer Email ID",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "Proposer Email ID",
        "placeholder": "Proposer Email ID"
      },
      {
        "name": "ProposerPANNumber_Old",
        "label": "Proposer PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PAN"
      }
    ],
    "Update_NEW_Owner_Details": [
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
        "name": "Salutation",
        "label": "Salutation",
        "inputType": "dropdown",
        "required": true,
        "disabled": false,
        "validationmsg": "Salutation",
        "placeholder": "Salutation"
      },
      {
        "name": "MaritialStatus",
        "label": "Marital Status",
        "inputType": "dropdown",
        "required": true,
        "disabled": false,
        "validationmsg": "Marital Status",
        "placeholder": "Marital Status"
      },
      {
        "name": "ProposerFirstName_New",
        "label": "New Proposer First Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "New Proposer First Name",
        "placeholder": "New Proposer First Name"
      },
      {
        "name": "ProposerLastName_New",
        "label": "New Proposer Last Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "New Proposer Last Name",
        "placeholder": "New Proposer Last Name"
      },
      {
        "name": "ProposerDOB_New",
        "label": "New Proposer DOB",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "New Proposer DOB",
        "placeholder": "New Proposer DOB"
      },
      {
        "name": "AddressLine1_New",
        "label": "Address Line 1",
        "inputType": "AddressLine",
        "pattern": "NumbersAlphabetscommaonly",
        "required": true,
        "validationmsg": "Address Line 1",
        "placeholder": "Address Line 1"
      },
      {
        "name": "AddressLine2_New",
        "label": "Address Line 2",
        "inputType": "AddressLine",
        "pattern": "NumbersAlphabetscommaonly",
        "required": true,
        "validationmsg": "Address Line 2",
        "placeholder": "Address Line 2"
      },
      {
        "name": "AddressLine3_New",
        "label": "Landmark",
        "inputType": "AddressLine",
        "pattern": "NumbersAlphabetscommaonly",
        "required": true,
        "validationmsg": "Landmark",
        "placeholder": "Landmark"
      },
      {
        "name": "PINCode",
        "label": "Pin Code",
        "inputType": "number",
        "pattern": "numbersOnly",
        "maxlength": 6,
        "minlength": 6,
        "required": true,
        "validationmsg": "Pin Code",
        "placeholder": "Pin Code"
      },
      {
        "name": "City_New",
        "label": "City",
        "inputType": "text",
        "required": true,
        "validationmsg": "City",
        "placeholder": "City",
        "disabled": false
      },
      {
        "name": "State_New",
        "label": "State",
        "inputType": "text",
        "required": true,
        "validationmsg": "State",
        "placeholder": "State",
        "disabled": false
      },
      {
        "name": "MobileNumber_New",
        "label": "New Proposer Mobile Number ",
        "pattern": "numbersOnly",
        "inputType": "phonenumber",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "New Proposer Mobile Number ",
        "placeholder": "New Proposer Mobile Number "
      },
      {
        "name": "ProposerEmailID_New",
        "label": "New Proposer Email ID",
        "inputType": "email",
        "required": true,
        "validationmsg": "New Proposer Email ID",
        "placeholder": "New Proposer Email ID"
      },
      {
        "name": "RelationtoLifeAssured",
        "label": "Relation to Life Assured",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Relation to Life Assured ",
        "placeholder": "Relation to Life Assured"
      },
      {
        "name": "PANNumber",
        "label": "PAN",
        "inputType": "pannumber",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "validationmsg": "PAN Number",
        "placeholder": "PAN"
      },
      {
        "name": "PANResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "PAN Number",
        "placeholder": "PAN Validation Result"
      },
      {
        "name": "NameinPANN",
        "label": "Name as per PAN",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Name as per PAN",
        "placeholder": "Name as per PAN"
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
        "name": "ReasonForOwnershipChange",
        "label": "Reason For Ownership Change",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Ownership Change",
        "placeholder": "Reason For Ownership Change"
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
        "name": "EnterBankAccountDetails",
        "label": "Update Bank Details of New Owner",
        "inputType": "title",
        "required": false,
        "validationmsg": "Enter Bank Account Details",
        "placeholder": "Enter Bank Account Details"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "required": true,
        "minlength": 11,
        "maxlength": 11,
        "validationmsg": "Enter IFSC",
        "placeholder": "IFSC"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Bank Name",
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
        "label": "Bank Account Number",
        "inputType": "number",
        "required": true,
        "validationmsg": "",
        "pattern": "numbersOnly",
        "placeholder": "Bank Account Number"
      },
      {
        "name": "ConfirmBankAccountNumber",
        "label": "Re-Enter Bank Account Number",
        "inputType": "number",
        "pattern": "numbersOnly",
        "required": true,
        "validationmsg": "Re-Enter Bank Account Number",
        "placeholder": "Re-enter Bank Account Number"
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
        "name": "NameasperPennyDrop",
        "label": "Name as per Penny Drop",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Name as per Penny Drop",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NamematchasperPennyDrop",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": false,
        "required": true,
        "validationmsg": "Select Name match as per Penny Drop",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadDocumentsForOwnershipChange",
        "label": "Upload Documents For Ownership Change",
        "inputType": "title"
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
        "name": "UploadDeathCertificateOfOldProposer",
        "label": "Upload Death Certificate Of Old Proposer",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Death Certificate Of Old Proposer",
        "placeholder": "Upload Death Certificate Of Old Proposer"
      },
      {
        "name": "UploadLegalHeirCertificate",
        "label": "Upload Legal Heir Certificate",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Legal Heir Certificate",
        "placeholder": "Upload Legal Heir Certificate"
      },
      {
        "name": "UploadPANCard",
        "label": "Upload PAN Card",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload PAN Card",
        "placeholder": "Upload PAN Card"
      },
      {
        "name": "UploadBankAccountProof",
        "label": "Upload Bank Account Proof",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Bank Account Proof",
        "placeholder": "Upload Bank Account Proof"
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
        "indexName": "Change in Ownership",
        "icon": "upload"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": " List of Acceptable ID proofs",
        "required": true,
        "validationmsg": "Upload ID Proof",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Change in Ownership",
        "icon": "upload"
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
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "disabled": false,
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
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      }
    ],
    "ReasonSubmission": [],
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
    "Share_Process_Communication": [
      {
        "name": "ShareProcessCommunication",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select Share Soft Copy Policy Documnet"
      }
    ],
    "POS_UpdateNomineeTitle": [
      {
        "name": "NewNomineeAppointeeDetails",
        "label": "New Nominee/Appointee Details",
        "inputType": "title",
        "icon": "edit"
      }
    ],
    "POS_Details": [
      {
        "name": "NewOwnershipDetails",
        "label": "New Ownership Details",
        "inputType": "title",
        "icon": "edit"
      },
      {
        "name": "NewOwnerClientID",
        "label": "Search By Client ID",
        "inputType": "suffix",
        "required": false,
        "posEdit": true,
        "disabled": true,
        "validationmsg": "Search By Client ID",
        "placeholder": "Search By Client ID"
      },
      {
        "name": "Salutation",
        "label": "Salutation",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "posEdit": true,
        "validationmsg": "Salutation",
        "placeholder": "Salutation"
      },
      {
        "name": "MaritialStatus",
        "label": "Marital Status",
        "inputType": "dropdown",
        "required": true,
        "disabled": true,
        "posEdit": true,
        "validationmsg": "Marital Status",
        "placeholder": "Marital Status"
      },
      {
        "name": "ProposerFirstName_New",
        "label": "New Proposer First Name",
        "inputType": "text",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "New Proposer First Name",
        "placeholder": "New Proposer First Name"
      },
      {
        "name": "ProposerLastName_New",
        "label": "New Proposer Last Name",
        "inputType": "text",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "New Proposer Last Name",
        "placeholder": "New Proposer Last Name"
      },
      {
        "name": "ProposerDOB_New",
        "label": "New Proposer DOB",
        "inputType": "nofuturedates",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "New Proposer DOB",
        "placeholder": "New Proposer DOB"
      },
      {
        "name": "AddressLine1_New",
        "label": "Address Line 1",
        "inputType": "text",
        "pattern": "addressline",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Address Line 1",
        "placeholder": "Address Line 1"
      },
      {
        "name": "AddressLine2_New",
        "label": "Address Line 2",
        "inputType": "text",
        "pattern": "addressline",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Address Line 2",
        "placeholder": "Address Line 2"
      },
      {
        "name": "AddressLine3_New",
        "label": "Landmark",
        "inputType": "text",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "Landmark",
        "placeholder": "Landmark"
      },
      {
        "name": "PINCode",
        "label": "Pin Code",
        "inputType": "number",
        "pattern": "numbersOnly",
        "disabled": true,
        "maxlength": 6,
        "minlength": 6,
        "posEdit": true,
        "required": false,
        "validationmsg": "Pin Code",
        "placeholder": "Pin Code"
      },
      {
        "name": "City_New",
        "label": "City",
        "inputType": "text",
        "required": false,
        "posEdit": true,
        "disabled": false,
        "validationmsg": "City",
        "placeholder": "City"
      },
      {
        "name": "State_New",
        "label": "State",
        "inputType": "text",
        "required": false,
        "disabled": false,
        "posEdit": true,
        "validationmsg": "State",
        "placeholder": "State"
      },
      {
        "name": "MobileNumber_New",
        "label": "New Proposer Mobile Number ",
        "pattern": "numbersOnly",
        "inputType": "phonenumber",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "New Proposer Mobile Number ",
        "placeholder": "New Proposer Mobile Number "
      },
      {
        "name": "ProposerEmailID_New",
        "label": "New Proposer Email ID",
        "inputType": "email",
        "required": false,
        "disabled": true,
        "posEdit": true,
        "validationmsg": "New Proposer Email ID",
        "placeholder": "New Proposer Email ID"
      },
      {
        "name": "RelationtoLifeAssured",
        "label": "Relation to Life Assured",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Relation to Life Assured ",
        "placeholder": "Relation to Life Assured"
      },
      {
        "name": "PANNumber",
        "label": "PAN",
        "inputType": "pannumber",
        "maxlength": 10,
        "minlength": 10,
        "pattern": "charactersOnly",
        "disabled": true,
        "posEdit": true,
        "required": true,
        "validationmsg": "PAN Number",
        "placeholder": "PAN Number"
      },
      {
        "name": "PANResult",
        "label": "PAN Validation Result",
        "inputType": "text",
        "disabled": true,
        "posEdit": true,
        "required": false,
        "validationmsg": "PAN Validation Result",
        "placeholder": "PAN Validation Result"
      },
      {
        "name": "NameMatch",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": true,
        "required": false,
        "posEdit": true,
        "validationmsg": "Name Match",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
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
        "hide": true,
        "disabled": true,
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
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
        "name": "EnterBankAccountDetails",
        "label": "Bank Account Details",
        "inputType": "title",
        "icon": "edit",
        "required": false,
        "validationmsg": "Enter Bank Account Details",
        "placeholder": "Enter Bank Account Details"
      },
      {
        "name": "BankIFSC",
        "label": "IFSC",
        "inputType": "ifsccodenumber",
        "disabled": true,
        "posBankEdit": true,
        "required": true,
        "validationmsg": "IFSC",
        "placeholder": "IFSC"
      },
      {
        "name": "BankName",
        "label": "Bank Name",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Bank Name",
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
        "disabled": true,
        "posBankEdit": true,
        "required": true,
        "validationmsg": "Account Type",
        "placeholder": "Account Type"
      },
      {
        "name": "NameAsMentionedInTheBank",
        "label": "Account Holder Name",
        "inputType": "text",
        "posBankEdit": true,
        "disabled": true,
        "required": true,
        "validationmsg": "Account Holder Name",
        "placeholder": "Account Holder Name"
      },
      {
        "name": "BankAccountNumber",
        "label": "Account Number",
        "inputType": "text",
        "disabled": true,
        "posBankEdit": true,
        "required": true,
        "validationmsg": "Account Number",
        "placeholder": "Account Number"
      },
      {
        "name": "InitiatePennyDrop",
        "label": "Initiate Penny Drop",
        "inputType": "text",
        "hyperLink": true,
        "disabled": true,
        "posBankEdit": true,
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
        "validationmsg": "Name as per Penny Drop",
        "placeholder": "Name as per Penny Drop"
      },
      {
        "name": "NamematchasperPennyDrop",
        "label": "Name Match",
        "inputType": "radio",
        "disabled": true,
        "posBankEdit": true,
        "required": true,
        "validationmsg": "Select Name match as per Penny Drop",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "POSACTION",
        "label": "POS Action",
        "inputType": "title"
      },
      {
        "name": "BankDedupeCheck",
        "label": "Bank De-Dupe",
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
        "name": "NameDeDupeMatch",
        "label": "OFAC List Match",
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
        "name": "Comments",
        "label": "Authorizer Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter a Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "changeinterm": {
    "Existing_Term_Details": [
      {
        "name": "PlanName_Old",
        "label": "Plan Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Plan Name is Missing",
        "placeholder": "Plan Name"
      },
      {
        "name": "PolicyTerm_Old",
        "label": "Policy Term",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Policy Term is Missing",
        "placeholder": "Policy Term"
      },
      {
        "name": "CurrentPremium_Old",
        "label": "Current Premium",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Current Premium is Missing",
        "placeholder": "Current Premium"
      }
    ],
    "Update_Term_Details": [
      {
        "name": "NewTerm_New",
        "label": "New Policy Term",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a New Policy Term",
        "placeholder": "New Policy Term"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a Reason For Change",
        "placeholder": "Reason For Change"
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
    "Upload_Fields": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
    "Share_Process_Communication": [
      {
        "name": "ShareProcessCommunication",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select Share Soft Copy Policy Documnet"
      }
    ],
    "POS_Details": [
      {
        "name": "NewTerm_New",
        "label": "New Policy Term",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter aNew Policy Term",
        "placeholder": "New Policy Term"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Change",
        "placeholder": "Reason For Change"
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
        "hide": true,
        "disabled": true,
        "inputType": "text",
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
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
        "validationmsg": "Enter a Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "changeinsumassured": {
    "Existing_SumAssured_Details": [
      {
        "name": "SumAssured_Old",
        "label": "Sum Assured",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Existing Sum Assured is Missing",
        "placeholder": "Existing Sum Assured"
      },
      {
        "name": "CurrentPremium_Old",
        "label": "Current Premium",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Current Premium is Missing",
        "placeholder": "Current Premium"
      }
    ],
    "Update_SumAssured_Details": [
      {
        "name": "SumAssured_New",
        "label": "New Sum Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a New Sum Assured",
        "placeholder": "New Sum Assured"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change in Sum Assured",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a Reason For Change in Sum Assured",
        "placeholder": "Reason For Change in Sum Assured"
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
    "Upload_Fields": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Share_Process_Communication": [
      {
        "name": "ShareProcessCommunication",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select Share Soft Copy Policy Documnet"
      }
    ],
    "POS_Details": [
      {
        "name": "SumAssured_New",
        "label": "New Sum Assured",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Update New Sum Assured",
        "placeholder": "New Sum Assured"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change in Sum Assured",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Change in Sum Assured",
        "placeholder": "Reason For Change in Sum Assured"
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
        "validationmsg": "Select a Validate Signature",
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
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
  "changeinplan": {
    "Existing_Plan_Details": [
      {
        "name": "PlanName_Old",
        "label": "Plan Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Plan Name is Missing",
        "placeholder": "Plan Name"
      },
      {
        "name": "CurrentPremium_Old",
        "label": "Current Premium",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Current Premium is Missing",
        "placeholder": "Current Premium"
      }
    ],
    "Update_Plan_Details": [
      {
        "name": "NewPlan_New",
        "label": "New Plan",
        "inputType": "text",
        "required": true,
        "validationmsg": "New Plan",
        "placeholder": "New Plan"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Change",
        "placeholder": "Reason For Change"
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
    "Upload_Fields": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
        "validationmsg": "Select a Validate Signature",
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
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "Share_Process_Communication": [
      {
        "name": "ShareProcessCommunication",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select Share Soft Copy Policy Documnet"
      }
    ],
    "POS_Details": [
      {
        "name": "NewPlan_New",
        "label": "New Plan",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a New Plan",
        "placeholder": "New Plan"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Change",
        "placeholder": "Reason For Change"
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
        "hide": true,
        "disabled": true,
        "inputType": "text",
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
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
        "validationmsg": "Enter a Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "changeinpremium": {
    "Existing_Premium_Details": [
      {
        "name": "PlanName_Old",
        "label": "Plan Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Plan Name is Missing",
        "placeholder": "Plan Name"
      },
      {
        "name": "CurrentPremium_Old",
        "label": "Current Premium",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Current Premium is Missing",
        "placeholder": "Current Premium"
      }
    ],
    "Update_Premium_Details": [
      {
        "name": "NewPremium_New",
        "label": "New Premium",
        "inputType": "text",
        "required": true,
        "validationmsg": "New Premium",
        "placeholder": "New Premium"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Change",
        "placeholder": "Reason For Change"
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
    "Upload_Fields": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
        "validationmsg": "Select a Validate Signature",
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
    "Share_Process_Communication": [
      {
        "name": "ShareProcessCommunication",
        "label": "Share Process Communication",
        "inputType": "icons",
        "required": false,
        "validationmsg": "Select Share Soft Copy Policy Documnet"
      }
    ],
    "POS_Details": [
      {
        "name": "NewPremium_New",
        "label": "New Premium",
        "inputType": "text",
        "required": true,
        "validationmsg": "Enter a New Premium",
        "placeholder": "New Premium"
      },
      {
        "name": "ReasonForChange_New",
        "label": "Reason For Change",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Reason For Change",
        "placeholder": "Reason For Change"
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
        "hide": true,
        "disabled": true,
        "inputType": "text",
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
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
  "changeindob": {
    "Existing_DOB_Details": [
      {
        "name": "Update_Existing",
        "label": "Client Role",
        "inputType": "dropdown",
        "disabled": false,
        "required": true,
        "validationmsg": "Client Role",
        "placeholder": "Client Role"
      },
      {
        "name": "ExistingDateofBirth_Existing",
        "label": "Existing Date of Birth",
        "disabled": true,
        "inputType": "text",
        "required": true,
        "validationmsg": "Existing Date of Birth",
        "placeholder": "Existing Date of Birth"
      },
      {
        "name": "Age_Existing",
        "label": "Age",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Age",
        "placeholder": "Age"
      }
    ],
    "Update_DOB_Details": [
      {
        "name": "ModifiedClientID",
        "label": "Client Role",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Client Role",
        "placeholder": "Client Role"
      },
      {
        "name": "NewDateofBirth",
        "label": "New Date of Birth",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "New Date of Birth",
        "placeholder": "New Date of Birth"
      },
      {
        "name": "Age",
        "label": "Age",
        "inputType": "text",
        "required": true,
        "validationmsg": "Age",
        "placeholder": "Age",
        "disabled": true
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
        "name": "RefertoNBStageDocument",
        "label": "Error at NB Stage",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadDOBProof",
        "label": "Upload DOB Proof",
        "d_ErroratNB": true,
        "inputType": "upload",
        "hide": true,
        "required": true,
        "validationmsg": "Upload DOB Proof",
        "placeholder": "Upload DOB Proof"
      },
      {
        "name": "idProof",
        "label": "Upload ID Proof",
        "inputType": "text",
        "linkValue": " List of Acceptable ID proofs",
        "required": true,
        "validationmsg": "Upload ID Proof",
        "disabled": false,
        "placeholder": "Documents Uploaded - 0",
        "indexName": "Change in DOB",
        "icon": "upload"
      },
      {
        "name": "InitiateRequestBy",
        "label": "Initiate Request By",
        "inputType": "radio",
        "required": true,
        "validationmsg": "",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform"
      },
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "d_InitiateRequestBy": true,
        "hide": true,
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Address Proof",
        "placeholder": "Upload Address Proof"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "d_InitiateRequestBy": true,
        "hide": true,
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "d_InitiateRequestBy": true,
        "hide": true,
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission",
        "hide": true,
        "required": true
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "d_InitiateRequestBy": true,
        "hide": true,
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
    ],
    "RequestForm_Fields": [],
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
    "Share_Process_Document": [
      {
        "name": "ShareProcessDocument",
        "label": "Share Process Document",
        "inputType": "icons"
      }
    ],
    "POS_Details": [
      {
        "name": "ModifiedClientID",
        "label": "Client Role",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Client Role",
        "placeholder": "Client Role",
        "disabled": true
      },
      {
        "name": "NewDateofBirth",
        "label": "New Date  of Birth",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "New Date of Birth",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "Age",
        "label": "Age",
        "inputType": "text",
        "required": false,
        "validationmsg": "Age",
        "placeholder": "Age",
        "disabled": true
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
        "name": "RefertoNBStageDocument",
        "label": "Error at NB Stage",
        "inputType": "radio",
        "class": "disabled",
        "disabled": true,
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date",
        "hide": true
      },
      {
        "name": "BranchReceivedDate",
        "label": "Branch Received Date",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date",
        "hide": true
      },
      {
        "name": "ReasonForDelayy",
        "label": "Reason For Delayed Submission",
        "disabled": true,
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission",
        "hide": true
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "class": "disabled",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "hide": true,
        "thirdTitle": "NA",
        "thirdRadioValue": "na"
      },
      {
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments",
        "hide": true
      },
      {
        "name": "AreDetailsCorrect",
        "label": "Are Details Correct",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Select a Are Details Correct",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "POSNewDateofBirth",
        "label": "New Date  of Birth",
        "inputType": "nofuturedates",
        "hide": true,
        "required": true,
        "validationmsg": "New Date of Birth",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "POSAge",
        "label": "Age",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "hide": true,
        "validationmsg": "Age",
        "placeholder": "Age"
      },
      {
        "name": "ViewDocuments",
        "label": "POS Action",
        "inputType": "title"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "Life Asia Updated",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no",
        "hide": false
      },
      {
        "name": "ApprovalMail ",
        "label": "Upload UW Approval",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Approval Mails",
        "placeholder": "Upload UW Approval",
        "indexName": "Minor Alteration"
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
  "changeindobnomineeappointee": {
    "Existing_DOB_Details": [
      {
        "name": "ClientRole",
        "label": "Client Role",
        "inputType": "text",
        "required": false,
        "validationmsg": "Client Role",
        "placeholder": "Client Role"
      },
      {
        "name": "ExistingDateofBirth",
        "label": "Existing Date of Birth",
        "inputType": "text",
        "required": false,
        "validationmsg": "Existing Date of Birth",
        "placeholder": "Existing Date of Birth"
      },
      {
        "name": "Age",
        "label": "Age",
        "inputType": "text",
        "required": false,
        "validationmsg": "Age",
        "placeholder": "Age"
      }
    ],
    "Update_DOB_Details": [
      {
        "name": "custRole",
        "label": "Client Role",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Client Role",
        "placeholder": "Client Role"
      },
      {
        "name": "NewDateofBirth",
        "label": "New Date of Birth",
        "inputType": "date",
        "required": false,
        "validationmsg": "New Date of Birth",
        "placeholder": "New Date of Birth"
      },
      {
        "name": "Age",
        "label": "Age",
        "inputType": "text",
        "required": false,
        "validationmsg": "Age",
        "placeholder": "Age"
      },
      {
        "name": "RefertoNBStageDocument",
        "label": "Error at NB Stage",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "InitiateRequestBy",
        "label": "Initiate Request By",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "OTP",
        "secondTitle": "Request Form",
        "radioValue": "otp",
        "secondRadioValue": "requestform"
      }
    ],
    "RequestForm_Fields": [
      {
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "nofuturedate",
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedate",
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
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
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
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
    "Share_Process_Document": [
      {
        "name": "ShareProcessDocument",
        "label": "Send Change in DOB Process",
        "inputType": "icons"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Client Role",
        "inputType": "dropdown",
        "required": false,
        "validationmsg": "Client Role",
        "placeholder": "Client Role"
      },
      {
        "name": "NewDateofBirth",
        "label": "New Date of Birth",
        "inputType": "text",
        "required": false,
        "validationmsg": "New Date of Birth",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "ViewDocuments",
        "label": "View Documents",
        "inputType": "title"
      },
      {
        "name": "RefertoNBStageDocument",
        "label": "Error at NB Stage",
        "inputType": "radio",
        "required": false,
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "CustomerSigningDate",
        "label": "Customer Signing Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Customer Signing Date",
        "placeholder": "Customer Signing Date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "text",
        "required": false,
        "validationmsg": "Request Received Date",
        "placeholder": "Request Received Date"
      },
      {
        "name": "ReasonForDelay",
        "label": "Reason For Delayed Submission",
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Signature Validated",
        "inputType": "radio",
        "required": false,
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
  "additionofrider": {
    "BOE_Details": [
      {
        "name": "RiderName",
        "label": "Rider Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Rider Name",
        "placeholder": "Rider Name"
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
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
        "name": "RiderName",
        "label": "Rider Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Rider Name",
        "placeholder": "Rider Name"
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
        "validationmsg": "Select a Validate Signature",
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
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
  "deletionofrider": {
    "BOE_Details": [
      {
        "name": "RiderName",
        "label": "Rider Name",
        "inputType": "text",
        "required": true,
        "validationmsg": "Rider Name",
        "placeholder": "Rider Name"
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
        "name": "UploadRequestForm",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Upload Request Form",
        "indexName": "Minor Alteration"
      },
      {
        "name": "UploadSupportingDocument",
        "label": "Upload Supporting Document",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Upload Supporting Document",
        "placeholder": "Upload Supporting Document",
        "indexName": "Minor Alteration"
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
        "name": "RiderName",
        "label": "Rider Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "Rider Name",
        "placeholder": "Rider Name"
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
        "validationmsg": "Select a Validate Signature",
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
        "validationmsg": "Requestor Comments",
        "placeholder": "Requestor Comments"
      },
      {
        "name": "LifeAsiaUpdated",
        "label": "Life Asia Updated",
        "inputType": "radio",
        "required": true,
        "validationmsg": "required",
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
  "changeinsignature": {
    "BOE_Details": [
      {
        "name": "custRole",
        "label": "Signature to be Changed For ?",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Signature to be Changed For ",
        "placeholder": "Select"
      },
      {
        "name": "ExistingSignature",
        "label": "Existing Signature",
        "inputType": "link",
        "linkValue": "View",
        "required": false,
        "validationmsg": "Select Existing Signature",
        "placeholder": "Existing Signature"
      },
      {
        "name": "UpdateNewSignaure",
        "label": "Update New Signature",
        "inputType": "titlecheckbox",
        "required": false,
        "validationmsg": "Update New Signature",
        "placeholder": "Update New Signature"
      },
      {
        "name": "ShareSignatureUpdateProcess",
        "label": "Share Signature Update Process",
        "inputType": "titlecheckbox",
        "required": true,
        "validationmsg": "Share Signature Update Process",
        "placeholder": "Share Signature Update Process"
      }
    ],
    "Update_New_Signature_Fields": [
      {
        "name": "requestform",
        "label": "Upload Request Form",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload Request Form",
        "placeholder": "Request Form",
        "indexName": "Signature"
      },
      {
        "name": "addressProof",
        "label": "Signature Proof",
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
        "validationmsg": "Customer Signing Date",
        "placeholder": "Select a date"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "inputType": "nofuturedates",
        "required": true,
        "validationmsg": "Request Received Date",
        "placeholder": "Select a date"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "hide": true,
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission",
        "required": true,
        "validationmsg": "Reason for Delayed Submission"
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
    "Signature_Process_Fields": [
      {
        "name": "SignatureUpdateProcess",
        "label": "Signature Update Process",
        "inputType": "icons",
        "required": false,
        "validationmsg": "",
        "placeholder": "Send Via"
      }
    ],
    "POS_Details": [
      {
        "name": "custRole",
        "label": "Signature Updated For",
        "inputType": "dropdown",
        "disabled": true,
        "required": false,
        "validationmsg": "Select Signature updated",
        "placeholder": "Select"
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
        "disabled": true,
        "inputType": "text",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "BranchReceivedDate",
        "label": "Request Received Date",
        "disabled": true,
        "inputType": "text",
        "placeholder": "DD/MM/YYYY"
      },
      {
        "name": "resonfordelay",
        "label": "Reason For Delayed Submission",
        "hide": true,
        "disabled": true,
        "inputType": "text",
        "placeholder": "Reason for Delayed Submission"
      },
      {
        "name": "ValidateSignature",
        "label": "Validate Signature",
        "inputType": "radio",
        "class": "disabled",
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
      }
    ]
  },
  "agentcodecorrection": {
    "Existing_AgentCode_Details": [
      {
        "name": "AgentCode_Old",
        "label": "Existing Agent Code",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Existing Agent Code",
        "placeholder": "Existing Agent Code"
      }
    ],
    "Update_AgentCode_Details": [
      {
        "name": "AgentCode_New",
        "label": "New Agent Code",
        "inputType": "agentcode",
        "required": true,
        "validationmsg": "Enter New Agent Code",
        "placeholder": "New Agent Code"
      },
      {
        "name": "AgentName_New",
        "label": "Agent Name",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Agent Name",
        "placeholder": "Agent Name"
      },
      {
        "name": "Agent_Status",
        "label": "Agent Status",
        "inputType": "text",
        "required": true,
        "disabled": true,
        "validationmsg": "Agent Status",
        "placeholder": "Agent Status"
      },
      {
        "name": "Reasonforagentcodechange",
        "label": "Reason for Agent Code Change",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason for Agent Code Change",
        "placeholder": "Reason for Agent Code Change"
      },
      {
        "name": "Agnet_Application_Number",
        "label": "New Agent Application Number",
        "inputType": "text",
        "pattern": "charactersOnly",
        "maxlength": 12,
        "minlength": 12,
        "required": true,
        "validationmsg": "New Agent Application Number",
        "placeholder": "New Agent Application Number"
      },
      {
        "name": "AgentSignaturVerificationResult",
        "label": "Agent Signature Verification Result",
        "inputType": "radio",
        "required": true,
        "radioText": "Check Agent Signature in DMS",
        "validationmsg": "",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
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
        "name": "UploadCDF",
        "label": "CDF",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload CDF",
        "placeholder": "Upload CDF",
        "indexName": "Agent Confidential Report"
      },
      {
        "name": "ApprovalMail ",
        "label": "Approval Mails",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Approval Mails",
        "placeholder": "Approval Mails",
        "indexName": "Agent Confidential Report"
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
        "name": "AgentCode_New",
        "label": "New Agent Code",
        "inputType": "agentcode",
        "disabled": false,
        "required": false,
        "validationmsg": "",
        "placeholder": "New Agent Code"
      },
      {
        "name": "AgentName_New",
        "label": "Agent Name",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Agent Name"
      },
      {
        "name": "Agent_Status",
        "label": "Agent Status",
        "inputType": "text",
        "disabled": true,
        "required": true,
        "validationmsg": "",
        "placeholder": "Agent Status"
      },
      {
        "name": "Reasonforagentcodechange",
        "label": "Reason for Agent Code Change",
        "disabled": true,
        "inputType": "text",
        "required": false,
        "validationmsg": "",
        "placeholder": "Reason for Agent Code Change"
      },
      {
        "name": "Agnet_Application_Number",
        "label": "New Agent Application Number",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "New Agent Application Number",
        "placeholder": "NewAgent Application Number"
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
        "name": "BranchComments",
        "label": "Requestor Comments",
        "inputType": "text",
        "required": false,
        "disabled": true,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      },
      {
        "name": "AgentSignaturVerificationResult",
        "label": "Agent Signature Verification Result",
        "inputType": "radio",
        "radioText": "Check Agent Signature in DMS",
        "required": true,
        "disabled": true,
        "validationmsg": "Select Validation Result",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "MatchSouringCodeUnderNewCDFandOldCDF",
        "label": "Sourcing Code Matches New CDF",
        "inputType": "radio",
        "disabled": false,
        "required": true,
        "validationmsg": "Selecr New CDF",
        "title": "Yes",
        "secondTitle": "No",
        "radioValue": "yes",
        "secondRadioValue": "no"
      },
      {
        "name": "UploadPOSManagerApproval",
        "label": "Upload POS Manager Approval",
        "inputType": "upload",
        "required": true,
        "validationmsg": "Upload POS Manager Approval",
        "placeholder": "Upload POS Manager Approval",
        "indexName": "Agent Confidential Report"
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
  "policycontinuation": {
    "BOE_Details": [
      {
        "name": "PolicyContinuance",
        "label": "Policy Continuance",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Policy Continuance",
        "placeholder": "Policy Continuance"
      },
      {
        "name": "PolicytobeRevivedBy",
        "label": "Policy to be Revived By",
        "inputType": "date",
        "disabled": true,
        "required": false,
        "validationmsg": "Policy to be Revived By",
        "placeholder": "Policy to be Revived By"
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
        "name": "RequestForm",
        "label": "Request Form",
        "inputType": "upload",
        "required": false,
        "validationmsg": "Request Form",
        "placeholder": "Request Form",
        "indexName": "Minor Alteration"
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
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ],
    "POS_Details": [
      {
        "name": "PolicyContinuance",
        "label": "Policy Continuance",
        "inputType": "dropdown",
        "disabled": true,
        "required": true,
        "validationmsg": "Policy Continuance",
        "placeholder": "Policy Continuance"
      },
      {
        "name": "PolicytobeRevivedBy",
        "label": "Policy to be Revived By",
        "inputType": "text",
        "disabled": true,
        "required": false,
        "validationmsg": "Policy to be Revived By",
        "placeholder": "Policy to be Revived By"
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
        "required": true,
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
        "name": "Comments",
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