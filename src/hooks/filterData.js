import axios from "axios";
import { useEffect, useState } from "react";

export default function useFilterData(url) {
  const [maxVal, setMax] = useState(1000);
  const [minVal, setMin] = useState(15);
  const [selectedValue, setValue] = useState([minVal, maxVal]);
  const [sortKey, setSortKey] = useState("");
  const [products, setData] = useState([]);
  const [loadProducts, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`https://hazal.ps/admin/api/${url}`);
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      const maxPrice = products.reduce((prev, current) =>
        prev.price_nis_retail > current.price_nis_retail ? prev : current
      );
      const minPrice = products.reduce((prev, current) =>
        prev.price_nis_retail < current.price_nis_retail ? prev : current
      );
      setMax(maxPrice.price_nis_retail);
      setMin(minPrice.price_nis_retail);
      setValue([minPrice.price_nis_retail, maxPrice.price_nis_retail]);
    }
    console.log(maxVal, minVal, selectedValue);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [url]);

  return {
    products,
    loadProducts,
    maxVal,
    setMax,
    minVal,
    setMin,
    selectedValue,
    setValue,
    sortKey,
    setSortKey,
  };
}
