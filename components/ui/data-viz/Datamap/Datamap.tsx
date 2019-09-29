import * as React from 'react';
import styled from 'styled-components';

let Datamaps: any;
let currentMap: any;

const Datamap = styled.div`
	width: 100%;
`;

const MAP_CLEARING_PROPS = [
    'height', 'scope', 'setProjection', 'width'
];

const propChangeRequiresMapClear = (oldProps: any, newProps: any) => {
    return MAP_CLEARING_PROPS.some((key) =>
        oldProps[key] !== newProps[key]
    );
};

interface DatamapProps {
    arc?: Array<Object>;
    arcOptions?: Object;
    bubbleOptions?: Object;
	bubbles?: Array<Object>;
	geography?: Object;
	geographyOptions: Object;
    data: Object;
    graticule: Boolean;
    height?: number;
    labels?: Boolean;
    responsive: Boolean;
    style?: Object;
    updateChoroplethOptions: Object;
};

class DatamapCompo extends React.Component<DatamapProps> {
    constructor(props: DatamapProps) {
        super(props);
    }

    componentDidMount() {
        Datamaps = require('datamaps');  // reference:  https://github.com/zeit/next.js/issues/219
		if (this.props.responsive) {
			window.addEventListener('resize', this.resizeMap);
		}
		this.drawMap();
    }
    
    componentWillReceiveProps(newProps) {
		if (propChangeRequiresMapClear(this.props, newProps)) {
			this.clear();
		}
    }
    
    componentDidUpdate() {
		this.drawMap();
    }
    
    componentWillUnmount() {
		this.clear();
		if (this.props.responsive) {
			window.removeEventListener('resize', this.resizeMap);
		}
    }
    
    clear() {
		const { container } = this.refs;

		for (const child of Array.from(container.childNodes)) {
			container.removeChild(child);
		}

        // delete currentMap;
        currentMap = null;
    }
    
    drawMap() {
		const {
			arc,
			arcOptions,
			bubbles,
			bubbleOptions,
			geography,
			geographyOptions,
			data,
			graticule,
			labels,
			updateChoroplethOptions,
			...props
		} = this.props;

		let map = currentMap;

		if (!map) {
			map = currentMap = new Datamaps({
				...props,
				data,
				element: this.refs.container
			});
		} else {
			map.updateChoropleth(data, updateChoroplethOptions);
		}

		if (arc) {
			map.arc(arc, arcOptions);
		}

		if (bubbles) {
			map.bubbles(bubbles, bubbleOptions);
		}

		if (graticule) {
			map.graticule();
		}

		if (labels) {
			map.labels();
		}

	}

    resizeMap() {
		currentMap.resize();
	}

    public render() {
        const style = {
			height: '100%',
			position: 'relative',
			width: '100%',
			...this.props.style
        } as React.CSSProperties;
        
        return (
            <div>
                <Datamap>
                    <div ref="container" style={style} />
                </Datamap>
            </div>
        );
    }
};

export default DatamapCompo;