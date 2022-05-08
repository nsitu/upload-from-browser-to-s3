const imageForm = document.querySelector("#imageForm")
const imageInput = document.querySelector("#imageInput")

const progressIndicator = document.querySelector("#progressIndicator")
const progressPercent = document.querySelector("#progressPercent")
const progressDetails = document.querySelector("#progressDetails")

const result = document.querySelector("#result")


imageForm.addEventListener("submit", async event => {
  event.preventDefault()
  const file = imageInput.files[0]  
 
  // get secure url from our server; pass along original filename. 
  const { url } = await fetch("/s3Url?" + new URLSearchParams({name:file.name}) )
    .then(res => res.json()) 
 
    await axios.request({
        method: "PUT", 
        url: url, 
        data: file, 
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: updateProgress
    })
 
    uploadProgress.style.display='none'
    const a = document.createElement("a")
    a.href = url.split('?')[0]
    a.textContent = a.href 
    result.appendChild(a) 
    result.style.display='block'

    // post requst to my server to store any extra data


})


function updateProgress(p){ 
    let percentComplete = parseInt( (p.loaded / p.total) * 100)
    uploadProgress.style.display='block'
    progressIndicator.style.width= percentComplete+'%'
    progressPercent.textContent = percentComplete+'%'
    progressDetails.textContent = friendlyBytes(p.loaded) +' of ' + friendlyBytes(p.total)
}

function friendlyBytes(size) {
    let i = size == 0 ? 0 : Math.floor( Math.log(size) / Math.log(1024) );
    return ( size / Math.pow(1024, i) ).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
}
