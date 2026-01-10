// src/api/items.ts
import api from "./axios";

export const getItems = (name?: string) => {
  return api.get("/store/items", { params: { name } });
};
