import React from 'react';
import { render } from 'react-dom';
import { TweenMax, TimelineMax, Back } from 'gsap';

import styled from 'styled-components';

const sparkleGrowColors = [
  '#9E31E2',
  '#9E31E2',
  '#9E31E2',
  '#92E8C5',
  '#CDEB8E',
  '#2AD492',
  '#D79DF3',
];
const sparkleMoveColors = [
  '#E187D2',
  '#E0A3FF',
  '#F5BB30',
  '#9ECA98',
  '#35A0F0',
  '#BADAB0',
  '#33B6E9',
];

const IconWrapper = styled.div`
  position: relative;
  height: 35px;
  width: 35px;
  overflow: hidden;

  svg {
    transform: translateX(calc(-25% - 7.5px)) translateY(calc(-25% - 7.5px));
  }
`;

class Heart extends React.Component {
  componentDidMount() {
    TweenMax.set('svg', {
      visibility: 'visible',
    });

    const tl = new TimelineMax({ paused: true });
    tl.from('#pinkDot', 1, {
      attr: {
        r: 0,
      },
    })
      .set(
        '#greyHeart',
        {
          fill: 'none',
        },
        '-=0.99',
      )
      .to(
        '#pinkDot',
        1,
        {
          fill: '#CD8FF7',
        },
        '-=1',
      )
      .to(
        '#hole',
        1,
        {
          attr: {
            r: 67,
          },
        },
        '-=0.5',
      )
      .from(
        '#pinkHeart',
        1.6,
        {
          scale: 0,
          transformOrigin: '50% 50%',
          ease: Back.easeOut.config(1.2),
        },
        '-=0.5',
      )
      .set(
        ['#sparkleGrowGroup', '#sparkleMoveGroup'],
        {
          alpha: 1,
        },
        '-=1.5',
      )
      .to(
        '#sparkleGrowGroup',
        1,
        {
          scale: 1.5,
          transformOrigin: '50% 50%',
        },
        '-=1.5',
      )
      .to(
        '#sparkleMoveGroup',
        1,
        {
          scale: 1.2,
          transformOrigin: '50% 50%',
        },
        '-=1.5',
      )
      .staggerTo(
        '#sparkleGrowGroup circle',
        2,
        {
          attr: {
            r: 0,
          },
          cycle: {
            fill: function(i) {
              return sparkleGrowColors[i];
            },
          },
        },
        0,
        '-=0.9',
      )
      .staggerTo(
        '#sparkleMoveGroup circle',
        0.8,
        {
          attr: {
            r: 0,
          },
          cycle: {
            fill: function(i) {
              return sparkleMoveColors[i];
            },
          },
        },
        0,
        '-=2',
      );

    tl.timeScale(4);

    this.tl = tl;
  }

  componentDidUpdate(props) {
    if (this.props.liked && !props.liked) {
      this.tl.play(0);
    } else {
      this.tl.pause(0);
    }
  }

  render() {
    return (
      <IconWrapper>
        <svg
          class="heartSVG"
          viewBox="0 0 600 600"
          enable-background="new 0 0 600 600"
          xmlSpace="preserve"
          style={{
            width: 100,
            height: 100,
            visibility: 'hidden',
          }}
        >
          <defs>
            <mask id="dotMask">
              <circle id="whiteDot" fill="#FFFFFF" cx="300" cy="300.5" r="66" />
              <circle id="hole" cx="300" cy="300.5" r="0" />
            </mask>
            <path
              id="heart"
              d="M318.2,259.5c-7.5,0-14.2,3.7-18.2,9.5c-4-5.7-10.7-9.5-18.2-9.5
          c-12.3,0-22.3,10-22.3,22.3c0,30.4,31.6,58.7,40.5,58.7s40.5-28.4,40.5-58.7C340.5,269.5,330.5,259.5,318.2,259.5z"
            />
          </defs>
          <use id="greyHeart" xlinkHref="#heart" fill="#AAB8C2" />
          <use id="pinkHeart" xlinkHref="#heart" fill="#E2264D" />

          <g mask="url(#dotMask)">
            <circle id="pinkDot" fill="#E52951" cx="300" cy="300.5" r="66" />
          </g>
          <g id="sparkleGrowGroup" opacity="0">
            <circle fill="#91D1F9" cx="310.7" cy="239" r="5" />
            <circle fill="#91D1F9" cx="235.7" cy="305" r="5" />
            <circle fill="#8CE9C4" cx="254.7" cy="252" r="5" />
            <circle fill="#8CE9C4" cx="359.7" cy="322" r="5" />
            <circle fill="#F48DA6" cx="332.7" cy="361" r="5" />
            <circle fill="#CB8EF4" cx="357.7" cy="267" r="5" />
            <circle fill="#91D1F9" cx="273.7" cy="363" r="5" />
          </g>
          <g id="sparkleMoveGroup" opacity="0">
            <circle fill="#91D1F9" cx="300.7" cy="229" r="5" />
            <circle fill="#91D1F9" cx="263.7" cy="353" r="5" />
            <circle fill="#8CE9C4" cx="243.7" cy="257" r="5" />
            <circle fill="#8CE9C4" cx="367.7" cy="312" r="5" />
            <circle fill="#F48DA6" cx="320.7" cy="353" r="5" />
            <circle fill="#CB8EF4" cx="233.7" cy="317" r="5" />
            <circle fill="#CB8EF4" cx="353.7" cy="255" r="5" />
          </g>

          <use id="hit" xlinkHref="#heart" fill="red" opacity="0" />
        </svg>
      </IconWrapper>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      liked: false,
    };
  }

  render() {
    return (
      <div>
        <Heart liked={this.state.liked} />
        <button onClick={() => this.setState({ liked: !this.state.liked })}>
          {this.state.liked ? 'unlike' : 'like'}
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
