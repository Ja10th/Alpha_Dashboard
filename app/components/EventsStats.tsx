import { IoIosInformationCircleOutline } from "react-icons/io";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { motion } from "framer-motion";
import { NumberTicker } from "./ui/Ticker"; // assuming this is an existing component
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const statsData = [
  { id: 1, name: "Total Events", value: 100000, trend: "5.0%", isUp: true },
  { id: 2, name: "Active Speakers", value: 25, trend: "5.0%", isUp: false },
  { id: 3, name: "Total Registrations", value: 300, trend: "5.0%", isUp: true },
  { id: 4, name: "Total Revenue", value: 500000, trend: "5.0%", isUp: true },
];

const EventStats = () => {
    const darkModeContext = useContext(DarkModeContext);
    if (!darkModeContext) {
      throw new Error("DarkModeContext must be used within a DarkModeProvider");
    }
  const { isDarkMode } = useContext(DarkModeContext);

  return (
    <div className="flex gap-4">
      {statsData.map(({ id, name, value, trend, isUp }) => (
        <motion.div
          key={id}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
          className={`w-[260px] h-[88px] hover:scale-110 transition ease-in-out border p-4 rounded-sm ${
            isDarkMode ? "bg-[#6A6676] border-none" : ""
          }`}
        >
          <div className="flex items-center gap-1">
            <p className={isDarkMode ? "text-white" : "text-[#64748B]"}>{name}</p>
            <span className={isDarkMode ? "text-white" : "text-[#64748B]"}>
              <IoIosInformationCircleOutline />
            </span>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[20px] font-[600]">
              {name === "Total Revenue" && <span className="mr-1">$</span>}
              <NumberTicker value={value} />
            </p>
            <p className={`text-xs ${isUp ? "text-[#10B981]" : "text-[#F43F5E]"}`}>
              {isUp ? <GoArrowUpRight /> : <GoArrowDownRight />}
            </p>
            <p className={`text-xs ${isUp ? "text-[#10B981]" : "text-[#F43F5E]"}`}>{trend}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default EventStats;
