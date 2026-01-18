export function calculateNights(checkIn, checkOut) {
  const inDate = new Date(checkIn);
  const outDate = new Date(checkOut);

  const diffTime = outDate - inDate;
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return nights;
}

export function calculatePrice(pricePerNight, nights) {
  const basePrice = pricePerNight * nights;

  const taxes = Math.round(basePrice * 0.12); // 12% taxes
  const discount = basePrice >= 15000 ? 1000 : 0; // discount rule

  const total = basePrice + taxes - discount;

  return { basePrice, taxes, discount, total };
}
