export const createShippingRequestDTO = (seller, buyer, courier,items, metadata = {}) => {
  return {
    origin_contact_name: seller.contactName,
    origin_contact_phone: seller.contactPhone,
    origin_address: seller.address,
    origin_note: seller.note,
    origin_postal_code: seller.postalCode,

    destination_contact_name: buyer.contactName,
    destination_contact_phone: buyer.contactPhone,
    destination_contact_email: buyer.contactEmail,
    destination_address: buyer.address,
    destination_postal_code: buyer.postalCode,
    destination_note: buyer.note,

    courier_company: courier.company,
    courier_type: courier.type,

    delivery_type: 'now',
    metadata: metadata,

    items: items.map((item) => ({
      name: item.name,
      category: item.category,
      value: item.value,
      quantity: item.quantity,
      height: item.height,
      length: item.length,
      weight: item.weight,
      width: item.width,
    })),
  };
};
