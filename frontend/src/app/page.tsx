import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchSession, isValidSession } from "./hooks/session";

const _Home = async () => {
  const session = await fetchSession();

  if (isValidSession(session)) {
    redirect("/home");
  }

  return (
    <Grid
      container
      style={{ backgroundColor: "black", width: "100%", minHeight: "100vh" }}
    >
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <>
          <Button variant="contained">
            <Link
              href="/api/auth/callback/google"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        </>
      </Grid>
    </Grid>
  );
};

export default _Home;
