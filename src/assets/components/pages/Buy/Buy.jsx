import useStore from "../../../../store";
import React from "react";

import "./Buy.css";

const Buy = () => {
    const boughtProducts = useStore((state) => state.boughtProducts);
    const increaseQuantity = useStore((state) => state.increaseQuantity);
    const decreaseQuantity = useStore((state) => state.decreaseQuantity);
    const removeBoughtProduct = useStore((state) => state.removeBoughtProduct);
    const likeBoughtProduct = useStore((state) => state.likeBoughtProduct); // Buy uchun like qilish

    return (
        <div className="buy-container">
            {boughtProducts.map((product) => (
                <div key={product.id} className="buy-card">
                    <img src={product.image} alt={product.name} className="buy-image" />
                    <div className="buy-info">
                        <h3><strong>Name:</strong> {product.name}</h3>
                        <p><strong>Price:</strong> ${product.price}</p>
                        <p><strong>Surname:</strong> {product.category}</p>
                    </div>
                    <div className="buy-actions">
                        <button className="buy-quantity-btn" onClick={() => decreaseQuantity(product.id)}>−</button>
                        <span className="buy-quantity">{product.quantity}</span>
                        <button className="buy-quantity-btn" onClick={() => increaseQuantity(product.id)}>+</button>
                        <button className="buy-like-btn" onClick={() => likeBoughtProduct(product.id)}>❤️</button>
                        <button className="buy-delete-btn" onClick={() => removeBoughtProduct(product.id)}>🗑️</button>
                    </div>
                </div>
            ))}
            {boughtProducts.length > 0 && (
                <div className="buy-total-container">
                    <h3 className="buy-total"> <span>${boughtProducts.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</span></h3>
                    <button className="buy-now-btn">Buy Now</button>
                </div>
            )}
        </div>
    );
};

export default Buy;
