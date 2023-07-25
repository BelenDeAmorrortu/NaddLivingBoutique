interface Props {
  color: string;
  size: string;
}

export default function Loader({ color, size }: Props) {
  return (
    <div
      className={"loader rounded-[100%] relative "
        .concat(color === "white" ? "white" : "black")
        .concat(
          size === "large"
            ? " h-16 w-16 p-[6px]"
            : size === "medium"
            ? " h-12 w-12 p-[4px]"
            : " h-10 w-10 p-[3px]"
        )}
    >
      <div
        className={"w-full h-full rounded-[100%]".concat(
          color === "white" ? " bg-black" : " bg-white"
        )}
      ></div>
    </div>
  );
}
