import { useEffect, useState } from "react";
import { useGetCompaniesMutation } from "../../services/companyService";
import { Button, Input, Space } from "antd";
import { Company } from "../../data/company/company";
import CompaniesTable from "./components/CompaniesTable";
import { IoIosSearch } from "react-icons/io";
import CustomButton from "../../components/CustomButtons";
import Strings from "../../utils/Strings";
import CompanyCard from "./components/CompanyCard";
import PaginatedList from "../../components/PaginatedList";

const Companies = () => {
  const [getCompanies] = useGetCompaniesMutation();
  const [data, setData] = useState<Company[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [dataBackup, setDataBackup] = useState<Company[]>([]);
  const [clearFilters, setClearFilters] = useState(false);

  const handleClearFilters = () => {
    setClearFilters(true);
  };

  const handleGetCompanies = async () => {
    setLoading(true);
    const response = await getCompanies().unwrap();
    setData(response);
    setDataBackup(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCompanies();
    console.log(data);
  }, []);

  const handleSearch = (event: any) => {
    const getSearch = event.target.value;

    if (getSearch.length > 0) {
      const filterData = dataBackup.filter((item) => search(item, getSearch));

      setData(filterData);

      console.log(filterData);
    } else {
      setData(dataBackup);
    }
    setQuerySearch(getSearch);
  };

  const search = (item: Company, search: string) => {
    const { name, email } = item;

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap-reverse m-3">
        <Space className="flex-1 mb-1 md:mb-0">
          <Input
            className="w-full"
            onChange={handleSearch}
            placeholder={Strings.searchRecord}
            value={querySearch}
            addonAfter={<IoIosSearch />}
          />
          <Button onClick={handleClearFilters} className="hidden xl:block">
            {Strings.clearFiltersAndSorters}
          </Button>
        </Space>
        <div className="flex mb-1 md:mb-0 md:justify-end flex-1">
          <CustomButton type="success">{Strings.create}</CustomButton>
        </div>
      </div>
      <div className="flex-1 overflow-auto hidden lg:block">
        <CompaniesTable
          data={data}
          isLoading={isLoading}
          clearFilters={clearFilters}
          setClearFilters={setClearFilters}
        />
      </div>
      <div className="flex-1 overflow-auto lg:hidden">
        <PaginatedList
          data={data}
          ItemComponent={CompanyCard}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Companies;
