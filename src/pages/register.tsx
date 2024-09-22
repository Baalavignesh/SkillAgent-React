import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
//Change the name after vanta. based on the vanta.d.ts
import VANTA from "vanta/dist/vanta.globe.min";
import * as THREE from "three";
import { Fade } from "@mui/material";
import { VANTA_BACKGROUND, VANTA_PRIMARY } from "../constants/colors";
import { Button, Input, Typography } from "@material-tailwind/react";
import { checkAccessToken, SetAccessToken } from "../helper/localStorage";
import { CreateUser } from "../services/firebase/auth";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    email: "",
    password: "",
    createdAt: new Date(),
  });

  let handleInput = (e: any) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        VANTA({
          el: vantaRef.current,
          THREE: THREE,
          color: VANTA_PRIMARY,
          backgroundColor: VANTA_BACKGROUND,
          vertexColor: VANTA_PRIMARY,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          size: 0.5,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  useEffect(() => {
    checkAccessToken() && navigate("/");
  }, []);

  const handleRegister = async () => {
    // Register new user
    try {
      let response = await CreateUser(registerInfo);
      let responseData: any = {
        uid: response.data.uid,
        email: response.data.email,
        accesstoken: response.data.stsTokenManager.accessToken,
      };
      SetAccessToken(responseData);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-custom-black">
      <Fade in={true} timeout={1000}>
        <div
          className="pl-24 pr-24 pt-12 h-screen text-custom-white  flex flex-col justify-center items-center"
          ref={vantaRef}
        >
          <div className="bg-white p-6 rounded-md text-black h-98 w-1/3 flex flex-col items-center gap-4 pt-12 pb-12">
            <div className="text-center">
              <h1 className="">Welcome to SkillAgent</h1>
              <p className="text-xs text-gray-600 pb-4">
                Start your journey to learning new skills
              </p>
              <hr></hr>
            </div>

            <div className="w-72  flex flex-col gap-4 my-4">
              <Input
                label="Email"
                name="email"
                crossOrigin={undefined}
                onChange={handleInput}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Input
                label="New Password"
                name="password"
                type="password"
                crossOrigin={undefined}
                onChange={handleInput}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              />
              <Button
                onClick={handleRegister}
                className=""
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Create Account
              </Button>
              <hr></hr>
              {/* @ts-ignore */}
              <Typography variant="small" className="mt-4 flex justify-center">
              Already a member?
              {/* @ts-ignore */}
              <Typography
                as="a"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => navigate("/login")}
                >
                Login
              </Typography>
            </Typography>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default Register;
