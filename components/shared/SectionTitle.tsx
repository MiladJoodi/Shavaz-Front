interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-2 mb-8">
      <h2 className="text-2xl text-[#646464] font-bold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
      <div className="w-16 h-1 bg-primary rounded-full mt-1" />
    </div>
  );
};

export default SectionTitle;
