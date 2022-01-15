import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useRouter } from "next/router";

import { fetchPaginate } from "@Apis-Random";
import { Cards, Layout } from "@Common";

const Paginate = () => {
  const router = useRouter();
  const [page, setPage] = useState(+router.query.page || 1);

  const { data } = useQuery(
    ["characters", page],
    async () => fetchPaginate(page),
    {
      keepPreviousData: true,
    }
  );

  function handlePaginationChange(value) {
    setPage(value);
    router.push(`/paginate/?page=${value}`, undefined, { shallow: true });
  }

  return (
    <Layout title="Paginate Page">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        onClick={() => router.push("/")}
      >
        Go Back
      </button>
      <div className="flex justify-center">
        <nav aria-label="Page navigation">
          <ul className="inline-flex">
            <li>
              <button
                disabled={page <= 1}
                onClick={() => handlePaginationChange(page - 1)}
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100 ${
                  page <= 1 && "cursor-not-allowed"
                }`}
              >
                Prev
              </button>

              <button
                onClick={() => handlePaginationChange(1)}
                className="h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100"
              >
                {page}
              </button>
              <button
                onClick={() => handlePaginationChange(page + 1)}
                disabled={page >= data?.info.pages}
                className={`h-10 px-5 text-indigo-600 transition-colors duration-150 focus:shadow-outline hover:bg-indigo-100 ${
                  page >= data?.info.pages && "cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {data?.results.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
};

export default Paginate;

export async function getServerSideProps({ query }) {
  let page = 1;
  if (query.page) {
    page = +query.page;
  }

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["character", page], async () =>
    fetchPaginate(page)
  );

  return { props: { dehydratedState: dehydrate(queryClient) } };
}
