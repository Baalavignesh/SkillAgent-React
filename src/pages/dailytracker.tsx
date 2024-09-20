import { Container, Input } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import Markdown from "react-markdown";
import { fetchThreadId } from "../services/firebase/skillthread";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../store/store";
import { FetchThreadMessages } from "../services/openai/threads";

const DailyTracker: React.FC = () => {
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

  useEffect(() => {
    scrollToBottom();
  }, [skillMessages]);

  let fetchThreadInfo = async () => {
    let threadResponse = await fetchThreadId(email, skill);
    setMyThreadInfo(threadResponse.data);

    let threadMessages = await FetchThreadMessages(
      threadResponse.data.threadId
    );
    let finalMessages: any[] = threadMessages.data.data.reverse();
    setSkillMessages(finalMessages);
  };

  useEffect(() => {
    fetchThreadInfo();
  });

  let handleSubmit = async (e: any) => {
    if (e.key === "Enter") {
      //   await addAndRunMessage(
      //     myThreadInfo.threadId,
      //     myThreadInfo.assistantId,
      //     e.target.value,
      //     false,
      //     null
      //   );
      setUserInput("");
    }
  };

  let handleInput = (e: any) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <Container
        maxWidth="lg"
        className="flex flex-col justify-center items-center h-[85%] bg-gray-50 shadow-xl overflow-scroll"
      >
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
      <Container maxWidth="lg" className="py-4 bg-white">
        <Input
          aria-label="Ask SkillAgent"
          className="self-end justify-end bg-white pt-2"
          // crossOrigin={undefined}
          value={userInput}
          onChange={handleInput}
          onKeyDown={(e) => handleSubmit(e)}
          // onPointerEnterCapture={undefined}
          // onPointerLeaveCapture={undefined}
        ></Input>
      </Container>
    </div>
  );
};

export default DailyTracker;
