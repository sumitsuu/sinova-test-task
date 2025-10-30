"use client";
import { useHomeContext } from "./home-view-context-wrapper";

export default function HomeView() {
  const { catBreeds } = useHomeContext();
  return (
    <div>
      <ul>
        {catBreeds.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
