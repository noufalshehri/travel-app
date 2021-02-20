//initalize global variables
let start = "0"
let end = "0"
let language = "English"
//to handle form submit
function handleSubmit(event) {
    //prevent page refresh
    event.preventDefault()
    //get the entered data
    start = document.querySelector('#start').valueAsDate
    end = document.querySelector('#end').valueAsDate
    const duration = Math.round((end - start) / (1000 * 60 * 60 * 24))
    const destination = document.getElementById('name').value
    const city = destination.charAt(0).toUpperCase() + destination.slice(1)

    // check what text was put into the form field
    if (Client.validateString(destination)) {
        postData('http://localhost:8081/add', { destination: destination })
            .then(res => {
                //show result in English
                if (language === 'English') {
                    document.getElementById('city').innerHTML = `${city}, ${res.countryName}`;
                    document.getElementById("duration").innerHTML = `For ${duration} days`;
                    document.getElementById("temp").innerHTML = `${res.temp} °`;
                    document.getElementById("desc").innerHTML = `Mostly ${res.description}`;
                    document.getElementById("body").setAttribute("style", `background-image: url(${res.image});`);
                    document.getElementById("search-btn").setAttribute("style", "display: block");

                }
                //show result in Arabic
                else {
                    document.getElementById('city').innerHTML = `${res.countryNameAr}`;
                    document.getElementById("duration").innerHTML = `لمدة ${duration} ايام`;
                    document.getElementById("temp").innerHTML = `${res.temp} °`;
                    document.getElementById("desc").innerHTML = `غالباً ${res.descriptionAr}`;
                    document.getElementById("body").setAttribute("style", `background-image: url(${res.image}); text-align:right`);
                    document.getElementById("search-btn").innerHTML = "ابحث عن رحلات";
                    document.getElementById("search-btn").setAttribute("style", "display: block");
                }
            })
    }
    //if the user supplied invalid city/country name
    else
        alert("please enter a valid city or country name")
}

//post request 
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        alert("Not found, please try again")

    }
}

//to handle Arabic language switch
function setLang(lang) {
    language = lang;
    document.getElementById("name").setAttribute("placeholder", "المدينة او الدولة بالانجليزية");
    document.getElementById("departure").innerHTML = "تاريخ الذهاب";
    document.getElementById("return").innerHTML = "تاريخ العودة";
    document.getElementById("main-heading").innerHTML = "خطط لرحلتك القادمة";
    document.getElementById("arabic-btn").setAttribute("style", "display:none");
    document.getElementById("body").setAttribute("style", "text-align:right; background-image: url(images/Saffrah-background.svg);");
    document.getElementById("header").setAttribute("dir", "rtl");
}

export { handleSubmit, setLang }
