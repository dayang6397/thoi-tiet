const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const content = $(".content");
const search = $(".search");
const capital = $(".capital");
const country = $(".country");
const time = $(".time");
const wenduNumber = $(".wendu-number");
const tianqi = $(".tianqi");
const kejiandu = $(".kejiandu");
const sudu = $(".sudu");
const shidu = $(".shidu");
const body = $("body");

async function wetherApp(captionSearch) {
    const getApi = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${captionSearch}&appid=0cef19ceb19b84b03faceb0f6b5c58b6`
    );
    const data = await getApi.json();
    console.log(data);

    if (data.cod == 200) {
        capital.innerText = data.name;
        country.innerText = data.sys.country;
        time.innerText = new Date().toLocaleString("vi");
        let nhietdo = Math.round(data.main.temp - 273.15);
        wenduNumber.innerText = `${nhietdo} °C`;
        tianqi.innerText = data.weather[0].main;
        kejiandu.innerText = data.visibility + " m";
        sudu.innerText = data.wind.speed + " m/s";
        shidu.innerText = data.main.humidity + " %";
        console.log(nhietdo);

        content.classList.remove("hide");
        body.setAttribute("class", "hot");

        if (nhietdo <= 27) {
            body.setAttribute("class", "liangkuai");
        }
        if (nhietdo <= 25) {
            body.setAttribute("class", "wennuan");
        }
        if (nhietdo <= 21) {
            body.setAttribute("class", "leng");
        }
        if (nhietdo <= 18) {
            body.setAttribute("class", "youwu");
        }
        if (data.weather[0].main.includes("Rain")) {
            body.setAttribute("class", "xiayu");
        }
       
    } else {
        content.classList.add("hide");
    }
}

search.onkeyup = function (e) {
    if (e.code === "Enter") {
        let captionSearch = search.value.trim();
        wetherApp(captionSearch);
    }
};
wetherApp("ha noi");
