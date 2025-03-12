import { useState } from "react";
import useStore from "../../../../store";
import React from "react";

import "./Add.css";

const Add = () => {
    const { addProduct, products, removeProduct, setProducts, isLoggedIn } = useStore();

    console.log("📌 Store-dagi products:", products); // 🔍 Tekshirish uchun qo‘shildi
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    // 🔹 Endi `if (!isLoggedIn) return null;` ni ishlatsak bo‘ladi
    if (!isLoggedIn) return null;
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        if (!name || !price || !category) return;

        addProduct({
            id: Date.now(),
            name,
            price,
            category,
            image: image || "https://via.placeholder.com/150",
        });

        setName("");
        setPrice("");
        setCategory("");
        setImage("");
        setIsOpen(false);
    };

    const handleEdit = (product) => {
        setEditProduct(product);
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setImage(product.image);
        setEditOpen(true);
    };

    const handleUpdate = () => {
        if (!editProduct) return;

        setProducts(
            products.map((p) =>
                p.id === editProduct.id ? { ...p, name, price, category, image } : p
            )
        );
        setEditOpen(false);
    };

    return (
        <div>
            <button className="open-modal-btn" onClick={() => setIsOpen(true)}>➕ Add Product</button>

            {isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsOpen(false)}>❌</span>
                        <div className="form-section">
                            <label className="image-upload">
                                <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                                <div className="upload-box">📸 Upload Image</div>
                            </label>
                            {image && <img src={image} alt="Uploaded" className="preview-img" />}
                            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                            <button className="add-btn" onClick={handleSubmit}>✅ Add Product</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="product-list">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>Category: {product.category}</p>
                        <p>Price: ${product.price}</p>
                        
                        <button className="edit-btn" onClick={() => handleEdit(product)}>✏️ Edit</button>
                        <button className="delete-btn" onClick={() => removeProduct(product.id)}>🗑 Delete</button>
                    </div>
                ))}
            </div>

            {editOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setEditOpen(false)}>❌</span>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
                        <button className="save-btn" onClick={handleUpdate}>💾 Save</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Add;
