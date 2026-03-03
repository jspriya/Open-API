const url1 = `https://api.open-meteo.com/v1/forecast?latitude=37.55&longitude=-121.99&hourly=temperature_2m`;
const url2 = `https://api.open-meteo.com/v1/forecast?latitude=37.55&longitude=-121.99&hourly=relative_humidity_2m`;

/*
fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch weather data. please try again later');   
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("Error fetching forecast:", error);
    })
*/
const tableBody = document.getElementById("tableBody");

Promise.all([
    fetch(url1).then(res => res.json()),
    fetch(url2).then(res => res.json())
])
.then(([data1, data2]) => {
        const times = data1.hourly.time;
        const temps = data1.hourly.temperature_2m;
        const humidity = data2.hourly.relative_humidity_2m;

        let rows = "";
        for (let i = 0; i < times.length; i++) {
            rows += `
                <tr>
                    <td>${times[i]}</td>
                    <td>${temps[i]}</td>
                    <td>${humidity[i]}</td>
                </tr>
            `;
        }
        tableBody.innerHTML = rows;
    })
    .catch(error => console.error(error));