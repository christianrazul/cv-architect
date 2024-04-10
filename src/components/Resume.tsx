import Summary from "./Summary";
import Header, { HeaderInfo } from "./Header";
import WorkHistory from "./WorkHistory";

interface ResumeProps {
  header: HeaderInfo;
  summary: string;
  workHistory: any[];
}

const Resume = ({ header, summary, workHistory }: ResumeProps) => {
  return (
    <div className=" flex w-full flex-col gap-2 rounded-sm border px-4 shadow-md">
      <Header
        name={header.name}
        email={header.email}
        contact={header.contact}
        address={header.address}
      />
      <Summary summary={summary} />
      <WorkHistory workHistory={[...workHistory]} />
    </div>
  );
};

export default Resume;
