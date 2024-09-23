"use client";
import React from "react";
import UseAnimations from "react-useanimations";
import { Animation } from "react-useanimations/utils";

type Props = {
  animation: Animation;
  strokeColor?: string;
  fillColor?: string;
  size?: number;
  speed?: number;
} & React.HTMLProps<HTMLDivElement>;

export default function AnimatedIcon(props: Props) {
  return <UseAnimations {...props} />;
}
