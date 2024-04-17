interface FieldTitleProps {
  color: string;
  title: string;
}

const FieldTitle = ({ color, title }: FieldTitleProps) => {
  return <h1 className={`${color} py-1 pl-4 text-lg font-bold`}>{title}</h1>;
};

export default FieldTitle;
