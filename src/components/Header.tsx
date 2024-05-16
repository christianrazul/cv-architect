import { HeaderData } from "./HeaderForm";

interface HeaderProps {
  header: HeaderData;
}

const Header = ({ header }: HeaderProps) => {
  return (
    header.header.fullName !== "" &&
    (header.header.profilePicture ? (
      <div className="flex w-full gap-8 pb-2 pt-4">
        <img
          src={header.header.profilePicture}
          className="h-36 w-36 border-2 border-blue-950 object-cover"
        />
        <div className="flex w-full flex-col justify-center gap-4">
          <h1 className="w-full text-left text-5xl font-bold">
            {header.header.fullName}
          </h1>
          {/* <ul className="flex w-full flex-wrap items-start justify-start gap-3"> */}
          <ul className="grid grid-cols-[1.3fr_1fr_1fr] gap-3">
            {header.header.email && (
              <li className="flex items-center gap-2">
                <div
                  className="relative flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: header.colors.email }}
                >
                  <i className="fa-solid fa-envelope"></i>
                </div>
                {header.header.email}
              </li>
            )}
            {header.header.contact && (
              <li className="flex items-center gap-2">
                <div
                  className="relative flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: header.colors.contact }}
                >
                  <i className="fa-solid fa-phone "></i>
                </div>
                {header.header.contact}
              </li>
            )}
            {header.header.address && (
              <li className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: header.colors.address }}
                >
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                {header.header.address}
              </li>
            )}
            {header.header.linkedin && (
              <li className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: header.colors.linkedin }}
                >
                  <i className="fa-brands fa-linkedin"></i>
                </div>
                {header.header.linkedin}
              </li>
            )}
            {header.header.website && (
              <li className="flex items-center gap-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full"
                  style={{ background: header.colors.website }}
                >
                  <i className="fa-solid fa-globe"></i>
                </div>
                {header.header.website}
              </li>
            )}
          </ul>
        </div>
      </div>
    ) : (
      <div className="flex w-full flex-col gap-4 pb-2 pt-4">
        <h1 className="w-full text-center text-5xl font-bold">
          {header.header.fullName}
        </h1>
        <ul className="flex justify-center gap-4">
          {header.header.email && (
            <li className="flex items-center gap-2">
              <div
                className="relative flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: header.colors.email }}
              >
                <i className="fa-solid fa-envelope"></i>
              </div>
              {header.header.email}
            </li>
          )}
          {header.header.contact && (
            <li className="flex items-center gap-2">
              <div
                className="relative flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: header.colors.contact }}
              >
                <i className="fa-solid fa-phone "></i>
              </div>
              {header.header.contact}
            </li>
          )}
          {header.header.address && (
            <li className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{ background: header.colors.address }}
              >
                <i className="fa-solid fa-location-dot"></i>
              </div>
              {header.header.address}
            </li>
          )}
        </ul>
      </div>
    ))
  );
};

export default Header;
