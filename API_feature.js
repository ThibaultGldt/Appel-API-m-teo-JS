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
  appelAPI($("#champs_saisi").val());
})

function appelAPI(query){
  $("#localisation").empty();
  $("#bloc-resultats").empty();
  $("#bloc-gif-attente").css("display", "block");

  $.getJSON(proxy + url1 + query, function(data){//demande de localisation

    if(data.length != 1){
        $("#aucun-res").css("display", "block");
    }else{
      $.getJSON(proxy+url2+data[0].woeid, function(rep){//demande infos sur la météo de la localisation
        $("#bloc-gif-attente").css("display", "none");
        $("#localisation").append("<p><h2>"+data[0].title+", "+rep.parent.title+"</h2></p>");


        var tableau = document.createElement('table');
        var valeur = ["Date", "Températures", "Temps", "Vent", "Humidité"];
        var ligne = document.createElement('tr');
        $.each(valeur, function(){
          var bloc = document.createElement('th');
          bloc.append(this);
          ligne.append(bloc);
        })
         tableau.append(ligne);

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
          case4.append(this.wind_speed.toFixed(0)+"km/h");

          var case5 = document.createElement('td');
          case5.append(this.humidity+'%');
          jour.append(case1);jour.append(case2);jour.append(case3);jour.append(case4);jour.append(case5);
          tableau.append(jour);
        })
        $("#bloc-resultats").append(tableau);
      })}
  })
}
