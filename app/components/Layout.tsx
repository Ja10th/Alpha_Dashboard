"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { RiArrowDownSLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { FiDownload } from "react-icons/fi";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { NumberTicker } from "./ui/Ticker";
import { motion } from "framer-motion";
import { eventNames } from "process";
import { AiOutlineClose } from "react-icons/ai";

interface EventRegistrationsChartProps {
  data: { month: string; registrations: number }[];
}

const eventsData = [
  {
    id: 1,
    eventName: "Cloud Innovation Summit",
    date: "2024-10-15",
    speaker: "Jane Doe",
    status: "Completed",
  },
  {
    id: 2,
    eventName: "Blockchain Revolution Conference",
    date: "2024-11-05",
    speaker: "Dr. Peter Smith",
    status: "In Progress",
  },
  {
    id: 3,
    eventName: "AI in Healthcare Symposium",
    date: "2024-12-01",
    speaker: "Dr. Aisha Malik",
    status: "Completed",
  },
  {
    id: 4,
    eventName: "Future of Fintech Forum",
    date: "2024-10-25",
    speaker: "John Lee",
    status: "Completed",
  },
  {
    id: 5,
    eventName: "Data Analytics in Business",
    date: "2024-11-12",
    speaker: "Rachel Moore",
    status: "Completed",
  },
  {
    id: 6,
    eventName: "Sustainable Energy Expo",
    date: "2024-09-28",
    speaker: "Prof. Alan Green",
    status: "Completed",
  },
  {
    id: 7,
    eventName: "Web3 Interfaces Workshop",
    date: "2024-10-10",
    speaker: "Kevin Adams",
    status: "In Progress",
  },
  {
    id: 8,
    eventName: "Cybersecurity for Startups",
    date: "2024-11-19",
    speaker: "Emily Zhang",
    status: "Completed",
  },
  {
    id: 9,
    eventName: "Smart Cities Forum",
    date: "2024-10-18",
    speaker: "Dr. Maria Hernandez",
    status: "In Progress",
  },
  {
    id: 10,
    eventName: "Tech Safari Mixer",
    date: "2024-09-30",
    speaker: "Guest Panel",
    status: "In Progress",
  },
];

const objects = [
  {
    id: 1,
    name: "Total Events",
    bigText: 100000,
    icon: <IoIosInformationCircleOutline />,
    iconTrend: <GoArrowUpRight />,
    trend: "5.0%",
  },
  {
    id: 2,
    name: "Active Speakers",
    bigText: 25,
    icon: <IoIosInformationCircleOutline />,
    iconTrend: <GoArrowDownRight />,
    trend: "5.0%",
  },
  {
    id: 3,
    name: "Total Registrations",
    bigText: 300,
    icon: <IoIosInformationCircleOutline />,
    iconTrend: <GoArrowUpRight />,
    trend: "5.0%",
  },
  {
    id: 4,
    name: "Total Revenue",
    bigText: 500000,
    icon: <IoIosInformationCircleOutline />,
    iconTrend: <GoArrowUpRight />,
    trend: "5.0%",
  },
];

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

const Home = () => {

    
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }
  const { isDarkMode, toggleDarkMode } = darkModeContext;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [events, setEvents] = useState(eventsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("recent");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = 3; // Assume 3 pages for now

  const modalRef = useRef<HTMLDivElement>(null);

  // Function to close modal if click is outside
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      // Add event listener when modal is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(parseInt(event.target.value));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [currentIndex]);

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
      <motion.p
        initial={{ filter: "blur(4px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
        className="text-[22px] pb-[20px]"
      >
        Welcome! here&apos;s your summary
      </motion.p>
      <div className="flex gap-4">
        {objects.map(({ id, name, bigText, icon, iconTrend, trend }: any) => (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
            className={`w-[260px] h-[88px] hover:scale-110 transition ease-in-out border p-4 rounded-sm ${
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
              <p className="text-[20px] font-[600] flex items-center">
                {name === "Total Revenue" && <span className="mr-1">$</span>}
                <NumberTicker value={bigText} />
              </p>

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
          </motion.div>
        ))}
      </div>
      <div className="py-6">
        <p className="text-[18px] font-[500]">Event Registrations per month</p>
        <motion.div
         initial={{ filter: 'blur(10px)', opacity: 0 }}
         animate={{ filter: 'blur(0px)', opacity: 1 }}
         transition={{ delay: 0.7, duration: 0.7, ease: "easeInOut" }}
        className="flex items-center gap-4">
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
                <Tooltip itemStyle={{ background: "transparent" }} />
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
        </motion.div>
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
              <div className="flex items-center gap-4 pl-24">
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
                  <tr
                    key={event.id}
                    onClick={() => handleEditEvent(event)}
                    className=""
                  >
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

            <div className="flex justify-between items-center mt-4 px-4 py-4 w-[1076px]">
              {/* Pagination controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="p-2 w-[36px] h-[36px] text-gray-500 hover:text-black bg-transparent border hover:bg-[#E2E8F0]"
                >
                  <MdOutlineKeyboardArrowLeft />
                </button>

                {/* Page numbers */}
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1  rounded-full ${
                      currentPage === page
                        ? "bg-[#8576FF] rounded-full text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-500 hover:text-black bg-transparent border hover:bg-[#E2E8F0]"
                >
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>

              {/* Rows per page */}
              <div className="flex items-center space-x-2">
                <span className="text-sm">Show:</span>
                <select
                  value={rowsPerPage}
                  onChange={handleRowsChange}
                  className="border rounded px-2 text-sm bg-transparent py-1"
                >
                  <option value={10}>10 rows</option>
                  <option value={25}>25 rows</option>
                  <option value={50}>50 rows</option>
                </select>
              </div>
            </div>

            {/* Edit Event Modal */}
            {showModal && (
              <div className="fixed inset-0 flex top-0 items-center justify-center bg-black bg-opacity-50">
                <div 
                 ref={modalRef}
                className={`bg-white p-8 rounded-lg w-[440px] h-[380px] ${isDarkMode ? 'bg-[#484554]' : ''}`}>
                    <div className="flex items-center justify-between">
                    <h2 className="text-lg font-[600] ">
                    {selectedEvent?.eventName}
                  </h2>
                  <AiOutlineClose onClick={() => setShowModal(false)} />
                    </div>
                 
                  <p className="text-[#64748B text-sm font-[400]">
                    {selectedEvent?.date}
                  </p>
                  <div className="my-4">
                    <p className="text-sm font-[400] text-[#334155">
                      Event Description
                    </p>
                  </div>
                  <div className="flex pt-10">
                    <img
                      src="1.png"
                      alt="Image 1"
                      className="w-8 h-8 rounded-full z-20 -mr-2"
                    />
                    <img
                      src="2.png"
                      alt="Image 2"
                      className="w-8 h-8 rounded-full z-10 -mr-2"
                    />
                    <img
                      src="3.png"
                      alt="Image 3"
                      className="w-8 h-8 rounded-full z-1 -mr-2"
                    />
                  </div>
                  <div className="py-2">
                    <p className="text-sm font-[400]">
                      3 Guest Speakers: Speaker name A, Speaker name B, Speaker
                      name C.
                    </p>
                    <p className="text-sm font-[400]">300 Attendees</p>
                  </div>
                  <div className={`bg-[#F8FAFC] ${isDarkMode ? 'bg-[#ADA9BB]' : '   '}`}>
                    <button className="border bg-white py-2 px-4">Edit</button>
                    <button className="bg-[#F43F5E] py-2 px-4 text-white ml-10 mr-2 ">Delete</button>
                    <button className="bg-[#8576FF] py-2 px-4 text-white">Mark as Completed</button>
                  </div>
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
