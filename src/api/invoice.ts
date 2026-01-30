import api from "./axios";

/**
 * Invoice API helper methods.
 * These functions are small wrappers around the backend endpoints used by the POS UI.
 */

export const getInvoices = () => api.get("/pos/invoices");

export const createInvoice = (data: {
  customer_id: number;
  status?: string;
  previous_invoice_id?: number | null;
  paid_amount?: number;
  total_amount: number;
  discount_type?: string;
  discount_amount?: number;
  next_box_number?: number;
  created_user_id?: number;
}) => api.post("/pos/invoice", data);

export const addInvoiceItem = (
  invoiceId: number,
  data: {
    stock_id: number;
    quantity: number;
    selling_price?: number;
    discount_type?: string;
    discount_amount?: number;
  }
) => api.post(`/pos/invoice/${invoiceId}/item`, data);

/**
 * Update invoice status.
 * We keep it generic because different environments may use slightly different status strings.
 */
export const updateInvoiceStatus = (invoiceId: number, status: string) =>
  api.patch(`/pos/invoice/${invoiceId}`, { status });

/**
 * "Send to cashier" should keep the invoice in a recallable state.
 * We use PENDING instead of SENT.
 */
export const sendInvoice = (invoiceId: number) =>
  updateInvoiceStatus(invoiceId, "PENDING");

/**
 * Try to set a status, with fallbacks for environments that use different wording.
 */
export const safeUpdateInvoiceStatus = async (
  invoiceId: number,
  preferred: string,
  fallbacks: string[] = []
) => {
  try {
    return await updateInvoiceStatus(invoiceId, preferred);
  } catch (err) {
    for (const fb of fallbacks) {
      try {
        return await updateInvoiceStatus(invoiceId, fb);
      } catch {
        // keep trying fallbacks
      }
    }
    throw err;
  }
};

export const getInvoiceById = (id: number) => api.get(`/pos/invoice/${id}`);
