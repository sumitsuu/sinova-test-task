"use client";
import { useHomeContext } from "./home-view-context-wrapper";
import HomeAnimalCard from "./home-animal-card";
import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";
import { Input } from "@/components/ui/input";
import debounce from "lodash.debounce";
import { RefreshCcwIcon } from "lucide-react";

const List = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="grid xl:grid-cols-8 lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4 md:justify-items-start justify-items-center">
      {children}
    </ul>
  );
};

export default function HomeView() {
  const { catBreeds, dogBreeds } = useHomeContext();
  const searchParams = useUrlSearchParams();
  const [searchValue, setSearchValue] = useState("");

  const handlePrevPage = () => {
    const currentPage = Number(searchParams.get("page"));
    if (currentPage >= 0 && currentPage - 1 >= 0) {
      searchParams.setParam("page", currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const currentPage = Number(searchParams.get("page"));
    if (currentPage >= 0 && (catBreeds.length > 0 || dogBreeds.length > 0)) {
      searchParams.setParam("page", currentPage + 1);
    }
  };

  const debouncedSearch = useRef(
    debounce((value: string) => {
      searchParams.setParam("q", value);
    }, 1000),
  ).current;

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleClearAll = () => {
    setSearchValue("");
    searchParams.clearAll();
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between md:flex-row flex-col gap-4 md:gap-0">
        <div className="flex items-center justify-center md:justify-start gap-4 w-full md:max-w-[50%]">
          <Input
            value={searchValue}
            onInput={(e) => handleSearchChange(e.currentTarget.value)}
            className="w-full md:max-w-[400px] max-w-max"
            placeholder="Search for a breed..."
          />
          <RefreshCcwIcon onClick={handleClearAll} className="cursor-pointer" />
        </div>
        <div>
          <Pagination>
            <PaginationPrevious onClick={handlePrevPage} />
            <PaginationNext onClick={handleNextPage} />
          </Pagination>
        </div>
      </div>
      <div>
        <h2>Cats</h2>
        <List>
          {catBreeds.length > 0 ? (
            catBreeds.map((breed) => (
              <Link
                className="w-full"
                key={breed.id}
                href={`/breeds/cat/${breed.id}`}
              >
                <li className="w-full">
                  <HomeAnimalCard type="cat" breed={breed} />
                </li>
              </Link>
            ))
          ) : (
            <li>No cats found</li>
          )}
        </List>

        <h2>Dogs</h2>
        <List>
          {dogBreeds.length > 0 ? (
            dogBreeds.map((breed) => (
              <Link
                className="w-full"
                key={breed.id}
                href={`/breeds/dog/${breed.id}`}
              >
                <li className="w-full">
                  <HomeAnimalCard type="dog" breed={breed} />
                </li>
              </Link>
            ))
          ) : (
            <li>No dogs found</li>
          )}
        </List>
      </div>
    </div>
  );
}
