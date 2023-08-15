
document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("id");
    inputField.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", searchData);
});

function searchData() {
    const id = document.getElementById("id").value;
    fetch(`/search?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById("notFound").style.display = "none";
            document.getElementById("heading-topic").style.display = "block";
            document.getElementById("color").style.display = "flex";
            document.getElementById("getColor").innerHTML = data.color;
            document.getElementById("getColor").style.color = data.color.toLowerCase();
            document.getElementById("getColorCode").innerHTML = data.colorCode;

            const mascotImage = document.getElementById("mascot");
            mascotImage.src = "./images/" + data.color.toLowerCase() + ".PNG";
        })
        .catch((error) => {
            console.error(error);
            console.log(error.message);
            if (error.message == 'Data not found' || error.message == 'Internal Server Error' || error.message == 'Unexpected end of JSON input') {
                document.getElementById("notFound").style.display = "block";
                document.getElementById("heading-topic").style.display = "none";
            }
        });
}