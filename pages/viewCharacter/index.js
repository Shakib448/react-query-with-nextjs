import React from "react";
import { useRouter } from "next/router";

import useStore from "@Store";
import { Cards, Layout } from "@Common";

const ViewCharacter = () => {
  const character = useStore((state) => state.character);

  const router = useRouter();

  if (character.length === 0) {
    router.push("/");
  }

  return (
    <Layout title="View Character">
      <div className="flex mt-3 justify-center ">
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Total item added : {character.length}
        </button>
      </div>
      <div className="flex flex-row flex-wrap justify-center">
        {character.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </Layout>
  );
};

export default ViewCharacter;
