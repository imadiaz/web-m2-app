import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import React, { useEffect } from "react";
import { useLoginMutation } from "../../services/authService";
import { LoginRequest } from "../../data/user/user.request";
import { useAppDispatch } from "../../core/store";
import { setCredentials } from "../../core/authReducer";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../../core/useSessionStorage";
import User from "../../data/user/user";
import Strings from "../../utils/Strings";
import { handleErrorNotification } from "../../utils/Notifications";

const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [login, { isLoading }] = useLoginMutation();
  const distpatch = useAppDispatch();
  const navigate = useNavigate();
  const [getSessionUser, setSessionUser] = useSessionStorage<User>("");

  useEffect(() => {
    if (getSessionUser() !== null) {
      const data = getSessionUser() as User;
      distpatch(setCredentials({ ...data }));
    }
  }, []);

  const onFinish = async (values: any) => {
    try {
      const data = await login(
        new LoginRequest(values.email, values.password)
      ).unwrap();

      setSessionUser(data);
      distpatch(setCredentials({ ...data }));
      navigate("/page1");
    } catch (error) {
      handleErrorNotification(error)
    }
  };

  return (
    <div className="flex bg-slate-200 justify-center items-center min-h-screen">
      <div className="p-6 relative  md:w-96  shadow-2xl bg-slate-900 rounded-2xl">
        <h1 className="text-center text-3xl block font-semibold text-white">
          Welcome!
        </h1>
        <Form
          name="normal_login"
          className="mt-4"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ type: 'email',required: true, message: Strings.requiredEmail }]}
          >
            <Input
              size="large"
              addonBefore={<MailOutlined className="text-white" />}
              placeholder={Strings.email}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{min: 8,required: true, message: Strings.requiredPassword }]}
          >
            <Input.Password
              size="large"
              addonBefore={<LockOutlined className="text-white" />}
              type="password"
              placeholder={Strings.password}
              visibilityToggle={{
                visible: passwordVisible,
                onVisibleChange: setPasswordVisible,
              }}
            />
          </Form.Item>
          <Form.Item>
            <a className="text-white" href="">
              {Strings.forgotPassword}
            </a>
            <Button
              loading={isLoading}
              block
              size="large"
              className="w-full mt-3"
              type="primary"
              htmlType="submit"
            >
              {Strings.login}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
