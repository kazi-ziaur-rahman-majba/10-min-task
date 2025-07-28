import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface PointerItem {
    id?: string;
    text?: string;
}

interface Props {
    name: string;
    description?: string;
    values: PointerItem[];
    sectionKey: string;
}

const CoursePointers: React.FC<Props> = ({ name, description, values, sectionKey }) => {
    return (
        <div className="bg-white rounded-3xl p-12 border border-gray-100">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4 py-3">
            {name}
            </h2>
            <p className="text-xl text-gray-600">
            {description || "Key benefits you'll get from this course"}
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((item, idx) => (
            <div
                key={item.id || `${sectionKey}-${idx}`}
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
};

export default CoursePointers;
