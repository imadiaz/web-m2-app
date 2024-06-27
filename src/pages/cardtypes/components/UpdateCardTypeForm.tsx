import { ColorPicker, Form, GetRef, Input, InputNumber, Select } from "antd";
import Strings from "../../../utils/localizations/Strings";
import { BsCardText } from "react-icons/bs";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { FiTool } from "react-icons/fi";
import { LuTextCursor } from "react-icons/lu";
import { CardTypeUpdateForm } from "../../../data/cardtypes/cardTypes";
import { useAppSelector } from "../../../core/store";
import {
  selectCurrentRowData,
  selectSiteId,
} from "../../../core/genericReducer";
import { useEffect, useState } from "react";
import { useGetSiteResponsiblesMutation } from "../../../services/userService";
import { Responsible } from "../../../data/user/user";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const UpdateCardTypeForm = ({ form }: FormProps) => {
  const rowData = useAppSelector(
    selectCurrentRowData
  ) as unknown as CardTypeUpdateForm;
  const [getResponsibles] = useGetSiteResponsiblesMutation();
  const siteId = useAppSelector(selectSiteId);
  const [data, setData] = useState<Responsible[]>([]);

  const handleGetResponsibles = async () => {
    const responsibles = await getResponsibles(siteId).unwrap();
    setData(responsibles);
  };

  const selectOptions = () => {
    return data.map((responsible) => (
      <Select.Option key={responsible.id} value={responsible.id}>
        {responsible.name}
      </Select.Option>
    ));
  };

  useEffect(() => {
    form.setFieldsValue({ ...rowData });
    handleGetResponsibles();
  }, []);
  return (
    <Form form={form}>
      <div className="flex flex-col">
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="id" className="hidden">
            <Input />
          </Form.Item>
          <Form.Item
            name="methodology"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredMethodology },
              { max: 25 },
            ]}
          >
            <Input
              size="large"
              addonBefore={<FiTool />}
              maxLength={25}
              placeholder={Strings.methodology}
            />
          </Form.Item>
          <Form.Item
            name="name"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredCardTypeName },
              { max: 45 },
            ]}
          >
            <Input
              addonBefore={<LuTextCursor />}
              size="large"
              maxLength={45}
              placeholder={Strings.name}
            />
          </Form.Item>
          <Form.Item
            name="description"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredDescription },
              { max: 100 },
            ]}
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<BsCardText />}
              placeholder={Strings.description}
            />
          </Form.Item>
        </div>
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="color"
            validateFirst
            rules={[{ required: true, message: Strings.requiredColor }]}
            className="mr-3"
          >
            <ColorPicker size="large" />
          </Form.Item>
          <Form.Item
            name="responsableId"
            validateFirst
            rules={[{ required: true, message: Strings.requiredResponsableId }]}
          >
            <Select size="large" placeholder={Strings.responsible}>
              {selectOptions()}
            </Select>
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.quantityCreate}</h1>
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="quantityPicturesCreate" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.picturesCreate}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosCreate" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.audiosCreate}
            />
          </Form.Item>
          <Form.Item name="quantityVideosCreate" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.videosCreate}
            />
          </Form.Item>
          <Form.Item name="quantityPicturesPs" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.picturesCreatePs}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosPs" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.audiosCreatePs}
            />
          </Form.Item>
          <Form.Item name="quantityVideosPs" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.videosCreatePs}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.durationCreate}</h1>
        <div className="flex flex-row flex-wrap">
          <Form.Item name="audiosDurationCreate" validateFirst className="mr-1">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.audiosDurationCreate}
            />
          </Form.Item>
          <Form.Item name="videosDurationCreate" validateFirst className="mr-1">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.videosDurationCreate}
            />
          </Form.Item>
          <Form.Item name="audiosDurationPs" validateFirst className="mr-1">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.audiosDurationPs}
            />
          </Form.Item>
          <Form.Item name="videosDurationPs" validateFirst className="mr-1">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.videosDurationPs}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.quantityClose}</h1>
        <div className="flex flex-row justify-between flex-wrap">
          <Form.Item name="quantityPicturesClose" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.quantityPicturesClose}
            />
          </Form.Item>
          <Form.Item name="quantityAudiosClose" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.quantityAudiosClose}
            />
          </Form.Item>
          <Form.Item name="quantityVideosClose" validateFirst>
            <InputNumber
              size="large"
              max={127}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.quantityVideosClose}
            />
          </Form.Item>
        </div>
        <h1 className="font-semibold">{Strings.durationClose}</h1>
        <div className="flex flex-row flex-wrap">
          <Form.Item name="audiosDurationClose" validateFirst className="mr-1">
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.audiosDurationClose}
            />
          </Form.Item>
          <Form.Item name="videosDurationClose" validateFirst>
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<AiOutlineFieldNumber />}
              placeholder={Strings.videosDurationClose}
            />
          </Form.Item>
          <Form.Item name="status" className="hidden">
            <Input />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default UpdateCardTypeForm;
