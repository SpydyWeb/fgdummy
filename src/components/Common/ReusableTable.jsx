import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Table, Spin } from "antd";

/**
 * ReusableTable
 * - columns: [{ title, dataIndex (preferred), key, render, show, width, sorter }]
 * - data: array
 * - loading: boolean
 * - rowKey: string | function
 * - pagination: false | object
 * - emptyText: string
 */
const ReusableTable = ({
  columns,
  data = [],
  loading = false,
  rowKey,
  pagination = false,
  emptyText = "No data available",
  onRow,
  className,
  style,
  ...rest
}) => {
  const visibleColumns = useMemo(
    () =>
      (columns || [])
        .filter((c) => c.show !== false)
        .map((c) => ({
          ...c,
          title: c.title,
          dataIndex: c.dataIndex ?? c.key,
          key: c.key ?? c.dataIndex,
          render:
            typeof c.render === "function"
              ? (text, record, index) =>
                  // keep render signature consistent (value, record)
                  c.render(record[c.dataIndex ?? c.key], record, index)
              : undefined,
          width: c.width,
          sorter: c.sorter,
          align: c.align,
        })),
    [columns]
  );

  const resolvedRowKey =
    typeof rowKey === "function"
      ? rowKey
      : rowKey ||
        (data && data.length && data[0] && (data[0].id ? "id" : Object.keys(data[0])[0])) ||
        "rowKey";

  return (
    <div className={className} style={style}>
      <Spin spinning={loading} tip="Loading...">
        {/* {data && data.length ? ( */}
          <Table
            columns={visibleColumns}
            dataSource={data}
            rowKey={resolvedRowKey}
            pagination={pagination}
            onRow={onRow}
            locale={{ emptyText }}
            bordered
            className="pos-header"
            {...rest}
          />
        {/* ) : loading ? ( */}
          {/* <div style={{ minHeight: 120 }} /> */}
         {/* {data && data.length==0 ? (
          <Empty description={emptyText} />

        )
      : <></>} */}
        
      </Spin>
    </div>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  loading: PropTypes.bool,
  rowKey: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  pagination: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  emptyText: PropTypes.string,
  onRow: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

ReusableTable.defaultProps = {
  data: [],
  loading: false,
  pagination: false,
  emptyText: "No data available",
};

export default React.memo(ReusableTable);
