//https://www.metaweather.com/api/location/search/?query=(query)
//var data[];
var proxy = 'https://cors-anywhere.herokuapp.com/';
$("#btn-lancer-recherche").click(function(){

  console.log($("#champs_saisi").val());
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

  $.getJSON(proxy+'https://www.metaweather.com/api/location/search/', function(data){
    console.log(data);
  })
})
