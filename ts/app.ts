const selectCriptomoneda:any = document.querySelector('#criptomonedas');
const formulario:any = document.querySelector('#formulario');
const selectMoneda:any = document.querySelector('#moneda');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', ():void => {
    loadCriptomoneda();
    formulario.addEventListener('submit', validateForm)
});

/* const criptomonedaSelect = (criptomonedas:any[]) => new Promise( resolve => {
    resolve(criptomonedas);
});*/

const loadCriptomoneda = async () => {
    const URL:string = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    try {
        const result = await fetch(URL);
        const data = await result.json();
        await addCriptomonedas(data.Data);
    } catch (error) { console.log(error); }
};

const addCriptomonedas = (criptomonedas:any):void => {
    criptomonedas.map(criptomoneda =>{
        const { Name, FullName }:{Name:string, FullName:string} = criptomoneda.CoinInfo;
        const loadSelect:any = document.createElement('option');
        loadSelect.value = Name;
        loadSelect.textContent = FullName;
        selectCriptomoneda.appendChild(loadSelect);
    });
};

const validateForm = (e:any):void => {
    e.preventDefault();
    if(selectMoneda.value === '' || selectCriptomoneda.value === ''){
        printMessage('Todo los campos son obligatorios');
        return;
    };
    consultAPI(selectMoneda.value, selectCriptomoneda.value);
};

const printMessage =(message:string):void => {
    const alert:any = document.querySelector('.error');
    if(!alert){
        const divMessage:any = document.createElement('div');
        divMessage.classList.add('error');
        divMessage.textContent = message;
        formulario.appendChild(divMessage);
        setTimeout(() => {
            divMessage.remove()
        },3000);
    };  
};

const consultAPI = async(moneda:string, criptomoneda:string) => {
    showSpinner();
    const URL:string = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
    try {
        const result:any = await fetch(URL);
        const data:any = await result.json();
        printCotizacion(data.DISPLAY[criptomoneda][moneda]);
    } catch (error) { console.log(error); }
};

const printCotizacion = (cotizacion):void => {
    removeCotizacionHTML();
    const{ CHANGE24HOUR, HIGHDAY, LOWDAY, LASTUPDATE, PRICE } = cotizacion;
    createHTML('El Precio es',PRICE, true);
    createHTML('Precio más alto del día',HIGHDAY);
    createHTML('Precio más bajo del día',LOWDAY);
    createHTML('Variación últimas 24 horas',CHANGE24HOUR);
    createHTML('Última Actualización',LASTUPDATE);   
};

const createHTML = (message:string, value:string, precio?:boolean):void => { 
    const element = document.createElement('p');
    if (precio) element.classList.add('precio');
    element.innerHTML = `${message}: <span> ${value} </span>`;
    resultado.appendChild(element);
}

const showSpinner = ():void => {
    removeCotizacionHTML();
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>    
    `;

    resultado.appendChild(spinner);
}

const removeCotizacionHTML = ():void => {
    while(resultado.firstChild){
        resultado.firstChild.remove();
    };
};