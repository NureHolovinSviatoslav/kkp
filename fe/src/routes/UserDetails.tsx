import { useState } from "react";
import Loader from "../components/Loader";
import { useUserQuery } from "../features/useUserQuery";
import { useDetails } from "../utils/useDetails";

export const UserDetails = () => {
  const [error, setError] = useState("");
  const { id, values, isLoading } = useDetails(useUserQuery, setError);

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
          Користувача не знайдено
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
          Деталі користувача # {id}
        </h4>
      </div>

      <div
        style={{
          color: "red",
          paddingBottom: 10,
        }}
      >
        {error && <>Щось пішло не так: {error}</>}
      </div>

      <div
        style={{
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
        }}
      >
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
            Логін:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            {values.username}
          </p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Роль:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>{values.role}</p>

          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              margin: ".5rem",
            }}
          >
            Телефон:
          </p>
          <p style={{ fontSize: "1.2rem", margin: ".5rem" }}>
            {values.phone ? (
              <a className="link" href={`tel:${values.phone}`}>
                {values.phone}
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
