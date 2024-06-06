import { useMemo, useRef } from "react";
import { useTableHeight } from "../../../utils/tableHeight";
import { ColumnsType } from "antd/es/table";
import Strings from "../../../utils/localizations/Strings";
import { getStatusAndText } from "../../../utils/Extensions";
import { Badge, Space, Table } from "antd";
import CustomButton from "../../../components/CustomButtons";
import Constants from "../../../utils/Constants";
import { CardTypes } from "../../../data/cardtypes/cardTypes";

interface TableProps {
  data: CardTypes[];
  isLoading: boolean;
}

const CardTypesTable = ({ data, isLoading }: TableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);
  //const dispatch = useAppDispatch();

  /* const handleUpdateClick = (row: Company) => {
      dispatch(resetRowData());
      dispatch(setRowData(row));
      dispatch(resetChangeIndicator());
    }; */

    const columns: ColumnsType<CardTypes> = useMemo(
        () => [
          {
            title: Strings.methodology,
            dataIndex: 'methodology',
            key: 'methodology',
            sorter: (a, b) => a.methodology.localeCompare(b.methodology),
            sortDirections: ['ascend', 'descend'],
          },
          {
            title: Strings.name,
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
            ellipsis: true,
          },
          {
            title: Strings.description,
            dataIndex: 'description',
            key: 'description',
            sorter: (a, b) => a.description.localeCompare(b.description),
            sortDirections: ['ascend', 'descend'],
            ellipsis: true,
          },
          {
            title: Strings.color,
            dataIndex: 'color',
            key: 'color',
            render: (color: string) => (
              <div style={{ backgroundColor: `#${color}`, width: 50, height: 20 }} />
            ),
          },
          {
            title: Strings.responsible,
            dataIndex: 'responsableName',
            key: 'responsableName',
            sorter: (a, b) => a.responsableName.localeCompare(b.responsableName),
            sortDirections: ['ascend', 'descend'],
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
              { text: Strings.active, value: "A" },
              { text: Strings.inactive, value: "I" },
            ],
            onFilter: (value, record) => record.status === value,
            ellipsis: true,
          },
        ],
        []
      );
      
      const actionsRow = {
        defaultExpandAllRows: true,
        showExpandColumn: false,
        expandedRowRender: (_: CardTypes) => (
          <Space className="flex justify-end">
            <CustomButton type="action">{Strings.viewPreclassifiers}</CustomButton>
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

export default CardTypesTable;