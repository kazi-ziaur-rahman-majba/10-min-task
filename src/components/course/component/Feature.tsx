// components/CourseFeatures.tsx
import React from "react";
import Image from "next/image";

interface FeatureItem {
  id?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  description?: string;
}

interface Props {
  name: string;
  description?: string;
  values: FeatureItem[];
  sectionKey: string;
}

const CourseFeatures: React.FC<Props> = ({ name, description, values, sectionKey }) => {
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent py-4 mb-4">
          {name}
        </h2>
        <p className="text-xl text-gray-600">
          {description || "Everything you need to succeed in your learning journey"}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((feature, idx) => (
          <div
            key={feature.id || `${sectionKey}-${idx}`}
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
                {feature.subtitle || feature.description || "Enhance your learning experience."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseFeatures;
