import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const eventRegistrationsData = [
  { month: "Jan", registrations: 720 },
  { month: "Feb", registrations: 950 },
  { month: "Mar", registrations: 720 },
  { month: "Apr", registrations: 420 },
  { month: "May", registrations: 1000 },
  { month: "Jun", registrations: 580 },
  { month: "Jul", registrations: 820 },
  { month: "Aug", registrations: 370 },
  { month: "Sep", registrations: 820 },
  { month: "Oct", registrations: 620 },
  { month: "Nov", registrations: 950 },
  { month: "Dec", registrations: 600 },
];


const BarChartComponent = () => {

  const darkModeContext = useContext(DarkModeContext);
if (!darkModeContext) {
  throw new Error("DarkModeContext must be used within a DarkModeProvider");
}
const { isDarkMode } = darkModeContext;

  return (
    <div className="w-full">
      <div
        className={` w-[400px] px-3 mx-auto h-[260px] md:w-[610px] md:h-[320px] mt-2 py-6 md:py-4 flex items-center justify-center md:px-6 ${
          isDarkMode ? "bg-[#484554] text-white" : "border"
        }`}
      >
       <ResponsiveContainer>
  <BarChart data={eventRegistrationsData}>
    <XAxis
      stroke={isDarkMode ? "#fff" : "#000"}
      dataKey="month"
      style={{ fontSize: "12px" }}
      axisLine={false}  // Hide the X-axis line
      tickLine={false}  // Hide the ticks on X-axis
    />
    <YAxis
      stroke={isDarkMode ? "#fff" : "#000"}
      ticks={[0, 200, 400, 600, 800, 1000]}
      style={{ fontSize: "12px" }}
      axisLine={false}  // Hide the Y-axis line
      tickLine={false}  // Hide the ticks on Y-axis
    />
    <Tooltip itemStyle={{ background: "transparent" }} />
    <Bar dataKey="registrations" fill="#8576FF" label={false} isAnimationActive={false} />
  </BarChart>
</ResponsiveContainer>

      </div>
    </div>
  );
};

export default BarChartComponent;
