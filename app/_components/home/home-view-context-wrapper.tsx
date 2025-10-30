// contexts/HomePageContext.tsx
"use client";

import { Breed } from "@/types/breeds";
import { createContext, useContext, ReactNode } from "react";

interface HomePageContextType {
  catBreeds: Breed[];
  dogBreeds: Breed[];
}

const HomePageContext = createContext<HomePageContextType | undefined>(
  undefined,
);

interface HomePageProviderProps {
  children: ReactNode;
  catBreeds: Breed[];
  dogBreeds: Breed[];
}

export function HomePageProvider({
  children,
  catBreeds,
  dogBreeds,
}: Readonly<HomePageProviderProps>) {
  return (
    <HomePageContext.Provider value={{ catBreeds, dogBreeds }}>
      {children}
    </HomePageContext.Provider>
  );
}

export function useHomeContext() {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useHomeContext must be used within HomePageProvider");
  }
  return context;
}
