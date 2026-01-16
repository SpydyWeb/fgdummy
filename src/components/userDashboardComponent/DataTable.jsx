import React from 'react';
import { Table } from 'antd';

const DataTable = ({ data, columns, isLoading }) => {
  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{ pageSize: 10 }}
      locale={{
        emptyText: 'No Data Available',
      }}
    />
  );
};

export default DataTable;