"use client";
import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface MediaItem {
  thumbnail_url?: string;
  resource_value?: string;
}

interface ChecklistItem {
  text: string;
}

interface CTA {
  name: string;
  value: string;
}

interface BannerProps {
  title: string;
  media: MediaItem[];
  description: string;
  checklist: ChecklistItem[];
  cta_text: CTA;
}

const Banner: React.FC<BannerProps> = ({
  title,
  media,
  description,
  checklist,
  cta_text,
}) => {
  const router = useRouter();

  const [cleanHtml, setCleanHtml] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    tempDiv.querySelectorAll("p.tenms__paragraph").forEach((p) => {
      p.removeAttribute("class");
    });
    setCleanHtml(tempDiv.innerHTML);
  }, [description]);

  const getImageUrl = (item: MediaItem) => {
    return item.thumbnail_url || item.resource_value || "";
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === media.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    if (media.length > 1) {
      const interval = setInterval(goToNext, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, media.length]);

  const handleCTAClick = () => {
    switch (cta_text.value) {
      case "enroll":
        router.push("/checkout");
        break;
      case "preview":
        // এখানে preview modal বা অন্য কোনো action আসতে পারে
        alert("Preview is clicked");
        break;
      case "login":
        router.push("/login");
        break;
      default:
        alert(`Unknown action: ${cta_text.value}`);
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-[#08001C] to-[#010214] h-[400px] text-white p-4 md:p-12">
      <div className="max-w-screen-xl mx-auto relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start">
        {/* Left Side */}
        <div className="md:w-[52%] space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-300 via-pink-300 to-white bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          <div
            className="prose prose-invert max-w-none text-gray-300 text-lg"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
        </div>

        {/* Right Side: Carousel */}
        <div className="md:w-[45%] w-full bg-white rounded-xl shadow-lg p-4 z-10 relative">
          {/* Image */}
          <div className="relative h-64 md:h-[280px] rounded-md overflow-hidden">
            <Image
              src={getImageUrl(media[currentIndex])}
              alt={`Slide ${currentIndex}`}
              height={280}
              width={600}
              className="object-cover w-full h-full"
              priority={true}
            />
            {/* Arrows */}
            {media.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
                >
                  <FaChevronLeft size={18} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75"
                >
                  <FaChevronRight size={18} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`border-2 rounded-md transition p-[2px] ${
                  index === currentIndex
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              >
                <div className="relative w-20 h-14 overflow-hidden rounded-sm border">
                  <Image
                    src={getImageUrl(item)}
                    alt={`Thumbnail ${index}`}
                    height={80}
                    width={120}
                    className="object-cover"
                  />
                </div>
              </button>
            ))}
          </div>
          {/* CTA Button */}
          {cta_text?.name && (
            <button
              onClick={handleCTAClick}
              className="mt-6 bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              {cta_text.name}
            </button>
          )}

          {checklist && checklist.length > 0 && (
            <div className="mt-4 gap-3 text-sm text-gray-800">
              {checklist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-gray-50 px-4 mt-2 py-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
                >
                  <span className="text-green-600 text-lg mt-[2px]">✔</span>
                  <p className="text-base font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
