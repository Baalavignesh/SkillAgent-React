import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../helper/localStorage";
import { LogoutUser } from "../services/firebase/auth";

const MyNavbar: React.FC = () => {
  let navigate = useNavigate();

  const handleLogout = async () => {
    try {
      let res = await LogoutUser();
      if (res.status == 200) {
        removeAccessToken();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 pl-24 pr-24 flex justify-between sticky top-0 items-center bg-custom-black text-white z-50">
      <h2 onClick={() => navigate("/")} className="cursor-pointer">
        SkillAgent
      </h2>
      <div className="flex gap-12 items-center justify-center">
        <h4 onClick={() => navigate("/about")} className="cursor-pointer">
          How it works?
        </h4>
        <h4
          onClick={handleLogout}
          className="cursor-pointer bg-red-400 p-2 rounded-sm"
        >
          Logout
        </h4>
      </div>
    </div>
  );
};
export default MyNavbar;
