"use strict";

const color = document.querySelector("#selected_color");

window.addEventListener("DOMContentLoaded", getColor);

function getColor() {
  color.addEventListener("input", selectedColor); //maybe another name for the function???
}

function selectedColor(event) {
  const rgbObject = convertHexToRgb(event.target.value);
  const hslStr = convertRgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);

  getHarmony(hslStr);
}

// CONVERTERS

function convertHexToRgb(hex) {
  console.log(hex);
  rgb = {
    r: parseInt(hex.substring(1, 3), 16),
    g: parseInt(hex.substring(3, 5), 16),
    b: parseInt(hex.substring(5, 7), 16),
  };
  return rgb;
}

function convertRgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // Rounding to even numbers
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing

  return { h, s, l };
}

function getHarmony(h, s, l) {
  if (harmony.value === "Analogous") {
  } else if (harmony.value === "Monochromatic") {
  } else if (harmony.value === "Traid") {
  } else if (harmony.value === "Complementary") {
  } else if (harmony.value === "Compound") {
  } else if (harmony.value === "Shades") {
  }
}
