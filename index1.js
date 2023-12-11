/// BAR CHART FOR NUMBER COUNT ///
const data_barChart1 = [
  {
    country: "United States",
    houses: 60671,
    monaLisa: 51038,
    eiffelTower: 58070,
  },
  { country: "Japan", houses: 908, monaLisa: 850, eiffelTower: 916 },
  { country: "Great Britain", houses: 9669, monaLisa: 8632, eiffelTower: 9517 },
  { country: "South Africa", houses: 253, monaLisa: 253, eiffelTower: 283 },
  { country: "Brazil", houses: 2485, monaLisa: 2441, eiffelTower: 2845 },
];

const tooltipImages_Countries = {
  houses: {
    "United States": "us_houses_visualization.png",
    Japan: "japan_houses_visualization.png",
    "Great Britain": "great_britain_houses_visualization.png",
    "South Africa": "south_africa_houses_visualization.png",
    Brazil: "brazil_houses_visualization.png",
  },
  monaLisa: {
    "United States": "us_mona_lisa_visualization.png",
    Japan: "japan_mona_lisa_visualization.png",
    "Great Britain": "great_britain_mona_lisa_visualization.png",
    "South Africa": "south_africa_mona_lisa_visualization.png",
    Brazil: "brazil_mona_lisa_visualization.png",
  },
  eiffelTower: {
    "United States": "us_eiffel_tower_visualization.png",
    Japan: "japan_eiffel_tower_visualization.png",
    "Great Britain": "great_britain_eiffel_tower_visualization.png",
    "South Africa": "south_africa_eiffel_tower_visualization.png",
    Brazil: "brazil_eiffel_tower_visualization.png",
  },
};

// Create SVG container for chart1
const svg_chart1 = d3
  .select("#chart1")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Define scales
const x0_barChart1 = d3
  .scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1)
  .domain(data_barChart1.map((d) => d.country));

const x1_barChart1 = d3
  .scaleBand()
  //.padding(0.05)
  .domain(["houses", "monaLisa", "eiffelTower"])
  .rangeRound([0, x0_barChart1.bandwidth()]);

const y_barChart1 = d3
  .scaleLinear()
  .rangeRound([height, 0])
  .domain([
    0,
    d3.max(data_barChart1, (d) =>
      Math.max(d.houses, d.monaLisa, d.eiffelTower)
    ),
  ]);

// Append axes
svg_chart1
  .append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x0_barChart1))
  .selectAll("text")
  .style("font-size", "15px");

svg_chart1
  .append("g")
  .attr("class", "y axis")
  .call(d3.axisLeft(y_barChart1).ticks(null, "s"))
  .selectAll("text") // Select all text elements in the y-axis
  .style("font-size", "15px"); // Increase font size of the tick labels

// Append and style the y-axis label separately
svg_chart1
  .select(".y.axis")
  .append("text")
  .attr("x", 2)
  .attr("y", y_barChart1(y_barChart1.ticks().pop()) + 0.5)
  .attr("dy", "0.32em")
  .attr("fill", "#000");

const keys = ["houses", "monaLisa", "eiffelTower"];

svg_chart1
  .append("g")
  .selectAll("g.background")
  .data(data_barChart1)
  .join("g")
  .attr("transform", (d) => `translate(${x0_barChart1(d.country)},0)`)
  .selectAll("rect.background")
  .data((d) => keys.map((key) => ({ key, country: d.country })))
  .join("rect")
  .attr("class", "background-bar")
  .attr("x", (d) => x1_barChart1(d.key))
  .attr("y", 0)
  .attr("width", x1_barChart1.bandwidth())
  .attr("height", height)
  .attr("fill", "#fff")
  .on("mouseover", handleMouseover)
  .on("mouseout", handleMouseout);

svg_chart1
  .append("g")
  .selectAll("g")
  .data(data_barChart1)
  .join("g")
  .attr("transform", (d) => `translate(${x0_barChart1(d.country)},0)`)
  .selectAll("rect")
  .data((d) => keys.map((key) => ({ key, value: d[key], country: d.country })))
  .join("rect")
  .attr("x", (d) => x1_barChart1(d.key))
  .attr("y", (d) => y_barChart1(d.value))
  .attr("width", x1_barChart1.bandwidth())
  .attr("height", (d) => height - y_barChart1(d.value))
  .attr("fill", (d) => {
    switch (d.key) {
      case "houses":
        return "#1f77b4"; //blue
      case "monaLisa":
        return "#1f77b4"; // green
      case "eiffelTower":
        return "#1f77b4"; //red
      default:
        return "grey";
    }
  })
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    d3.select("#imageDisplay").html(
      `<img src='${
        tooltipImages_Countries[d.key][d.country]
      }' alt='Country Image' style='max-width: 150%;'>`
    );
  })
  .on("mouseout", function () {});

function handleMouseover(e, d) {
  d3.select(this).attr("fill", "#ddd");
  d3.select("#imageDisplay").html(
    `<img src='${
      tooltipImages_Countries[d.key][d.country]
    }' alt='Country Image' style='max-width: 150%;'>`
  );
}

function handleMouseout() {
  // Code for mouseout event
  d3.select(this).attr("fill", "#fff");
}
