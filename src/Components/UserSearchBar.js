import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
const UserSearchBar = ({ placeholder, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (ev) => {
    const searchWord = ev.target.value;
    setWordEntered(searchWord);
    let newFilter = data.filter((obj) => {
      return (obj.firstName + " " + obj.lastName)
        .toLowerCase()
        .includes(searchWord.toLowerCase());
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

  const update = () => {
    console.log("update");
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
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <Link
                  key={obj.id}
                  className="dataItem"
                  to={`/admin/users/${obj.id}`}
                  onClick={() => {
                    clearInput();
                  }}
                >
                  <p>{obj.firstName + " " + obj.lastName}</p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserSearchBar;
