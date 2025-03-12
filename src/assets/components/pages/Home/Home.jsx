import useStore from "../../../../store";
import React from "react";

import "./Home.css";

const Home = () => {
    const products = useStore((state) => state.products);
    const buyProduct = useStore((state) => state.buyProduct);
    const removeProduct = useStore((state) => state.removeProduct);
    const { likeProduct, likedProducts } = useStore();

    return (
        <div className="home">
            {products.length > 0 ? ( // ✅ Mahsulotlar mavjudligini tekshirish
                products.map((product) => {
                    const isLiked = likedProducts.some((p) => p.id === product.id);

                    return (
                        <div key={product.id} className="home-card">
                            {product.image ? ( // ✅ Rasm mavjudligini tekshirish
                                <img src={product.image} alt={product.name} className="home-image" />
                            ) : (
                                <img src="https://via.placeholder.com/150" alt="No image" className="home-image" />
                            )}

                            <h3>{product.name}</h3>
                            <p>Category: {product.category}</p>
                            <p>Price: ${product.price}</p>

                            <button className="home-like-btn" onClick={() => likeProduct(product)}>
                                {isLiked ? "❤️" : "🤍"}
                            </button>
                            <button className="home-buy-btn" onClick={() => buyProduct(product)}>Buy</button>

                            <span className="home-delete-x" onClick={() => removeProduct(product.id)}>❌</span>
                        </div>
                    );
                })
            ) : (
                <p className="no-products">No products availables.</p> // ✅ Bo‘sh bo‘lsa xabar chiqarish
            )}
        </div>
    );
};

export default Home;
