import React from "react";
import { Layout, Menu } from "antd";
import { Link,withRouter } from "react-router-dom";
import { HomeOutlined,UserOutlined,MenuOutlined,BookOutlined,AccountBookOutlined } from "@ant-design/icons";

import "./SideMenu.scss";

function SideMenu(props) {
  const { Sider } = Layout;
  const {menuCollapsed, location} = props
  
  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/admin">
          <Link to="/admin">
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
  
        <Menu.Item key="/admin/users">
          <Link to="/admin/users">
          <UserOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/menu">
          <Link to="/admin/menu">
          <MenuOutlined />
            <span className="nav-text">Menu Web</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/courses">
          <Link to="/admin/courses">
          <BookOutlined />
            <span className="nav-text">Cursos</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/admin/blog">
          <Link to="/admin/blog">
          <AccountBookOutlined />
            <span className="nav-text">Posts</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(SideMenu)