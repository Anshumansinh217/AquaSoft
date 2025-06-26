import React, { useState, useEffect } from "react";
import { FaUtensils, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import DeleteConfirmationModal from "../../components/Popup/DeleteConfirmationModal";
import EditProductModal from "../../components/Popup/EditProductModal";

import { Link } from "react-router-dom";

const ArticleMaster = () => {
  const [articles, setArticles] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    gst: "",
    hsn: "",
    image: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editArticle, setEditArticle] = useState(null);

  const categories = [
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
  ];
  const gstRates = [5, 9, 12, 18];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("articlesData")) || [];
    setArticles(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "price" || name === "gst") && value !== "") {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (
      !form.name.trim() ||
      !form.price.trim() ||
      isNaN(parseFloat(form.price)) ||
      !form.category.trim() ||
      !form.gst.trim()
    ) {
      alert("Please fill valid Name, Price, Category and GST");
      return;
    }

    const newArticle = {
      ...form,
      id: Date.now(),
      price: parseFloat(form.price),
      gst: parseFloat(form.gst),
    };

    const updated = [...articles, newArticle];
    localStorage.setItem("articlesData", JSON.stringify(updated));
    setArticles(updated);
    setForm({ name: "", price: "", category: "", gst: "", hsn: "", image: "" });
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updated = articles.filter((a) => a.id !== deleteId);
    localStorage.setItem("articlesData", JSON.stringify(updated));
    setArticles(updated);
    setShowDeleteModal(false);
  };

  const handleEdit = (article) => {
    setEditArticle(article);
    setShowEditModal(true);
  };

  const handleSaveEditedArticle = (updatedArticle) => {
    const updatedList = articles.map((a) =>
      a.id === updatedArticle.id ? updatedArticle : a
    );
    localStorage.setItem("articlesData", JSON.stringify(updatedList));
    setArticles(updatedList);
    setShowEditModal(false);
  };

  return (
    <div className="p-6  mx-auto">
<div className="relative flex items-center justify-between mb-6">

  {/* Back Button - Left */}
  <Link
    to="/admin"
    className="inline-flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-700 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </Link>

  {/* Title Centered Absolutely */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg">
          <FaUtensils className="text-white text-xl" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Article Master
        </h1>
      </div>

</div>


      <div className="grid grid-cols-2 gap-4 bg-white p-3 rounded-xl shadow-lg">
        <input
          name="name"
          placeholder="ITEM NAME"
          value={form.name}
          onChange={handleChange}
          className=" border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          name="price"
          placeholder="PRICE"
          value={form.price}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">SELECT CATEGORY</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <select
          name="gst"
          value={form.gst}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">SELECT GST RATE</option>
          {gstRates.map((rate) => (
            <option key={rate} value={rate}>
              {rate}%
            </option>
          ))}
        </select>

        <input
          name="hsn"
          placeholder="HSN CODE"
          value={form.hsn}
          onChange={handleChange}
          className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Article Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="col-span-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all"
        >
          <FaPlus className="group-hover:rotate-90 transition-transform" />
          <span className="font-medium">Add Article</span>
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">📦 Current Articles</h3>
        <div className="space-y-3">
          {articles.map((item) => (
            <div
              key={item.id}
              className="relative group bg-white p-4 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                    <FaUtensils className="text-gray-400" />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <div className="flex gap-3 text-sm text-gray-500">
                    <span>₹{Number(item.price).toFixed(2)}</span>
                    <span>•</span>
                    <span>{categories.find(c => c.id === item.category)?.label || item.category}</span>
                    <span>•</span>
                    <span>{item.gst}% GST</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => confirmDelete(item.id)}
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirmed}
      />

<EditProductModal
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  product={editArticle}
  onSave={handleSaveEditedArticle}
  categories={[
    { id: "women", label: "Women" },
    { id: "men", label: "Men" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
  ]}
  type="article"
/>
    </div>
  );
};

export default ArticleMaster;