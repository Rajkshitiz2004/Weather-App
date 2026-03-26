const cityName = document.getElementById("city");
const search = document.getElementById("btn");
const result = document.getElementById("resultContainer");
const error = document.getElementById("errorContainer");

const API_KEY = "14c26020547e127be36aca67c8c1d1d5";
// const API_KEY = "0ab503940ec644dab7e45054261703"; // data structure different, should be change while changing the API_KEY

search.addEventListener("click", () => {
  if (cityName.value === "") {
    alert("Please Enter The City Name...");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${API_KEY}&units=metric`;
  // const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName.value}&aqi=yes`
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        result.innerHTML = `
                <p>City Not Found...</p>
            `;
        throw new Error("City Not Found...");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let city = cityName.value;
      let temperature = data.main.temp;
      let MaxTemperature = data.main.temp_max;
      let MinTemperature = data.main.temp_min;
      let feelsLike = data.main.feels_like;
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;
      let windSpeed = data.wind.speed;
      let degree = data.wind.deg;
      let description = data.weather[0].description;

      result.innerHTML = `
            <p>City Name: ${city}</p>
            <p>Weather Description: ${description}</p>
            <p>Temperature: ${temperature}</p>
            <p>Feels Like: ${feelsLike}</p>
            <p>Max Temperature: ${MaxTemperature}</p>
            <p>Min Temperature: ${MinTemperature}</p>
            <p>Humidity: ${humidity}</p>
            <p>Pressure: ${pressure}</p>
            <p>Wind Speed: ${windSpeed}, Degree: ${degree}°</p>
        `;
      result.style.background = "rgba(227,242,253,0.25)";
      result.style.color = "#0277bd";
      result.style.border = "1.5px solid rgba(79,195,247,0.4)";
    })
    .catch((data) => {
      result.innerHTML = `
                <p>Error...Data Not Fetched</p>
            `;
      result.style.background = "rgba(255, 205, 210, 0.25)";
      result.style.color = "#b71c1c";
      result.style.border = "1.5px solid rgba(239, 83, 80, 0.4)";
    });
});