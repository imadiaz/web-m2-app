import { useState } from "react";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import { Form, Spin } from "antd";
import {
  NotificationSuccess,
  handleErrorNotification,
  handleSucccessNotification,
} from "../../../utils/Notifications";
import { useAppDispatch } from "../../../core/store";
import {
  resetRowData,
  setCardTypeUpdatedIndicator,
  setRowData,
} from "../../../core/genericReducer";
import ModalUpdateForm from "../../../components/ModalUpdateForm";
import { useGetCardTypeMutation, useUpdateCardTypeMutation } from "../../../services/CardTypesService";
import { UpdateCardTypeReq } from "../../../data/cardtypes/cardTypes.request";
import UpdateCardTypeForm from "./UpdateCardTypeForm";
import { ColorFactory } from "antd/es/color-picker/color";

interface ButtonEditProps {
  id: string;
}

const UpdateCardType = ({ id }: ButtonEditProps) => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [modalIsLoading, setModalLoading] = useState(false);
  const [dataIsLoading, setDataLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [getCardType] = useGetCardTypeMutation();
  const [updateCardType] = useUpdateCardTypeMutation();

  const handleOnClickEditButton = async () => {
    setDataLoading(true);
    const cardType = await getCardType(id).unwrap();
    dispatch(setRowData(cardType));
    setModalOpen(true);
    setDataLoading(false);
  };

  const handleOnCancelButton = () => {
    if (!modalIsLoading) {
      dispatch(resetRowData());
      setModalOpen(false);
    }
  };

  const handleOnUpdateFormFinish = async (values: any) => {
    try {
      setModalLoading(true);
      if(values.color instanceof ColorFactory){
        values.color = values.color.toHex()
      }
      const cardTypeToUpdate = new UpdateCardTypeReq(
        Number(values.id),
        values.methodology.trim(),
        values.name.trim(),
        values.description.trim(),
        values.color,
        Number(values.responsableId),
        Number(values.quantityPicturesCreate),
        Number(values.quantityAudiosCreate),
        Number(values.quantityVideosCreate),
        Number(values.audiosDurationCreate),
        Number(values.videosDurationCreate),
        Number(values.quantityPicturesClose),
        Number(values.quantityAudiosClose),
        Number(values.quantityVideosClose),
        Number(values.audiosDurationClose),
        Number(values.videosDurationClose),
        values.status
      );
      await updateCardType(cardTypeToUpdate).unwrap();
      setModalOpen(false);
      dispatch(setCardTypeUpdatedIndicator());
      handleSucccessNotification(NotificationSuccess.UPDATE);
    } catch (error) {
      handleErrorNotification(error);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <>
      <CustomButton onClick={handleOnClickEditButton} type="edit">
        {Strings.edit}
      </CustomButton>
      <Form.Provider
        onFormFinish={async (_, { values }) => {
          await handleOnUpdateFormFinish(values);
        }}
      >
        <ModalUpdateForm
          open={modalIsOpen}
          onCancel={handleOnCancelButton}
          FormComponent={UpdateCardTypeForm}
          title={Strings.updateCompany}
          isLoading={modalIsLoading}
        />
      </Form.Provider>
      <Spin spinning={dataIsLoading} fullscreen />
    </>
  );
};

export default UpdateCardType;