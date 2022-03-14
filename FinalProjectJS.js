let worldButton = document.querySelector("#worldButton")
let ulWorld = document.querySelector("#worldList")

worldButton.addEventListener("click", () => {
  if (worldButton.value === "Show COVID data") {
    worldButton.value = "Hide COVID data"
    worldButton.innerHTML = "Hide COVID data"
    fetch('https://covid-api.mmediagroup.fr/v1/cases')
      .then((response) => response.json())
      .then((result1) => {
        fetch('https://covid-api.mmediagroup.fr/v1/vaccines')
          .then((response) => response.json())
          .then((result2) => {
            const obj1 = { //Jag kunde laddat result.Global istället för obj1 men jag ville ha mina egna keys
              "Current population of the world": result1.Global.All.population.toLocaleString("sv"),
              "Confirmed COVID-19 cases": result1.Global.All.confirmed.toLocaleString("sv"),
              "Confirmed deaths due to COVID-19": result1.Global.All.deaths.toLocaleString("sv"),
              "Administered vaccines": result2.Global.All.administered.toLocaleString("sv"),
              "Fully vaccinated people": result2.Global.All.people_vaccinated.toLocaleString("sv"),
              "Partially vaccinated people": result2.Global.All.people_partially_vaccinated.toLocaleString("sv"),
              "List last updated at": result1.Spain.Andalusia.updated
            }
            for (const [key, value] of Object.entries(obj1)) {
              ulWorld.innerHTML += `<li>  ${key}: ${value} </li>`
            }
          })
      })
  }
  else {
    ulWorld.innerHTML = ""
    worldButton.innerHTML = "Show COVID data"
    worldButton.value = "Show COVID data"
  }
})

let ulCountry = document.querySelector("#countryList")
let storageCountry = {}
document.querySelector("#formCountry").addEventListener("submit", async (event) => {
  event.preventDefault()
  let country = document.querySelector("#inputFieldCountry").value
  if ((/[a-z]+/i.test(country))) {
    const result = await (await fetch('https://covid-api.mmediagroup.fr/v1/cases?country=' + country)).json()
    ulCountry.innerHTML = ""
    for (const [key, value] of Object.entries(result.All)) {
      ulCountry.innerHTML += `<li>  ${key.replace(/_/g, " ")}: ${value.toLocaleString("sv")} </li>` //lägger till mellanslag eller komma efter 3 siffor och byter ut _ mot mellanslag i alla nycklar
    }
    localStorage.setItem("storageCountry", JSON.stringify(result.All))
  }
  else {
    ulCountry.innerHTML = "Please type in a country, staring with a capitalized letter, ex.  \"Spain\""
  }
})

window.addEventListener("load", () => {
  ulCountry.innerHTML += "<i>" + "Your previous search was:" + "</i>"
  for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem("storageCountry")))) {
    ulCountry.innerHTML += `<li>  ${key.replace(/_/g, " ")}: ${value.toLocaleString("sv")} </li>`
  }
})

let ulVaccine = document.querySelector("#vaccineList")
let storageVaccine = {}
document.querySelector("#formVaccine").addEventListener("submit", async (event) => {
  event.preventDefault()
  let country = document.querySelector("#inputFieldVaccine").value
  if ((/[a-z]+/i.test(country))) {
    let result = await (await fetch('https://covid-api.mmediagroup.fr/v1/vaccines?country=' + country)).json()
    ulVaccine.innerHTML = ""
    for (const [key, value] of Object.entries(result.All)) {
      ulVaccine.innerHTML += `<li>  ${key.replace(/_/g, " ")}: ${value.toLocaleString("sv")} </li>`
    }
    localStorage.setItem("storageVaccine", JSON.stringify(result.All))
  }
  else {
    ulVaccine.innerHTML = "Please type in a country, staring with a capitalized letter, ex.  \"Spain\""
  }
})

window.addEventListener("load", () => {
  ulVaccine.innerHTML += "<i>" + "Your previous search was:" + "</i>"
  for (const [key, value] of Object.entries(JSON.parse(localStorage.getItem("storageVaccine")))) {
    ulVaccine.innerHTML += `<li>  ${key.replace(/_/g, " ")}: ${value.toLocaleString("sv")} </li>`
  }
})

let ulContinent = document.querySelector("#continentList")
document.querySelector("#formContinent").addEventListener("submit", async (event) => {
  event.preventDefault()
  let continent = document.querySelector("#inputFieldContinent").value
  if ((/[a-z]+/i.test(continent))) {
    let result = await (await fetch('https://covid-api.mmediagroup.fr/v1/cases?continent=' + continent)).json()
    ulContinent.innerHTML = ""
    for (const [key, value] of Object.entries(result)) {
      let string = JSON.stringify(value.All).replace(/["_]/g, " ")
      let betterString = string.replace(/[{},]/g, "")
      let evenBetterString = betterString.replace(/ :/g, ": ")
      ulContinent.innerHTML += `<li> <u> ${key}</u>:<br> ${evenBetterString} </li>`
    }
  }
})

setInterval(function () {
  if (window.matchMedia("(max-width: 800px)").matches) { //en som reggar att vi behöver förminska fältet
    document.querySelector('#inputFieldContinent').style.width = "200px";
  }
}, 100)

setInterval(function () {
  if (window.matchMedia("(min-width: 800px)").matches) {//en som reggar att vi behöver förstora tillbaka fältet (annars stannar det förminskat)
    document.querySelector('#inputFieldContinent').style.width = "465px";
  }
}, 100)


// worldButton.addEventListener("click", async () => {
//   if (worldButton.value === "Show COVID data") {
//     worldButton.value = "Hide COVID data"
//     worldButton.innerHTML = "Hide COVID data"
    // let results = await Promise.all([
    //   fetch('https://covid-api.mmediagroup.fr/v1/cases'),
    //   fetch('https://covid-api.mmediagroup.fr/v1/vaccines')]).then(async ([cases, vaccines]) => {
    //     const casez = cases.json()
    //     const vaccine = vaccines.json()
    //     return [casez, vaccine]
    //   })
//     const obj1 = {
//       "Current population of the world": results.Global.All.population, <----Kan inte få ut dessa om jag laddar allt med Promise.all()
//       "Confirmed COVID-19 cases": results.Global.All.confirmed,              jag får CORS errors
//       "Confirmed deaths due to COVID-19": results.Global.All.deaths,
//       "Administered vaccines": results.Global.All.administered,
//       "Fully vaccinated people": results.Global.All.people_vaccinated,
//       "Partially vaccinated people": results.Global.All.people_partially_vaccinated,
//       "List last updated": results.Spain.Andalusia.updated
//     }
//     for (const [key, value] of Object.entries(obj1)) {
//       ulWorld.innerHTML += `<li>  ${key}: ${value} </li>`
//     }
//   }
//   else {
//     ulWorld.innerHTML = ""
//     worldButton.innerHTML = "Show COVID data"
//     worldButton.value = "Show COVID data"
//   }
// })
