$(document).ready(function () {
  $(".content .section").css({
    paddingTop: $(".nav").innerHeight(),
  });
  $(".list").click(function (e) {
    e.preventDefault();
    /*var select = $("#" + $(this).attr("data-scroll") + "-section");*/
    var select = $("#" + $(this).data("scroll"));
    $("html, body").animate(
      {
        scrollTop: select.offset().top + 2,
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

  /* .button-effects */
  function hoverEffect(element) {
    element.hover(
      function () {
        element.children("button").children().eq(0).animate({
          width: "100%",
          height: "100%",
        });
      },
      function () {
        element.children("button").children().eq(0).animate({
          width: 0,
          height: 0,
        });
      }
    );
  }
  /*hoverEffect ($(".effect1"));
  hoverEffect ($(".effect2"));*/
  /*adding all span-tags from jQuery*/
  $(".button-effects button").each(function () {
    $(this).prepend(`<span class='color'></span>`);
  });
  $(".effect1, .effect3").hover(
    function () {
      $(this).children("button").children().eq(0).animate(
        {
          width: "100%",
        },
        200
      );
    },
    function () {
      $(this).children("button").children().eq(0).animate(
        {
          width: 0,
        },
        200
      );
    }
  );
  $(".effect2, .effect4").hover(
    function () {
      $(this).children("button").children().eq(0).animate(
        {
          height: "100%",
        },
        200
      );
    },
    function () {
      $(this).children("button").children().eq(0).animate(
        {
          height: 0,
        },
        200
      );
    }
  );
  /*.animated-progress */
  $(".animated-progress .progress").each(function () {
    $(this)
      .children()
      .animate(
        {
          width: $(this).children().data("percent") + "%",
        },
        1000,
        function () {
          $(this).text($(this).data("percent"));
        }
      );
  });
  /*.fixed-menu add .menu-active*/
  $(".fixed-menu .fa-gear").click(function () {
    let fixedMenu = $(this).parent(".fixed-menu");
    let body = $("body");
    fixedMenu.toggleClass("menu-active");
    if (fixedMenu.hasClass("menu-active")) {
      body.animate(
        {
          paddingLeft: 0,
        },
        300
      );
      fixedMenu.animate(
        {
          left: "-" + fixedMenu.css("width"),
        },
        300
      );
    } else {
      body.animate(
        {
          paddingLeft: fixedMenu.css("width"),
        },
        300
      );
      fixedMenu.animate(
        {
          left: 0,
        },
        300
      );
    }
    clickLeft.animate({
      // left: "490px",
    });
    console.log(clickLeft.css("left"));
  });
  /*.themes */
  $(".themes-color").click(function () {
    $(this).siblings().removeClass("bgColor txtColor");
    $(this).addClass("bgColor txtColor");
    $(".bgColor").css({
      backgroundColor: $(this).data("background"),
    });
    $(".txtColor").css({
      color: $(this).data("text"),
    });
  });
  /*.gallery*/
  let galleryWidth = parseInt($(".gallery .list-albumes").css("width"));
  let galleryItemNo = $(".gallery .list-albumes img").length;
  let originalGalleryWidth = galleryWidth - galleryItemNo * 4.2;
  let itemMaxWidth = originalGalleryWidth / galleryItemNo + "px";
  console.log(itemMaxWidth);
  $(".gallery .list-albumes img").css({
    maxWidth: itemMaxWidth,
  });
  let basicImg = $(".gallery .basic-frame img");
  /////////////////////here
  $(".gallery .list-albumes img").on("click", function () {
    $(this).addClass("forArrow").siblings("img").removeClass("forArrow");
    basicImg.fadeOut(200, function () {
      $(this).attr("src", $(".forArrow").attr("src"));
    }).fadeIn(200);
    /*
    basicImg.attr("src", $(".forArrow").attr("src"));
    */
  });
  let clickLeft = $(".fa-gallery:first-child");
  let clickRight = $(".fa-gallery:nth-child(2)");
  clickLeft.click(function () {
    let forArrow = $(".gallery .list-albumes .forArrow");
    if (forArrow.is(":first-child")) {
      $(".gallery .list-albumes img:last-child").click();
    } else {
      forArrow.prev("img").click();
    }
  });
  clickRight.click(function () {
    let forArrow = $(".gallery .list-albumes .forArrow");
    if (forArrow.is(":last-child")) {
      $(".gallery .list-albumes img:first-child").click();
    } else {
      forArrow.next("img").click();
    }
  });
});
