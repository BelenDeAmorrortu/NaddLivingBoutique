"use client";
import UseAnimations from "react-useanimations";
import loadingCircular from "react-useanimations/lib/loading";

export default function loading() {
  return (
    <div className="bg-black w-screen h-screen flex-col-center space-y-12">
      <UseAnimations
        animation={loadingCircular}
        size={100}
        strokeColor="#fff"
      />
    </div>
  );
}
