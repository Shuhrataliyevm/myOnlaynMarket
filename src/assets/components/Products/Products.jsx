// export default Products;
import useStore from "@/store";
import React from "react";

import { useState, useEffect } from "react";
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { likeProduct, likedProducts, buyProduct } = useStore(); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    throw new Error("API returned non-array data");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="products-container">
            <h1>Products</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : products.length > 0 ? (
                <div className="products-grid">
                    {products.map((product) => {
                        const isLiked = likedProducts.some((p) => p.id === product.id);
                        return (
                            <div key={product.id} className="product-card">
                                <button onClick={() => likeProduct(product)} className={`like-btn ${isLiked ? "liked" : ""}`}>
                                    {isLiked ? "❤️" : "🤍"}
                                </button>
                                <img src={product.image} alt={product.title} />
                                <b>{product.title}</b>
                                <p>${product.price}</p>
                                <button className="buy-btn" onClick={() => buyProduct(product)}>Buy Now</button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

export default Products;
