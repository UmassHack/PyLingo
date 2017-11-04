$(document).on("click", ".dropdown-menu li", function(){
  $.ajax({
    type: "GET",
    url: "/language/" + $(this).text(),
    success: function(data) {
      alert(data);
    },
  });
});
