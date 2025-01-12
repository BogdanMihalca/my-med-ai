import { Card, CardContent } from "@/components/ui/card";

const QuickStatsCard = ({ title, value, icon: Icon, trend }: any) => (
  <Card className="bg-slate-900/50 border-slate-800">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="rounded-full p-3 bg-blue-500/10">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        {trend && (
          <div
            className={`text-sm ${
              trend > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-100">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default QuickStatsCard;
