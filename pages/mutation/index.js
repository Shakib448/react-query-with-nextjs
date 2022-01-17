import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient, useQuery } from "react-query";

import { Layout } from "@Common";

const Mutation = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const name = useQuery("name", async () => {
    const { data } = await axios.get("/api/add-name");
    return data;
  });

  const mutation = useMutation(
    (name) => {
      return axios.post("/api/add-name", { name: name });
    },
    {
      onMutate: async (name) => {
        await queryClient.cancelQueries("name");
        const getName = queryClient.getQueryData("name");

        queryClient.setQueryData("name", (old) => ({
          ...old,
          items: [...old.items, name],
        }));
        return getName;
      },
      onError: (err, variables, getName) => {
        queryClient.setQueriesData("name", getName);
      },
      onSettled: () => {
        queryClient.invalidateQueries("name");
      },
    }
  );

  const onSubmit = async ({ name }) => {
    try {
      await mutation.mutateAsync(name);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title="Mutation Page">
      <div className="mx-4 flex justify-center items-center h-screen">
        <div className="flex flex-col">
          <div className="flex justify-center m-4">
            <h1>Hey if you use (Bad Word) it will show an error</h1>
          </div>
          <div className="flex justify-center m-3">
            <ul className="list-disc">
              {name?.data?.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="w-full max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-4">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Name..."
                  {...register("name", { required: true })}
                />
              </div>

              <div className="flex items-center justify-center">
                {mutation.isLoading ? (
                  <h1>Loading...</h1>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Add Name
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Mutation;
