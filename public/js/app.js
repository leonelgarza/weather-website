const weatherForm = document.querySelector('form')
const busqueda = document.querySelector('Input')
const busqueda2 = document.querySelector('Input.radio')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')
const img1 = document.querySelector('#img1')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = busqueda.value
    const temp = (busqueda2.checked)? "m" : "f"

    msg1.textContent = 'Loading...'
    msg2.textContent = ''
    img1.src = ''

    fetch('/weather?address=' + location +'&unit='+ temp).then((response) =>{
        console.log('weather?address=' + location +'&unit='+ temp)
        response.json().then((data)=> {
            if (data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
                img1.src = ''
            } else  {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
                img1.src = data.weatherLogo
            }
        })
    })
})

