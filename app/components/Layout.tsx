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
import { AiOutlineClose, AiOutlineDown, AiOutlineRight } from "react-icons/ai";
import EventStats from "./EventsStats";
import BarChartComponent from "./BarChartComponents";
import Slideshow from "./Slideshow";

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
const Home = () => {
  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }
  const { isDarkMode, toggleDarkMode } = darkModeContext;

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

  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const toggleExpand = (eventId: number) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  return (
    <div className="px-5 py-6">
      <motion.p
        initial={{ filter: "blur(4px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
        className="text-[17px] font-[400] md:text-[22px] pb-[20px] w-[375px]  md:w-[1076px] overflow-hidden"
      >
        Welcome! here&apos;s your summary
      </motion.p>
      <EventStats />
      <div className="py-6">
        <motion.p
          initial={{ filter: "blur(4px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeInOut" }}
          className="text-[18px] font-[500] "
        >
          Event Registrations per month
        </motion.p>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{ filter: "blur(0px)", opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: "easeInOut" }}
          className="flex flex-col md:flex-row items-center gap-1 -ml-4 max-w-[375px] md:max-w-[1076px]"
        >
          <BarChartComponent />
          <Slideshow />
        </motion.div>
      </div>
      <div>
        <h2 className="text-[18px] font-[500]">Events History</h2>
        <div>
          <div className="p-4 space-y-6">
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row gap-3 md:items-center">
              {/* Search */}
              <div className="relative ">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 p-2 border text-sm rounded w-[335px] md:w-[200px] ${
                    isDarkMode ? "bg-[#484554]" : ""
                  }`}
                />
              </div>
              <div className="flex border p-2 gap-2 w-[335px] justify-center md:justify-start md:w-[100px] rounded items-center">
                <p className="text-sm">Date</p>
                <RiArrowDownSLine />
              </div>
              <div className="flex border p-2 gap-2 justify-center md:justify-start w-[335px] md:w-[100px] rounded items-center">
                <p className="text-sm">Status</p>
                <RiArrowDownSLine />
              </div>
              <div className="flex border p-2 gap-2 justify-center md:justify-start w-[335px] md:w-[100px] rounded items-center">
                <p className="text-sm">Name</p>
                <RiArrowDownSLine />
              </div>
              <p className="font-[600] py-1 md:py-0 text-sm">
                Displaying 100 results
              </p>
              {/* Sort */}
              <div className="flex items-center gap-4 pl-0 md:pl-24">
                <div className="flex justify-between w-[335px] md:w-auto items-center gap-2">
                  <p className="text-sm ">Sort: </p>
                  <div>
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
                </div>
              </div>
              <div className="flex justify-between w-[335px] md:w-auto">
                <div className="border p-3 rounded mr-2">
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
            <table className="w-[335px] hidden md:table md:w-[1076px] border-collapse">
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

            {/* Mobile view - FAQ dropdown */}
            <table className="w-[335px] border-collapse md:hidden">
              <thead>
                <tr
                  className={`text-left h-[48px] ${
                    isDarkMode ? "bg-[#6A6676]" : "bg-[#F1F5F9]"
                  }`}
                >
                  <th></th> {/* Empty column for the arrow */}
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
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <React.Fragment key={event.id}>
                    {/* Event name and status row */}
                    <tr
                      onClick={() => toggleExpand(event.id)}
                      className={`cursor-pointer hover:bg-[#F2F2F7] ${
                        expandedEvent === event.id ? "bg-[#F2F2F7]" : ""
                      }`}
                    >
                      <td className="p-2 text-sm text-right">
                        {/* Show right arrow if not expanded, down arrow if expanded */}
                        {expandedEvent === event.id ? (
                          <AiOutlineDown className="text-xs" />
                        ) : (
                          <AiOutlineRight className="text-xs" />
                        )}
                      </td>
                      <td
                        className={`p-2 text-sm font-[400] ${
                          isDarkMode ? "text-white" : "text-[#334155]"
                        }`}
                      >
                        {event.eventName}
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

                    {/* Expanded details row */}
                    {expandedEvent === event.id && (
                      <tr className="bg-[#F5F5F5] mt-1 h-[52px]">
                        <td
                          colSpan={3}
                          className={`p-2 text-sm font-[400] ${
                            isDarkMode ? "text-white" : "text-[#334155]"
                          }`}
                        >
                          <div className="flex justify-between px-3">
                            <div>{event.speaker}</div>
                            <div>{event.date}</div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 px-4 py-4 w-[335px] gap-2 md:w-[1076px]">
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
                  className={`bg-white p-8 rounded-lg w-[335px] md:w-[440px] h-[470px] md:h-[380px] ${
                    isDarkMode ? "bg-[#484554]" : ""
                  }`}
                >
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
                  <div
                    className={`bg-[#F8FAFC] flex flex-col md:flex-row  mt-5${
                      isDarkMode ? "bg-[#ADA9BB]" : "   "
                    }`}
                  >
                    <button className="border  bg-white py-2 px-4">Edit</button>
                    <button className="bg-[#F43F5E] w-[271px] md:w-auto py-2 px-4 text-white ml-0 md:ml-10 mt-2 md:mt-0 mr-2 ">
                      Delete
                    </button>
                    <button className="bg-[#8576FF] py-2 px-4 mt-2 md:mt-0 text-white">
                      Mark as Completed
                    </button>
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
