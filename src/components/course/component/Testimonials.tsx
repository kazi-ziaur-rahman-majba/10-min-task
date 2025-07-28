// components/CourseTestimonials.tsx
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

interface TestimonialItem {
    id?: string;
    name?: string;
    testimonial?: string;
    profile_image?: string;
}

interface Props {
    name: string;
    description?: string;
    values: TestimonialItem[];
    sectionKey: string;
}

const CourseTestimonials: React.FC<Props> = ({ name, description, values, sectionKey }) => {
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
    <div className="py-16 bg-gradient-to-br from-white to-orange-50">
        <div className="text-center mb-12 px-4">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4 py-3">
            {name}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {description || "What our students say about their experience"}
            </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
            <div
            ref={scrollRef}
            className="flex space-x-6 px-6 md:px-12 snap-x snap-mandatory overflow-x-scroll pb-4 scroll-smooth"
            >
            {values.map((t, idx) => (
                <div
                key={t.id || `${sectionKey}-${idx}`}
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
};

export default CourseTestimonials;
