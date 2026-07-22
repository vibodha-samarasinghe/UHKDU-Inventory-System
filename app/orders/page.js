"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";
import { useOrders } from "@/context/OrderContext";

const departments = [
  "Emergency Ward",
  "OPD",
  "ICU",
  "Pharmacy",
  "Surgical Ward",
];

export default function Orders() {
  const { products, setProducts } = useProducts();
  const { addOrder } = useOrders();

  const [department, setDepartment] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  function issueStock() {
    if (!department || !productId || !quantity) {
      alert("Please fill all fields");
      return;
    }

    const selectedProduct = products.find(
      (product) => String(product.id) === String(productId)
    );

    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    if (Number(quantity) > selectedProduct.quantity) {
      alert("Not enough stock");
      return;
    }

    const updatedProducts = products.map((product) =>
      String(product.id) === String(productId)
        ? {
            ...product,
            quantity: product.quantity - Number(quantity),
          }
        : product
    );

    setProducts(updatedProducts);

    addOrder({
      id: Date.now(),
      department,
      product: selectedProduct.name,
      quantity: Number(quantity),
      date: new Date().toLocaleDateString(),
      status: "Completed",
    });

    alert("Stock Issued Successfully");

    setDepartment("");
    setProductId("");
    setQuantity("");
  }

  return (
    <main className="min-h-screen pt-28 px-10">
      <div className="max-w-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-green-900 mb-6">
          Stock Issue
        </h1>

        <select
          className="w-full p-3 mb-4 rounded-xl border bg-white"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>

          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 mb-4 rounded-xl border bg-white"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        >
          <option value="">Select Product</option>

          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (Stock: {product.quantity})
            </option>
          ))}
        </select>

        <input
          className="w-full p-3 mb-5 rounded-xl border bg-white"
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button
          onClick={issueStock}
          className="bg-green-800 hover:bg-green-900 text-white px-6 py-3 rounded-xl"
        >
          Issue Stock
        </button>

      </div>
    </main>
  );
}