
var API_KEY = 'd62be4c39ee932637aa4e1e095819cd9';


document.getElementById('search-button').addEventListener('click', function () {
  var city = document.getElementById('city-input').value;

  if (!city) {
    alert("Please enter a city name or ZIP code");
    return;
  }

  var url = "http://api.weatherstack.com/current?access_key=" + API_KEY + "&query=" + city;

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.error) {
        alert("Could not find weather for that location.");
        return;
      }

      var resultBox = document.getElementById('weather-result');
      resultBox.innerHTML = "";

      var cityName = document.createElement('h3');
      cityName.textContent = data.location.name + ", " + data.location.region;

      var description = document.createElement('p');
      description.textContent = data.current.weather_descriptions[0];

      var temp = document.createElement('p');
      temp.textContent = "Temperature: " + data.current.temperature + "°C";

      var icon = document.createElement('img');
      icon.src = data.current.weather_icons[0];
      icon.alt = "Weather Icon";

      resultBox.appendChild(cityName);
      resultBox.appendChild(description);
      resultBox.appendChild(temp);
      resultBox.appendChild(icon);
    })
    .catch(function (error) {
      console.log("Fetch error:", error);
      alert("Something went wrong. Please try again later.");
    });
});


if (window.annyang) {
  var commands = {
    'get weather for *city': function (city) {
      document.getElementById('city-input').value = city;
      document.getElementById('search-button').click();
    },
    'change the color to *color': function (color) {
      document.body.style.backgroundColor = color;
      var msg = new SpeechSynthesisUtterance("Changing background to " + color);
      window.speechSynthesis.speak(msg);
    }
  };
  annyang.addCommands(commands);
}
