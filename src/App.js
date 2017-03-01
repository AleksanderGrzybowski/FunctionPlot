import React, { Component } from 'react';

import { Layer, Stage, Line } from 'react-konva';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: 'Math.sin(x)'
        };
    }

    handleChange = (e) => {
        this.setState({code: e.target.value});
    };

    render() {
        const size = 500;
        let lines = [];
        for (let i = 0; i < size; i += size / 10) {
            lines.push(<Line points={[i, 1, i, size]} stroke="red"/>)
        }

        for (let i = 0; i < size; i += size / 10) {
            lines.push(<Line points={[1, i, size, i]} stroke="red"/>)
        }

        let axis = [
            <Line points={[1, size / 2, size, size / 2]} stroke="black"/>,
            <Line points={[size / 2, 1, size / 2, size]} stroke="black"/>
        ];

        const mapCoordX = x => size / 2 + x * 50;
        const mapCoordY = x => size / 2 - x * 50;

        let plot = [];
        for (let x = -5; x < 5; x += 0.01) {
            let x2;
            try {
                x2 = eval(this.state.code);
            } catch (e) {
                x2 = 1;
            }
            plot = [...plot, mapCoordX(x), mapCoordY(x2)];
        }

        return (
            <div id="lol" onWheel={() => console.log('wheel !!!')}>
                <input type="text" value={this.state.code} onChange={this.handleChange}/>
                <Stage width={size} height={size}>
                    <Layer>
                        {lines}
                        {axis}
                        <Line points={plot} stroke="blue"/>
                    </Layer>
                </Stage>
            </div>
        )
    }

}

export default App;
