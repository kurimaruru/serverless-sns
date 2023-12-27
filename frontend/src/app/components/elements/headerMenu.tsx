import { Logout } from "@mui/icons-material";
import { Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { signOut } from "next-auth/react";

type Props = {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
};

export const HeaderMenu = (props: Props) => {
  const signOutHandler = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <Menu
      anchorEl={props.anchorEl}
      id="account-menu"
      open={props.open}
      onClose={props.handleClose}
      onClick={props.handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={props.handleClose}>
        <Avatar /> Profile
      </MenuItem>
      <Divider />
      <MenuItem onClick={signOutHandler}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );
};
