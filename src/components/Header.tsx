import "../style.css";
export interface HeaderInfo {
  name: string;
  email: string;
  contact: string;
  address: string;
}

const Header = ({ name, email, contact, address }: HeaderInfo) => {
  return (
    <div className="flex w-full border border-red-500 p-4">
      <div>
        {name && (
          <h1>
            {name} {email} {contact} {address}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Header;
