import { Metadata } from "next";
import HomeView from "./_components/home/home-view";
import { getCatBreeds } from "../lib/api/get-cat-breeds";
import { SearchParams } from "next/dist/server/request/search-params";
import { PaginationSchema } from "@/types/pagination";
import { HomePageProvider } from "./_components/home/home-view-context-wrapper";

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
  const validatedSearchParams = PaginationSchema.parse(searchParams);
  const catBreeds = await getCatBreeds({
    searchParams: validatedSearchParams,
  });

  return (
    <HomePageProvider catBreeds={catBreeds}>
      <HomeView />
    </HomePageProvider>
  );
}
