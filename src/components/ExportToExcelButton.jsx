import React from 'react';
import * as XLSX from 'xlsx';
import apiCalls from "../api/apiCalls";

const ExportToExcelButton = ({ fileName, sheetName, fromDate, toDate }) => {
  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName || 'Sheet1');
    XLSX.writeFile(wb, fileName || 'exported-data.xlsx');
  };

  const downlaodExcelFileAPI = () => {
    const obj = {
        "FromDate": new Date(fromDate) ,
        "ToDate": new Date(toDate)
    //     "FromDate": "2023-05-06T10:10:55.367Z",
    // "ToDate": "2024-12-19T10:10:55.367Z"
    }
    let response = apiCalls.FinanceActionsOnSerReq(obj);
    response
      .then((val) => {
        if (val?.data) {
          exportToExcel(val?.data);
        }
      })
      .catch((err) => {
      });  
  }

  return (
    <i  onClick={() => downlaodExcelFileAPI()} className="bi bi-file-earmark-excel-fill"></i>

    // <button onClick={exportToExcel}>
    //   Export to Excel
    // </button>
  );
};

export default ExportToExcelButton;