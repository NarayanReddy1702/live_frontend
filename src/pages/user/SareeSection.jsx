import React, { useEffect, useState } from "react";
import SareeCard from "../../components/SareeCard";
import { useGetAllSareeQuery } from "../../redux/state";

const SareeSection = () => {
  const categories = [
    { name: "All" },
    { name: "Sarees" },
    { name: "Kurthi Set" },
    { name: "Lehengas" },
    { name: "Jewellery" },
    { name: "Handbags" },
  ];

  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

const { data: sarees,isLoading,error } = useGetAllSareeQuery();


 
  useEffect(() => {
    if (sarees?.success) {
      setAllCards(sarees.saree || []);
      setFilteredCards(sarees.saree || []);
    }
  }, [sarees]);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredCards(allCards);
    } else {
      const filtered = allCards.filter(
        (item) => item.category === activeCategory
      );
      setFilteredCards(filtered);
    }
  }, [activeCategory, allCards]);

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading sarees</p>;

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 py-8">
  <h1 className="text-2xl font-semibold text-center mb-6">
    Saree Section
  </h1>

  <div className="flex flex-col md:flex-row gap-6 md:gap-8">


    <div className="
      flex md:flex-col
      overflow-x-auto md:overflow-visible
      gap-3
      md:w-52
      pb-2
    ">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setActiveCategory(cat.name)}
          className={`
            whitespace-nowrap
            px-4 py-2 rounded-lg transition text-left
            ${
              activeCategory === cat.name
                ? "bg-[#e0531f] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
        >
          {cat.name}
        </button>
      ))}
    </div>

   <div
  className="
    grid
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-3
    xl:grid-cols-4
    gap-6
    w-full
    mx-auto
    place-items-center
    sm:place-items-stretch
  "
>
  {filteredCards.length > 0 ? (
    filteredCards.map((item) => (
      <SareeCard key={item._id} item={item} />
    ))
  ) : (
    <p className="col-span-full text-center text-gray-500">
      No products found
    </p>
  )}
</div>

  </div>
</section>

  );
};

export default SareeSection;
