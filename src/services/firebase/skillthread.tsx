import axios from "axios";
import { getAccessToken } from "../../helper/localStorage";


let AddThreadToDb = async (
  accessToken: string,
  threadId: string,
  skill: string,
  assistantId: string,
  studyPlanId: string
) => {
  let threadInfo: IThreadInfo = {
    email: accessToken,
    threadId: threadId,
    assistantId: assistantId,
    skill: skill,
    studyPlanId: studyPlanId
  };
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/skillthread`,
    threadInfo,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let fetchThreadId = async (email: string, skill: string | undefined) => {
  console.log(email,skill)
  return await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/skillthread?email=${email}&skill=${skill}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

export { AddThreadToDb, fetchThreadId };
