document.addEventListener("DOMContentLoaded", function () {
    fetch("templates/header.html")
        .then(response => response.text())
        .then(header => {
            document.getElementById("header-container").innerHTML = header;
        })
    fetch("templates/footer.html")
        .then(response => response.text())
        .then(footer => {
            document.getElementById("footer-container").innerHTML = footer;
        })
});