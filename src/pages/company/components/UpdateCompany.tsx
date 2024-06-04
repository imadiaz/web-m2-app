import { useState } from "react";
import CustomButton from "../../../components/CustomButtons";
import ModalForm from "../../../components/ModalForm";
import Strings from "../../../utils/localizations/Strings";
import { Company } from "../../../data/company/company";
import UpdateCompanyForm from "./UpdateCompanyForm";
import { Form } from "antd";
import {
  NotificationSuccess,
  handleErrorNotification,
  handleSucccessNotification,
} from "../../../utils/Notifications";
import { useUpdateCompanyMutation } from "../../../services/companyService";
import { UpdateCompanyRequest } from "../../../data/company/company.request";
import { useAppDispatch } from "../../../core/store";
import { incrementChangeIndicator } from "../../../core/genericReducer";

interface ButtonEditProps {
  onClick: (row: Company) => void;
  row: Company;
}

const UpdateCompany = ({ onClick, row }: ButtonEditProps) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalIsLoading, setModalLoading] = useState(false);
  const [updateCompany] = useUpdateCompanyMutation();
  const dispatch = useAppDispatch();

  //Edit modal
  const handleOnClickEditButton = () => {
    onClick(row);
    setModalOpen(true);
  };
  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      setModalOpen(false);
    }
  };
  return (
    <>
      <CustomButton onClick={handleOnClickEditButton} type="edit">
        {Strings.edit}
      </CustomButton>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          try {
            setModalLoading(true);
            const companyToUpdate = new UpdateCompanyRequest(
              Number(values.id),
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
            );
            await updateCompany(companyToUpdate).unwrap();
            setModalOpen(false);
            dispatch(incrementChangeIndicator());
            handleSucccessNotification(NotificationSuccess.UPDATE);
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
          FormComponent={UpdateCompanyForm}
          title={Strings.updateCompany}
          isLoading={modalIsLoading}
          isUpdateForm={true}
        />
      </Form.Provider>
    </>
  );
};

export default UpdateCompany;
