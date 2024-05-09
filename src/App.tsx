import { ConfigProvider } from "antd";
import BaseLayout from "./pages/layouts/BaseLayout";
import { Route, Routes } from "react-router-dom";
import { proofRoutes } from "./pages/routes/Routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#e73773",
        },
      }}
    >
      <Routes>
        <Route path="/" element={<BaseLayout />}>
          {proofRoutes.map((value, index) => (
            <Route key={index} path={value.fullPath} element={value.element} />
          ))}
        </Route>
      </Routes>
    </ConfigProvider>
  );
}

export default App;
