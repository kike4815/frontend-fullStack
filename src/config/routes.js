import AdminHome from "../pages/Admin";
import AdminSign from "../pages/Admin/Signin";
import AdminUsers from '../pages/Admin/Users'
import AdminMenuWeb from '../pages/Admin/MenuWeb'
import AdminCourses from '../pages/Admin/Courses'
import AdminBlog from '../pages/Admin/Blog'

import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Error404 from "../pages/Error404";
import Courses from '../pages/Courses'
import Blog from '../pages/Blog'

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSign,
        exact: true,
      },
      {
        path:'/admin/users',
        component: AdminUsers,
        exact:true
      },
      {
        path:'/admin/menu',
        component:AdminMenuWeb,
        exact: true
      },
      {
        path:'/admin/courses',
        component:AdminCourses,
        exact:true
      },
      {
        path:'/admin/blog',
        component:AdminBlog,
        exact:true
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/contact",
        exact: true,
        component: Contact,
      },
      {
        path: "/courses",
        exact: true,
        component: Courses,
      },
      {
        path:'/blog',
        exact: true,
        component: Blog,
      },
      {
        path:'/blog/:url',
        exact: true,
        component: Blog,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
