"use client";
import { useState } from "react";
import { getProducts } from "../../sanity/sanity-utils";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Autocomplete, Popper } from "@mui/material";
import SearchInput from "./SearchInput";
import { makeStyles, createStyles } from "@mui/styles";
import { useRouter } from "next/navigation";
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
      background: "rgb(15,15,15)",
      color: "#ffff",
      textTransform: "capitalize",
      padding: 25,
      borderRadius: 0,
      // minHeight: "97vh",
      "& li": {
        borderBottom: "2px solid #9ca3af66",
        margin: "10px 0",
        padding: "8px 0",
        "&:hover": {
          borderBottom: "2px solid #ffff",
          transition: "border 0.2s linear",
        },
      },
    },
    "& .MuiAutocomplete-noOptions": {
      background: "rgb(15,15,15)",
      color: "#ffff",
      textTransform: "capitalize",
      padding: 25,
      // borderRadius: 0,
      minHeight: 290,
    },
    "& .MuiAutocomplete-paper": {
      borderRadius: 3,
      left: 0,
      position: "absolute",
      width: "23vw",
    },
  },
}));

const CustomPopper = (props: any) => {
  const classes = useStyles();
  return (
    <Popper
      {...props}
      style={{
        width: "35vw",
        // width: "25vw",
        zIndex: 10,
        position: "absolute",
      }}
      className={classes.root}
      open={true}
      placement="bottom"
    />
  );
};

function Content() {
  const router = useRouter();

  const { isPlaceholderData, error, data } = useQuery({
    queryFn: getProducts,
    placeholderData: [],
  });

  const options = [
    {
      // ahora es hardcodeado pero deberia llamar a las categorias y ahi mapearlas
      type: "Ver categoría:",
      category: "Ver categoría:",
      name: "mesas",
      URL: "mesa",
    },
    {
      type: "Ver categoría:",
      category: "Ver categoría:",
      name: "sillones",
      URL: "sillón",
    },
    {
      type: "Ver categoría:",
      category: "Ver categoría:",
      name: "sillas",
      URL: "silla",
    },
    {
      type: "Ver categoría:",
      category: "Ver categoría:",
      name: "puffs",
      URL: "puff",
    },
    {
      type: "Ver categoría:",
      category: "Ver categoría:",
      name: "sofás",
      URL: "sofá",
    },
    ...data.map((p) => {
      return { ...p, type: "producto" };
    }),
  ];

  const [input, setInput] = useState("");

  return (
    <div className="flex-col-center align-se items-align w-[22vw] lg:hover:w-[22vw] static transition-[width] duration-150 lg:absolute lg:left-8">
      <Autocomplete
        freeSolo={input.length > 0 ? false : true}
        noOptionsText={`No hay resultados para "${input}"`}
        options={options && input.length > 0 ? options : []}
        getOptionLabel={(o) =>
          typeof o === "string" ? o : `${o.category} ${o.name}`
        }
        renderInput={(props) => (
          <SearchInput props={props} input={input} setInput={setInput} />
        )}
        value={input}
        onChange={(e, value) => {
          if (value && typeof value !== "string") {
            if (value.category === "Ver categoría:") {
              setInput("");

              router.push(`/productos?filter=${value.URL}`);
            } else {
              setInput("");

              router.push(`productos/${value.URL}`);
            }
          }
        }}
        autoComplete
        PopperComponent={CustomPopper}
      />
    </div>
  );
}
