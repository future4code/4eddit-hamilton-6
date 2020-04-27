import React, { Fragment } from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import Header from "../Header";
import Footer from "../../components/Footer";




const routes = {
  root: "/"
  // Outras rotas aqui
};

function Router(props) {
  return (
    <Fragment>
    <Header/>
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.root} component={LoginPage} />
      </Switch>
    </ConnectedRouter>
    <Footer/>
    </Fragment>

  );
}

export default Router;
