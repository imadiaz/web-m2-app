import { useMemo, useRef } from "react";
import { useAppDispatch } from "../../../core/store";
import { useTableHeight } from "../../../utils/tableHeight";
import { ColumnsType } from "antd/es/table";
import { Priority } from "../../../data/priority/priority";
import Strings from "../../../utils/localizations/Strings";
import { getStatusAndText } from "../../../utils/Extensions";
import { Badge, Space, Table } from "antd";
import CustomButton from "../../../components/CustomButtons";
import Constants from "../../../utils/Constants";

interface PrioritiesTableProps {
  data: Priority[];
  isLoading: boolean;
}

const PriorityTable = ({ data, isLoading }: PrioritiesTableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);
  const dispatch = useAppDispatch();

  /* const handleUpdateClick = (row: Company) => {
      dispatch(resetRowData());
      dispatch(setRowData(row));
      dispatch(resetChangeIndicator());
    }; */

  const columns: ColumnsType<Priority> = useMemo(
    () => [
      {
        title: Strings.code,
        dataIndex: "priorityCode",
        key: "priorityCode",
        sorter: (a, b) => a.priorityCode.localeCompare(b.priorityCode),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: Strings.description,
        dataIndex: "priorityDescription",
        key: "priorityDescription",
        sorter: (a, b) =>
          a.priorityDescription.localeCompare(b.priorityDescription),
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
      },
      {
        title: Strings.daysNumber,
        dataIndex: "priorityDays",
        key: "priorityDays",
        sorter: (a, b) => a.priorityDays - b.priorityDays,
        sortDirections: ["ascend", "descend"],
        ellipsis: true,
      },
      {
        title: Strings.status,
        key: "status",
        render: (record) => {
          const { status, text } = getStatusAndText(record.status);
          return <Badge status={status} text={text} />;
        },
        filters: [
          { text: "Active", value: "A" },
          { text: "Inactive", value: "I" },
        ],
        onFilter: (value, record) => record.status === value,
        ellipsis: true,
      },
    ],
    [Strings, getStatusAndText]
  );

  const actionsRow = {
    defaultExpandAllRows: true,
    showExpandColumn: false,
    expandedRowRender: (_: Priority) => (
      <Space className="flex justify-evenly">
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

export default PriorityTable;
