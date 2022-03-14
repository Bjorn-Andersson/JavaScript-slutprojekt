let citiesButton = document.querySelector("#citiesButton")
let ulCities = document.querySelector("#citiesList")
citiesButton.addEventListener("click", async () => {
  let result = await (await fetch('https://avancera.app/cities/')).json()
  ulCities.innerHTML = ""
  for (let n = 0; n < result.length; n++) {
    ulCities.innerHTML += `<li>Name: ${result[n].name}. Population: ${result[n].population}. ID: ${result[n].id}</li>`
  }
})

window.addEventListener("load", async () => {
  let result = await (await fetch('https://avancera.app/cities/')).json()
  ulCities.innerHTML = ""
  for (let n = 0; n < result.length; n++) {
    ulCities.innerHTML += `<li>Name: ${result[n].name}. Population: ${result[n].population}. ID: ${result[n].id}</li>`
  }
})

document.querySelector("#citiesFormAdd").addEventListener("submit", (event) => {
  event.preventDefault()
  let obj = {}
  let addCity = document.querySelector("#addCity").value
  Object.assign(obj, { "name": addCity })
  let addCityPop = document.querySelector("#addCityPop").value
  Object.assign(obj, { "population": Number(addCityPop) })
  fetch('https://avancera.app/cities/', {
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
    method: 'POST'
  })
  document.querySelector("#addCity").value = ""
  document.querySelector("#addCityPop").value = ""
})

document.querySelector("#citiesFormRemove").addEventListener("submit", (event) => {
  event.preventDefault()
  let id = document.querySelector("#removeCity").value
  fetch('https://avancera.app/cities/' + id, {
    method: 'DELETE'
  })
  document.querySelector("#removeCity").value = ""
})

document.querySelector("#citiesFormModify").addEventListener("submit", (event) => {
  event.preventDefault()
  let obj = {}
  let cityName = document.querySelector("#modifyCityName").value
  if (cityName !== "") {
    Object.assign(obj, { "name": cityName })
  }
  let cityPop = document.querySelector("#modifyCityPop").value
  if (cityPop !== "") {
    Object.assign(obj, { "population": Number(cityPop) })
  }
  let id = document.querySelector("#modifyCityId").value
  fetch('https://avancera.app/cities/' + id, {
    body: JSON.stringify(obj),
    headers: { "Content-Type": "application/json" },
    method: 'PATCH'
  })
  document.querySelector("#modifyCityId").value = ""
  document.querySelector("#modifyCityName").value = ""
  document.querySelector("#modifyCityPop").value = ""
})
