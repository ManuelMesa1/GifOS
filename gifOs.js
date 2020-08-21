// API
const gifApi = "https://api.giphy.com/v1/gifs" //THIS API OS ONLY FOR THE SEARCH FUNCTION
const gifApiSuggTrend = "https://api.giphy.com/v1" //THIS API IS FOR THE SUGGESTIONS & TRENDS
const myApiKey = 'TfMqn5MLvAEPxt1X8BKvWIQsYuMsUXiB' //THIS IS MY API KEY

// HTML STRUCTURE
const valueSearchInput = document.getElementById('searchInput')
const styleSheet = document.getElementById("styleSheet");
const logo = document.querySelector("#gifOF_logo_light");
const tabLogo = document.querySelector("#tabLogo");
const myGifsBtn = document.getElementsByClassName('my_gifs_button')
const searchMainSection = document.getElementsByClassName('search_section')
const SearchSection = document.getElementById('search_results_section');
const bluetagbox = document.getElementsByClassName("searchResultsContainer")
const suggestionSection = document.getElementsByClassName('suggestions')
const trendsSection = document.getElementsByClassName('trends_section')
const trendsContainer = document.getElementById('trends_container')
const human = document.getElementById("gif_results_container")
const individualSearchGifBox = document.getElementsByClassName("searchGifResultInd");
const searchSuggestionsbox = document.getElementsByClassName("searchSuggestions");
const searchSuggestionstags = document.getElementsByClassName("individual_search_suggestion");
const bluebox = document.getElementsByClassName("results_box");
const sugGiphyContain = document.getElementsByClassName('sugImg')
const gifs_Creation_Section = document.getElementsByClassName('gif_creation_section')
const createGifAdvisory = document.getElementsByClassName('createGifAdvisory')
const check_video_container = document.getElementsByClassName('check_video_container')
const final_gif_container = document.getElementsByClassName('final_gif_container')
const my_Gifs_Section = document.getElementsByClassName("my_gifs_section");
const gifCreationBtn = document.getElementById("createGifBtn")
const cancel_gif_record_btn = document.getElementById("cancel_gif_record")
const startGifCreations = document.getElementById("begin_gif_record")
const video_preview = document.getElementById('video_preview')
const beginRecording = document.getElementById('start_rec');
const detainRecording = document.getElementById('stop_rec');
const outputPreview = document.getElementById('final_gif');
const redoRecording = document.getElementById('redo_gif');
const uploadRecording = document.querySelectorAll("#upload_gif")
const copyGifLink = document.getElementById('copy_link')
const downloadGif = document.getElementById('dwnld_gif')
const infobox = document.querySelectorAll('infobox')
const infoboxText = document.querySelectorAll(".infobox_text")
const playPreview = document.getElementById('playGif')
const gifContainer = document.getElementById('my_gifs_container')
const gifDeleteIcon = document.querySelectorAll('.close_icon')
const endGifFlow = document.getElementById('end_gif_run')
const delGifBtn = document.getElementById('del_gif_btn')
const delGifInput = document.getElementById('del_gif_input')

// EVENTS
document.addEventListener("click", myFunction);
valueSearchInput.addEventListener("input", changeFunction)
gifCreationBtn.addEventListener("click", createGifStart)

const events = {
    events: {},
    on: function(eventName, ...fn) {
        fn.forEach(inputFn => {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(inputFn);
        });
    },
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};

// THEME CHANGE FUNCTIONS 
function sailorDay() {
    styleSheet.setAttribute("href", "sailor_day.css");
    logo.setAttribute("src", "assets/gifOF_logo.png");
    tabLogo.setAttribute("href", "assets/gifOF_logo.png")
}

function sailorNight() {
    styleSheet.setAttribute("href", "sailor_night.css");
    logo.setAttribute("src", "assets/gifOF_logo_dark.png");
    tabLogo.setAttribute("href", "assets/gifOF_logo_dark.png")
}
// --------------------------------------------------------------------------------------------------------------------------------------------------
// SEARCH INPUT
function changeFunction() {
    const valueSearch = document.getElementById('searchInput').value;
    const magGlassImg = document.getElementById("magGlass");
    const searchBtn = document.getElementById('searchBtn');
    if (valueSearch !== null) {
        searchBtn.disabled = false;
        magGlassImg.setAttribute('src', 'assets/lupa.svg')
        searchBtn.style.color = "#110038"
        searchBtn.style.backgroundColor = "#F7C9F3"
    } else {
        searchBtn.disabled = true;
        magGlassImg.setAttribute('src', 'assets/lupa_inactivex.svg')
        searchBtn.style.color = "##B4B4B4"
        searchBtn.style.backgroundColor = "##E6E6E6"
    }
}

async function getGiphys() {
    my_Gifs_Section[0].style.display = "none"
    try {
        const valueSearch = document.getElementById('searchInput').value;
        // console.log('valueSearch', valueSearch);
        const response = await fetch(`${gifApi}/search?q=${valueSearch}&api_key=${myApiKey}&limit=24`)
        const dataReturned = await response.json()
            // console.log(dataReturned, 'data')

        Array.from(dataReturned.data).forEach(organism)

        function organism() {
            var organ = document.createElement("div")
            var tissue = document.createElement("img")
            organ.className = "searchGifResultBox"
            tissue.className = "searchGifResultInd"

            human.appendChild(organ)
            organ.appendChild(tissue)

            for (i = 0; i < individualSearchGifBox.length; i++) {
                const searchData = dataReturned.data[i].images.original.url;
                individualSearchGifBox[i].setAttribute('src', searchData);
            }
        }
        SearchSection.style.display = "block";
        trendsSection[0].style.display = "none"
        suggestionSection[0].style.display = "none"
        bluetagbox[0].style.display = "block"

    } catch (error) {
        if (error == 404) {
            console.log("Err 404", error)
        }
        return error;
    }
}

function myFunction() {
    searchSuggestionsbox[0].style.display = "none";
}
// ----------------------------------------------------------------------------------------------------------------
// SEARCH SUGGESTIONS
// BLUEBOXES
async function getGiphySearchSuggs() {
    try {
        const searchInput = await document.getElementById('searchInput');
        const valueSearchValue = await document.getElementById('searchInput').value;
        const gifApiforGSS = "https://api.giphy.com/v1"
        const tagApi = await fetch(`${gifApiforGSS}/tags/related/${valueSearchValue}?api_key=${myApiKey}&limit=3`);
        const tagApiResponse = await tagApi.json();
        // console.log("Tag", tagApiResponse);
        for (i = 0; i < 3; i++) {
            const tags = tagApiResponse.data[i].name;
            searchSuggestionstags[i].innerHTML = tags;
            bluebox[i].innerHTML = tags;
        }
        const searchSuggContainer = document.getElementsByClassName("searchSuggestions");
        if (searchInput != "") {
            searchSuggContainer[0].style.display = "block";
        } else {}
    } catch (error) {
        if (error == 404) {
            console.log("Err 404", error)
        }
        return error;
    }
}

// -----------------------------------------------------------------------------------------------
// SUGGESTIONS
async function getGiphysSuggestions() {
    try {
        const suggestionResponse = await fetch(`${gifApiSuggTrend}/trending/searches?q=&api_key=${myApiKey}`)
        const apiDataRtnSuggest = await suggestionResponse.json()
            // console.log('apiDataRtnSuggest', apiDataRtnSuggest);
            // Number of Containers
        const sugGiphyContainLength = sugGiphyContain.length
            // console.log(sugGiphyContainLength, "sugGiphyContainLength")
        let randomSugGif = Math.floor((Math.random() * 19) + 0)
            // console.log(randomSugGif, "randomSugGif")
        let gifsug = apiDataRtnSuggest.data[randomSugGif]
            // console.log(gifsug, 'gifsug');
            // *Here we have to get new giphy depending on the randon Gif title previously invoked*
        const gifSugResponse = await fetch(`${gifApiSuggTrend}/gifs/search?q=${gifsug}&api_key=${myApiKey}&limit=4`)
        const apiDataRtnGifSug = await gifSugResponse.json();
        // console.log(apiDataRtnGifSug, "apiDataRtnGifSug")

        Array.from(apiDataRtnGifSug.data).forEach(creation)

        function creation() {
            var solarsyst = document.getElementById("suggestions_Container")
            var earth = document.createElement("div")
            var exosphere = document.createElement("div")
            var thermosphere = document.createElement("div")
            var mesosphere = document.createElement("img")
            var crust = document.createElement("div")
            var uppermantle = document.createElement("img")
            var mantle = document.createElement("button")
            solarsyst.appendChild(earth)
            earth.className = "sug_box"
            exosphere.className = "sug_header"
            thermosphere.className = "sug_header_title"
            mesosphere.className = "sug_close_button"
            mesosphere.setAttribute("src", "assets/button_close.svg")
            crust.className = "giphy_container"
            uppermantle.className = "sugImg"
            mantle.className = "see_more_box button"
            mantle.innerHTML = "Ver mas"
            earth.appendChild(exosphere)
            exosphere.appendChild(thermosphere)
            exosphere.appendChild(mesosphere)
            earth.appendChild(crust)
            crust.appendChild(uppermantle)
            crust.appendChild(mantle)
            mantle.addEventListener("click", openGiphyDevWeb)

            let i = "";
            for (i = 0; i < sugGiphyContain.length; i++) {
                let randomSugGifDataUrl = apiDataRtnGifSug.data[i].images.original.url
                sugGiphyContain[i].setAttribute('src', randomSugGifDataUrl)
                    // TAGS
                let titleContainer = document.getElementsByClassName("sug_header_title")
                let randomSugGifDataTitle = apiDataRtnGifSug.data[i].title
                titleContainer[i].innerHTML = randomSugGifDataTitle
                    // console.log("And there was Light")
            }
        }
        // SUGGESTION GIFS
    } catch (error) {
        if (error == 404) {
            console.log("Err 404", error)
        }
        return error;
    }
}
// -----------------------------------------------------------------------------------------------------------------------------
// TRENDS
async function getGiphysTrends() {
    const trendResponse = await fetch(`${gifApiSuggTrend}/gifs/trending?q=&api_key=${myApiKey}&limit=24`)
    const apiDataRtnTrend = await trendResponse.json();
    // console.log('apiDataRtnTrend', apiDataRtnTrend)

    Array.from(apiDataRtnTrend.data).forEach(test)

    function test() {
        var new_div = document.createElement("div")
        var new_div_img = document.createElement("img")
        var new_div_img_footer = document.createElement("div")
        var new_p = document.createElement("p")
            // console.log("New Div Created")
        new_div.className = "giphy_trend_container"
        new_div_img.className = "trendImg"
        new_div_img_footer.className = "trend_header"
        new_p.className = "trend_header_title"
            // console.log("divs styled!")
        trendsContainer.appendChild(new_div)
        new_div.appendChild(new_div_img)
        new_div.appendChild(new_div_img_footer)
        new_div_img_footer.appendChild(new_p)

        new_div_array = document.getElementsByClassName("giphy_trend_container")
        new_div_img_array = document.getElementsByClassName("trendImg")
        new_div_img_footer_array = document.getElementsByClassName("trend_header")
        new_p_array = document.getElementsByClassName("trend_header_title")
    }

    for (let i = 0; i < new_div_img_array.length; i++) {
        let randomTrendGifDataUrl = apiDataRtnTrend.data[i].images.original.url;
        new_div_img_array[i].setAttribute('src', randomTrendGifDataUrl)
            // TAGS
        let randomTndGifDataTitle = apiDataRtnTrend.data[i].title;
        new_p_array[i].innerHTML = randomTndGifDataTitle;
    }
    console.log('giphy trend container: ', new_div_array[0]) // contenedor total
    console.log('trend img: ', new_div_img_array[0]) // gif img
    console.log('new div img footer: ', new_div_img_footer_array[0]) //trend_header
    console.log('new p array: ', new_p_array[0]) // tags

    for (let i = 0; i < new_div_array.length; i++) {
        new_div_array[i].addEventListener("mouseover", showFooter)
        new_div_array[i].addEventListener("mouseleave", hideFooter)

        function showFooter() {
            new_div_img_footer_array[i].style.display = "flex"
        }

        function hideFooter() {
            new_div_img_footer_array[i].style.display = "none"
        }
    }
}

// SEE MORE BOXES

function openGiphyDevWeb() {
    window.open("https://giphy.com/");
}

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// VIDEO CAPTURE

function createGifStart() {
    searchMainSection[0].style.display = "none"
    createGifAdvisory[0].style.display = "block"
    check_video_container[0].style.display = "none"
    final_gif_container[0].style.display = "none"
    suggestionSection[0].style.display = "none";
    trendsSection[0].style.display = "none";
    SearchSection.style.display = "none";
    bluetagbox[0].style.display = "none";
    my_Gifs_Section[0].style.display = "none";
}

function homeFunction() {
    suggestionSection[0].style.display = "block";
    trendsSection[0].style.display = "block";
    SearchSection.style.display = "none";
    bluetagbox[0].style.display = "none";
    my_Gifs_Section[0].style.display = "none";
}

startGifCreations.onclick = async() => {
    createGifAdvisory[0].style.display = "none"
    check_video_container[0].style.display = "block"
    final_gif_container[0].style.display = "none"
    try {
        await initiateWebcam();
    } catch (e) {
        alert(e.message)
    }
};

beginRecording.onclick = () => {
    infoboxText[0].innerHTML = "Capturando tu Guifo";
    startRecording();
};

detainRecording.onclick = () => {
    infoboxText[0].innerHTML = "Vista Previa";
    stopRecording();
};

redoRecording.onclick = async() => {
    setTimeout(() => {}, 850);
    infoboxText[0].innerText = "Capturando tu Guifo";
    await initiateWebcam();
    await startRecording();
};

uploadRecording.forEach(uploadSubmission => {
    uploadSubmission.onclick = async() => {
        infoboxText[0].innerHTML = "Subiendo Guifo";
        createGifAdvisory[0].style.display = "none"
        check_video_container[0].style.display = "none"
        final_gif_container[0].style.display = "block"
        try {
            const newGif = await uploadCreatedGif();
            if ((await newGif.meta.status) === 200) {
                newGifId = await newGif.data.id;
                saveGifToLocalStorage(await newGifId);
                const data = await fetch(`http://api.giphy.com/v1/gifs?api_key=${myApiKey}&ids=${newGifId}`)
                const response = await data.json()
                const gif = await response.images.original
                outputPreview.setAttribute('src', gif)
            } else {
                alert(`${e.name}\n${e.message}`);
            }
        } catch (e) {
            infoboxText[0].src = "";
            infoboxText[0].innerHTML = `${e.name}\n${e.message}`;
        }
    };
});

playPreview.onclick = () => { video_preview.play() };

copyGifLink.onclick = () => {
    copyCreatedGifLink();
};
downloadGif.onclick = () => {
    downloadCreatedGif();
};

async function saveGifToLocalStorage(gif) {
    const response = await fetchURL(`https://api.giphy.com/v1/gifs/${gif}?api_key=${myApiKey}`);
    const data = response.data;
    const gifID = data.id;
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(`gif-${gifID}`, stringifiedData);
}

function copyCreatedGifLink() {
    const tempElement = document.createElement("textarea");
    tempElement.value = `https://giphy.com/gifs/${newGifId}`;
    tempElement.setAttribute("readonly", "");
    tempElement.style = 'display: "none"';
    document.body.appendChild(tempElement);
    tempElement.select();
    document.execCommand("copy");
    const popupContent = {
        header: "Éxito!",
        title: "Enlace copiado al portapapeles!",
        body: `Se ha copiado el enlace ${tempElement.value} al portapapeles`,
        hasOptions: false,
        icon: "success"
    };
    events.emit("newPopupDeleteGif", popupContent);
    alert("Copied data to clipboard!");
    document.body.removeChild(tempElement);
}
async function downloadCreatedGif() {
    const downloadUrl = `https://media.giphy.com/media/${newGifId}/giphy.gif`;
    const fetchedGif = fetch(downloadUrl);
    const blobGif = (await fetchedGif).blob();
    const urlGif = URL.createObjectURL(await blobGif);
    const saveImg = document.createElement("a");
    saveImg.href = urlGif;
    saveImg.download = "downloaded-guifo.gif";
    saveImg.style = 'display: "none"';
    document.body.appendChild(saveImg);
    saveImg.click();
    document.body.removeChild(saveImg);
}

async function initiateWebcam() {
    const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    });
    video_preview.srcObject = stream;
    await video_preview.play();
}
async function startRecording() {
    const stream = video_preview.srcObject;
    videoRecorder = new RecordRTCPromisesHandler(stream, {
        type: "video",
        mimeType: "video/webm; codecs=vp8",
        disableLogs: true,
        videoBitsPerSecond: 128000,
        frameRate: 30,
        quality: 10,
        width: 480,
        hidden: 240
    });
    gifRecorder = new RecordRTCPromisesHandler(stream, {
        disableLogs: true,
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240
    });
    await videoRecorder.startRecording();
    await gifRecorder.startRecording();
    videoRecorder.stream = stream;
}
async function stopRecording() {
    await videoRecorder.stopRecording();
    await gifRecorder.stopRecording();
    const videoBlob = await videoRecorder.getBlob();
    const gifBlob = await gifRecorder.getBlob();
    video_preview.src = URL.createObjectURL(videoBlob);
    videoRecorder.stream.getTracks().forEach(t => t.stop());
    video_preview.srcObject = null;
    // reset Recorder's state & clear the memory
    await videoRecorder.reset();
    await videoRecorder.destroy();
    await gifRecorder.reset();
    await gifRecorder.destroy();
    gifSrc = await gifBlob;
    outputPreview.src = URL.createObjectURL(await gifBlob);
    console.log(outputPreview.src)
    gifRecorder = null;
    videoRecorder = null;
}

async function uploadCreatedGif() {
    console.log("***Upload started***");
    const formData = new FormData();
    formData.append("file", gifSrc, "myGif.gif");
    const params = {
        method: "POST",
        body: formData,
        json: true
    };
    const data = await fetchURL(`https://upload.giphy.com/v1/gifs?api_key=${myApiKey}`, params);
    console.log(await data);
    console.log("***Upload ended***");
    return await data;
}
async function fetchURL(url, params = null) {
    try {
        const fetchData = await fetch(url, params);
        const response = await fetchData.json();
        return response;
    } catch (error) {
        if (error.name !== "AbortError") {
            console.log("Error al obtener resultados");
        }
        return error;
    }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------
// SEE ONLY MY GUIFOS
async function myGifView() {
    my_Gifs_Section[0].style.display = "block";
    gifs_Creation_Section[0].style.display = "none";
    suggestionSection[0].style.display = "none";
    trendsSection[0].style.display = "none";
    SearchSection.style.display = "none";
    bluetagbox[0].style.display = "none";
    let search = 'gif-';
    let values = Object.keys(localStorage)
        .filter((key) => key.startsWith(search))
        .map((key) => localStorage[key]);
    Array.from(values).forEach(test)

    function test() {
        try {
            var box = document.createElement('div')
            var header = document.createElement('div')
            var imgBox = document.createElement('img')

            // del.setAttribute('src', "assets/close.svg")

            gifContainer.appendChild(box)
            box.appendChild(header)
            box.appendChild(imgBox)


            box.className = "my_gif_box"
            header.className = "gif_header"
            imgBox.className = "my_gif_img"

            const box_array = document.getElementsByClassName("my_gif_box")
            for (var i = 0; i < box_array.length; i++) {
                const gifParsed = JSON.parse(values[i])
                    // console.log('gifParsed', gifParsed)
                let gifURL = gifParsed.images.original.url
                let gifName = gifParsed.id
                header.innerHTML = gifName
                imgBox.setAttribute('src', gifURL)
            }
        } catch (error) {
            console.log(error)
        }
    }
}

delGifBtn.addEventListener("click", removeGif)

async function removeGif() {
    const gifDel = delGifInput.value
    await localStorage.removeItem(`gif-${gifDel}`);
    await alert(`Gif Removed! PAGE WILL RELOAD TO HOME PAGE`);
    await location.reload()
    return false;
}