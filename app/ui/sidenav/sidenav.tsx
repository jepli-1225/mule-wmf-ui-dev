"use client";

import { useState, useEffect, useRef } from "react";
import NavLinks from "./nav-links";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sideNavRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sideNavRef.current &&
        !sideNavRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-[#2d323c]">
      <div className="flex items-center">
        {isMobile && (
          <button
            ref={menuButtonRef}
            onClick={toggleMenu}
            className="pl-4 pr-6 text-white"
          >
            <Bars3Icon
              className={`w-6 h-6 ${isOpen ? "text-yellow-500" : ""}`}
            />
          </button>
        )}
        {isMobile && (
          <Link href="/" className="text-white text-[10px] font-medium">
            WMF APP
          </Link>
        )}
        {!isMobile && <NavLinks />}
      </div>
      {isMobile && isOpen && (
        <div className="fixed inset-0 z-40">
          <div
            ref={sideNavRef}
            className="fixed inset-y-0 left-0 top-9 w-64 bg-[#2d323c] overflow-y-auto"
          >
            <div className="flex justify-end"></div>
            <NavLinks isMobile={true} closeMenu={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
