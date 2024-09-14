import axios from "axios";
import { getAccessToken } from "../../helper/localStorage";

let fetchUserSkills = async (email: string) => {
  return await axios.get(
    `${import.meta.env.VITE_API_ENDPOINT}/userskill?email=${email}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let fetchSkillInfo = async (email: string, skill: string | undefined) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/userskill/skillinfo?email=${email}&skill=${skill}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let addNewSkill = async (newSkillData: ISkillInfo) => {
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/userskill`,
    newSkillData,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

export { fetchUserSkills, fetchSkillInfo, addNewSkill };
