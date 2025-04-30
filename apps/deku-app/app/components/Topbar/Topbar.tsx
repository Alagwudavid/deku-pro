"use client";
import { useState } from "react";

import { TbEditOff } from "react-icons/tb";

export default function Topbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-14 bg-[#181A20] border-b border-[#23262F] flex items-center px-4 justify-between shadow z-20 relative">
      {/* Left: Logo */}
      <div className="flex items-center gap-2 text-[#6B7280] relative">
        <TbEditOff className="ml-1" />
        <span className="font-bold text-xl">deku</span>
        <span className=" text-xs absolute top-0 -right-5">NG</span>
      </div>

      {/* Right: user */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="relative">
          <button
            className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#377DFF] to-[#23262F] flex items-center justify-center ml-2 border-2 border-[#23262F] shadow"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#23262F] border border-[#23262F] rounded-lg shadow-lg py-1 z-50">
              <a href="#" className="block px-4 py-2 hover:bg-[#181A20]">
                Profile
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-[#181A20]">
                Settings
              </a>
              <a href="#" className="block px-4 py-2 hover:bg-[#181A20]">
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
