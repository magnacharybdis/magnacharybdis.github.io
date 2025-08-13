import {
    ArrowRightIcon,
    ArrowLeftIcon,
    HomeIcon,
    CogIcon,
    UserIcon,
    EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

interface SidebarItemProps {
    active?: boolean;
    icon: React.ReactNode;
    text: string;
    expanded: boolean;
    subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, 'expanded'> {
    expanded?: never;
    subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
function HoveredSubMenuItem({ icon, text, active }: SubMenuItemProps) {
    return (
        <div
            className={`my-2 rounded-md p-2 ${
                active ? 'bg-gray-300' : ' hover:bg-indigo-50'
            }`}
        >
            <div className="flex items-center justify-center ">
                <span className="text-primary-500 h-6 w-6 ">{icon}</span>
                <span className="text-primary-500 ml-3 w-28 text-start">{text}</span>
                <div className="bg-primary-200 h-1" />
            </div>
        </div>
    );
}

function SidebarItem({
                                        icon,
                                        active = false,
                                        text,
                                        expanded = false,
                                        subMenu = null,
                                    }: SidebarItemProps) {
    const [expandSubMenu, setExpandSubMenu] = useState(false);

    useEffect(() => {
        if (!expanded) {
            setExpandSubMenu(false);
        }
    }, [expanded]);

    // Calculate the height of the sub-menu assuming each item is 40px tall
    const subMenuHeight = expandSubMenu
        ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px`
        : 0;

    return (
        <>
            <li>
                <button
                    className={`
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md px-3
         py-2 font-medium transition-colors
         ${
                        active && !subMenu
                            ? 'text-primary-500 bg-gradient-to-tr from-indigo-200 to-indigo-100'
                            : 'text-gray-600 hover:bg-indigo-50'
                    }
         ${!expanded && 'hidden sm:flex'}
     `}
                    onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
                >
                    <span className="h-6 w-6">{icon}</span>

                    <span
                        className={`overflow-hidden text-start transition-all ${
                            expanded ? 'ml-3 w-44' : 'w-0'
                        }`}
                    >
            {text}
          </span>
                    {subMenu && (
                        <div
                            className={`absolute right-2 h-4 w-4${expanded ? '' : 'top-2'} transition-all ${expandSubMenu ? 'rotate-90' : 'rotate-0'}`}
                        >
                            <ChevronRightIcon />
                        </div>
                    )}

                    {/*
            display item text or sub-menu items when hovered
          */}
                    {!expanded && (
                        <div
                            className={`
            text-primary-500 invisible absolute left-full ml-6 -translate-x-3
            rounded-md bg-indigo-100 px-2
            py-1 text-sm opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
        `}
                        >
                            {/*
                if hovered item has no sub-menu, display the text
                else display the sub-menu items
              */}
                            {!subMenu
                                ? text
                                : subMenu.map((item, index) => (
                                    <HoveredSubMenuItem
                                        key={index}
                                        text={item.text}
                                        icon={item.icon}
                                    />
                                ))}
                        </div>
                    )}
                </button>
            </li>
            <ul
                className="sub-menu pl-6"
                style={{ height: subMenuHeight }}
            >
                {/*
          Render the sub-menu items if the item has a sub-menu
          The sub-menu items are rendered as SidebarItem components
        */}
                {expanded &&
                    subMenu?.map((item, index) => (
                        <SidebarItem key={index} {...item} expanded={expanded} />
                    ))}
            </ul>
        </>
    );
}

// This sidebar component is for both mobile and desktop
function Sidebar({ children, expanded, setExpanded }: any) {
    return (
        <div className="relative">
            {/*
        This div is used to create the background overlay when the sidebar is expanded
        It is only visible on mobile screens
      */}
            <div
                className={`fixed inset-0 -z-10 block bg-gray-400  ${expanded ? 'block sm:hidden' : 'hidden'}`}
            />
            <aside
                className={`box-border h-screen transition-all ${expanded ? 'w-5/6 sm:w-64' : 'w-0 sm:w-20'}`}
            >
                <nav className="flex h-full flex-col border-r bg-white shadow-sm">
                    <div className="flex items-center justify-between p-4 pb-2">
                        <img
                            src="https://img.logoipsum.com/243.svg"
                            className={`overflow-hidden transition-all ${
                                expanded ? 'w-32' : 'w-0'
                            }`}
                            alt=""
                        />
                        <div className={`${expanded ? '' : 'hidden sm:block'}`}>
                            <button
                                onClick={() => setExpanded((curr: boolean) => !curr)}
                                className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
                            >
                                {expanded ? (
                                    <ArrowRightIcon className="h-6 w-6" />
                                ) : (
                                    <ArrowLeftIcon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                    <ul className="flex-1 px-3">{children}</ul>
                    <div className="flex border-t p-3">
                        <img
                            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=Mark+Ruffalo"
                            alt=""
                            className="h-10 w-10 rounded-md"
                        />
                        <div
                            className={`
              flex items-center justify-between
              overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}
          `}
                        >
                            <div className="leading-4">
                                <h4 className="font-semibold">Mark Ruffalo</h4>
                                <span className="text-xs text-gray-600">mark@gmail.com</span>
                            </div>
                            <EllipsisVerticalIcon className="h-6 w-6" />
       export default                  </div>
                    </div>
                </nav>
            </aside>
        </div>
    );
}

export default function MakeSidebar() {
    const [expanded, setExpanded] = useState(true);
    const navBarItems = [
        {
            icon: <HomeIcon />,
            text: 'Home',
            active: true,
        },
        {
            icon: <UserIcon />,
            subMenu: [
                {
                    icon: <UserIcon />,
                    text: 'Profile',
                },
                {
                    icon: <CogIcon />,
                    text: 'Settings',
                },
            ],
            text: 'Profile',
        },
        {
            icon: <CogIcon />,
            text: 'Settings',
        },
    ];

    // Desktop Sidebar
    return (
        <Sidebar expanded={expanded} setExpanded={setExpanded}>
            {navBarItems.map((item, index) => (
                <SidebarItem key={index} expanded={expanded} {...item} />
            ))}
        </Sidebar>
    );
}