import FlutterDashIcon from "@mui/icons-material/FlutterDash";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <AppBar component="nav">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://img.benesse-cms.jp/pet-cat/item/image/normal/f3978ebc-9030-49e7-aa5e-4a370a955e1b.jpg?w=1200&h=1200&resize_type=cover&resize_mode=force"
                />
              </IconButton>
            </Tooltip>
          </Box>
          <FlutterDashIcon />
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
  );
};
