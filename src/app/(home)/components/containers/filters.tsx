"use client";

import Search from "@/components/search/search";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { QUERY_NAME, QUERY_STATUS } from "./containers";
import { Select, SelectItem } from "@nextui-org/react";

export default function ContainerFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleStatus = (status: string) => {
    const params = new URLSearchParams(searchParams);

    if (status !== "running") {
      params.set(QUERY_STATUS, status);
    } else {
      params.delete(QUERY_STATUS);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section className="mt-4 flex flex-row gap-2">
      <Search queryName={QUERY_NAME} className="min-h-14" />
      <Select
        isRequired
        label="Filter by status"
        placeholder="Select an animal"
        defaultSelectedKeys={[
          searchParams.get(QUERY_STATUS) || "running",
        ]}
        className="max-w-xs"
        onChange={(e) => handleStatus(e.target.value)}
      >
        <SelectItem key="all">All</SelectItem>
        <SelectItem key="running">Running</SelectItem>
        <SelectItem key="exited">Exited</SelectItem>
      </Select>
    </section>
  );
}
