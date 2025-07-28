import React from "react";
import { FiDownload } from "react-icons/fi";

interface GroupJoinItem {
  id?: string;
  title?: string;
  description?: string;
  background?: {
    image?: string;
  };
  cta?: {
    text?: string;
    clicked_url?: string;
  };
}

interface Props {
  values: GroupJoinItem[];
  sectionKey: string;
}

const CourseGroupJoin: React.FC<Props> = ({ values, sectionKey }) => {
  return (
    <div className="space-y-4">
      {values.map((v, i) => (
        <div
          key={v.id || `${sectionKey}-${i}`}
          className="relative rounded-xl overflow-hidden text-white p-6"
          style={{
            backgroundImage: `url(${v.background?.image})`,
            backgroundSize: "cover",
          }}
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
};

export default CourseGroupJoin;