"use client";
import { useHomeContext } from "./home-view-context-wrapper";
import HomeAnimalCard from "./home-animal-card";
import { ReactNode } from "react";
import Link from "next/link";

const List = ({ children }: { children: ReactNode }) => {
  return <ul className="grid grid-cols-10 gap-4">{children}</ul>;
};

export default function HomeView() {
  const { catBreeds, dogBreeds } = useHomeContext();
  return (
    <div className="p-4 flex flex-col gap-4">
      <h2>Cats</h2>
      <List>
        {catBreeds.map((breed) => (
          <Link key={breed.id} href={`/animals/${breed.id}`}>
            <li>
              <HomeAnimalCard type="cat" breed={breed} />
            </li>
          </Link>
        ))}
      </List>

      <h2>Dogs</h2>
      <List>
        {dogBreeds.map((breed) => (
          <Link key={breed.id} href={`/animals/${breed.id}`}>
            <li>
              <HomeAnimalCard type="dog" breed={breed} />
            </li>
          </Link>
        ))}
      </List>
    </div>
  );
}
