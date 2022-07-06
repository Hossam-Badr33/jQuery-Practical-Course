$(document).ready(function () {
  $(".list").click(function (e) {
    e.preventDefault();
    /*var select = $("#" + $(this).attr("data-scroll") + "-section");*/
    var select = $("#" + $(this).data("scroll") + "-section");
    console.log($(this).data("scroll"));
    $("html, body").animate(
      {
        scrollTop: select.offset().top,
      },
      500
    );
  });
  $(".content *").css({
    paddingTop: $(".nav").innerHeight() - 10,
  });
});
