import { Metadata } from "next";
import HomeView from "./_components/home/home-view";
import { getCatBreeds } from "../lib/api/cats/get-cat-breeds";
import { SearchParams } from "next/dist/server/request/search-params";
import { PaginationSchema } from "@/types/pagination";
import { HomePageProvider } from "./_components/home/home-view-context-wrapper";
import { getDogBreeds } from "@/lib/api/dogs/get-dog-breeds";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export const metadata: Metadata = {
  title: "Breed Sinova App | Home",
  description:
    "Breeding management webapp for livestock producers. Track genetics, analyze data, and optimize performance.",
};

export default async function HomePage({
  searchParams,
}: Readonly<HomePageProps>) {
  const validatedSearchParams = PaginationSchema.parse(await searchParams);
  const catBreeds = await getCatBreeds({
    searchParams: validatedSearchParams,
  });
  const dogBreeds = await getDogBreeds({
    searchParams: validatedSearchParams,
  });

  return (
    <HomePageProvider catBreeds={catBreeds} dogBreeds={dogBreeds}>
      <HomeView />
    </HomePageProvider>
  );
}
