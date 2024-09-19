import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/loading";
import { fetchLocalData } from "../helper/localStorage";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../features/auth/authSlice";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    // const { accessToken } = useSelector((state: RootState) => state.authStore);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    let dispatch = useDispatch();

    const data = fetchLocalData();
    const checkAuth = async () => {
      if (!data) {
        localStorage.clear();
        navigate("/login");
        return;
      } else {
        dispatch(
          setUserInfo({
            email: data.email,
            uid: data.uid,
            accesstoken: data.accesstoken,
          })
        );
      }
      setLoading(false);
    };

    useEffect(() => {
      checkAuth();
    }, []);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center bg-custom-black">
          <Loading />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
