import { Form, GetRef, Input, InputNumber } from "antd";
import { MailOutlined } from "@ant-design/icons";
import Strings from "../../../utils/strings";
import { FaRegBuilding } from "react-icons/fa";
import { MdOutlineLocalPhone, MdOutlineQrCodeScanner } from "react-icons/md";
import { SlCompass } from "react-icons/sl";
import { IoIosContact } from "react-icons/io";
import { IoLink } from "react-icons/io5";
import { BsDiagram3 } from "react-icons/bs";
import { HiDevicePhoneMobile } from "react-icons/hi2";
import { TiPlusOutline } from "react-icons/ti";

type FormInstance = GetRef<typeof Form>;

interface FormProps {
  form: FormInstance;
}

const RegisterCompanyForm = ({ form }: FormProps) => {
  return (
    <Form form={form} name="registerCompanyForm">
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="name"
            validateDebounce={1000}
            rules={[
              { required: true, message: Strings.requiredCompanyName },
              { max: 100 },
            ]}
            className="flex-1 mr-1"
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<FaRegBuilding />}
              placeholder={Strings.companyName}
            />
          </Form.Item>
          <Form.Item
            name="rfc"
            validateFirst
            rules={[
              { required: true, message: Strings.requiredRFC },
              { len: 12 },
            ]}
          >
            <Input
              size="large"
              showCount
              maxLength={12}
              addonBefore={<MdOutlineQrCodeScanner />}
              placeholder={Strings.rfc}
              onInput={(e) =>
                ((e.target as HTMLInputElement).value = (
                  e.target as HTMLInputElement
                ).value.toUpperCase())
              }
            />
          </Form.Item>
        </div>
        <Form.Item
          name="address"
          rules={[
            { required: true, message: Strings.requiredAddress },
            { max: 200 },
          ]}
        >
          <Input
            size="large"
            addonBefore={<SlCompass />}
            placeholder={Strings.companyAddress}
          />
        </Form.Item>
        <div className="flex flex-row flex-wrap">
          <Form.Item
            name="contact"
            rules={[
              { required: true, message: Strings.requiredContacName },
              { max: 100 },
            ]}
            className="flex-1 mr-1"
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<IoIosContact />}
              placeholder={Strings.contact}
            />
          </Form.Item>
          <Form.Item
            name="position"
            rules={[
              { required: true, message: Strings.requiredPosition },
              { max: 100 },
            ]}
            className="flex-1"
          >
            <Input
              size="large"
              maxLength={100}
              addonBefore={<BsDiagram3 />}
              placeholder={Strings.position}
            />
          </Form.Item>
        </div>
        <div className="flex justify-between flex-row flex-wrap">
          <Form.Item
            name="phone"
            rules={[{ required: true, message: Strings.requiredPhone }]}
          >
            <InputNumber
              size="large"
              maxLength={10}
              addonBefore={<MdOutlineLocalPhone />}
              placeholder={Strings.phone}
            />
          </Form.Item>
          <Form.Item
            name="extension"
            rules={[{ message: Strings.requiredExtension }]}
          >
            <InputNumber
              size="large"
              maxLength={5}
              addonBefore={<TiPlusOutline />}
              placeholder={Strings.extension}
            />
          </Form.Item>
          <Form.Item
            name="cellular"
            rules={[{ required: true, message: Strings.requiredCellular }]}
          >
            <InputNumber
              size="large"
              maxLength={13}
              addonBefore={<HiDevicePhoneMobile />}
              placeholder={Strings.cellular}
            />
          </Form.Item>
        </div>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: Strings.requiredEmail },
            { type: "email", message: Strings.requiredValidEmailAddress },
            { max: 60 },
          ]}
        >
          <Input
            size="large"
            maxLength={60}
            addonBefore={<MailOutlined />}
            placeholder={Strings.email}
          />
        </Form.Item>
        <Form.Item
          name="logo"
          rules={[
            { required: true, message: Strings.requiredLogoURL },
            { type: "url", message: Strings.requiredValidURL },
            { max: 500 },
          ]}
        >
          <Input
            size="large"
            maxLength={500}
            addonBefore={<IoLink />}
            placeholder={Strings.logo}
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default RegisterCompanyForm;
