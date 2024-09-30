import { Typography } from "@material-tailwind/react";
import { logolight } from "../assets";

const MyFooter: React.FC = () => {
  return (
    <footer className="w-full  p-12 py-6 ">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-center md:justify-between">
        <div className="flex flex-col gap-0 justify-center items-center">
          <img src={logolight} className="w-36"></img>
          {/* @ts-ignore */}
          <Typography
            color="blue-gray"
            className="text-center font-normal text-xs self-start pl-2"
          >
            &copy; 2024 SkillAgent
          </Typography>
        </div>

        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}

            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contribute
            </Typography>
          </li>
          <li>
            {/* @ts-ignore */}
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default MyFooter;
