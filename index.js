const margin = { top: 20, right: 20, bottom: 60, left: 50 }; //top:20
const width = 700 - margin.left - margin.right; //width = 600
const height = 400 - margin.top - margin.bottom; //height:400

const strokes = [
  [
    [9, 108],
    [9, 212],
    [13, 239],
    [19, 252],
    [23, 255],
    [41, 255],
    [62, 253],
    [129, 236],
    [145, 231],
    [164, 220],
    [166, 189],
    [161, 164],
    [141, 100],
    [132, 85],
    [0, 108],
  ],
  [
    [3, 107],
    [3, 92],
    [14, 68],
    [44, 22],
    [63, 1],
    [75, 0],
    [100, 16],
    [135, 72],
  ],
  [
    [27, 157],
    [22, 162],
    [25, 203],
    [37, 210],
    [60, 210],
    [65, 203],
    [63, 148],
    [22, 148],
  ],
  [
    [13, 185],
    [49, 187],
    [74, 184],
  ],
  [
    [38, 156],
    [42, 212],
  ],
];

// Existing SVG and Axis setup
const svg_chartLegend = d3
  .select("#chartLegend")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Existing Scale and Axis definition
const xScale = d3.scaleLinear().range([0, width]).domain([0, 0]); //0, 200
const yScale = d3.scaleLinear().range([height, 0]).domain([0, 0]); //300,0
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

// Existing Axis appending and animation
const gX = svg_chartLegend
  .append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0,${height})`)
  .call(xAxis);
const gY = svg_chartLegend.append("g").attr("class", "y axis").call(yAxis);
xScale.domain([0, 200]);
yScale.domain([300, 0]);

// Function to draw a point
function drawPoint(point, delay) {
  svg_chartLegend
    .append("circle")
    .attr("cx", xScale(point[0]))
    .attr("cy", yScale(point[1]))
    .attr("r", 3)
    .style("fill", "#1f77b4")
    .transition()
    .delay(delay)
    .duration(500);

  svg_chartLegend
    .append("text")
    .attr("class", "coordinate-text")
    .attr("x", xScale(point[0]) + 5)
    .attr("y", yScale(point[1]) - 5)
    .style("font-size", "10px")
    .style("fill", "#1f77b4")
    .text(`(${point[0]}, ${point[1]})`)
    .transition()
    .delay(delay)
    .duration(500);
}

// Function to draw a line between two points
function drawLine(point1, point2, delay) {
  svg_chartLegend
    .append("line")
    .attr("x1", xScale(point1[0]))
    .attr("y1", yScale(point1[1]))
    .attr("x2", xScale(point1[0]))
    .attr("y2", yScale(point1[1]))
    .transition()
    .delay(delay)
    .duration(500)
    .attr("x2", xScale(point2[0]))
    .attr("y2", yScale(point2[1]))
    .style("stroke", "#1f77b4")
    .style("stroke-width", 6);
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let animationStarted = false;

window.addEventListener("scroll", function () {
  const chartElement = document.getElementById("chartLegend"); // Replace with your chart element ID

  if (isInViewport(chartElement) && !animationStarted) {
    animationStarted = true; // To ensure animation starts only once
    startAnimation();
  }
});

function startAnimation() {
  // Your existing animation logic goes here
  gX.transition().duration(2000).call(xAxis);
  gY.transition().duration(2000).call(yAxis);

  setTimeout(() => {
    let delay = 0;
    strokes.forEach((stroke) => {
      stroke.forEach((point, i) => {
        setTimeout(() => {
          drawPoint(point, 0);
          if (i > 0) {
            drawLine(stroke[i - 1], point, 0);
          }
        }, delay);
        delay += 1000;
      });
    });

    setTimeout(() => {
      gX.remove();
      gY.remove();
      svg_chartLegend.selectAll(".coordinate-text").remove();
    }, delay);
  }, 2000);
}

document
  .getElementById("replayAnimation")
  .addEventListener("click", function () {
    resetAnimation();
    startAnimation();
  });

function resetAnimation() {
  // Remove any SVG elements that were added during the animation
  svg_chartLegend.selectAll("circle").remove();
  svg_chartLegend.selectAll("line").remove();
  svg_chartLegend.selectAll(".coordinate-text").remove();

  // Re-append the axes if they were removed
  svg_chartLegend.selectAll(".x.axis").remove();
  svg_chartLegend.selectAll(".y.axis").remove();

  svg_chartLegend
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0,${height})`)
    .call(xAxis);
  svg_chartLegend.append("g").attr("class", "y axis").call(yAxis);

  // Reset the animationStarted flag
  animationStarted = false;
}
