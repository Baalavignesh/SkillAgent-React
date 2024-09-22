import axios from "axios"
import { getAccessToken } from "../../helper/localStorage";

let addStudyPlan =async (studyplan:any) => {
    return await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/studyplan`,
        studyplan,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
}

let fetchStudyPlan = async (email:string, skill:string) => {
    return await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/studyplan?email=${email}&skill=${skill}`,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
}

export {addStudyPlan, fetchStudyPlan}