import { FIELD_TYPES } from "../fieldTypes";

export const grievanceFormConfig = {
  sections: [
    {
      id: "customer",
      title: "Customer Information",
      columns: 2,
      gutter: 12,
      style: { padding: 24, marginBottom: 24 },
      fields: [
        {
          name: "policyNumber",
          label: "Policy Number",
          type: FIELD_TYPES.TEXT,
          rules: { required: true, length: 8, numeric: true }
        },
        {
          name: "customerType",
          label: "Customer Type",
          type: FIELD_TYPES.SELECT,
          options: [
            { label: "Individual", value: "individual" },
            { label: "Corporate", value: "corporate" }
          ],
          rules: { required: true }
        },
        {
          name: "companyName",
          label: "Company Name",
          type: FIELD_TYPES.TEXT,
          rules: { required: true },
          condition: {
            field: "customerType",
            equals: "corporate"
          }
        }
      ]
    },
    {
      id: "complaint",
      title: "Complaint Details",
      columns: 1,
      style: { padding: 24 },
      fields: [
        {
          name: "complaintDetails",
          label: "Complaint",
          type: FIELD_TYPES.TEXTAREA,
          rows: 6,
          rules: { required: true, min: 50 }
        },
        {
          name: "attachments",
          label: "Attachments",
          type: FIELD_TYPES.FILE,
          multiple: true
        }
      ]
    }
  ]
};
