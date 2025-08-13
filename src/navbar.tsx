import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import {NavLink} from "react-router-dom";

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Keresés", searchTerm);
    };

    const tabs = [
        {name:"Kezdőlap", path:"/"},
        {name:"Versek", path:"/vers"},
        {name:"Meme", path:"/meme"}
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 bg-[#181a1b] shadow-md px-6 py-3 flex items-center justify-between h-16">
            {/* Left section: Logo + Nav Links */}
            <div className="flex items-center space-x-6">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600 cursor-pointer">
                    CSWM Wiki
                </div>

                {/* Desktop Nav */}
                <ul className="hidden md:flex space-x-6 text-gray-500 font-medium">
                    {tabs.map((tab) => (
                        <li key={tab.name}>
                            <NavLink
                                to={tab.path}
                                className={({ isActive }) =>
                                    `cursor-pointer hover:text-blue-600 transition-colors ${
                                        isActive
                                            ? "text-blue-600 border-b-2 border-blue-600"
                                            : ""
                                    }`
                                }
                            >
                                {tab.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                className="hidden sm:flex items-center bg-[#1e2022] rounded-lg px-3 py-1"
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-40 sm:w-60"
                />
                <button type="submit">
                    <Search className="text-gray-500 hover:text-blue-600 w-5 h-5" />
                </button>
            </form>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
            >
                {menuOpen ? (
                    <X className="w-6 h-6 text-gray-700" />
                ) : (
                    <Menu className="w-6 h-6 text-gray-700" />
                )}
            </button>

            {/* Mobile Menu Dropdown */}
            {menuOpen && (
                <div className="absolute top-14 left-0 w-full bg-[#181a1b] shadow-md md:hidden p-4">
                    <ul className="space-y-4 text-gray-500 font-medium">
                        {tabs.map((tab) => (
                            <li key={tab.name}>
                                <NavLink
                                    to={tab.path}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `cursor-pointer hover:text-blue-600 transition-colors ${
                                            isActive
                                                ? "text-blue-600 border-b-2 border-blue-600 inline-block"
                                                : ""
                                        }`
                                    }
                                >
                                    {tab.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Search in mobile menu */}
                    <form
                        onSubmit={handleSearch}
                        className="mt-4 flex items-center bg-[#1e2022] rounded-lg px-3 py-1"
                    >
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-transparent outline-none text-gray-700 placeholder-gray-500 w-full"
                        />
                        <button type="submit">
                            <Search className="text-gray-500 hover:text-blue-600 w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
