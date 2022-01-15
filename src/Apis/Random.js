import Axios from "./Axios.config";

export const fetchCharacter = async () => {
  const { data } = await Axios.get("/character");
  return data;
};

export const fetchPaginate = async (page) => {
  const { data } = await Axios.get(`/character/?page=${page}`);
  return data;
};

export const getSingleCharacter = async (id) => {
  const { data } = await Axios.get(`/character/${id}`);
  return data;
};
