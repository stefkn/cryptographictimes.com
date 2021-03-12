import React, { Component } from 'react';
import * as d3 from "d3";

const fetcher = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    if (res.status !== 200) {
      throw new Error(data.message)
    }
    return data
}

class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {apiResult: 'none'};
    }

    componentDidMount() {
        var that = this;

        let promise = fetcher(`/api/bitcoin`);

        promise.then(function(data){
            console.log(data);
            that.setState({apiResult: data.status})
            document.getElementById('main-chart').appendChild(that.renderChart(data.data.Data))
        })
    }

    renderChart(dataArray) {
        const formatDate = d3.utcFormat("%B %-d, %Y");
        const formatValue = d3.format(".2f");
        function formatChange() {
            const f = d3.format("+.2%");
            return (y0, y1) => f((y1 - y0) / y0);
          }
        const parseDate = d3.utcParse("%Y-%m-%d");

        var data = [
            {date: '2017-11-17', high: 171.389999, low: 169.639999, open: 171.039993, close: 170.149994},
            {date: '2017-11-20', high: 170.559998, low: 169.559998, open: 170.289993, close: 169.979996},
            {date: '2017-11-21', high: 173.699997, low: 170.779999, open: 170.779999, close: 173.139999},
            {date: '2017-11-22', high: 175, low: 173.050003, open: 173.360001, close: 174.960007},
            {date: '2017-11-24', high: 175.5, low: 174.649994, open: 175.100006, close: 174.970001},
            {date: '2017-11-27', high: 175.080002, low: 173.339996, open: 175.050003, close: 174.089996},
            {date: '2017-11-28', high: 174.869995, low: 171.860001, open: 174.300003, close: 173.070007},
            {date: '2017-11-29', high: 172.919998, low: 167.160004, open: 172.630005, close: 169.479996},
            {date: '2017-11-30', high: 172.139999, low: 168.440002, open: 170.429993, close: 171.850006},
            {date: '2017-12-01', high: 171.669998, low: 168.5, open: 169.949997, close: 171.050003},
            {date: '2017-12-04', high: 172.619995, low: 169.630005, open: 172.479996, close: 169.800003},
            {date: '2017-12-05', high: 171.520004, low: 168.399994, open: 169.059998, close: 169.639999},
            {date: '2017-12-06', high: 170.199997, low: 166.460007, open: 167.5, close: 169.009995},
            {date: '2017-12-07', high: 170.440002, low: 168.910004, open: 169.029999, close: 169.320007},
            {date: '2017-12-08', high: 171, low: 168.820007, open: 170.490005, close: 169.369995},
            {date: '2017-12-11', high: 172.889999, low: 168.789993, open: 169.199997, close: 172.669998},
            {date: '2017-12-12', high: 172.389999, low: 171.460007, open: 172.149994, close: 171.699997},
            {date: '2017-12-13', high: 173.539993, low: 172, open: 172.5, close: 172.270004},
            {date: '2017-12-14', high: 173.130005, low: 171.649994, open: 172.399994, close: 172.220001},
            {date: '2017-12-15', high: 174.169998, low: 172.460007, open: 173.630005, close: 173.970001},
            {date: '2017-12-18', high: 177.199997, low: 174.860001, open: 174.880005, close: 176.419998},
            {date: '2017-12-19', high: 175.389999, low: 174.089996, open: 175.029999, close: 174.539993},
            {date: '2017-12-20', high: 175.419998, low: 173.25, open: 174.869995, close: 174.350006},
            {date: '2017-12-21', high: 176.020004, low: 174.100006, open: 174.169998, close: 175.009995},
            {date: '2017-12-22', high: 175.419998, low: 174.5, open: 174.679993, close: 175.009995},
            {date: '2017-12-26', high: 171.470001, low: 169.679993, open: 170.800003, close: 170.570007},
            {date: '2017-12-27', high: 170.779999, low: 169.710007, open: 170.100006, close: 170.600006},
            {date: '2017-12-28', high: 171.850006, low: 170.479996, open: 171, close: 171.080002},
            {date: '2017-12-29', high: 170.589996, low: 169.220001, open: 170.520004, close: 169.229996},
            {date: '2018-01-02', high: 172.300003, low: 169.259995, open: 170.160004, close: 172.259995}
        ]

        data = data.map((d) => {
            const date = parseDate(d["date"]);
            return {
                date,
                high: +d["high"],
                low: +d["low"],
                open: +d["open"],
                close: +d["close"]
            };
        })

        const width = 600;
        const height = 600;

        const margin = ({top: 20, right: 30, bottom: 30, left: 40})

        const xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x)
                .tickValues(d3.utcMonday
                    .every(width > 720 ? 1 : 2)
                    .range(data[0].date, data[data.length - 1].date))
                .tickFormat(d3.utcFormat("%-m/%-d")))
            .call(g => g.select(".domain").remove())

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y)
                .tickFormat(d3.format("$~f"))
                .tickValues(d3.scaleLinear().domain(y.domain()).ticks()))
            .call(g => g.selectAll(".tick line").clone()
                .attr("stroke-opacity", 0.2)
                .attr("x2", width - margin.left - margin.right))
            .call(g => g.select(".domain").remove())

        var x = d3.scaleBand()
            .domain(d3.utcDay
                .range(data[0].date, +data[data.length - 1].date + 1)
                .filter(d => d.getUTCDay() !== 0 && d.getUTCDay() !== 6))
            .range([margin.left, width - margin.right])
            .padding(0.2)

        var y = d3.scaleLog()
            .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)])
            .rangeRound([height - margin.bottom, margin.top])

        const svg = d3.create("svg")
            .attr("viewBox", [0, 0, width, height]);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        const g = svg.append("g")
            .attr("stroke-linecap", "round")
            .attr("stroke", "black")
            .selectAll("g")
            .data(data)
            .join("g")
            .attr("transform", d => `translate(${x(d.date)},0)`);

        g.append("line")
            .attr("y1", d => y(d.low))
            .attr("y2", d => y(d.high));

        g.append("line")
            .attr("y1", d => y(d.open))
            .attr("y2", d => y(d.close))
            .attr("stroke-width", x.bandwidth())
            .attr("stroke", d => d.open > d.close ? d3.schemeSet1[0]
                : d.close > d.open ? d3.schemeSet1[2]
                : d3.schemeSet1[8]);

        g.append("title")
            .text(d => `${formatDate(d.date)}
        Open: ${formatValue(d.open)}
        Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
        Low: ${formatValue(d.low)}
        High: ${formatValue(d.high)}`);

        return svg.node();
    }

    render() {
      return <h1>Hello, {this.props.name} - API Returned: {this.state.apiResult}</h1>;
    }
  }

export default MainComponent