interface Props {
  color: string;
  size: string;
}

export default function Loader({ color, size }: Props) {
  return (
    <div
      className={"loader p-[6px] rounded-[100%] relative "
        .concat(color === "white" ? "white" : "black")
        .concat(
          size === "large"
            ? " h-16 w-16"
            : size === "medium"
            ? " h-12 w-12"
            : " h-10 w-10 border-[0.2em]"
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
