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
    $("#localisation").append(data[0].title);

    $.getJSON(proxy+'https://www.metaweather.com/api/location/'+data[0].woeid, function(rep){//demande infos sur la météo de la localisation
      $("#localisation").append(rep.parent.title);
      $.each(rep.consolidated_weather, function(){
        var icone = 'https://www.metaweather.com/static/img/weather/png/' + this.weather_state_abbr + '.png';
        $("#bloc-resultats").append("<div id=\"bloc-jour\">  </div>");//création du bloc contenant toutes les données pour 1 jour
        $("#bloc-jour").append("<p>"+this.applicable_date+"</p>");
        $("#bloc-jour").append("<div id=\"temp\" class=\"case\" </div>");//création du bloc contenant les témperatures: Max, Moyenne, Min
          $("#temp").append("<p id=\"max_temp\">"+this.max_temp+"</p>");
          $("#temp").append("<p id=\"the_temp\">"+this.the_temp+"</p>");
          $("#temp").append("<p id=\"min_temp\">"+this.min_temp+"</p>");

      })
    })
  })
})

/*for(var i = 0; i < 5; i++){
    $("#bloc-resultats").append("<div id=\"bloc-jour\"> <p>""</p> <p>Icone</p> <p>Température</p> <p>Vent</p> <p>Humidité</p> </div>");
}*/
