import { create } from "zustand";

// 🔹 LocalStorage'dan ma'lumotlarni olish funksiyasi
const getStoredData = (key, defaultValue) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error(`Error parsing localStorage key: ${key}`, error);
        return defaultValue;
    }
};

// 🔹 LocalStorage'ga ma'lumotni saqlash funksiyasi
const saveToLocalStorage = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`Error saving to localStorage key: ${key}`, error);
    }
};

// 🔹 Zustand store'ni yaratish
const useStore = create((set) => ({
    products: getStoredData("products", []),
    boughtProducts: getStoredData("boughtProducts", []),
    likedProducts: getStoredData("likedProducts", []),
    user: getStoredData("user", null), // 🔹 Login foydalanuvchisi

    // 🔹 Mahsulotlar listini o‘zgartirish
    setProducts: (products) => {
        saveToLocalStorage("products", products);
        set({ products });
    },

    // 🔹 Yangi mahsulot qo‘shish
    addProduct: (product) =>
        set((state) => {
            const updatedProducts = [...state.products, product];
            saveToLocalStorage("products", updatedProducts);
            return { products: updatedProducts };
        }),

    // 🔹 Mahsulotni yoqtirish (Like)
    likeProduct: (product) =>
        set((state) => {
            const isLiked = state.likedProducts.some((p) => p.id === product.id);
            const updatedLikedProducts = isLiked
                ? state.likedProducts.filter((p) => p.id !== product.id)
                : [...state.likedProducts, product];

            saveToLocalStorage("likedProducts", updatedLikedProducts);
            return { likedProducts: updatedLikedProducts };
        }),
    buyProduct: (product) => set((state) => {
        const isBought = state.boughtProducts.some((p) => p.id === product.id);
        if (isBought) {
            return {
                boughtProducts: state.boughtProducts.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
                ),
            };
        } else {
            return {
                boughtProducts: [...state.boughtProducts, { ...product, quantity: 1 }],
            };
        }
    }),

    // 🔹 Sotib olingan mahsulot miqdorini oshirish
    increaseQuantity: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.map((p) =>
                p.id === id ? { ...p, quantity: p.quantity + 1 } : p
            );

            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    // 🔹 Sotib olingan mahsulot miqdorini kamaytirish
    decreaseQuantity: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.map((p) =>
                p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
            );

            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    // 🔹 Sotib olingan mahsulotni o‘chirish
    removeBoughtProduct: (id) =>
        set((state) => {
            const updatedBoughtProducts = state.boughtProducts.filter((p) => p.id !== id);

            saveToLocalStorage("boughtProducts", updatedBoughtProducts);
            return { boughtProducts: updatedBoughtProducts };
        }),

    // 🔹 Mahsulotni umumiy ro‘yxatdan o‘chirish
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

    // 🔹 LOGIN funksiyasi
    login: (user) =>
        set(() => {
            saveToLocalStorage("user", user);
            return { user };
        }),

    // 🔹 LOGOUT funksiyasi
    logout: () =>
        set(() => {
            localStorage.removeItem("user");
            return { user: null };
        }),
}));

export default useStore;
