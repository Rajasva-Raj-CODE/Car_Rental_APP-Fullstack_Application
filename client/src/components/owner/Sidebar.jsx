import React, { useState } from "react";
import { ownerMenuLinks, assets } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState("");

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        fetchUser();
        setImage("");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-6 max-w-[280px] w-full border-r border-gray-200 bg-white">
      <div className="group relative w-20 h-20">
        <label htmlFor="image" className="cursor-pointer">
          <img
            className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U"
            }
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            id="image"
            className="hidden"
          />
          <div className="absolute hidden top-0 right-0 left-0 bottom-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="" />
          </div>
        </label>
      </div>
      {image && (
        <button
          className="absolute top-0 right-0 flex p-2 gap-1 bg-primary/10 text-primary cursor-pointer"
          onClick={updateImage}
        >
          Save <img src={assets.check_icon} width={13} alt="" />
        </button>
      )}

      <h1 className="text-xl font-semibold mt-4 mb-8">{user?.name}</h1>

      <div className="w-full px-3">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            to={link.path}
            key={index}
            className={`relative flex items-center gap-3 w-full py-3 px-4 rounded-lg mb-1 transition-all duration-200 ${
              link.path === location.pathname
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt={link.name}
              className="w-5 h-5"
            />
            <span className="font-medium">{link.name}</span>
            {link.path === location.pathname && (
              <div className="w-1 h-8 bg-blue-600 rounded-l absolute right-0"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
