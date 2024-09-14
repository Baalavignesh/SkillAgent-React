import axios from "axios";
import { getAccessToken } from "../../helper/localStorage";

let CreateThread = async () => {
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/openai/thread/createthread`,
    {},
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let AddMessageToThread = async (threadId: string, userMessage: string) => {
  let messageInfo: any = {
    threadId,
    userMessage,
  };
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/openai/thread/addmessage`,
    messageInfo,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let RunThread = async (threadId: string, assistantId: string) => {
  let runThread: any = {
    threadId,
    assistantId,
  };
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/openai/thread/runthread`,
    runThread,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

// let RetriveAssistant = async (assistantId: string) => {
//   return await axios.get(
//     `${
//       import.meta.env.VITE_API_ENDPOINT
//     }/openai/assistant/?assistantId=${assistantId}`,
//     { headers: { Authorization: `Bearer ${getAccessToken()}` } }
//   );
// };

let FetchThreadMessages = async (threadId: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/openai/thread/fetchmessage?threadId=${threadId}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

export { CreateThread, AddMessageToThread, RunThread, FetchThreadMessages };
