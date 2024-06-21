import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import CustomButton from "../../components/CustomButtons";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { useGetlevelsMutation } from "../../services/levelService";
import { Level } from "../../data/level/level";
import { Input, Space } from "antd";
import LevelCollapse from "./components/LevelCollapse";

interface stateType {
  siteId: string;
  siteName: string;
}

const Levels = () => {
  const [getLevels] = useGetlevelsMutation()
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { siteId, siteName } = state as stateType;
  const [data, setData] = useState<Level[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Level[]>([]);


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

  const search = (item: Level, search: string) => {
    const { name, description } = item;

    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      description.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGetLevels = async () => {
    setLoading(true);
    if (siteId) {
      try {
        const response = await getLevels(siteId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetLevels();
  }, [state, getLevels]);


  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col items-center m-3">
          <PageTitle mainText={Strings.levelsof} subText={siteName} />
          <div className="flex flex-col md:flex-row flex-wrap items-center md:justify-between w-full">
            <div className="flex flex-col md:flex-row items-center flex-1 mb-1 md:mb-0">
              <Space className="w-full md:w-auto mb-1 md:mb-0">
                <Input
                  className="w-full"
                  onChange={handleOnSearch}
                  value={querySearch}
                  addonAfter={<IoIosSearch />}
                />
              </Space>
            </div>
            <div className="flex mb-1 md:mb-0 md:justify-end w-full md:w-auto">
              <CustomButton
                type="success"
                className="w-full md:w-auto"
              >
                {Strings.create}
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto hidden lg:block">
            <LevelCollapse data={data} isLoading={isLoading}/>
        </div>
      </div>
    </>
  );
};

export default Levels;
