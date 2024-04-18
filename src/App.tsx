import { useEffect, useRef, useState } from "react";
import "./style.css";
import { useReactToPrint } from "react-to-print";
import HeaderForm from "./components/HeaderForm";
import Resume from "./components/Resume";
import SummaryForm from "./components/SummaryForm";
import WorkHistoryForm, { WorkHistoryData } from "./components/WorkHistoryForm";
import SkillsForm, { SkillsFormData } from "./components/SkillsForm";
import EducationForm, { EducationFormData } from "./components/EducationForm";
import CustomForm, { CustomData } from "./components/CustomForm";
import { Button } from "./components/ui/button";

const exampleResume = {
  header: {
    fullName: "Rudolph Christian Razul",
    email: "razulchristian@gmail.com",
    contact: "09167482075",
    address: "Davao City",
  },
  summary: {
    summary:
      "Recent Computer Science graduate proficient in the ReactJS framework and modern web technologies. Skilled in developing responsive, user-friendly websites and applications. Demonstrates strong problem-solving abilities and effective communication skills. Eager to apply technical knowledge and innovative solutions in a dynamic web development role.",
  },
  skills: [
    { skill: "JavaScript" },
    { skill: "TypeScript" },
    { skill: "ReactJS" },
    { skill: "TailWindCSS" },
    { skill: "NodeJS" },
    { skill: "Critical Thinking" },
    { skill: "Effective Interpersonal Skills" },
    { skill: "Flexibility and Adaptability" },
    { skill: "Resourcefulness" },
    { skill: "Adobe Photoshop" },
  ],
  workInfo: [
    {
      company: "Tech Innovations Inc.",
      address: "Tech City, TC 56789",
      role: "Software Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2022-01-01"),
      description: [
        "Developed and maintained code for in-house and client websites primarily using HTML, CSS, Sass, JavaScript, and jQuery",
        "Managed time-sensitive updates, including content changes and database upgrades",
        "Planned, wrote, and debugged web applications and software with complete accuracy",
      ],
    },
    {
      company: "Global Tech Solutions",
      address: "Cyber Town, CT 98765",
      role: "Senior Developer",
      startDate: new Date("2022-02-01"),
      endDate: new Date("2024-01-01"),
      description: [
        "Led a team of software developers to drive the successful execution of development projects from concept through delivery",
        "Participated in the design, development, and testing of software applications",
        "Reviewed code work for accuracy and functionality",
      ],
    },
  ],
  school: [
    {
      name: "University of Example",
      location: "Example City, EC",
      degree: "B.Sc. in Computer Science",
      startDate: new Date("2016-09-01"),
      endDate: new Date("2020-06-01"),
      achievements: [
        "Graduated Summa Cum Laude",
        "Dean's List every semester",
        "Completed a senior project on machine learning algorithms",
      ],
    },
    {
      name: "Masters Institute of Technology",
      location: "Techville, TV",
      degree: "M.Sc. in Artificial Intelligence",
      startDate: new Date("2021-09-01"),
      endDate: new Date("2023-06-01"),
      achievements: [
        "Published thesis on deep reinforcement learning",
        "Teaching Assistant for undergraduate machine learning courses",
        "Co-authored three papers published in peer-reviewed journals",
      ],
    },
  ],
  custom: {
    title: "FUN FACTS",
    description: "This resume was created using an app I built!",
  },
};

const emptyResume = {
  header: {
    fullName: "",
    email: "",
    contact: "",
    address: "",
  },
  summary: {
    summary: "",
  },
  skills: [
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
    { skill: "" },
  ],
  workInfo: [
    {
      company: "",
      address: "",
      role: "",
      startDate: new Date(""),
      endDate: new Date(""),
      description: [],
    },
    {
      company: "",
      address: "",
      role: "",
      startDate: new Date(""),
      endDate: new Date(""),
      description: [],
    },
  ],
  school: [
    {
      name: "",
      location: "",
      degree: "",
      startDate: new Date(),
      endDate: new Date(),
      achievements: [],
    },
    {
      name: "",
      location: "",
      degree: "",
      startDate: new Date(),
      endDate: new Date(),
      achievements: [],
    },
  ],
  custom: {
    title: "",
    description: "",
  },
};

function App() {
  const [resume, setResume] = useState(exampleResume);

  const [headerInfo, setHeaderInfo] = useState(resume.header);
  const [summaryInfo, setSummaryInfo] = useState(resume.summary);
  const [skillsList, setSkillsList] = useState<SkillsFormData>({
    skills: resume.skills,
  });
  const [workHistoryInfo, setWorkHistoryInfo] = useState<WorkHistoryData>({
    workInfo: resume.workInfo,
  });
  const [educationList, setEducationList] = useState<EducationFormData>({
    school: resume.school,
  });
  const [customInfo, setCustomInfo] = useState<CustomData>(resume.custom);

  const resumeRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: `${headerInfo.fullName} Resume`,
    onAfterPrint: () => console.log("Print complete!"),
    onBeforeGetContent: () => {
      ("");
    },
  });

  // changes all resume states based on load or clear
  useEffect(() => {
    setHeaderInfo(resume.header);
    setSummaryInfo(resume.summary);
    setSkillsList({
      skills: resume.skills,
    });
    setWorkHistoryInfo({
      workInfo: resume.workInfo,
    });
    setEducationList({
      school: resume.school,
    });
    setCustomInfo(resume.custom);
  }, [resume]);

  return (
    <div className="main-bg flex w-full flex-col items-center justify-center gap-8 bg-gray-100 p-16 sm:px-4 md:px-8 lg:flex-row lg:items-start lg:px-8">
      {/* Container for all the forms
        TODO: Refactor into a component
       */}
      <div className="flex w-full flex-col gap-4 md:w-[21cm] lg:w-[360px]">
        <div className="flex w-full gap-2">
          <Button
            variant="outline"
            className="flex-grow"
            onClick={() => setResume(exampleResume)}
          >
            Load Example
          </Button>
          <Button
            variant="destructive"
            className="flex-grow"
            onClick={() => setResume(emptyResume)}
          >
            Clear Resume
          </Button>
        </div>
        <Button variant="default" onClick={handlePrint}>
          Save as PDF
        </Button>
        <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
        <SummaryForm onSummary={(data) => setSummaryInfo(data)} />
        <SkillsForm onSkills={(skill) => setSkillsList(skill)} />
        <WorkHistoryForm onWorkHistory={(data) => setWorkHistoryInfo(data)} />
        <EducationForm onEducation={(data) => setEducationList(data)} />
        <CustomForm onCustomInfo={(data) => setCustomInfo(data)} />
      </div>
      <Resume
        ref={resumeRef}
        header={{ ...headerInfo }}
        summary={summaryInfo}
        workHistory={{ ...workHistoryInfo }}
        skills={{ ...skillsList }}
        education={{ ...educationList }}
        custom={{ ...customInfo }}
      />
    </div>
  );
}

export default App;
