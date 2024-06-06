import { useEffect, useState } from "react";
import { Input, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import CustomButton from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import { useGetPreclassifierMutation } from "../../services/preclassifierService";
import PreclassifierTable from "./components/PreclassifierTable";
import PaginatedList from "../../components/PaginatedList";
import PreclassifierCard from "./components/PreclassifierCard";

interface stateType {
  cardTypeId: string;
}

const Preclassifiers = () => {
  const [getPreclassifiers] = useGetPreclassifierMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { cardTypeId } = state as stateType;
  const [data, setData] = useState<Preclassifier[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Preclassifier[]>([]);

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

  const search = (item: Preclassifier, search: string) => {
    const { preclassifierCode, preclassifierDescription } = item;

    return (
      preclassifierCode.toLowerCase().includes(search.toLowerCase()) ||
      preclassifierDescription.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGetPriorities = async () => {
    setLoading(true);
    if (cardTypeId) {
      try {
        const response = await getPreclassifiers(cardTypeId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetPriorities();
  }, [state, getPreclassifiers]);

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
              {Strings.preclassifiers}
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
          <PreclassifierTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={PreclassifierCard}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Preclassifiers;