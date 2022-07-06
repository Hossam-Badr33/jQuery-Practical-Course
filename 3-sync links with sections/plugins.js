$(document).ready(function () {
  $(".content *").css({
    paddingTop: $(".nav").innerHeight() - 30,
  });
  $(".list").click(function (e) {
    e.preventDefault();
    /*var select = $("#" + $(this).attr("data-scroll") + "-section");*/
    var select = $("#" + $(this).data("scroll"));
    $("html, body").animate(
      {
        scrollTop: select.offset().top + 1,
      },
      500
    );
  });
  /* add active class to anchor links in nav */
  $(".list[data-scroll='home']").find("a").addClass("active");
  $(".list a").click(function () {
    //global solution
    /*
    $(".nav a").removeClass("active");
    $(this).addClass("active");
    */
    //select certain items
    $(this)
      .addClass("active")
      .parent()
      .siblings()
      .find("a")
      .removeClass("active");
  });
  /*sync links with sections */
  $(window).scroll(function () {
    $(".section").each(function () {
      if ($(window).scrollTop() > $(this).offset().top) {
        var indicator = $(this).attr("id");
        $(`.list[data-scroll=${indicator}]`).find("a").addClass("active").parent().siblings().find("a").removeClass("active");
      }
    });
  });
});
