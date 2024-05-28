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
}

// reset form fields when modal is form, closed
const useResetFormOnCloseModal = ({
  form,
  open,
}: {
  form: FormInstance;
  open: boolean;
}) => {
  const prevOpenRef = useRef<boolean>();
  useEffect(() => {
    prevOpenRef.current = open;
  }, [open]);
  const prevOpen = prevOpenRef.current;

  useEffect(() => {
    if (!open && prevOpen) {
      form.resetFields();
    }
  }, [form, prevOpen, open]);
};

const ModalForm = ({
  open,
  onCancel,
  title,
  FormComponent,
  isLoading,
}: ModalFormProps) => {
  const [form] = Form.useForm();

  useResetFormOnCloseModal({
    form,
    open,
  });

  const handleOnOk = () => {
    form.submit();
  };

  return (
    <Modal
      onOk={handleOnOk}
      okText={Strings.save}
      width={800}
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
