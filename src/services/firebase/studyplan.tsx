import axios from "axios"
import { getAccessToken } from "../../helper/localStorage";

let addStudyPlan =async (studyplan:any) => {
    return await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/studyplan`,
        studyplan,
        { headers: { Authorization: `Bearer ${getAccessToken()}` } }
      );
}

export {addStudyPlan}