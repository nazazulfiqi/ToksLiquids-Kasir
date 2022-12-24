import axios from "axios";
import { useEffect, useState } from "react";
import "../App.css";
import Hasil from "../components/Hasil/Hasil";
import ListCategories from "../components/ListCategories/ListCategories";
import Menus from "../components/Menus/Menus";
import { API_URL } from "../utils/constants";
import swal from "sweetalert";

function Home() {
  const [menus, setMenus] = useState([]);
  const [categoryDipilih, setCategoryDipilih] = useState("Freebase");
  const [keranjangs, setKeranjangs] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL + `products?category.nama=${categoryDipilih}`)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log(error);
      });
    getListKeranjang();
  }, []);

  console.log(keranjangs);

  const getListKeranjang = () => {
    axios
      .get(API_URL + `keranjangs`)
      .then((res) => {
        const keranjangs = res.data;
        setKeranjangs(keranjangs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeCategory = (value) => {
    setCategoryDipilih(value);
    setMenus([]);
    axios
      .get(API_URL + `products?category.nama=${value}`)
      .then((res) => {
        const menus = res.data;
        setMenus(menus);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleKeranjang = (value) => {
    axios
      .get(API_URL + `keranjangs?product.id=${value.id}`)
      .then((res) => {
        if (res.data.length === 0) {
          const keranjangSementara = {
            jumlah: 1,
            total_harga: value.harga,
            product: value,
          };
          axios
            .post(API_URL + `keranjangs`, keranjangSementara)
            .then((res) => {
              getListKeranjang();
              swal({
                title: "Sukses!",
                text:
                  keranjangSementara.product.nama +
                  " Berhasil Masuk Keranjang!",
                icon: "success",
                buttons: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const keranjangSementara = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value,
          };
          axios
            .put(API_URL + `keranjangs/${res.data[0].id}`, keranjangSementara)
            .then((res) => {
              getListKeranjang();
              swal({
                title: "Sukses!",
                text:
                  keranjangSementara.product.nama +
                  " Berhasil Masuk Keranjang!",
                icon: "success",
                buttons: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="container-fluid home mt-3 ">
        <div className="row">
          <ListCategories
            changeCategory={changeCategory}
            categoryDipilih={categoryDipilih}
          />
          <div className="col-12 col-lg-7">
            <h5>
              <strong className="text-dark">Daftar Produk</strong>
            </h5>
            <hr />
            <div className="mt-2 d-flex flex-wrap menu overflow-auto">
              {menus &&
                menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    handleKeranjang={handleKeranjang}
                  />
                ))}
            </div>
          </div>
          <Hasil keranjangs={keranjangs} getListKeranjang={getListKeranjang} />
        </div>
      </div>
    </>
  );
}

export default Home;
