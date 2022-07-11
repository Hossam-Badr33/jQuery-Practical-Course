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
        $(`.list[data-scroll=${indicator}]`)
          .find("a")
          .addClass("active")
          .parent()
          .siblings()
          .find("a")
          .removeClass("active");
      }
    });
    /* up to top .fa*/
    if ($(window).scrollTop() > 700) {
      if ($(".up").is(":hidden")) {
        $(".up").fadeIn(500);
      }
    } else {
      $(".up").fadeOut(500);
    }
  });
  $(".up").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1000
    );
  });
  /*.popup*/
  //if u have multiple popup
  $(".show-btn").click(function () {
    let pop = $("." + $(this).data("popup"));
    pop.addClass("visible");
  });
  $(".popup").click(function () {
    $(this).removeClass("visible");
  });
  $(".popup-inner").click(function (e) {
    e.stopPropagation();
  });
  $(".inner-show-btn").click(function () {
    // to select certain popup and leave another
    $(this).parentsUntil(".popup").parent().removeClass("visible");
  });
  //actvate Esc buttton
  $(document).keydown(function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 27) {
      $(".popup").removeClass("visible");
    }
  });
});
