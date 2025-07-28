"use client";
import React, { useEffect, useRef } from "react";
import { FaCheckCircle, FaStar, FaQuoteLeft } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import Image from "next/image";

interface ValueItem {
    id?: string;
    title?: string;
    description?: string;
    icon?: string;
    image?: string;
    text?: string;
    background_color?: string;
    text_color?: string;
    background?: any;
    cta?: any;
    name?: string;
    short_description?: string;
    profile_image?: string;
    testimonial?: string;
    subtitle?: string;
}

interface Section {
    type: string;
    name: string;
    description: string;
    bg_color: string;
    order_idx: number;
    values: ValueItem[];
}

interface CourseProps {
    sections: Section[];
}

const Course: React.FC<CourseProps> = ({ sections }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
        scrollContainer.scrollBy({ left: 350, behavior: "smooth" });
    }, 3000);

    return () => clearInterval(scrollInterval);
}, []);

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
            {sections.map((section, index) => {
            const keyPrefix = `${section.type}-${index}`;
            switch (section.type) {
                case "offers":
                return (
                    <div key={keyPrefix} className="space-y-4 w-1/2">
                    {section.values.map((offer, i) => (
                        <div
                        key={offer.id || `${keyPrefix}-${i}`}
                        className="bg-red-100 p-6 rounded-lg text-center"
                        >
                        <p className="text-red-600 text-lg font-semibold">
                            {offer.text}
                        </p>
                        </div>
                    ))}
                    </div>
                );

                case "instructors":
                return (
                    <div key={keyPrefix} className="text-center text-black -mt-8 w-1/2">
                    <h2 className="text-2xl font-bold text-black mb-4">{section.name}</h2>
                    <div className="flex justify-center flex-wrap gap-6">
                        {section.values.map((inst, i) => (
                        <div key={inst.id || `${keyPrefix}-${i}`} className="max-w-md">
                            <Image
                            src={inst.image ?? ""}
                            alt={inst.name ?? ""}
                            width={300}
                            height={300}
                            className="rounded-full mx-auto"
                            />
                            <h3 className="text-lg font-semibold text-black mt-2">{inst.name}</h3>
                            <p className="text-sm text-black">{inst.short_description}</p>
                            <div
                            className="mt-2 text-sm"
                            dangerouslySetInnerHTML={{
                                __html: inst.description ?? "",
                            }}
                            ></div>
                        </div>
                        ))}
                    </div>
                    </div>
                );

                case "features":
                return (
                    <div key={keyPrefix}>
                    <div className="text-center mb-12 ">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent py-4 mb-4">
                        {section.name}
                        </h2>
                        <p className="text-xl text-gray-600">
                        {section.description ||
                            "Everything you need to succeed in your learning journey"}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {section.values.map((feature, idx) => (
                        <div
                            key={feature.id || `${keyPrefix}-${idx}`}
                            className="group relative overflow-hidden"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                            <div className="mb-6">
                                {feature.icon ? (
                                <Image
                                    src={feature.icon}
                                    alt="Feature Icon"
                                    width={64}
                                    height={64}
                                    className="mb-4 mx-auto"
                                />
                                ) : (
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    <span className="text-2xl font-bold text-white">
                                    {feature.title?.charAt(0) || "F"}
                                    </span>
                                </div>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.subtitle ||
                                feature.description ||
                                "Comprehensive feature designed to enhance your learning experience."}
                            </p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                );

                case "pointers":
                return (
                    <div
                    key={keyPrefix}
                    className="bg-white rounded-3xl p-12  border border-gray-100"
                    >
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 py-3">
                        {section.name}
                        </h2>
                        <p className="text-xl text-gray-600">
                        {section.description ||
                            "Key benefits you'll get from this course"}
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {section.values.map((item, idx) => (
                        <div
                            key={item.id || `${keyPrefix}-${idx}`}
                            className="flex items-center gap-3 bg-green-50 hover:bg-green-100 rounded-lg p-4 transition-colors duration-200 group shadow-sm"
                        >
                            <div className="flex-shrink-0">
                                <FaCheckCircle className="w-6 h-6 text-green-500" />
                            </div>
                            <p className="text-gray-800 font-semibold leading-relaxed group-hover:text-green-700 transition-colors duration-200">
                                {item.text}
                            </p>
                        </div>
                        ))}
                    </div>
                    </div>
                );

                case "group_join_engagement":
                return (
                    <div key={keyPrefix} className="space-y-4">
                    {section.values.map((v, i) => (
                        <div
                        key={v.id || `${keyPrefix}-${i}`}
                        className="relative rounded-xl overflow-hidden text-white p-6"
                        style={{ backgroundImage: `url(${v.background?.image})`, backgroundSize: "cover" }}
                        >
                        <div className="backdrop-blur-sm bg-black/50 p-6 rounded-xl">
                            <h2 className="text-2xl font-bold mb-2">{v.title}</h2>
                            <p className="mb-4">{v.description}</p>
                            <a
                            href={v.cta?.clicked_url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded hover:bg-gray-100"
                            >
                            <FiDownload /> {v.cta?.text}
                            </a>
                        </div>
                        </div>
                    ))}
                    </div>
                );

                case "testimonials":
                return (
                    <div key={keyPrefix} className="py-16 bg-gradient-to-br from-white to-orange-50">
                    <div className="text-center mb-12 px-4">
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 py-3">
                        {section.name}
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                        {section.description ||
                            "What our students say about their experience"}
                        </p>
                    </div>

                    <div className="overflow-x-auto scrollbar-hide">
                        <div
                        ref={scrollRef}
                        className="flex space-x-6 px-6 md:px-12 snap-x snap-mandatory overflow-x-scroll pb-4 scroll-smooth"
                        >
                        {section.values.map((t, idx) => (
                            <div
                            key={t.id || `${keyPrefix}-${idx}`}
                            className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] max-w-[90%] bg-white bg-opacity-70 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-orange-100 transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-1 snap-start relative group"
                            >
                            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity duration-300">
                                <FaQuoteLeft className="w-6 h-6 text-yellow-400" />
                            </div>

                            <div className="flex flex-col items-center mb-4">
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-400 p-1">
                                {t.profile_image ? (
                                    <Image
                                    src={t.profile_image}
                                    alt={t.name || "Student"}
                                    className="w-full h-full rounded-full object-cover"
                                    width={64}
                                    height={64}
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                    <span className="text-xl font-bold text-gray-600">
                                        {t.name?.charAt(0) || "U"}
                                    </span>
                                    </div>
                                )}
                                </div>
                                <div className="flex items-center gap-1 mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                                ))}
                                </div>
                            </div>

                            <h3 className="font-semibold text-lg text-center text-gray-800">{t.name}</h3>
                            <p className="text-sm text-gray-500 text-center mb-4">Verified Student</p>
                            <p className="text-gray-700 text-sm leading-relaxed italic text-center line-clamp-5">
                                {t.testimonial}
                            </p>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                );

                case "about":
                return (
                    <div key={keyPrefix} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
                    <div className="max-w-4xl mx-auto">
                        {section.values.map((item, idx) => (
                        <div key={item.id || `${keyPrefix}-${idx}`} className="mb-12 last:mb-0">
                            <div className="text-center mb-8">
                            <div
                                className="text-3xl font-bold text-gray-900 mb-4 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                __html: item.title ?? "Course Information",
                                }}
                            />
                            </div>
                            <div
                            className="prose prose-lg prose-gray max-w-none text-center leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{
                                __html:
                                item.description ??
                                "Comprehensive course content designed to help you achieve your goals.",
                            }}
                            />
                        </div>
                        ))}
                    </div>
                    </div>
                );

                default:
                return null;
            }
            })}
        </div>
    </div>
  );
};

export default Course;
