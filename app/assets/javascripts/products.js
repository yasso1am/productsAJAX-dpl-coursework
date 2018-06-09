$(document).ready( function() {
  const icons = ["3d_rotation", "ac_unit", "access_alarm", "accessibility", "accessible", "account_balance", "account_balance_wallet", "add_shopping_cart", "add_to_queue", "adjust", "airline_seat_legroom_reduced", "airline_seat_recline_extra", "airplanemode_inactive", "airplay", "airport_shuttle", "all_inclusive", "build", "cake", "camera_enhance", "center_focus_weak", "check_circle", "child_friendly", "cloud_queue", "color_lens", "colorize", "control_point_duplicate", "copyright", "create", "credit_card", "crop", "crop_16_9", "dashboard", "delete", "desktop_mac", "desktop_windows", "description", "delete_sweep", "developer_mode"]
  var check = true
  var crush = '<button id="delete" >' + 'Delete' + '</button>'
  
  // IMMEDIATE AJAX REQUEST FOR PRODUCTS UPON PAGE LOAD
  $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products',
    type: 'GET',
    datatype: 'JSON',
  }).done( function(products) {
    products.forEach (function (prod) {
      var rand = icons[Math.floor(Math.random() * icons.length)];
     // ADDING ITEMS LEFT AND RIGHT ACCORDING TO A TRUE/FALSE 
      if (check){
        var li = '<li class="collection-item avatar" data-product-id="' + prod.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + prod.name + '<br />' +  'Description: ' + prod.description + '<br />' + 'Price :' + prod.base_price + '<br />' + crush + '</li>'
        $('#product-list').append(li)
        check = false
        } else{
          li = '<li class="collection-item avatar" data-product-id="' + prod.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + prod.name + '<br />' +  'Description: ' + prod.description + '<br />' + 'Price :' + prod.base_price + '<br />' + crush + '</li>'
          $('#right-product-list').append(li)
          check = true
        }
    })
  }).fail( function(err) {
    alert(err.responseJSON.errors)
  })
  
  // LISTENING FOR A CLICK ON NEW ITEM 
  $('#newitem').on('click', function() {
    var name = $('#name').val()
    var base_price = $('#base_price').val()
    var description = $('#description').val()
    var newitem = { product: {name: name, base_price: base_price, description: description } }
   
    // AJAX REQUEST POSTING TO SERVER 
    $.ajax({
      url: 'http://json-server.devpointlabs.com/api/v1/products',
      type: 'POST',
      datatype: 'JSON',
      data: newitem
    })
    
    // TRICKING USER TO BELIEVE ITEM WAS UPDATED ON THE PAGE
  .done( function(item) {
    if (check){
      var li = '<li class="collection-item avatar" data-product-id="' + item.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + item.name + '<br />' +  'Description: ' + item.description + '<br />' + 'Price :' + item.base_price + '<br />' + crush + '</li>'
      $('#product-list').append(li)
      check = false
    } else {
      li = '<li class="collection-item avatar" data-product-id="' + item.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + item.name + '<br />' +  'Description: ' + item.description + '<br />' + 'Price :' + item.base_price + '<br />' + crush + '</li>'
      $('#right-product-list').append(li)
      check = true
    }
    $('#name').val('')
    $('#base_price').val('')
    $('#description').val('')  
      }).fail( function(err) {
        alert(err.responseJSON.errors)
  
        // CLEARING INPUT VALUES 
    })
  })

  $(document).on('click', '#delete', function (){
    var id = this.parentElement.dataset.productId
    $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
    method: 'DELETE'
    }).done( function(thing) {
    debugger
    })
  })



})

// $(document).on('click', '#delete-game', function() {
//   var id = $(this).siblings('.game-item').data().id
//   $.ajax({
//     url: '/games/' + id,
//     method: 'DELETE'
//   }).done( function() {
//     var row = $("[data-id='" + id + "'")
//     row.parent().remove('li');
//   });
