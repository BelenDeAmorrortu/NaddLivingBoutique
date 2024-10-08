import React from "react";

export default function CardSkeleton() {
  return (
    <div className="flex flex-col items-start justify-start w-[80vw] sm:w-[65vw] min-h-[185px] md:w-[25vw] min-[1080px]:w-[20vw] md:min-h-[225px] lg:min-h-[255px]">
      <div className="bg-grey-hover skeleton card-image rounded-sm"></div>
      <div className="bg-grey-hover skeleton mt-4 mb-2 h-[25px] rounded-sm w-28"></div>
      <div className="flex justify-between items-center w-full">
        <div className="bg-grey-hover skeleton h-[17px]  w-20 rounded-sm"></div>
        <div className="bg-grey-hover skeleton h-[17px]  w-20 rounded-sm"></div>
      </div>
    </div>
  );
}
