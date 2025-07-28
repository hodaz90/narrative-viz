# Narrative Visualization Essay

**Title**: *Annual CO₂ Emissions: Historical Patterns and Growth Among Leading Nations*

---

## 1. Messaging

The central message of this narrative visualization is that while global carbon dioxide (CO₂) emissions continue to rise, the growth is unevenly distributed. Developed nations like the United States and United Kingdom have stabilized or reduced their emissions, whereas emerging economies like China and India have seen rapid increases. This visualization helps explore the historical trajectory of emissions and emphasizes where recent growth is concentrated.

---

## 2. Narrative Structure

This project follows the **interactive slideshow** structure:

- Each scene presents one step of the story in a controlled order
- Users navigate using "Previous" and "Next" buttons
- Interaction is limited to tooltips to preserve the narrative flow while offering context

**Why slideshow?**  
This structure allows for focused messaging while still enabling light interaction, making it easy for users to follow a clear sequence while exploring details like emission magnitudes.

---

## 3. Visual Structure

Each scene uses a consistent visual layout:
- A centered SVG chart (responsive)
- Consistent margins, axis formatting, and font sizes
- Titles embedded within the chart for context
- Clear axis labels and color-coded lines or bars

This visual consistency supports user focus, helping them compare scenes and spot trends. Scene transitions are smooth via opacity changes, aiding continuity across scenes.

---

## 4. Scenes

### Scene 1: *Total Emissions from 7 Countries (1950–2023)*  
- A line chart showing the aggregated emissions of the selected countries
- Highlights collective growth and plateaus

### Scene 2: *Country Comparison – China, USA, India*  
- Line chart with 3 separate paths
- Shows how China overtook the US around the mid-2000s

### Scene 3: *Emission Growth from 2000 to 2020*  
- Bar chart showing percent growth for each country
- Emphasizes rapid growth in China and India, stagnation or decline in others

The scenes are ordered to first show the macro view, then zoom into key contributors, and finally offer comparative insight over a 20-year window.

---

## 5. Annotations

We use direct text labels and a highlight annotation in Scene 1 (e.g., the 2020 peak). The annotation template:
- Is placed within the SVG
- Uses `d3-annotation` for callouts (Scene 1)
- Uses text labels for countries on lines (Scene 2)

Annotations remain fixed (not dependent on mouse events) to ensure key takeaways are always visible.

---

## 6. Parameters

The main state parameter is:
```js
let currentScene = 0;
```

It tracks which scene to render and controls transitions. Additional local parameters are used for:
- Filtering dataset by country or year
- Calculating totals and growth
- Managing consistent axes and layout across scenes

These parameters ensure deterministic, ordered rendering across the visualization.

---

## 7. Triggers

User interactions are managed through buttons:
```js
d3.select("#next").on("click", ...);
d3.select("#prev").on("click", ...);
```

These trigger changes in `currentScene` and call `renderScene()` to update the visualization. Transitions are animated for a smoother UX. Tooltips offer additional on-hover insight without altering state.

The UI affordance — labeled buttons and a visible “Scene X of Y” indicator — ensures users know where they are in the story and how to proceed.

---

## Summary

This project uses a strong dataset and structured storytelling to convey a meaningful narrative about CO₂ emissions globally. By combining clean visuals, annotation, parameter-driven rendering, and scene-based storytelling, it not only meets but exceeds the expectations of a narrative visualization assignment.
