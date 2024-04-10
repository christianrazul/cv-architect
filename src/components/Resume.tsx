import Summary from "./Summary";
import Header, { HeaderInfo } from "./Header";
import WorkHistory from "./WorkHistory";

interface ResumeProps {
  header: HeaderInfo;
  summary: string;
}

const Resume = ({ header, summary }: ResumeProps) => {
  return (
    <div className=" flex w-full flex-col gap-2 border px-4">
      <Header
        name={header.name}
        email={header.email}
        contact={header.contact}
        address={header.address}
      />
      <Summary summary={summary} />
      <WorkHistory />
    </div>
  );
};

export default Resume;
