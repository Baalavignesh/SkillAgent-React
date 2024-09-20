import { Container, Fade } from "@mui/material";
import React, { useState } from "react";
import MyNavbar from "../shared/navbar";
import { Button, Input, Select, Option } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { background } from "../assets";
import { addNewSkill } from "../services/firebase/userskills";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const NewSkill: React.FC = () => {
  let navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.authStore);

  let handleInput = (e: any) => {
    setNewSkillData({
      ...newSkillData,
      [e.target.name]: e.target.value,
    });
  };

  let handleNewSkill = () => {
    addNewSkill(newSkillData).then(() => {
      navigate(`/skillrouter/${newSkillData.title}`);
    });
  };
  let handleDropdown = (id: string, value: string) => {
    setNewSkillData({
      ...newSkillData,
      [id]: id === "duration" ? parseInt(value) : value,
    });
  };

  let [newSkillData, setNewSkillData] = useState<ISkillInfo>({
    title: "",
    what: "",
    level: "",
    duration: 0,
    description: "",
    email: email,
  });

  return (
    <div
      className="h-screen overflow-hidden w-full"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MyNavbar />
      <Fade in={true} timeout={1500}>
        <Container
          maxWidth="xl"
          className="flex flex-col justify-center items-center"
        >
          <form>
            <h1 className="mt-12 mb-12 text-center text-u">New Skills</h1>
            <div className="flex justify-center ">
              <div className="w-2/5  bg-brown-100 p-4 rounded-md rounded-r-none flex items-center pl-20">
                <p className="w-11/12 leading-normal text-4xl">
                  Start your journey on learning a new skill now
                </p>
              </div>
              <div className="p-4 bg-gray-50 w-full rounded-md flex flex-col justify-center items-center ">
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">Tile of the Skill</p>
                  <Input
                    required
                    label="Title of Skill"
                    crossOrigin={undefined}
                    name="title"
                    value={newSkillData.title}
                    onChange={handleInput}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>

                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">What would you like to learn</p>
                  <Input
                    required
                    label="Name of the skill"
                    crossOrigin={undefined}
                    name="what"
                    value={newSkillData.what}
                    onChange={handleInput}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">Current level of your skill</p>
                  <Select
                    label="Current Level"
                    name="level"
                    value={newSkillData.level}
                    onChange={(e: any) => handleDropdown("level", e)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Option value="beginner">Beginner</Option>
                    <Option value="intermediate">Intermediate</Option>
                    <Option value="expert">Expert</Option>
                  </Select>
                </div>
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">
                    How fast would you like to learn the skill
                  </p>
                  <Select
                    label="Duration"
                    name="duration"
                    value={newSkillData.duration.toString()}
                    onChange={(e: any) => handleDropdown("duration", e)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <Option value="7">1 Week</Option>
                    <Option value="30">1 Month</Option>
                    <Option value="100">100 Days</Option>
                  </Select>
                </div>
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">Provide further information(optional)</p>
                  <Input
                    required
                    label="Extra"
                    crossOrigin={undefined}
                    name="description"
                    value={newSkillData.description}
                    onChange={handleInput}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center mt-4">
              <Button
                className="mt-4 text-lg font-light"
                onClick={handleNewSkill}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Start Learning
              </Button>
            </div>
          </form>
        </Container>
      </Fade>
    </div>
  );
};

export default NewSkill;
