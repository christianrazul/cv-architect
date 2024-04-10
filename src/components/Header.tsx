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
      <h1 className="w-full text-center text-3xl font-bold">{name}</h1>
      <ul className="flex justify-center gap-4">
        <li className="flex items-center gap-2">
          <FontAwesomeIcon icon={faEnvelope} />
          {email}
        </li>
        <li className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} />
          {contact}
        </li>
        <li className="flex items-center gap-2">
          <FontAwesomeIcon icon={faLocationDot} />
          {address}
        </li>
      </ul>
    </div>
  );
};

export default Header;
