///api/location/search/?query=(query)
$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
  $.get("/api/location/search/?query=(\$("#champs_saisi").val())", function(data){
    console.log(data);
  })
})
