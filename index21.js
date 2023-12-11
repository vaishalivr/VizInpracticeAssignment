/// HISTOGRAM FOR STROKE COUNT ///
const dataDog_histogram1 = [
  { strokeCount: "0-2", frequency: 18516 },
  { strokeCount: "2-4", frequency: 18467 },
  { strokeCount: "4-6", frequency: 30090 },
  { strokeCount: "6-8", frequency: 36243 },
  { strokeCount: "8-10", frequency: 24191 },
  { strokeCount: "10-12", frequency: 12304 },
  { strokeCount: "12-14", frequency: 6213 },
  { strokeCount: "14-16", frequency: 2992 },
  { strokeCount: "16-18", frequency: 1481 },
  { strokeCount: "18-20", frequency: 781 },
  { strokeCount: "20+", frequency: 881 },
];

const dataCat_histogram1 = [
  { strokeCount: "0-2", frequency: 1081 },
  { strokeCount: "2-4", frequency: 5161 },
  { strokeCount: "4-6", frequency: 16886 },
  { strokeCount: "6-8", frequency: 25685 },
  { strokeCount: "8-10", frequency: 26398 },
  { strokeCount: "10-12", frequency: 21130 },
  { strokeCount: "12-14", frequency: 13206 },
  { strokeCount: "14-16", frequency: 6915 },
  { strokeCount: "16-18", frequency: 3313 },
  { strokeCount: "18-20", frequency: 1748 },
  { strokeCount: "20+", frequency: 1679 },
];

const dataBird_histogram1 = [
  { strokeCount: "0-2", frequency: 8193 },
  { strokeCount: "2-4", frequency: 20434 },
  { strokeCount: "4-6", frequency: 28064 },
  { strokeCount: "6-8", frequency: 26577 },
  { strokeCount: "8-10", frequency: 19685 },
  { strokeCount: "10-12", frequency: 13469 },
  { strokeCount: "12-14", frequency: 8549 },
  { strokeCount: "14-16", frequency: 4501 },
  { strokeCount: "16-18", frequency: 2047 },
  { strokeCount: "18-20", frequency: 984 },
  { strokeCount: "20+", frequency: 254 },
];

const tooltipImages_strokeCount = {
  dog: {
    "0-2": "dogs_with_0_1_stroke.png",
    "2-4": "dogs_with_2_3_stroke.png",
    "4-6": "dogs_with_4_5_stroke.png",
    "6-8": "dogs_with_6_7_stroke.png",
    "8-10": "dogs_with_8_9_stroke.png",
    "10-12": "dogs_with_10_11_stroke.png",
    "12-14": "dogs_with_12_13_stroke.png",
    "14-16": "dogs_with_14_15_stroke.png",
    "16-18": "dogs_with_16_17_stroke.png",
    "18-20": "dogs_with_18_19_stroke.png",
    "20+": "dogs_with_20_21_stroke.png",
  },
  cat: {
    "0-2": "cats_with_0_1_stroke.png",
    "2-4": "cats_with_2_3_stroke.png",
    "4-6": "cats_with_4_5_stroke.png",
    "6-8": "cats_with_6_7_stroke.png",
    "8-10": "cats_with_8_9_stroke.png",
    "10-12": "cats_with_10_11_stroke.png",
    "12-14": "cats_with_12_13_stroke.png",
    "14-16": "cats_with_14_15_stroke.png",
    "16-18": "cats_with_16_17_stroke.png",
    "18-20": "cats_with_18_19_stroke.png",
    "20+": "cats_with_20_21_stroke.png",
  },
  bird: {
    "0-2": "birds_with_0_1_stroke.png",
    "2-4": "birds_with_2_3_stroke.png",
    "4-6": "birds_with_4_5_stroke.png",
    "6-8": "birds_with_6_7_stroke.png",
    "8-10": "birds_with_8_9_stroke.png",
    "10-12": "birds_with_10_11_stroke.png",
    "12-14": "birds_with_12_13_stroke.png",
    "14-16": "birds_with_14_15_stroke.png",
    "16-18": "birds_with_16_17_stroke.png",
    "18-20": "birds_with_18_19_stroke.png",
    "20+": "birds_with_20_22_stroke.png",
  },
};

let maxWidth = "120%";
let maxHeight = "180px";

const svg_chart2 = d3
  .select("#chart2")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

function updateDivContent(data) {
  const div = d3.select("#imageDisplay1");
  let content = "";
  // Add Dog Image
  if (tooltipImages_strokeCount.dog[data.strokeCount]) {
    content += "<strong> ------ Dog Images ------ </strong><br>";
    content += `<img src='${
      tooltipImages_strokeCount.dog[data.strokeCount]
    }' alt='Dog Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }

  // Add Cat Image
  if (tooltipImages_strokeCount.cat[data.strokeCount]) {
    content += "<strong>------ Cat Images ------</strong><br>";
    content += `<img src='${
      tooltipImages_strokeCount.cat[data.strokeCount]
    }' alt='Cat Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }

  // Add Bird Image
  if (tooltipImages_strokeCount.bird[data.strokeCount]) {
    content += "<strong>------ Bird Images ------</strong><br>";
    content += `<img src='${
      tooltipImages_strokeCount.bird[data.strokeCount]
    }' alt='Bird Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }
  // Update the tooltip content
  div.style("display", "block").html(content);
}

// DOG
const xScaleDog = d3
  .scaleBand()
  .rangeRound([0, width / 3])
  .domain(dataDog_histogram1.map((d) => d.strokeCount));

const yScaleDog = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataDog_histogram1, (d) => d.frequency)]);

const dogChart = svg_chart2
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
dogChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScaleDog))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
dogChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleDog));

dogChart
  .selectAll(".bar.dog")
  .data(dataDog_histogram1)
  .enter()
  .append("rect")
  .attr("class", "bar cat")
  .attr("x", (d) => xScaleDog(d.strokeCount))
  .attr("width", xScaleDog.bandwidth())
  .attr("y", (d) => yScaleDog(d.frequency))
  .attr("height", (d) => height - yScaleDog(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent(d, "dog");
  })
  .on("mouseout", function () {});

dogChart
  .selectAll(".hover-bar")
  .data(dataDog_histogram1)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScaleDog(d.strokeCount))
  .attr("width", xScaleDog.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent(d, "dog");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay1").style("display", "none");
  });

//CAT
const xScaleCat = d3
  .scaleBand()
  .rangeRound([width / 3, (2 * width) / 3])
  .domain(dataCat_histogram1.map((d) => d.strokeCount));

const yScaleCat = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataDog_histogram1, (d) => d.frequency)]);

const catChart = svg_chart2
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
catChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScaleCat))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
catChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleCat));

catChart
  .selectAll(".bar.dog")
  .data(dataCat_histogram1)
  .enter()
  .append("rect")
  .attr("class", "bar cat")
  .attr("x", (d) => xScaleCat(d.strokeCount))
  .attr("width", xScaleCat.bandwidth())
  .attr("y", (d) => yScaleCat(d.frequency))
  .attr("height", (d) => height - yScaleCat(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent(d, "cat");
  })
  .on("mouseout", function () {});

catChart
  .selectAll(".hover-bar")
  .data(dataCat_histogram1)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScaleCat(d.strokeCount))
  .attr("width", xScaleCat.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent(d, "cat");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay1").style("display", "none");
  });

//BIRD
const xScaleBird = d3
  .scaleBand()
  .rangeRound([(2 * width) / 3, width])
  .domain(dataBird_histogram1.map((d) => d.strokeCount));

const yScaleBird = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataDog_histogram1, (d) => d.frequency)]);

const birdChart = svg_chart2
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
birdChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScaleBird))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
birdChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleBird));

birdChart
  .selectAll(".bar.dog")
  .data(dataBird_histogram1)
  .enter()
  .append("rect")
  .attr("class", "bar cat")
  .attr("x", (d) => xScaleBird(d.strokeCount))
  .attr("width", xScaleBird.bandwidth())
  .attr("y", (d) => yScaleBird(d.frequency))
  .attr("height", (d) => height - yScaleBird(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent(d, "bird");
  })
  .on("mouseout", function () {});

birdChart
  .selectAll(".hover-bar")
  .data(dataBird_histogram1)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScaleBird(d.strokeCount))
  .attr("width", xScaleBird.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent(d, "bird");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay1").style("display", "none");
  });

// For Dog Histogram
dogChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars(d.strokeCount);
    updateDivContent(d);
  })
  .on("mouseout", function () {
    hideHoverBars();
  });

catChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars(d.strokeCount);
    updateDivContent(d);
  })
  .on("mouseout", function () {
    hideHoverBars();
  });

birdChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars(d.strokeCount);
    updateDivContent(d);
  })
  .on("mouseout", function () {
    hideHoverBars();
  });
// Repeat similar blocks for Cat and Bird histograms

function showHoverBars(strokeCount) {
  // Select and show the hover bar for all histograms with the matching strokeCount
  d3.selectAll("#chart2 .hover-bar")
    .filter((d) => d.strokeCount === strokeCount)
    .attr("fill", "#ddd"); // Grey color or any other style you've defined for hover
}

function hideHoverBars() {
  // Reset the hover bars for all histograms
  d3.selectAll("#chart2 .hover-bar").attr("fill", "transparent");
}
