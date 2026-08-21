function SummaryCard({ title, value, icon, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl border border-[#D8D0C2] bg-white p-5 transition ${
        onClick ? "cursor-pointer hover:border-black" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B665F]">
          {title}
        </p>

        {icon}
      </div>

      <h2 className="mt-5 font-serif text-3xl font-semibold text-[#1A1A1A]">
        {value}
      </h2>

      {description && (
        <p className="mt-2 text-xs text-[#6B665F]">{description}</p>
      )}
    </div>
  );
}

export default SummaryCard;
