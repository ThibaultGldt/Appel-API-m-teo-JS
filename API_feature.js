///api/location/search/?query=(query)
$("#btn-lancer-recherche").click(function(){

  $(this).ajax({url:/api/location/search/?query=($(this).val()),
          dataType: 'json',
          success: function(result){
            console.log(result);
          }
        });
})
