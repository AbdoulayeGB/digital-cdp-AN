import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'blue' | 'green' | 'orange' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  blue: {
    bg: 'bg-gradient-to-br from-blue-50 to-blue-100',
    icon: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg',
    text: 'text-blue-700',
    border: 'border-blue-200'
  },
  green: {
    bg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    icon: 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg',
    text: 'text-emerald-700',
    border: 'border-emerald-200'
  },
  orange: {
    bg: 'bg-gradient-to-br from-orange-50 to-orange-100',
    icon: 'bg-gradient-to-br from-orange-600 to-orange-700 text-white shadow-lg',
    text: 'text-orange-700',
    border: 'border-orange-200'
  },
  red: {
    bg: 'bg-gradient-to-br from-red-50 to-red-100',
    icon: 'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-lg',
    text: 'text-red-700',
    border: 'border-red-200'
  }
};

export default function StatsCard({ title, value, icon: Icon, color, trend }: StatsCardProps) {
  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 transform`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value.toLocaleString()}</p>
          {trend && (
            <div className="flex items-center mt-3">
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-sm text-gray-500 ml-2">vs mois dernier</span>
            </div>
          )}
        </div>
        <div className={`${classes.icon} w-14 h-14 rounded-xl flex items-center justify-center`}>
          <Icon className="w-7 h-7" />
        </div>
      </div>
    </div>
  );
}