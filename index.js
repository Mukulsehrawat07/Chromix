const form = document.getElementById("form")
const container = document.getElementById("color-scheme-container")
const loader = document.getElementById("loader")
const messageEl = document.getElementById("message")

const BASEURL = "https://www.thecolorapi.com"
const ENDPOINT = "/scheme"

/* helpers for UX */
function showLoader() {
    loader.classList.remove("hidden")
    loader.setAttribute("aria-hidden", "false")
}

function hideLoader() {
    loader.classList.add("hidden")
    loader.setAttribute("aria-hidden", "true")
}

function showMessage(text, duration = 1500) {
    messageEl.textContent = text
    messageEl.classList.add("visible")
    setTimeout(() => {
        messageEl.classList.remove("visible")
    }, duration)
}

function copyToClipboard(text) {
    // use Clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage(`Copied ${text}`)
        }).catch((e) => {
            showMessage("Failed to copy", 2000)
            console.error(e)
        })
    } else {
        // fallback
        const textarea = document.createElement("textarea")
        textarea.value = text
        textarea.style.position = "fixed"
        textarea.style.top = "-9999px"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        try {
            document.execCommand("copy")
            showMessage(`Copied ${text}`)
        } catch (err) {
            showMessage("Failed to copy", 2000)
            console.error(err)
        }
        document.body.removeChild(textarea)
    }
}

defaults()

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const formData = new FormData(event.target)
    const seedColor = formData.get("seed-color").substring(1)
    const colorSchemeMode = formData.get("color-scheme-mode")
    
    const fetchURL = `${BASEURL + ENDPOINT}?hex=${seedColor}&mode=${colorSchemeMode}&count=6`
    
    fetchColorScheme(fetchURL)
})

// fetch with loader and error handling
function fetchColorScheme(url) {
    showLoader()
    fetch(url)
        .then((res) => {
            if (!res.ok) throw new Error("Network response was not ok")
            return res.json()
        })
        .then((data) => generateColorSchemeHtml(data.colors))
        .catch(err => {
            console.error(err)
            showMessage("Error loading colors", 2000)
        })
        .finally(() => hideLoader())
}

// render blocks and use event delegation for copy
function generateColorSchemeHtml(colors) {
    // remove instructions if present so boxes can fill container
    const instr = container.querySelector('.instructions')
    if (instr) instr.remove()

    if (!colors || colors.length === 0) {
        container.innerHTML = "<p>No colors returned.</p>"
        return
    }

    container.innerHTML = colors
        .map((color) => {
            return `
         <div class="color-box" tabindex="0" data-hex="${color.hex.value}" style="background-color: ${color.hex.value};">
           <span>${color.hex.value}</span>
         </div>
        `
        })
        .join("")
    
    // fade-in animation by forcing reflow
    const boxes = container.querySelectorAll(".color-box")
    boxes.forEach((b, i) => {
        b.style.opacity = 0
        setTimeout(() => { b.style.opacity = 1 }, i * 100)
    })
}

// listen for clicks inside container
container.addEventListener("click", (event) => {
    const box = event.target.closest(".color-box")
    if (!box) return
    const hex = box.dataset.hex
    if (hex) copyToClipboard(hex)
})

function defaults() {
    // maybe pre-populate scheme on load
    const initialColor = document.getElementById("seed-color").value.substring(1)
    fetchColorScheme(`${BASEURL + ENDPOINT}?hex=${initialColor}&mode=monochrome&count=6`)
}
