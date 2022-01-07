$(document).ready(function() {
    function weather() {
        var url = "api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid=1506795a9042438dd4635266f5cbd0eb";
        $.getJSON(url, function(data) {
            console.log(data)
        })
    }
});