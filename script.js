
let currentScene = 1;
const totalScenes = 5;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("prev").addEventListener("click", () => {
    if (currentScene > 1) currentScene--;
    renderScene();
  });

  document.getElementById("next").addEventListener("click", () => {
    if (currentScene < totalScenes) currentScene++;
    renderScene();
  });

  renderScene();
});

function renderScene() {
  document.getElementById("scene-indicator").innerText = `Scene ${currentScene} of ${totalScenes}`;
  switch (currentScene) {
    case 1: drawScene1(); break;
    case 2: drawScene2(); break;
    case 3: drawScene3(); break;
    case 4: drawScene4(); break;
    case 5: drawScene5(); break;
  }
}

function clearViz() {
  d3.select("#viz").selectAll("*").remove();
}

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

  d3.csv("data/co2_filtered.csv").then(data => {
    const countries = [...new Set(data.map(d => d.Entity))];
    data.forEach(d => {
      d.Year = +d.Year;
      d.Emissions = +d["Annual CO₂ emissions"];
    });

    const x = d3.scaleLinear().domain(d3.extent(data, d => d.Year)).range([0, width]);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => d.Emissions)]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    const color = d3.scaleOrdinal(d3.schemeTableau10).domain(countries);
    const line = d3.line().x(d => x(d.Year)).y(d => y(d.Emissions));

    countries.forEach(c => {
      const countryData = data.filter(d => d.Entity === c);
      svg.append("path")
        .datum(countryData)
        .attr("fill", "none")
        .attr("stroke", color(c))
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

function drawScene2() {
  clearViz();
  const svg = d3.select("#viz").append("svg")
    .attr("width", 960)
    .attr("height", 500);

  svg.append("text")
    .attr("x", 480)
    .attr("y", 40)
    .attr("text-anchor", "middle")
    .style("font-size", "20px")
    .style("font-weight", "bold")
    .text("Scene 2: CO₂ Emissions by Continent (Placeholder)");

  // Placeholder: Static data for now
  const data = [
    { region: "Asia", emissions: 18000000000 },
    { region: "Europe", emissions: 8000000000 },
    { region: "North America", emissions: 9000000000 },
    { region: "South America", emissions: 1200000000 },
    { region: "Africa", emissions: 1300000000 }
  ];

  const margin = { top: 60, right: 30, bottom: 60, left: 60 };
  const width = +svg.attr("width") - margin.left - margin.right;
  const height = +svg.attr("height") - margin.top - margin.bottom;

  const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
  const x = d3.scaleBand().domain(data.map(d => d.region)).range([0, width]).padding(0.3);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.emissions)]).range([height, 0]);

  chart.append("g").call(d3.axisLeft(y));
  chart.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

  chart.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => x(d.region))
    .attr("y", d => y(d.emissions))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.emissions))
    .attr("fill", "green");
}

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

  d3.csv("data/co2_filtered.csv").then(data => {
    const countries = ["United States", "United Kingdom", "India", "China", "France", "Germany", "Brazil"];
    const data2020 = data.filter(d => d.Year === "2020" && countries.includes(d.Entity));
    data2020.forEach(d => d.Emissions = +d["Annual CO₂ emissions"]);

    const x = d3.scaleBand().domain(countries).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(data2020, d => d.Emissions)]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(data2020)
      .enter().append("rect")
      .attr("x", d => x(d.Entity))
      .attr("y", d => y(d.Emissions))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Emissions))
      .attr("fill", "steelblue");
  });
}

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

  d3.csv("data/co2_filtered.csv").then(data => {
    const countries = ["United States", "United Kingdom", "India", "China", "France", "Germany", "Brazil"];
    const growthData = [];

    countries.forEach(c => {
      const d2000 = data.find(d => d.Entity === c && d.Year === "2000");
      const d2020 = data.find(d => d.Entity === c && d.Year === "2020");
      if (d2000 && d2020 && +d2000["Annual CO₂ emissions"] > 0) {
        const growth = ((+d2020["Annual CO₂ emissions"] - +d2000["Annual CO₂ emissions"]) / +d2000["Annual CO₂ emissions"]) * 100;
        growthData.push({ country: c, growth: Math.round(growth) });
      }
    });

    const x = d3.scaleBand().domain(growthData.map(d => d.country)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(growthData, d => d.growth) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y).tickFormat(d => d + "%"));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(growthData)
      .enter().append("rect")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.growth))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.growth))
      .attr("fill", "orange");
  });
}

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

  d3.csv("data/co2_filtered.csv").then(data => {
    const yearData = data.filter(d => d.Year === "2020");
    yearData.forEach(d => d.Emissions = +d["Annual CO₂ emissions"]);
    yearData.sort((a, b) => b.Emissions - a.Emissions);
    const top7 = yearData.slice(0, 7);

    const x = d3.scaleBand().domain(top7.map(d => d.Entity)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(top7, d => d.Emissions)]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(top7)
      .enter().append("rect")
      .attr("x", d => x(d.Entity))
      .attr("y", d => y(d.Emissions))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Emissions))
      .attr("fill", "#9C27B0");
  });
}