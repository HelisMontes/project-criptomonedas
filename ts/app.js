var selectCriptomoneda = document.querySelector('#criptomonedas');
var formulario = document.querySelector('#formulario');
document.addEventListener('DOMContentLoaded', function () {
    loadCriptomoneda();
});
var criptomonedaSelect = function (criptomonedas) { return new Promise(function (resolve) {
    resolve(criptomonedas);
}); };
var loadCriptomoneda = function () {
    var URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
    fetch(URL)
        .then(function (result) { return result.json(); })
        .then(function (data) { return criptomonedaSelect(data.Data); })
        .then(function (criptomonedas) { return addCriptomonedas(criptomonedas); });
};
var addCriptomonedas = function (criptomonedas) {
    criptomonedas.map(function (criptomoneda) {
        var _a = criptomoneda.CoinInfo, Name = _a.Name, FullName = _a.FullName;
        var loadSelect = document.createElement('option');
        loadSelect.value = Name;
        loadSelect.textContent = FullName;
        selectCriptomoneda.appendChild(loadSelect);
    });
};
