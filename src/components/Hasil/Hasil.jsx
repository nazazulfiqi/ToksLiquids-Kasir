import React, { useState } from "react";
import numberWithCommas from "../../utils/utils";
import ModalKeranjang from "../ModalKeranjang/ModalKeranjang";
import TotalBayar from "../TotalBayar/TotalBayar";
import axios from "axios";
import swal from "sweetalert";
import { API_URL } from "../../utils/constants";

function Hasil({ keranjangs, getListKeranjang }) {
  const [showModal, setShowModal] = useState("");
  const [keranjangDetail, setKeranjangDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);

  const handleShow = (menuKeranjang) => {
    setShowModal(true);
    setKeranjangDetail(menuKeranjang);
    setJumlah(menuKeranjang.jumlah);
    setKeterangan(menuKeranjang.keterangan);
    setTotalHarga(menuKeranjang.total_harga);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const tambahJumlah = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(keranjangDetail.product.harga * (jumlah + 1));
  };

  const kurangJumlah = () => {
    if (jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalHarga(keranjangDetail.product.harga * (jumlah - 1));
    }
  };

  const handleChangeKeterangan = (e) => {
    setKeterangan(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();

    const data = {
      jumlah: jumlah,
      total_harga: totalHarga,
      product: keranjangDetail.product,
      keterangan: keterangan,
    };
    axios
      .put(API_URL + `keranjangs/${keranjangDetail.id}`, data)
      .then((res) => {
        getListKeranjang();
        swal({
          title: "Sukses Diupdate!",
          text: data.product.nama + " Update Pesanan Berhasil!",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleHapusPesanan = (id) => {
    handleClose();
    axios
      .delete(API_URL + `keranjangs/${id}`)
      .then((res) => {
        getListKeranjang();
        swal({
          title: "Sukses Dihapus!",
          text: keranjangDetail.product.nama + " Hapus Pesanan Berhasil!",
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="col-md-12 col-lg-3">
      <h5>
        <strong className="text-dark">Pesanan</strong>
      </h5>
      <hr />
      {keranjangs.length !== 0 && (
        <div className="card hasil overflow-auto">
          <ul className="list-group list-group-flush">
            {keranjangs.map((menuKeranjang) => (
              <li
                className="list-group-item"
                key={menuKeranjang.id}
                onClick={() => handleShow(menuKeranjang)}
              >
                <div className="row">
                  <div className="col-md-2">
                    <h6>
                      <span className="badge rounded-pill text-bg-success">
                        {menuKeranjang.jumlah}
                      </span>
                    </h6>
                  </div>
                  <div className="col-md-5">
                    <p>{menuKeranjang.product.nama}</p>
                    <p>{numberWithCommas(menuKeranjang.product.harga)}</p>
                  </div>
                  <div className="col-md-5">
                    <strong>
                      <p className="text-end">
                        Rp. {numberWithCommas(menuKeranjang.total_harga)}
                      </p>
                    </strong>
                  </div>
                </div>
              </li>
            ))}
            <ModalKeranjang
              handleClose={handleClose}
              showModal={showModal}
              keranjangDetail={keranjangDetail}
              jumlah={jumlah}
              keterangan={keterangan}
              tambahJumlah={tambahJumlah}
              kurangJumlah={kurangJumlah}
              handleChangeKeterangan={handleChangeKeterangan}
              handleSubmit={handleSubmit}
              totalHarga={totalHarga}
              handleHapusPesanan={handleHapusPesanan}
            />
          </ul>
        </div>
      )}

      <TotalBayar keranjangs={keranjangs} />
    </div>
  );
}

export default Hasil;
