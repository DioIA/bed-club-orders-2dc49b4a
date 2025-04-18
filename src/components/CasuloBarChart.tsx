import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CasuloBarChartProps {
  customColors?: string[];
  timeFilterOptions?: string[];
}

// Sample data - replace with real data in production
const data = [
  { name: "Jan", Vendas: 4000, Comissão: 2400 },
  { name: "Fev", Vendas: 3000, Comissão: 1398 },
  { name: "Mar", Vendas: 2000, Comissão: 9800 },
  { name: "Abr", Vendas: 2780, Comissão: 3908 },
  { name: "Mai", Vendas: 1890, Comissão: 4800 },
  { name: "Jun", Vendas: 2390, Comissão: 3800 },
];

const CasuloBarChart = ({ 
  customColors = ["#22C55E", "#16A34A"], 
  timeFilterOptions = ["Últimos 7 dias", "Últimos 30 dias", "Este ano"]
}: CasuloBarChartProps) => {
  const [timeFilter, setTimeFilter] = useState(timeFilterOptions[0]);

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            {timeFilterOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="name" stroke="#F9FAFB" />
          <YAxis stroke="#F9FAFB" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1F2937",
              border: "1px solid #374151",
            }}
          />
          <Bar dataKey="Vendas" fill={customColors[0]} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Comissão" fill={customColors[1]} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CasuloBarChart;
