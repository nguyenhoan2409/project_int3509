import PropTypes from "prop-types";
import { forwardRef } from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useTheme } from "@mui/material/styles";
import RouterLink from "../router-link";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <Box
      component="img"
      src="/assets/logo-text.png" // => your path
      sx={{ width: "100%", height: 80, objectFit: "cover", cursor: "pointer", ...sx }}
    />
  );

  // const logo = (
  //   <Box
  //     ref={ref}
  //     component="div"
  //     sx={{
  //       width: 150,
  //       height: 150,
  //       display: "inline-flex",
  //       ...sx,
  //     }}
  //     {...other}
  //   >
  //     <Box
  //       component="img"
  //       src="/assets/logo-text.png"
  //       sx={{ width: "100%", height: "100%", objectFit: "cover" }}
  //       loading="lazy"
  //     />
  //   </Box>
  // );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/admin/dashboard" sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
