import { Container } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import MyNavbar from "../shared/navbar";
import { Input } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { background } from "../assets";
import { CreateAssistant } from "../services/openai/assistant";
import CreateInstruction from "../helper/instruction";
import Markdown from "react-markdown";
import {
  AddMessageToThread,
  CreateThread,
  FetchThreadMessages,
  RunThread,
} from "../services/openai/threads";
import { fetchSkillInfo } from "../services/firebase/userskills";
import { AddThreadToDb, fetchThreadId } from "../services/firebase/skillthread";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import Loading from "../shared/loading";

const MySkill: React.FC = () => {
  let { skill } = useParams();
  const { email } = useSelector((state: RootState) => state.authStore);

  const messagesEndRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let [userInput, setUserInput] = useState<string>("");
  let [myThreadInfo, setMyThreadInfo] = useState<IThread>({
    skill: skill,
    email: email,
    threadId: "",
    assistantId: "",
  });
  let [skillMessages, setSkillMessages] = useState<any>([]);
  let [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    scrollToBottom();
  }, [skillMessages]);

  let handleSubmit = async (e: any) => {
    if (e.key === "Enter") {
      await addAndRunMessage(
        myThreadInfo.threadId,
        myThreadInfo.assistantId,
        e.target.value
      );
      setUserInput("");
    }
  };

  let handleInput = (e: any) => {
    setUserInput(e.target.value);
  };

  let addAndRunMessage = async (
    threadId: string,
    assistantId: string,
    message: string
  ) => {
    await AddMessageToThread(threadId, message).then(() => {
      RunThread(threadId, assistantId).then(async (runThreadResponse) => {
        if (runThreadResponse.data.status === "completed") {
          FetchThreadMessages(runThreadResponse.data.thread_id).then((res) => {
            console.log(res.data);
            setSkillMessages(res.data.data.reverse());
            setLoading(false);
          });
        } else {
          console.log(runThreadResponse.data.status);
        }
      });
    });
  };

  let initialSetup = async () => {
    await fetchSkillInfo(email, skill).then(async (skillInfoResponse) => {
      let instruction = CreateInstruction(skillInfoResponse.data);
      await CreateAssistant(skillInfoResponse.data.title, instruction).then(
        async (assistantResponse) => {
          console.log("assistant information", assistantResponse.data);
          await CreateThread().then((threadResponse) => {
            console.log("thread information", threadResponse.data);
            setMyThreadInfo({
              ...myThreadInfo,
              threadId: threadResponse.data.id,
              assistantId: assistantResponse.data.id,
            });
            AddThreadToDb(
              email,
              threadResponse.data.id,
              skill!,
              assistantResponse.data.id
            );

            addAndRunMessage(
              threadResponse.data.id,
              assistantResponse.data.id,
              "Introduce yourself to me with your purpose, give me a task for the day"
            );
          });
        }
      );
    });
  };

  let checkForThread = () => {
    // if there is a thread, use it
    fetchThreadId(email, skill).then((res) => {
      if (res.data.message != "no document") {
        setMyThreadInfo(res.data);
        FetchThreadMessages(res.data.threadId).then((res) => {
          setSkillMessages(res.data.data.reverse());
          setLoading(false);
        });
      } else {
        // if not found, create a assistant and a thread and run initial command
        initialSetup();
      }
    });
  };

  useEffect(() => {
    // fetch data from firebase about the skill, this is everything about the skill
    // look for a thread for the corresponding skill

    checkForThread();
  }, []);

  return (
    <div
      className="h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url(${background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MyNavbar />
      <>
        {loading ? (
          <div className="h-screen flex justify-center items-center bg-custom-black">
            <Loading />
          </div>
        ) : (
          <Container
            maxWidth="lg"
            className="flex flex-col justify-center items-center h-[85%] bg-gray-50 shadow-xl overflow-scroll"
          >
            <h1 className="pt-10 pb-6  text-center border-b-2">{skill}</h1>
            <div className="flex flex-col justify-end  w-full rounded-md p-4">
              {skillMessages?.map((message: Message) => {
                return (
                  <div key={message.id}>
                    {message.role === "user" ? (
                      <>
                      <hr></hr>
                       <div className="w-full flex flex-row items-end justify-end">
                        <div className="w-10/12 flex flex-end justify-end">
                          <span className="whitespace-pre-wrap w-fit px-4 py-2 m-4 mr-2 rounded-br-none rounded-lg bg-custom-black text-white">
                            {message.content[0].text.value}
                          </span>
                        </div>
                      </div>
                      </>
                     
                    ) : (
                      <div
                        className="w-10/12 flex flex-row items-end"
                        key={message.id}
                      >
                        <div className="w-10/12">
                          <span className="whitespace-pre-wrap px-4 py-2 m-4 ml-2 rounded-bl-none rounded-lg bg-white text-custom-black">
                            <Markdown>{message.content[0].text.value}</Markdown>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              <div ref={messagesEndRef} />
            </div>
          </Container>
        )}
        <Container maxWidth="lg" className="py-4 bg-white">
          <Input
            label="Ask SkillAgent"
            className="self-end justify-end bg-white pt-2"
            crossOrigin={undefined}
            value={userInput}
            onChange={handleInput}
            onKeyDown={(e) => handleSubmit(e)}
          ></Input>
        </Container>
      </>
    </div>
  );
};

export default MySkill;
