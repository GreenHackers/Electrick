/*

this script will draw the colors and a resistor on a canvas object,
to show band colors to the user.
also calculates the value of 4-band resistor(s) and
manages the color buttons.

sorry for my bad english.

*/

// Defining Functions
function DrawColorBand(band_number, band_color) {
  /*
  
  draw the color of each band on resistor image and
  under it.
  band_number: number of band to draw the color on it's location.
  band_color: color of the band to paint. 
  
  */
  context.beginPath();
  
  // location table for each band by number.
  var over_bands_x1 = {1: 97, 2: 125, 3: 155, 4: 201};
  var over_bands_y1 = {1: 24, 2: 31, 3: 31, 4: 24};
  var over_bands_y2 = {1: 75, 2: 61, 3: 62, 4: 75};
  var button_id = {1: 'first_button', 2: 'second_button', 
    3: 'third_button', 4: 'fourth_button'};
  if ( band_color == 'none' ) { band_color = '#D2B56C' };
  // draw band
  context.rect(over_bands_x1[band_number] + diff, 
    over_bands_y1[band_number] , 15, over_bands_y2[band_number]);
  context.fillStyle = band_color;
  context.fill();
  
  // draw a black border for it
  context.lineWidth = 2;
  context.strokeStyle = 'black';
  context.stroke();
  
  // update buttons' color
  document.getElementById(button_id[band_number]).className = band_color + ' shadow button';
};
function CalculateValue(first, second, third, fourth) {
  /*
  
  this function calculates the resistance depend on given colors.
  
  */
  
  // color table
  var table1 = {'black': 0, 'brown': 1, 'red': 2, 'orange': 3, 'yellow': 4, 'green': 5, 'blue': 6, 'purple': 7, 'gray': 8, 'white': 9, 'gold': -1, 'silver': -2};
  var table2 = {'brown': 1, 'red': 2, 'green': 0.5, 'blue': 0.25, 'purple': 0.1, 'gold': 5, 'silver': 10, 'none': 20};
  
  // get value of each band according to it's color
  band1 = table1[first];
  band2 = table1[second];
  band3 = table1[third];
  band4 = table2[fourth];
  
  // main calculations.
  var result_resistance = band1.toString() + band2.toString();
  result_resistance = (result_resistance * Math.pow(10, band3)).toString();
  var result_telorance = band4.toString() + '%';
  
  return [result_resistance, result_telorance];
};
function HumanReadable(res_val, res_tel) {
  /*
  
  makes the arguments readable for human.
  
  */
  var uncomp_message = ' with ' + res_tel.toString() + ' Telorance.';
  
  if (res_val == 0) { return '0Ω' + uncomp_message; };
  
  var s = ['mΩ', 'Ω', 'KΩ', 'MΩ', 'GΩ', 'TΩ'];
  var e = Math.floor(Math.log(res_val) / Math.log(1000));
  var result = (res_val / Math.pow(1000, e)).toFixed(2) + " " + s[e + 1];
  return result + uncomp_message;
};
function Update() {
  /*
  
  updates the canvas. this function executes twice:
  1. after loading the page
  2. on every change of colors.
  
  */
  
  // draw each band
  DrawColorBand(1, localStorage['first_band']);
  DrawColorBand(2, localStorage['second_band']);
  DrawColorBand(3, localStorage['third_band']);
  DrawColorBand(4, localStorage['fourth_band']);
  
  // calculate value of resistor and give it to 'resistor' variable
  var resistor = CalculateValue(localStorage['first_band'], localStorage['second_band'], 
  localStorage['third_band'], localStorage['fourth_band']);
  // make it readable
  var result = HumanReadable(resistor[0], resistor[1]);
  // finnaly show it to 'result_viewer' element (that is a paragraph)
  document.getElementById('result_viewer').innerHTML = result;
};
function ToggleVisable(id) {
  /*
  
  hide or show an element. used in two ways:
  1. show color buttons
  2. hide those after clicking on each one.
  
  */
  
  // get current state if element
  state = document.getElementById(id).style.display;
  
  // toggle it
  if ( state == 'block' ) {
    document.getElementById(id).style.display = 'none';
  } else {
    document.getElementById(id).style.display = 'block';
  };
};
function ChangeColor(bandnumber, is_selected) {
  /*
  
  change color of each band. color buttons will use it.
  
  */
  
  if ( is_selected ) {
    var tocolor = localStorage['selected_color'];
    
    switch(parseInt(bandnumber)) {
    case 1:
      localStorage['first_band'] = tocolor; break;
    case 2:
      localStorage['second_band'] = tocolor; break;
    case 3:
      localStorage['third_band'] = tocolor; break;
    default:
      localStorage['fourth_band'] = tocolor;
    };
    localStorage['selected'] = false;
    // update the canvas element (resistor image)
    Update();
  } else {
    localStorage['band_number'] = bandnumber;
    window.location.href = 'color_selector.html';
  }
};

// Declaring Variables
var canvas, context, image, diff;

function main() {
  // Declaring Variables
  // main canvas to draw resistor
  canvas = document.getElementById('cnvResistorColors');
  // context object of main canvas
  context = canvas.getContext('2d');
  // the resistor image without color bands.
  image = new Image();
  // difference of screen.
  /*
  screen may be smaller than resistor image
  this variable used for get difference between page width and canvas width
  to place the resistor image at center of any screen  
  */
  
  // Draw Resistor Image
  image.onload = function () {
    // calculate the diff(erence) value
    diff = image.width - window.innerWidth;
    if (diff < 0) { diff = 0; };
    diff = diff / 2;
    diff = -diff
    context.drawImage(image, 0 + diff, 0);
  };
  // load the resistor image from file
  image.src = '../image/resistor_colors.png';
  
  // calculate the diff(erence) value again
  diff = image.width - window.innerWidth; // difference between page width and canvas width
  diff += Math.abs(diff); // if diff is negative make it zero. otherwise double it.
  diff /= 4; // subdivide diff by 2 twice
  diff = -diff // for use easier.
  
  if ( localStorage['selected'] == "true" ) {
    ChangeColor(localStorage['band_number'], true);
  } else {
    // startup values of each band.
    localStorage['first_band'] = 'brown';
    localStorage['second_band'] = 'red';
    localStorage['third_band'] = 'yellow';
    localStorage['fourth_band'] = 'green';
    
    // first time update (initialize image)
    Update();
  };
};
