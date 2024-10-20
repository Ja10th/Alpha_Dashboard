"use client";
import React, { useContext, useState, useEffect } from "react";
import {
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineBell,
  AiOutlineMessage,
  AiOutlineSetting,
  AiOutlineClose,
} from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LiaToggleOffSolid, LiaToggleOnSolid } from "react-icons/lia";

import Home from "./components/Layout";
import Events from "./events/page";
import Speakers from "@/app/speakers/page";
import Reports from "./reports/page";
import Notifications from "./notifications/page";
import Messaging from "./messaging/page";
import Settings from "./settings/page";
import { DarkModeContext } from "./context/DarkModeProvider";


const sidebarItems = [
  { name: "Home", icon: <AiOutlineHome />, route: "/" },
  { name: "Events", icon: <AiOutlineCalendar />, route: "/events" },
  { name: "Speakers", icon: <AiOutlineUser />, route: "/speakers" },
  { name: "Reports", icon: <AiOutlineFileText />, route: "/reports" },
  { name: "Notifications", icon: <AiOutlineBell />, route: "/notifications" },
  { name: "Messaging", icon: <AiOutlineMessage />, route: "/messaging" },
  { name: "Settings", icon: <AiOutlineSetting />, route: "/settings" },
];

const Layout= () => {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;

  // Set default state based on screen size
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    // This will run only in the browser after the component mounts
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth >= 768);
    };

    // Set initial value based on window size
    handleResize();

    // Add event listener to update on window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Open by default for large screens

  const [activeItem, setActiveItem] = useState<string>("Home");
  const [notificationsCount] = useState(3);

  const handleItemClick = (item: string, route: string) => {
    setActiveItem(item);
    setCurrentPath(route);
    setIsSidebarOpen(false); // Close sidebar on item click in mobile
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (currentPath) {
      case "/":
        return <Home />;
      case "/events":
        return <Events />;
      case "/speakers":
        return <Speakers />;
      case "/reports":
        return <Reports />;
      case "/notifications":
        return <Notifications />;
      case "/messaging":
        return <Messaging />;
      case "/settings":
        return <Settings />;
      default:
        return <div>404 - Page Not Found</div>;
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Open sidebar for large screens
      } else {
        setIsSidebarOpen(false); // Close sidebar for small screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state based on current window size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`flex h-full ${
        isDarkMode ? "bg-[#383544]" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 border-r left-0 h-[1024px] z-50 transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0 w-full md:w-64"
            : "-translate-x-full md:translate-x-0 w-16"
        } md:block p-4  ${
          isDarkMode ? "bg-[#484554] border-r-0 text-white" : "bg-white text-black"
        }`}
      >
        {/* Close Button (Only for Mobile) */}
        <div className="md:hidden flex justify-end relative">
          {isSidebarOpen && (
            <button onClick={toggleSidebar} className="text-2xl absolute top-1">
              <AiOutlineClose />
            </button>
          )}
        </div>

        <div
          className={`flex gap-x-2 items-center bg-[#93C5FD] border border-dashed border-[#2563EB] justify-center  ${
            isSidebarOpen ? "w-16 h-8" : "w-8 h-8"
          }`}
        >
          {isSidebarOpen && (
            <p className="font-[600] text-xs text-[#2563EB] leading-4">
              Full Logo
            </p>
          )}
        </div>
        <hr className="md:hidden" />
        <div className="mt-4">
          {sidebarItems.map(({ name, icon, route }) => (
            <div
              key={name}
              className={`flex items-center gap-x-3 p-2 text-[14px] rounded-md cursor-pointer ${
                activeItem === name
                  ? isDarkMode
                    ? "bg-[#8576FF] text-white"
                    : "bg-[#FCF7FF] text-[#8576FF]"
                  : ""
              }`}
              onClick={() => handleItemClick(name, route)}
            >
              <div className="relative flex items-center">
                {icon}
                {isSidebarOpen && <p className="ml-2">{name}</p>}
                {name === "Notifications" &&
                  notificationsCount > 0 &&
                  !isSidebarOpen && (
                    <sup className="absolute -right-4 -top-1 bg-red-500 text-white rounded-full w-3 h-3 p-2 flex items-center justify-center text-[14px]">
                      {notificationsCount}
                    </sup>
                  )}
              </div>
              {name === "Notifications" &&
                notificationsCount > 0 &&
                isSidebarOpen && (
                  <sup className="ml-auto bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[14px]">
                    {notificationsCount}
                  </sup>
                )}
            </div>
          ))}

          {/* Toggle Button */}
          <div
            className={`flex items-center gap-x-2 p-2 text-[14px] rounded-md cursor-pointer ${
              isSidebarOpen ? "" : "bg-purple-500 text-white"
            }`}
            onClick={toggleSidebar}
          >
            <MdKeyboardDoubleArrowLeft />
            {isSidebarOpen ? <p>Collapse</p> : " "}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-x-3 mt-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center p-2 rounded-md"
          >
            {isSidebarOpen ? (
              <>
                {isDarkMode ? (
                  <div className="flex items-center">
                    <LiaToggleOnSolid className="mr-2 text-[#8576FF]  bg-transparent text-lg" />
                    <span className="text-[12px]">Light Mode</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <LiaToggleOffSolid className="mr-2" />
                    <span className="text-[12px]">Dark Mode</span>
                  </div>
                )}
              </>
            ) : isDarkMode ? (
              <LiaToggleOnSolid />
            ) : (
              <LiaToggleOffSolid />
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center mt-4">
          {isSidebarOpen ? (
            <>
              <img
                src="Icon.png"
                alt="User"
                className="rounded-full h-8 w-8"
              />
              <div className="ml-2">
                <p className="text-xs">Rudra Devi</p>
                <p className="text-xs">rudra.devi@gmail.com</p>
              </div>
            </>
          ) : (
            <img
              src="Icon.png"
              alt="User"
              className="rounded-full h-8 w-8"
            />
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-grow  ${isDarkMode ? "text-white" : "text-black"}`}
      >
        {/* Hamburger Icon for Mobile */}
        <div className={`fixed top-0 left-o w-full z-30 md:hidden py-8 ${isDarkMode ? 'bg-[#484554]' : 'bg-white border-b'}`}>
        <div className="w-[343px] mx-auto  items-center justify-between  flex">
          <div className="flex gap-x-2 items-center bg-[#93C5FD] border border-dashed border-[#2563EB] justify-center w-16 h-8">
            <p className="font-[600] text-xs text-[#2563EB] leading-4">
              Full Logo{" "}
            </p>
          </div>
          <div onClick={toggleSidebar} className="pr-2">
            <img src="Vector.png" alt="hamburger" />
          </div>
        </div>
        </div>
        

        {renderContent()}

        {/* Fixed Bottom Navbar for Mobile */}
        <div className="md:hidden fixed bottom-0 left-0 w-full mx-auto bg-white shadow-md border-t border-gray-300">
          <div className="flex justify-between items-center py-2 px-4">
            {/* Home Icon */}
            <div
              className="flex flex-col items-center w-1/5"
              onClick={() => router.push("/")}
            >
              <AiOutlineHome
                className={`text-2xl ${
                  currentPath === "/" ? "text-[#8576FF]" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs ${
                  currentPath === "/" ? "text-[#8576FF]" : "text-gray-500"
                }`}
              >
                Home
              </p>
              {currentPath === "/" && (
                <div className="w-full h-1 bg-[#8576FF] mt-1"></div>
              )}
            </div>

            {/* Events Icon */}
            <div
              className="flex flex-col items-center w-1/5"
              onClick={() => router.push("/events")}
            >
              <AiOutlineCalendar
                className={`text-2xl ${
                  currentPath === "/events" ? "text-[#8576FF]" : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs ${
                  currentPath === "/events" ? "text-[#8576FF]" : "text-gray-500"
                }`}
              >
                Events
              </p>
              {currentPath === "/events" && (
                <div className="w-full h-1 bg-[#8576FF] mt-1"></div>
              )}
            </div>

            {/* Speakers Icon */}
            <div
              className="flex flex-col items-center w-1/5"
              onClick={() => router.push("/speakers")}
            >
              <AiOutlineUser
                className={`text-2xl ${
                  currentPath === "/speakers"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs ${
                  currentPath === "/speakers"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              >
                Speakers
              </p>
              {currentPath === "/speakers" && (
                <div className="w-full h-1 bg-[#8576FF] mt-1"></div>
              )}
            </div>

            {/* Reports Icon */}
            <div
              className="flex flex-col items-center w-1/5"
              onClick={() => router.push("/reports")}
            >
              <AiOutlineFileText
                className={`text-2xl ${
                  currentPath === "/reports"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs ${
                  currentPath === "/reports"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              >
                Reports
              </p>
              {currentPath === "/reports" && (
                <div className="w-full h-1 bg-[#8576FF] mt-1"></div>
              )}
            </div>

            {/* Profile Icon */}
            <div
              className="flex flex-col items-center w-1/5"
              onClick={() => router.push("/settings")}
            >
              <AiOutlineUser
                className={`text-2xl ${
                  currentPath === "/settings"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              />
              <p
                className={`text-xs ${
                  currentPath === "/settings"
                    ? "text-[#8576FF]"
                    : "text-gray-500"
                }`}
              >
                Profile
              </p>
              {currentPath === "/settings" && (
                <div className="w-full h-1 bg-[#8576FF] mt-1"></div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
