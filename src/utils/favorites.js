const KEY = "favoriteHotels";

export function getFavorites() {
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function isFavorite(hotelId) {
  const favs = getFavorites();
  return favs.includes(hotelId);
}

export function toggleFavorite(hotelId) {
  const favs = getFavorites();

  let updated;
  if (favs.includes(hotelId)) {
    updated = favs.filter((id) => id !== hotelId);
  } else {
    updated = [hotelId, ...favs];
  }

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
