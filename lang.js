(function () {
  var params = new URLSearchParams(location.search);
  var stored = null;
  try { stored = localStorage.getItem("lang"); } catch (e) {}
  var lang = params.get("lang") || stored || ((navigator.language || "en").toLowerCase().indexOf("tr") === 0 ? "tr" : "en");
  if (lang !== "tr" && lang !== "en") lang = "en";

  function apply() {
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang button").forEach(function (b) { b.classList.toggle("active", b.dataset.set === lang); });
    var t = document.body.getAttribute("data-title-" + lang);
    if (t) document.title = t;
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.set;
      try { localStorage.setItem("lang", lang); } catch (e) {}
      apply();
    });
  });
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
  apply();
})();
