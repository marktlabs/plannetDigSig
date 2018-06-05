import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: flex;
  background: darkred;
  height: 300px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Navcomponent = styled.nav`
  position: absolute;
  top: 0;
  background: teal;
  width: 100%;
  height: 100px;
  text-align: center;
`;

const Display = styled.div`
  color: white;
  font-size: 3em;
`;

const Button = styled.button`
  width: 100px;
  height: 100px;
  font-size: 3em;
`;

class App extends Component {
  state = {
    poncho: 1
  };

  increasePoncho = () => {
    this.setState({
      poncho: this.state.poncho + 1
    });
  };

  reducePoncho = () => {
    this.setState({
      poncho: this.state.poncho - 1
    });
  };

  render() {
    return (
      <Layout>
        <Navbar incr={this.increasePoncho} reduce={this.reducePoncho} />
        <Display>{this.state.poncho}</Display>
      </Layout>
    );
  }
}

const Navbar = ({ incr, reduce }) => (
  <Navcomponent>
    <Buttons incr={incr} reduce={reduce} />
  </Navcomponent>
);

const Buttons = ({ incr, reduce }) => (
  <Fragment>
    <Button onClick={() => reduce()}>-</Button>
    &nbsp;
    <Button onClick={() => incr()}>+</Button>
  </Fragment>
);

render(<App />, document.getElementById("root"));
