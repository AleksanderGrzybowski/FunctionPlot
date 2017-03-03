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

export default class App extends Component {
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

    plotPoints() {
        const ctx = this.getCtx(), plot = [];

        const delta = (this.state.xMax - this.state.xMin) / this.props.numberOfPoints;
        for (let x = this.state.xMin; x < this.state.xMax; x += delta) {
            let y;
            try {
                y = math.eval(this.state.expression, {x});
            } catch (e) {
                y = 0;
            }

            plot.push(mapXToCanvasCoords(ctx, x));
            plot.push(mapYToCanvasCoords(ctx, y));
        }

        return plot;
    }

    plotAxes() {
        const ctx = this.getCtx();
        const x = mapXToCanvasCoords(ctx, 0);
        const y = mapYToCanvasCoords(ctx, 0);

        return [
            <Line points={[0, y, this.props.width, y]} stroke="black"/>,
            <Line points={[x, 0, x, this.props.height]} stroke="black"/>
        ];
    }

    plotGridLines() {
        const ctx = this.getCtx();

        const lineStyle = {
            stroke: "gray",
            strokeWidth: 1
        };

        return [
            ...gridLines(this.state.xMin, this.state.xMax)
                .map(x => {
                    const position = mapXToCanvasCoords(ctx, x);
                    return (
                        <Group>
                            <Line points={[position, 0, position, this.props.height]} {...lineStyle}/>
                            <Text x={position - 10} y={mapYToCanvasCoords(ctx, 0)} text={x.toFixed(2)}/>
                        </Group>
                    );
                }),
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
    }

    // Mouse events can only occur on elements, so this is needed.
    plotScrollHack() {
        return (
            <Rect
                x={0}
                y={0}
                width={this.props.width}
                height={this.props.height}
                fill="red"
                opacity={0}
            />
        );
    }

    plotControls() {
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
            <div style={controlsStyle}>
                <input type="text" value={this.state.expression} onChange={this.handleExpressionChange}/>
            </div>
        )
    }

    render() {
        const gridLines = this.plotGridLines();
        const plotLines = this.plotPoints();
        const axes = this.plotAxes();
        const scrollHack = this.plotScrollHack();
        const plotControls = this.plotControls();

        return (
            <div>
                {plotControls}
                <Stage width={this.props.width} height={this.props.height} onWheel={this.handleScroll}>
                    <Layer>
                        {gridLines}
                        {axes}
                        <Line points={plotLines} stroke="blue"/>
                        {scrollHack}
                    </Layer>
                </Stage>
            </div>
        )
    }
}
