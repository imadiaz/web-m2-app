import { useEffect, useState } from "react";
import { useGetSitesMutation } from "../../services/siteService";
import Strings from "../../utils/localizations/Strings";
import { useLocation } from "react-router-dom";
import { Input, Space } from "antd";
import CustomButton from "../../components/CustomButtons";
import SiteTable from "./components/SiteTable";
import { IoIosSearch } from "react-icons/io";
import PaginatedList from "../../components/PaginatedList";
import SiteCard from "./components/SiteCard";
import { Site } from "../../data/site/site";

interface stateType {
  companyId: string;
  companyName: string;
}

const Sites = () => {
  const [getSites] = useGetSitesMutation();
  const { state } = useLocation();
  const { companyId, companyName } = state as stateType;
  const [data, setData] = useState<Site[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Site[]>([]);

  const handleGetSites = async () => {
    setLoading(true);
    if (companyId) {
      try {
        const response = await getSites(companyId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetSites();
  }, []);

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

  const search = (item: Site, search: string) => {
    const { name, email } = item;

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase())
    );
  };
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
            <h1 className="font-semibold text-base md:text-lg ml-0 md:ml-3">
              {Strings.sitesOf}
              <span className="font-normal">{companyName}</span>
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
          <SiteTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={SiteCard}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export default Sites;
