
import React from "react";

interface AboutItem {
    id?: string;
    title?: string;
    description?: string;
}

interface Props {
    values: AboutItem[];
    sectionKey: string;
}

const CourseAbout: React.FC<Props> = ({ values, sectionKey }) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
      <div className="max-w-4xl mx-auto">
        {values.map((item, idx) => (
          <div key={item.id || `${sectionKey}-${idx}`} className="mb-12 last:mb-0">
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
};

export default CourseAbout;
