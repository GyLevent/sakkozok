import React, { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";

export function Torles(props) {
  const params = useParams();
  const id = params.chessId;
  const navigate = useNavigate();
  const [sakkozo, setsakkozo] = useState([]);
  const [isPending, setPending] = useState(false);
  useEffect(() => {
    setPending(true);
    (async () => {
      try {
        const res = await fetch(`https://chess.sulla.hu/chess/${id}`);
        const sakkres = await res.json();
        setsakkozo(sakkres);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    })();
  }, [id]);
  return (
    <div className="p-5 m-auto text-center content bg-lavender">
      {isPending || !sakkozo.id ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="card p-3">
          <div className="card-body">
            <h5 className="card-title">Törlendő elem neve: {sakkozo.name}</h5>
            <div className="lead">Születési idő: {sakkozo.birth_date}</div>
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
          <form
            onSubmit={(event) => {
              event.persist();
              event.preventDefault();
              fetch(`https://chess.sulla.hu/chess/${id}`, {
                method: "DELETE",
              })
                .then(() => {
                  navigate("/");
                })
                .catch(console.log);
            }}
          >
            <div>
              <NavLink to={"/"}>
                <button className="btn btn-secondary">&nbsp;Mégsem</button>
              </NavLink>
              &nbsp;&nbsp;
              <button className="btn btn-danger">&nbsp;Törlés</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
export default Torles;
