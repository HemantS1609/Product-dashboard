import { FaEdit, FaTrash } from "react-icons/fa";
import "./ProductList.css";

const ProductList = ({ products, onEdit, onDelete, btnDelLoading }) => {
  return (
    <div className="product-card-grid">
      {products?.length > 0 ? (
        products?.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.title} className="product-img" />
            <div className="product-card-body">
              <h3 className="product-card-title">{p.title}</h3>
              <p className="product-card-category">{p.category}</p>
              <p className="product-card-price">₹ {p.price}</p>
              <div className="product-card-actions">
                <button onClick={() => onEdit(p)}>
                  <FaEdit style={{ marginRight: "6px" }} /> Edit
                </button>
                <button onClick={() => onDelete(p.id)}>
                  {btnDelLoading === p?.id ? (
                    <span className="loader"></span>
                  ) : (
                    <>
                      <FaTrash style={{ marginRight: "6px" }} /> Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", width: "100%" }}>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
