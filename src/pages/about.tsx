import React from "react";
import { Container, Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";
import { aboutmain, ai1, ai2, reliable } from "../assets";
import MyFooter from "../shared/footer";
import aboutus from "../constants/aboutus";

const About: React.FC = () => {
  return (
    <div>
      <MyNavbar />

      <Fade in={true} timeout={1000}>
        <div className="flex flex-col w-full h-full bg-gray-100" >
          <div className="bg-white">          <div className="flex flex-col  justify-center items-center w-full bg-white">
            <h2 className="m-16 text-center text-3xl border-b-2 pb-3">
              Inside SkillAgent: The Technology Unleashed
            </h2>
            <img src={aboutmain} className="h-64" />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4 mx-20">
            {aboutus.map((about) => {
              return (
                <ContentCard
                  heading={about.heading}
                  content={about.description}
                />
              );
            })}
          </div>

          </div>


          <div className="px-32">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20">
              <img src={ai1} className="h-64" />
              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  Personalized AI Assistant
                </div>

                <p className="w-11/12 text-xl ">
                  At the heart of our platform is a powerful AI assistant
                  designed to provide real-time, customized support. Based on
                  your learning objectives and skill level, the assistant helps
                  you navigate your course with tailored responses, ensuring
                  that you get the most relevant and accurate guidance
                  throughout your journey.
                </p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="px-32 bg-white">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20">
              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  Ongoing Conversations with Threads
                </div>

                <p className="w-11/12 text-xl ">
                  With OpenAI’s threads feature, you never lose track of your
                  learning discussions. All conversations with the AI assistant
                  are saved, allowing you to revisit previous chats and continue
                  learning from where you left off. This ensures a seamless,
                  ongoing learning experience without interruptions.
                </p>
              </div>

              <img src={ai2} className="h-64" />
            </div>
          </div>
          <div className="px-32 ">
            <hr></hr>
            <div className="flex justify-around items-center p-12 pt-0 h-[60vh] gap-20">
              <img src={reliable} className="h-64" />

              <div className="flex flex-col gap-8">
                <div className="text-4xl font-medium">
                  Reliable and Secure Platform
                </div>

                <p className="w-11/12 text-xl ">
                  Our application is built using modern, reliable technologies
                  to ensure a smooth and secure experience. From a responsive
                  user interface to secure data management, every aspect is
                  designed to provide a fast, user-friendly platform that keeps
                  your personal information safe while you focus on learning and
                  growing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Fade>
      <MyFooter />
    </div>
  );
};

export default About;

interface IContentCardProps {
  heading: string;
  content: string;
}
const ContentCard: React.FC<IContentCardProps> = ({ heading, content }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center  p-12 m-4 ">
      <div className="text-2xl font-medium">{heading}</div>
      <p className="text-center">{content}</p>
    </div>
  );
};
