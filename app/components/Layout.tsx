"use client";
import React, { useContext, useEffect, useState } from "react";
import { GoArrowDownRight, GoArrowUpRight, GoDotFill } from "react-icons/go";
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
import { FaSearch } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";

interface EventRegistrationsChartProps {
  data: { month: string; registrations: number }[];
}

const eventsData = [
  {
    id: 1,
    eventName: "Tech Conference 2024",
    date: "2024-01-15",
    speaker: "John Doe",
    status: "Completed",
  },
  {
    id: 2,
    eventName: "AI Workshop",
    date: "2024-02-22",
    speaker: "Jane Smith",
    status: "In Progress",
  },
  {
    id: 3,
    eventName: "Web3 Summit",
    date: "2024-03-10",
    speaker: "Alice Johnson",
    status: "Completed",
  },
  // Add more dummy events as needed
];

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
      src: "bb.png",
      name: "Latest News & Updates",
      text: "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.",
    },
    {
      src: "slide.png",
      name: "Latest News & Updates",
      text: "Turpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus.",
    },
    {
      src: "as.png",
      name: "Latest News & Updates",
      text: "TTurpis interdum nunc varius ornare dignissim pretium. Massa ornare quis aliquet sed vitae. Sed velit nisi, fermentum erat. Fringilla purus, erat fringilla tincidunt quisque non. Pellentesque in ut tellus. ",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const [events, setEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Filtering and searching
  useEffect(() => {
    const filteredEvents = eventsData
      .filter(
        (event) =>
          event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.speaker.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "recent") {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
      });
    setEvents(filteredEvents);
  }, [searchTerm, sortOrder]);

  // Handle modal open for edit
  const handleEditEvent = (event: any) => {
    setSelectedEvent(event);
    setShowModal(true);
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
                {/* <CartesianGrid strokeDasharray="5 5" /> */}
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
                <h2 className="text-[12px] text-white flex-start font-[600]">
                  {images[currentIndex].name}
                </h2>
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
      <div>
        <h2 className="text-[18px] font-[500]">Events History</h2>
        <div>
          <div className="p-4 space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex gap-3 items-center">
              {/* Search */}
              <div className="relative ">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 p-2 border text-sm rounded w-[200px] ${
                    isDarkMode ? "bg-[#484554]" : ""
                  }`}
                />
              </div>
              <div className="flex border p-2 gap-2 rounded items-center">
                <p className="text-sm">Date</p>
                <RiArrowDownSLine />
              </div>
              <div className="flex border p-2 gap-2 rounded items-center">
                <p className="text-sm">Status</p>
                <RiArrowDownSLine />
              </div>
              <div className="flex border p-2 gap-2 rounded items-center">
                <p className="text-sm">Name</p>
                <RiArrowDownSLine />
              </div>
              <p className="font-[600] text-sm">Displaying 100 results</p>
              {/* Sort */}
              <div className="flex items-center gap-4 pl-16">
                <div className="flex items-center gap-2">
                  <p className="text-sm">Sort: </p>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={`border p-2 rounded text-sm ${
                      isDarkMode ? "bg-[#484554]" : ""
                    }`}
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
                <div className="border p-3 rounded">
                  <SlOptionsVertical />
                </div>
                {/* Three Dots Menu */}
                <div className="flex items-center border rounded p-2 gap-2">
                  <FiDownload />
                  <p className="text-sm">Export</p>
                </div>
              </div>
            </div>

            {/* Event Table */}
            <table className="w-[1076px] border-collapse">
              <thead>
                <tr
                  className={`text-left h-[48px] pb-4 ${
                    isDarkMode ? "bg-[#6A6676]" : "bg-[#F1F5F9]"
                  }`}
                >
                  <th
                    className={`p-2 text-xs font-[600] ${
                      isDarkMode ? "text-white" : "text-[#64748B]"
                    }`}
                  >
                    Event Name
                  </th>
                  <th
                    className={`p-2 text-xs font-[600] ${
                      isDarkMode ? "text-white" : "text-[#64748B]"
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`p-2 text-xs font-[600] ${
                      isDarkMode ? "text-white" : "text-[#64748B]"
                    }`}
                  >
                    Speaker
                  </th>
                  <th
                    className={`p-2 text-xs font-[600] ${
                      isDarkMode ? "text-white" : "text-[#64748B]"
                    }`}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="">
                    <td
                      className={`p-2 text-sm font-[400]  ${
                        isDarkMode ? "text-white" : "text-[#334155]"
                      }`}
                    >
                      {event.eventName}
                    </td>
                    <td
                      className={`p-2 text-sm font-[400] ${
                        isDarkMode ? "text-white" : "text-[#334155]"
                      }`}
                    >
                      {event.date}
                    </td>
                    <td
                      className={`p-2 text-sm font-[400] ${
                        isDarkMode ? "text-white" : "text-[#334155]"
                      }`}
                    >
                      {event.speaker}
                    </td>
                    <td
                      onClick={() => handleEditEvent(event)}
                      className={`text-sm p-1 cursor-pointer flex items-center font-[400] ${
                        isDarkMode
                          ? event.status === "Completed"
                            ? "border bg-transparent px-1 w-[99px] rounded-xl mt-2 border-[#10B981]"
                            : event.status === "In Progress"
                            ? "border bg-transparent rounded-xl px-1 w-[99px] mt-2 border-[#3B82F6]"
                            : ""
                          : event.status === "Completed"
                          ? "bg-[#D1FAE5] rounded-xl px-1 w-[99px] mt-2 text-[#10B981]"
                          : event.status === "In Progress"
                          ? "bg-[#DBEAFE] rounded-xl px-1 w-[99px] mt-2 text-[#3B82F6]"
                          : ""
                      }`}
                    >
                      <GoDotFill /> {event.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Edit Event Modal */}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-[400px]">
                  <h2 className="text-lg font-bold mb-4">Edit Event</h2>
                  <form>
                    <div className="mb-4">
                      <label className="block">Event Name</label>
                      <input
                        type="text"
                        value={selectedEvent?.eventName}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            eventName: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Date</label>
                      <input
                        type="date"
                        value={selectedEvent?.date}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            date: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Speaker</label>
                      <input
                        type="text"
                        value={selectedEvent?.speaker}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            speaker: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block">Status</label>
                      <select
                        value={selectedEvent?.status}
                        onChange={(e) =>
                          setSelectedEvent({
                            ...selectedEvent,
                            status: e.target.value,
                          })
                        }
                        className="border p-2 w-full rounded"
                      >
                        <option value="Completed">Completed</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                    <button
                      type="button"
                      className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
