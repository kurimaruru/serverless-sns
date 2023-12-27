import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import type { Session } from "next-auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function fetchSession(cookie: string): Promise<Session | null> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });
  const session = (await response.json()) as Session;
  return Object.keys(session).length > 0 ? session : null;
}
type ValidSession = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
  appAccessToken: string;
};
const isValidSession = (session: Session | null): session is ValidSession => {
  if (session) {
    // サンプルコードなので手抜きしているが実際はちゃんと型検査をする
    if (
      session.user?.name != null &&
      session.user.email != null &&
      session.user.image != null
    ) {
      return true;
    }
  }
  return false;
};
const _Home = async () => {
  const session = await fetchSession(headers().get("cookie") ?? "");

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
