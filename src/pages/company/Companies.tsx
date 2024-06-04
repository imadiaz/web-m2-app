import { useEffect, useState } from "react";
import {
  useCreateCompanyMutation,
  useGetCompaniesMutation,
} from "../../services/companyService";
import { Form, Input, Space } from "antd";
import { Company } from "../../data/company/company";
import { IoIosSearch } from "react-icons/io";
import CustomButton from "../../components/CustomButtons";
import CompanyCard from "./components/CompanyCard";
import PaginatedList from "../../components/PaginatedList";
import CompanyTable from "./components/CompanyTable";
import RegisterCompanyForm from "./components/RegisterCompanyForm";
import ModalForm from "../../components/ModalForm";
import { CreateCompany } from "../../data/company/company.request";
import {
  NotificationSuccess,
  handleErrorNotification,
  handleSucccessNotification,
} from "../../utils/Notifications";
import Strings from "../../utils/localizations/Strings";
import { useAppSelector } from "../../core/store";
import { selectCurrentChangeIndicator } from "../../core/genericReducer";

const Companies = () => {
  const [getCompanies] = useGetCompaniesMutation();
  const [data, setData] = useState<Company[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Company[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [registerCompany] = useCreateCompanyMutation();
  const [modalIsLoading, setModalLoading] = useState(false);
  const changeIndicator = useAppSelector(selectCurrentChangeIndicator);

  useEffect(() => {
    if (changeIndicator === 1) handleGetCompanies();
  }, [changeIndicator]);

  const handleGetCompanies = async () => {
    setLoading(true);
    const response = await getCompanies().unwrap();
    setData(response);
    setDataBackup(response);
    setLoading(false);
  };

  useEffect(() => {
    handleGetCompanies();
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

  const search = (item: Company, search: string) => {
    const { name, email } = item;

    return (
      email.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleOnClickCreateButton = () => {
    setModalOpen(true);
  };

  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-wrap-reverse m-3">
          <Space className="flex-1 mb-1 md:mb-0">
            <Input
              className="w-full"
              onChange={handleOnSearch}
              placeholder={Strings.searchRecord}
              value={querySearch}
              addonAfter={<IoIosSearch />}
            />
          </Space>
          <div className="flex mb-1 md:mb-0 md:justify-end flex-1">
            <CustomButton onClick={handleOnClickCreateButton} type="success">
              {Strings.create}
            </CustomButton>
          </div>
        </div>
        <div className="flex-1 overflow-auto hidden lg:block">
          <CompanyTable data={data} isLoading={isLoading} />
        </div>
        <div className="flex-1 overflow-auto lg:hidden">
          <PaginatedList
            data={data}
            ItemComponent={CompanyCard}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          try {
            setModalLoading(true);
            await registerCompany(
              new CreateCompany(
                values.name,
                values.rfc,
                values.address,
                values.contact,
                values.position,
                values.phone.toString(),
                values.extension?.toString(),
                values.cellular?.toString(),
                values.email,
                Strings.logoTemp
              )
            ).unwrap();
            setModalOpen(false);
            handleGetCompanies();
            handleSucccessNotification(NotificationSuccess.REGISTER);
          } catch (error) {
            handleErrorNotification(error);
          } finally {
            setModalLoading(false);
          }
        }}
      >
        <ModalForm
          open={modalIsOpen}
          onCancel={handleOnCancelButton}
          FormComponent={RegisterCompanyForm}
          title={Strings.createCompany}
          isLoading={modalIsLoading}
          isUpdateForm={false}
        />
      </Form.Provider>
    </>
  );
};

export default Companies;
