import { DogBreed } from "@/types/breeds";
import { Pagination } from "@/types/pagination";
import "dotenv/config";

type GetDogBreedsProps = {
  searchParams?: Pagination;
};

export async function getDogBreeds({
  searchParams,
}: Readonly<GetDogBreedsProps>): Promise<DogBreed[]> {
  if (!process.env.dogsAPIKey)
    throw new Error("Please specify dogsAPIKey env variable.");

  const parsedSearchParams = searchParams
    ? new URLSearchParams(
        Object.entries(searchParams)
          .filter(([_, value]) => value !== undefined && value !== null)
          .map(([key, value]) => [key, String(value)]),
      )
    : "";

  const url = searchParams?.q
    ? `https://api.thedogapi.com/v1/breeds/search/`
    : `https://api.thedogapi.com/v1/breeds`;

  const res = await fetch(`${url}?${parsedSearchParams.toString()}`, {
    headers: {
      "x-apy-key": process.env.dogsAPIKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch breeds");
  }

  return res.json();
}
