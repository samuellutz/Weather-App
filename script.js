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
      var newLi = document.createElement("li");
      newLi.text(x);
      $("#cities").appendchild("newLi");
      console.log("newLi");

  } 
 