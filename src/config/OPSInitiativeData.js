export const OPSInitiativeData = {
  "nblead": {
    "BOE_Details": [
      {
        "name": "LeadOf",
        "label": "Lead Of",
        "inputType": "dropdown",
        "required": true,
        "validationmsg": "Select Lead Of",
        "placeholder": "Lead Of"
      },
      {
        "name": "ProspectName",
        "label": "Prospect Name",
        "inputType": "text",
        "hide": true,
        "required": true,
        "validationmsg": "Enter Prospect Name",
        "placeholder": "Prospect Name"
      },
      {
        "name": "ContactNumber",
        "label": "Contact Number",
        "inputType": "number",
        "hide": true,
        "pattern": "numbersOnly",
        "required": true,
        "maxlength": 10,
        "minlength": 10,
        "message": "Enter 10 Digits",
        "validationmsg": "Enter Contact Number",
        "placeholder": "Contact Number"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "fieldvisit": {
    "BOE_Details": [
      {
        "name": "ReasonForFieldVisit",
        "label": "Reason For Field Visit",
        "inputType": "text",
        "required": true,
        "validationmsg": "Reason For Field Visit",
        "placeholder": "Reason For Field Visit"
      },
      {
        "name": "ConductedOn",
        "label": "Conducted On",
        "inputType": "date",
        "required": true,
        "validationmsg": "Select a Conducted On",
        "placeholder": "ConductedOn"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "customerportalregistration": {
    "BOE_Details": [
      {
        "name": "SendCustomerPortalRegistrationlink",
        "label": "Send Customer Portal Registration  link",
        "inputType": "icons",
        "required": true,
        "validationmsg": "Send Customer Portal Registration  link"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "advisorportalregistration": {
    "BOE_Details": [
      {
        "name": "SendAdvisorPortalRegistration",
        "label": "Send Advisor Portal Registration",
        "inputType": "icons",
        "required": true,
        "validationmsg": "Send Advisor Portal Registration"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "whatsappregistration": {
    "BOE_Details": [
      {
        "name": "SendWhatsAppRegistrationlink",
        "label": "Send Whats App Registration link",
        "inputType": "icons",
        "required": true,
        "validationmsg": "Send Whats App Registration link"
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
        "label": "Requestor  Comments",
        "inputType": "textarea",
        "maxlength": 500,
        "required": false,
        "validationmsg": "Enter Comments",
        "placeholder": "Comment Box"
      }
    ]
  },
  "generalinsurancecall": {
    "BOE_Details": [
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
    ]
  }
};