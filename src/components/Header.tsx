import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderData } from "./HeaderForm";

interface HeaderProps {
  header: HeaderData;
}

const Header = ({ header }: HeaderProps) => {
  return (
    header.fullName !== "" &&
    (header.profilePicture ? (
      <div className="flex w-full gap-4 pb-2 pt-4">
        <img
          src={header.profilePicture}
          className="h-28 w-28 border-2 border-blue-950 object-cover"
        />
        <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="w-full text-left text-5xl font-bold">
            {header.fullName}
          </h1>
          <ul className="flex justify-start gap-4">
            <li className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-4 w-4 rounded-full bg-orange-400 p-1"
              />
              {header.email}
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faPhone}
                className="h-4 w-4 rounded-full bg-orange-500 p-1"
              />
              {header.contact}
            </li>
            <li className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="h-4 w-4 rounded-full bg-orange-300 p-1"
              />
              {header.address}
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="flex w-full flex-col gap-4 pb-2 pt-4">
        <h1 className="w-full text-center text-5xl font-bold">
          {header.fullName}
        </h1>
        <ul className="flex justify-center gap-4">
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-4 w-4 rounded-full bg-orange-400 p-1"
            />
            {header.email}
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faPhone}
              className="h-4 w-4 rounded-full bg-orange-500 p-1"
            />
            {header.contact}
          </li>
          <li className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="h-4 w-4 rounded-full bg-orange-300 p-1"
            />
            {header.address}
          </li>
        </ul>
      </div>
    ))
  );
};

export default Header;
