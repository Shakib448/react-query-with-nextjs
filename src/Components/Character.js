import React from "react";

import { Cards } from "@Common";
import { useRouter } from "next/router";

const Posts = ({ characterData }) => {
  const router = useRouter();

  return (
    <>
      {characterData.isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            onClick={() => router.back()}
          >
            Go Back
          </button>
          <div className="flex flex-row flex-wrap justify-center">
            {characterData?.data.results.map((item) => (
              <Cards key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Posts;
