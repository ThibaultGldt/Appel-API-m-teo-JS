//https://www.metaweather.com/api/location/search/?query=(query) -> ville/location_type/latt_long/woeid/distance
//https://www.metaweather.com/api/location/woeid ->
//var data[];
var proxy = 'https://cors-anywhere.herokuapp.com/';
$(document).on('keypress',function(e) {
    if(e.which == 13) {
        alert('You pressed enter!');
    }
})

$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
  var query = $("#champs_saisi").val();

  $.getJSON(proxy+'https://www.metaweather.com/api/location/search/?query='+query, function(data){//demande de localisation
    $("#bloc-resultats").empty();
    $("#localisation").append(data[0].title);

    $.getJSON(proxy+'https://www.metaweather.com/api/location/'+data[0].woeid, function(rep){//demande infos sur la météo de la localisation
      $("#localisation").append(rep.parent.title);
      var i = 1;
      var tableau = document.createElement('table');
      $.each(rep.consolidated_weather, function(){
        var icone = 'https://www.metaweather.com/static/img/weather/png/' + this.weather_state_abbr + '.png';
        var jour = document.createElement('tr');

        var case1 = document.createElement('td');
        var donnee_date = this.applicable_date;
        case1.append(donnee_date);

        var case2 = document.createElement('td');
        var max_temp = this.max_temp.toFixed(0);
        var temp = this.the_temp.toFixed(0);
        var min_temp = this.min_temp.toFixed(0);
        case2.append(max_temp);case2.append(temp);case2(min_temp);

        var case3 = document.createElement('td');
        var temps = this.weather_state_name;
        case3.append("<img src="+icone+">");
        case3.append(temps);

        var case4 = document.createElement('td');
        case4.append(this.wind_speed.toFixed(0)+"km/h");
        case4.append(this.wind_direction_compass);

        var case5 = document.createElement('td');
        case5.append(this.humidity);
        jour.append(case1);
        tableau.append(jour);
        /*table.append("<div id=\"jour"+i+"\"class=\"bloc-jour\">  </div>");//création du bloc contenant toutes les données pour 1 jour
          $("#jour"+i).append("<p class=\"case\">"+this.applicable_date+"</p>");

        $("#jour"+i).append("<div id=\"temp\" class=\"case\" </div>");//création du bloc contenant les témperatures: Max, Moyenne, Min
          $("#jour"+i+" #temp").append("<p id=\"max_temp\">"+this.max_temp.toFixed(0)+"°</p>");
          $("#jour"+i+" #temp").append("<p id=\"the_temp\">"+this.the_temp.toFixed(0)+"°</p>");
          $("#jour"+i+" #temp").append("<p id=\"min_temp\">"+this.min_temp.toFixed(0)+"°</p>");

        $("#jour"+i).append("<div id=\"icone\" class=\"case\" </div>");//création du bloc contenant le temps et l'icone représentant
          $("#jour"+i+" #icone").append("<img src="+icone+"> <p>"+this.weather_state_name+"</p>")

        $("#jour"+i).append("<div id=\"vent\" class=\"case\" </div>");//création du bloc contenant les données sur le vent
          $("#jour"+i+" #vent").append("<p>"+this.wind_speed.toFixed(0)+"km/h</p>");//affichage vitesse du vent
          $("#jour"+i+" #vent").append("<p>"+this.wind_direction_compass+"</p>");

        $("#jour"+i).append("<p class=\"case\">"+this.humidity+"%</p>");

        i++;*/
      })
      $("#bloc-resultats").append(tableau);
    })
  })
})
