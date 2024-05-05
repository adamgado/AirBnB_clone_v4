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
