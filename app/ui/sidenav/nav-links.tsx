"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

interface SubItem {
  name: string;
  href: string;
}

interface NavLink {
  name: string;
  href: string;
  subItems?: SubItem[];
}

const links = [
  { name: "WMF App", href: "/" },
  {
    name: "WMF Events",
    href: "#",
    subItems: [
      { name: "Mule Inbound Event", href: "/events/inboundEvent" },
      { name: "Mule Outbound Event", href: "/events/outboundEvent" },
      { name: "Mule Error Event", href: "/events/errorEvent" },
    ],
  },
  {
    name: "WMF Configurations",
    href: "#",
    subItems: [
      {
        name: "Mule Interface Configs",
        href: "/configurations/interfaceConfig",
      },
      { name: "Mule Domains", href: "/configurations/domains" },
      {
        name: "Mule Notification Configs",
        href: "/configurations/notifConfig",
      },
    ],
  },
  {
    name: "Reports",
    href: "#",
    subItems: [{ name: "Dashboard View", href: "/reports" }],
  },
  {
    name: "Admin",
    href: "#",
    subItems: [{ name: "Permissions Page", href: "/UserPages/adminPage" }],
  },
];

interface NavLinksProps {
  isMobile?: boolean;
  closeMenu?: () => void;
}

export default function NavLinks({ isMobile, closeMenu }: NavLinksProps) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const catMenu = useRef<HTMLUListElement>(null);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeOpenMenus = (e: MouseEvent) => {
    if (openDropdown && !catMenu.current?.contains(e.target as Node)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeOpenMenus);
    return () => {
      document.removeEventListener("mousedown", closeOpenMenus);
    };
  }, [openDropdown]);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  const isLinkActive = (link: NavLink): boolean => {
    if (link.href === "/" && pathname === "/") return true;
    if (link.href !== "/" && pathname.startsWith(link.href)) return true;
    if (link.subItems) {
      return link.subItems.some(
        (subItem) => subItem.href !== "/" && pathname.startsWith(subItem.href)
      );
    }
    return false;
  };

  return (
    <ul ref={catMenu} className={`flex ${isMobile ? "flex-col" : "flex-row"}`}>
      {links.map((link) => {
        const isActive = isLinkActive(link);
        if (link.subItems) {
          return (
            <li key={link.name} className="relative">
              <button
                onClick={() => toggleDropdown(link.name)}
                className={`flex h-[38px] items-center justify-between gap-1 pl-4 pr-2 text-white text-[10px] font-medium hover:text-yellow-500 w-full ${
                  isActive
                    ? `bg-[#282d36] border-t-yellow-500 ${
                        isMobile
                          ? "border-b-2 border-b-[#21252c]"
                          : "border-l-2 border-l-[#21252c] border-r-2 border-r-[#21252c]"
                      } before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-0.5 before:bg-yellow-500` //colour of main menu button I'm on
                    : "bg-[#2d323c]" //colour of main menu buttons I'm not on, except WMF App
                }`}
              >
                <span className="whitespace-nowrap">{link.name}</span>
                {openDropdown === link.name ? (
                  <ChevronUpIcon className="h-2 w-2" />
                ) : (
                  <ChevronDownIcon className="h-2 w-2" />
                )}
              </button>
              {openDropdown === link.name && (
                <ul
                  className={`${
                    isMobile ? "w-full" : "absolute left-0 w-36 rounded-b"
                  } ${isMobile ? "bg-[#1f232a]" : "bg-[#454952]"}`} //submenu buttons of pages I'm not on
                >
                  {link.subItems.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.href}
                        className={`block py-1 text-[10px] text-white rounded-b hover:bg-[#444444] pl-4 hover:text-yellow-500 whitespace-nowrap ${
                          pathname === subItem.href
                            ? "bg-[#444444] text-yellow-500" //submenu button of page I'm on
                            : ""
                        }`}
                        onClick={() => {
                          setOpenDropdown(null);
                          if (isMobile && closeMenu) closeMenu();
                        }}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        if (!isMobile) {
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`flex h-[38px] items-center justify-center gap-2 bg-[#2d323c] p-3 pl-11 text-white text-[10px] font-medium hover:text-yellow-500 w-full ${
                  pathname === link.href ? "bg-[#3a414f]" : ""
                }`}
                onClick={() => {
                  if (isMobile && closeMenu) closeMenu();
                }}
              >
                <span className="whitespace-nowrap">{link.name}</span>
              </Link>
            </li>
          );
        }
      })}
    </ul>
  );
}
