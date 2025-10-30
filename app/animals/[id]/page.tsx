type AnimalPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AnimalPage({
  params,
}: Readonly<AnimalPageProps>) {
  const { id } = await params;

  return <div>Animal ID: {id}</div>;
}
