import React from "react";
import { motion } from "framer-motion";
import SareeSection from "./SareeSection";

const Home = () => {
  return (
    <>
      {/* HERO SECTION */}
    <section className="min-h-screen bg-linear-to-br from-[#fff7f2] to-[#fbeee6] flex items-center justify-center overflow-hidden px-4">
  <div className="max-w-3xl w-full text-center py-16">

    {/* TEXT SECTION */}
    <div className="relative overflow-hidden rounded-xl">

      {/* RECTANGLE OVERLAY */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full bg-[#e0531f] z-10"
      />

      {/* TEXT CONTENT */}
      <div className="relative z-20 p-6 sm:p-8">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
        >
          Discover the Elegance of <br />
          <span className="text-[#e0531f]">Premium Sarees</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-gray-700 text-base sm:text-lg leading-relaxed mb-4"
        >
          Step into a world of timeless beauty with our premium saree
          collection. Designed with rich fabrics, intricate craftsmanship,
          and modern elegance.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-gray-600 text-sm sm:text-base mb-6"
        >
          Perfect for weddings, festivals, and special moments that deserve
          nothing but grace.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-[#e0531f] hover:bg-[#c74718] text-white px-8 py-3 rounded-xl font-medium transition"
        >
          Explore Collection
        </motion.button>
      </div>
    </div>

  </div>
</section>


      {/* SAREE SECTION */}
      <SareeSection />
    </>
  );
};

export default Home;
