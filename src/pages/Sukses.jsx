import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/constants";

function Sukses() {
  useEffect(() => {
    axios
      .get(API_URL + `keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        keranjangs.map(function (item) {
          return axios
            .delete(API_URL + "keranjangs/" + item.id)
            .then((res) => {
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mt-4 text-center">
      <img src="assets/images/sukses.svg" alt="" width={300} />
      <h3 className="mt-3">Pesanan Sukses!</h3>
      <p>Terimakasih Sudah Memesan</p>
      <Link to={"/"}>
        <button type="button" className="btn btn-dark btn-sm">
          Kembali
        </button>
      </Link>
    </div>
  );
}

export default Sukses;
