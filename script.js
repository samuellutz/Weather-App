var container = [];
var searchButton = $("#search");
var searchCity = $(".cityButton");

function searchWeather(x) {

  $(".forecast").empty();
  
  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=1506795a9042438dd4635266f5cbd0eb&units=imperial",
    dataType: "json",
    // error handling
    error: function(e){
      $("#cityName").text("Error: this City does not exist.");
      $(".forecast").attr("style", "display: none");
      return;
    }
  // outputs weather data to the city section
  }).then(function(response){
      console.log(response);
      console.log(response.name)
      $(".forecast").attr("style", "display: inline-block");
      $("#cityInfo").text("");
      var imgmain = $("<img>");
      imgmain.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
      $("#cityName").text("City: " + response.name);
      $("#cityName").append(imgmain);
      var temp = $("<p>");
      temp.text("Temperature: " + response.main.temp + " F");
      $("#cityInfo").append(temp);
      var humidity = $("<p>");
      humidity.text("humidity: " + response.main.humidity + " %");
      $("#cityInfo").append(humidity);
      var wind = $("<p>");
      wind.text("Wind Speed: " + response.wind.speed + " MPH");
      $("#cityInfo").append(wind);
      
      
     
      fiveDay(response.name);
      uvDisp(response.coord.lat,response.coord.lon)
  })
  
}

// uv function
function uvDisp(lat,lon) {
  url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=1506795a9042438dd4635266f5cbd0eb"
fetch(url)
.then(function (response){
  return response.json()
})
.then(function (data){
  console.log(data.current.uvi)
  var uv = $("<p>");
      uv.text("UV: " + data.current.uvi);
      $("#cityInfo").append(uv);
      console.log(uv.data);
  var  uvVal = parseFloat(data.current.uvi);
  uv.attr("class", "p-1 m-1")
  if (uvVal <=3.99) {
    uv.attr("style", "background-color: green;");
  } if (uvVal >=4 && uvVal <=7.99) {
    uv.attr("style", "background-color: yellow;");
  }
      console.log(uvVal);
})

.catch(function (error){
  console.error(error)
});
}

// searches city

searchButton.click(function(event){
  save = true;
  event.preventDefault();
  var input = $("#city").val();
  console.log("input: " + input);
  searchWeather(input);
  addCity(input);
});
// searches previous cities at button press.
searchCity.click(function(event){
  // event.preventDefault();
  var btnVal = this.text;
  console.log(btnVal);
  searchWeather(this.text);
});
// clear button
$("#clear").on("click", function (event) {
  event.preventDefault();
  container.length = 0;
  localStorage.clear();
  $("#cities button").remove();
  $(".forecast").attr("style", "display: none;");
  $("#cityName").text("City:");
  $("#cityInfo").empty();
});

// function for adding cities to list
function addCity(x){
  container.push(x);
    // newLi.text(x);
    var button = $("<button>");
    button.text(x);
    button.addClass("btn btn-secondary cityButton w-100 border-top border-dark");
    button.attr("type", "button");
    $("#cities").append(button);
    for(var i = 0; i < container.length; i++){
    localStorage.setItem(i, container[i]);
  }
  localStorage.setItem("Number", container.length);
}
// function for created buttons to search
$("#cities").on("click", "button", function (event) {
  save = true;
  event.preventDefault();
  $("#cityInfo").empty();
  $(".forecast").empty();
  var btnText = $(this).text();
  // console.log("btn text: " + btnText);
  searchWeather(btnText);
});

function pageOpen() {
  $(".forecast").attr("style", "display: none;");
  var num = localStorage.getItem("Number");
  for (var i = 0; i < num; i++) {
    container.push(localStorage.getItem(i));
  }
  if (container.length > 0) {
    searchWeather(container[0]);
  }
  for (var i = 0; i < container.length; i++) {
    var ogButton = $("<button>");
    ogButton.text(container[i]);
    ogButton.addClass("btn btn-secondary cityButton w-100 border-top border-dark");
    ogButton.attr("type", "button");
    $("#cities").append(ogButton);
  }
}
pageOpen();
//  getting five day forcast

function fiveDay(name){

  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=1506795a9042438dd4635266f5cbd0eb&units=imperial",
    dataType: "JSON",
  
  }).then(function(response){
    console.log(response);
    console.log("response: "+ response.list[0].main.temp);
  var date = $("<h5>");
  var temp = $("<p>");
  var humidity = $("<p>");
  var img = $("<img>");
      img.attr("src", "https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png");
      var dateFormat = new Date(response.list[3].dt_txt).toLocaleString().split(",");
      date.text(dateFormat[0]);
  temp.text("Temp: " + response.list[3].main.temp_max + " F");
  humidity.text("Humidity:" + response.list[3].main.humidity + "%");
  $("#1").append(date);
  $("#1").append(img)
  $("#1").append(temp);
  $("#1").append(humidity);

  var date2 = $("<h5>");
      var temp2 = $("<p>");
      var humidity2 = $("<p>");
      var img2 = $("<img>");
      img2.attr("src", "https://openweathermap.org/img/wn/" + response.list[11].weather[0].icon + ".png");
      var dateFormat2 = new Date(response.list[11].dt_txt).toLocaleString().split(",");
      date2.text(dateFormat2[0]);
      temp2.text("Temp: " + response.list[11].main.temp + " °F");
      humidity2.text("Humidity: " + response.list[11].main.humidity + " %");
      $("#2").append(date2);
      $("#2").append(img2);
      $("#2").append(temp2);
      $("#2").append(humidity2);

      var date3 = $("<h5>");
      var temp3 = $("<p>");
      var humidity3 = $("<p>");
      var img3 = $("<img>");
      img3.attr("src", "https://openweathermap.org/img/wn/" + response.list[19].weather[0].icon + ".png");
      var dateFormat3 = new Date(response.list[19].dt_txt).toLocaleString().split(",");
      date3.text(dateFormat3[0]);
      temp3.text("Temp: " + response.list[19].main.temp + " °F");
      humidity3.text("Humidity: " + response.list[19].main.humidity + " %");
      $("#3").append(date3);
      $("#3").append(img3);
      $("#3").append(temp3);
      $("#3").append(humidity3);

      var date4 = $("<h5>");
      var temp4 = $("<p>");
      var humidity4 = $("<p>");
      var img4 = $("<img>");
      img4.attr("src", "https://openweathermap.org/img/wn/" + response.list[27].weather[0].icon + ".png");
      var dateFormat4 = new Date(response.list[27].dt_txt).toLocaleString().split(",");
      date4.text(dateFormat4[0]);
      temp4.text("Temp: " + response.list[27].main.temp + " °F");
      humidity4.text("Humidity: " + response.list[27].main.humidity + " %");
      $("#4").append(date4);
      $("#4").append(img4);
      $("#4").append(temp4);
      $("#4").append(humidity4);

      var date5 = $("<h5>");
      var temp5 = $("<p>");
      var humidity5 = $("<p>");
      var img5 = $("<img>");
      img5.attr("src", "https://openweathermap.org/img/wn/" + response.list[35].weather[0].icon + ".png");
      var dateFormat5 = new Date(response.list[35].dt_txt).toLocaleString().split(",");
      date5.text(dateFormat5[0]);
      temp5.text("Temp: " + response.list[35].main.temp + " °F");
      humidity5.text("Humidity: " + response.list[35].main.humidity + " %");
      $("#5").append(date5);
      $("#5").append(img5);
      $("#5").append(temp5);
      $("#5").append(humidity5);
  });
}