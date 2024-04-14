import SvgColor from "~/Components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: "Trang chủ",
    path: "/admin/dashboard",
    icon: icon("ic_analytics"),
  },
  {
    title: "Quản lý người dùng",
    path: "/admin/users",
    icon: icon("ic_user"),
  },
  {
    title: "Quản lý sản phẩm",
    path: "/admin/products/list",
    icon: icon("ic_cart"),
  },
  {
    title: "Quản lý yêu cầu",
    path: "/admin/request",
    icon: icon("ic_blog"),
  },
  {
    title: "Quản lý điểm",
    path: "/admin/scores/list",
    icon: icon("ic_lock"),
  },
];

export default navConfig;
