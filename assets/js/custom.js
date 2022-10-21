fetch("./../../dist/front.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("list_front").innerHTML = data;
    });

fetch("./../../dist/back.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.getElementById("list_back").innerHTML = data;
    });
