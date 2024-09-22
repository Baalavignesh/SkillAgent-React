import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "../helper/localStorage";
import { LogoutUser } from "../services/firebase/auth";
import { logo } from "../assets";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const MyNavbar: React.FC = () => {
  let navigate = useNavigate();

  return (
    <div className="p-4 pl-24 pr-24 flex justify-between sticky top-0 items-center bg-custom-black text-white z-50">
      <h2 onClick={() => navigate("/")} className="cursor-pointer">
        <img src={logo} className="w-36 mt-1"></img>
      </h2>
      <div className="flex gap-12 items-center justify-center">
        <h4
          onClick={() => navigate("/")}
          className="mt-1 cursor-pointer border-b-2 border-b-transparent hover:border-b-deep-purple-300  transition duration-300 ease-in-out"
        >
          My Skills
        </h4>
        <h4
          onClick={() => navigate("/about")}
          className="mt-1 cursor-pointer border-b-2 border-b-transparent hover:border-b-deep-purple-300  transition duration-300 ease-in-out"
        >
          About us
        </h4>
        <Dropdown />
      </div>
    </div>
  );
};
export default MyNavbar;

const Dropdown: React.FC = () => {
  let navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    <div className="relative mt-1 cursor-pointer">
      {/* <button
        id="dropdownNavbarLink"
        className="flex items-center justify-between w-full py-2 px-3 text-white rounded"
      >
        Profile
        <FontAwesomeIcon icon={faChevronDown} className="ml-2" size="sm" />
      </button> */}

      <FontAwesomeIcon
        icon={faCircleUser}
        onClick={toggleDropdown}
        className="ml-2"
        size="2x"
      />

      {isOpen && (
        <div
          id="dropdownNavbar"
          className="z-10 -right-20 top-10 border-2 shadow-xl absolute font-normal bg-white divide-y divide-gray-100 rounded-lg  w-44 mt-2  text-sm text-gray-700"
        >
          <div className="py-2">
            <h4
              onClick={() => navigate("/profile")}
              className="block px-4 py-2 mt-1 cursor-pointer hover:bg-gray-100 "
            >
              My Profile
            </h4>
          </div>
          <div className="py-1">
            <h4
              onClick={handleLogout}
              className="block px-4 py-2 mt-1 cursor-pointer  hover:bg-gray-100  "
            >
              Logout
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
