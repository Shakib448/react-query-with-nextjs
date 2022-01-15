import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";
import { Link, Element } from "react-scroll";

import { fetchPaginate } from "@Apis-Random";
import { Cards, Layout } from "@Common";

const Infinite = () => {
  const router = useRouter();

  const { data, status, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "infiniteCharacters",
    async ({ pageParam = 1 }) => fetchPaginate(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.info.next) {
          return pages.length + 1;
        }
      },
    }
  );

  return (
    <Layout title="Infinite Page">
      {status === "success" && (
        <div className="relative">
          <Element name="top">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={() => router.push("/")}
            >
              Go Back
            </button>
          </Element>

          <Link to="top" spy={true} smooth={true} duration={500}>
            <button className="fixed m-8 bottom-0 left-100 right-0 z-50 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Go Top
            </button>
          </Link>

          <InfiniteScroll
            dataLength={data?.pages.length * 20}
            next={fetchNextPage}
            hasMore={hasNextPage}
            loader={<h4>Loading...</h4>}
          >
            <div className="flex flex-row flex-wrap justify-center">
              {data?.pages.map((page) => (
                <>
                  {page?.results.map((item) => (
                    <Cards key={item.id} item={item} />
                  ))}
                </>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}
    </Layout>
  );
};

export default Infinite;
