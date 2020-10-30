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
      var i = 1;
      $.each(rep.consolidated_weather, function(){
        var icone = 'https://www.metaweather.com/static/img/weather/png/' + this.weather_state_abbr + '.png';
        $("#bloc-resultats").append("<div id=\"jour"+i+"\"class=\"bloc-jour\">  </div>");//création du bloc contenant toutes les données pour 1 jour
          $("#jour"+i).append("<p>"+this.applicable_date+"</p>");

        $("#jour"+i).append("<div id=\"temp\" class=\"case\" </div>");//création du bloc contenant les témperatures: Max, Moyenne, Min
          $("#jour"+i+" #temp").append("<p id=\"max_temp\">"+this.max_temp.toFixed(0)+"°</p>");
          $("#jour"+i+" #temp").append("<p id=\"the_temp\">"+this.the_temp.toFixed(0)+"°</p>");
          $("#jour"+i+" #temp").append("<p id=\"min_temp\">"+this.min_temp.toFixed(0)+"°</p>");

        $("#jour"+i).append("div id=\"icone\" </div");//création du bloc contenant le temps et l'icone représentant
          $("#jour"+i+" #icone").append("<img src="+icone+"> <p>"+this.weather_state_name+"</p>")

        i++;
      })
    })
  })
})

/*for(var i = 0; i < 5; i++){
    $("#bloc-resultats").append("<div id=\"bloc-jour\"> <p>""</p> <p>Icone</p> <p>Température</p> <p>Vent</p> <p>Humidité</p> </div>");
}*/
