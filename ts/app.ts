const selectCriptomoneda:any = document.querySelector('#criptomonedas');
const formulario:any = document.querySelector('#formulario');

document.addEventListener('DOMContentLoaded', ():void => {
    loadCriptomoneda();
});

const criptomonedaSelect = (criptomonedas:any[]) => new Promise( resolve => {
    resolve(criptomonedas);
});

const loadCriptomoneda = ():void => {
    const URL:string = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(URL)
        .then(result => result.json())
        .then(data => criptomonedaSelect(data.Data))
        .then(criptomonedas => addCriptomonedas(criptomonedas));
};

const addCriptomonedas = (criptomonedas:any):void => {
    criptomonedas.map(criptomoneda =>{
        const { Name, FullName }:{Name:string, FullName:string} = criptomoneda.CoinInfo;
        const loadSelect:any = document.createElement('option');
        loadSelect.value = Name;
        loadSelect.textContent = FullName;
        selectCriptomoneda.appendChild(loadSelect);
    })    
}