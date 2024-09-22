import { Container, Fade } from "@mui/material";
import React, { useState } from "react";
import MyNavbar from "../shared/navbar";
import {
  Button,
  Input,
  Select,
  Option,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { addNewSkill } from "../services/firebase/userskills";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const NewSkill: React.FC = () => {
  let navigate = useNavigate();
  const { email } = useSelector((state: RootState) => state.authStore);

  let [newSkillData, setNewSkillData] = useState<ISkillInfo>({
    title: "",
    what: "",
    level: "",
    duration: 0,
    description: "",
    email: email,
  });

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

  return (
    <div className="h-screen overflow-hidden w-full">
      <MyNavbar />
      <Fade in={true} timeout={1500}>
        <Container
          maxWidth="xl"
          className="flex flex-col justify-center items-center"
        >
          <SkillNameDialog
            newSkillData={newSkillData}
            handleInput={handleInput}
          />
          <form>
            <h1 className="mt-12 mb-12 text-center text-u">New Skills</h1>
            <div className="flex justify-center ">
              <div className="w-2/5 bg-gray-50  border-r-2 p-4 pl-8 rounded-md rounded-r-none flex items-center">
                <p className="w-full  leading-normal text-2xl">
                  Start your journey on learning a new skill now
                </p>
              </div>
              <div className="p-4 bg-gray-50 w-full rounded-md flex flex-col justify-center items-center ">
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">What skill do you want to learn?</p>
                  <Input
                    required
                    label="Description"
                    crossOrigin={undefined}
                    name="what"
                    value={newSkillData.what}
                    onChange={handleInput}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  />
                </div>
                <div className="flex w-full gap-4 justify-center items-center p-4">
                  <p className="w-1/2">What is the current skill level?</p>
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
                    How fast would you like to learn the skill?
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
                  <p className="w-1/2">
                    Is there any further information?(optional)
                  </p>
                  <Input
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
              {/* @ts-ignore */}

              <Button
                variant="gradient"
                className="mt-4 font-normal text-base w-fit"
                onClick={handleNewSkill}
                fullWidth
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

interface SkillNameDialogProps {
  newSkillData: any;
  handleInput: any;
}

let SkillNameDialog: React.FC<SkillNameDialogProps> = ({
  newSkillData,
  handleInput,
}) => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      {/* @ts-ignore */}

      <Dialog
        size="md"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        dismiss={{
          enabled: false, // Disable all dismiss actions
          outsidePress: false, // Prevent closing when clicking outside
          escapeKey: false, // Prevent closing when pressing the escape key
        }}
      >
        {/* @ts-ignore */}

        <Card className="mx-auto w-full max-w-[24rem]">
          {/* @ts-ignore */}

          <CardBody className="flex flex-col gap-4">
            {" "}
            {/* @ts-ignore */}
            <Typography variant="h4" color="blue-gray">
              New Skill
            </Typography>
            {/* @ts-ignore */}
            <Typography
              className=" font-normal"
              variant="paragraph"
              color="gray"
            >
              How would you like to call the new skill you are about to learn?
            </Typography>
            {/* @ts-ignore */}
            <Input
              required
              label="Skill"
              crossOrigin={undefined}
              name="title"
              value={newSkillData.title}
              onChange={handleInput}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          </CardBody>
          {/* @ts-ignore */}

          <CardFooter className="pt-0">
            {/* @ts-ignore */}

            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Next
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};
