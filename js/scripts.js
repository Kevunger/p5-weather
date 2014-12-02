/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('click', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});


$(document).ready(function() {
  loadWeather('Seattle',''); //@params location, woeid
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<div class="place">'+weather.city+', '+weather.region+'</div>';
      html += '<div class="low ui horizontal list item">'+weather.low+'&deg;'+weather.units.temp+'</div>';
      html += '<div class="currTemp item">'+weather.temp+'&deg;'+weather.units.temp+'</div>';
      html += '<div class="high item">'+weather.high+'&deg;'+weather.units.temp+'</div>';
      html += '<div class="currently"><i class="icon-'+weather.code+'"></i>'+weather.currently+'</div>';
      html += '<div class="wind">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</div>'; 
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}