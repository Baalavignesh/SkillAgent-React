import { Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";
import { useEffect, useState } from "react";
import { fetchStudyPlan } from "../services/firebase/studyplan";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
} from "@material-tailwind/react";
import React from "react";
import { useCountUp } from "use-count-up";
import myLearningPlan from "../constants/learnignPlan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faLock } from "@fortawesome/free-solid-svg-icons";
import findPercentage from "../helper/findPercentage";
import { certificate } from "../assets";

const DailyTracker: React.FC = () => {
  let { skill } = useParams();
  const { email } = useSelector((state: RootState) => state.authStore);
  let [skillPlanInfo, setSkillPlanInfo] =
    useState<LearningPlan>(myLearningPlan);
  let [percentage, setPercentage] = useState<number>(64);

  let getDbInfo = async () => {
    let response = await fetchStudyPlan(email, skill!);
    setSkillPlanInfo(response.data);

    let myPercentage = findPercentage(response.data.plan);
    setPercentage(myPercentage);
  };

  useEffect(() => {
    getDbInfo();
  }, []);

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: percentage,
  });

  return (
    <div className="min-h-screen h-full flex flex-col">
      <MyNavbar />
      <Fade in={true} timeout={1500}>
        <div className="flex flex-grow h-full">
          <div className="flex flex-col w-2/5 p-12">
            <p className="text-4xl pb-2 mb-4 border-b-2 border-blue-gray-50">
              {skillPlanInfo?.title} Tutor
            </p>
            <p className="text-lg">{skillPlanInfo?.introduction}</p>
            <div className="w-56 self-center mt-12">
              <CircularProgressbar
                value={value2 as number}
                text={`${value2}%`}
                strokeWidth={5}
                styles={buildStyles({
                  pathTransition:
                    percentage === 0
                      ? "none"
                      : "stroke-dashoffset 0.5s ease 0s",
                  pathColor: "#9575CC",
                  trailColor: "#f5f5f5",
                  textColor: "black",
                })}
              />
              <p className="text-center py-8">{percentage}% Completed</p>
              {/* @ts-ignore */}
            </div>
            <hr></hr>
            <div className="bg-gray-300 my-12 rounded-lg h-36 flex flex-col relative justify-center items-center border-2 border-gray-300">
              <div className="mt-0 top-auto absolute z-40 bg-black text-white py-4 px-6 rounded-lg  select-none cursor-pointer hover:scale-105 duration-200 transition-all hover:border-white">
                Get Certificate
                <FontAwesomeIcon icon={faLock} size="sm" className="pl-4" />
              </div>
              <div className="blur-sm mt-2 p-4 h-full w-4/5 select-none flex gap-12">
                <img src={certificate} className="w-20 " />
                Congratulation on Completing your Course. SkillAgent is happy
                for you, Congratulation on Course. I am proud of yuou my boy.
                Proud me
              </div>
            </div>
          </div>
          <div className="w-3/5 bg-gray-50 p-12">
            <p className="font-normal text-2xl  pb-4">My Progress</p>
            <ProgressAccordian skillPlan={skillPlanInfo?.plan} />
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default DailyTracker;

interface ProgressAccordionProps {
  skillPlan: Plan[] | undefined;
}

const ProgressAccordian: React.FC<ProgressAccordionProps> = ({ skillPlan }) => {
  const [open, setOpen] = React.useState<number>(1);
  let navigate = useNavigate();

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <>
      {skillPlan?.map((plan: Plan, index: number) => {
        const dayNumber = parseInt(plan.day.split(" ")[1]);
        let progress: number[] = [];
        if (progress[index] === undefined) {
          progress[index] = 0; // Initialize if not set
        }
        plan.tasks.forEach((value) => {
          if (value.isDone) {
            console.log(plan.day, value.isDone);
            progress[index] = progress[index] + 1;
          } else {
            progress[index] = progress[index];
          }
        });
        return (
          <div key={dayNumber} className="w-full">
            {/* @ts-ignore */}
            <Accordion
              open={open === dayNumber}
              icon={<Icon id={1} open={open} />}
              className="mb-2 rounded-lg border border-blue-gray-100 px-4 w-full"
            >
              {/* @ts-ignore */}

              <AccordionHeader
                onClick={() => handleOpen(dayNumber)}
                className={`border-b-0 transition-colors ${
                  open === dayNumber ? "text-blue-500" : ""
                }`}
              >
                <span>
                  {plan.day} : {plan.topic}
                  <span className="font-light text-base">
                    ({progress[index]}/3)
                  </span>
                </span>
              </AccordionHeader>
              <AccordionBody className=" flex flex-col flex-grow pt-0 text-base font-normal w-full">
                {plan.objectives.map((objective: string, index: number) => {
                  return (
                    <div
                      key={index}
                      onClick={() => navigate(`${dayNumber}`)}
                      className="cursor-pointer flex flex-between px-4 w-full hover:bg-blue-gray-50 duration-200 rounded-md ease-in-out transition-all"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p className={`text-lg text-black font-medium py-4 `}>
                        {objective}
                      </p>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="lg"
                        className="mr-2"
                        color={`${plan.tasks[index].isDone && "green"}`}
                      />
                    </div>
                  );
                })}
              </AccordionBody>
            </Accordion>
          </div>
        );
      })}
    </>
  );
};

interface IconProps {
  id: number;
  open: number;
}
const Icon: React.FC<IconProps> = ({ id, open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
