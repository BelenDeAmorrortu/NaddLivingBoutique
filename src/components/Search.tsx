"use client";
import { useEffect, useState } from "react";
import { getProducts } from "../sanity/requests/sanity-requests";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Autocomplete, Popper } from "@mui/material";
import SearchInput from "./SearchInput";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
import { categories } from "@/utils/categories";
import { navigation } from "@/utils/navigation";
const queryClient = new QueryClient();

export default function Search() {
  return (
    <QueryClientProvider client={queryClient}>
      <Content />
    </QueryClientProvider>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    "& .MuiAutocomplete-listbox": {
      background: "#0f0f0f",
      color: "#ffff",
      textTransform: "capitalize",
      padding: 25,
      borderRadius: 0,
      "& li": {
        borderBottom: "1px solid #9ca3af66",
        margin: "10px 0",
        padding: "8px 0",
        "@media(max-width: 640px)": {
          fontSize: "13px",
          padding: "5px 0",
        },
        "@media(max-width: 500px)": {
          fontSize: "15.5px",
        },
        "&:hover": {
          borderBottom: "1px solid #ffff",
          transition: "border 0.2s linear",
        },
      },
    },
    "& .MuiAutocomplete-noOptions": {
      background: "#0f0f0f",
      color: "#ffff",
      textTransform: "capitalize",
      padding: 25,
      minHeight: 70,
      paddingTop: 40,
    },
    "& .MuiAutocomplete-paper": {
      borderRadius: 3,
      left: -21,
      position: "absolute",
      width: "26vw",
      "@media(max-width: 1024px)": {
        width: "28.5vw",
        left: -15,
      },
      "@media(max-width: 768px)": {
        width: "31vw",
        left: -20,
      },
      "@media(max-width: 640px)": {
        width: "37vw",
        left: -30,
      },
      "@media(max-width: 500px)": {
        width: "100vw",
        left: "0",
      },
    },
    "& .MuiAutocomplete-endAdornment": {
      "& .MuiSvgIcon-root": {
        fill: "#ffff",
      },
      "& .MuiAutocomplete-popupIndicator": {
        display: "none",
      },
    },
  },
}));

function Content() {
  const router = useRouter();
  const classes = useStyles();
  const [width, setWidth] = useState<number>(0);

  const { isPlaceholderData, error, data } = useQuery({
    queryFn: async () => await getProducts([], undefined),
    placeholderData: [],
  });

  const handleData = data ?? [];

  const options = [
    ...categories.map((c) => {
      return {
        category: ["Ver categoría:"],
        name: c,
        url: c,
      };
    }),
    ...handleData,
  ];

  const [input, setInput] = useState("");

  useEffect(() => {
    const handleEvent = () => {
      setWidth(document?.body.clientWidth);
    };

    handleEvent();

    window.addEventListener("resize", handleEvent);

    () => window.removeEventListener("resize", handleEvent);
  }, []);

  const CustomPopper = (props: any) => {
    return (
      <Popper
        {...props}
        style={{
          width:
            width < 1024 && width > 500
              ? "35vw"
              : width < 500
              ? "100vw"
              : "26vw",
          zIndex: width < 500 ? 100 : 10,
          position: "absolute",
        }}
        className={classes?.root}
        open={true}
        placement="bottom"
      />
    );
  };

  return (
    <div className="flex-col-center align-se items-align w-[22vw] hover:w-[55vw] focus:w-[55vw] sm:hover:w-[22vw]  static transition-[width] duration-150 lg:absolute lg:left-8">
      <Autocomplete
        className={classes.root}
        freeSolo={input.length > 0 ? false : true}
        noOptionsText={`Buscar: "${input}"`}
        options={options && input.length > 0 ? options : []}
        getOptionLabel={(o) =>
          typeof o === "string" ? o : `${o.category.join(" ")} ${o.name}`
        }
        renderInput={(props) => (
          <SearchInput
            props={props}
            input={input}
            setInput={setInput}
            width={width}
          />
        )}
        filterOptions={(options, { inputValue }) => {
          const input = inputValue.toLowerCase();
          return options.filter((o) => {
            if (
              !o.category.includes("Ver categoría:") &&
              (o.category.some((c) => c.toLowerCase().includes(input)) ||
                o.name.toLowerCase().includes(input))
            )
              return true;
            else if (
              o.category.includes("Ver categoría:") &&
              o.name.toLowerCase().includes(input)
            )
              return true;
            else return false;
          });
        }}
        value={input}
        onChange={(e, value) => {
          if (value && typeof value !== "string") {
            if (value.category.includes("Ver categoría:")) {
              setInput("");

              router.push(`${navigation.productos}?filter=${value.url}`);
            } else {
              setInput("");

              router.push(`productos/${value.url}`);
            }
          }
        }}
        autoComplete
        PopperComponent={CustomPopper}
      />
    </div>
  );
}
