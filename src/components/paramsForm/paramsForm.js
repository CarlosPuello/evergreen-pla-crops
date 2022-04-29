import React from "react";
import Modal from "react-modal";
import axios from "axios";
import "./paramsForm.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function ParamsForm(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [name, setName] = React.useState("");
  const [plotId, setPlotId] = React.useState("");
  const [status, setStatus] = React.useState("");

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let crop = {
      type: type,
      name: name,
      plotId: plotId,
      status: parseInt(status),
    };

    let headers = {
      accept: "text/plain",
      "Content-Type": "application/json",
    };

    axios
      .post("https://back-pla.herokuapp.com/api/v1/Crop", crop, {
        headers: headers,
      })
      .then((res) => {
        props.setList([...props.list, res.data.result]);
        closeModal();
      });
  }

  return (
    <div className="form-container">
      <button onClick={openModal} className="form-button">
        Add crop
      </button>
      <Modal
        appElement={document.getElementById("root")}
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Add crop"
        set
      >
        <form
          className="params-form modal"
          display="none"
          onSubmit={handleSubmit}
        >
          <div className="form-element">
            <input
              type="text"
              value={type}
              placeholder="Type"
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="form-element">
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-element">
            <input
              type="text"
              value={plotId}
              placeholder="Plot"
              onChange={(e) => setPlotId(e.target.value)}
            />
          </div>
          <div className="form-element">
            <input
              type="number"
              value={status}
              placeholder="Status"
              onChange={(e) => setStatus(e.target.value)}
            />
          </div>
          <button className="form-button">Add crop</button>
          <button
            onClick={closeModal}
            className="form-button form-button_cancel"
          >
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
}
export default ParamsForm;
