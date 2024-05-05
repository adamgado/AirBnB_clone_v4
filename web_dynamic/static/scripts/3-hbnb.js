$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    const alist = [];
    const aid = [];
    $('input[type=checkbox]:checked').each(function () {
      alist.push($(this).attr('data-name'));
      aid.push($(this).attr('data-id'));
    });
    if (alist.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(alist.join(', '));
    }
    console.log(aid);
  });
});
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/status/',
  type: 'GET',
  dataType: 'json',
  success: function (json) {
    $('#api_status').addClass('available');
  },
  error: function (xhr, status) {
    console.log('error ' + status);
  }
});
$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  dataType: 'json',
  data: '{}',
  contentType: 'application/json; charset=utf-8',
  success: function (places) {
    for (let i = 0; i < places.length; i++) {
      $('.places').append(`<article>
<div class="title_box">
<h2> ${places[i].name}</h2>
<div class="price_by_night"> ${places[i].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[i].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${places[i].number_rooms}
${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${places[i].number_bathrooms}
${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
</div>
<div class="description">
${places[i].description}
</div>
</article>
`);
    }
  },
  error: function (xhr, status) {
    console.log('error ' + status);
  }
});