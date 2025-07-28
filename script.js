let currentScene = 1;

const scenes = [drawScene1, drawScene2, drawScene3, drawScene4, drawScene5];

function clearViz() {
  d3.select('#viz').html('');
}

function renderScene(index) {
  scenes[index - 1]();
  document.getElementById("sceneIndicator").innerText = `Scene ${index} of ${scenes.length}`;
}

function nextScene() {
  if (currentScene < scenes.length) {
    currentScene++;
    renderScene(currentScene);
  }
}

function prevScene() {
  if (currentScene > 1) {
    currentScene--;
    renderScene(currentScene);
  }
}

renderScene(currentScene);

// ====================
// Scene 1: Line chart
// ====================
function drawScene1() {
  clearViz();
  const margin = { top: 40, right: 30, bottom: 60, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 1: Total CO₂ Emissions Over Time");

  const countries = ["Brazil", "China", "France", "Germany", "India", "United Kingdom", "United States"];

  d3.csv("data/co2_filtered.csv").then(data => {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Emissions = +d["Annual CO₂ emissions (tonnes)"];
    });

    const filtered = data.filter(d => countries.includes(d.Entity));

    const x = d3.scaleLinear()
      .domain(d3.extent(filtered, d => d.Year))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filtered, d => d.Emissions)])
      .range([height, 0]);

    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(countries);
    const line = d3.line().x(d => x(d.Year)).y(d => y(d.Emissions));

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    countries.forEach(country => {
      const countryData = filtered.filter(d => d.Entity === country);
      svg.append("path")
        .datum(countryData)
        .attr("fill", "none")
        .attr("stroke", color(country))
        .attr("stroke-width", 2)
        .attr("d", line);
    });

    svg.selectAll(".label")
      .data(countries)
      .enter()
      .append("text")
      .attr("x", width - 70)
      .attr("y", (d, i) => 20 * i + 20)
      .text(d => d)
      .style("fill", d => color(d));
  });
}

// ====================
// Scene 2: Mock bar chart
// ====================
function drawScene2() {
  clearViz();
  const margin = { top: 40, right: 30, bottom: 60, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 2: CO₂ Emissions Per Capita (Mock Data)");

  const data = [
    { country: "China", value: 7.1 },
    { country: "United States", value: 15.2 },
    { country: "India", value: 1.9 },
    { country: "United Kingdom", value: 5.5 },
    { country: "France", value: 4.6 },
    { country: "Germany", value: 8.4 },
    { country: "Brazil", value: 2.2 }
  ];

  const x = d3.scaleBand().domain(data.map(d => d.country)).range([0, width]).padding(0.3);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value) * 1.2]).range([height, 0]);

  svg.append("g").call(d3.axisLeft(y));
  svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

  svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#4CAF50");
}

// ====================
// Scene 3: 2020 snapshot
// ====================
function drawScene3() {
  clearViz();
  const margin = { top: 40, right: 30, bottom: 60, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 3: Regional CO₂ Emissions (2020)");

  const countries = ["Brazil", "China", "France", "Germany", "India", "United Kingdom", "United States"];

  d3.csv("data/co2_filtered.csv").then(data => {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Emissions = +d["Annual CO₂ emissions (tonnes)"];
    });

    const year2020 = data.filter(d => d.Year === 2020 && countries.includes(d.Entity));

    const x = d3.scaleBand().domain(year2020.map(d => d.Entity)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(year2020, d => d.Emissions) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(year2020)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Entity))
      .attr("y", d => y(d.Emissions))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Emissions))
      .attr("fill", "#2196F3");
  });
}

// ====================
// Scene 4: Emission growth
// ====================
function drawScene4() {
  clearViz();
  const margin = { top: 40, right: 30, bottom: 60, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 4: Emission Growth (2000–2020)");

  const countries = ["Brazil", "China", "France", "Germany", "India", "United Kingdom", "United States"];

  d3.csv("data/co2_filtered.csv").then(data => {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Emissions = +d["Annual CO₂ emissions (tonnes)"];
    });

    const growthData = countries.map(country => {
      const d2000 = data.find(d => d.Entity === country && d.Year === 2000);
      const d2020 = data.find(d => d.Entity === country && d.Year === 2020);
      const growth = d2000 && d2020 && d2000.Emissions > 0
        ? ((d2020.Emissions - d2000.Emissions) / d2000.Emissions) * 100
        : 0;
      return { country, growth: Math.round(growth) };
    });

    const x = d3.scaleBand().domain(growthData.map(d => d.country)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(growthData, d => d.growth) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => d + "%"));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(growthData)
      .enter()
      .append("rect")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.growth))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.growth))
      .attr("fill", "orange");

    svg.selectAll("text.bar")
      .data(growthData)
      .enter()
      .append("text")
      .text(d => d.growth + "%")
      .attr("x", d => x(d.country) + x.bandwidth() / 2)
      .attr("y", d => y(d.growth) - 5)
      .attr("text-anchor", "middle");
  });
}

// ====================
// Scene 5: Top 7 emitters in 2020 (just from 7 countries)
// ====================
function drawScene5() {
  clearViz();
  const margin = { top: 40, right: 30, bottom: 60, left: 60 };
  const width = 900 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg = d3.select("#viz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -10)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 5: Top Emitters in 2020");

  const countries = ["Brazil", "China", "France", "Germany", "India", "United Kingdom", "United States"];

  d3.csv("data/co2_filtered.csv").then(data => {
    data.forEach(d => {
      d.Year = +d.Year;
      d.Emissions = +d["Annual CO₂ emissions (tonnes)"];
    });

    const year2020 = data.filter(d => d.Year === 2020 && countries.includes(d.Entity));

    const x = d3.scaleBand().domain(year2020.map(d => d.Entity)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(year2020, d => d.Emissions) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(year2020)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Entity))
      .attr("y", d => y(d.Emissions))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Emissions))
      .attr("fill", "#9C27B0");
  });
}
