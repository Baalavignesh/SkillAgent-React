import { Fade } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { fetchThreadId } from "../services/firebase/skillthread";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../store/store";
import {
  AddMessageToThread,
  CreateThread,
  FetchThreadMessages,
  RunThread,
} from "../services/openai/threads";
import {
  addNewThreadToPlan,
  fetchStudyPlan,
  updateTaskStatus,
} from "../services/firebase/studyplan";
import { generateDailyInitial } from "../helper/gptCommands";
import MyNavbar from "../shared/navbar";
import { DNA, ThreeDots } from "react-loader-spinner";
import { Input } from "@material-tailwind/react";
import {
  faArrowLeft,
  faArrowRight,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MarkdownRenderer from "../shared/chatbubble";

const DailyTracker: React.FC = () => {
  let { skill, day } = useParams();
  let dayNumber: number = parseInt(day!, 10);

  const { email } = useSelector((state: RootState) => state.authStore);
  let navigate = useNavigate();

  let [mainSkillInfo, setMainSkillInfo] = useState<IThreadInfo>({
    email: email,
    skill: skill!,
    threadId: "",
    assistantId: "",
    studyPlanId: "",
  });
  let [skillMessages, setSkillMessages] = useState<any>([]);
  let [currentThread, setCurrentThread] = useState<string>("");
  let [studyPlan, setStudyPlan] = useState<Plan>();
  let [loading, setLoading] = useState<boolean>(true);
  let [messageLoader, setMessageLoader] = useState<boolean>(false);

  let fetchMessages = async (threadId: string) => {
    let allThreadMessageResponse = await FetchThreadMessages(threadId);
    let finalMessages: any[] = allThreadMessageResponse.data.data.reverse();
    finalMessages = finalMessages.slice(1);
    setSkillMessages(finalMessages);
    console.log(finalMessages);
    return finalMessages;
  };

  let addAndRunMessage = async (
    threadId: string,
    assistantId: string,
    message: string
  ) => {
    setMessageLoader(true);
    await AddMessageToThread(threadId, message);
    let runThreadResponse = await RunThread(threadId, assistantId);
    if (runThreadResponse.data.status === "completed") {
      await fetchMessages(runThreadResponse.data.thread_id);
      setMessageLoader(false);
    } else {
      console.log(runThreadResponse.data.status);
    }
  };

  let fetchDailyInfo = async () => {
    let threadResponse = await fetchThreadId(email, skill);
    setMainSkillInfo(threadResponse.data);

    await checkForDailyThread(
      threadResponse.data.studyPlanId,
      threadResponse.data.assistantId
    );
    setLoading(false);
  };

  let checkForDailyThread = async (
    studyPlanId: string,
    assistantId: string
  ) => {
    let studyPlan = await fetchStudyPlan(email, skill!);
    setStudyPlan(studyPlan.data.plan[dayNumber - 1]);
    console.log(studyPlan.data);
    setCurrentThread(studyPlan.data.plan[dayNumber - 1].threadId);
    let currentPlanInfo = studyPlan.data.plan[dayNumber - 1];
    // thread available for the studyplan
    if (currentPlanInfo.threadId) {
      console.log("thread found");
      await fetchMessages(currentPlanInfo.threadId);
    } else {
      console.log("no thread found, trying to create one");
      let newThreadResponse = await CreateThread();
      setCurrentThread(newThreadResponse.data.id);
      let newThreadInfo = {
        docId: studyPlanId,
        newThreadId: newThreadResponse.data.id,
        dayNumber: dayNumber,
      };

      await addNewThreadToPlan(newThreadInfo);

      let dailyInitialMessage: string = generateDailyInitial(
        currentPlanInfo.objectives,
        currentPlanInfo.tasks
      );

      await addAndRunMessage(
        newThreadResponse.data.id,
        assistantId,
        dailyInitialMessage
      );
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchDailyInfo();
  }, [dayNumber]);

  let handleSubmit = async (e: any) => {
    console.log("called");
    await addAndRunMessage(
      currentThread,
      mainSkillInfo?.assistantId,
      e.target.value
    );
  };

  return (
    <div className="max-h-screen overflow-clip h-full">
      <MyNavbar />
      <Fade in={true} timeout={1500}>
        {loading ? (
          <div className="flex flex-col gap-4 justify-center items-center h-[90vh]">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
            <p
              className={`text-2xl animate-pulse transition-opacity duration-500`}
            >
              Loading...
            </p>
          </div>
        ) : (
          <div className="flex flex-grow h-full">
            <div className="flex flex-col w-2/5 p-12">
              <p className="text-4xl pb-2 mb-4 border-b-2 border-blue-gray-50">
                {studyPlan?.day} - {mainSkillInfo.skill} Tutor
              </p>
              <div className="bg-gray-100 rounded-md">
                <p className="self-start p-4 pt-6 pb-2 text-xl border-b-2 w-full">
                  Today's Objectives
                </p>
                <hr></hr>
                <div className="w-full">
                  {studyPlan?.objectives.map((obj: string, index: number) => {
                    return (
                      <div
                        className="flex justify-between items-center p-4 bg-white rounded-md m-2"
                        key={index}
                      >
                        <div className=""> {obj}</div>
                      </div>
                    );
                  })}
                  {/* @ts-ignore */}
                </div>
              </div>

              <div className="bg-gray-100  mt-4 rounded-lg flex flex-col">
                <p className="self-start p-4 pt-6 pb-2 text-xl border-b-2 w-full">
                  All Tasks
                </p>
                {studyPlan?.tasks.map((task: Task, index: number) => {
                  return (
                    <div
                      className={`flex justify-between items-center cursor-pointer p-4 ${
                        task.isDone ? "bg-green-100" : "bg-white"
                      } rounded-md m-2  ${
                        task.isDone ? "hover:bg-green-200" : "hover:bg-gray-50"
                      }  transition duration-200`}
                      key={index}
                      onClick={async () => {
                        setStudyPlan({
                          ...studyPlan,
                          tasks: studyPlan.tasks.map((task, taskIndex) => {
                            if (taskIndex === index) {
                              return {
                                ...task,
                                isDone: true,
                              };
                            }
                            return task;
                          }),
                        });
                        await addAndRunMessage(
                          currentThread,
                          mainSkillInfo?.assistantId,
                          `Task ${index + 1} ${task[index]} `
                        );
                        await updateTaskStatus({
                          docId: mainSkillInfo.studyPlanId,
                          taskNumber: index,
                          dayNumber: dayNumber,
                        });
                      }}
                    >
                      <div className="">{task[index]}</div>
                      <FontAwesomeIcon
                        icon={faCircleCheck}
                        size="lg"
                        className="mr-2"
                        color={`${task.isDone && "green"}`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between w-full mt-6 gap-12">
                <div
                  className={`bg-gray-100 p-8 rounded-lg w-full text-center flex gap-4 justify-center items-center cursor-pointer hover:bg-gray-200 transition duration-150`}
                  onClick={() => {
                    if (dayNumber > 1) {
                      navigate(
                        `/skill/${mainSkillInfo.skill}/${dayNumber - 1}`
                      );
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Previous Day
                </div>
                <div
                  className={`bg-gray-100 p-8 rounded-lg w-full text-center flex gap-4 justify-center items-center cursor-pointer hover:bg-gray-200 transition duration-150`}
                  onClick={() => {
                    navigate(`/skill/${mainSkillInfo.skill}/${dayNumber + 1}`);
                  }}
                >
                  <span>Next Day </span> <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </div>
            <div className="w-3/5 bg-gray-50 p-12">
              <p className="font-normal text-2xl  pb-4">My Progress</p>
              <ChatWindow
                skillMessages={skillMessages}
                myHandleSubmit={handleSubmit}
                messageLoader={messageLoader}
              />
            </div>
          </div>
        )}
      </Fade>
    </div>
  );
};

export default DailyTracker;

interface ChatWindowProps {
  skillMessages: any;
  myHandleSubmit: any;
  messageLoader: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  skillMessages,
  myHandleSubmit,
  messageLoader,
}) => {
  let [userInput, setUserInput] = useState<string>("");
  const messagesEndRef = useRef<any>(null);

  useEffect(() => {
    scrollToBottom();
  }, [skillMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let handleInput = (e: any) => {
    setUserInput(e.target.value);
  };

  return (
    <div className=" border-2 border-gray-300 rounded-md bg-white">
      <div className="flex flex-col    ">
        <div className="justify-end  w-full rounded-md p-4 bg-white  h-[65vh] overflow-scroll scrollbar scrollbar-thumb-gray-400 scrollbar-track-white">
          {skillMessages?.map((message: Message) => {
            return (
              <div key={message.id}>
                {message.role === "user" ? (
                  // User Chat Bubble
                  <div className="mt-2">
                    <hr></hr>
                    <div className="w-full flex flex-row items-end justify-end bg-white p-4 pr-0 py-0 rounded-md">
                      <div className="w-10/12 flex flex-end justify-end">
                        <span className="whitespace-pre-wrap w-fit px-4 py-2 m-4 rounded-br-none rounded-lg bg-custom-black text-white ">
                          <MarkdownRenderer
                            markdownContent={message.content[0].text.value}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  // GPT Chat Bubble
                  <div
                    className="w-full flex flex-row  bg-gray-200 p-4 rounded-md"
                    key={message.id}
                  >
                    <div className="w-10/12">
                      <span className="whitespace-pre-wrap px-4 py-2 m-4 rounded-bl-none rounded-lg text-custom-black text-sm">
                        <MarkdownRenderer
                          markdownContent={message.content[0].text.value}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div
        className={`w-full text-center flex justify-center items-center transition ease-in-out duration-200 h-12`}
      >
        <div className={`${messageLoader ? "block" : "hidden"}`}>
          <ThreeDots
            visible={true}
            height="10"
            width="40"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </div>

      <hr></hr>

      <div className="p-2 bg-white m-1 ">
        {/* @ts-ignore */}
        <Input
          label="Ask SkillAgent"
          name="Ask SkillAgent"
          crossOrigin={undefined}
          onChange={handleInput}
          value={userInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setUserInput("");
              myHandleSubmit(e);
            }
          }}
        />
      </div>
    </div>
  );
};
