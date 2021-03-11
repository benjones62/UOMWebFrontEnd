const url = 'https://dev.utilities.h-n.io/v1/options';
var banana = [];
var uniqueBanana = [];

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
            banana.push(item);
        }
        console.log(banana); // works
        console.log(obj.UnitsofMeasurement[0]);  // works

        uniqueBanana = banana.filter(onlyUnique);
        console.log(uniqueBanana);
        
        for (var i = 0; i < uniqueBanana.length; i++) {
            option = document.createElement('option');
            option.text = uniqueBanana[i].toUpperCase();
            option.value = uniqueBanana[i];
            dropdown.add(option);
        }

        for (var i = 0; i < uniqueBanana.length; i++) {
            option = document.createElement('option');
            option.text = uniqueBanana[i].toUpperCase();
            option.value = uniqueBanana[i];
            dropdownTwo.add(option);
        }
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
console.log(uniqueBanana.UnitsofMeasurement);  // works


// function myClick(){
//     for (var i = 0; i < uniqueBanana.length; i++) {
//         optionTwo = document.createElement('option');
//         optionTwo.text = uniqueBanana[i].toUpperCase();
//         optionTwo.value = uniqueBanana[i];
//         dropdownTwo.add(optionTwo);
//     }








