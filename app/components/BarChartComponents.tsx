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
    const { isDarkMode } = useContext(DarkModeContext);
  
    return (
      <div className={` w-[331px]  h-[260px] md:w-[554px] md:h-[320px] mt-2 py-10 px-6 ${isDarkMode ? "bg-[#6A6676] text-white" : "border"}`}>
        <ResponsiveContainer>
          <BarChart data={eventRegistrationsData}>
            <XAxis
              stroke={isDarkMode ? "#fff" : "#000"}
              dataKey="month"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              stroke={isDarkMode ? "#fff" : "#000"}
              ticks={[0, 200, 400, 600, 800, 1000]}
              style={{ fontSize: "12px" }}
            />
            <Tooltip itemStyle={{ background: "transparent" }} />
            <Bar dataKey="registrations" fill="#8576FF" label={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };
  
  export default BarChartComponent;
  