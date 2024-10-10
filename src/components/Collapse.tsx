"use client";
import React from "react";
import { CollapseProps } from "antd";
import { Collapse as AntCollapse } from "antd";

export default function Collapse({ ...props }: CollapseProps) {
  return <AntCollapse {...props} />;
}
