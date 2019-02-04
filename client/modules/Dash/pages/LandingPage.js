import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import graphImage from '../../../assets/graph.png';
import searchImage from '../../../assets/search.png';
import statsImage from '../../../assets/stats.png';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router';
import anime from 'animejs';


const landingStyle = css`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;

  a {
    text-decoration: none;
  }
`;

const textContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px;

  p {
    color: grey;
    margin: 10px;
  }
`;

class LandingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      loaded: false,
    };
    this.loadCount = 0;
  }

  // componentDidMount = () => {

  // };

  onLoadHandler = () => {
    this.loadCount++;
    if (this.loadCount === 3) {
      this.setState({ loaded: true });
    }
  }

  componentDidUpdate(prevState) {
    if (!prevState.loaded) {
      this.animateIn();
    }
  }

  animateIn = () => {
    anime({
      targets: 'img',
      opacity: [0, 1],
      scale: [0, 1],
      duration: 1200,
      // delay: 500,
      delay: anime.stagger(300),
    });
  }

  render() {
    const { loaded } = this.state;

    return (
      <div css={landingStyle}>
        <div
          css={css`
            display: flex;
            visibility: ${loaded ? 'visible' : 'hidden'};
            justify-content: center;
            img {
              margin: 30px;
              width: 150px;
              height: 150px;
            }
          `}
        >
          <img src={graphImage} onLoad={this.onLoadHandler} alt="graph" />
          <img src={searchImage} onLoad={this.onLoadHandler} alt="search" />
          <img src={statsImage} onLoad={this.onLoadHandler} alt="stats" />
        </div>
        <div css={textContainer}>
          <h1>Your Customizable Financial Application</h1>
          <p>Leveraging Plaid and the MERN stack</p>
        </div>
        <Link to="/dash">
          <Fab color="primary" variant="extended">Open Dashboard</Fab>
        </Link>
      </div>
    );
  }
}

export default LandingPage;

