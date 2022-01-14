(function() {
    var TopNavBarMenuIcon = document.getElementById("TopNavBarMenuIcon");
    var TopNavBarCloseIcon = document.getElementById("TopNavBarCloseIcon");
    var TopNavBarOptions = document.getElementById("TopNavBarOptions");

    TopNavBarMenuIcon.addEventListener("click", function() {
        TopNavBarMenuIcon.style.display = "none";
        TopNavBarCloseIcon.style.display = "inline";
        TopNavBarOptions.style.display = "flex";
    })

    TopNavBarCloseIcon.addEventListener("click", function() {
        TopNavBarMenuIcon.style.display = "inline";
        TopNavBarCloseIcon.style.display = "none";
        TopNavBarOptions.style.display = "none";
    })

    window.addEventListener("resize", function() {
        if (window.innerWidth > 768) {
            TopNavBarMenuIcon.style.display = "none";
            TopNavBarCloseIcon.style.display = "none";
            TopNavBarOptions.style.display = "flex";
        } else {
            TopNavBarMenuIcon.style.display = "inline";
            TopNavBarCloseIcon.style.display = "none";
            TopNavBarOptions.style.display = "none";
        }

    })
})();
