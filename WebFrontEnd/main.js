const url = 'https://m3s085lmsd.execute-api.us-west-2.amazonaws.com/development/v1/units';
var payload = [];
var uniquePayload = [];

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  // usage example:
  var a = ['a', 1, 'a', 2, '1'];
  var unique = a.filter(onlyUnique);


form.addEventListener('submit', function (e) {
    e.preventDefault()

    var value = document.getElementById('value').value
    var uom = document.getElementById('uom-dropdown').value
    var outputuom = document.getElementById('output-dropdown').value

    fetch("https://m3s085lmsd.execute-api.us-west-2.amazonaws.com/development/v1/convert", {
        method: 'POST',
        body: JSON.stringify({
            initialValue: value,
            initialUOM: uom,
            desiredUOM: outputuom
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var results = document.getElementById('results');
            results.innerHTML = `<p>Your result is ${data.result}</p>`
        })
});



// Initial UOM List
var dropdown = document.getElementById('uom-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'From';
dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

// Output UOM List
let dropdownTwo = document.getElementById('output-dropdown');
dropdownTwo.length = 0;

let defaultOptionTwo = document.createElement('option');
defaultOptionTwo.text = 'To';

dropdownTwo.add(defaultOptionTwo);
dropdownTwo.selectedIndex = 0;

fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);  // returns whole object
        obj = JSON.parse(data);
        console.log(obj);   // returns object as json ready to parse
        console.log(obj.UnitsofMeasurement.length);  // valid

        for (var i = 0; i < obj.UnitsofMeasurement.length; i++){
            item = obj.UnitsofMeasurement[i].initialUOM;
            payload.push(item);
        }
        console.log(payload); // works
        console.log(obj.UnitsofMeasurement[0]);  // works

          uniquePayload = payload.filter(onlyUnique);
          console.log(uniquePayload);

          for (var i = 0; i < uniquePayload.length; i++) {
              option = document.createElement('option');
              option.text = uniquePayload[i].toUpperCase();
              option.value = uniquePayload[i];
            dropdown.add(option);
        }

          for (var i = 0; i < uniquePayload.length; i++) {
            option = document.createElement('option');
              option.text = uniquePayload[i].toUpperCase();
              option.value = uniquePayload[i];
            dropdownTwo.add(option);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
console.log(uniquePayload.UnitsofMeasurement);  // works









