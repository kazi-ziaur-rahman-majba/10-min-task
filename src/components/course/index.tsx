"use client";

import React from "react";
import { 
  FaCheckCircle, 
  FaStar,
  FaQuoteLeft
} from "react-icons/fa";
import { 
  FiDownload, 
  FiArrowRight
} from "react-icons/fi";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-20">
        {sections.map((section, index) => {
          switch (section.type) {
            case "offers":
              return section.values.map((offer) => (
                <div
                  key={offer.id}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 p-1 shadow-2xl transform hover:scale-105 transition-all duration-300 max-w-4xl mx-auto"
                >
                  <div className="bg-white rounded-3xl p-8 text-center relative">
                    
                    <div className="mt-6">
                      <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent leading-relaxed">
                        {offer.text}
                      </p>
                    </div>
                    
                  </div>
                </div>
              ));

            case "instructors":
              return (
                <div key={index} className="text-center">
                  <div className="mb-12">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                      {section.name}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                      {section.description || "Learn from industry experts with years of experience"}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.values.map((inst, idx) => (
                      <div key={inst.name || idx} className="group">
                        <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                          <div className="relative mb-6">
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
                              {inst.image ? (
                                <img
                                  src={inst.image}
                                  alt={inst.name || "Instructor"}
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                                  <span className="text-4xl font-bold text-indigo-500">
                                    {inst.name?.charAt(0) || "I"}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {inst.name}
                          </h3>
                          <p className="text-indigo-600 font-semibold mb-4">
                            {inst.short_description}
                          </p>
                          <div 
                            className="text-gray-600 leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: inst.description ?? "Expert instructor with extensive experience in the field.",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "features":
              return (
                <div key={index}>
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                      {section.name}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {section.description || "Everything you need to succeed in your learning journey"}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {section.values.map((feature, idx) => (
                      <div
                        key={feature.id || idx}
                        className="group relative overflow-hidden"
                      >
                        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                          <div className="mb-6">
                            {feature.icon ? (
                              <img
                                src={feature.icon}
                                alt="Feature Icon"
                                className="w-16 h-16 mb-4 mx-auto"
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
                            {feature.subtitle || feature.description || "Comprehensive feature designed to enhance your learning experience."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "pointers":
              return (
                <div key={index} className="bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                      {section.name}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {section.description || "Key benefits you'll get from this course"}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {section.values.map((item, idx) => (
                      <div key={item.id || idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors duration-300 group">
                        <div className="flex-shrink-0">
                          <FaCheckCircle className="w-6 h-6 text-green-500 mt-1" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-700 font-medium leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                            {item.text}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "group_join_engagement":
              return section.values.map((v) => (
                <div
                  key={v.id}
                  className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500"
                >
                  {v.background?.image ? (
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${v.background.image})` }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700"></div>
                  )}
                  <div className="relative z-10 p-12 text-white text-center">
                    <div className="backdrop-blur-sm bg-black/50 p-8 rounded-2xl">
                      <h2 className="text-4xl font-bold mb-4">{v.title}</h2>
                      <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-8">
                        {v.description}
                      </p>
                      <button 
                        className="inline-flex items-center gap-3 bg-white text-purple-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                      >
                        <FiDownload className="w-5 h-5" /> 
                        {v.cta?.text || "Join Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ));

            case "testimonials":
              return (
                <div key={index}>
                  <div className="text-center mb-12">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
                      {section.name}
                    </h2>
                    <p className="text-xl text-gray-600">
                      {section.description || "What our students say about their experience"}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {section.values.map((t, idx) => (
                      <div
                        key={t.id || idx}
                        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden group"
                      >
                        <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                          <FaQuoteLeft className="w-8 h-8 text-yellow-500" />
                        </div>
                        <div className="mb-6">
                          <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                            {t.profile_image ? (
                              <img
                                src={t.profile_image}
                                alt={t.name || "Student"}
                                className="w-full h-full rounded-full object-cover"
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
                          <h3 className="font-bold text-xl text-gray-900 mb-1">{t.name}</h3>
                          <p className="text-sm text-gray-500 font-medium">Verified Student</p>
                        </div>
                        <p className="text-gray-700 leading-relaxed italic">
                          "{t.testimonial}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );

            case "about":
              return (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
                  <div className="max-w-4xl mx-auto">
                    {section.values.map((item, idx) => (
                      <div key={item.id || idx} className="mb-12 last:mb-0">
                        <div className="text-center mb-8">
                          <div
                            className="text-3xl font-bold text-gray-900 mb-4 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: item.title ?? "Course Information" }}
                          />
                        </div>
                        <div
                          className="prose prose-lg prose-gray max-w-none text-center leading-relaxed text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: item.description ?? "Comprehensive course content designed to help you achieve your goals.",
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