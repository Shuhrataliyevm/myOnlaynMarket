// export default useStore;
import { create } from "zustand";

// 🔹 LocalStorage'dan ma'lumot olish funksiyasi
const getStoredData = (key, defaultValue) => {
    try {
        const data = localStorage.getItem(key);
        return data && data !== "undefined" && data !== "null" ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`❌ Error parsing localStorage key: ${key}`, error);
        return defaultValue;
    }
};

// 🔹 LocalStorage'ga ma'lumot saqlash funksiyasi
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`❌ Error saving to localStorage key: ${key}`, error);
    }
};

// 🔹 Zustand store
const useStore = create((set) => ({
    products: getStoredData("products", []),
    boughtProducts: getStoredData("boughtProducts", []),
    likedProducts: getStoredData("likedProducts", []),
    user: getStoredData("user", null), 
    isLoggedIn: getStoredData("isLoggedIn", false), // ✅ Xotiradan login holatini olish

    setProducts: (products) => {
        saveToLocalStorage("products", products);
        set({ products });
    },

    addProduct: (product) =>
        set((state) => {
            const updatedProducts = [...state.products, product];
            saveToLocalStorage("products", updatedProducts);
            return { products: updatedProducts };
        }),

    likeProduct: (product) =>
        set((state) => {
            const isLiked = state.likedProducts.some((p) => p.id === product.id);
            const updatedLikedProducts = isLiked
                ? state.likedProducts.filter((p) => p.id !== product.id)
                : [...state.likedProducts, product];

            saveToLocalStorage("likedProducts", updatedLikedProducts);
            return { likedProducts: updatedLikedProducts };
        }),

    buyProduct: (product) =>
        set((state) => {
            const isBought = state.boughtProducts.some((p) => p.id === product.id);
            if (isBought) {
                const updatedBoughtProducts = state.boughtProducts.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                );
                saveToLocalStorage("boughtProducts", updatedBoughtProducts);
                return { boughtProducts: updatedBoughtProducts };
            } else {
                const updatedBoughtProducts = [...state.boughtProducts, { ...product, quantity: 1 }];
                saveToLocalStorage("boughtProducts", updatedBoughtProducts);
                return { boughtProducts: updatedBoughtProducts };
            }
        }),

    increaseQuantity: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            );
            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    decreaseQuantity: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.map((p) =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            );
            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    removeBoughtProduct: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.filter((p) => p.id !== id);
            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    removeProduct: (id) =>
        set((state) => {
            const updatedProducts = state.products.filter((p) => p.id !== id);
            const updatedLikedProducts = state.likedProducts.filter((p) => p.id !== id);
            const updatedBoughtProducts = state.boughtProducts.filter((p) => p.id !== id);

            saveToLocalStorage("products", updatedProducts);
            saveToLocalStorage("likedProducts", updatedLikedProducts);
            saveToLocalStorage("boughtProducts", updatedBoughtProducts);

            return {
                products: updatedProducts,
                likedProducts: updatedLikedProducts,
                boughtProducts: updatedBoughtProducts,
            };
        }),

    // ✅ Login funksiyasini yaxshilash
    login: (user) => {
        if (user && typeof user === "object") {
            saveToLocalStorage("user", user);
            saveToLocalStorage("isLoggedIn", true);
            set({ user, isLoggedIn: true });
        } else {
            console.error("❌ Invalid user data:", user);
        }
    },

    logout: () => {
        localStorage.removeItem("user");
        localStorage.removeItem("isLoggedIn");
        set({ user: null, isLoggedIn: false });
    },
}));

export default useStore;
