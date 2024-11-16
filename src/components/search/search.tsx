"use client";

import { Input } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "../ui/icons/SearchIcon";

interface SearchProps {
  className?: string;
  placeholder?: string;
  queryName?: string;
  page?: number;
}

export default function Search({
  className = "",
  placeholder = "Type to search...",
  queryName = "search",
  page,
}: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set(queryName, term);
    } else {
      params.delete(queryName);
    }

    if (page) params.set("page", "1");

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Input
      classNames={{
        base: `max-w-full h-10 ${className}`,
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper:
          "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
      }}
      placeholder={placeholder}
      size="sm"
      startContent={<SearchIcon size={18} />}
      type="search"
      onChange={(e) => handleSearch(e.target.value)}
      onClear={() => handleSearch("")}
      defaultValue={searchParams.get(queryName) || ""}
    />
  );
}
