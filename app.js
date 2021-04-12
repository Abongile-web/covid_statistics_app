//fetch api as soon as website loads
window.onload = () => {
    let api = 'https://api.covid19api.com/summary';

fetch(api)
  .then(response => response.json())
  .catch(function(error) {
      console.log(error);
  })
  .then(data => {
    console.log(data);
    //get data that is going to be used
    //worldwide data

    let worldWideCases = data.Global.TotalConfirmed;
    let worldWideRecovered = data.Global.TotalRecovered;
    let worldWideDeaths = data.Global.TotalDeaths;

    let newWorldWideCases = data.Global.NewConfirmed;
    let newWorldWideRecovered = data.Global.NewRecovered;
    let newWorldWideDeaths = data.Global.NewDeaths;

    //display information on site
    document.querySelector('#confirmed_number').textContent = worldWideCases;
    document.querySelector('#recovered_number').textContent = worldWideRecovered;
    document.querySelector('#deaths_number').textContent = worldWideDeaths;

    document.querySelector('.confirmed span').textContent = '+' + newWorldWideCases;
    document.querySelector('.recovered span').textContent = '+' + newWorldWideRecovered;
    document.querySelector('.deaths span').textContent = '+' + newWorldWideDeaths;
});
}

//get user input when submit button is clicked
let submit = document.querySelector('#submit');

submit.addEventListener('click', () => {
    let input = document.querySelector('.selection input').value;
    let api2 = `https://api.covid19api.com/live/country/${input}/status/confirmed/date/2020-03-21T13:13:30Z`;

    //fetch api with country data

    fetch(api2)
    .then(response2 => response2.json())
    .then(data2 => {
        console.log(data2);

        if (data2.length == 0 || input == "") {
            alert('Country not found.');
        } else {
        let length = data2.length;
        let index = length -1;

        //get all information needed

        let countryCases = data2[index].Confirmed;
        let countryRecovered = data2[index].Recovered;
        let countryDeaths = data2[index].Deaths;
        let active = data2[index].Active;
        let province = data2[index].Province;

        //display country information on site
        document.querySelector('#confirmed_number2').textContent = countryCases;
        document.querySelector('#recovered_number2').textContent = countryRecovered;
        document.querySelector('#deaths_number2').textContent = countryDeaths;

        document.querySelector('#countryName').textContent = input;
        document.querySelector('#countryName').append(' ' + province);
        document.querySelector('#active').textContent = active + ' active cases';

        //scroll to country section when button is clicked
        let countryOverview = document.querySelector('#countryName');

        countryOverview.scrollIntoView();

        }
    })
})