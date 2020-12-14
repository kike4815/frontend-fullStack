import React from "react";
import { Col, Row } from "antd";
import { Route, Switch } from "react-router-dom";
import MenuTop from "../components/Web/MenuTop";
import Footer from '../components/Web/Footer'

export default function LayoutBasic({ routes }) {
  return (
    <>
    <Row>
      <Col lg={4}/>
      <Col lg={16}>
        <MenuTop />
      </Col>
      <Col lg={4}/>
    </Row>
        <LoadRoutes routes={routes} />
        <Footer />
    </>
  );
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          path={route.path}
          key={index}
          component={route.component}
          exact={route.exact}
        />
      ))}
    </Switch>
  );
}
