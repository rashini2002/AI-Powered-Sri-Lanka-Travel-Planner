import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color?: string;
}

export function KPICard({ title, value, icon: Icon, color = 'from-[#0369a1] to-[#059669]' }: KPICardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${color} p-4 rounded-lg`}>
          <Icon className="text-white" size={28} />
        </div>
      </div>
    </div>
  );
}
