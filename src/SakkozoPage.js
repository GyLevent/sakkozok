import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import axios from "axios";

export function SakkozoPage() {
  const params = useParams();
  const id = params.chessId;
  const [sakkozo, setsakkozo] = useState([]);
  const [isPending, setPending] = useState(false);
  useEffect(() => {
    setPending(true);
    axios
      .get(`https://chess.sulla.hu/chess/${id}`)
      .then((res) => res.data)
      .then((data) => setsakkozo(data))
      .catch(console.log)
      .finally(() => {
        setPending(false);
      });
  }, [id]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !sakkozo.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3">
          <div className="card-body">
            <h5 className="card-title">Teljes neve: {sakkozo.name}</h5>
            <div className="lead">Születési dátuma: {sakkozo.birth_date}</div>
            <div className="lead">Világbajnokságok: {sakkozo.world_ch_won}</div>
            <img
              alt={sakkozo.name}
              className="img-fluid rounded"
              style={{ maxHeight: "500px" }}
              src={
                sakkozo.image_url
                  ? sakkozo.image_url
                  : "https://via.placeholder.com/400x800"
              }
            />
          </div>
          <div>
            <NavLink to={sakkozo.profile_url} target="_blank">
              {sakkozo.profile_url}
            </NavLink>
          </div>
          <br />
          <div>
            <NavLink to="/">
              <i className="bi bi-backspace"></i>
            </NavLink>{" "}
            &nbsp;&nbsp;&nbsp;
            <NavLink key="y" to={"/szerkeztes-sakkozo/" + sakkozo.id}>
              <i className="bi bi-pencil"></i>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
export default SakkozoPage;
