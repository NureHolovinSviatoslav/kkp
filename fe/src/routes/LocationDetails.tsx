import { useState } from "react";
import Loader from "../components/Loader";
import { useLocationQuery } from "../features/useLocationQuery";
import { useDetails } from "../utils/useDetails";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { Summarize } from "@mui/icons-material";

export const LocationDetails = () => {
  const [error, setError] = useState("");
  const { id, values, isLoading } = useDetails(useLocationQuery, setError);

  if (isLoading) {
    return <Loader />;
  }

  if (!values) {
    return (
      <div style={{ paddingInline: 10 }}>
        <h4
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBlock: 30,
          }}
        >
          Локацію не знайдено
        </h4>
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h4
          style={{
            textTransform: "uppercase",
            fontWeight: "bold",
            marginBlock: 30,
          }}
        >
          Деталі локації # {id}
        </h4>
      </div>

      <div style={{ color: "red", paddingBottom: 10 }}>
        {error && <>Щось пішло не так: {error}</>}
      </div>

      <div style={{ borderRadius: "5px", backgroundColor: "#f5f5f5" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: ".3fr 1fr",
            gap: "0.5rem 1rem",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Назва:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>{values.name}</p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Адреса:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            {values.address}
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Відповідальний:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            {values.responsible_username ? (
              <Link
                className="link"
                to={`/users/${values.responsible_username}`}
              >
                {values.responsible_username}
              </Link>
            ) : (
              "-"
            )}
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Максимальна місткість:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            {values.max_quantity}
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Звіт:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            <Link to={`/locations/report/${values.location_id}`}>
              <IconButton aria-label="report">
                <Summarize />
              </IconButton>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LocationDetails;
