import api from "./axios";


export const getInvoices = () => api.get("/pos/invoices"); // no extra /api here
export const createInvoice = (data: {
  customerId: number;
  cashierId: number;
  boxQuantity: number;
}) => api.post("/pos/invoice/create", data);

export const addInvoiceItem = (
  invoiceId: number,
  data: {
    productId: number;
    quantity: number;
    unitPrice: number;
  }
) => api.post(`/pos/invoice/${invoiceId}/add-item`, data);

export const sendInvoice = (invoiceId: number) =>
  api.post(`/pos/invoice/${invoiceId}/send`);
