// HISTOGRAM FOR TIME COUNT //
const dataAmbulance_histogram2 = [
  { timeCount: "0-2", frequency: 337 },
  { timeCount: "2-4", frequency: 491 },
  { timeCount: "4-6", frequency: 5056 },
  { timeCount: "6-8", frequency: 18184 },
  { timeCount: "8-10", frequency: 28700 },
  { timeCount: "10-12", frequency: 28720 },
  { timeCount: "12-14", frequency: 23021 },
  { timeCount: "14-16", frequency: 16846 },
  { timeCount: "16-18", frequency: 13528 },
  { timeCount: "18-20", frequency: 11629 },
  { timeCount: "20+", frequency: 1492 },
];
const dataPoliceCar_histogram2 = [
  { timeCount: "0-2", frequency: 163 },
  { timeCount: "2-4", frequency: 1250 },
  { timeCount: "4-6", frequency: 13215 },
  { timeCount: "6-8", frequency: 31384 },
  { timeCount: "8-10", frequency: 34128 },
  { timeCount: "10-12", frequency: 20918 },
  { timeCount: "12-14", frequency: 10899 },
  { timeCount: "14-16", frequency: 6734 },
  { timeCount: "16-18", frequency: 5343 },
  { timeCount: "18-20", frequency: 5298 },
  { timeCount: "20+", frequency: 691 },
];
const dataSpeedBoat_histogram2 = [
  { timeCount: "0-2", frequency: 739 },
  { timeCount: "2-4", frequency: 6439 },
  { timeCount: "4-6", frequency: 23686 },
  { timeCount: "6-8", frequency: 35131 },
  { timeCount: "8-10", frequency: 39359 },
  { timeCount: "10-12", frequency: 27276 },
  { timeCount: "12-14", frequency: 18143 },
  { timeCount: "14-16", frequency: 13615 },
  { timeCount: "16-18", frequency: 11678 },
  { timeCount: "18-20", frequency: 11243 },
  { timeCount: "20+", frequency: 1268 },
];

const tooltipImages_timeCount = {
  amb: {
    "0-2": "ambulance_drawings_0_1_sec.png",
    "2-4": "ambulance_drawings_2_3_sec.png",
    "4-6": "ambulance_drawings_4_5_sec.png",
    "6-8": "ambulance_drawings_6_7_sec.png",
    "8-10": "ambulance_drawings_8_9_sec.png",
    "10-12": "ambulance_drawings_10_11_sec.png",
    "12-14": "ambulance_drawings_12_13_sec.png",
    "14-16": "ambulance_drawings_14_15_sec.png",
    "16-18": "ambulance_drawings_16_17_sec.png",
    "18-20": "ambulance_drawings_18_19_sec.png",
    "20+": "ambulance_drawings_20_21_sec.png",
  },
  pc: {
    "0-2": "police_drawings_0_1_sec.png",
    "2-4": "police_drawings_2_3_sec.png",
    "4-6": "police_drawings_4_5_sec.png",
    "6-8": "police_drawings_6_7_sec.png",
    "8-10": "police_drawings_8_9_sec.png",
    "10-12": "police_drawings_10_11_sec.png",
    "12-14": "police_drawings_12_13_sec.png",
    "14-16": "police_drawings_14_15_sec.png",
    "16-18": "police_drawings_16_17_sec.png",
    "18-20": "police_drawings_18_19_sec.png",
    "20+": "police_drawings_20_21_sec.png",
  },
  sb: {
    "0-2": "speedboat_drawings_0_1_sec.png",
    "2-4": "speedboat_drawings_2_3_sec.png",
    "4-6": "speedboat_drawings_4_5_sec.png",
    "6-8": "speedboat_drawings_6_7_sec.png",
    "8-10": "speedboat_drawings_8_9_sec.png",
    "10-12": "speedboat_drawings_10_11_sec.png",
    "12-14": "speedboat_drawings_12_13_sec.png",
    "14-16": "speedboat_drawings_14_15_sec.png",
    "16-18": "speedboat_drawings_16_17_sec.png",
    "18-20": "speedboat_drawings_18_19_sec.png",
    "20+": "speedboat_drawings_20_21_sec.png",
  },
};

function updateDivContent2(data) {
  const div = d3.select("#imageDisplay2");
  let content = "";
  // Add ambulance Image
  if (tooltipImages_timeCount.amb[data.timeCount]) {
    content += "<strong> ------ Ambulance Images ------ </strong><br>";
    content += `<img src='${
      tooltipImages_timeCount.amb[data.timeCount]
    }' alt='Dog Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }

  // Add police car Image
  if (tooltipImages_timeCount.pc[data.timeCount]) {
    content += "<strong>------ Police Car Images ------</strong><br>";
    content += `<img src='${
      tooltipImages_timeCount.pc[data.timeCount]
    }' alt='Cat Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }

  // Add speedboat Image
  if (tooltipImages_timeCount.sb[data.timeCount]) {
    content += "<strong>------ Bird Images ------</strong><br>";
    content += `<img src='${
      tooltipImages_timeCount.sb[data.timeCount]
    }' alt='Bird Image' style='max-width: ${maxWidth}; max-height: ${maxHeight}'><br>`;
  }
  // Update the tooltip content
  div.style("display", "block").html(content);
}

const svg_chart3 = d3
  .select("#chart3")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

//AMB
const xScaleAmb = d3
  .scaleBand()
  .rangeRound([0, width / 3])
  .domain(dataAmbulance_histogram2.map((d) => d.timeCount));

const yScaleAmb = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataSpeedBoat_histogram2, (d) => d.frequency)]);

const ambChart = svg_chart3
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
ambChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScaleAmb))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
ambChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleAmb));

ambChart
  .selectAll(".bar.amb")
  .data(dataAmbulance_histogram2)
  .enter()
  .append("rect")
  .attr("class", "bar amb")
  .attr("x", (d) => xScaleAmb(d.timeCount))
  .attr("width", xScaleAmb.bandwidth())
  .attr("y", (d) => yScaleAmb(d.frequency))
  .attr("height", (d) => height - yScaleAmb(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent2(d, "amb");
  })
  .on("mouseout", function () {});

ambChart
  .selectAll(".hover-bar")
  .data(dataAmbulance_histogram2)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScaleAmb(d.timeCount))
  .attr("width", xScaleAmb.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent2(d, "amb");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay2").style("display", "none");
  });

//POLICE CAR
const xScalePc = d3
  .scaleBand()
  .rangeRound([width / 3, (2 * width) / 3])
  .domain(dataPoliceCar_histogram2.map((d) => d.timeCount));

const yScalePc = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataSpeedBoat_histogram2, (d) => d.frequency)]);

const pcChart = svg_chart3
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
pcChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScalePc))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
pcChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScalePc));

pcChart
  .selectAll(".bar.amb")
  .data(dataPoliceCar_histogram2)
  .enter()
  .append("rect")
  .attr("class", "bar amb")
  .attr("x", (d) => xScalePc(d.timeCount))
  .attr("width", xScalePc.bandwidth())
  .attr("y", (d) => yScalePc(d.frequency))
  .attr("height", (d) => height - yScalePc(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent2(d, "pc");
  })
  .on("mouseout", function () {});

pcChart
  .selectAll(".hover-bar")
  .data(dataPoliceCar_histogram2)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScalePc(d.timeCount))
  .attr("width", xScalePc.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent2(d, "amb");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay2").style("display", "none");
  });

//SPEED BOAT
const xScaleSb = d3
  .scaleBand()
  .rangeRound([(2 * width) / 3, width])
  .domain(dataPoliceCar_histogram2.map((d) => d.timeCount));

const yScaleSb = d3
  .scaleLinear()
  .range([height, 0])
  .domain([0, d3.max(dataSpeedBoat_histogram2, (d) => d.frequency)]);

const sbChart = svg_chart3
  .append("g")
  .attr("transform", `translate(0, ${margin.top})`);

// Append x-axis to the dog chart
sbChart
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(xScaleSb))
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", "rotate(-45)");

// Append y-axis to the dog chart
sbChart.append("g").attr("class", "y-axis").call(d3.axisLeft(yScaleSb));

sbChart
  .selectAll(".bar.amb")
  .data(dataSpeedBoat_histogram2)
  .enter()
  .append("rect")
  .attr("class", "bar amb")
  .attr("x", (d) => xScaleSb(d.timeCount))
  .attr("width", xScaleSb.bandwidth())
  .attr("y", (d) => yScaleSb(d.frequency))
  .attr("height", (d) => height - yScaleSb(d.frequency))
  .attr("fill", "#1f77b4")
  .attr("opacity", 0.9)
  .on("mouseover", function (e, d) {
    updateDivContent2(d, "sb");
  })
  .on("mouseout", function () {});

sbChart
  .selectAll(".hover-bar")
  .data(dataSpeedBoat_histogram2)
  .enter()
  .append("rect")
  .attr("class", "hover-bar")
  .attr("x", (d) => xScaleSb(d.timeCount))
  .attr("width", xScaleSb.bandwidth())
  .attr("y", 0)
  .attr("height", height)
  .attr("fill", "transparent")
  .on("mouseover", function (e, d) {
    d3.select(this).attr("fill", "#ddd").style("opacity", 0.3);
    updateDivContent2(d, "sb");
  })
  .on("mouseout", function () {
    d3.select(this).attr("fill", "transparent");
    d3.select("#imageDisplay2").style("display", "none");
  });

function showHoverBars2(timeCount) {
  // Select and show the hover bar for all histograms with the matching strokeCount
  d3.selectAll("#chart3 .hover-bar")
    .filter((d) => d.timeCount === timeCount)
    .attr("fill", "#ddd"); // Grey color or any other style you've defined for hover
}

function hideHoverBars2() {
  // Reset the hover bars for all histograms
  d3.selectAll("#chart3 .hover-bar").attr("fill", "transparent");
}

ambChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars2(d.timeCount);
    updateDivContent2(d);
  })
  .on("mouseout", function () {
    hideHoverBars2();
  });

pcChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars2(d.timeCount);
    updateDivContent2(d);
  })
  .on("mouseout", function () {
    hideHoverBars2();
  });

sbChart
  .selectAll(".hover-bar")
  .on("mouseover", function (e, d) {
    showHoverBars2(d.timeCount);
    updateDivContent2(d);
  })
  .on("mouseout", function () {
    hideHoverBars2();
  });

const horizontalScroll = document.getElementById("horizontalScroll");

horizontalScroll.addEventListener(
  "wheel",
  function (e) {
    horizontalScroll.scrollLeft += e.deltaY;
    e.preventDefault();
  },
  { passive: false }
);
// function isInViewport1(element) {
//   const rect = element.getBoundingClientRect();
//   return (
//     rect.top >= 0 &&
//     rect.bottom <=
//       (window.innerHeight || document.documentElement.clientHeight) &&
//     rect.left >= 0 &&
//     rect.right <= (window.innerWidth || document.documentElement.clientWidth)
//   );
// }
// horizontalScroll.addEventListener(
//   "wheel",
//   function (e) {
//     if (isInViewport1(horizontalScroll)) {
//       horizontalScroll.scrollLeft += e.deltaY; // or e.deltaX
//       e.preventDefault();
//     }
//   },
//   { passive: false }
// );
