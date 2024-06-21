import { useEffect, useState } from "react";
import {
  useCreatePriorityMutation,
  useGetPrioritiesMutation,
} from "../../services/priorityService";
import { Priority } from "../../data/priority/priority";
import { Form, Input, Space } from "antd";
import { IoIosSearch } from "react-icons/io";
import Strings from "../../utils/localizations/Strings";
import CustomButton from "../../components/CustomButtons";
import PriorityTable from "./components/PriorityTable";
import { useLocation } from "react-router-dom";
import ModalForm from "../../components/ModalForm";
import { CreatePriority } from "../../data/priority/priority.request";
import {
  NotificationSuccess,
  handleErrorNotification,
  handleSucccessNotification,
} from "../../utils/Notifications";
import RegisterPriorityForm from "./components/RegisterPriorityForm";
import { useAppDispatch, useAppSelector } from "../../core/store";
import {
  resetPriorityUpdatedIndicator,
  selectPriorityUpdatedIndicator,
} from "../../core/genericReducer";
import PageTitle from "../../components/PageTitle";

interface stateType {
  siteId: string;
  siteName: string;
}

const Priorities = () => {
  const [getPriorities] = useGetPrioritiesMutation();
  const [isLoading, setLoading] = useState(false);
  const { state } = useLocation();
  const { siteId, siteName } = state as stateType;
  const [data, setData] = useState<Priority[]>([]);
  const [querySearch, setQuerySearch] = useState(Strings.empty);
  const [dataBackup, setDataBackup] = useState<Priority[]>([]);
  const [modalIsOpen, setModalOpen] = useState(false);
  const [registerPriority] = useCreatePriorityMutation();
  const [modalIsLoading, setModalLoading] = useState(false);
  const dispatch = useAppDispatch();
  const isPriorityUpdated = useAppSelector(selectPriorityUpdatedIndicator);

  useEffect(() => {
    if (isPriorityUpdated) {
      handleGetPriorities();
      dispatch(resetPriorityUpdatedIndicator());
    }
  }, [isPriorityUpdated, dispatch]);

  const handleOnClickCreateButton = () => {
    setModalOpen(true);
  };
  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      setModalOpen(false);
    }
  };

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

  const search = (item: Priority, search: string) => {
    const { priorityCode, priorityDescription } = item;

    return (
      priorityCode.toLowerCase().includes(search.toLowerCase()) ||
      priorityDescription.toLowerCase().includes(search.toLowerCase())
    );
  };

  const handleGetPriorities = async () => {
    setLoading(true);
    if (siteId) {
      try {
        const response = await getPriorities(siteId).unwrap();
        setData(response);
        setDataBackup(response);
      } catch (error) {}
    }
    setLoading(false);
  };

  useEffect(() => {
    handleGetPriorities();
  }, [state, getPriorities]);

  const handleOnFormCreateFinish = async (values: any) => {
    try {
      setModalLoading(true);
      await registerPriority(
        new CreatePriority(
          Number(siteId),
          values.code.trim(),
          values.description.trim(),
          values.daysNumber
        )
      ).unwrap();
      setModalOpen(false);
      handleGetPriorities();
      handleSucccessNotification(NotificationSuccess.REGISTER);
    } catch (error) {
      handleErrorNotification(error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex flex-col items-center m-3">
          <PageTitle mainText={Strings.prioritiesOf} subText={siteName} />
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
                onClick={handleOnClickCreateButton}
                className="w-full md:w-auto"
              >
                {Strings.create}
              </CustomButton>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          <PriorityTable data={data} isLoading={isLoading} />
        </div>
      </div>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          await handleOnFormCreateFinish(values);
        }}
      >
        <ModalForm
          open={modalIsOpen}
          onCancel={handleOnCancelButton}
          FormComponent={RegisterPriorityForm}
          title={Strings.createPriority.concat(` ${siteName}`)}
          isLoading={modalIsLoading}
        />
      </Form.Provider>
    </>
  );
};

export default Priorities;
