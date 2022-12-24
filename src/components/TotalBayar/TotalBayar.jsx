import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import numberWithCommas from "../../utils/utils";
import { API_URL } from "../../utils/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TotalBayar({ keranjangs, history }) {
  const navigate = useNavigate();
  const totalBayar = keranjangs.reduce(function (result, item) {
    return result + item.total_harga;
  }, 0);

  const submitTotalBayar = (totalBayar) => {
    const pesanan = {
      total_bayar: totalBayar,
      menus: keranjangs,
    };
    if (keranjangs.length < 1) {
      swal({
        title: "Peringatan!",
        text: "Keranjang Tidak Boleh Kosong!",
        icon: "warning",
        button: false,
        timer: 700,
      });
    } else {
      swal({
        title: "Are you sure?",
        text: "Apakah pesanan sudah benar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willSuccess) => {
        if (willSuccess) {
          axios
            .post(API_URL + "pesanans", pesanan)
            .then((res) => {
              swal("Success!", {
                icon: "success",
                timer: 4000,
              }),
                navigate("/sukses");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  };

  return (
    <>
      {/* Web */}
      <div className="fixed-bottom d-none d-md-block">
        <div className="row">
          <div className="col-md-12 text-end">
            <p className="me-4 mb-0">
              Total Harga : <strong>Rp. {numberWithCommas(totalBayar)}</strong>
            </p>
            <button
              type="button"
              className="btn btn-dark col-lg-3 col-md-12 mb-2 mt-2"
              onClick={() => submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> BAYAR
            </button>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="d-block d-md-none">
        <div className="row">
          <div className="col-md-12 text-end">
            <p className="me-4 mb-0">
              Total Harga : <strong>Rp. {numberWithCommas(totalBayar)}</strong>
            </p>
            <button
              type="button"
              className="btn btn-dark col-12 mb-2 mt-2"
              onClick={() => submitTotalBayar(totalBayar)}
            >
              <FontAwesomeIcon icon={faShoppingCart} /> BAYAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TotalBayar;
