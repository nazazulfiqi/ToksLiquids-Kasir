import {
  faMinus,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import numberWithCommas from "../../utils/utils";

function ModalKeranjang({
  showModal,
  handleClose,
  keranjangDetail,
  jumlah,
  keterangan,
  tambahJumlah,
  kurangJumlah,
  handleChangeKeterangan,
  handleSubmit,
  totalHarga,
  handleHapusPesanan,
}) {
  return (
    <>
      {keranjangDetail ? (
        <>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {keranjangDetail.product.nama}{" "}
                <strong>
                  (Rp. {numberWithCommas(keranjangDetail.product.harga)})
                </strong>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Total Harga : </Form.Label>
                  <strong>
                    <p>Rp. {numberWithCommas(totalHarga)}</p>
                  </strong>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Jumlah : </Form.Label>
                  <br />

                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => kurangJumlah()}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </Button>
                  <strong className="mx-2">{jumlah}</strong>
                  <Button
                    variant="dark"
                    size="sm"
                    onClick={() => tambahJumlah()}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Alamat : </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="keterangan"
                    placeholder="co: jl bukit no.18"
                    value={keterangan}
                    onChange={(e) => handleChangeKeterangan(e)}
                  />
                </Form.Group>
                <Button variant="dark" type="submit">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Simpan
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => handleHapusPesanan(keranjangDetail.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="me-2" />
                Hapus Pesanan
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Kosong</Modal.Title>
              </Modal.Header>
              <Modal.Body>Kosong</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="dark" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        </>
      )}
    </>
  );
}

export default ModalKeranjang;
