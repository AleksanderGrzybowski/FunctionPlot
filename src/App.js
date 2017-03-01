import React, { Component } from 'react';

import { Layer, Stage, Line, Group, Text } from 'react-konva';
import math from 'mathjs';
import { gridLines, mapXToCanvasCoords, mapYToCanvasCoords } from './plot';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expression: 'sin(x)',
            xMin: -5,
            xMax: 10,
            yMin: -5,
            yMax: 5
        };
    }

    handleChange = (e) => {
        this.setState({expression: e.target.value});
    };

    render() {
        const ctx = {
            width: this.props.width, xMin: this.state.xMin, xMax: this.state.xMax,
            height: this.props.height, yMin: this.state.yMin, yMax: this.state.yMax
        };
        const grid = [
            ...gridLines(this.state.xMin, this.state.xMax, this.props.gridLines)
                .map(x => {
                    const position = mapXToCanvasCoords(ctx, x);
                    return (
                        <Group>
                            <Line points={[position, 0, position, this.props.height]} stroke="gray"/>
                            <Text x={position - 10} y={mapYToCanvasCoords(ctx, 0)} text={x.toFixed(2)}/>
                        </Group>
                    );
                })
            ,
            ...gridLines(this.state.yMin, this.state.yMax, this.props.gridLines)
                .map(y => {
                    const position = mapYToCanvasCoords(ctx, y);
                    return (
                        <Group>
                            <Line points={[0, position, this.props.width, position]} stroke="gray"/>
                            <Text x={mapXToCanvasCoords(ctx, 0)} y={position} text={y.toFixed(2)}/>
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
        for (let x = this.state.xMin; x < this.state.xMax; x += (this.state.xMax - this.state.xMin) / 100) {
            let y;
            try {
                y = math.eval(this.state.expression, {x});
            } catch (e) {
                y = 0;
            }

            plot = [...plot, mapXToCanvasCoords(ctx, x), mapYToCanvasCoords(ctx, y)];
        }

        return (
            <div id="lol" onWheel={() => console.log('wheel !!!')}>
                <input type="text" value={this.state.expression} onChange={this.handleChange}/>
                <Stage width={this.props.width} height={this.props.height}>
                    <Layer>
                        {grid}
                        {axes}
                        <Line points={plot} stroke="blue"/>
                    </Layer>
                </Stage>
            </div>
        )
    }

}

export default App;
