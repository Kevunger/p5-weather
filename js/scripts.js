/* Does your browser support geolocation? */
if ("geolocation" in navigator) {
  $('.js-geolocation').show(); 
} else {
  $('.js-geolocation').hide();
}

/* Where in the world are you? */
$('.js-geolocation').on('vclick', function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });
});


$(document).ready(function() {
  loadWeather('San Francisco',''); //@params location, woeid
});

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
      html = '<div class="place"><p class="city">'+weather.city+', '+weather.region+'</p></div><br><hr class="rule"></hr>';
      html += '<div class="currently"><i class="icon-'+weather.code+'"></i>&nbsp;&nbsp;'+weather.currently+'</div>';
      html += '<div class="ui horizontal list"><div class="low item"><i class="chevron circle down icon"></i>'+weather.low+'&deg;</div>';
      html += '<div class="currTemp item">'+weather.temp+'&deg;</div>';
      html += '<div class="high item">'+weather.high+'&deg;<i class="chevron circle up icon"></i></div></div>';
      html += '<div class="ui sun list"><div class="item"><p><i class="sun icon"></i>Sun</p><hr class="rule"></hr></div><div class="item"><i class="double angle up icon"></i>'+weather.sunrise+'</div>';
      html += '<div class="item"><i class="double angle down icon"></i>'+weather.sunset+'</div></div>';
      html += '<div class="ui wind list"><div class="item"><p><i class="flag outline icon"></i>Wind</p><hr class="rule"></hr></div><div class="item">'+weather.wind.direction+'&nbsp;'+weather.wind.speed+' '+weather.units.speed+'</div><div class="item">'+weather.wind.chill+'&deg;</div></div>';
      
      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

