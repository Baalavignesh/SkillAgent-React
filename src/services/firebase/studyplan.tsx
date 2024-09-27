import axios from "axios";
import { getAccessToken } from "../../helper/localStorage";

let addStudyPlan = async (studyplan: any) => {
  return await axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/studyplan`,
    studyplan,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let fetchStudyPlan = async (email: string, skill: string) => {
  return await axios.get(
    `${
      import.meta.env.VITE_API_ENDPOINT
    }/studyplan?email=${email}&skill=${skill}`,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let addNewThreadToPlan = async (newThreadInfo: any) => {
  return await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}/studyplan`,
    newThreadInfo,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};

let updateTaskStatus = async (updateTaskInfo: any) => {
  return await axios.put(
    `${import.meta.env.VITE_API_ENDPOINT}/studyplan/task`,
    updateTaskInfo,
    { headers: { Authorization: `Bearer ${getAccessToken()}` } }
  );
};
export { addStudyPlan, fetchStudyPlan, addNewThreadToPlan, updateTaskStatus };
