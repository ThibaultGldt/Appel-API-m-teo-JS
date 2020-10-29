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

  $.getJSON(proxy+'https://www.metaweather.com/api/location/search/?query='+query, function(data){//demande de localisation
    console.log(data);//test
    $("#nom_ville").text(data[0].title);//test

    $.getJSON(proxy+'https://www.metaweather.com/api/location/'+data[0].woeid, function(rep){//demande infos sur la météo de la localisation
      console.log(rep);
      console.log(rep.consolidated_weather[0]);
      console.log('https://www.metaweather.com/static/img/weather/png/'+rep.consolidated_weather[0].weather_state_abbr+'.png')
      $.each(rep.consolidated_weather, function(){
        $("#bloc-resultats").append("<div id=\"bloc-jour\"> <p>"+this.applicable_date+"</p> <p>Icone</p> <p>Température</p> <p>Vent</p> <p>Humidité</p> </div>");
      })
    })
  })
})

/*for(var i = 0; i < 5; i++){
    $("#bloc-resultats").append("<div id=\"bloc-jour\"> <p>""</p> <p>Icone</p> <p>Température</p> <p>Vent</p> <p>Humidité</p> </div>");
}*/
