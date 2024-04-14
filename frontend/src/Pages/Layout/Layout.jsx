import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { Footer } from "~/Components/Footer/Footer";
import { Navbar } from "~/Components/Navbar/Navbar";
import { usePathname } from "~/hooks/use-pathname";
import Header from "~/layouts/dashboard/header";
import Main from "~/layouts/dashboard/main";
import Nav from "~/layouts/dashboard/nav";
import "./Layout.css";

const Layout = ({ children }) => {
  const pathname = usePathname();

  console.log(`pathname`, pathname);

  const isAdmin = useMemo(() => pathname.includes("admin"), [pathname]);

  return (
    <React.Fragment>
      {isAdmin ? (
        <>
          {" "}
          <Header onOpenNav />
          <Box
            sx={{
              minHeight: 1,
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
            }}
          >
            <Nav openNav />

            <Main>
              {children}

              <Footer />
            </Main>
          </Box>
        </>
      ) : (
        <>
          <Navbar />
          <div>
            <div>
              <main>{children}</main>
            </div>
          </div>

          <Footer />
        </>
      )}
    </React.Fragment>
  );
};

export default Layout;
