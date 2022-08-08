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
  //activate Esc buttton
  $(document).keydown(function (e) {
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
  /*.bounce */
  let bounce1 = $(".bounce-container1 .bounce-btn1 span");
  let bounce2 = $(".bounce-container2 .bounce-btn1 span");
  bounce1.click(function () {
    bounce($(this), 500, 2, 30);
  });
  bounce2.click(function () {
    bounce($(this), 250, 5, 70);
  });
  function bounce(selector, speed, times, distance) {
    for (let i = 0; i < times; i++) {
      selector
        .parent()
        .parent(".bounce")
        .animate(
          {
            top: "+=" + distance,
          },
          speed
        )
        .animate(
          {
            top: "-=" + distance,
          },
          speed
        );
    }
  }
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
  let detectClick = 0;
  $(".fixed-menu .fa-gear").click(function () {
    let fixedMenu = $(this).parent(".fixed-menu");
    let body = $("body");
    detectClick++;
    console.log(detectClick);
    fixedMenu.toggleClass("menu-active");
    if (fixedMenu.hasClass("menu-active") && detectClick === 1) {
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
    } else if (fixedMenu.hasClass("menu-active") && detectClick > 1) {
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
  $(".gallery .list-albumes img").css({
    maxWidth: itemMaxWidth,
  });
  let basicImg = $(".gallery .basic-frame img");
  $(".gallery .list-albumes img").on("click", function () {
    $(this).addClass("forArrow").siblings("img").removeClass("forArrow");
    basicImg
      .fadeOut(200, function () {
        $(this).attr("src", $(".forArrow").attr("src"));
      })
      .fadeIn(200);
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
  /* .toggle-product */
  $(".fa-product").on("click", function () {
    $(this).parent().next(".show-product-details").toggleClass("product-fade");
    $(this).toggleClass("fa-plus fa-minus");
  });
  $(".fa-item").on("click", function () {
    $(this).parent().next(".show-item-details").toggleClass("item-fade");
    $(this).toggleClass("fa-plus fa-minus");
  });
  $(".fa-list, .fa-th-large").click(function () {
    $(this)
      .parent(".choose-list-grid")
      .next(".toggle-item-container")
      .removeClass("list grid")
      .addClass($(this).data("choose"));
    $(this).addClass("red").siblings().removeClass("red");
  });
  /* .error-message */
  /*
  $(".error-message").each(function () {
    $(this)
      .parent()
      .animate({ right: "28px" }, 1000, function () {
        $(this).delay(2000).fadeOut();
      });
    $(this)
      .parent()
      .siblings(".content")
      .animate({ opacity: 0.1 }, 1000, function () {
        $(this).delay(2000).animate({opacity: 1});
      });
  });
  */
  let placeholder = "";
  $(".placeholder-hiding *[placeholder]")
    .focus(function () {
      //1st soln
      placeholder = $(this).attr("placeholder");
      $(this).attr("placeholder", "");
      //2nd soln
      /*$(this)
        .attr("data-type", $(this).attr("placeholder"))
        .siblings()
        .removeAttr("data-type");
      $(this).attr("placeholder", "");*/
    })
    .blur(function () {
      //1stsoln
      /*$(this).attr("placeholder", $(this).attr("data-type"));*/
      $(this).attr("placeholder", placeholder);
      /*showing message for empty fields */
      //1st soln with same blur
      // if ($(this).val() === "") {
      //   $(this).siblings("span").fadeIn(200).delay(2000).fadeOut(200);
      // }
    });
  /*showing message for empty fields */
  //2nd soln
  $(".placeholder-hiding .input-container [required]").blur(function () {
    if ($(this).val() === "" && $(this).css("direction") === "ltr") {
      $(this)
        .attr("placeholder", "Message")
        .siblings("span:last-of-type")
        .text("please insert field")
        .fadeIn(200)
        .delay(2000)
        .fadeOut(200);
    } else if ($(this).val() === "" && $(this).css("direction") === "rtl") {
      $(this)
        .attr("placeholder", "الرسالة")
        .siblings("span:last-of-type")
        .text("يجب ملأ الحقل")
        .fadeIn(200)
        .delay(2000)
        .fadeOut(200);
    }
  });
  /* adding asterisk to empt fields*/
  $(".placeholder-hiding .input-container [required]").after(
    `<span class='asterisk'>*</span>`
  );
  $(".asterisk").parent(".input-container").css({
    position: "relative",
  });
  let width = new Array();
  $(".asterisk").each(function (length) {
    width.push(
      $(this).parent(".input-container").innerWidth() -
        $(this).siblings("[required]").innerWidth()
    );
    if (length < 2) {
      $(this).css({
        position: "absolute",
        top: 11,
        left: $(".asterisk").prev("input").innerWidth() - 21,
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
      });
    } else {
      $(this).css({
        position: "absolute",
        top: 11,
        left: width[2] + 70,
        fontSize: 20,
        fontWeight: "bold",
        color: "red",
      });
    }
  });
  /*.input-container input[type="file"] */
  let inputFile = $(".input-container :file");
  inputFile.wrap("<div class='form-wrap'></div>");
  let formWrap = $(".form-wrap");
  formWrap
    .prepend("<span class='choose'>Choose a file</span>")
    .append("<i class='fa fa-upload fa-lg txtColor'></i>");
  inputFile.change(function () {
    $(".choose").text($(this).val().substring(12));
  });
  /*.unicode printing*/
  let unicode = $(".placeholder-hiding .unicode");
  let textInput = $(".placeholder-hiding .input-container:first-of-type :text");
  let messageTextarea = $(".placeholder-hiding .input-container textarea");
  textInput.on("keydown", function (e) {
    unicode.html(
      `unicode of letter 1- e.keyCode => ${e.keyCode} <br/>or 2- e.which ${e.which} same code`
    );
  });
  messageTextarea.on("keyup", function (e) {
    let charCode = $(this)
      .val()
      .charCodeAt($(this).val().length - 1);
    if (charCode < 200) {
      // all English letters less than 200 in UTF-16 => returned with charCodeAt
      $(this).css("direction", "ltr");
    } else if (charCode > 1570) {
      // all arabic letters more than 200 in UTF-16 => returned with charCodeAt
      $(this).css("direction", "rtl");
    }
  });
  //adding new taggs
  let tagCrea = $(".placeholder-hiding .tag-creation");
  let newTag = $(".placeholder-hiding .new-tags");
  let cancelTag = ".close2";
  let str;
  tagCrea.on("keyup", function (e) {
    if ((e.keyCode || e.which) == 188) {
      let regEx = new RegExp(tagCrea.val(), "gi");
      regEx.test(str)
        ? alert("element already exist")
        : newTag.append(
            `<span class="new-span">${tagCrea.val()}<i class="fa-solid fa-x fa-lg close2"></i></span>`
          );
      tagCrea.val("");
      str = $(".new-span").text();
    }
  });
  tagCrea.on("change", function () {});
  newTag.on("click", cancelTag, function () {
    $(this).parent("span").fadeOut(200).remove();
    let removed = $(this).parent("span").text();
    str = str.replace(removed, "");
  });
  /*.trim =>function*/
  let p1 = $(".trim-div .trim-100");
  let p2 = $(".trim-div .trim-200");
  let p3 = $(".trim-div .trim-300");
  function trimParagaraph(selector, number) {
    if (selector.length < number) {
      let newText = selector.text().substring(0, number);
      selector.text(newText);
    } else {
      selector.text(selector.text());
    }
  }
  trimParagaraph(p1, 100);
  trimParagaraph(p2, 200);
  trimParagaraph(p3, 300);
  /*.height-container*/
  let paraHeight = $(".height-container .height");
  let maxHeight = 0;
  paraHeight.each(function () {
    if ($(this).height() > maxHeight) {
      maxHeight = $(this).height();
      //everytime maxHeight will take height of large one
    } else {
      maxHeight = maxHeight;
    }
  });
  paraHeight.css("height", maxHeight + 5);
  /*.cards shuffle */
  let card = $(".cards-container .card");
  let zIndexCounter = 0;
  card.on("click", function () {
    console.log(parseInt($(this).css("width")));
    $(this)
      .animate(
        {
          left: "-" + parseInt($(this).parent().css("width")),
          top: -30,
        },
        300,
        function () {
          $(this).css({
            zIndex: --zIndexCounter,
          });
        }
      )
      .delay(300)
      .animate(
        {
          left: 0,
          top: 0,
        },
        300
      );
  });
  /*warning loop*/
  let warning = $(".warning-container");
  function hideWarning() {
    warning.fadeOut(600, function () {
      warning.fadeIn(600);
      hideWarning();
    });
  }
  hideWarning();
  /*ToDo list start*/
  let inputMission = $(".todo-Container .todo-form input");
  let clickMission = $(".todo-Container .todo-click");
  let list = $(".todo-list");
  clickMission.on("click", function (e) {
    e.preventDefault();
    if (inputMission.val() != "") {
      $(`<li class="todo-items">${inputMission.val()}</li>`).appendTo(list);
      inputMission.val("");
    }
  });
  list.on("click", "li", function () {
    $(this)
      .css("text-decoration", "line-through")
      .delay(200)
      .fadeOut(300, function () {
        $(this).remove();
      });
  });
  /*create Type-writer effect*/
  let typeWriterContent = $(".typeWriter-content");
  let typeCounter = 0;
  let typeList = typeWriterContent.data("text").split("");
  let interval = setInterval(function () {
    $.each(typeList, function () {});
    typeWriterContent.text(typeWriterContent.text() + typeList[typeCounter]);
    typeCounter++;
    if (typeCounter >= typeList.length) {
      clearInterval(interval);
    }
  }, 100);
});
