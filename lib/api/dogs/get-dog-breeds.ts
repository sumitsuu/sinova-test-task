import { Breed } from "@/types/breeds";
import { Pagination } from "@/types/pagination";
import "dotenv/config";

type GetDogBreedsProps = {
  searchParams: Pagination;
};

export async function getDogBreeds({
  searchParams,
}: Readonly<GetDogBreedsProps>): Promise<Breed[]> {
  if (!process.env.dogsAPIKey)
    throw new Error("Please specify dogsAPIKey env variable.");

  const parsedSearchParams = new URLSearchParams(
    Object.entries(searchParams)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]),
  );

  const res = await fetch(
    `https://api.thedogapi.com/v1/breeds?${parsedSearchParams.toString()}`,
    {
      headers: {
        "x-apy-key": process.env.dogsAPIKey,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch breeds");
  }

  return res.json();
}
