var proxy = 'https://cors-anywhere.herokuapp.com/';
var url1 = 'https://www.metaweather.com/api/location/search/?query=';

if(localStorage.length ==0) {
  $(".info-vide").last().css("display", "block");
}else{
  actualiserFav();
}

window.onstorage = event => {
  console.log("tttttt");
  actualiserFav();
};

$("#champs_saisi").keypress(function(){
  if(localStorage.getItem($("#champs_saisi").val() == null)){
    $("#btn-favoris img").attr("src", "images/etoile-vide.svg");
  }else{
    $("#btn-favoris img").attr("src", "images/etoile-pleine.svg");
  }
})

$("#btn-favoris").click(function(){
  var query = $("#champs_saisi").val();

  $.getJSON(proxy + url1 + query, function(data){//demande de localisation
    if(data.length != 1){
        alert("Veuillez entrer un nom de ville valide et complet");
    }else if(localStorage.getItem(query) == null){
      localStorage.setItem(query, query);
    }else{
      suppFav(query);
    }
  })
})

function actualiserFav(){
  $("#liste-favoris").empty();
  for(var key in localStorage){
    $("#liste-favoris").append("<li>\n<span onClick=\"appelAPI("+localStorage.getItem(key)+"title=\"Cliquer pour relancer la recherche\">"+localStorage.getItem(key)+"</span>\n"
                                +"<img src=\"images/croix.svg\" alt=\"Icone pour supprimer le favori\" width=\"15\" title=\"Cliquer pour supprimer le favori\">\n</li>")
  }
}

function suppFav(query){
  for(var key in localStorage){
    console.log("test1");
    if(localStorage.getItem(key) == query){
      console.log("test2");
      localStorage.removeItem(key);
    }
  }
}
