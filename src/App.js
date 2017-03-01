import React, { Component } from 'react';

import { Layer, Stage, Line } from 'react-konva';
import math from 'mathjs';
import { gridLines, mapXToCanvasCoords, mapYToCanvasCoords } from './plot';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expression: 'sin(x)',
            xMin: -5,
            xMax: 5,
            yMin: -5,
            yMax: 5
        };
    }

    handleChange = (e) => {
        this.setState({expression: e.target.value});
    };

    render() {
        const size = 500;
        const grid = [
            ...gridLines(this.state.xMin, this.state.xMax, 10)
                .map(
                    x => mapXToCanvasCoords({
                        width: 500, xMin: this.state.xMin, xMax: this.state.xMax
                    }, x))
                .map(position => <Line points={[position, 0, position, size]} stroke="gray"/>)
            ,
            ...gridLines(this.state.yMin, this.state.yMax, 10)
                .map(
                    y => mapYToCanvasCoords({
                        height: 500, yMin: this.state.yMin, yMax: this.state.yMax
                    }, y))
                .map(position => <Line points={[1, position, size, position]} stroke="gray"/>)
        ];

        let axes = [
            <Line points={[1, size / 2, size, size / 2]} stroke="black"/>,
            <Line points={[size / 2, 1, size / 2, size]} stroke="black"/>
        ];

        const mapCoordX = x => size / 2 + x * 50;
        const mapCoordY = x => size / 2 - x * 50;

        let plot = [];
        for (let x = -5; x < 5; x += 0.01) {
            let x2;
            try {
                x2 = math.eval(this.state.expression, {x});
            } catch (e) {
                x2 = 0;
            }

            plot = [...plot, mapCoordX(x), mapCoordY(x2)];
        }

        return (
            <div id="lol" onWheel={() => console.log('wheel !!!')}>
                <input type="text" value={this.state.expression} onChange={this.handleChange}/>
                <Stage width={size} height={size}>
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
