form.addEventListener('submit', function (e) {
    e.preventDefault()

    var value = document.getElementById('value').value
    var uom = document.getElementById('uom-dropdown').value
    var outputuom = document.getElementById('output-dropdown').value

    fetch("https://dev.utilities.h-n.io/v1/convert", {
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
let dropdown = document.getElementById('uom-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'FROM';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;



const url = 'https://dev.utilities.h-n.io/v1/options';

fetch(url)
    .then(
        function (response) {
            if (response.status !== 200) {
                console.warn('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            console.log(response);

            response.json().then(function (data) {
                var option;
                var banana = JSON.parse(data);

                for (var i = 0; i < banana.UnitsofMeasurement.length; i++) {
                    option = document.createElement('option');
                    option.text = banana.UnitsofMeasurement[i].initialUOM.toUpperCase();
                    option.value = banana.UnitsofMeasurement[i].initialUOM;
                    dropdown.add(option);
                }
            });
        }
    )
    .catch(function (err) {
        console.error('Fetch Error -', err);
    });


// Output UOM List
let dropdownTwo = document.getElementById('output-dropdown');
dropdownTwo.length = 0;

let defaultOptionTwo = document.createElement('option');
defaultOptionTwo.text = 'TO';

dropdownTwo.add(defaultOptionTwo);
dropdownTwo.selectedIndex = 0;

fetch(url)
    .then(
        function (responseTwo) {
            if (responseTwo.status !== 200) {
                console.warn('Looks like there was a problem. Status Code: ' + responseTwo.status);
                return;
            }
            console.log(responseTwo);

            responseTwo.json().then(function (data) {
                var optionTwo;
                var bananaTwo = JSON.parse(data);

                for (var i = 0; i < bananaTwo.UnitsofMeasurement.length; i++) {
                    optionTwo = document.createElement('option');
                    optionTwo.text = bananaTwo.UnitsofMeasurement[i].desiredUOM.toUpperCase();
                    optionTwo.value = bananaTwo.UnitsofMeasurement[i].desiredUOM;
                    dropdownTwo.add(optionTwo);
                }
            });
        }
    )
    .catch(function (err) {
        console.error('Fetch Error -', err);
    });