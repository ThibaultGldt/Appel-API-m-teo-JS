///api/location/search/?query=(query)
$("#btn-lancer-recherche").click(function(){
  
  $.ajax({url:/api/location/search/?query=($(this).val()),
          dataType: 'json',
          success: function(result){
            console.log(result);
          }
        });
})
