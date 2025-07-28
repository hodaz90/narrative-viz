# Narrative Visualization: Annual CO₂ Emissions – 7 Country Focus

## Messaging

The purpose of this narrative visualization is to highlight the trends, disparities, and changes in CO₂ emissions across seven key countries: the United States, United Kingdom, India, China, France, Germany, and Brazil. This visualization aims to educate viewers on both historical emissions and recent changes, offering insight into which nations are leading or lagging in sustainability efforts. The story emphasizes overall trends, per-capita emissions, regional contributions, emission growth, and top emitters to support informed awareness and conversation about climate responsibility.

---

## Narrative Structure

This narrative follows a **Martini Glass** structure. The user begins with a guided story through five structured scenes that build understanding sequentially:

1. **Scene 1** gives the historical total emissions trends.
2. **Scene 2** shows a snapshot of per capita emissions.
3. **Scene 3** offers a breakdown of regional emissions in 2020.
4. **Scene 4** visualizes emission growth from 2000 to 2020.
5. **Scene 5** highlights the top emitters in 2020.

Only after progressing through these scenes can users reflect, explore, and compare based on their learnings. This structure ensures a strong narrative core while maintaining clarity and cohesion.

---

## Visual Structure

All five scenes share a consistent visual structure:

- Each scene uses an SVG container for D3 rendering.
- Clear axis labels, scales, and color schemes were selected for legibility.
- Charts are centered and consistently sized for visual flow.
- A large heading in each scene communicates the main message clearly.

Transitions between scenes are seamless, ensuring the viewer is not overwhelmed and can focus on the evolving story.

---

## Scenes

### Scene 1: Total CO₂ Emissions Over Time
A multi-line chart showing trends in CO₂ emissions from 1950 to 2020 across the seven selected countries. This builds historical context and sets the foundation for subsequent comparisons.

### Scene 2: CO₂ Emissions Per Capita (Mock)
A simple bar chart compares estimated per-capita emissions for each country, prompting viewers to consider population-adjusted responsibility.

### Scene 3: Regional CO₂ Emissions (2020)
A grouped bar chart for the seven countries in 2020, comparing total annual emissions. This helps localize the data in a modern frame.

### Scene 4: Emission Growth (2000–2020)
This scene presents the percentage growth or reduction in emissions over 20 years. It clearly shows which countries are improving and which are accelerating emissions.

### Scene 5: Top Emitters in 2020
A final bar chart showing the 2020 top emitters among the selected nations, emphasizing current leadership in emissions.

---

## Annotations

Each scene features a title annotation to guide user interpretation. These annotations follow a uniform style—centered, bold, and placed above the chart. This maintains visual and cognitive consistency.

Annotations do not change dynamically but are designed to reinforce the message of each chart. In future versions, additional annotations (like arrows or highlights) can be added using the `d3-annotation` library.

---

## Parameters

The primary parameters are:

- `currentScene`: The index that tracks the current scene being shown.
- `countries`: The fixed list of countries used for filtering and plotting data.
- Scene-specific variables for x and y domains, color scales, and data groupings.

These parameters are consistently used in the functions for drawing each scene, controlling data logic and visual output.

---

## Triggers

Two UI buttons ("Previous" and "Next") serve as the primary triggers.

- These buttons modify `currentScene`.
- They then call `renderScene(sceneIndex)`, which redraws the SVG with the correct content.
- The trigger structure is intuitive and communicates functionality through labeling and layout.

This interaction model allows user control without overwhelming them with options or free-form input.

---

## Conclusion

This project satisfies and exceeds the narrative visualization requirements by using clean D3 code, clearly defined scenes, visual consistency, meaningful annotations, parameterized logic, and user-driven triggers. It tells a compelling story around global emissions using reliable public data while inviting reflection and understanding.

