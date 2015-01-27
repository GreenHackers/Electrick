var field, btnRemove, count;

function AddElement() {
  var element = document.createElement('input');

  element.id = 'input_' + (count++).toString();
  
  field.appendChild(element);
  
  btnRemove.style.display = '';
  ValidateAll();
};

function RemoveElement() {
  var element = document.getElementById('input_' + (--count).toString());
  field.removeChild(element);
  if (count == 0) {
    btnRemove.style.display = 'none';
    document.getElementById('result_viewer').innerHTML = 'Add more fields.';
  } else {
  ValidateAll();
  };
};

function ValidateAll() {
  var have_empty = false;
  for (item = 0; item < count; item++) {
    var element = document.getElementById('input_' + item.toString());
    element.value = element.value.replace(/[^\d]/g,'');
    if (element.value == '') { have_empty = true; };
  };
  if (have_empty) {
    document.getElementById('result_viewer').innerHTML = 'Enter value to empty field(s).'; 
    return;
  };
  Calculate();
};

function Calculate() {
  var result;
  if (count == 1) {
    result = parseInt(document.getElementById('input_0').value);
  } else {
    var sum = 0;
    for (item = 0; item < count; item++) {
      var element = document.getElementById('input_' + item.toString());
      given = parseInt(element.value);
      sum += 1 / given;
    };
    result = 1 / sum;
  };
  document.getElementById('result_viewer').innerHTML = result.toString() + 'Ω';
};

function main() {
	field = document.getElementById('dynamic_field');
	btnRemove = document.getElementById('btnRemove');
	count = 0;

	btnRemove.style.display = 'none';
};
