"use client";

import { useSearch } from "@/context/SearchContext";
import { debounce } from "lodash";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SearchBox: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setSearchText } = useSearch();
  const [inputText, setInputText] = useState<string>("");

  const debouncedSearch = debounce((value: string) => {
    setSearchText(value);
  }, 500);

  useEffect(() => {
    debouncedSearch(inputText);

    return () => debouncedSearch.cancel();
  }, [inputText, debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputText(e.target.value);
    const currentPath = pathname;
    if (currentPath !== "/") {
      router.push(`/`);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <input
          value={inputText}
          onChange={handleChange}
          className="p-4 w-full border border-gray-300 rounded-md focus:outline-none"
          placeholder="search by movie title"
        />
      </div>
    </section>
  );
};

export default SearchBox;
