"use client";
import { useHomeContext } from "./home-view-context-wrapper";
import HomeAnimalCard from "./home-animal-card";
import { ReactNode } from "react";
import Link from "next/link";
import {
  Pagination,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useUrlSearchParams } from "@/hooks/use-url-search-params";

const List = ({ children }: { children: ReactNode }) => {
  return <ul className="grid grid-cols-10 gap-4">{children}</ul>;
};

export default function HomeView() {
  const { catBreeds, dogBreeds } = useHomeContext();
  const searchParams = useUrlSearchParams();

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
  return (
    <div className="p-4 flex flex-col gap-4">
      <Pagination>
        <PaginationPrevious onClick={handlePrevPage} />
        <PaginationNext onClick={handleNextPage} />
      </Pagination>
      <div>
        <h2>Cats</h2>
        <List>
          {catBreeds.length > 0 ? (
            catBreeds.map((breed) => (
              <Link key={breed.id} href={`/breeds/cat/${breed.id}`}>
                <li>
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
              <Link key={breed.id} href={`/breeds/dog/${breed.id}`}>
                <li>
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
