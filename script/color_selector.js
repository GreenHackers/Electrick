function SendColor(color_name) {
  // put color_name in selected_color
	localStorage['selected_color'] = color_name;
  // set status as selected
  localStorage['selected'] = true;
  // return to selector page.
	window.location.href = 'resistor_colors.html';
};
function DisableColor(color) {
  var elements = document.getElementsByClassName("button");
  for (var i=0; i < elements.length; i++) {
    if ( elements[i].innerHTML == color ) {
      elements[i].className = 'hidden';
    };
  };
};
function main() {
  band_number = parseInt(localStorage['band_number']);
  switch(band_number) {
    case 1:
    case 2:
      DisableColor('Gold');
      DisableColor('Silver');
      DisableColor('NONE'); break;
    case 3:
      DisableColor('NONE'); break;
    default:
      DisableColor('Black');
      DisableColor('Orange');
      DisableColor('Yellow');
      DisableColor('White'); break;
  };
};
