import React, { useState, useMemo } from "react";
import Card from "./Card.jsx";
import products from "../data-api/product.js";
import { useSearch } from "../context/SearchContext.jsx";

const Home = () => {
  const { search } = useSearch();
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    rating: 0,
    priceRange: { min: 0, max: 3000 },
  });

  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    []
  );
  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))], []);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => {
      if (filterType === "category" || filterType === "brand") {
        const newValues = prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter((item) => item !== value)
          : [...prevFilters[filterType], value];
        return { ...prevFilters, [filterType]: newValues };
      } else {
        return { ...prevFilters, [filterType]: value };
      }
    });
  };

  let filteredProducts = products.filter((product) => {
    const searchMatch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(product.category);
    const brandMatch =
      filters.brand.length === 0 || filters.brand.includes(product.brand);
    const ratingMatch = product.rating >= filters.rating;
    const priceMatch =
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max;

    return (
      searchMatch && categoryMatch && brandMatch && ratingMatch && priceMatch
    );
  });

  if (sortBy) {
    filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top bar (Filter + Sort) */}
      <div className="flex justify-between items-center p-4 shadow-sm sticky top-14 bg-white z-20">
        {/* Filter button (only on mobile) */}
        <button
          className="px-3 py-2 bg-blue-600 text-white rounded-md md:hidden"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          {showFilters ? "✕ Close" : "☰ Filters"}
        </button>

        <span className="text-sm md:text-lg">
          Showing {filteredProducts.length} of {products.length} products
        </span>

        <div>
          <label htmlFor="sort" className="mr-2 hidden md:inline">
            Sort by:
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-md shadow-sm"
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Customer Rating</option>
          </select>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar (desktop always visible, mobile toggle) */}
        <aside
          className={`bg-white shadow-md p-4 
            ${showFilters ? "block" : "hidden"} 
            md:block md:w-1/5`}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Category</h3>
            {categories.map((category) => (
              <div key={category} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={category}
                  value={category}
                  onChange={() => handleFilterChange("category", category)}
                  className="mr-2"
                />
                <label htmlFor={category}>{category}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Brand</h3>
            {brands.map((brand) => (
              <div key={brand} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={brand}
                  value={brand}
                  onChange={() => handleFilterChange("brand", brand)}
                  className="mr-2"
                />
                <label htmlFor={brand}>{brand}</label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Customer Rating</h3>
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center mb-1">
                <input
                  type="radio"
                  id={`rating-${rating}`}
                  name="rating"
                  onChange={() => handleFilterChange("rating", rating)}
                  className="mr-2"
                />
                <label htmlFor={`rating-${rating}`}>{rating}★ & above</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <input
              type="range"
              min="0"
              max="3000"
              value={filters.priceRange.max}
              onChange={(e) =>
                handleFilterChange("priceRange", {
                  ...filters.priceRange,
                  max: Number(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="text-center mt-1">
              ${filters.priceRange.min} - ${filters.priceRange.max}
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <main
          className={`flex-1 p-4 transition-all ${
            showFilters ? "w-3/5 sm:w-2/3 md:w-4/5" : "w-full"
          }`}
        >
          <div
            className={`grid gap-6 
              grid-cols-1 
              sm:grid-cols-2 
              lg:grid-cols-3 
              xl:grid-cols-4 
              ${filteredProducts.length === 1 ? "justify-center" : ""}`}
          >
            {filteredProducts.map((product) => (
              <Card key={product.id} productObj={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
