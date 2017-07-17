import React, { Component } from 'react';
import { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, helper } from "react-stockcharts";
import d3 from 'd3';

var { BarSeries, LineSeries, AreaSeries, ScatterSeries, CircleMarker, SquareMarker, TriangleMarker } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY } = coordinates;

var { OHLCTooltip } = tooltip;
var { XAxis, YAxis } = axes;
var { fitWidth, TypeChooser } = helper;

class LineAndScatterChart extends React.Component {
    render() {
        var { data, type, width, ratio } = this.props;
        return (
            <ChartCanvas ratio={ratio} width={width} height={400}
                    margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
                    type={type}
                    pointsPerPxThreshold={1}
                    seriesName="MSFT"
                    data={data}
                    xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
                    xExtents={[new Date(2012, 3, 1), new Date(2012, 5, 2)]}>
                <Chart id={1}
                        yExtents={d => [d.high, d.low, d.AAPLClose, d.GEClose]}>
                    <XAxis axisAt="bottom" orient="bottom"/>
                    <YAxis
                        axisAt="right"
                        orient="right"
                        // tickInterval={5}
                        // tickValues={[40, 60]}
                        ticks={5}
                    />
                    <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={d3.timeFormat("%Y-%m-%d")} />
                    <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={d3.format(".2f")} />
                    <LineSeries
                        yAccessor={d => d.close} />
                    <ScatterSeries
                        yAccessor={d => d.close}
                        marker={CircleMarker}
                        markerProps={{ r: 3 }} />
                    <OHLCTooltip forChart={1} origin={[-40, 0]}/>
                </Chart>

                <CrossHairCursor />
            </ChartCanvas>

        );
    }
}

LineAndScatterChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    width: React.PropTypes.number.isRequired,
    ratio: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

LineAndScatterChart.defaultProps = {
    type: "svg",
};
LineAndScatterChart = fitWidth(LineAndScatterChart);

export default LineAndScatterChart;