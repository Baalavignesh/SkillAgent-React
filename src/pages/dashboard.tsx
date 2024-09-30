import { useEffect, useState } from "react";
import { Container, Fade } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight, faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import MyNavbar from "../shared/navbar";
import { fetchUserSkills } from "../services/firebase/userskills";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { newcard } from "../assets";

const Dashboard: React.FC = () => {
  let [mySkills, setMySkills] = useState<ISkillInfo[]>([]);
  const { email } = useSelector((state: RootState) => state.authStore);
  let navigate = useNavigate();

  let fetchUserSkill = async () => {
    let userSkills = await fetchUserSkills(email);
    setMySkills(userSkills.data);
  };

  useEffect(() => {
    fetchUserSkill();
  }, []);

  return (
    <div
      className="h-screen overflow-y w-full"
      style={{
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <MyNavbar />
      <Fade in={true} timeout={1500}>
        <Container maxWidth="xl">
          <h1 className="mt-12 mb-12 text-center">
            <Container maxWidth="md">
              <div
                className="bg-gray-200 cursor-pointer rounded-md p-4 w-full flex gap-12 items-center justify-center hover:bg-gray-300 transition-all duration-500"
                onClick={() => navigate("/newskill")}
              >
                <h1>
                <FontAwesomeIcon icon={faAdd} className="w-6 pr-4" />

                  Learn New Skill
                </h1>
                <img src={newcard} className="h-32"></img>
              </div>
            </Container>
          </h1>

          <div className="grid grid-cols-1 gap-4 place-items-center select-none sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {mySkills.map((skill: any, index: number) => {
              return <MySkill name={skill.title} id={1} key={index} />;
            })}
          </div>
        </Container>
      </Fade>
    </div>
  );
};

export default Dashboard;

interface MySkills {
  name: string;
  id: number;
}

const MySkill: React.FC<MySkills> = ({ name, id }) => {
  let navigate = useNavigate();

  return (
    <div
      className={` flex flex-col gap-4 bg-white justify-center w-9/12 text-center shadow-md h-64 rounded-lg border-[1px] cursor-pointer hover:scale-105 transition-all duration-300`}
      onClick={() => {
        navigate(`/skillrouter/${name}`);
      }}
    >
      {id === 0 ? (
        <img src={newcard} className="h-32"></img>
      ) : (
        <>
          <p className="text-lg md:text-xl lg:text-2xl">
            {id === 0 ? "Learn Skill" : name}
          </p>
          <i className="fa-solid fa-house mt-4"></i>
          <div className="text-center">
            {id === 0 ? (
              <FontAwesomeIcon icon={faPlus} size="2xl" />
            ) : (
              <div className="animate-pulse flex gap-2 justify-center items-center">
                <p>Continue</p>
                <FontAwesomeIcon icon={faArrowRight} size="1x" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
