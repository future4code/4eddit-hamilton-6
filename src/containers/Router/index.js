import React, { Fragment } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Header from "../Header";
import Footer from "../../components/Footer";
import FeedPage from "../FeedPage";




export const routes = {
  root: "/",
  feedPage: "/feed",
};

export default function Router(props) {
  return (
    <Fragment>
    <Header/>
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route exact path={routes.root} component={LoginPage} />
        <Route exact path={routes.feedPage} component={FeedPage} />
        {/* <Route path={routes.root} component={LoginPage} /> */}
      </Switch>
    </ConnectedRouter>
    <Footer/>
    </Fragment>

  );
}
