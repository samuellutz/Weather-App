var container = [];


function searchWeather(x) {

  $(".forecast").empty();
  
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
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
      wind.text("Temperature: " + response.wind.speed + " MPH");
      $("#cityInfo").append(wind);
      var uv = $("<p>");
      uv.text("UV");
      $("#cityInfo").append(uv);
      
      addCity(response.name);
  })
}
// searches city
$("#search").on("click", function(event){
  event.preventDefault();
  var input = $("#city").val();
  console.log("input: " + input);
  searchWeather(input);
});
// searches previous cities at button press.
$(".cityButton").on("click", function(event){
  event.preventDefault();
  var btnVal = this.text;
  console.log(btnVal);
});
// function for adding cities to list
function addCity(x){
    var newLi = $("<li>");
    // newLi.text(x);
    $("#cities").append(newLi);
    var button = $("<button>");
    button.text(x);
    button.addClass("btn btn-secondary cityButton mb-2");
    newLi.append(button);
    container.push(x);
    for(var i = 0; i < container.length; i++){
    localStorage.setItem(i, container[i]);
  }
  localStorage.setItem("Number", container.length);
}

function pageOpen(){
  var num = localStorage.getItem("Number");
  for(var i = 0; i < num; i++){
    container.push(localStorage.getItem(i));
    $(".forecast").attr("style", "display: none;");
  }

  for(var i = 0; i < container.length; i++){
    var li = $("<li>");
       $("#cities").append(li);
    var ogButton = $("<button>");
    ogButton.text(container[i]);
    ogButton.addClass("btn btn-secondary cityButton mb-2");
    li.append(ogButton);
  }
}
//  getting five day forcast

function fiveDay(name){

$.ajax({
  type: "GET",
  url: "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=ebdcfef8b5f11a300f888ec06cffdf1c&units=imperial",
  dataType: "JSON",

}).then(function(response){
  var date = $("<p>");
  var temp = $("<p>");
  var humidity = $("<p>");
  date.text(response.list[3].dt_txt);
  temp.text("Temp: " + response.list[3].main.temp_max + " F");
  humidity.text("temp:" + response.list[3].main.humidity);
  $("#1").append(date);
  $("#1").append(temp);
  $("#1").append(humidity);
});
}