🔵 coco
A fully responsive **Hotel Booking Website** built with **React + Vite + Tailwind CSS**.  
Users can search, filter, view hotel details, add to wishlist, and book hotels with protected routes (JWT login).

---

## 🌐 Live Demo
👉 https://coco-flax.vercel.app

---

## 📌 Features

### ✅ Authentication & Session
- Login system using **JWT-based authentication (DummyJSON)**
- Session persistence using **localStorage**
- Protected routes:
  - My Bookings
  - Profile
  - Wishlist/Favorites

### ✅ Hotels Search & Listings
- Search hotels by **city / destination**
- Responsive hotel listing cards
- Grid / List layout toggle
- Manual pagination using **Load More**
- Skeleton loader UI while loading

### ✅ Filtering & Sorting
- Price range slider
- Rating filter
- Amenities filter:
  - WiFi
  - Pool
  - Parking
  - AC
- Property type filter:
  - Hotel
  - Resort
  - Apartment
- Sorting:
  - Popularity
  - Rating
  - Price Low → High
  - Price High → Low

### ✅ Hotel Details & Booking
- Hotel details page with dynamic route
- Booking form with:
  - dates + guests input
  - guest details
  - price breakdown
- Booking confirmation screen
- Stores booking records locally

### ✅ My Bookings
- View all booking history
- Cancel bookings
- Upcoming/past bookings separation (if implemented)

### ✅ Wishlist / Favorites (Brownie Points 🧁)
- Add/remove hotels to wishlist
- Favorites page to view saved hotels

### ✅ UX Enhancements (Brownie Points 🧁)
- Debounced search input
- Lazy loading for images
- Recently viewed hotels section
- Mobile filters drawer panel (professional UI)

---

## 🧪 Demo Credentials
Use the following to test login:

- **Username:** `kminchelle`  
- **Password:** `0lelplR`

---

## 🛠 Tech Stack
- **Frontend:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Auth:** DummyJSON JWT Login
- **Storage:** localStorage (session + bookings + wishlist)

---

## 📂 Folder Structure
```bash
src/
 ├── components/        # Reusable UI components
 ├── context/           # AuthContext / Providers
 ├── data/              # Mock hotel data
 ├── pages/             # Home, Hotels, Details, Login, Profile, Bookings etc.
 ├── utils/             # helper utilities (recently viewed, wishlist etc.)
 ├── App.jsx
 ├── main.jsx

