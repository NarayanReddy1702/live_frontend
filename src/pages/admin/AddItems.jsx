import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useAddItemMutation } from "../../redux/state";
import { useNavigate } from "react-router-dom";
import { categories } from "../../components/Category";

const SareeForm = () => {


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbline: null,
    images: [],
  });

  const [addItem, { isLoading }] = useAddItemMutation();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  // text fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // thumbnail
  const handleThumblineChange = (e) => {
    setFormData({ ...formData, thumbline: e.target.files[0] });
  };

  // select single image
  const handleImageSelect = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // add image one by one (STATE ONLY)
  const addImage = () => {
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    if (images.length >= 6) {
      toast.error("Maximum 6 images allowed");
      return;
    }

    setImages((prev) => [...prev, selectedImage]);
    setSelectedImage(null);
  };

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.thumbline || images.length === 0) {
      toast.error("Thumbnail & images are required");
      return;
    }

    const fd = new FormData();

    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.category);

    // thumbnail
    fd.append("thumbline", formData.thumbline);

    // gallery images
    images.forEach((img) => {
      fd.append("images", img);
    });

    try {
      const res = await addItem(fd).unwrap();
      if (res?.success) {
        setTimeout(() => {
          setFormData({
            title: "",
            description: "",
            price: "",
            category: "",
            thumbline: null,
            images: [],
          });
        }, 3000);
        
        toast.success(res.message)

        setTimeout(()=>{
          navigate("/admin/allItems")
        },4000)
      }
    } catch (err) {
      toast.error(err?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-5xl w-full p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 border-b pb-3">
          Add New Saree
        </h2>

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <input
            name="title"
            placeholder="Title"
            className="input"
            onChange={handleChange}
            required
          />
         <select
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
>
  <option value="">Select Category</option>

  {categories
    .filter((cat) => cat.name !== "All")
    .map((cat) => (
      <option key={cat.name} value={cat.name}>
        {cat.name}
      </option>
    ))}
</select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="input"
            onChange={handleChange}
            required
          />
        </div>

        {/* Thumbnail */}
        <div className="mb-6">
          <label className="label">Thumbnail Image</label>
          <input
            type="file"
            className="file-input"
            onChange={handleThumblineChange}
            required
          />
        </div>

        {/* Gallery Images */}
        <div className="mb-6">
          <label className="label">Gallery Images (One by One)</label>

          <div className=" gap-3 md:flex flex-row  ">
            <input
              type="file"
              className="file-input max-w-3xl"
              onChange={handleImageSelect}
            />
            <button
              type="button"
              onClick={addImage}
              ref={fileInputRef}
              className="bg-black text-white mt-3 md:mt-0 px-4 py-2 rounded-lg"
            >
              Add Image
            </button>
          </div>

          {/* Preview */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  className="w-24  rounded-lg object-cover border"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {images.length}/6 images added
          </p>
        </div>

        {/* Description */}
        <textarea
          name="description"
          rows="4"
          className="input mb-6"
          placeholder="Description"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-xl"
        >
          Create New Card
        </button>
      </form>
    </div>
  );
};

export default SareeForm;
