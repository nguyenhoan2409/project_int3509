import { Link } from "react-router-dom";
import { Sidebar } from "~/Components/SideBar/Sidebar";
import "./Products.admin.css";
import { Box, Button, Typography } from "@mui/material";

export const ProductsManagement = ({ sideBarClick, handleClick }) => {
  return (
    <div className="products-management-admin">
      <Box
        sx={{
          textAlign: "center",
          p: 2,
          background: (theme) => theme.palette.grey["200"],
          color: (theme) => theme.palette.success.main,
        }}
      >
        <Typography variant="h5">Quản lý sản phẩm</Typography>
      </Box>

      <div className="products-container">
        <div className="scores-left">{sideBarClick ? <Sidebar /> : null}</div>
        <div className="products-right">
          <div className="products-navbar">
            <Button component={Link} variant={"contained"} to="/admin/products/list">
              Danh sách sản phẩm
            </Button>

            <Button component={Link} variant={"contained"} color="info" to="/admin/products/add">
              Thêm sản phẩm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
