$(document).ready(function () {
  $(function () {
    /* ====== 레이어 정렬(분해/조립 공통) ====== */
    $(window).on("load", function () {
      reflowLayers(); // 이미지 다 로드되고 나서 다시 한 번 위치 재계산
    });

    function reflowLayers() {
      const isExpanded = $(".poster").hasClass("expanded");

      if (isExpanded) {
        const startTop = -30; // 맨 위 번의 시작 위치
        const rowHeight = 100; // ✅ 한 줄 높이 + 간격 (조절 포인트)

        let index = 0;
        $(".ingredient-row").each(function () {
          const $row = $(this);
          if ($row.hasClass("ingredient-hidden")) return;

          const top = startTop + rowHeight * index;
          $row.css("top", top + "px");
          index++;
        });
      } else {
        // 조립된 상태 (예전처럼 겹치게)
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

    /* 버거 클릭 → 분해 / 조립 */
    $("#burgerClick").on("click", function () {
      $(".poster").toggleClass("expanded");
      reflowLayers();
    });

    /* Done → 조립 상태로 */
    $(".done-btn").on("click", function (e) {
      e.stopPropagation();
      $(".poster").removeClass("expanded");
      reflowLayers();
    });

    /* 토핑 제거 체크박스 */
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

    /* ====== NEW: BUN 선택 / 미리보기 ====== */
    const bunSrc = {
      squid: {
        top: "pic/4x/Asset 1@4x.png", // 오징어먹물 번 위
        bottom: "pic/4x/Asset 10@4x.png", // 오징어먹물 번 아래
      },
      plain: {
        top: "pic/4x/Asset 11@4x.png", // 플레인 번 위
        bottom: "pic/4x/Asset 14@4x.png", // 플레인 번 아래
      },
    };

    let currentBun = "squid"; // 현재 확정된 번 타입: squid / plain

    // 실제로 이미지 src 를 바꿔주는 함수
    function applyBunImages(mode) {
      const type = mode || currentBun; // 미리보기이면 mode, 아니면 현재 선택한 값
      $(".layer-bun-top").attr("src", bunSrc[type].top);
      $(".layer-bun-bottom").attr("src", bunSrc[type].bottom);
    }

    // 초기 번 이미지를 현재 선택 값으로 맞춰줌
    applyBunImages();

    // hover 미리보기
    $("#bunChoices .choice").on("mouseenter", function () {
      const value = $(this).data("value"); // squid or plain
      $("#bunChoices .choice").removeClass("selected preview");
      $(this).addClass("preview");
      applyBunImages(value); // 미리보기용 이미지로 바꿈
    });

    // 마우스가 그룹 밖으로 나갈 때 → 진짜 선택 값으로 되돌리기
    $("#bunChoices").on("mouseleave", function () {
      $("#bunChoices .choice").removeClass("preview selected");
      $('#bunChoices .choice[data-value="' + currentBun + '"]').addClass(
        "selected"
      );
      applyBunImages(); // currentBun 기준으로 복구
    });

    // 클릭하면 선택 확정
    $("#bunChoices .choice").on("click", function () {
      const value = $(this).data("value");
      currentBun = value; // 선택값 저장
      $("#bunChoices .choice").removeClass("preview selected");
      $(this).addClass("selected");
      applyBunImages(); // 확정값으로 적용
    });

    // // 기본 상태 적용
    // updateBunLayers();

    /* ====== NEW: SAUCE 선택 / 미리보기 ====== */
    $(function () {
      // 1) 소스 이미지 경로 정의
      const sauceSrc = {
        mustard: "pic/4x/Asset 7@4x.png", // 머스타드 이미지
        ketchup: "pic/4x/Asset 12@4x.png", // 케첩 이미지 (파일명은 네가 실제 쓰는 이름으로)
      };

      let currentSauce = "mustard"; // 기본 선택

      // 2) 실제로 소스 이미지를 바꾸는 함수
      function applySauceImage(mode) {
        const type = mode || currentSauce; // 미리보기면 mode, 아니면 현재 선택 값
        $(".layer-sauce").attr("src", sauceSrc[type]);
      }

      // 처음 한 번 적용
      applySauceImage();

      // 3) hover → 미리보기
      $("#sauceChoices .choice").on("mouseenter", function () {
        const value = $(this).data("value"); // "mustard" 또는 "ketchup"
        $("#sauceChoices .choice").removeClass("preview selected");
        $(this).addClass("preview");
        applySauceImage(value); // 미리보기 이미지로 교체
      });

      // 4) 그룹 밖으로 마우스가 나가면 → 원래 선택 값으로 복귀
      $("#sauceChoices").on("mouseleave", function () {
        $("#sauceChoices .choice").removeClass("preview selected");
        $('#sauceChoices .choice[data-value="' + currentSauce + '"]').addClass(
          "selected"
        );
        applySauceImage(); // currentSauce 기준으로 다시 적용
      });

      // 5) 클릭 → 선택 확정
      $("#sauceChoices .choice").on("click", function () {
        const value = $(this).data("value");
        currentSauce = value; // 현재 선택 값 저장
        $("#sauceChoices .choice").removeClass("preview selected");
        $(this).addClass("selected");
        applySauceImage(); // 확정된 이미지로 적용
      });
    });
  });
});

// $(document).ready(function () {
//   console.log("제이쿼리 로드 완료");

//   $(".hamburger").on("click", function () {
//     console.log("work");
//     $(".hamburger").addClass("clicked");
//     $(".logo").addClass("clicked");
//     $(".bunbox").addClass("item");
//     $(".onionbox").addClass("item");
//     $(".picklebox").addClass("item");
//     $(".tomatobox").addClass("item");
//     $(".saladbox").addClass("item");
//     $(".saucebox").addClass("item");
//   });
// });
