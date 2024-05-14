import { ConfigProvider } from "antd";
import BaseLayout from "./pages/layouts/BaseLayout";
import { Route, Routes } from "react-router-dom";
import { proofRoutes } from "./pages/routes/Routes";
import LoginPage from "./pages/auth/Login";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e73773",
          colorLinkHover: "#e73773",
          colorLinkActive: "#e73773",
          linkHoverDecoration: "underline",
          colorBgLayout: "#e2e8f0",
        },
        components: {
          Card:{
            colorBgContainer: '#001529'
          }
        }
      }}
    >
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route element={<BaseLayout />}>
          {proofRoutes.map((value, index) => (
            <Route key={index} path={value.fullPath} element={value.element} />
          ))}
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
