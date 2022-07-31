function mySend(){
  console.log("yahallo");


  // $("#sending").click(function () {
    const x = document.getElementById("disablecountdown");
    console.log("yahallo2");

    var popup = $("#AniPopup");
    var time = $(".will-close strong");
    // var closeSeconds = $("#AniPopup").attr("data-close");
    // var openSeconds = $("#AniPopup").attr("data-open");
    var closeSeconds = 5;
    var openSeconds = 0;
    var button = $(this);

    if (x.style.display === "none") {
      x.style.display = "block";
    }
    // else {
    //   x.style.display = "none";
    // }

    button.attr("disabled", true);
    // setTimeout(function () {
    //   button.removeAttr("disabled");
    // }, 3000);

    setTimeout(function (e) {
      popup.modal("show");
      time.html(closeSeconds);

      var interval = setInterval(function () {
        time.html(closeSeconds);
        closeSeconds--;

        if (closeSeconds < 0) {
          popup.modal("hide");
          clearInterval(interval);
          button.removeAttr("disabled");
          x.style.display = "none";
        }
      }, 1000);
    }, openSeconds * 100);

    console.log("hey hey");
    // button.clicked = true;
    // setTimeout(function () {
    //   button.clicked = true;
    // }, 10000);
    // button.attr("disabled", true);
    // setTimeout(function () {
    //   button.removeAttr("disabled");
    // }, 3000);
    // if(!$('#text').val()){
    //    alert('field empty');
    //    button.removeAttr('disabled');
    // } else {
    //     $('#message').html('done');
    //     $('#text').val('');
    // }
  // }
  // );

  window.onscroll = function () {
    scrollFunction();
  };
}
