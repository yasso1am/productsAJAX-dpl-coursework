const icons = ["3d_rotation", "ac_unit", "access_alarm", "accessibility", "accessible", "account_balance", "account_balance_wallet", "add_shopping_cart", "add_to_queue", "adjust", "airline_seat_legroom_reduced", "airline_seat_recline_extra", "airplanemode_inactive", "airplay", "airport_shuttle", "all_inclusive", "build", "cake", "camera_enhance", "center_focus_weak", "check_circle", "child_friendly", "cloud_queue", "color_lens", "colorize", "control_point_duplicate", "copyright", "create", "credit_card", "crop", "crop_16_9", "dashboard", "delete", "desktop_mac", "desktop_windows", "description", "delete_sweep", "developer_mode"]
let check = true
var crush = '<button id="delete" >' + 'Delete' + '</button>'
var change = '<button id="edit" >' + 'Edit' + '</button>'
var editId;

$(document).ready( function() {
  
  
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
        var li = '<li class="collection-item avatar" data-product-id="' + prod.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + prod.name + '<br />' +  'Description: ' + prod.description + '<br />' + 'Price :' + prod.base_price + '<br />' + crush + change + '</li>'
        $('#product-list').append(li)
        check = false
        } else{
          li = '<li class="collection-item avatar" data-product-id="' + prod.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + prod.name + '<br />' +  'Description: ' + prod.description + '<br />' + 'Price :' + prod.base_price + '<br />' + crush + change + '</li>'
          $('#right-product-list').append(li)
          check = true
        }
    })
  }).fail( function(err) {
    alert(err.responseJSON.errors)
  })

  // BUILDING AN EDIT FUNCTION
    $(document).on('click', '#edit', function() {
      let id = this.parentElement.dataset.productId
      $.ajax({
        url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
        method: 'GET',
      }).done( function (product) {
        $('#name').val(`${product.name}`)
        $('#base_price').val(`${product.base_price}`)
        $('#description').val(`${product.description}`)    
        editId = product.id 
      })
    })
    

    $('#newitem').on('click', function () {
    var name = $('#name').val()
    var base_price = $('#base_price').val()
    var description = $('#description').val()
    // THIS HAPPENS IF THERE IS A PRODUCT ID, IT IS AN UPDATE   
    
    if (editId) {
      var url = 'http://json-server.devpointlabs.com/api/v1/products/' + editId
      var method = 'PUT'
      var item = { product: { base_price: base_price, color: null, description: description, id: editId, name: name, other_attributes: null, quantity_on_hand: 0, weight: null}  }
      var li = $("[data-id='" + editId + "'")
      debugger
    } else {
        item = { product: {name: name, base_price: base_price, description: description } }
        method = 'POST'
        url = 'http://json-server.devpointlabs.com/api/v1/products'
      }
 
    // AJAX REQUEST POSTING/UPDATING TO SERVER 
    $.ajax({
      url: url,
      type: method,
      datatype: 'JSON',
      data: item
    })
  

    // TRICKING USER TO BELIEVE ITEM WAS UPDATED ON THE PAGE
  .done( function(item) {
    var rand = icons[Math.floor(Math.random() * icons.length)];
    if (check){
      var li = '<li class="collection-item avatar" data-product-id="' + item.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + item.name + '<br />' +  'Description: ' + item.description + '<br />' + 'Price :' + item.base_price + '<br />' + crush + change + '</li>'
      $('#product-list').append(li)
      check = false
    } else {
      li = '<li class="collection-item avatar" data-product-id="' + item.id +'"> <i class="material-icons">' + rand + '</i> ' + 'Name: ' + item.name + '<br />' +  'Description: ' + item.description + '<br />' + 'Price :' + item.base_price + '<br />' + crush + change + '</li>'
      $('#right-product-list').append(li)
      check = true
    }

    // CLEARING INPUT VALUES 
    $('#name').val('')
    $('#base_price').val('')
    $('#description').val('')  
  
  }).fail( function(err) {
    alert(err.responseJSON.errors)
    })
  })

  $(document).on('click', '#delete', function (){
    var id = this.parentElement.dataset.productId
    $.ajax({
    url: 'http://json-server.devpointlabs.com/api/v1/products/' + id,
    method: 'DELETE'
    }).done( function(msg) {
    var row = $("[data-product-id='" + id + "'")
    row.remove('li');
    alert(msg.message)
    })
  })



})





