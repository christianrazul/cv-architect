interface FieldTitleProps {
  color: string;
  title: string;
}

const FieldTitle = ({ color, title }: FieldTitleProps) => {
  return (
    <div style={{ background: `${color}` }}>
      <h1 className={`py-1 pl-4 text-lg font-bold`}>{title}</h1>
    </div>
  );
};

export default FieldTitle;
