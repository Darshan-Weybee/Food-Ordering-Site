
export function beforeUnload(cartItems, favouriteItems, recentItems) {
    localStorage.setItem("items", JSON.stringify(cartItems));
    localStorage.setItem("fav", JSON.stringify(favouriteItems));
    localStorage.setItem("recent", JSON.stringify(recentItems));
}