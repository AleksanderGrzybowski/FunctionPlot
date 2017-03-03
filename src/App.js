import React, { Component } from 'react';

import { Layer, Stage, Line, Group, Text, Rect } from 'react-konva';
import math from 'mathjs';
import {
    gridLines,
    mapXToCanvasCoords,
    mapYToCanvasCoords,
    mapXToFunctionCoords,
    mapYToFunctionCoords,
    zoom
} from './plot';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expression: this.props.initialExpression,
            xMin: this.props.initialXrange[0],
            xMax: this.props.initialXrange[1],
            yMin: this.props.initialYrange[0],
            yMax: this.props.initialYrange[1],
        };
    }

    getCtx() {
        return {
            width: this.props.width, xMin: this.state.xMin, xMax: this.state.xMax,
            height: this.props.height, yMin: this.state.yMin, yMax: this.state.yMax
        };
    }

    handleExpressionChange = (e) => {
        this.setState({expression: e.target.value});
    };

    handleScroll = (e) => {
        const ctx = this.getCtx();

        this.setState(zoom({
            xMin: this.state.xMin,
            xMax: this.state.xMax,
            yMin: this.state.yMin,
            yMax: this.state.yMax,
            anchorX: mapXToFunctionCoords(ctx, e.evt.offsetX),
            anchorY: mapYToFunctionCoords(ctx, e.evt.offsetY),
            scale: (e.evt.deltaY < 0) ? this.props.zoomingScale : (1 / this.props.zoomingScale)
        }));
    };

    render() {
        const ctx = this.getCtx();
        const lineStyle = {
            stroke: "gray",
            strokeWidth: 1
        };
        const grid = [
            ...gridLines(this.state.xMin, this.state.xMax)
                .map(x => {
                    const position = mapXToCanvasCoords(ctx, x);
                    return (
                        <Group>
                            <Line points={[position, 0, position, this.props.height]} {...lineStyle}/>
                            <Text x={position - 10} y={mapYToCanvasCoords(ctx, 0)} text={x.toFixed(2)}/>
                        </Group>
                    );
                })
            ,
            ...gridLines(this.state.yMin, this.state.yMax)
                .map(y => {
                    const position = mapYToCanvasCoords(ctx, y);
                    return (
                        <Group>
                            <Line points={[0, position, this.props.width, position]} {...lineStyle}/>
                            <Text x={mapXToCanvasCoords(ctx, 0)} y={position - 5} text={y.toFixed(2)}/>
                        </Group>
                    )
                })
        ];

        const axes = [
            <Line points={[
                0,
                mapYToCanvasCoords(ctx, 0),
                this.props.width,
                mapYToCanvasCoords(ctx, 0)
            ]}
                  stroke="black"
            />,
            <Line points={[
                mapXToCanvasCoords(ctx, 0),
                0,
                mapXToCanvasCoords(ctx, 0),
                this.props.height
            ]}
                  stroke="black"
            />
        ];

        let plot = [];
        for (let x = this.state.xMin; x < this.state.xMax; x += (this.state.xMax - this.state.xMin) / this.props.numberOfPoints) {
            let y;
            try {
                y = math.eval(this.state.expression, {x});
            } catch (e) {
                y = 0;
            }

            plot = [...plot, mapXToCanvasCoords(ctx, x), mapYToCanvasCoords(ctx, y)];
        }

        // Mouse events can only occur on elements, so this is needed.
        const scrollHack = <Rect
            x={0}
            y={0}
            width={this.props.width}
            height={this.props.height}
            fill="red"
            opacity={0}
        />;

        const controlsStyle = {
            position: 'fixed',
            bottom: 0,
            right: 0,
            zIndex: 2,
            width: 200,
            height: 100,
            backgroundColor: 'lightblue'
        };

        return (
            <div>
                <div style={controlsStyle}>
                    <input type="text" value={this.state.expression} onChange={this.handleExpressionChange}/>
                </div>
                <Stage width={this.props.width} height={this.props.height} onWheel={this.handleScroll}>
                    <Layer>
                        {grid}
                        {axes}
                        <Line points={plot} stroke="blue"/>
                        {scrollHack}
                    </Layer>
                </Stage>
            </div>
        )
    }
}

export default App;
