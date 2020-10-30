//https://www.metaweather.com/api/location/search/?query=(query) -> ville/location_type/latt_long/woeid/distance
//https://www.metaweather.com/api/location/woeid ->
//var data[];
var proxy = 'https://cors-anywhere.herokuapp.com/';
var url1 = 'https://www.metaweather.com/api/location/search/?query=';
var url2 = 'https://www.metaweather.com/api/location/';
$("#champs_saisi").focus(function(){
  $(document).on('keypress',function(e) {
      if(e.which == 13) {
          appelAPI($("#champs_saisi").val())
      }
    })
})

$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
  var query = $("#champs_saisi").val();
  appelAPI(query)


})

function appelAPI(query){
  console.log(query);
  $.getJSON(proxy + url1 + query, function(data){//demande de localisation
    $("#bloc-resultats").empty();
    $("#localisation").append(data[0].title);

    $.getJSON(proxy+url2+data[0].woeid, function(rep){//demande infos sur la météo de la localisation
      $("#localisation").append("<p><h1>"+data[0].title+"</h1><h2>, "+rep.parent.title+"</h2>");


      var tableau = document.createElement('table');
      $.each(rep.consolidated_weather, function(){
        var icone ='https://www.metaweather.com/static/img/weather/png/' + this.weather_state_abbr + '.png';
        var jour = document.createElement('tr');

        var case1 = document.createElement('td');
        var donnee_date = this.applicable_date;
        case1.append(donnee_date);

        var case2 = document.createElement('td');

        var max_temp = document.createElement('p');max_temp.append(this.max_temp.toFixed(0)+'°');
        var temp = document.createElement('p');temp.append(this.the_temp.toFixed(0)+'°');
        var min_temp = document.createElement('p');min_temp.append(this.min_temp.toFixed(0)+'°');
        case2.append(max_temp);case2.append(temp);case2.append(min_temp);

        var case3 = document.createElement('td');
        var img = document.createElement('img');
        img.src = icone;
        case3.append(img);
        var temps = this.weather_state_name;
        case3.append(temps);

        var case4 = document.createElement('td');
        case4.append(this.wind_speed.toFixed(0)+"km/h \n");
        case4.append(this.wind_direction_compass);

        var case5 = document.createElement('td');
        case5.append(this.humidity+'%');
        jour.append(case1);jour.append(case2);jour.append(case3);jour.append(case4);jour.append(case5);
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
}
