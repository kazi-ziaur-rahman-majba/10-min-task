
import React from "react";
import Image from "next/image";

interface InstructorItem {
  id?: string;
  image?: string;
  name?: string;
  short_description?: string;
  description?: string;
}

interface Props {
  name: string;
  values: InstructorItem[];
  sectionKey: string;
}

const CourseInstructors: React.FC<Props> = ({ name, values, sectionKey }) => {
  return (
    <div className="text-center text-black -mt-8 w-1/2">
      <h2 className="text-2xl font-bold text-black mb-4">{name}</h2>
      <div className="flex justify-center flex-wrap gap-6">
        {values.map((inst, i) => (
          <div key={inst.id || `${sectionKey}-${i}`} className="max-w-md">
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
};

export default CourseInstructors;
