import { useState, useEffect } from "react";

const useSearch = (initialData) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(initialData);

  useEffect(() => {
    const filtered = initialData.filter(
      (item) =>
        item.first_name.toLowerCase().includes(search.toLowerCase()) ||
        item.last_name.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  }, [search, initialData]);

  return { search, setSearch, filteredData };
};

export default useSearch;
