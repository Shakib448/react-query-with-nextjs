import { useQuery, useQueryClient } from "react-query";

import { Layout } from "@Common";
import { Character } from "@Components";
import { fetchCharacter } from "@Apis-Random";

export default function Home({ character }) {
  const queryClient = useQueryClient();

  const characterData = useQuery("character", fetchCharacter, {
    initialData: () => queryClient.setQueryData("character", character),
  });

  return (
    <Layout title="Fetched Posts">
      <Character characterData={characterData} />
    </Layout>
  );
}

export async function getStaticProps() {
  const character = await fetchCharacter();
  return { props: { character } };
}
