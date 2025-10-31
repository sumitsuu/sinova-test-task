import { Breed, DogBreed } from "@/types/breeds";
import "dotenv/config";

type GetSpecificDogBreed = {
  breedId: string;
};

export async function getSpecificDogBreed({
  breedId,
}: Readonly<GetSpecificDogBreed>): Promise<DogBreed> {
  if (!process.env.dogsAPIKey)
    throw new Error("Please specify dogsAPIKey env variable.");

  const res = await fetch(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
    headers: {
      "x-apy-key": process.env.dogsAPIKey,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dog specific breed");
  }

  return res.json();
}
