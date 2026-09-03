import { useEffect } from "react";
import { useGetCurrentUserQuery } from "./authApi";
import { useAppDispatch } from "../../app/hook";
import { setCredentials, logout } from "./authSlice";

function AuthInitializer() {
  const dispatch = useAppDispatch();

  const { data, isSuccess, isError } = useGetCurrentUserQuery();

  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setCredentials({ user: data?.data }));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError, dispatch]);

  return null;
}

export default AuthInitializer;
