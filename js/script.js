$(document).ready(function () {
  $(function () {
    $(window).on("load", function () {
      reflowLayers();
    });

    function reflowLayers() {
      const isExpanded = $(".poster").hasClass("expanded");

      if (isExpanded) {
        const startTop = -30;
        const rowHeight = 100;

        let index = 0;
        $(".ingredient-row").each(function () {
          const $row = $(this);
          if ($row.hasClass("ingredient-hidden")) return;

          const top = startTop + rowHeight * index;
          $row.css("top", top + "px");
          index++;
        });
      } else {
        const startTop = 50;
        const step = 35;

        let index = 0;
        $(".ingredient-row").each(function () {
          const $row = $(this);
          if ($row.hasClass("ingredient-hidden")) return;

          const top = startTop + step * index;
          $row.css("top", top + "px");
          index++;
        });
      }
    }

    reflowLayers();

    $("#burgerClick").on("click", function () {
      $(".poster").toggleClass("expanded");
      reflowLayers();
    });

    $(".done-btn").on("click", function (e) {
      e.stopPropagation();
      $(".poster").removeClass("expanded");
      reflowLayers();
    });

    $(".topping-toggle").on("change", function () {
      const target = $(this).data("target");
      const isChecked = $(this).is(":checked");
      const $row = $('.ingredient-row[data-ingredient="' + target + '"]');

      if (isChecked) {
        $row.addClass("ingredient-hidden");
      } else {
        $row.removeClass("ingredient-hidden");
      }
      reflowLayers();
    });

    const bunSrc = {
      squid: {
        top: "pic/4x/Asset 1@4x.png",
        bottom: "pic/4x/Asset 10@4x.png",
      },
      plain: {
        top: "pic/4x/Asset 11@4x.png",
        bottom: "pic/4x/Asset 14@4x.png",
      },
    };

    let currentBun = "squid";

    function applyBunImages(mode) {
      const type = mode || currentBun;
      $(".layer-bun-top").attr("src", bunSrc[type].top);
      $(".layer-bun-bottom").attr("src", bunSrc[type].bottom);
    }

    applyBunImages();

    $("#bunChoices .choice").on("mouseenter", function () {
      const value = $(this).data("value");
      $("#bunChoices .choice").removeClass("selected preview");
      $(this).addClass("preview");
      applyBunImages(value);
    });

    $("#bunChoices").on("mouseleave", function () {
      $("#bunChoices .choice").removeClass("preview selected");
      $('#bunChoices .choice[data-value="' + currentBun + '"]').addClass(
        "selected"
      );
      applyBunImages();
    });

    $("#bunChoices .choice").on("click", function () {
      const value = $(this).data("value");
      currentBun = value;
      $("#bunChoices .choice").removeClass("preview selected");
      $(this).addClass("selected");
      applyBunImages();
    });

    $(function () {
      const sauceSrc = {
        mustard: "pic/4x/Asset 7@4x.png",
        ketchup: "pic/4x/Asset 12@4x.png",
      };

      let currentSauce = "mustard";

      function applySauceImage(mode) {
        const type = mode || currentSauce;
        $(".layer-sauce").attr("src", sauceSrc[type]);
      }

      applySauceImage();

      $("#sauceChoices .choice").on("mouseenter", function () {
        const value = $(this).data("value");
        $("#sauceChoices .choice").removeClass("preview selected");
        $(this).addClass("preview");
        applySauceImage(value);
      });

      $("#sauceChoices").on("mouseleave", function () {
        $("#sauceChoices .choice").removeClass("preview selected");
        $('#sauceChoices .choice[data-value="' + currentSauce + '"]').addClass(
          "selected"
        );
        applySauceImage();
      });

      $("#sauceChoices .choice").on("click", function () {
        const value = $(this).data("value");
        currentSauce = value;
        $("#sauceChoices .choice").removeClass("preview selected");
        $(this).addClass("selected");
        applySauceImage();
      });
    });
  });
});
