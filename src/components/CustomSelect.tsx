"use client";
import { Select, SelectProps } from "antd";
import React, { useEffect } from "react";

interface CustomSelectProps extends SelectProps<any> {
  prefix?: string;
  onChange?: (value: any) => void;
}

export default function CustomSelect({
  onChange,
  prefix,
  ...props
}: CustomSelectProps) {
  const setInnerText = (text: string) => {
    if (document && prefix) {
      const selectText = document
        .getElementsByClassName(`select-type-${prefix}`)[0]
        ?.getElementsByClassName(`ant-select-selection-item`)[0];
      if (selectText) selectText.innerHTML = `${prefix}:  ${text}`;
    }
  };

  useEffect(() => {
    if (prefix) {
      const valueLabel = String(
        props?.options?.find((o) => o.value === props.value)?.label ??
          "Seleccionar"
      );
      setInnerText(valueLabel);
    }
  }, [props.value]);

  return (
    <Select
      {...props}
      className={prefix ? `select-type-${prefix}` : ""}
      onChange={(_, option: any) => {
        onChange(option.value);
      }}
    />
  );
}
