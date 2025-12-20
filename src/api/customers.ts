import api from "./axios";

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export interface CreateCustomerPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  description?: string;
}

export const createCustomer = (data: CreateCustomerPayload) =>
  api.post("/customers", data);

export const getCustomers = (
  search = "",
  page = 1,
  limit = 10
) =>
  api.get("/customers", {
    params: {
      page,
      limit,
      search: search || undefined, // prevents ?search=
    },
  });

