import useStore from "@/store";
import React, { useState, useEffect } from "react";
import { Pagination } from "antd"; // 🆕 Ant Design Pagination
import "./Products.css";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { likeProduct, likedProducts, buyProduct } = useStore();

    // 🆕 Pagination holati uchun state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // 🆕 Har bir sahifada nechta mahsulot chiqishini belgilaymiz

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

    // 🆕 Sahifalanadigan mahsulotlar
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="products-container">
            <h1>Products</h1>
            {loading ? (
                <p>Loading products...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : products.length > 0 ? (
                <>
                    <div className="products-grid">
                        {displayedProducts.map((product) => {
                            const isLiked = likedProducts.some((p) => p.id === product.id);
                            return (
                                <div key={product.id} className="product-card">
                                    <button
                                        onClick={() => likeProduct(product)}
                                        className={`like-btn ${isLiked ? "liked" : ""}`}
                                    >
                                        {isLiked ? "❤️" : "🤍"}
                                    </button>
                                    <img src={product.image} alt={product.title} />
                                    <b>{product.title}</b>
                                    <p>${product.price.toFixed(2)}</p>
                                    <button className="buy-btn" onClick={() => buyProduct(product)}>
                                        Buy Now
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* 🆕 Pagination */}
                    <Pagination
                        current={currentPage}
                        total={products.length}
                        pageSize={itemsPerPage}
                        onChange={(page) => setCurrentPage(page)}
                        style={{ marginTop: "20px", textAlign: "center", marginBottom:"50px" }}
                    />
                </>
            ) : (
                <p>No products available</p>
            )}
        </div>
    );
}

export default Products;
