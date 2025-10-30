// contexts/HomePageContext.tsx
"use client";

import { Breed } from '@/types/cats'
import { createContext, useContext, ReactNode } from "react";

interface HomePageContextType {
  catBreeds: Breed[];
}

const HomePageContext = createContext<HomePageContextType | undefined>(
  undefined,
);

interface HomePageProviderProps {
  children: ReactNode;
  catBreeds: Breed[];
}

export function HomePageProvider({
  children,
  catBreeds,
}: Readonly<HomePageProviderProps>) {
  return (
    <HomePageContext.Provider value={{ catBreeds }}>
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
