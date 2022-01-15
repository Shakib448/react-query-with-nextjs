import React from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Cards, Layout } from "@Common";
import { getSingleCharacter } from "@Apis-Random";
import { useRouter } from "next/router";

const Single = () => {
  const {
    query: { id },
    back,
  } = useRouter();

  const { data, isLoading } = useQuery(["single-character", id], () =>
    getSingleCharacter(id)
  );

  return (
    <Layout title="Single Character">
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <div className="flex justify-center">
            <Cards item={data} />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={() => back()}
            >
              Go Back
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default Single;

export async function getServerSideProps({ params: { id } }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["single-character", id], () =>
    getSingleCharacter(id)
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
