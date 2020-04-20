import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Header from "../components/app/Header";
import SideBar from "../components/app/SideBar";
//import UserSuggestions from "./UserSuggestions";

import Home from "../pages/Home/index";
import Profile from "../pages/Profile/index";
import Post from "../pages/Posts/index";
import Messages from "../pages/Messages/index";
import People from "../pages/People/index";
import Notifications from "../pages/Notifications/index";
import Search from "../pages/Search/index";

import { useWindowSize } from "../components/hooks/useWindowSize";
import { useClickOutside } from "../components/hooks/useClickOutside";

import * as Routes from "../routes";

import theme from "../utils/theme";

import { useStore } from "../store";
import { SET_AUTH_USER } from "../constants/actions";

const Root = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  position: relative;
  @media (min-width: ${(p) => p.theme.screen.md}) {
    width: ${(p) => p.theme.screen.md};
  }
  @media (min-width: ${(p) => parseInt(p.theme.screen.lg, 10) + 20 + "px"}) {
    width: ${(p) => p.theme.screen.lg};
  }
`;

/**
 * Main layout of the app, when user is authenticated
 */
const AppLayout = ({ location, authUser }) => {
  const [{ auth }, dispatch] = useStore();

  const windowSize = useWindowSize();
  const isDesktop = windowSize.width >= parseInt(theme.screen.md, 10);
  const [isSideBarOpen, setIsSidebarOpen] = useState(isDesktop);

  const sideBarRef = useRef("");

  useEffect(() => {
    dispatch({ type: SET_AUTH_USER, payload: authUser });
  }, [dispatch, authUser]);

  useClickOutside(sideBarRef, () => {
    if (!isDesktop && isSideBarOpen) {
      setIsSidebarOpen(false);
    }
  });

  useEffect(() => {
    setIsSidebarOpen(isDesktop);
  }, [isDesktop]);

  useEffect(() => {
    return () => {
      if (!isDesktop) {
        setIsSidebarOpen(false);
      }
    };
  }, [location.pathname, isDesktop]);

  if (!auth.user) return null;

  return (
    <>
      <Header toggleSideBar={() => setIsSidebarOpen(!isSideBarOpen)} />

      <Root>
        <SideBar isOpen={isSideBarOpen} sideBarRef={sideBarRef} />

        <Switch>
          <Route exact path={Routes.HOME} component={Home} />

          <Route exact path={Routes.SEARCH} component={Search} />

          <Route exact path={Routes.PEOPLE} component={People} />

          <Route exact path={Routes.NOTIFICATIONS} component={Notifications} />

          <Route exact path={Routes.MESSAGES} component={Messages} />

          <Route exact path={Routes.USER_PROFILE} component={Profile} />

          <Route exact path={Routes.POST} component={Post} />
        </Switch>
      </Root>
    </>
  );
};

AppLayout.propTypes = {
  location: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default withRouter(AppLayout);
