import React from "react";
import { Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";
import MyFooter from "../shared/footer";
import { profile } from "../assets";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const MyProfile: React.FC = () => {
  const { email } = useSelector((state: RootState) => state.authStore);

  return (
    <div className="h-screen flex flex-col justify-between">
      <MyNavbar />
      <Fade in={true} timeout={1000}>
        <div className="bg-gray-100 h-full flex gap-12 items-center px-40">
          <img src={profile} className="h-52"></img>
          <div>
          <h1 className="text-4xl font-light">{email}</h1>
          <h1 className="text-xl font-light pt-6">Total Skills - [Data here]</h1>
          <h1 className="text-xl font-light pt-2">Certificate Earned - [Data here]</h1>

          </div>
        </div>
      </Fade>
      <MyFooter />
    </div>
  );
};

export default MyProfile;
