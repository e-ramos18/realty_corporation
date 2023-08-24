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

export const getCondominiums = async () => {
  const response = await axios.get("/api/condominiums");
  return response.data;
};

export const getAllCondominiums = async () => {
  const response = await axios.get("/api/condominiums/all");
  return response.data;
};

export const getCondominium = async (id) => {
  const response = await axios.get(`/api/condominiums/${id}`);
  return response.data;
};

export const postCondominiums = async (formData) => {
  const response = await axios.post("/api/condominiums", formData);
  return response.data;
};

export const patchCondominiums = async (id, formData) => {
  const response = await axios.patch(`/api/condominiums/step1/${id}`, formData);
  return response.data;
};

export const patchCondominiumsStep2 = async (id, formData) => {
  const response = await axios.patch(`/api/condominiums/step2/${id}`, formData);
  return response.data;
};

export const patchCondominiumsStep3 = async (id, formData) => {
  const response = await axios.patch(`/api/condominiums/step3/${id}`, formData);
  return response.data;
};

export const patchCondominiumsStep4 = async (id, formData) => {
  const response = await axios.patch(`/api/condominiums/step4/${id}`, formData);
  return response.data;
};
