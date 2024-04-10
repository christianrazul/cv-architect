import Summary from "./Summary";
import Header, { HeaderInfo } from "./Header";

interface ResumeProps {
  header: HeaderInfo;
  summary: string;
}

const Resume = ({ header, summary }: ResumeProps) => {
  return (
    <div className=" flex h-80 w-80 flex-col gap-2 border-2 ">
      <Header
        name={header.name}
        email={header.email}
        contact={header.contact}
        address={header.address}
      />
      <Summary summary={summary} />
    </div>
  );
};

export default Resume;
