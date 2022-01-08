var container = []


function searchWeather(x) {
    $.ajax({
      type: "GET",
      url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + x + '&appid=1506795a9042438dd4635266f5cbd0eb',
      dataType: "json",
      // error handling
      error: function(e){
          alert("Error-Connection");
      }
    // runs whenever call goes through
    }).then(function(response){
        console.log(response);
        console.log(response.name)

        $("#cityName").text("City: " + response.name);
        var temp = $("<p>");
        temp.text("Temperature: " + response.main.temp + " F");
        $("#cityInfo").append(temp);
        var humidity = $("<p>");
        humidity.text("humidity: " + response.main.humidity + " %");
        $("#cityInfo").append(humidity);
        var wind = $("<p>");
        wind.text("Temperature: " + response.wind.speed + " MPH");
        $("#cityInfo").append(wind);
        var uv = $("<p>");
        uv.text("UV");
        $("#cityInfo").append(uv);

    })
  }

// should search city.

  $("#search").on("click", function(event){
    event.preventDefault();
    var input = $("#city").val();
    console.log("input: " + input);
    searchWeather(input);
  });
// to make the list of cities

function addCity(x){
      var newLi = document.createElement("button");
      newLi.text(x);
      $("#Cities").add.text("addCity");
  addCity();
  }
