import axios from "axios";

export const getHeroImages = async () => {
  const response = await axios.get("/api/images/hero");
  return response.data;
};

export const postHeroImages = async (formData) => {
  const response = await axios.post("/api/images/hero", formData);
  return response.data;
};

export const deleteHeroImages = async (formData) => {
  const response = await axios.delete(`/api/images/hero/${formData.id}`);
  return response.data;
};
