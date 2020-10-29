//https://www.metaweather.com/api/location/search/?query=(query) -> ville/location_type/latt_long/woeid/distance
//https://www.metaweather.com/api/location/woeid ->
//var data[];
var proxy = 'https://cors-anywhere.herokuapp.com/';

$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
  var query = $("#champs_saisi").val();
  /*$.ajax({
      url:proxy+'https://www.metaweather.com/api/location/search/',
      type: 'GET',
      data:'query='+$("#champs_saisi").val(),
      datatType:'JSON',
      success: function(res, status){
        console.log(res);
      //  data = parseJSON(res);
      }
  })*/

  $.getJSON(proxy+'https://www.metaweather.com/api/location/search/?query='+query, function(data){
    console.log(data);
    $("#nom_ville").text(data[0].title);
    $.getJSON(proxy+'https://www.metaweather.com/api/location/'+data[0].woeid, function(rep){
      console.log(rep);
      console.log(rep.consolidated_weather[0]);
      console.log('https://www.metaweather.com/static/img/weather/png/'+rep.consolidated_weather[0].weather_state_abbr+'.png')
    })
  })
})

for(var i = 0; i < 5; i++){
    $("#bloc-resultats").append("<h1> Test" + i + "</h1>");
}

function appelLocalisationAPI(query){

}

function appel(){

}
