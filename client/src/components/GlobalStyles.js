import { createGlobalStyle } from "styled-components";
// COLOUR PALLETTE
// #2C2A30
// #94B8FF
// #C1BFFF
// #E6E6FA
// #DAF0FB
export default createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
  transition: all 0.2s ease;
}

/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
  font-family: 'Roboto Mono', monospace;
  color: ${(props) => (props.darkMode ? "#fff" : "#2C2A30")};

}
p, div {
  font-family: 'Poppins', sans-serif;
  color: ${(props) => (props.darkMode ? "#fff" : "#2C2A30")};
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}
`;
