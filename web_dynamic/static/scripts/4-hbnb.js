$(document).ready(function () {
  let aid = [];
  $('input[type=checkbox]').click(function () {
    const alist = [];
    aid = [];
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
  $('.filters button').click(function (event) {
    event.preventDefault();
    $('.places').text('');
    const a = {};
    a.amenities = aid;
    listPlaces(JSON.stringify(a));
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $('#api_status').addClass('available');
    },
    error: function (xhr, status) {
      console.log('error ' + xhr);
    }
  });
  listPlaces();
});
function listPlaces (amenities = '{}') {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: amenities,
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let b = 0; b < places.length; b++) {
        $('.places').append(`
<article>
<div class="title_box">
<h2> ${places[b].name}</h2>
<div class="price_by_night"> ${places[b].price_by_night} </div>
</div>
<div class="information">
<div class="max_guest">${places[i].max_guest}
${places[b].max_guest > 1 ? 'Guests' : 'Guest'} </div>
<div class="number_rooms">${places[b].number_rooms}
${places[b].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}  </div>
<div class="number_bathrooms">${places[b].number_bathrooms}
${places[b].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}  </div>
</div>
<div class="user">
</div>
<div class="description">
${places[b].description}
</div>
</article>
`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
}
