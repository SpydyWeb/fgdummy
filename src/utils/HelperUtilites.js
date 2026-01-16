import dayjs from "dayjs";

const formatDateSafe = (dateInput, format = "DD/MM/YYYY") => {
  if (!dateInput) return "-";

  try {
    // Handle YYYYMMDD (e.g. 20250109)
    if (typeof dateInput === "string" && /^\d{8}$/.test(dateInput)) {
      const y = dateInput.substring(0, 4);
      const m = dateInput.substring(4, 6);
      const d = dateInput.substring(6, 8);
      return dayjs(`${y}-${m}-${d}`).format(format);
    }

    const d = dayjs(dateInput);
    return d.isValid() ? d.format(format) : String(dateInput);
  } catch {
    return String(dateInput);
  }
};

const formatAmountSafe = (amount) => {
  if (amount === null || amount === undefined || amount === "") return "-";
  const parsed = parseFloat(amount);
  if (Number.isNaN(parsed)) return amount;
  return parsed.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const maskMobileNumber = (phone) => {
  if (!phone || phone.length < 4) return phone;
  return phone.trim().slice(0, -4).replace(/\d/g, "*") + phone.trim().slice(-4);
};

const filterOption = (input, option) =>
  String(option?.label ?? "")
    .toLowerCase()
    .includes(input.toLowerCase());

const transformData = (data, keyy) => {
  if (data.length === 0) return [];
  const entry = data?.find((ele) => ele.key === keyy);

  return entry.value.map((item) => {
    const base = {
      ...item,
      label: item.mstDesc,
    };

    if (keyy === "CALL_TYP") {
      return { ...base, isCallType: true };
    }

    if (keyy === "SUB_TYP") {
      return { ...base, isSubType: true };
    }

    if (keyy === "MARTIAL_ST" || keyy === "SALUTATION") {
      return { ...base, value: item.extrL_KEY };
    }

    return { ...base, value: item.mstID };
  });
};
export {
  transformData,
  filterOption,
  maskMobileNumber,
  formatDateSafe,
  formatAmountSafe,
};
