import React from "react";
import numberWithCommas from "../../utils/utils";

function Menus({ menu, handleKeranjang }) {
  return (
    <>
      <div className="col-lg-4 col-md-4 col-6">
        <div
          className="card mx-2 mb-4 shadow border-0"
          onClick={() => handleKeranjang(menu)}
        >
          <img
            src={
              "assets/images/" +
              menu.category.nama.toLowerCase() +
              "/" +
              menu.gambar
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <p className="card-title">
              {menu.nama} <strong>({menu.kode})</strong>
            </p>
            <p className="card-text">Rp. {numberWithCommas(menu.harga)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menus;
