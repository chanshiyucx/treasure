var url =
  "https://quick.y2ss.com/chat/Hotline/channel.jsp?cid=5001649&cnfid=18957&j=2169937651&s=1";

interact(".draggable")
  .draggable({
    inertia: true,
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: "parent",
        endOnly: true
      })
    ],
    autoScroll: true,
    onmove: dragMoveListener,
    onend: function(event) {
      var textEl = event.target.querySelector("p");
      textEl &&
        (textEl.textContent =
          "moved a distance of " +
          Math.sqrt(
            (Math.pow(event.pageX - event.x0, 2) +
              Math.pow(event.pageY - event.y0, 2)) |
              0
          ).toFixed(2) +
          "px");
    }
  })
  .on("tap", function(event) {
    event.preventDefault();
    window.location = url;
  });

function dragMoveListener(event) {
  var target = event.target;
  var x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
  var y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

  target.style.webkitTransform = target.style.transform =
    "translate(" + x + "px, " + y + "px)";

  target.setAttribute("data-x", x);
  target.setAttribute("data-y", y);
}

window.dragMoveListener = dragMoveListener;
