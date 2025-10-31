import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { getSpecificCatBreed } from "@/lib/api/cats/get-specific-cat-breed";
import { getSpecificDogBreed } from "@/lib/api/dogs/get-specific-dog-breed";
import { isCatBreed, isDogBreed } from "@/types/breeds";
import { ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type BreedPageProps = {
  params: Promise<{ type: "cat" | "dog"; id: string }>;
};

export default async function BreedPage({ params }: Readonly<BreedPageProps>) {
  const { type, id } = await params;
  const breed =
    type === "cat"
      ? await getSpecificCatBreed({ breedId: id })
      : await getSpecificDogBreed({ breedId: id });

  const temperamentTags = breed.temperament?.split(", ").filter(Boolean) || [];

  const stats = isCatBreed(breed)
    ? [
        { label: "Adaptability", value: breed.adaptability },
        { label: "Affection Level", value: breed.affection_level },
        { label: "Child Friendly", value: breed.child_friendly },
        { label: "Dog Friendly", value: breed.dog_friendly },
        { label: "Energy Level", value: breed.energy_level },
        { label: "Grooming", value: breed.grooming },
        { label: "Health Issues", value: breed.health_issues },
        { label: "Intelligence", value: breed.intelligence },
        { label: "Shedding Level", value: breed.shedding_level },
        { label: "Social Needs", value: breed.social_needs },
        { label: "Stranger Friendly", value: breed.stranger_friendly },
        { label: "Vocalization", value: breed.vocalisation },
      ].filter((stat) => stat.value !== undefined && stat.value !== null)
    : [];

  const imageUrl =
    type === "cat"
      ? `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`
      : `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;

  const externalLinks = [
    isCatBreed(breed) ? { url: breed.wikipedia_url, label: "Wikipedia" } : null,
    isCatBreed(breed) ? { url: breed.cfa_url, label: "CFA" } : null,
    isCatBreed(breed) ? { url: breed.vetstreet_url, label: "VetStreet" } : null,
    isCatBreed(breed)
      ? { url: breed.vcahospitals_url, label: "VCA Hospitals" }
      : null,
  ].filter(
    (link): link is { url: string; label: string } =>
      link !== null && !!link.url,
  );

  const hasDogSpecificInfo =
    isDogBreed(breed) && (breed.bred_for || breed.breed_group || breed.height);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumbs */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{breed.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{breed.name}</h1>
        {(breed.origin || breed.life_span) && (
          <p className="text-muted-foreground text-lg">
            {breed.origin}
            {breed.origin && breed.life_span && " • "}
            {breed.life_span}
          </p>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Image Card */}
        {breed.reference_image_id && (
          <Card className="overflow-hidden">
            <div className="relative aspect-square w-full">
              <Image
                src={imageUrl}
                alt={breed.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Card>
        )}

        {/* Info Cards */}
        <div className="space-y-6">
          {/* Description */}
          {isCatBreed(breed) && breed.description && (
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {breed.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Dog-Specific Info */}
          {isDogBreed(breed) && hasDogSpecificInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Breed Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {breed.breed_group && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Breed Group</span>
                      <span className="font-medium">{breed.breed_group}</span>
                    </div>
                    <Separator />
                  </>
                )}
                {breed.bred_for && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Bred For</span>
                      <span className="font-medium text-right">
                        {breed.bred_for}
                      </span>
                    </div>
                    {breed.height && <Separator />}
                  </>
                )}
                {breed.height?.imperial && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Height</span>
                    <span className="font-medium">
                      {breed.height.imperial} inches
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {breed.weight?.imperial && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Weight</span>
                    <span className="font-medium">
                      {breed.weight.imperial} lbs
                    </span>
                  </div>
                  <Separator />
                </>
              )}
              {breed.life_span && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Life Span</span>
                    <span className="font-medium">{breed.life_span}</span>
                  </div>
                  <Separator />
                </>
              )}
              {breed.origin && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Origin</span>
                    <span className="font-medium">{breed.origin}</span>
                  </div>
                  {isCatBreed(breed) &&
                    (breed.indoor !== undefined ||
                      breed.lap !== undefined ||
                      breed.hypoallergenic !== undefined) && <Separator />}
                </>
              )}
              {/* Cat-specific fields */}
              {isCatBreed(breed) && breed.indoor !== undefined && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Indoor Cat</span>
                    <Badge variant={breed.indoor ? "default" : "secondary"}>
                      {breed.indoor ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <Separator />
                </>
              )}
              {isCatBreed(breed) && breed.lap !== undefined && (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lap Cat</span>
                    <Badge variant={breed.lap ? "default" : "secondary"}>
                      {breed.lap ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <Separator />
                </>
              )}
              {isCatBreed(breed) && breed.hypoallergenic !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Hypoallergenic</span>
                  <Badge
                    variant={breed.hypoallergenic ? "default" : "secondary"}
                  >
                    {breed.hypoallergenic ? "Yes" : "No"}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Temperament */}
          {temperamentTags.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Temperament</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {temperamentTags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Characteristics - Only for cats */}
      {stats.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Characteristics</CardTitle>
            <CardDescription>Rated on a scale from 1 to 5</CardDescription>
          </CardHeader>

          {stats.length > 0 && (
            <CardContent>
              {" "}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat) => {
                  if (!stat.value) return;
                  return (
                    <div key={stat.label} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {stat.label}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {stat.value}/5
                        </span>
                      </div>
                      <Progress
                        value={(stat.value / 5) * 100}
                        className="h-2"
                      />
                    </div>
                  );
                })}
              </div>{" "}
            </CardContent>
          )}
        </Card>
      )}

      {/* External Links */}
      {externalLinks.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {externalLinks.map((link) => (
            <Button key={link.label} variant="outline" asChild>
              <Link href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label}
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
