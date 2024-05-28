import { ColumnsType, TableProps } from "antd/es/table";
import { Company } from "../../../data/company/company";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge, Table, Space } from "antd";
import CustomButton from "../../../components/CustomButtons";
import { useTableHeight } from "./tableHeight";
import Constants from "../../../utils/Constants";
import { getStatusAndText } from "../../../utils/Extensions";
import Strings from "../../../utils/localizations/Strings";

type OnChange = NonNullable<TableProps<Company>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

interface CompaniesTableProps {
  data: Company[];
  isLoading: boolean;
  clearFilters: boolean;
  setClearFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyTable = ({
  data,
  isLoading,
  clearFilters,
  setClearFilters,
}: CompaniesTableProps) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const tableHeight = useTableHeight(contentRef);

  const uniqueExtensions = [...new Set(data.map((item) => item.extension))];

  const extensionFilters = uniqueExtensions.map((extension) => ({
    text: extension === null ? "No extension" : extension,
    value: extension,
  }));

  useEffect(() => {
    if (clearFilters) {
      setFilteredInfo({});
      setSortedInfo({});
      setClearFilters(false);
    }
  }, [clearFilters, setClearFilters]);

  const handleChange: OnChange = (_, filters, sorter, __) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

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
        sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      },
      {
        title: Strings.rfc,
        dataIndex: "rfc",
        key: "rfc",
        sorter: (a, b) => a.rfc.localeCompare(b.rfc),
        sortOrder: sortedInfo.columnKey === "rfc" ? sortedInfo.order : null,
      },
      {
        title: Strings.companyAddress,
        dataIndex: "address",
        key: "address",
        sorter: (a, b) => a.address.localeCompare(b.address),
        sortOrder: sortedInfo.columnKey === "address" ? sortedInfo.order : null,
      },
      {
        title: Strings.contact,
        dataIndex: "contact",
        key: "contact",
        sorter: (a, b) => a.contact.localeCompare(b.contact),
        sortOrder: sortedInfo.columnKey === "contact" ? sortedInfo.order : null,
      },
      {
        title: Strings.position,
        dataIndex: "position",
        key: "position",
        sorter: (a, b) => a.position.localeCompare(b.position),
        sortOrder:
          sortedInfo.columnKey === "position" ? sortedInfo.order : null,
      },
      {
        title: Strings.phone,
        dataIndex: "phone",
        key: "phone",
        sorter: (a, b) => a.phone.localeCompare(b.phone),
        sortOrder: sortedInfo.columnKey === "phone" ? sortedInfo.order : null,
      },
      {
        title: Strings.extension,
        dataIndex: "extension",
        key: "extension",
        filters: extensionFilters,
        filteredValue: filteredInfo.extension || null,
        onFilter: (value, record) => record.extension === value,
        ellipsis: true,
      },
      {
        title: Strings.email,
        dataIndex: "email",
        key: "email",
        sorter: (a, b) => a.email.localeCompare(b.email),
        sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      },
      {
        title: Strings.cellular,
        dataIndex: "cellular",
        key: "cellular",
        sorter: (a, b) => a.cellular.localeCompare(b.cellular),
        sortOrder:
          sortedInfo.columnKey === "cellular" ? sortedInfo.order : null,
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
        filteredValue: filteredInfo.status || null,
        filterMultiple: false,
        ellipsis: true,
      },
    ],
    [sortedInfo, filteredInfo, Strings, extensionFilters, getStatusAndText]
  );

  const actionsRow = {
    defaultExpandAllRows: true,
    showExpandColumn: false,
    expandedRowRender: (_: Company) => (
      <Space className="flex justify-evenly">
        <CustomButton type="action">{Strings.viewPriorities}</CustomButton>
        <CustomButton type="action">{Strings.viewLevels}</CustomButton>
        <CustomButton type="action">{Strings.viewCardTypes}</CustomButton>
        <CustomButton type="action">{Strings.viewCards}</CustomButton>
        <CustomButton type="edit">{Strings.edit}</CustomButton>
        <CustomButton type="action">{Strings.importExcel}</CustomButton>
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
        onChange={handleChange}
      />
    </div>
  );
};

export default CompanyTable;
