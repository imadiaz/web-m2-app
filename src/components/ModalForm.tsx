import React, { useEffect, useRef } from "react";
import { Form, Modal } from "antd";
import type { GetRef } from "antd";
import Strings from "../utils/localizations/Strings";

type FormInstance = GetRef<typeof Form>;

interface ModalFormProps {
  open: boolean;
  onCancel: () => void;
  title: string;
  FormComponent: React.ComponentType<{ form: FormInstance }>;
  isLoading: boolean;
  isUpdateForm: boolean
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({
  form,
  open,
  isUpdateForm,
}: {
  form: FormInstance;
  open: boolean;
  isUpdateForm: boolean
}) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen && !isUpdateForm) {
      form.resetFields();
    }
  }, [form, prevOpen, open, isUpdateForm]);
};

const ModalForm = ({
  open,
  onCancel,
  title,
  FormComponent,
  isLoading,
  isUpdateForm
}: ModalFormProps) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    open,
    isUpdateForm
  });

  const handleOnOk = () => {
    form.submit();
  };

  return (
    <Modal
      onOk={handleOnOk}
      okText={Strings.save}
      width={810}
      title={title}
      open={open}
      onCancel={onCancel}
      cancelText={Strings.cancel}
      confirmLoading={isLoading}
    >
      <FormComponent form={form} />
    </Modal>
  );
};

export default ModalForm;
