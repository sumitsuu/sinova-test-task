import { CatBreed } from "@/types/breeds";
import { Pagination } from "@/types/pagination";
import "dotenv/config";

type GetCatBreedsProps = {
  searchParams?: Pagination;
};

export async function getCatBreeds({
  searchParams,
}: Readonly<GetCatBreedsProps>): Promise<CatBreed[]> {
  if (!process.env.catsAPIKey)
    throw new Error("Please specify catsAPIKey env variable.");

  const parsedSearchParams = searchParams
    ? new URLSearchParams(
        Object.entries(searchParams)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      )
    : "";

  const url = searchParams?.q
    ? ` https://api.thecatapi.com/v1/breeds/search/`
    : ` https://api.thecatapi.com/v1/breeds`;

  const res = await fetch(`${url}?${parsedSearchParams.toString()}`, {
    headers: {
      "x-apy-key": process.env.catsAPIKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch breeds");
  }

  return res.json();
}
