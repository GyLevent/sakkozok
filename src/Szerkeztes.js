import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export function Szerkeztes(props) {
  const params = useParams();
  const id = params.chessId;
  const navigate = useNavigate();
  const [sakkozo, setsakkozo] = useState({
    name: "",
    birth_date: "",
    world_ch_won: 0,
    profile_url: "",
    image_url: "",
  });
  useEffect(() => {
    const fetchChessData = async () => {
      try {
        const response = await axios.get(`https://chess.sulla.hu/chess/${id}`);
        setsakkozo(response.data);
      } catch (error) {
        console.log("Hiba az adatok lefetchelésében:", error);
      }
    };

    fetchChessData();
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setsakkozo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`https://chess.sulla.hu/chess/${id}`, sakkozo)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Hiba az adatok átírásában:", error);
      });
  };

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Szerkeztés</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Neve:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="name"
              className="form-control"
              defaultValue={sakkozo.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Születési dátum:</label>
          <div className="col-sm-9">
            <input
              type="date"
              name="birth_date"
              className="form-control"
              defaultValue={sakkozo.birth_date}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">világbajnokságok:</label>
          <div className="col-sm-9">
            <input
              type="number"
              name="world_ch_won"
              className="form-control"
              value={sakkozo.world_ch_won.toString()}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Wikipédia linkje:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="profile_url"
              className="form-control"
              defaultValue={sakkozo.profile_url}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Kép URL:</label>
          <div className="col-sm-9">
            <input
              type="text"
              name="image_url"
              className="form-control"
              defaultValue={sakkozo.image_url}
              onChange={handleInputChange}
            />
            <img src={sakkozo.image_url} height="200px" alt={sakkozo.name} />
          </div>
        </div>
        <button type="submit" className="btn btn-warning">
          Módosítás
        </button>
      </form>
    </div>
  );
}
export default Szerkeztes;
