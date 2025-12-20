import api from "./axios";

export const createInvoice = (data: {
  customerId: number;
  cashierId: number;
  boxQuantity: number;
}) => api.post("/invoice/create", data);

export const addInvoiceItem = (
  invoiceId: number,
  data: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }
) => api.post(`/invoice/${invoiceId}/add-item`, data);

export const sendInvoice = (invoiceId: number) =>
  api.post(`/invoice/${invoiceId}/send`);
