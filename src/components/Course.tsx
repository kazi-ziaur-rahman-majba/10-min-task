"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";
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
    <div className="space-y-10">
      {sections.map((section, index) => {
        switch (section.type) {
          case "offers":
            return section.values.map((offer) => (
              <div
                key={offer.id}
                className="bg-red-100 p-6 rounded-lg text-center"
              >
                <p className="text-red-600 text-lg font-semibold">
                  {offer.text}
                </p>
              </div>
            ));

          case "instructors":
            return (
              <div key={index} className="text-center">
                <h2 className="text-2xl font-bold mb-4">{section.name}</h2>
                <div className="flex justify-center">
                  {section.values.map((inst) => (
                    <div key={inst.name} className="max-w-md">
                      <Image
                        src={inst.image ?? ""}
                        alt={inst.name ?? ""}
                        width={300}
                        height={300}
                        className="rounded-full mx-auto"
                      />
                      <h3 className="text-lg font-semibold mt-2">
                        {inst.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {inst.short_description}
                      </p>
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
              <div key={index}>
                <h2 className="text-xl font-bold mb-4">{section.name}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.values.map((feature) => (
                    <div
                      key={feature.id}
                      className="bg-white shadow-md p-4 rounded-lg"
                    >
                      <Image
                        src={feature.icon ?? ""}
                        alt="Feature Icon"
                        width={50}
                        height={50}
                        className="mb-2"
                      />
                      <h3 className="font-bold">{feature.title}</h3>
                      <p className="text-sm text-gray-600">
                        {feature.subtitle}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "pointers":
            return (
              <div key={index}>
                <h2 className="text-xl font-bold mb-4">{section.name}</h2>
                <ul className="list-disc list-inside space-y-2">
                  {section.values.map((item) => (
                    <li key={item.id} className="text-gray-700">
                      <FaCheckCircle className="inline mr-2 text-green-500" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "group_join_engagement":
            return section.values.map((v) => (
              <div
                key={v.id}
                className="relative rounded-xl overflow-hidden text-white p-6"
                style={{ backgroundImage: `url(${v.background?.image})` }}
              >
                <div className="backdrop-blur-sm bg-black/50 p-6 rounded-xl">
                  <h2 className="text-2xl font-bold mb-2">{v.title}</h2>
                  <p className="mb-4">{v.description}</p>
                  <a
                    href={v.cta?.clicked_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-white text-black font-medium px-4 py-2 rounded hover:bg-gray-100"
                  >
                    <FiDownload /> {v.cta?.text}
                  </a>
                </div>
              </div>
            ));

          case "testimonials":
            return (
              <div key={index}>
                <h2 className="text-xl font-bold mb-4">{section.name}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.values.map((t) => (
                    <div
                      key={t.id}
                      className="p-4 border rounded-lg shadow bg-white"
                    >
                      <Image
                        src={t.profile_image ?? ""}
                        alt={t.name ?? ""}
                        width={80}
                        height={80}
                        className="rounded-full mb-2"
                      />
                      <h3 className="font-semibold">{t.name}</h3>
                      <p className="text-sm text-gray-500">{t.testimonial}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "about":
            return (
              <div key={index}>
                {section.values.map((item) => (
                  <div key={item.id} className="mb-6">
                    <div
                      className="text-xl font-semibold mb-2"
                      dangerouslySetInnerHTML={{ __html: item.title ?? "" }}
                    ></div>
                    <div
                      className="text-sm text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: item.description ?? "",
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Course;
