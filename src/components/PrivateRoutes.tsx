import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStorage } from "../core/useSessionStorage";
import User from "../data/user/user";
import Constants from "../utils/Constants";
import { useAppDispatch } from "../core/store";
import { useEffect } from "react";
import { setCredentials } from "../core/authReducer";

const PrivateRoutes = () => {
  const [getSessionUser] = useSessionStorage<User>(Constants.EMPTY_STRING);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (getSessionUser() !== undefined) {
      const storedUser = getSessionUser() as User;
      dispatch(setCredentials({ ...storedUser }));
    }
  }, []);

  return getSessionUser() ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
