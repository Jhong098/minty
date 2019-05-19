import React, { useEffect, memo } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom';
import anime from 'animejs';
import graphImage from '../../../client/assets/graph.png';
import searchImage from '../../../client/assets/search.png';
import statsImage from '../../../client/assets/stats.png';


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

const LandingPage = () => {
  const animateIn = () => {
    anime({
      targets: 'img',
      opacity: [0, 1],
      scale: [0, 1],
      duration: 1200,
      delay: anime.stagger(300),
    });
  };

  useEffect(() => {
    animateIn();
  }, []);


  return (
    <div css={landingStyle}>
      <div
        css={css`
          display: flex;
          justify-content: center;
          img {
            opacity: 0;
            margin: 30px;
            width: 150px;
            height: 150px;
          }
        `}
      >
        <img src={graphImage} alt="graph" />
        <img src={searchImage} alt="search" />
        <img src={statsImage} alt="stats" />
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
};

export default memo(LandingPage);

