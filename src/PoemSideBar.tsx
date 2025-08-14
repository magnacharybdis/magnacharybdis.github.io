import React, {useState} from "react";
import Poem, {allPoems} from "./poem";

interface SideBarProps {
    poems: Poem[]
}

export function poemVerses(poem: Poem) {
    return poem.verses.map((verse) => {
        return verse.split('\n')
    });
}

function onSelect(index: number) {
    const target = document.getElementById(String(index));
    if (target) {
        target.scrollIntoView({behavior: "smooth"});
    }
}

export default function SideBar(props: SideBarProps = {poems: allPoems}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <aside
                className={`fixed top-16 bottom-0 left-0 w-64 bg-gray-800 text-gray-200 p-4 overflow-y-auto transform transition-transform duration-200 lg:translate-x-0 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <ul className="space-y-2">
                    {props.poems.map((poem, index) => (
                        <li
                            key={index}
                            onClick={() => onSelect(index)}
                            className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                        >
                            {poem.title}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Overlay (mobile only)*/}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </>
    )
}

