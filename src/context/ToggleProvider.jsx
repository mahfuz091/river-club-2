import { createContext, useEffect, useState } from "react";
import axiosInstance from "../axios/axios-instance";

export const ToggleContext = createContext(null);

const ToggleProvider = ({ children }) => {
  const [openOrderDetailsToggle, setOrderDetailsToggle] = useState(false);
  const [control, setControl] = useState(false);
  const [data, setData] = useState([]);

  const [cats, setCats] = useState([]);
  const [toggleState, setToggleState] = useState(1);

  const OpenOrderDetails = () => {
    console.log("click");
    setOrderDetailsToggle(!openOrderDetailsToggle);
  };

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    async function getCats() {
      try {
        const response = await axiosInstance.get("/cats");
        // console.log(response.data);
        setCats(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getCats();
  }, []);

  const fetchDataByCategory = async (categoryName) => {
    setData([]);
    try {
      const response = await axiosInstance.get(
        `/prods/category/${categoryName}`
      );
      setData(response.data);
      // console.log(response.data)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCategoryClick = (categoryName, index) => {
    setToggleState(index);
    fetchDataByCategory(categoryName);
  };

  const handleSubmit = async (e, searchValue) => {
    e.preventDefault();
    if (e && searchValue) {
      const response = await axiosInstance.get(`/prods`);

      const searchData = response.data;

      // Filter the data based on the search value
      const filteredData = searchData.filter((item) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      // Update the state with the filtered data
      setFilteredData(filteredData);
    } else {
      setFilteredData("");
      handleCategoryClick("BOISSON CHAUDE", 1);
    }
    // console.log(searchValue, filteredData);
  };

  const toggleInfo = {
    OpenOrderDetails,
    openOrderDetailsToggle,
    setOrderDetailsToggle,
    setControl,
    control,
    filteredData,
    handleSubmit,
  };
  return (
    <ToggleContext.Provider value={toggleInfo}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
