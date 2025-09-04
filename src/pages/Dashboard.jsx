import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList/ProductList";
import {
  addProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../api/api";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import { FaPlus } from "react-icons/fa";
import ProductForm from "../components/ProductForm/ProductForm";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isForm, setIsForm] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnDelLoading, setBtnDelLoading] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    const response = await getProducts();
    setProducts(response?.data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async (newProduct) => {
    setBtnLoading(true);
    const response = await addProduct({
      ...newProduct,
      image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
    });
    setProducts([response?.data, ...products]);
    setIsForm(false);
    setBtnLoading(false);
  };

  const handleUpdate = async (updated) => {
    setBtnLoading(true);
    const res = await updateProduct(updated?.id, updated);
    setProducts(
      products?.map((p) =>
        p?.id === updated?.id
          ? {
              ...updated,
              image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png",
            }
          : p
      )
    );
    setEditingProduct(null);
    setIsForm(false);
    setBtnLoading(false);
  };

  const handleDelete = async (id) => {
    setBtnDelLoading(id);

    await deleteProduct(id);
    setProducts(products?.filter((p) => p?.id !== id));
    setBtnDelLoading(false);
  };

  const filteredProducts = products?.filter((p) =>
    p.title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="dashboard p-3">
      <h1 className="mb-3">Product Management Dashboard</h1>

      <div className="controls">
        <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button className="add-btn" onClick={() => setIsForm(true)}>
          <FaPlus style={{ marginRight: "6px" }} /> Add Product
        </button>
      </div>

      {isForm && (
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleAdd}
          onCancel={() => {
            setIsForm(false);
            setEditingProduct(null);
          }}
          btnLoading={btnLoading}
        />
      )}

      {isLoading ? (
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <ProductList
          products={filteredProducts}
          onEdit={(p) => {
            setEditingProduct(p);
            setIsForm(true);
          }}
          onDelete={handleDelete}
          btnDelLoading={btnDelLoading}
        />
      )}
    </div>
  );
};

export default Dashboard;
