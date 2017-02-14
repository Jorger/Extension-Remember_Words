/*
	URL donde estará desplegado el servicio
	El ejempplo ha sido desplegado en Zeit/now https://zeit.co/now
	O desplegar el servicio a nivel local..
*/
const URL_SERVICE = "https://CHANGE_URL_DEPLOY.now.sh";

//Buscar si la palabra existe...
let findWord = (word, callback) => {
	fetch(`${URL_SERVICE}/word/${word}`, {method: 'get'})
	.then((response) => {
		response.json().then((data) => {
			callback(null, data);
      	});
	}).catch(function(err) {
		callback(err);
	});
};

//Treae/define una palabra que se haya seleccionado...
function getWord(info, tab) {
	findWord(info.selectionText, (err, data) => {
		if(err) console.warn("Error");
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			chrome.tabs.sendMessage(tabs[0].id, {url : URL_SERVICE, action: "define", data});
		});
	});
}

//Menú..
var menu = chrome.contextMenus.create({
	title: "Definir: %s",
	contexts:["selection"],
	"onclick": getWord
});
