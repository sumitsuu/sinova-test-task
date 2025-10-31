export type Weight = {
  imperial: string;
  metric: string;
};

export type Height = {
  imperial: string;
  metric: string;
};

type BaseBreed = {
  weight: Weight;
  id: string | number;
  name: string;
  temperament?: string;
  life_span?: string;
  reference_image_id?: string;
};

export type CatBreed = BaseBreed & {
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  origin?: string;
  country_codes?: string;
  country_code?: string;
  description?: string;
  indoor?: number;
  lap?: number;
  alt_names?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  hypoallergenic?: number;
};

export type DogBreed = BaseBreed & {
  height?: Height;
  bred_for?: string;
  breed_group?: string;
  origin?: string;
};

export type Breed = CatBreed | DogBreed;

export function isCatBreed(breed: Breed): breed is CatBreed {
  return "cfa_url" in breed || "indoor" in breed || "lap" in breed;
}

export function isDogBreed(breed: Breed): breed is DogBreed {
  return "bred_for" in breed || "breed_group" in breed || "height" in breed;
}
