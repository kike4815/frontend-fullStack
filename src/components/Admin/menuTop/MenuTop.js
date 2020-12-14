import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import Logaster from "../../../assets/img/jpg/espartano.jpg";
import {logout} from '../../../api/auth'

import "./MenuTop.scss";

const logoutUser =()=> {
  logout()
  window.location.reload()
}

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img
          className="menu-top__left-logo"
          src={Logaster}
          alt="Enric Pedrós"
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <CloseOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <PoweroffOutlined onClick={logoutUser}/>
        </Button>
      </div>
    </div>
  );
}
