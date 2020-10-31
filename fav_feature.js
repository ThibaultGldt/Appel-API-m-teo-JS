var proxy = 'https://cors-anywhere.herokuapp.com/';
var url1 = 'https://www.metaweather.com/api/location/search/?query=';

if(localStorage.length ==0) {
  $(".info-vide").last().css("display", "block");
}else{
  actualiserFav();
}

$("#btn-favoris").click(function(){
  var query = $("#champs_saisi").val();
  $.getJSON(proxy + url1 + query, function(data){//demande de localisation

    if(data.length != 1){
        alert("Veuillez entrer un nom de ville valide et complet");
    }else if($.inArray(query, localStorage) == -1){
      localStorage.setItem(query, query);
      actualiserFav();
    }else{
      suppFav(query);
      actualiserFav();
    }
  })
})

function actualiserFav(){
  $("#liste-favoris").empty();
  for(var key in localStorage){
    $("#liste-favoris").append("<li>\n<span title=\"Cliquer pour relancer la recherche\">"+localStorage.getItem(key)+"</span>\n"
                                +"<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=\"15\" title=\"Cliquer pour supprimer le favori\">\n</li>")
  }
}

function suppFav(query){
  for(var key in localStorage){
    if(localStorage.getItem(key) == query){
      localStorage.removeItem(key);
    }
  }
}
