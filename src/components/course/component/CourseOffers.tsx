import React from "react";

interface OfferItem {
  id?: string;
  text?: string;
}

interface Props {
  values: OfferItem[];
  sectionKey: string;
}

const CourseOffers: React.FC<Props> = ({ values, sectionKey }) => {
  return (
    <div className="space-y-4 w-1/2">
      {values.map((offer, i) => (
        <div
          key={offer.id || `${sectionKey}-${i}`}
          className="bg-red-100 p-6 rounded-lg text-center"
        >
          <p className="text-red-600 text-lg font-semibold">
            {offer.text}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CourseOffers;
