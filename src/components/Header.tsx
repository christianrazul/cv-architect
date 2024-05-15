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
      <div className="flex w-full gap-8 pb-2 pt-4">
        <img
          src={header.profilePicture}
          className="h-36 w-36 border-2 border-blue-950 object-cover"
        />
        <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="w-full text-left text-5xl font-bold">
            {header.fullName}
          </h1>
          {/* <ul className="flex w-full flex-wrap items-start justify-start gap-3"> */}
          <ul className="grid grid-cols-[1.3fr_1fr_1fr] gap-3">
            {header.email && (
              <li className="flex items-center gap-2">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-orange-500">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                {header.email}
              </li>
            )}
            {header.contact && (
              <li className="flex items-center gap-2">
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400">
                  <i className="fa-solid fa-phone "></i>
                </div>
                {header.contact}
              </li>
            )}
            {header.address && (
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-400">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                {header.address}
              </li>
            )}
            {header.linkedin && (
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-400">
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                {header.linkedin}
              </li>
            )}
            {header.website && (
              <li className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <i className="fa-solid fa-globe"></i>
                </div>
                {header.website}
              </li>
            )}
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
