import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

export function SakkozokPage() {
  const [sakkozok, setsakkozok] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    axios
      .get("https://chess.sulla.hu/chess")
      .then((res) => res.data)
      .then((data) => setsakkozok(data))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);
  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <p className="h1">Sakkozók</p>
          {sakkozok.map((sakkozo, index) => (
            <div className="card col-sm-3 d-inline-block" key={index}>
              <p className="h5">Név: {sakkozo.name}</p>
              <p className="text-weight-bold">
                Születési dátum: {sakkozo.birth_date}
              </p>
              <p>Megnyert világbajnokságok: {sakkozo.world_ch_won}</p>
              <div className="card-body">
                <NavLink key={sakkozo.id} to={"/chess/" + sakkozo.id}>
                  <img
                    alt={sakkozo.name}
                    className="img-fluid"
                    style={{ maxHeight: 200 }}
                    src={
                      sakkozo.image_url
                        ? sakkozo.image_url
                        : "https://via.placeholder.com/400x800"
                    }
                  />
                </NavLink>
                <br />
                <NavLink to={sakkozo.profile_url} target="_blank">
                  Wikipédia link
                </NavLink>
                <br />
                <NavLink to={"/szerkeztes-sakkozo/" + sakkozo.id}>
                  <button className="btn btn-warning">Szerkeztés</button>
                </NavLink>{" "}
                &nbsp;&nbsp;
                <NavLink to={"/torles-sakkozo/" + sakkozo.id}>
                  <button className="btn btn-danger">Törlés</button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default SakkozokPage;
