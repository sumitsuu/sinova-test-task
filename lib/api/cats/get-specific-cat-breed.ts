import { CatBreed } from "@/types/breeds";
import "dotenv/config";

type GetSpecificCatBreed = {
  breedId: string;
};

export async function getSpecificCatBreed({
  breedId,
}: Readonly<GetSpecificCatBreed>): Promise<CatBreed> {
  if (!process.env.catsAPIKey)
    throw new Error("Please specify catsAPIKey env variable.");

  const res = await fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`, {
    headers: {
      "x-apy-key": process.env.catsAPIKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cat specific breed");
  }

  return res.json();
}
