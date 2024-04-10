import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface HeaderInfo {
  name: string;
  email: string;
  contact: string;
  address: string;
}

const Header = ({ name, email, contact, address }: HeaderInfo) => {
  return (
    <div className="flex w-full flex-col gap-4 py-2 pt-6">
      <h1 className="w-full text-center text-5xl font-bold">{name}</h1>
      <ul className="flex justify-center gap-4">
        <li className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faEnvelope}
            className="h-4 w-4 rounded-full bg-orange-400 p-1"
          />
          {email}
        </li>
        <li className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faPhone}
            className="h-4 w-4 rounded-full bg-orange-500 p-1"
          />
          {contact}
        </li>
        <li className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={faLocationDot}
            className="h-4 w-4 rounded-full bg-orange-300 p-1"
          />
          {address}
        </li>
      </ul>
    </div>
  );
};

export default Header;
