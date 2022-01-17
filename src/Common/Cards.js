import React from "react";
import Link from "next/link";
import useStore from "@Store";

const Cards = ({ item }) => {
  const character = useStore((state) => state.character);
  const disableBtn = character.find((p) => p.id === item.id);
  const dispatch = useStore((state) => state.dispatch);

  return (
    <div className="w-2/5 flex-none m-8 max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
      <img className="w-full" src={item.image} alt={item.name} loading="lazy" />
      <div className="px-6 py-4">
        <Link href={`/single/${item.id}`} passHref>
          <div className="font-bold text-xl mb-2 text-center hover:underline">
            {item.name}
          </div>
        </Link>
        <p className="text-gray-700 text-center">
          Id: {item.id} <br />
          Name: {item.name} <br />
          Lives in: {item.location.name} <br />
          Species: {item.species}
        </p>
      </div>
      <div className="flex justify-center">
        {!disableBtn ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
            onClick={() => dispatch({ type: "add/character", payload: item })}
          >
            Add
          </button>
        ) : (
          <div className="flex flex-row">
            <Link href="/ViewCharacter" passHref>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
                View Character
              </button>
            </Link>
            <button
              className="bg-red-500 hover:bg-base-700 text-white font-bold py-2 px-4 rounded m-4"
              onClick={() =>
                dispatch({ type: "remove/character", payload: item })
              }
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cards;
