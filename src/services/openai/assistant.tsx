import axios from "axios";
import { getAccessToken } from "../../helper/localStorage";

let CreateAssistant = async (name: string, instruction: string) => {
  let assistantInfo: any = {
    name,
    instruction,
  };
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/openai/assistant/`,
    assistantInfo,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let RetriveAssistant = async (assistantId: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/openai/assistant/?assistantId=${assistantId}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

export { CreateAssistant, RetriveAssistant };
