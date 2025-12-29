const locationURL = "http://127.0.0.1:5000/get_location_names";
const predictURL = "http://127.0.0.1:5000/predict_home_price";

window.onload = () => {
    fetch(locationURL)
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById("uiLocations");
            select.innerHTML = "";
            data.locations.forEach(loc => {
                const option = document.createElement("option");
                option.value = loc;
                option.text = loc;
                select.appendChild(option);
            });
        });
};

function getValue(name) {
    return document.querySelector(`input[name="${name}"]:checked`).value;
}

function onClickedEstimatePrice() {
    const sqft = document.getElementById("uiSqft").value;
    const location = document.getElementById("uiLocations").value;
    const bhk = getValue("uiBHK");
    const bath = getValue("uiBathrooms");
    const result = document.getElementById("uiEstimatedPrice");

    const formData = new FormData();
    formData.append("total_sqft", sqft);
    formData.append("location", location);
    formData.append("bhk", bhk);
    formData.append("bath", bath);

    fetch(predictURL, {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        result.innerHTML = `₹ ${data.estimated_price} Lakh`;
    });
}
