import { useMemo, useRef } from "react";
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
  //const dispatch = useAppDispatch();

  /* const handleUpdateClick = (row: Company) => {
      dispatch(resetRowData());
      dispatch(setRowData(row));
      dispatch(resetChangeIndicator());
    }; */

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
        key: "status",
        render: (record: Preclassifier) => {
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
