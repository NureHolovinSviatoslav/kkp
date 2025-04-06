import { Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";
import ACLWrapper from "../components/ACLWrapper";
import { ACL } from "../utils/ACL";

export const Nav = () => {
  return (
    <div
      style={{
        marginBottom: "35px",
      }}
    >
      <div className="nav">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: ".5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gridTemplateRows: "auto auto",
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
              Перегляд:
            </p>
            <div style={{ height: "auto" }}>
              <ButtonGroup variant="contained">
                <ACLWrapper fallback={null} {...ACL.users}>
                  <Link to="/users">
                    <Button>Користувачі</Button>
                  </Link>
                </ACLWrapper>

                <Link to="/order">
                  <Button>2</Button>
                </Link>
              </ButtonGroup>
            </div>

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                margin: ".5rem",
              }}
            >
              Звіти:
            </p>
            <div>
              <ButtonGroup variant="contained">
                <Link to="/stats/orders">
                  <Button>1</Button>
                </Link>
              </ButtonGroup>
            </div>

            <p
              style={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                margin: ".5rem",
              }}
            >
              Графіки:
            </p>
            <div>
              <ButtonGroup variant="contained">
                <Link to="/stats/orders">
                  <Button>1</Button>
                </Link>
              </ButtonGroup>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexDirection: "column",
            }}
          >
            <Link to="/">
              <Button variant="contained" color="success">
                Головна
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="contained" color="success">
                Профіль
              </Button>
            </Link>
          </div>
        </div>

        <div
          style={{
            border: "3px solid #ccc",
            margin: "0.5rem 0 0 0 ",
          }}
        />
      </div>
    </div>
  );
};
