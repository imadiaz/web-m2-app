import { ColumnsType } from "antd/es/table";
import { Company } from "../../../data/company/company";
import { useMemo, useRef } from "react";
import { Badge, Table, Space } from "antd";
import { useTableHeight } from "../../../utils/tableHeight";
import Constants from "../../../utils/Constants";
import { getStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";
import { useAppDispatch } from "../../../core/store";
import {
  resetChangeIndicator,
  resetRowData,
  setRowData,
} from "../../../core/genericReducer";
import UpdateCompany from "./UpdateCompany";
import ViewSitesButton from "./ViewSitesButton";

interface CompaniesTableProps {
  data: Company[];
  isLoading: boolean;
}

const CompanyTable = ({ data, isLoading }: CompaniesTableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);
  const dispatch = useAppDispatch();

  const handleUpdateClick = (row: Company) => {
    dispatch(resetRowData());
    dispatch(setRowData(row));
    dispatch(resetChangeIndicator());
  };

  const uniqueExtensions = [...new Set(data.map((item) => item.extension))];

  const extensionFilters = uniqueExtensions.map((extension) => ({
    text: extension === null ? Strings.noExtension : extension,
    value: extension,
  }));

  const columns: ColumnsType<Company> = useMemo(
    () => [
      {
        title: Strings.logo,
        dataIndex: "logo",
        key: "logo",
        render: (text) => (
          <img
            className="size-20 lg:size-16 md:size-12"
            src={text}
            alt="logo"
          />
        ),
      },
      {
        title: Strings.companyName,
        dataIndex: "name",
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortDirections: ["ascend", "descend"],
      },
      {
        title: Strings.rfc,
        dataIndex: "rfc",
        key: "rfc",
        sorter: (a, b) => a.rfc.localeCompare(b.rfc),
      },
      {
        title: Strings.companyAddress,
        dataIndex: "address",
        key: "address",
        sorter: (a, b) => a.address.localeCompare(b.address),
      },
      {
        title: Strings.contact,
        dataIndex: "contact",
        key: "contact",
        sorter: (a, b) => a.contact.localeCompare(b.contact),
      },
      {
        title: Strings.position,
        dataIndex: "position",
        key: "position",
        sorter: (a, b) => a.position.localeCompare(b.position),
      },
      {
        title: Strings.phone,
        dataIndex: "phone",
        key: "phone",
        sorter: (a, b) => a.phone.localeCompare(b.phone),
      },
      {
        title: Strings.extension,
        dataIndex: "extension",
        key: "extension",
        filters: extensionFilters,
        onFilter: (value, record) => record.extension === value,
        ellipsis: true,
      },
      {
        title: Strings.email,
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
      },
      {
        title: Strings.cellular,
        dataIndex: "cellular",
        key: "cellular",
        sorter: (a, b) => a.cellular.localeCompare(b.cellular),
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
        filterMultiple: false,
        ellipsis: true,
      },
    ],
    [Strings, extensionFilters, getStatusAndText]
  );

  const actionsRow = {
    defaultExpandAllRows: true,
    showExpandColumn: false,
    expandedRowRender: (data: Company) => (
      <Space className="flex justify-end">
        <ViewSitesButton companyId={data.id} companyName={data.name} />
        <UpdateCompany onClick={handleUpdateClick} row={data} />
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

export default CompanyTable;
