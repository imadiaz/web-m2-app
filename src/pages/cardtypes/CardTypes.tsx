import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import CustomButton from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import CardTypesTable from "./components/CardTypesTable";
import { CardTypes } from "../../data/cardtypes/cardTypes";
import { useGetCardTypesMutation } from "../../services/CardTypesService";
import PaginatedList from "../../components/PaginatedList";
import CardTypesCard from "./components/CardTypesCard";

interface stateType {
  siteId: string;
  siteName: string;
}

const CardTypess = () => {
  const [getCardTypes] = useGetCardTypesMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { siteId, siteName } = state as stateType;
  const [data, setData] = useState<CardTypes[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<CardTypes[]>([]);

  const handleOnSearch = (event: any) => {
    const getSearch = event.target.value;

    if (getSearch.length > 0) {
      const filterData = dataBackup.filter((item) => search(item, getSearch));

      setData(filterData);
    } else {
      setData(dataBackup);
    }
    setQuerySearch(getSearch);
  };

  const search = (item: CardTypes, search: string) => {
    const { name, methodology } = item;

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      methodology.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGetPriorities = async () => {
    setLoading(true);
    if (siteId) {
      try {
        const response = await getCardTypes(siteId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetPriorities();
  }, [state, getCardTypes]);

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col md:flex-row flex-wrap m-3 items-center md:justify-between">
          <div className="flex flex-col md:flex-row items-center flex-1 mb-1 md:mb-0">
            <Space className="w-full md:w-auto mb-1 md:mb-0">
              <Input
                className="w-full"
                onChange={handleOnSearch}
                placeholder={Strings.searchRecord}
                value={querySearch}
                addonAfter={<IoIosSearch />}
              />
            </Space>
            <h1 className="font-semibold text-lg ml-0 md:ml-3">
              {Strings.cardTypesOf}
              <span className="font-normal">{siteName}</span>
            </h1>
          </div>
          <div className="flex mb-1 md:mb-0 md:justify-end w-full md:w-auto">
            <CustomButton
              type="success"
              //onClick={handleOnClickCreateButton}
              className="w-full md:w-auto"
            >
              {Strings.create}
            </CustomButton>
          </div>
        </div>
        <div className="flex-1 overflow-auto hidden lg:block">
          <CardTypesTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={CardTypesCard}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default CardTypess;