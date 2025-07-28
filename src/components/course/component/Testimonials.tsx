import { FaQuoteLeft, FaStar } from "react-icons/fa";
import Image from "next/image";

const Testimonials = ({ section }: { section: any }) => {
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
          {section.name}
        </h2>
        <p className="text-xl text-gray-600">
          {section.description || "What our students say about their experience"}
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex space-x-6 px-4 snap-x snap-mandatory overflow-x-scroll pb-4 scrollbar-hide">
          {section.values.map((t: any, idx: number) => (
            <div
              key={t.id || idx}
              className="min-w-[320px] max-w-[90%] sm:min-w-[380px] md:min-w-[400px] lg:min-w-[420px] bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group snap-start"
            >
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <FaQuoteLeft className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                  {t.profile_image ? (
                    <Image
                      src={t.profile_image}
                      alt={t.name || "Student"}
                      className="w-full h-full rounded-full object-cover"
                      width={80}
                      height={80}
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-2xl font-bold text-gray-600">
                        {t.name?.charAt(0) || "U"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-1">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  Verified Student
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed italic">
                {t.testimonial}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
