export const createQRPaymentObject = (orderData, basketItems = [], metadata = {}) => {
  return {
    reference_id: orderData.reference_id, // Required
    type: "DYNAMIC", // Set to DYNAMIC for one-time use
    currency: "IDR", // Set currency to IDR (Indonesian Rupiah)
    amount: orderData.amount, // Amount for the transaction
    channel_code: "ID_DANA", // Default channel set to ID_DANA
    expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    // Expiry set to 48 hours from now

    basket: basketItems.map((item) => ({
      reference_id: item.reference_id||"",
      name: item.name,
      category: item.category||'',
      currency: "IDR", // Default currency to IDR if not provided
      price: item.price,
      quantity: item.quantity||'',
      type: item.type || "PRODUCT", // Default type to PRODUCT if not provided
      sub_category: item.sub_category||"",
    })),

    metadata: metadata, // Additional optional metadata
  };
};
