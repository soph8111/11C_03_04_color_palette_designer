"use strict";

const color = document.querySelector("#selected_color");
let colors;
let rgb;

window.addEventListener("DOMContentLoaded", getColor);

function getColor() {
  color.addEventListener("input", selectedColor); //maybe another name for the function???
}

function selectedColor(event) {
  const rgbObject = convertHexToRgb(event.target.value);
  const hslStr = convertRgbToHsl(rgbObject.r, rgbObject.g, rgbObject.b);

  getHarmony(hslStr);
}

function calculateAllColors(colors) {
  console.log(colors);
  colors.forEach((color) => {
    color.rgb = convertHslToRgb(color.h, color.s, color.l);
  });
  showRgb(colors);
}

// SHOW FUNCTIONS

function showRgb(object) {
  console.log(object);
  document.querySelector("#color_one .RGB").textContent = `RGB: ${object[0].rgb.r}, ${object[0].rgb.g}, ${object[0].rgb.b}`;
  document.querySelector("#color_two .RGB").textContent = `RGB: ${object[1].rgb.r}, ${object[1].rgb.g}, ${object[1].rgb.b}`;
  document.querySelector("#color_three .RGB").textContent = `RGB: ${object[2].rgb.r}, ${object[2].rgb.g}, ${object[2].rgb.b}`;
  document.querySelector("#color_four .RGB").textContent = `RGB: ${object[3].rgb.r}, ${object[3].rgb.g}, ${object[3].rgb.b}`;
  document.querySelector("#color_five .RGB").textContent = `RGB: ${object[4].rgb.r}, ${object[4].rgb.g}, ${object[4].rgb.b}`;
}

// CONVERTERS

function convertHexToRgb(hex) {
  const rgb = {
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

  return { h, s, l };
}

function getHarmony(h, s, l) {
  if (harmony.value === "analogous") {
    chooseAnalogous(h, s, l);
  } else if (harmony.value === "monochromatic") {
    chooseMonochromatic(s, l);
  } else if (harmony.value === "traid") {
    chooseTraid(h, l);
  } else if (harmony.value === "complementary") {
    chooseComplementary(h, s, l);
  } else if (harmony.value === "compound") {
    chooseCompound(); // ?????
  } else if (harmony.value === "shades") {
    chooseShades(l);
  }
}

function convertHslToRgb(h, s, l) {
  h = h;
  s = s / 100;
  l = l / 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
}

// HARMONY FUNCTIONS
function chooseAnalogous(hsl) {
  const colorOne = {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l,
  };

  const colorTwo = {
    h: (hsl.h += 10),
    s: hsl.s,
    l: hsl.l,
  };
  const colorThree = {
    h: (hsl.h += 20),
    s: hsl.s,
    l: hsl.l,
  };
  const colorFour = {
    h: (hsl.h -= 10),
    s: hsl.s,
    l: hsl.l,
  };
  const colorFive = {
    h: (hsl.h -= 20),
    s: hsl.s,
    l: hsl.l,
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const hCalculated = calculateAlogousH(colors);

  calculateAllColors(hCalculated);

  // return [colorOne, colorTwo, colorThree, colorFour, colorFive]
}

function calculateAlogousH(colorsArray) {
  if (colorsArray[0].h > 360) {
    colorsArray[0].h -= 360;
  } else if (colorsArray[0].h < 0) {
    colorsArray[0].h += 360;
  }

  // lige nu arbejdes der kun med colorsArray[0]... ret dette til

  return colorsArray;
}
