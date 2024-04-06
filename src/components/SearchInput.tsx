// "use client";
// import { navigation } from "@/utils/navigation";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
// import { TextField } from "@mui/material";
// import { useRouter } from "next/navigation";

// interface Props {
//   input: string;
//   setInput: (args: string) => void;
//   props?: any;
//   width: number;
// }

// export default function SearchInput({ input, setInput, props, width }: Props) {
//   const router = useRouter();

//   const handleSearch = (e: any) => {
//     if (input.trim() !== "") {
//       e.preventDefault();
//       router.push(`${navigation.productos}?search=${input}`);
//       setInput("");
//     }
//   };

//   return (
//     <form
//       onSubmit={(e) => handleSearch(e)}
//       className="flex justify-between items-align w-full"
//     >
//       <button type="submit">
//         <MagnifyingGlassIcon className="w-5 h-5 mr-3 stroke-white" />
//       </button>
//       <TextField
//         {...props}
//         variant="standard"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         InputProps={{
//           ...props.InputProps,
//           disableUnderline: true,
//           style: {
//             background: "transparent",
//             color: "#f5f5f5",
//             width: width < 500 ? "35vw" : "20vw",
//           },
//         }}
//         placeholder="Buscar..."
//         loading={true}
//         loadingText="Cargando..."
//         onBlur={() => setInput("")}
//       />
//     </form>
//   );
// }
