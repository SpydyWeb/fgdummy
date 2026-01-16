import React from "react";
import dayjs from "dayjs";

const DatePipe = ({ value, format = "DD/MM/YYYY | HH:mm" }) => {
  if (!value) return <span />;
  const d = dayjs(value);
  return <span>{d.isValid() ? d.format(format) : ""}</span>;
};

export default DatePipe;
