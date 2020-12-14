import React, { useState } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuTop from "../components/Admin/menuTop";
import SideMenu from "../components/Admin/SideMenu";
import SignIn from "../pages/Admin/Signin";
import useAuth from "../hooks/useAuth";


import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { Header, Content, Footer } = Layout;
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const {user, isLoading} = useAuth()
  
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={SignIn} />;
        <Redirect to="/admin/login" />
      </>
    );
  }

  if(user && !isLoading){

    return (
      <Layout>
        <SideMenu menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">Enric Pedrós</Footer>
        </Layout>
      </Layout>
    );
  }
  return null
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          key={index}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
