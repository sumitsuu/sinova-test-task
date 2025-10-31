import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Breed } from "@/types/breeds";
import Image from "next/image";

type HomeAnimalCardProps = {
  breed: Breed;
  type: "cat" | "dog";
};

export default function HomeAnimalCard({
  breed,
  type,
}: Readonly<HomeAnimalCardProps>) {
  const imageUrl =
    type === "cat"
      ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
      : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;

  return (
    <Card className="w-full md:max-w-[200px] h-[300px] opacity-75 hover:opacity-100 duration-350">
      <CardHeader className="px-4">
        <div className="relative h-[150px] w-full overflow-hidden rounded-t-lg">
          <Image
            alt={breed.name}
            fill
            sizes="200px"
            src={imageUrl}
            className="object-cover"
            loading="lazy"
            quality={75}
          />
        </div>
      </CardHeader>
      <CardContent className="font-semibold text-foreground">
        {breed.name}
      </CardContent>
    </Card>
  );
}
