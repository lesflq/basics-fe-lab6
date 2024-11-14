const innerContainer = document.querySelector('.inner')
const headerContainer = document.querySelector('.header')
space = " "
console.log("Request data...")
function download() {
    innerContainer.innerHTML = "";
    const successMessage = headerContainer.querySelector('.success')
    if (successMessage) successMessage.remove()
    
    const fetches=[]
    console.log("Preparing data...")
    for (var i = 1; i <= 5; i++) {
        fetchvar=fetch("https://randomuser.me/api")
            .then(response => {
                return response.json()
            })
            .then(data => {
                createresume(data)
            })
        fetches.push(fetchvar)
    }
    function createresume(resumedata) {
        resumedata.results.forEach(resum => {
            const resume = `
            <div class="resume">
                <img src="${resum.picture.large}" alt="image" class="image">
                <p><span>Name:</span> ${resum.name.title + space + resum.name.first + space + resum.name.last}</p>
                <p><span>Postcode:</span> ${resum.location.postcode}</p>
                <p><span>Country:</span> ${resum.location.country}</p>
                <p><span>Phone:</span> ${resum.phone}</p>
            </div>
            `
            innerContainer.insertAdjacentHTML('beforeend', resume);
        })
    }
    Promise.all(fetches).then(()=>{
        const success = `<div class="success">Success</div>`
        headerContainer.insertAdjacentHTML('beforeend', success)
        console.log("Data received")
    })
    .catch(err => console.error('Error:', err))
}
