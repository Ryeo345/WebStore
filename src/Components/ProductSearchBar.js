import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

const ProductSearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (ev) => {
    const searchWord = ev.target.value;
    setWordEntered(searchWord);
    let newFilter = data.filter((obj) => {
      return obj.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <span className="searchIcon">
          {filteredData.length == 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </span>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 10).map((obj) => {
            return (
              <Link
                key={obj.id}
                className="dataItem"
                to={`/products/${obj.id}`}
                onClick={() => {
                  clearInput();
                }}
              >
                <p>{obj.name}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductSearchBar;
