var proxy = 'https://cors-anywhere.herokuapp.com/';
var url1 = 'https://www.metaweather.com/api/location/search/?query=';

actualiserFav();

$("#champs_saisi").keyup(function(){
  if(localStorage.getItem($("#champs_saisi").val()) == null){
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
      $(".info-vide").last().css("display", "none");
      actualiserFav();
    }else{
      suppFav(query);
    }
  })
})

function actualiserFav(){
  if(localStorage.length ==0) {
    $("#liste-favoris").empty();
    $(".info-vide").last().css("display", "block");
  }else{
    $("#liste-favoris").empty();
    for(var key in localStorage){
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }
      var ville = localStorage.getItem(key);
      $("#liste-favoris").append("<li>\n<span onclick=appelAPI('"+ville+"') title=\"Cliquer pour relancer la recherche\">"+ville+"</span>\n"
      +"<img src=\"images/croix.svg\" onclick=confirmation('"+ville+"') alt=\"Icone pour supprimer le favori\" width=\"15\" title=\"Cliquer pour supprimer le favori\">\n</li>");
    }
  }
}

function confirmation(query){
  /*if(confirm("Voulez vous vraiment supprimer ce favori: "+query+" ?")){
    suppFav(query);
  }*/
  $("#dialog").dialog({
    height: "auto",
    width: 400,
    title: "Supprimer "+query+" des favoris ?",
    appendTo: '#section-favoris',
    buttons: {
      Confirmer: function(){
        suppFav(query);
        $(this).dialog("close");
      },
      Cancel: function(){
        $(this).dialog("close");
      }
    }
  });
}

function suppFav(query){
  for(var key in localStorage){
    if(localStorage.getItem(key) == query){
      localStorage.removeItem(key);
    }
  }
  actualiserFav();
}
