fetch('https://covid-api.mmediagroup.fr/v1/cases')
  .then((response) => response.json())
  .then((result1) => {
    fetch('https://covid-api.mmediagroup.fr/v1/vaccines')
      .then((response) => response.json())
      .then((result2) => {
        let worldPop = result1.Global.All.population
        let covidCases = result1.Global.All.confirmed
        let confirmedDeaths = result1.Global.All.deaths
        let administered = result2.Global.All.administered
        let vaccinated = result2.Global.All.people_vaccinated
        let vaccinatedPartially = result2.Global.All.people_partially_vaccinated
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
          type: 'pie',
          data: {
            labels: [
              `Current world population (${worldPop})`,
              `Confirmed COVID-19 cases (${covidCases})`,
              `Confirmed deaths due to COVID-19 (${confirmedDeaths})`,
              `Administered vaccines (${administered})`,
              `Fully vaccinated people (${vaccinated})`,
              `Partially vaccinated people (${vaccinatedPartially})`
            ],
            datasets: [{
              label: 'world-wide COVID-19 and vaccine data',
              data: [worldPop, covidCases, confirmedDeaths, administered, vaccinated, vaccinatedPartially],
              backgroundColor: [
                'lightgreen',
                'lightcoral',
                'red',
                'blue',
                'lightblue',
                'lightskyblue'
              ],
              borderColor: [
                'black',
                'black',
                'black',
                'black',
                'black',
                'black'
              ],
              borderWidth: 1,
              hoverOffset: 4
            }]
          }
        })
      })
  })

document.querySelector("#countryForm").addEventListener("submit", (event) => {
  event.preventDefault()
  let country = document.querySelector("#countryField").value
  if ((/[a-z]+/i.test(country))) {
    fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + country)
      .then((response) => response.json())
      .then((result1) => {
        fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=' + country)
          .then((response) => response.json())
          .then((result2) => {
            let countryPop = result1.All.population
            let covidCases = result1.All.confirmed
            let confirmedDeaths = result1.All.deaths
            let administered = result2.All.administered
            let vaccinated = result2.All.people_vaccinated
            let vaccinatedPartially = result2.All.people_partially_vaccinated
            var ctx = document.getElementById('myChart2');
            var myChart = new Chart(ctx, {
              type: 'pie',
              data: {
                labels: [
                  `Current population (${countryPop})`,
                  `Confirmed COVID-19 cases (${covidCases})`,
                  `Confirmed deaths due to COVID-19 (${confirmedDeaths})`,
                  `Administered vaccines (${administered})`,
                  `Fully vaccinated people (${vaccinated})`,
                  `Partially vaccinated people (${vaccinatedPartially})`
                ],
                datasets: [{
                  label: 'world-wide COVID-19 data',
                  data: [countryPop, covidCases, confirmedDeaths, administered, vaccinated, vaccinatedPartially],
                  backgroundColor: [
                    'lightgreen',
                    'lightcoral',
                    'red',
                    'blue',
                    'lightblue',
                    'lightskyblue'
                  ],
                  borderColor: [
                    'black',
                    'black',
                    'black',
                    'black',
                    'black',
                    'black'
                  ],
                  borderWidth: 1,
                  hoverOffset: 4
                }]
              }
            })
          })
      })
  }
  else {
    ulContinent.innerHTML = "Please type in a continent, staring with a capitalized letter, ex. \"France\""
  }
})
