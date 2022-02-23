console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const busqueda = document.querySelector('input')

const msg1 = document.querySelector('#msg1')
const msg2 = document.querySelector('#msg2')

weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault()

    const location = busqueda.value

    msg1.textContent = 'Cargando...'
    msg2.textContent = ''

    fetch('http://localhost:4000/weather?address=' + location).then((response) =>{
        response.json().then((data)=> {
            if (data.error){
                msg1.textContent = data.error
                msg2.textContent = ''
            } else  {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})

