"use client";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import type { Session } from "next-auth";
import { useState } from "react";
import { HeaderMenu } from "../headerMenu/headerMenu";

type Props = {
  session: Session | null;
};

export const Header = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar component="nav">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleClick} sx={{ p: 0 }}>
                  {props.session && props.session.user ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={props.session.user.image ?? ""}
                    />
                  ) : (
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1-768x768.png"
                      }
                    />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            <TwitterIcon />
            <Typography
              variant="h5"
              noWrap
              sx={{
                ml: 1,
                display: { xs: "flex", md: "none" },
                flexGrow: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              sns
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <HeaderMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
    </>
  );
};
