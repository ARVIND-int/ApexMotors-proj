export function formatPrice(price) {
  const formattedPrice = price.toLocaleString("en-US");
  return "$" + formattedPrice;
}

export function formatMileage(mileage) {
  const formattedMileage = mileage.toLocaleString("en-US");
  return formattedMileage + " mi";
}
