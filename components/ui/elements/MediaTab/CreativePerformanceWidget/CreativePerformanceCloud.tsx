import * as React from 'react';
import styled from 'styled-components';
import Slider from "react-slick";
import Measure, { ContentRect } from "react-measure";
import { ClusterView } from "../../../../../components";
import { sizes, px, colors } from "../../../../../constants/constants";
import { labelMediumEmphasized } from '../../../../../constants/style-constants';
import { highestData, lowestData } from './ClusterData';


const CreativePerformanceCloud = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding-bottom: ${px(sizes.fine)};
`;

interface PerformanceCloudWrapProps {
  display?: string;
}
const PerformanceCloudWrap = styled.div`
  display: ${(props: PerformanceCloudWrapProps) => props.display}
`;

const NextArrowEle = styled.div`
  z-index: 100 !important;
  display: block !important;
  background: white !important;
  position: absolute !important;
  top: 5px !important;
  color: black !important;
  right: 0 !important;
  width: auto !important;
  height: auto !important;
  line-height: 20px !important;
  font-size: 20px !important;

  &:hover {
    color: ${colors.blueViking} !important;
  }

  &: before {
    content: none !important;
  }
`;

const PrevArrowEle = styled.div`
  z-index: 100 !important;
  display: block !important;
  background: white !important;
  position: absolute !important;
  top: 5px !important;
  color: black !important;
  left: 0 !important;
  width: auto !important;
  height: auto !important;
  line-height: 20px !important;
  font-size: 20px !important;

  &:hover {
    color: ${colors.blueViking} !important;
  }

  &:before {
    content: none !important;
  }
`;


function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <NextArrowEle
      className={className}
      onClick={onClick}
    >
      Lowest
    </NextArrowEle>
  );
}

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <PrevArrowEle
      className={className}
      onClick={onClick}
    >
      Highest
    </PrevArrowEle>
  );
}

interface CreativePerformanceCloudCompoState {
  cloudViewWidth: number;
  currentSlider: number;
}
class CreativePerformanceCloudCompo extends React.Component<{}, CreativePerformanceCloudCompoState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cloudViewWidth: 0,
      currentSlider: 0,
    }
  }

  private handleResize = (contentRect: ContentRect) => {
    this.setState({
      cloudViewWidth: (contentRect.entry && contentRect.entry.width) || 0,
    });
  };

  public render() {
    const { cloudViewWidth, currentSlider } = this.state;
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      afterChange: (current) => {
        this.setState({ currentSlider: current }, () => {
          this.forceUpdate();
        });
      },
    };

    return (
      <Measure bounds={true} onResize={this.handleResize}>
        {
          ({ measureRef }) => {
            return (
              <div ref={measureRef}>
                <CreativePerformanceCloud>
                  <Slider {...settings}>
                    <div>
                      <PerformanceCloudWrap key={'highest'}>
                        {
                          currentSlider == 0 &&
                          <ClusterView
                            key={'highest-clusterview'}
                            width={cloudViewWidth}
                            height={700}
                            data={highestData}
                            backgroundColor="#fff"
                            boxColor="#eee"
                            compareVal={18}
                          />
                        }
                      </PerformanceCloudWrap>
                    </div>
                    <div>
                      <PerformanceCloudWrap key={'lowest'}>
                        {
                          currentSlider == 1 && 
                          <ClusterView
                            key={'lowest-clusterview'}
                            width={cloudViewWidth}
                            height={700}
                            data={lowestData}
                            backgroundColor="#fff"
                            boxColor="#eee"
                            compareVal={18}
                          />
                        }
                      </PerformanceCloudWrap>
                    </div>
                  </Slider>
                </CreativePerformanceCloud>
              </div>
            )
          }
        }
      </Measure>
    );
  }
}

export default CreativePerformanceCloudCompo;
