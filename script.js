let currentScene = 0;
const scenes = [scene1, scene2, scene3];

d3.csv("data/co2_filtered.csv").then(data => {
  data.forEach(d => {
    d.Year = +d.Year;
    d.Emissions = +d["Annual CO₂ emissions"];
  });
  window.dataset = data;
  renderScene(currentScene);
});

function renderScene(index) {
  d3.select("#scene-indicator").text(`Scene ${index + 1} of ${scenes.length}`);
  d3.select("#viz").transition().duration(300).style("opacity", 0).on("end", () => {
    d3.select("#viz").html("");
    scenes[index]();
    d3.select("#viz").transition().duration(300).style("opacity", 1);
  });
}

d3.select("#next").on("click", () => {
  if (currentScene < scenes.length - 1) {
    currentScene++;
    renderScene(currentScene);
  }
});

d3.select("#prev").on("click", () => {
  if (currentScene > 0) {
    currentScene--;
    renderScene(currentScene);
  }
});

// Scene 1: Total emissions of all selected countries
function scene1() {
  const svg = d3.select("#viz").append("svg")
    .attr("viewBox", "0 0 800 500")
    .append("g")
    .attr("transform", "translate(60,40)");

  const aggregated = d3.rollups(window.dataset, v => d3.sum(v, d => d.Emissions), d => d.Year)
    .map(([year, total]) => ({ year: +year, total: total / 1e9 }));

  const x = d3.scaleLinear().domain(d3.extent(aggregated, d => d.year)).range([0, 700]);
  const y = d3.scaleLinear().domain([0, d3.max(aggregated, d => d.total)]).nice().range([400, 0]);

  svg.append("g").attr("transform", "translate(0,400)").call(d3.axisBottom(x).tickFormat(d3.format("d")));
  svg.append("g").call(d3.axisLeft(y));

  const line = d3.line().x(d => x(d.year)).y(d => y(d.total));

  svg.append("path")
    .datum(aggregated)
    .attr("fill", "none")
    .attr("stroke", "#1f77b4")
    .attr("stroke-width", 2.5)
    .attr("d", line);

  svg.append("text")
    .attr("x", 200)
    .attr("y", -10)
    .attr("font-size", "16px")
    .text("Scene 1: Total CO₂ Emissions from 7 Countries (in Gt)");
}

// Scene 2: Emissions over time for China, USA, India
function scene2() {
  const svg = d3.select("#viz").append("svg")
    .attr("viewBox", "0 0 800 500")
    .append("g")
    .attr("transform", "translate(60,40)");

  const countries = ["China", "United States", "India"];
  const colors = { "China": "red", "United States": "blue", "India": "green" };

  const x = d3.scaleLinear()
    .domain(d3.extent(window.dataset, d => d.Year))
    .range([0, 700]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(window.dataset.filter(d => countries.includes(d.Entity)), d => d.Emissions)])
    .nice()
    .range([400, 0]);

  svg.append("g").attr("transform", "translate(0,400)").call(d3.axisBottom(x).tickFormat(d3.format("d")));
  svg.append("g").call(d3.axisLeft(y));

  countries.forEach(country => {
    const data = window.dataset.filter(d => d.Entity === country);
    const line = d3.line().x(d => x(d.Year)).y(d => y(d.Emissions));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", colors[country])
      .attr("stroke-width", 2)
      .attr("d", line);

    svg.append("text")
      .attr("x", x(data[data.length - 1].Year))
      .attr("y", y(data[data.length - 1].Emissions))
      .attr("fill", colors[country])
      .text(country);
  });

  svg.append("text")
    .attr("x", 200)
    .attr("y", -10)
    .attr("font-size", "16px")
    .text("Scene 2: Emissions – China, USA, India");
}

// Scene 3: Emission growth from 2000 to 2020
function scene3() {
  const svg = d3.select("#viz").append("svg")
    .attr("viewBox", "0 0 800 500")
    .append("g")
    .attr("transform", "translate(60,40)");

  const countries = ["China", "United States", "India", "United Kingdom", "France", "Germany", "Brazil"];

  const growthData = countries.map(c => {
    const d2000 = window.dataset.find(d => d.Entity === c && d.Year === 2000);
    const d2020 = window.dataset.find(d => d.Entity === c && d.Year === 2020);
    if (!d2000 || !d2020) return null;
    return {
      country: c,
      growth: ((d2020.Emissions - d2000.Emissions) / d2000.Emissions) * 100
    };
  }).filter(Boolean);

  const x = d3.scaleBand().domain(growthData.map(d => d.country)).range([0, 700]).padding(0.4);
  const y = d3.scaleLinear().domain([0, d3.max(growthData, d => d.growth)]).nice().range([400, 0]);

  svg.append("g").attr("transform", "translate(0,400)").call(d3.axisBottom(x));
  svg.append("g").call(d3.axisLeft(y).tickFormat(d => d + "%"));

  svg.selectAll(".bar")
    .data(growthData)
    .enter()
    .append("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.growth))
    .attr("width", x.bandwidth())
    .attr("height", d => 400 - y(d.growth))
    .attr("fill", "orange");

  svg.append("text")
    .attr("x", 200)
    .attr("y", -10)
    .attr("font-size", "16px")
    .text("Scene 3: Emission Growth (2000–2020)");
}