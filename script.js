let currentScene = 1;

function clearViz() {
  d3.select('#viz').html('');
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
      d.Emissions = +d.Emissions;
    });

    const x = d3.scaleLinear()
      .domain(d3.extent(data, d => d.Year))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Emissions)])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(countries);
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

  // Mocked values until real per capita data is provided
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

  svg.selectAll("bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", d => x(d.country))
    .attr("y", d => y(d.value))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.value))
    .attr("fill", "#4CAF50");

  svg.selectAll("text.bar")
    .data(data)
    .enter()
    .append("text")
    .text(d => d.value)
    .attr("x", d => x(d.country) + x.bandwidth() / 2)
    .attr("y", d => y(d.value) - 5)
    .attr("text-anchor", "middle");
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
    const year2020 = data.filter(d => d.Year === "2020");
    const grouped = d3.rollup(year2020, v => d3.sum(v, d => +d.Emissions), d => d.Entity);

    const items = Array.from(grouped, ([country, value]) => ({ country, value }));
    items.sort((a, b) => b.value - a.value);

    const top10 = items.slice(0, 7);

    const x = d3.scaleBand().domain(top10.map(d => d.country)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(top10, d => d.value) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("bar")
      .data(top10)
      .enter()
      .append("rect")
      .attr("x", d => x(d.country))
      .attr("y", d => y(d.value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.value))
      .attr("fill", "#2196F3");
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
      if (d2000 && d2020 && +d2000.Emissions > 0) {
        const growth = ((+d2020.Emissions - +d2000.Emissions) / +d2000.Emissions) * 100;
        growthData.push({ country: c, growth: Math.round(growth) });
      }
    });

    growthData.sort((a, b) => b.growth - a.growth);
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
    yearData.sort((a, b) => +b.Emissions - +a.Emissions);
    const top7 = yearData.slice(0, 7);

    const x = d3.scaleBand().domain(top7.map(d => d.Entity)).range([0, width]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(top7, d => +d.Emissions) * 1.1]).range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));
    svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));

    svg.selectAll("rect")
      .data(top7)
      .enter()
      .append("rect")
      .attr("x", d => x(d.Entity))
      .attr("y", d => y(+d.Emissions))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(+d.Emissions))
      .attr("fill", "#9C27B0");
  });
}
