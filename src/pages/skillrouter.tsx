import { Fade } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CreateAssistant } from "../services/openai/assistant";
import CreateInstruction from "../helper/instruction";
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
import CreateStudyPlanDBJson from "../helper/generateStudyPlan";
import { addStudyPlan } from "../services/firebase/studyplan";
import { DNA } from "react-loader-spinner";
import dialogues from "../constants/creatingDialogues";

const SkillRouter: React.FC = () => {
  let { skill } = useParams();
  const { email } = useSelector((state: RootState) => state.authStore);
  let navigate = useNavigate();

  let [dialogueIndex, setDialogueIndex] = useState<number>(0);
  let [fade, setFade] = useState<boolean>(false);
  let [isLoading, setLoading] = useState<boolean>(true);

  let addAndRunMessage = async (
    threadId: string,
    assistantId: string,
    message: string,
    initial: boolean,
    dbData: any
  ) => {
    await AddMessageToThread(threadId, message).then(async () => {
      await RunThread(threadId, assistantId).then(async (runThreadResponse) => {
        if (runThreadResponse.data.status === "completed") {
          await FetchThreadMessages(runThreadResponse.data.thread_id).then(
            async (res) => {
              let finalMessages: any[] = res.data.data.reverse();
              if (initial) {
                let jsonMessage = finalMessages[1].content[0].text.value;
                let jsonData = jsonMessage.match(/```json([\s\S]*?)```/);
                let extractedJson = jsonData ? jsonData[1] : null;
                extractedJson = JSON.parse(extractedJson);
                let result = CreateStudyPlanDBJson(
                  extractedJson,
                  dbData,
                  finalMessages[3].content[0].text.value
                );
                await addStudyPlan(result);
              } else {
                finalMessages = finalMessages.slice(4);
              }
              setLoading(false);
              // navigate to next page
              navigate(`/skill/${skill}`);
              return finalMessages;
            }
          );
        } else {
          console.log(runThreadResponse.data.status);
        }
      });
    });
  };

  let initialSetup = async () => {
    await fetchSkillInfo(email, skill).then(async (skillInfoResponse) => {
      let instruction = CreateInstruction(skillInfoResponse.data);
      if (skillInfoResponse.data.title) {
        const assistantResponse = await CreateAssistant(
          skillInfoResponse.data.title,
          instruction
        );
        console.log("assistant information", assistantResponse.data);

        const threadResponse = await CreateThread();
        console.log("thread information", threadResponse.data);

        await AddThreadToDb(
          email,
          threadResponse.data.id,
          skill!,
          assistantResponse.data.id
        );
        await addAndRunMessage(
          threadResponse.data.id,
          assistantResponse.data.id,
          `With the given information, Provide me a json with a study plan for ${skillInfoResponse.data.duration} days. The json format should be {
                "day": "Day 1",
                "topic": "topic name",
                "objectives": [
                  "objective1",
                  "objective2"
                ],
                "tasks": [
                  "task1",
                  "task2",
                  "task3"
                ]
              }. Make sure there is no more than 3 objective and no more than 4 task for each day. `,
          false,
          null
        );
        await addAndRunMessage(
          threadResponse.data.id,
          assistantResponse.data.id,
          "Introduce yourself to me, cut to the point. Don't say sure or ok. Just talk to me normally.",
          true,
          skillInfoResponse.data
        );
      } else {
        navigate("/");
      }
    });
  };

  let checkForThread = async () => {
    console.log("checking");
    // if there is a thread, use it
    let threadResponse = await fetchThreadId(email, skill);

    if (threadResponse.data.message != "no document") {
      // navigate to parentpage
      navigate(`/skill/${skill}`);
      setLoading(false);

      // let jsonMessage = finalMessages[1].content[0].text.value;
      // let jsonData = jsonMessage.match(/```json([\s\S]*?)```/);
      // let extractedJson = jsonData ? jsonData[1] : null;
      // extractedJson = JSON.parse(extractedJson);
      // console.log(extractedJson);
      // console.log(finalMessages[3]);
      // CreateStudyPlanDBJson(
      //   extractedJson,
      //   {
      //     email: "baalavignesh",
      //     title: "Jap",
      //   },
      //   finalMessages[3]
      // );

      // finalMessages = finalMessages.slice(4);
    } else {
      // if not found, create a assistant and a thread and run initial command
      initialSetup();
    }
  };

  useEffect(() => {
    // fetch data from firebase about the skill, this is everything about the skill
    // look for a thread for the corresponding skill
    checkForThread();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        let newDialogueIndex = dialogueIndex + 1;
        newDialogueIndex < dialogues.length
          ? setDialogueIndex(newDialogueIndex)
          : setDialogueIndex(0);
        setFade(false);
      }, 500);
    }, 5500);

    return () => clearInterval(interval);
  }, [dialogueIndex]);

  return (
    <div className="h-screen w-full overflow-hidden">
      <>
        <div className="h-screen flex justify-center items-center bg-custom-white">
          <Fade in={true} timeout={2000}>
            <div className="flex flex-col gap-4 justify-center items-center">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <p
                className={`text-xl transition-opacity duration-500 ${
                  fade ? "opacity-0" : "opacity-100"
                }`}
              >
                {dialogues[dialogueIndex]}
              </p>
            </div>
          </Fade>
        </div>
      </>
    </div>
  );
};

export default SkillRouter;
