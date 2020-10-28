//https://www.metaweather.com/api/location/search/?query=(query)
$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
  $.ajax({
      url:'https://www.metaweather.com/api/location/search/',
      type: 'GET',
      data:'query='+$("#champs_saisi").val(),
      datatType:'JSON',
      success: function(res, status){
        console.log(res);
      }
  })
})
