console.log("Client side javascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle')
// .then((response) => {
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (event) =>{
    event.preventDefault()

    messageOne.textContent= "Loading..........."
    messageTwo.textContent= ""

    const location = search.value
    console.log(location)
    const url = '/weather?address='+location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent= data.error
            }
            else {
                messageOne.textContent=data.location
                messageTwo.textContent= "Temperature is "+data.forecast.temperature+" but feels like "+data.forecast.feelsLike
                //console.log(data.forecast)
            }
    
        })
    })
})



