import React from "react";
import { Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";
import { img1, img2, img3, img4 } from "../assets";

const About: React.FC = () => {
  return (
    <div>
      <MyNavbar />

      <h2 className="m-16 text-center text-4xl ">Inside SkillAgent: The Technology Unleashed</h2>

      <Fade in={true} timeout={1000}>
        <section className="p-0">
          <div className="mb-16 flex flex-wrap bg-custom-white p-12">
            <div className="w-1/2 flex justify-center items-center">
              <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                <img src={img1} className="w-full" />
              </div>
            </div>

            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                OpenAI Assistant for Personalized Mentoring
              </h3>
              <div className="flex items-center text-sm font-medium">
                Tailored Learning Experiences
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                OpenAI's Assistant powers the core of our platform, providing
                tailored guidance based on individual user needs. By analyzing
                user input, the Assistant delivers context-aware advice,
                recommendations, and learning paths, making it more effective
                than generic chatbots.
              </p>
              <br></br>

              <p className="text-neutral-500 text-xl">
                It adapts to each user's learning style, offering a truly
                personalized experience that evolves as the user progresses.
              </p>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-custom-white p-12">
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                Thread-Based Conversation Tracking
              </h3>
              <div className="flex items-center text-sm font-medium">
                Continuous and Contextual Learning
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                We utilize thread-based conversation tracking to maintain the
                continuity of user interactions with the AI. This feature
                ensures that the Assistant can reference past conversations,
                providing more accurate and contextually relevant responses.
              </p>
              <br></br>

              <p className="text-neutral-500 text-xl">
                The system allows users to pick up right where they left off,
                enhancing the learning experience by maintaining focus on their
                progress.
              </p>
            </div>

            <div className="w-1/2 flex justify-center items-center">
              <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                <img src={img2} className="w-full" />
              </div>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-custom-white p-12">
            <div className="w-1/2 flex justify-center items-center">
              <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                <img src={img3} className="w-full" />
              </div>
            </div>
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">
                Firebase Authentication and Data Management
              </h3>
              <div className="flex items-center text-sm font-medium">
                Secure and Scalable Infrastructure
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                Firebase handles user authentication, ensuring secure access and
                seamless sign-in experiences. It also stores user data,
                including skill lists and learning progress, in real-time
                databases.
              </p>
              <br></br>
              <p className="text-neutral-500 text-xl">
                This infrastructure provides robust security and scalability,
                ensuring that user information is protected and readily
                available across devices, enabling a consistent learning
                experience.
              </p>
            </div>
          </div>

          <div className="mb-16 flex flex-wrap bg-custom-white p-12">
            <div className="w-6/12 p-12 flex flex-col">
              <h3 className="mb-4 text-2xl font-bold">What’s Next?</h3>
              <div className="flex items-center text-sm font-medium">
                Enhancing the Conversational Experience
              </div>
              <p className="mb-6 text-neutral-500"></p>
              <p className="text-neutral-500 text-xl">
                We are planning to improve the chat response speed and integrate
                voice-to-text and voice-to-voice features. These additions will
                make interactions feel more like direct conversations, creating
                a smoother and more immersive learning environment.
              </p>

              <br></br>

              <p className="text-neutral-500 text-xl">
                By refining the AI's responsiveness and enabling voice
                communication, we aim to make the user experience even more
                intuitive and engaging.
              </p>
            </div>

            <div className="w-1/2 flex justify-center items-center">
              <div className="cursor-pointer overflow-hidden object-none rounded-lg bg-cover h-[350px] flex justify-center items-center">
                <img src={img4} className="w-full" />
              </div>
            </div>
          </div>
        </section>
      </Fade>
    </div>
  );
};

export default About;
