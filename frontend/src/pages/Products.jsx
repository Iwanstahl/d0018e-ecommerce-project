import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useState } from "react";
import Title from "../components/Title";
import { useEffect } from "react";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const { products, searchQuery} = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = [...new Set(products.map(p => p.category_name))];

  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category_name)
      );
    }

    setFilterProducts(filtered);

  }, [products, searchQuery, selectedCategories]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-8">
      {/* Left side */}
      {/* Filter Options */}
      <div className="min-w-60">
        {/* CATEGORY FILTER, THE BOX AROUND CATEGORIES */}
        <div className="hidden sm:block border border-(--main-text-color) bg-(--main-text-color) pl-5 py-4 mt-6">
          <p className="mb-3 text-sm font-medium text-(--second-text-color)">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-(--second-text-color)">
          {categories.map(category => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="accent-white"
                checked={selectedCategories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedCategories(prev => [...prev, category]);
                  } else {
                    setSelectedCategories(prev =>
                      prev.filter(c => c !== category)
                    );
                  }
                }}
              />
              {category.toUpperCase()}
            </label>
          ))}

          </div>
        </div>
      </div>


      {/* Right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2x1 mb-4">
          <Title text1={"OUR"} text2={"PRODUCTS"} />
          {/* Product Sort */}
          <select className="border-2 border-(--main-text-color) bg-(--main-text-color) text-sm text-(--second-text-color) px-2">
            <option value="low-high" className="text-(--second-text-color)">
              Sort-by: Low to High
            </option>
            <option value="high-low" className="text-(--second-text-color">
              Sort-by: High to Low
            </option>
          </select>
        </div>

        {/* MAP PRODUCTS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item) => (
            <ProductItem
              key={item.product_id}
              product_id={item.product_id}
              image={item.image}
              name={item.name}
              price={item.price}
              category_name={item.category_name}
              stock={item.stock}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
