import * as React from 'react';
import Head from 'next/head';
import { fonts } from "../constants/constants";

export const HeadStyle = () => (
  <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta charSet="utf-8" />
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
    <style type="text/css" >
      {`
        * {
          font-family: ${fonts.headerFont};
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        // data-visualization part
        //// Geographic Component
        svg.datamap {
          overflow: overlay !important;
        }

        //// media campaign clusterview
        .circle-overlay {
          font-size: 14px;
          border-radius: 50%;
          position: absolute;
          overflow: hidden;
          /*it's buggy with the foreignObject background right now*/
          /*background-color: rgba(255,255,255,0.5);*/
        }
        .circle-overlay__inner {
          padding-top: 3px;
          text-align: center;
          width: 100%;
          height: 100%;
        }
        .circle-overlay__body {
          font-size: 14px;
        }

        .cloud-overlay {
          font-size: 14px;
          border-radius: 50%;
          position: absolute;
          overflow: hidden;
          /*it's buggy with the foreignObject background right now*/
          /*background-color: rgba(255,255,255,0.5);*/
        }
        .cloud-overlay__inner {
          padding-top: 3px;
          text-align: center;
          width: 100%;
          height: 100%;
        }
        .cloud-overlay__body {
          font-size: 14px;
        }
    
        .hidden {
          display: none;
        }
        .node-icon--faded {
          opacity: 0.5;
        }
        .legend-size circle {
          fill: rgb(31, 119, 180);
        }
        .overlayPopup {
          text-align: left;
          // opacity: 0.5;
          background-color: #eee !important;
          // background-image: url('https://www.artonicweb.com/learn/wp-content/uploads/2018/05/12-HERO-IMAGES-1024x536.jpg');
        }
        .overlayPopupImg {
          display: none;
        }

        .svg-tooltip {
          pointer-events: none;
        }
        .tooltip {
            padding: 10px;
            color: #000;
            background: #fff;
            border: solid 2px #000;
        }
        .lead {
            font-style: italic;
            font-weight: 600;
        }
        p {
            margin: 5px 0px;
        }
        polygon {
            pointer-events: none;
        }
      `}
    </style>
  </Head>
);