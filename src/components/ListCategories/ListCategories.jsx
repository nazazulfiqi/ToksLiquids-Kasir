import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faFaceFlushed,
  faFaceSmile,
  faFaceGrinHearts,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ nama }) => {
  if (nama === "Freebase")
    return <FontAwesomeIcon icon={faFaceGrinHearts} className="ms-2" />;
  if (nama === "Podsfriendly")
    return <FontAwesomeIcon icon={faFaceSmile} className="ms-2" />;
  if (nama === "Saltnic")
    return <FontAwesomeIcon icon={faFaceFlushed} className="ms-2" />;

  return <FontAwesomeIcon icon={faFaceGrinHearts} className="ms-2" />;
};

function ListCategories({ changeCategory, categoryDipilih }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        setCategories(categories);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(categories);
  return (
    <div className="col-md-12 col-lg-2">
      <h5>
        <strong className="text-dark">Daftar Kategori</strong>
      </h5>
      <hr />
      <ul className="list-group">
        {categories.map((category) => (
          <li
            // "list-group-item"
            className={
              categoryDipilih === category.nama
                ? "category-aktif list-group-item"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            key={category.id}
            onClick={() => changeCategory(category.nama)}
          >
            <Icon nama={category.nama} /> {category.nama}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCategories;
