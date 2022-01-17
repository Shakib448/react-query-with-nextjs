import Link from "next/link";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

import { Layout } from "@Common";
import { fetchCharacter } from "@Apis-Random";

export default function Home() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchData = async () => {
      await queryClient.prefetchQuery("character", fetchCharacter);
    };
    prefetchData();
  }, [queryClient]);

  return (
    <Layout title="Home Page">
      <ul className="mx-4 flex justify-center items-center h-screen">
        {router.map(({ routName, routePath }, i) => (
          <Link href={routePath} passHref key={i}>
            <li className="flex-1 mr-2 cursor-pointer">
              <a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">
                {routName}
              </a>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  );
}

const router = [
  { routName: "Simple Fetched ", routePath: "/fetch" },
  { routName: "Pagination", routePath: "/paginate" },
  { routName: "Infinite Scroll", routePath: "/infinite" },
  { routName: "Mutation", routePath: "/mutation" },
];
