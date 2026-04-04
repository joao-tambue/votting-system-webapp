const EmptyState: React.FC = () => (
  <div className="col-span-3 flex flex-col items-center justify-center py-20 gap-4">
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-300"
    >
      <rect
        x="12"
        y="20"
        width="72"
        height="56"
        rx="8"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="20"
        y="12"
        width="56"
        height="8"
        rx="4"
        fill="currentColor"
        opacity="0.5"
      />
      <rect
        x="24"
        y="36"
        width="24"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.6"
      />
      <rect
        x="24"
        y="46"
        width="40"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.4"
      />
      <rect
        x="24"
        y="56"
        width="32"
        height="4"
        rx="2"
        fill="currentColor"
        opacity="0.4"
      />
      <circle cx="72" cy="68" r="14" fill="white" />
      <circle
        cx="72"
        cy="68"
        r="13"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
      <line
        x1="68"
        y1="64"
        x2="76"
        y2="72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <line
        x1="76"
        y1="64"
        x2="68"
        y2="72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
    <div className="text-center">
      <p className="text-gray-700 font-semibold text-base">
        Nenhuma atividade disponível
      </p>
      <p className="text-gray-400 text-sm mt-1">
        Quando houver atividades abertas, aparecerão aqui.
      </p>
    </div>
  </div>
);

export default EmptyState;
