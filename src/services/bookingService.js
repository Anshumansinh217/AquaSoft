// src/services/bookingService.js

const RESTAURANT_KEY = 'restaurantOrders';
const ARTICLE_KEY = 'articleOrders';

// Get all bookings
export const getRestaurantBookings = () => {
  return JSON.parse(localStorage.getItem(RESTAURANT_KEY)) || [];
};

export const getArticleBookings = () => {
  return JSON.parse(localStorage.getItem(ARTICLE_KEY)) || [];
};

// Save booking
export const saveRestaurantBooking = (booking) => {
  const bookings = getRestaurantBookings();
  bookings.push(booking);
  localStorage.setItem(RESTAURANT_KEY, JSON.stringify(bookings));
};

export const saveArticleBooking = (booking) => {
  const bookings = getArticleBookings();
  bookings.push(booking);
  localStorage.setItem(ARTICLE_KEY, JSON.stringify(bookings));
};

