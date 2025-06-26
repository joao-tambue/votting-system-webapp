import React from 'react';
import { Activity } from '../types';
import * as Icons from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  onClick: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onClick }) => {
  const IconComponent = Icons[activity.icon as keyof typeof Icons] as React.ComponentType<any>;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
    >
      <div className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center mb-4 mx-auto`}>
        {IconComponent && <IconComponent size={32} className="text-white" />}
      </div>
      
      <h3 className="text-lg font-bold text-gray-800 text-center mb-2">
        {activity.name}
      </h3>
      
      <p className="text-sm text-gray-600 text-center leading-relaxed">
        {activity.description}
      </p>
    </div>
  );
};

export default ActivityCard;