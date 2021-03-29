// Add your JavaScript code here
const MAX_WIDTH = Math.max(1080, window.innerWidth);
const MAX_HEIGHT = 720;
const margin = {top: 40, right: 100, bottom: 40, left: 175};

// Assumes the same graph width, height dimensions as the example dashboard. Feel free to change these if you'd like
let graph_1_width = (MAX_WIDTH / 2) - 10, graph_1_height = 250;
let graph_2_width = (MAX_WIDTH / 2) - 10, graph_2_height = 275;
let graph_3_width = MAX_WIDTH / 2, graph_3_height = 575;

let svg = d3.select("#graph1")
            .append("svg")
            .attr("width", graph_1_width)     
            .attr("height", graph_1_height)    
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`); 

let svg2 = d3.select("#graph2")
            .append("svg")
            .attr("width", graph_2_width)     
            .attr("height", graph_2_height)    
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`); 

    
var svg3 = d3.select("#graph3")
            .append("svg")
            .attr("width", graph_3_width + 100 )
            .attr("height", graph_3_height + 200)
            .append("g")
            .attr("transform", "translate(" + graph_3_width / 2 + "," + ((graph_3_height / 2) +50)  + ")");

setData("NA_Sales")

let countRef = svg.append("g");
let countRef2 = svg2.append("g")
let countRef3 = svg3.append("g")

d3.csv("data/video_games.csv").then(game => {

    data = game.slice(0,10)

    let x = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return parseInt(d.Global_Sales); })])
        .range([0, graph_1_width - margin.left - margin.right]);

    let y = d3.scaleBand()
        .domain(data.map(function(d) { return d["Name"] }))
        .range([0, graph_1_height - margin.top - margin.bottom])
        .padding(0.1);  

    svg.append("g")
        .call(d3.axisLeft(y).tickSize(0).tickPadding(10));

    let color = d3.scaleOrdinal()
        .domain(data.map(function(d) { return d["Name"] }))
        .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));

    let bars = svg.selectAll("rect").data(data);

    bars.enter()
        .append("rect")
        .merge(bars)
        .attr("fill", function(d) { return color(d["Name"]) })    
        .attr("x", x(0))
        .attr("y", function(d) { return y(d.Name) })       
        .attr("width", function(d) { return x(parseInt(d.Global_Sales)); })
        .attr("height",  y.bandwidth());       

    let counts = countRef.selectAll("text").data(data);

    counts.enter()
        .append("text")
        .merge(counts)
        .attr("x", function(d) { return x(parseInt(d.Global_Sales)) + 10; })       
        .attr("y", function(d) { return y(d.Name) + 10})      
        .style("text-anchor", "start")
        .text(function(d) { return parseInt(d.Global_Sales)});           

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2},
                                        ${(graph_1_height - margin.top - margin.bottom) + 15})`)      
        .style("text-anchor", "middle")
        .text("Global Sales");

    svg.append("text")
        .attr("transform", `translate(-120, ${(graph_1_height - margin.top - margin.bottom - 150) / 2})`)      
        .style("text-anchor", "middle")
        .text("Name");

    svg.append("text")
        .attr("transform", `translate(${(graph_1_width - margin.left - margin.right) / 2}, ${-10})`)       
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Top 10 Video Games of All Time by Global Sales");

});

function setData(region) {

    d3.csv("data/video_games.csv").then(game1 => {

    if (region == "NA_Sales") {
        data1 = d3.nest().key(function(d){
            return d.Genre; })
        .rollup(function(l){
            return d3.sum(l, function(d){
                return parseFloat(d.NA_Sales);
            });
        }).entries(game1)
        }

    if (region == "EU_Sales") {
        data1 = d3.nest().key(function(d){
            return d.Genre; })
        .rollup(function(l){
            return d3.sum(l, function(d){
                return parseFloat(d.EU_Sales);
            });
        }).entries(game1)
    }
if (region == "JP_Sales") {
    data1 = d3.nest().key(function(d){
        return d.Genre; })
    .rollup(function(l){
        return d3.sum(l, function(d){
            return parseFloat(d.JP_Sales);
        });
    }).entries(game1)

}
if (region == "Other_Sales") {
    data1 = d3.nest().key(function(d){
        return d.Genre; })
    .rollup(function(l){
        return d3.sum(l, function(d){
            return parseFloat(d.Other_Sales);
        });
    }).entries(game1)

}
if (region == "Global_Sales") {
    data1 = d3.nest().key(function(d){
        return d.Genre; })
    .rollup(function(l){
        return d3.sum(l, function(d){
            return parseFloat(d.Global_Sales);
        });
    }).entries(game1)

}

    
        let x1 = d3.scaleLinear()
            .domain([0, d3.max(data1, function(d) { return parseFloat(d.value); })])
            .range([0, graph_2_width - margin.left - margin.right]);

        let y1 = d3.scaleBand()
            .domain(data1.map(function(d) { return d.key }))
            .range([0, graph_2_height - margin.top - margin.bottom])
            .padding(0.1);  
    
        svg2.append("g")
            .call(d3.axisLeft(y1).tickSize(0).tickPadding(10));
    
        let color1 = d3.scaleOrdinal()
            .domain(data1.map(function(d) { return d.key }))
            .range(d3.quantize(d3.interpolateHcl("#66a0e2", "#81c2c3"), 10));
    
        let bars1 = svg2.selectAll("rect").data(data1);
    
        bars1.enter()
            .append("rect")
            .merge(bars1)
            .attr("fill", function(d) { return color1(d.key) })    
            .attr("x", x1(0))
            .attr("y", function(d) { return y1(d.key) })       
            .attr("width", function(d) { return x1(parseInt(d.value)); })
            .attr("height",  y1.bandwidth());       
    
        let counts1 = countRef2.selectAll("text").data(data1);
    
        counts1.enter()
            .append("text")
            .merge(counts1)
            .attr("x", function(d) { return x1(parseInt(d.value)) + 10; })       
            .attr("y", function(d) { return y1(d.key) + 10})      
            .style("text-anchor", "start")
            .text(function(d) { return parseInt(d.value)});           
    

            
    });


}

svg2.append("text")
.attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2},
                                ${(graph_2_height - margin.top - margin.bottom) + 15})`)      
.style("text-anchor", "middle")
.text("Sales");

svg2.append("text")
.attr("transform", `translate(-120, ${(graph_2_height - margin.top - margin.bottom - 150) / 2})`)      
.style("text-anchor", "middle")
.text("Genre");

svg2.append("text")
.attr("transform", `translate(${(graph_2_width - margin.left - margin.right) / 2}, ${-10})`)       
.style("text-anchor", "middle")
.style("font-size", 15)
.text("Top Genres by Sales ");

make_piechart()

function make_piechart() {

    d3.csv("data/video_games.csv").then(game2 => {
        data2 = d3.rollup(game2, v => d3.sum(v, d => parseFloat(d.Global_Sales)), d => d.Genre, d => d.Publisher)

        data_vals = Array.from(data2.values());


        sports = [...data_vals[0].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        platform = [...data_vals[1].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        racing = [...data_vals[2].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        roleplaying = [...data_vals[3].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        puzzle = [...data_vals[4].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        misc = [...data_vals[5].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        shooter = [...data_vals[6].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        simulation = [...data_vals[7].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        action = [...data_vals[8].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        fighting = [...data_vals[9].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        adventure = [...data_vals[10].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)
        strategy = [...data_vals[11].entries()].reduce((a, e ) => e[1] > a[1] ? e : a)

        sports_name = "Sports:" + " " + sports[0]
        platform_name = "Platform:" + " " + platform[0]
        racing_name = "Racing:" + " " + racing[0]
        roleplaying_name = "RolePlaying:" + " " + roleplaying[0]
        puzzle_name = "Puzzle:" + " " + puzzle[0]
        misc_name = "Misc:" + " " + misc[0]
        shooter_name = "Shooter:" + " " + shooter[0]
        action_name = "Action:" + " " + action[0]
        fighting_name = "Fighting:" + " " + fighting[0]
        adventure_name = "Adventure:" + " " + adventure[0]
        strategy_name = "Strategy:" + " " + strategy[0]
        simulation_name = "Simulation" + " " + simulation[0]



        let final_data = new Map()
        final_data[sports_name] = sports[1]
        final_data[platform_name] = platform[1]
        final_data[racing_name] =  racing[1]
        final_data[roleplaying_name] = roleplaying[1]
        final_data[puzzle_name] = racing[1]
        final_data[misc_name] = misc[1]
        final_data[shooter_name] = shooter[1]
        final_data[simulation_name] = simulation[1]
        final_data[action_name] = action[1]
        final_data[fighting_name] = fighting[1]
        final_data[adventure_name] = adventure[1]
        final_data[strategy_name] = strategy[1]



        var width = 450
        height = 450
    
    var radius = Math.min(width, height) / 2 + 50    
    var color = d3.scaleOrdinal()
      .domain(data)
      .range(d3.schemeSet3);
    
    var pie = d3.pie()
      .value(function(d) {return d.value; })
    var data_ready = pie(d3.entries(final_data))
    
    var arcGenerator = d3.arc()
      .innerRadius(0)
      .outerRadius(radius)
    
    svg3
      .selectAll('mySlices')
      .data(data_ready)
      .enter()
      .append('path')
        .attr('d', arcGenerator)
        .attr('fill', function(d){ return(color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
    
        svg3.append("text")
        .attr("transform", `translate(${(graph_1_width - 900) / 2}, ${-300})`)       
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .text("Top Publisher for Every Genre");

    console.log(d3.schemeSet3)

    svg3.append("circle").attr("cx",200).attr("cy",280).attr("r", 6).style("fill", "#8dd3c7")
    svg3.append("text").attr("x", 220).attr("y", 280).text(sports_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",300).attr("r", 6).style("fill", "#ffffb3")
    svg3.append("text").attr("x", 220).attr("y", 300).text(platform_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",320).attr("r", 6).style("fill", "#b3de69")
    svg3.append("text").attr("x", 220).attr("y", 320).text(shooter_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",340).attr("r", 6).style("fill", "#fb8072")
    svg3.append("text").attr("x", 220).attr("y", 340).text(roleplaying_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",360).attr("r", 6).style("fill", "#d9d9d9")
    svg3.append("text").attr("x", 220).attr("y", 360).text(action_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",380).attr("r", 6).style("fill", "#fdb462")
    svg3.append("text").attr("x", 220).attr("y", 380).text(puzzle_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",400).attr("r", 6).style("fill", "#bebada")
    svg3.append("text").attr("x", 220).attr("y", 400).text(misc_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",200).attr("cy",420).attr("r", 6).style("fill", "#80b1d3")
    svg3.append("text").attr("x", 220).attr("y", 420).text(racing_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",0).attr("cy",420).attr("r", 6).style("fill", "#fccde5")
    svg3.append("text").attr("x", 20).attr("y", 420).text(simulation_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",0).attr("cy",360).attr("r", 6).style("fill", "#bc80bd")
    svg3.append("text").attr("x", 20).attr("y", 360).text(fighting_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",0).attr("cy",380).attr("r", 6).style("fill", "#ccebc5")
    svg3.append("text").attr("x", 20).attr("y", 380).text(adventure_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("text").attr("x", 20).attr("y", 400).text(strategy_name).style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("circle").attr("cx",0).attr("cy",400).attr("r", 6).style("fill", "#ffed6f")
    });


    
}