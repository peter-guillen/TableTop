import { useGetAllCharactersQuery } from "../api/characterApi.tsx";

export const CharacterList = () => {
  const { data: characters, isLoading, isError } = useGetAllCharactersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;
  console.log(characters);
  return (
    <div>
      CharacterList<div>{characters?.map((c) => c.identity.name)}</div>
    </div>
  );
};
