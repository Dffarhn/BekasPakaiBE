export const cekOngkirRequestDTO = (originPostalCode, destinationPostalCode, couriers, items) => {
  return {
    origin_postal_code: originPostalCode, // e.g., 12440
    destination_postal_code: destinationPostalCode, // e.g., 12240
    couriers: couriers.join(","), // e.g., ["anteraja", "jne", "sicepat"] -> "anteraja,jne,sicepat"
    items: items.map((item) => ({
      name: item.name, // Item name
      value: item.value, // Item value in IDR
      length: item.length, // Item length in cm
      width: item.width, // Item width in cm
      height: item.height, // Item height in cm
      weight: item.weight, // Item weight in grams
      quantity: item.quantity, // Item quantity
    })),
  };
};
