import { Calendar, ChevronRight, CircleDot, CircleOff } from "lucide-react";
import { ActivityModel } from "../models/activities.model";

const ActivityCard: React.FC<{
  activity: ActivityModel;
  onClick: () => void;
}> = ({ activity, onClick }) => {
  const isFinished = activity.finished;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer
        flex flex-col gap-4 transition-shadow duration-200 hover:shadow-md group"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0
              ${isFinished ? "bg-gray-100" : "bg-orange-50"}`}
          >
            <Calendar
              size={18}
              className={isFinished ? "text-gray-400" : "text-orange-500"}
            />
          </div>

          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">
              {activity.name}
            </h3>
            {activity.start_date && (
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(activity.start_date).toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>

        <ChevronRight
          size={16}
          className="text-gray-300 shrink-0 mt-0.5 group-hover:text-gray-500 transition-colors"
        />
      </div>

      {/* Description */}
      {activity.description && (
        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
          {activity.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-1 border-t border-gray-50">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
            ${
              isFinished
                ? "bg-gray-100 text-gray-500"
                : "bg-green-50 text-green-700"
            }`}
        >
          {isFinished ? <CircleOff size={11} /> : <CircleDot size={11} />}
          {isFinished ? "Encerrada" : "Em curso"}
        </span>

        <span className="text-xs font-semibold text-gray-500 group-hover:text-gray-700">
          Ver categorias
        </span>
      </div>
    </div>
  );
};

export default ActivityCard;
