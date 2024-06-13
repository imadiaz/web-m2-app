import { useEffect, useMemo, useRef, useState } from "react";
import { useTableHeight } from "../../../utils/tableHeight";
import { ColumnsType } from "antd/es/table";
import Strings from "../../../utils/localizations/Strings";
import { getStatusAndText } from "../../../utils/Extensions";
import { Badge, Space, Table } from "antd";
import CustomButton from "../../../components/CustomButtons";
import Constants from "../../../utils/Constants";

interface TableProps {
  data: Preclassifier[];
  isLoading: boolean;
}

const PreclassifierTable = ({ data, isLoading }: TableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    const allRowKeys = data.map(item => item.id);
    setExpandedRowKeys(allRowKeys);
  }, [data]);

  const handleExpand = (expanded: boolean, record: Preclassifier) => {
    const keys = expanded ? [...expandedRowKeys, record.id] : expandedRowKeys.filter(key => key !== record.id);
    setExpandedRowKeys(keys);
  };

  const columns: ColumnsType<Preclassifier> = useMemo(
    () => [
      {
        title: Strings.code,
        dataIndex: "preclassifierCode",
        key: "preclassifierCode",
        sorter: (a, b) =>
          a.preclassifierCode.localeCompare(b.preclassifierCode),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: Strings.description,
        dataIndex: "preclassifierDescription",
        key: "preclassifierDescription",
        sorter: (a, b) =>
          a.preclassifierDescription.localeCompare(b.preclassifierDescription),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
      },
      {
        title: Strings.status,
        key: Strings.status,
        render: (record: Preclassifier) => {
          const { status, text } = getStatusAndText(record.status);
          return <Badge status={status} text={text} />;
        },
        filters: [
          { text: Strings.active, value: "A" },
          { text: Strings.inactive, value: "I" },
        ],
        onFilter: (value, record) => record.status === value,
        ellipsis: true,
      },
    ],
    [Strings, getStatusAndText]
  );

  const actionsRow = {
    expandedRowKeys,
    onExpand: handleExpand,
    showExpandColumn: false,
    expandedRowRender: (_: Preclassifier) => (
      <Space className="flex justify-end">
        <CustomButton type="edit">{Strings.edit}</CustomButton>
        <CustomButton type="cancel">{Strings.delete}</CustomButton>
      </Space>
    ),
  };

  return (
    <div className="h-full" ref={contentRef}>
      <Table
        loading={isLoading}
        size="middle"
        rowKey='id'
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: Constants.PAGE_SIZE,
          showSizeChanger: true,
          pageSizeOptions: ["3", "6", "9"],
        }}
        key={data.length}
        scroll={{ y: tableHeight }}
        expandable={actionsRow}
      />
    </div>
  );
};

export default PreclassifierTable;
