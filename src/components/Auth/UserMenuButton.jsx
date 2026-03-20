"use client";

import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { User, LogOut, ChevronDown } from "lucide-react";

export default function UserMenuButton() {
    const { user, isAuthenticated, openAuthModal, logout, loading } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (loading) return null;

    // Not logged in – show login/register button
    if (!isAuthenticated) {
        return (
            <button
                onClick={() => openAuthModal("login")}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold
          bg-[#00401A] text-white hover:bg-[#005a25] transition-all duration-200
          shadow-md hover:shadow-lg cursor-pointer"
                id="auth-login-btn"
            >
                <User className="w-4 h-4" />
                <span>Login</span>
            </button>
        );
    }

    // Logged in – show user avatar/name dropdown
    const initials = user?.first_name
        ? `${user.first_name.charAt(0)}${user.last_name ? user.last_name.charAt(0) : ""}`
        : user?.name?.charAt(0) || "U";

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-bold
          bg-[#00401A] text-white hover:bg-[#005a25] transition-all duration-200
          shadow-md hover:shadow-lg cursor-pointer"
                id="user-menu-btn"
            >
                {/* Avatar with initials */}
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F6C249] to-[#A35024]
          flex items-center justify-center text-white text-xs font-bold uppercase">
                    {initials}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">
                    {user?.first_name || user?.name || "User"}
                </span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-2xl
          border border-gray-100 overflow-hidden z-[999] animate-fadeInDown">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-gradient-to-r from-[#00401A] to-[#005a25] text-white">
                        <p className="text-sm font-bold truncate">{user?.name || "User"}</p>
                        <p className="text-xs opacity-80 truncate">{user?.email || ""}</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <button
                            onClick={() => {
                                setDropdownOpen(false);
                                logout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600
                hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
