import { Fade } from "@mui/material";
import MyNavbar from "../shared/navbar";

const DailyTracker: React.FC = () => {
  return (
    <Fade in={true} timeout={1500}>
        <div>
        <MyNavbar />

        </div>
    </Fade>
  );
};

export default DailyTracker;
