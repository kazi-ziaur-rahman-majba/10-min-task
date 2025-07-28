"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdMenu, MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import logo from "../../../../public/assets/images/10.svg";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang === "bn" || savedLang === "en") setLanguage(savedLang);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const isActive = (href: string) => (pathname === href ? "text-green-600" : "");

  return (
    <header
      className={`w-full bg-white border-b border-gray-200 transition-all duration-300 ${
        isScrolled ? "fixed top-0 left-0 z-50 shadow-sm" : "relative"
      }`}
    >
      <div className="max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-center py-3 px-4 md:px-6 lg:px-8 xl:px-10">
          <Link href="/" className="flex-shrink-0">
            <Image
              src={logo}
              alt="10 Minute School Logo"
              width={140}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder={
                  language === "bn"
                    ? "কিসের কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
                    : "Search for courses or school programs..."
                }
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-black rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>

          <button
            className="lg:hidden text-2xl text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center text-black gap-1 text-sm font-medium">
              {[
                {
                  label: "Courses",
                  items: [
                    { link: "/courses/math", text: "Math" },
                    { link: "/courses/english", text: "English" },
                  ],
                },
                {
                  label: "Programs",
                  items: [
                    { link: "/programs/school", text: "School Program" },
                    { link: "/programs/college", text: "College Program" },
                  ],
                },
              ].map(({ label, items }) => (
                <li key={label} className="relative group">
                  <button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
                    {label} <MdArrowDropDown className="ml-1" />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200 translate-y-2`}
                  >
                    <ul className="py-2 text-sm">
                      {items.map((item) => (
                        <li key={item.link}>
                          <Link
                            href={item.link}
                            className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
                          >
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}

              <li>
                <Link
                  href="/admission"
                  className={`px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50 block ${isActive(
                    "/admission"
                  )}`}
                >
                  {language === "bn" ? "Admission" : "Admission"}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Right Section */}
          <div className="hidden lg:flex items-center gap-3 ml-4">
            <div className="flex gap-1 items-center text-sm">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-2 py-1 rounded ${
                  language === "bn" ? "bg-green-100 text-green-600" : "text-gray-600"
                }`}
              >
                বাংলা
              </button>
              |
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-1 rounded ${
                  language === "en" ? "bg-green-100 text-green-600" : "text-gray-600"
                }`}
              >
                English
              </button>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <span className="text-lg">📞</span>
              <span className="text-sm font-medium">16910</span>
            </div>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              {language === "bn" ? "লগ-ইন" : "Login"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4 max-h-96 overflow-y-auto">
            <div className="py-3 border-b border-gray-100">
              <div className="relative">
                <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder={language === "bn" ? "সার্চ করুন..." : "Search..."}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                />
              </div>
            </div>

            {/* Language Switch Mobile */}
            <div className="flex items-center justify-center gap-3 py-4">
              <button
                onClick={() => setLanguage("bn")}
                className={`px-3 py-1 rounded ${
                  language === "bn" ? "bg-green-100 text-green-600" : "text-gray-600"
                }`}
              >
                বাংলা
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded ${
                  language === "en" ? "bg-green-100 text-green-600" : "text-gray-600"
                }`}
              >
                English
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
