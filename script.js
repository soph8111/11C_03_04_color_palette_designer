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
  colors.forEach((color) => {
    color.rgb = convertHslToRgb(color.hsl.h, color.hsl.s, color.hsl.l);
  });
  colors.forEach((color) => {
    color.hex = convertRgbToHex(color.rgb);
  });
  showBox(colors);
  showHsl(colors);
  showRgb(colors);
  showHex(colors);
}

function getHarmony(hsl) {
  if (harmony.value === "analogous") {
    chooseAnalogous(hsl);
  } else if (harmony.value === "monochromatic") {
    chooseMonochromatic(hsl);
  } else if (harmony.value === "triad") {
    chooseTraid(hsl);
  } else if (harmony.value === "complementary") {
    chooseComplementary(hsl);
  } else if (harmony.value === "compound") {
    chooseCompound(hsl);
  } else if (harmony.value === "shades") {
    chooseShades(hsl);
  }
}

// SHOW FUNCTIONS
function showBox(object) {
  document.querySelector("#color_one .color_box").style.background = object[0].hex;
  document.querySelector("#color_two .color_box").style.background = object[1].hex;
  document.querySelector("#color_three .color_box").style.background = object[2].hex;
  document.querySelector("#color_four .color_box").style.background = object[3].hex;
  document.querySelector("#color_five .color_box").style.background = object[4].hex;
}

function showHsl(object) {
  document.querySelector("#color_one .HSL").textContent = `HSL: ${object[0].hsl.h} ${object[0].hsl.s}% ${object[0].hsl.l}%`;
  document.querySelector("#color_two .HSL").textContent = `HSL: ${object[1].hsl.h} ${object[1].hsl.s}% ${object[1].hsl.l}%`;
  document.querySelector("#color_three .HSL").textContent = `HSL: ${object[2].hsl.h} ${object[2].hsl.s}% ${object[2].hsl.l}%`;
  document.querySelector("#color_four .HSL").textContent = `HSL: ${object[3].hsl.h} ${object[3].hsl.s}% ${object[3].hsl.l}%`;
  document.querySelector("#color_five .HSL").textContent = `HSL: ${object[4].hsl.h} ${object[4].hsl.s}% ${object[4].hsl.l}%`;
}

function showRgb(object) {
  document.querySelector("#color_one .RGB").textContent = `RGB: ${object[0].rgb.r}, ${object[0].rgb.g}, ${object[0].rgb.b}`;
  document.querySelector("#color_two .RGB").textContent = `RGB: ${object[1].rgb.r}, ${object[1].rgb.g}, ${object[1].rgb.b}`;
  document.querySelector("#color_three .RGB").textContent = `RGB: ${object[2].rgb.r}, ${object[2].rgb.g}, ${object[2].rgb.b}`;
  document.querySelector("#color_four .RGB").textContent = `RGB: ${object[3].rgb.r}, ${object[3].rgb.g}, ${object[3].rgb.b}`;
  document.querySelector("#color_five .RGB").textContent = `RGB: ${object[4].rgb.r}, ${object[4].rgb.g}, ${object[4].rgb.b}`;
}

function showHex(object) {
  document.querySelector("#color_one .HEX").textContent = `HEX: ${object[0].hex}`;
  document.querySelector("#color_two .HEX").textContent = `HEX: ${object[1].hex}`;
  document.querySelector("#color_three .HEX").textContent = `HEX: ${object[2].hex}`;
  document.querySelector("#color_four .HEX").textContent = `HEX: ${object[3].hex}`;
  document.querySelector("#color_five .HEX").textContent = `HEX: ${object[4].hex}`;
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

  const hsl = { h, s, l };

  return hsl; // make this to an object ? hsl = {h,s,l} and then return hsl.
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

function convertRgbToHex(rgb) {
  let r = rgb.r.toString(16);
  let g = rgb.g.toString(16);
  let b = rgb.b.toString(16);
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  const hex = "#" + r + g + b;
  return hex;
}

// HARMONY FUNCTIONS
function chooseAnalogous(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h + 15, s: hsl.s, l: hsl.l },
  };

  const colorThree = {
    hsl: { h: hsl.h + 30, s: hsl.s, l: hsl.l },
  };
  const colorFour = {
    hsl: { h: hsl.h + 45, s: hsl.s, l: hsl.l },
  };
  const colorFive = {
    hsl: { h: hsl.h + 60, s: hsl.s, l: hsl.l },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);

  // return [colorOne, colorTwo, colorThree, colorFour, colorFive]
}

function chooseMonochromatic(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h, s: hsl.s + 15, l: hsl.l },
  };

  const colorThree = {
    hsl: { h: hsl.h, s: hsl.s + 30, l: hsl.l },
  };
  const colorFour = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l + 15 },
  };
  const colorFive = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l + 30 },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);
}

function chooseTraid(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h + 120, s: hsl.s, l: hsl.l },
  };

  const colorThree = {
    hsl: { h: hsl.h + 120, s: hsl.s, l: hsl.l + 30 },
  };
  const colorFour = {
    hsl: { h: hsl.h + 240, s: hsl.s, l: hsl.l },
  };
  const colorFive = {
    hsl: { h: hsl.h + 240, s: hsl.s, l: hsl.l + 30 },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);
}

function chooseComplementary(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h, s: hsl.s + 20, l: hsl.l },
  };

  const colorThree = {
    hsl: { h: hsl.h, s: hsl.s + 20, l: hsl.l + 20 },
  };
  const colorFour = {
    hsl: { h: hsl.h + 180, s: hsl.s, l: hsl.l },
  };
  const colorFive = {
    hsl: { h: hsl.h + 180, s: hsl.s + 20, l: hsl.l + 10 },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);
}

function chooseCompound(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h + 140, s: hsl.s + 20, l: hsl.l },
  };

  const colorThree = {
    hsl: { h: hsl.h + 140, s: hsl.s + 20, l: hsl.l + 20 },
  };
  const colorFour = {
    hsl: { h: hsl.h + 210, s: hsl.s, l: hsl.l },
  };
  const colorFive = {
    hsl: { h: hsl.h + 210, s: hsl.s + 20, l: hsl.l + 20 },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);
}

function chooseShades(hsl) {
  const colorOne = {
    hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
  };

  const colorTwo = {
    hsl: { h: hsl.h, s: hsl.s + 10, l: hsl.l + 10 },
  };

  const colorThree = {
    hsl: { h: hsl.h, s: hsl.s + 20, l: hsl.l + 20 },
  };
  const colorFour = {
    hsl: { h: hsl.h, s: hsl.s - 10, l: hsl.l - 10 },
  };
  const colorFive = {
    hsl: { h: hsl.h, s: hsl.s - 20, l: hsl.l - 20 },
  };

  colors = [colorOne, colorTwo, colorThree, colorFour, colorFive];
  const underOrOver360 = calculateOverOrUnder360(colors);

  calculateAllColors(underOrOver360);
}

function calculateOverOrUnder360(colorsArray) {
  for (let i = 0; i < 5; i++) {
    if (colorsArray[i].hsl.h > 360) {
      colorsArray[i].hsl.h -= 360;
    } else if (colorsArray[i].hsl.h < 0) {
      colorsArray[i].hsl.h += 360;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (colorsArray[i].hsl.s > 100) {
      colorsArray[i].hsl.s = 100;
    } else if (colorsArray[i].hsl.s < 0) {
      colorsArray[i].hsl.s = 0;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (colorsArray[i].hsl.l > 100) {
      colorsArray[i].hsl.l = 100;
    } else if (colorsArray[i].hsl.l < 0) {
      colorsArray[i].hsl.l = 0;
    }
  }

  return colorsArray;
}
