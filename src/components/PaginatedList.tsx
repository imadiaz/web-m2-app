import React, { useState } from "react";
import { List, Pagination } from "antd";
import { RESPONSIVE_LIST } from "../utils/Extensions";
import Constants from "../utils/Constants";

interface Props<T> {
  data: T[];
  ItemComponent: React.ComponentType<{ data: T }>;
  isLoading: boolean;
}

const PaginatedList = <T,>({ data, ItemComponent, isLoading }: Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * Constants.PAGE_SIZE;
  const endIndex = startIndex + Constants.PAGE_SIZE;
  const currentData = data.slice(startIndex, endIndex);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <List
        loading={isLoading}
        grid={RESPONSIVE_LIST}
        dataSource={currentData}
        renderItem={(item) => (
          <List.Item>
            <ItemComponent data={item} />
          </List.Item>
        )}
      />
      {data.length > Constants.PAGE_SIZE && (
        <Pagination
          className="flex justify-end"
          total={data.length}
          pageSize={Constants.PAGE_SIZE}
          current={currentPage}
          onChange={onPageChange}
        />
      )}
    </>
  );
};

export default PaginatedList;
