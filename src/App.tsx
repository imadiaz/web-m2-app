import { ConfigProvider } from "antd";
import BaseLayout from "./pages/layouts/BaseLayout";
import { Route, Routes } from "react-router-dom";
import { adminRoutes } from "./pages/routes/Routes";
import LoginPage from "./pages/auth/Login";
import PrivateRoutes from "./components/PrivateRoutes";

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
          Card: {
            colorBgContainer: "#001529",
          },
        },
      }}
    >
      <Routes>
        <Route index path="/" element={<LoginPage />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<BaseLayout />}>
            {adminRoutes.map((value, index) => (
              <Route
                key={index}
                path={value.fullPath}
                element={value.element}
              />
            ))}
          </Route>
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
