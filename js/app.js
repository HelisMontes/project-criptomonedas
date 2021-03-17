const selectCriptomoneda = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const selectMoneda = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');
document.addEventListener('DOMContentLoaded', () => {
    loadCriptomoneda();
    formulario.addEventListener('submit', validateForm);
});
const criptomonedaSelect = (criptomonedas) => new Promise(resolve => {
    resolve(criptomonedas);
});
const loadCriptomoneda = () => {
    const URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(URL)
        .then(result => result.json())
        .then(data => criptomonedaSelect(data.Data))
        .then(criptomonedas => addCriptomonedas(criptomonedas));
};
const addCriptomonedas = (criptomonedas) => {
    criptomonedas.map(criptomoneda => {
        const { Name, FullName } = criptomoneda.CoinInfo;
        const loadSelect = document.createElement('option');
        loadSelect.value = Name;
        loadSelect.textContent = FullName;
        selectCriptomoneda.appendChild(loadSelect);
    });
};
const validateForm = (e) => {
    e.preventDefault();
    if (selectMoneda.value === '' || selectCriptomoneda.value === '') {
        printMessage('Todo los campos son obligatorios');
        return;
    }
    ;
    consultAPI(selectMoneda.value, selectCriptomoneda.value);
};
const printMessage = (message) => {
    const alert = document.querySelector('.error');
    if (!alert) {
        const divMessage = document.createElement('div');
        divMessage.classList.add('error');
        divMessage.textContent = message;
        formulario.appendChild(divMessage);
        setTimeout(() => {
            divMessage.remove();
        }, 3000);
    }
    ;
};
const consultAPI = (moneda, criptomoneda) => {
    showSpinner();
    const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    fetch(URL)
        .then(result => result.json())
        .then(data => {
        printCotizacion(data.DISPLAY[criptomoneda][moneda]);
    });
};
const printCotizacion = (cotizacion) => {
    removeCotizacionHTML();
    const { CHANGE24HOUR, HIGHDAY, LOWDAY, LASTUPDATE, PRICE } = cotizacion;
    createHTML('El Precio es', PRICE, true);
    createHTML('Precio más alto del día', HIGHDAY);
    createHTML('Precio más bajo del día', LOWDAY);
    createHTML('Variación últimas 24 horas', CHANGE24HOUR);
    createHTML('Última Actualización', LASTUPDATE);
};
const createHTML = (message, value, precio) => {
    const element = document.createElement('p');
    if (precio)
        element.classList.add('precio');
    element.innerHTML = `${message}: <span> ${value} </span>`;
    resultado.appendChild(element);
};
const showSpinner = () => {
    removeCotizacionHTML();
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>    
    `;
    resultado.appendChild(spinner);
};
const removeCotizacionHTML = () => {
    while (resultado.firstChild) {
        resultado.firstChild.remove();
    }
    ;
};
