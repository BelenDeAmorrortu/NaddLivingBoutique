interface Props {
  color: "white" | "black";
  size: "large" | "medium" | "small" | "xsmall";
  tailwindStyles?: string;
}

export default function Loader({ color, size, tailwindStyles }: Props) {
  return (
    <div
      className={"loader rounded-[100%] relative "
        .concat(color === "white" ? "white" : "black")
        .concat(
          size === "large"
            ? " h-16 w-16 p-[6px]"
            : size === "medium"
            ? " h-12 w-12 p-[4px]"
            : size === "xsmall"
            ? " h-5 w-5 p-[2px]"
            : " h-10 w-10 p-[3px]"
        )
        .concat(tailwindStyles ? " " + tailwindStyles : "")}
    >
      <div
        className={"w-full h-full rounded-[100%]".concat(
          color === "white" ? " bg-black" : " bg-white"
        )}
      ></div>
    </div>
  );
}
