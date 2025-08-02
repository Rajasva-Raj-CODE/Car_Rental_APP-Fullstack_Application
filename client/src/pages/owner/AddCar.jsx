import React, { useState } from "react";
import Title from "../../components/owner/Title";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";
const AddCar = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brnad: "",
    model: "",
    year: 0,
    pricePerDay: 0,
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: 0,
    location: "",
    description: "",
  });

  const [isloading, setIsLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (isloading) return null;
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("carData", JSON.stringify(car));

      const { data } = await axios.post("/api/owner/add-car", formData);
      if (data.success) {
        toast.success(data.message);
        setCar({
          brnad: "",
          model: "",
          year: 0,
          pricePerDay: 0,
          category: "",
          transmission: "",
          fuel_type: "",
          seating_capacity: 0,
          location: "",
          description: "",
        });
        setImage(null);
        setIsLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="px-4 pt-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in the details to list a new car for booking, including pricing , specifications, and availability."
      />
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* car image */}
        <div className="flex w-full items-center gap-2">
          <label htmlFor="car-image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=""
              className="h-14 rounded cursor-pointer"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              hidden
            />
          </label>
          <p className="text-sm text-gray-500">Upload a pictue of your car</p>
        </div>

        {/* car brand and model */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              placeholder="e.g Mercedes, BMW, Audi, Mustang..."
              required
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Model</label>
            <input
              type="text"
              placeholder="e.g. X5,E-Class, S-Class, GT..."
              required
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            />
          </div>
        </div>

        {/* car year, price per day, categor*/}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Year</label>
            <input
              type="text"
              placeholder="2025"
              required
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Daily Price ({currency})</label>
            <input
              type="number"
              placeholder="e.g. 5000, 6000, 7000..."
              required
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            />
          </div>
          <div className="flex flex-col w-full">
            <label>Category</label>
            <select
              value={car.category}
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              required
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            >
              <option value="">Select a category</option>
              <option value="Van">Van</option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
            </select>
          </div>
        </div>

        {/* transmission, fuel type, seating capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label>Transmission</label>
            <select
              value={car.transmission}
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              required
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            >
              <option value="">Select a transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Fuel Type</label>
            <select
              value={car.fuel_type}
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              required
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            >
              <option value="">Select a fuel type</option>
              <option value="Gasoline">Gasoline</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label>Seating Capacity</label>
            <input
              type="number"
              placeholder="e.g. 4, 5, 7..."
              required
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
              className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
            />
          </div>
        </div>

        {/* Car Location*/}

        <div className="flex flex-col w-full">
          <label>Car Location</label>
          <select
            value={car.location}
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            required
            className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
          >
            <option value="">Select a location</option>
            {/* Indian Cities */}
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            {/* US Cities */}
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
            <option value="San Francisco">San Francisco</option>
            {/* European Cities */}
            <option value="London">London</option>
            <option value="Paris">Paris</option>
            <option value="Berlin">Berlin</option>
            <option value="Rome">Rome</option>
            <option value="Amsterdam">Amsterdam</option>
            <option value="Madrid">Madrid</option>
          </select>
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label>Description</label>
          <textarea
            placeholder="Describe your car's features, condition, special amenities, and any other important details..."
            required
            rows="5"
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
            className="border border-borderColor rounded-md outline-none py-2 px-3 mt-1 "
          />
        </div>

        <button
          type="submit"
          className=" gap-2 w-max flex items-center px-4 py-2.5 mt-4 text-white bg-primary hover:bg-primary-dull transition-all font-medium cursor-pointer rounded-md"
        >
          <img src={assets.tick_icon} alt="" />
          {isloading ? "Listing..." : "  List Your Car"}
        </button>
      </form>
    </div>
  );
};

export default AddCar;
