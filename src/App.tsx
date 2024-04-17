import { useState } from "react";
import "./style.css";
import HeaderForm, { headerDefaultValues } from "./components/HeaderForm";
import Resume from "./components/Resume";
import SummaryForm from "./components/SummaryForm";
import WorkHistoryForm, {
  WorkHistoryData,
  workHistoryDefaultValues,
} from "./components/WorkHistoryForm";
import SkillsForm, { SkillsFormData } from "./components/SkillsForm";
import EducationForm, {
  EducationDefaultValues,
  EducationFormData,
} from "./components/EducationForm";

export const defaultValues = {
  header: headerDefaultValues,
  summary:
    "I am a full stack developer Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, libero! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est, dolore temporibus nesciunt delectus assumenda recusandae!",
};

const exampleResume = {
  header: {
    fullName: "Rudolph Christian R. Razul",
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
};

function App() {
  const [headerInfo, setHeaderInfo] = useState(exampleResume.header);
  const [summaryInfo, setSummaryInfo] = useState(exampleResume.summary);
  const [skillsList, setSkillsList] = useState<SkillsFormData>({
    skills: exampleResume.skills,
  });
  const [workHistoryInfo, setWorkHistoryInfo] = useState<WorkHistoryData>({
    workInfo: exampleResume.workInfo,
  });
  const [educationList, setEducationList] = useState<EducationFormData>({
    school: exampleResume.school,
  });

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 bg-gray-100 p-16 sm:px-4 md:px-8 lg:flex-row lg:items-start lg:px-8">
      {/* Container for all the forms
        TODO: Refactor into a component
       */}
      <div className="flex w-full flex-col gap-4 md:w-[21cm] lg:w-[360px]">
        <HeaderForm onHeaderInfo={(data) => setHeaderInfo(data)} />
        <SummaryForm onSummary={(data) => setSummaryInfo(data)} />
        <SkillsForm onSkills={(skill) => setSkillsList(skill)} />
        <WorkHistoryForm onWorkHistory={(data) => setWorkHistoryInfo(data)} />
        <EducationForm onEducation={(data) => setEducationList(data)} />
      </div>
      <Resume
        header={{ ...headerInfo }}
        summary={summaryInfo}
        workHistory={{ ...workHistoryInfo }}
        skills={{ ...skillsList }}
        education={{ ...educationList }}
      />
    </div>
  );
}

export default App;
