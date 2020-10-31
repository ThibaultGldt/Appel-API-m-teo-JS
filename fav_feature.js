var proxy = 'https://cors-anywhere.herokuapp.com/';
var url1 = 'https://www.metaweather.com/api/location/search/?query=';

var cookies;


$("#btn-favoris").click(function(){
  var query = $("#champs_saisi").val();
  $.getJSON(proxy + url1 + query, function(data){//demande de localisation

    if(data.length != 1){
        alert("Veuillez entrer un nom de ville valide et complet");
    }else if($.inArray(query, localStorage) == -1){
      console.log("ca marche");
      localStorage.setItem(localStorage.length, query);
    }else{
      console.log(localStorage);
    }
  })
})
