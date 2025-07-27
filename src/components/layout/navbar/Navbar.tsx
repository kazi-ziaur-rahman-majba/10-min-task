"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MdArrowDropDown, MdMenu, MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
// import Logo from "@/assets/10mslogo-svg.svg"; // Adjust the path as necessary

const NavBar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
	const [activeDesktopMenu, setActiveDesktopMenu] = useState<string | null>(null);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
		setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleSubMenu = (name: string) => {
		setOpenSubMenu((prev) => (prev === name ? null : name));
	};

	const handleDesktopMenuEnter = (menuName: string) => {
		if (hoverTimeout) {
		clearTimeout(hoverTimeout);
		}
		const timeout = setTimeout(() => {
		setActiveDesktopMenu(menuName);
		}, 150); // 150ms delay before opening
		setHoverTimeout(timeout);
	};

	const handleDesktopMenuLeave = () => {
		if (hoverTimeout) {
		clearTimeout(hoverTimeout);
		}
		const timeout = setTimeout(() => {
		setActiveDesktopMenu(null);
		}, 100); 
		setHoverTimeout(timeout);
	};

	const handleDesktopMenuStay = () => {
		if (hoverTimeout) {
		clearTimeout(hoverTimeout);
		}
	};

	const handleMobileNavClick = () => setIsMobileMenuOpen(false);

	const isActive = (href: string) => (pathname === href ? "text-green-600" : "");

	return (
		<header
			className={`w-full bg-white border-b border-gray-200 transition-all duration-300 ${
				isScrolled ? "fixed top-0 left-0 z-50 shadow-sm" : "relative"
			}`}
		>
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center py-3 px-4 lg:px-6">
					{/* Logo */}
					<Link href="/" className="flex-shrink-0">
						<Image
							src="/10mlslogo.png" // <-- Use your public image here
							alt="10 Minute School Logo"
							width={140}
							height={32}
							className="h-8 w-auto"
							priority
						/>
					</Link>

					{/* Search Bar - Desktop */}
					<div className="hidden lg:flex flex-1 max-w-md mx-6">
						<div className="relative w-full">
							<CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
							<input
								type="text"
								placeholder="কিসের কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
								className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
							/>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="lg:hidden text-2xl text-gray-600"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? <MdClose /> : <MdMenu />}
					</button>

					{/* Desktop Navigation */}
					<nav className="hidden lg:flex items-center">
						<ul className="flex items-center gap-1 text-sm font-medium">
							<li 
								className="relative"
								onMouseEnter={() => handleDesktopMenuEnter("class")}
								onMouseLeave={handleDesktopMenuLeave}
							>
								<button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
								Class 6-12 <MdArrowDropDown className="ml-1" />
								</button>
								<div 
								className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 transition-all duration-200 ${
									activeDesktopMenu === "class" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
								}`}
								onMouseEnter={handleDesktopMenuStay}
								onMouseLeave={handleDesktopMenuLeave}
								>
								<ul className="py-2 text-sm">
									<li>
									<Link
										href="/class-6"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Class 6
									</Link>
									</li>
									<li>
									<Link
										href="/class-7"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Class 7
									</Link>
									</li>
									<li>
									<Link
										href="/class-8"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Class 8
									</Link>
									</li>
								</ul>
								</div>
							</li>

							<li 
								className="relative"
								onMouseEnter={() => handleDesktopMenuEnter("skills")}
								onMouseLeave={handleDesktopMenuLeave}
							>
								<button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
								Skills <MdArrowDropDown className="ml-1" />
								</button>
								<div 
								className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 transition-all duration-200 ${
									activeDesktopMenu === "skills" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
								}`}
								onMouseEnter={handleDesktopMenuStay}
								onMouseLeave={handleDesktopMenuLeave}
								>
								<ul className="py-2 text-sm">
									<li>
									<Link
										href="/skill-development"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Skill Development
									</Link>
									</li>
									<li>
									<Link
										href="/professional-courses"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Professional Courses
									</Link>
									</li>
								</ul>
								</div>
							</li>

							<li>
								<Link
								href="/admission"
								className={`px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50 block ${isActive("/admission")}`}
								>
								Admission
								</Link>
							</li>

							<li 
								className="relative"
								onMouseEnter={() => handleDesktopMenuEnter("batch")}
								onMouseLeave={handleDesktopMenuLeave}
							>
								<button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
								Online Batch <MdArrowDropDown className="ml-1" />
								</button>
								<div 
								className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 transition-all duration-200 ${
									activeDesktopMenu === "batch" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
								}`}
								onMouseEnter={handleDesktopMenuStay}
								onMouseLeave={handleDesktopMenuLeave}
								>
								<ul className="py-2 text-sm">
									<li>
									<Link
										href="/hsc-batch"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										HSC Batch
									</Link>
									</li>
									<li>
									<Link
										href="/ssc-batch"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										SSC Batch
									</Link>
									</li>
								</ul>
								</div>
							</li>

							<li 
								className="relative"
								onMouseEnter={() => handleDesktopMenuEnter("english")}
								onMouseLeave={handleDesktopMenuLeave}
							>
								<button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
								English Centre <MdArrowDropDown className="ml-1" />
								</button>
								<div 
								className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 transition-all duration-200 ${
									activeDesktopMenu === "english" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
								}`}
								onMouseEnter={handleDesktopMenuStay}
								onMouseLeave={handleDesktopMenuLeave}
								>
								<ul className="py-2 text-sm">
									<li>
									<Link
										href="/spoken-english"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Spoken English
									</Link>
									</li>
									<li>
									<Link
										href="/ielts-preparation"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										IELTS Preparation
									</Link>
									</li>
								</ul>
								</div>
							</li>

							<li 
								className="relative"
								onMouseEnter={() => handleDesktopMenuEnter("more")}
								onMouseLeave={handleDesktopMenuLeave}
							>
								<button className="flex items-center px-3 py-2 text-gray-700 hover:text-green-600 rounded-md hover:bg-gray-50">
								More <MdArrowDropDown className="ml-1" />
								</button>
								<div 
								className={`absolute top-full left-0 mt-1 w-48 bg-white shadow-lg rounded-lg border z-50 transition-all duration-200 ${
									activeDesktopMenu === "more" ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
								}`}
								onMouseEnter={handleDesktopMenuStay}
								onMouseLeave={handleDesktopMenuLeave}
								>
								<ul className="py-2 text-sm">
									<li>
									<Link
										href="/about"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										About Us
									</Link>
									</li>
									<li>
									<Link
										href="/contact"
										className="block px-4 py-2 hover:bg-gray-50 hover:text-green-600"
									>
										Contact
									</Link>
									</li>
								</ul>
								</div>
							</li>
						</ul>
					</nav>

					{/* Right Section */}
					<div className="hidden lg:flex items-center gap-3 ml-4">
						<span className="text-sm text-gray-600">বাং</span>
						<div className="flex items-center gap-2 text-green-600">
						<span className="text-lg">📞</span>
						<span className="text-sm font-medium">16910</span>
						</div>
						<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
						লগ-ইন
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
				<div className="lg:hidden bg-white border-t border-gray-200 px-4 pb-4 max-h-96 overflow-y-auto">
					{/* Mobile Search */}
					<div className="py-3 border-b border-gray-100">
					<div className="relative">
						<CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
						<input
						type="text"
						placeholder="Search courses..."
						className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
						/>
					</div>
					</div>

					<ul className="flex flex-col gap-1 text-sm py-2">
					<li>
						<button
						onClick={() => toggleSubMenu("class")}
						className="flex justify-between items-center w-full py-3 text-left hover:text-green-600"
						>
						Class 6-12 <MdArrowDropDown />
						</button>
						{openSubMenu === "class" && (
						<ul className="ml-4 mt-1 space-y-1 pb-2">
							<li>
							<Link href="/class-6" className="block py-2 text-gray-600 hover:text-green-600">
								Class 6
							</Link>
							</li>
							<li>
							<Link href="/class-7" className="block py-2 text-gray-600 hover:text-green-600">
								Class 7
							</Link>
							</li>
							<li>
							<Link href="/class-8" className="block py-2 text-gray-600 hover:text-green-600">
								Class 8
							</Link>
							</li>
						</ul>
						)}
					</li>

					<li>
						<button
						onClick={() => toggleSubMenu("skills")}
						className="flex justify-between items-center w-full py-3 text-left hover:text-green-600"
						>
						Skills <MdArrowDropDown />
						</button>
						{openSubMenu === "skills" && (
						<ul className="ml-4 mt-1 space-y-1 pb-2">
							<li>
							<Link href="/skill-development" className="block py-2 text-gray-600 hover:text-green-600">
								Skill Development
							</Link>
							</li>
							<li>
							<Link href="/professional-courses" className="block py-2 text-gray-600 hover:text-green-600">
								Professional Courses
							</Link>
							</li>
						</ul>
						)}
					</li>

					<li>
						<Link
						href="/admission"
						onClick={handleMobileNavClick}
						className="block py-3 hover:text-green-600"
						>
						Admission
						</Link>
					</li>

					<li>
						<button
						onClick={() => toggleSubMenu("batch")}
						className="flex justify-between items-center w-full py-3 text-left hover:text-green-600"
						>
						Online Batch <MdArrowDropDown />
						</button>
						{openSubMenu === "batch" && (
						<ul className="ml-4 mt-1 space-y-1 pb-2">
							<li>
							<Link href="/hsc-batch" className="block py-2 text-gray-600 hover:text-green-600">
								HSC Batch
							</Link>
							</li>
							<li>
							<Link href="/ssc-batch" className="block py-2 text-gray-600 hover:text-green-600">
								SSC Batch
							</Link>
							</li>
						</ul>
						)}
					</li>

					<li>
						<button
						onClick={() => toggleSubMenu("english")}
						className="flex justify-between items-center w-full py-3 text-left hover:text-green-600"
						>
						English Centre <MdArrowDropDown />
						</button>
						{openSubMenu === "english" && (
						<ul className="ml-4 mt-1 space-y-1 pb-2">
							<li>
							<Link href="/spoken-english" className="block py-2 text-gray-600 hover:text-green-600">
								Spoken English
							</Link>
							</li>
							<li>
							<Link href="/ielts-preparation" className="block py-2 text-gray-600 hover:text-green-600">
								IELTS Preparation
							</Link>
							</li>
						</ul>
						)}
					</li>

					<li>
						<button
						onClick={() => toggleSubMenu("more")}
						className="flex justify-between items-center w-full py-3 text-left hover:text-green-600"
						>
						More <MdArrowDropDown />
						</button>
						{openSubMenu === "more" && (
						<ul className="ml-4 mt-1 space-y-1 pb-2">
							<li>
							<Link href="/about" className="block py-2 text-gray-600 hover:text-green-600">
								About Us
							</Link>
							</li>
							<li>
							<Link href="/contact" className="block py-2 text-gray-600 hover:text-green-600">
								Contact
							</Link>
							</li>
						</ul>
						)}
					</li>
					</ul>

					{/* Mobile Actions */}
					<div className="border-t border-gray-100 pt-4 mt-2">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2 text-green-600">
						<span className="text-lg">📞</span>
						<span className="text-sm font-medium">16910</span>
						</div>
						<button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium">
						লগ-ইন
						</button>
					</div>
					</div>
				</div>
				)}
			</div>
		</header>
	);
};

export default NavBar;