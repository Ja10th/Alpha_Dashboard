"use client";
import React, { useContext, useState } from "react";
import { SiAircall } from "react-icons/si";
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
import { usePathname } from "next/navigation";
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

interface LayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { name: "Home", icon: <AiOutlineHome />, route: "/" },
  { name: "Events", icon: <AiOutlineCalendar />, route: "/events" },
  { name: "Speakers", icon: <AiOutlineUser />, route: "/speakers" },
  { name: "Reports", icon: <AiOutlineFileText />, route: "/reports" },
  { name: "Notifications", icon: <AiOutlineBell />, route: "/notifications" },
  { name: "Messaging", icon: <AiOutlineMessage />, route: "/messaging" },
  { name: "Settings", icon: <AiOutlineSetting />, route: "/settings" },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);

  const darkModeContext = useContext(DarkModeContext);
  if (!darkModeContext) {
    throw new Error("DarkModeContext must be used within a DarkModeProvider");
  }

  const { isDarkMode, toggleDarkMode } = darkModeContext;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar closed initially for mobile

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

  return (
    <div
      className={`flex h-full ${
        isDarkMode ? "bg-[#484554]" : "bg-white"
      } transition-colors duration-300`}
    >
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full z-50 transition-transform duration-300 ${
          isSidebarOpen
            ? "translate-x-0 w-full md:w-64"
            : "-translate-x-full md:translate-x-0 w-16"
        } md:block p-4 shadow-md ${
          isDarkMode ? "bg-[#6A6676] text-white" : "bg-white text-black"
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

        <div className="flex gap-x-2 items-center pl-2 pb-4 py-2">
          <SiAircall className="text-[#8576FF] text-xl" />
          {isSidebarOpen && <p className="font-bold text-xl">Alpha</p>}
        </div>
          <hr className="md:hidden"/>
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
              <LiaToggleOffSolid />
            ) : (
              <LiaToggleOnSolid />
            )}
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center mt-4">
          {isSidebarOpen ? (
            <>
              <img
                src="https://unsplash.it/40/40?random"
                alt="User"
                className="rounded-full h-10 w-10"
              />
              <div className="ml-2">
                <p className="text-xs">Rudra Devi</p>
                <p className="text-xs">rudra.devi@gmail.com</p>
              </div>
            </>
          ) : (
            <img
              src="https://unsplash.it/40/40?random"
              alt="User"
              className="rounded-full h-10 w-10"
            />
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-grow p-4 ${isDarkMode ? "text-white" : "text-black"}`}
      >
        {/* Hamburger Icon for Mobile */}
        <div className="flex md:hidden w-[375px] items-center justify-between px-2">
          <div className="flex gap-x-2 items-center pl-2 pb-4 py-2">
            <SiAircall className="text-[#8576FF] text-xl" />
            <p>Alpha</p>
          </div>
          <div onClick={toggleSidebar} className="pr-2">
            <img src="Vector.png" alt="hamburger" />
          </div>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default Layout;
