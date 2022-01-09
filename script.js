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
        alert("Error-Connection");
    }
  // outputs weather data to the city section
  }).then(function(response){
      console.log(response);
      console.log(response.name)
      $(".forecast").attr("style", "display: inline-block");
      $("#cityInfo").text("");
      $("#cityName").text("City: " + response.name);
      var temp = $("<p>");
      temp.text("Temperature: " + response.main.temp + " F");
      $("#cityInfo").append(temp);
      var humidity = $("<p>");
      humidity.text("humidity: " + response.main.humidity + " %");
      $("#cityInfo").append(humidity);
      var wind = $("<p>");
      wind.text("Wind Speed: " + response.wind.speed + " MPH");
      $("#cityInfo").append(wind);
      var uv = $("<p>");
      uv.text("UV");
      $("#cityInfo").append(uv);
      
      addCity(response.name);
      fiveDay(response.name);
  })
  
}

// searches city

searchButton.click(function(event){
  event.preventDefault();
  var input = $("#city").val();
  console.log("input: " + input);
  searchWeather(input);
});
// searches previous cities at button press.
searchCity.click(function(event){
  // event.preventDefault();
  var btnVal = this.text;
  console.log(btnVal);
  searchWeather(this.text);
});
// function for adding cities to list
function addCity(x){
    var newLi = $("<li>");
    // newLi.text(x);
    $("#cities").append(newLi);
    var button = $("<button>");
    button.text(x);
    button.addClass("btn btn-secondary cityButton mb-2");
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

function pageOpen(){
  var num = localStorage.getItem("Number");
  for(var i = 0; i < num; i++){
    container.push(localStorage.getItem(i));
  }

  for(var i = 0; i < container.length; i++){
    var li = $("<li>");
       $("#cities").append(li);
    var ogButton = $("<button>");
    ogButton.text(container[i]);
    ogButton.addClass("btn btn-secondary cityButton mb-2");
    ogButton.attr("type", "button");
    li.append(ogButton);
  }
}
//  getting five day forcast

function fiveDay(name){

  $.ajax({
    type: "GET",
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + name + "&appid=1506795a9042438dd4635266f5cbd0eb&units=imperial",
    dataType: "JSON",
  
  }).then(function(response){
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
};