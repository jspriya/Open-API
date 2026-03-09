const url1 = `https://api.open-meteo.com/v1/forecast?latitude=37.55&longitude=-121.99&hourly=temperature_2m`;
const url2 = `https://api.open-meteo.com/v1/forecast?latitude=37.55&longitude=-121.99&hourly=relative_humidity_2m`;

const tableBody = document.getElementById("tableBody");

function getWeatherData(param) {
    let url
    let value

    if (param == "Temperature") {
        url = url1
        value = "temperature_2m"
    } else if (param == "Humidity") {
        url = url2
        value = "relative_humidity_2m"
    } else {
        "Invalid argument"
    }

    Promise.all([
        fetch(url).then(res => res.json()),
    ])
    .then(([data1]) => {
            const times = data1.hourly.time;
            const val = data1.hourly[value];

            let rows = "";
            for (let i = 0; i < times.length; i++) {
                rows += `
                    <tr>
                        <td>${times[i]}</td>
                        <td>${val[i]}</td>
                    </tr>
                `;
            }
            tableBody.innerHTML = rows;
        })
        .catch(error => console.error(error));
}
