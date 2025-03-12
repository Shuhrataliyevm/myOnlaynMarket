import useStore from "../../../../store";
import React from "react";
import "./Liked.css";


const Liked = () => {
    const { likedProducts, likeProduct } = useStore();

    return (
        <div className="liked-container">
            <h2>❤️ Liked Products {likedProducts.length > 0 && `(${likedProducts.length})`}</h2>
            {likedProducts.length === 0 ? (
                <h3 className="empty-liked">No liked products yet!</h3>
            ) : (
                <div className="grid">
                    {likedProducts.map((product) => (
                        <div key={product.id} className="liked-card">
                            <button 
                                className="like-btn" 
                                onClick={() => likeProduct(product)}
                            >
                                ❤️
                            </button>
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                onError={(e) => e.target.src = "/images/placeholder.png"} 
                            />
                            <h3>{product.title}</h3>
                            <p>${product.price ? product.price.toFixed(2) : "N/A"}</p>
                            <button className="buy-btn">Buy Now</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Liked;
