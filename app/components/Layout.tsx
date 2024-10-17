"use client";
import React, { useContext, useState } from "react";
import { GoArrowDownRight, GoArrowUpRight } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { DarkModeContext } from "../context/DarkModeProvider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface EventRegistrationsChartProps {
  data: { month: string; registrations: number }[];
}

const Home = () => {
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

  const objects = [
    {
      id: 1,
      name: "Total Events",
      bigText: "100,000",
      icon: <IoIosInformationCircleOutline />,
      iconTrend: <GoArrowUpRight />,
      trend: "5.0%",
    },
    {
      id: 2,
      name: "Active Speakers",
      bigText: "25",
      icon: <IoIosInformationCircleOutline />,
      iconTrend: <GoArrowDownRight />,
      trend: "5.0%",
    },
    {
      id: 3,
      name: "Total Registrations",
      bigText: "300",
      icon: <IoIosInformationCircleOutline />,
      iconTrend: <GoArrowUpRight />,
      trend: "5.0%",
    },
    {
      id: 4,
      name: "Total Revenue",
      bigText: "$500,000",
      icon: <IoIosInformationCircleOutline />,
      iconTrend: <GoArrowUpRight />,
      trend: "5.0%",
    },
  ];

  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;

  const images = [
    {
      src: 'bb.png',
      name: 'Latest News & Updates',
      text: 'Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.',
    },
    {
      src: 'slide.png',
      name: 'Latest News & Updates',
      text: 'Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.',
    },
    {
      src: 'as.png',
      name: 'Latest News & Updates',
      text: 'TTurpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus. ',
    },
  ];
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

  return (
    <div className="px-5 py-6">
      <p className="text-[22px] pb-[20px]">Welcome! here&apos;s your summary</p>
      <div className="flex gap-4">
        {objects.map(({ id, name, bigText, icon, iconTrend, trend }) => (
          <div
            className={`w-[260px] h-[88px] border p-4 rounded-sm ${
              isDarkMode ? "bg-[#6A6676] border-none" : ""
            }`}
            key={id}
          >
            <div className="flex items-center gap-1">
              <p className={isDarkMode ? "text-white" : "text-[#64748B]"}>
                {name}
              </p>
              <span className={isDarkMode ? "text-white" : "text-[#64748B]"}>
                {icon}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[20px] font-[600]">{bigText}</p>
              <p
                className={`text-xs ${
                  iconTrend?.type === GoArrowDownRight
                    ? "text-[#F43F5E]"
                    : "text-[#10B981]"
                }`}
              >
                {iconTrend}
              </p>

              <p
                className={`text-xs text-[#10B981] ${
                  iconTrend?.type === GoArrowDownRight
                    ? "text-[#F43F5E]"
                    : "text-[#10B981]"
                }`}
              >
                {trend}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="py-6">
        <p className="text-[18px] font-[500]">Event Registrations per month</p>
        <div className="flex items-center gap-4">
          <div
            className={` w-[554px] h-[320px] mt-2 py-10 px-6 ${
              isDarkMode ? "bg-[#6A6676] text-white" : "border"
            }`}
          >
            <ResponsiveContainer>
              <BarChart data={eventRegistrationsData}>
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis stroke={isDarkMode ? "#fff" : "#000"} dataKey="month" />
                <YAxis
                  stroke={isDarkMode ? "#fff" : "#000"}
                  ticks={[0, 200, 400, 600, 800, 1000]}
                />
                <Tooltip />
                <Bar dataKey="registrations" fill="#8576FF" label={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="relative w-full  mx-auto mt-2">
              <img
                src={images[currentIndex].src}
                alt={`Slide ${currentIndex + 1}`}
                className="w-[510px] h-[320px] object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-20" />
              <div className="absolute flex-col inset-1 top-40 px-10 text-left flex justify-center">
                
                <h2 className="text-[12px] text-white flex-start font-[600]">{images[currentIndex].name}</h2>
                <p className="text-white text-[12px]">
                  {images[currentIndex].text}
                </p>
              </div>
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-black w-10 h-10 rounded-full p-2 shadow-md"
              >
                &lt;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 h-10 w-10 top-1/2 transform -translate-y-1/2 text-black bg-white rounded-full p-2 shadow-md"
              >
                &gt;
              </button>
              <div className="flex absolute bottom-1 left-1/2 justify-center ">
                {images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 w-3 mx-1 rounded-full ${
                      currentIndex === index ? "bg-white" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
