const form = document.getElementById("form")
const BASEURL = "https://www.thecolorapi.com"
const ENDPOINT = "/scheme"


form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const seedColor = formData.get("seed-color").substring(1)
    const colorSchemeMode = formData.get("color-scheme-mode")
    
    const fetchURL = `${BASEURL + ENDPOINT}?hex=${seedColor}&mode=${colorSchemeMode}&count=6`
    
    fetchColorScheme(fetchURL)
})

function fetchColorScheme(url) {
    try {
        fetch(url) 
        .then((res) => res.json())
        .then((data) => generateColorSchemeHtml(data.colors))
    } catch (err) {
        console.error(err)
    }
}

function generateColorSchemeHtml(colors) {
    document.getElementById("color-scheme-container").innerHTML = colors
    ?.map((color) => {
        return `
         <div title="Click to copy" style="background-color: ${color.hex.value}; position: relative;">
           <span>${color.hex.value}</span>
         </div>
        `
    }).join("")
}