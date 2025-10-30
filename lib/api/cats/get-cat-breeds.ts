import { Breed } from "@/types/breeds";
import { Pagination } from "@/types/pagination";
import "dotenv/config";

type GetCatBreedsProps = {
  searchParams: Pagination;
};

export async function getCatBreeds({
  searchParams,
}: Readonly<GetCatBreedsProps>): Promise<Breed[]> {
  if (!process.env.catsAPIKey)
    throw new Error("Please specify catsAPIKey env variable.");

  const parsedSearchParams = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]),
  );

  const res = await fetch(
    `https://api.thecatapi.com/v1/breeds?${parsedSearchParams.toString()}`,
    {
      headers: {
        "x-apy-key": process.env.catsAPIKey,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch breeds");
  }

  return res.json();
}
