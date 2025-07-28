"use client";
import CourseFeatures from "./component/Feature";
import CourseTestimonials from "./component/Testimonials";
import CoursePointers from "./component/CoursePointers";
import CourseOffers from "./component/CourseOffers";
import CourseInstructors from "./component/CourseInstructors";
import CourseGroupJoin from "./component/CourseGroupJoin";
import CourseAbout from "./component/CourseAbout";

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
            const keyPrefix = `${section.type}-${index}`;
            switch (section.type) {
                case "offers":
                return (
                    <CourseOffers
                    key={keyPrefix}
                    values={section.values}
                    sectionKey={keyPrefix}
                    />
                );

                case "instructors":
                return (
                    <CourseInstructors
                    key={keyPrefix}
                    name={section.name}
                    values={section.values}
                    sectionKey={keyPrefix}
                    />
                );

                case "features":
                    return (
                        <CourseFeatures
                        key={keyPrefix}
                        name={section.name}
                        description={section.description}
                        values={section.values}
                        sectionKey={keyPrefix}
                        />
                    );

                case "pointers":
                return (
                    <CoursePointers
                    key={keyPrefix}
                    name={section.name}
                    description={section.description}
                    values={section.values}
                    sectionKey={keyPrefix}
                    />
                );

                case "group_join_engagement":
                return (
                    <CourseGroupJoin
                    key={keyPrefix}
                    values={section.values}
                    sectionKey={keyPrefix}
                    />
                );

                case "testimonials":
                    return (
                        <CourseTestimonials
                        key={keyPrefix}
                        name={section.name}
                        description={section.description}
                        values={section.values}
                        sectionKey={keyPrefix}
                        />
                    );

                case "about":
                return (
                    <CourseAbout
                    key={keyPrefix}
                    values={section.values}
                    sectionKey={keyPrefix}
                    />
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
