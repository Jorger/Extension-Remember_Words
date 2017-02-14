//Guarda una palabra que se ha seleccionado...
let saveWord = (url, param, callback) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${url}/saveword`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    var data = JSON.stringify(param);
    xhr.send(data);
};

//Muestra la ventana para guardar una nueva palabra
let popupSave = (url, data) => {
    //La palabra ya existía...
    if(!data.error) {
        sweetAlert({
            title   : data.word,
            text    : `Ya existía un significado para la palabra ${data.word} el cual es: <br><h4><b>${data.meaning}</b></h4>`,
            type    : "info",
            html    : true
        });
    }
    else {
        swal({
            title : data.word,
            text: `Escribe el significado de la palabra ${data.word}`,
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            animation: "slide-from-top",
            inputPlaceholder: "Significado de la palabra",
        },
        (inputValue) =>
        {
            if (inputValue === false) return false;
            if (inputValue === ""){
                swal.showInputError("Escribe el significado");
                return false
            }
            saveWord(url, {word : data.word, meaning : inputValue}, (response) => {
                swal({
                        title: data.word,
                        text: `Se ha guardado el significado para <b>${data.word}</b>`,
                        timer: 2000,
                        showConfirmButton: false,
                        type : "success",
                        html    : true
                    });
            });
        });
    }
}

//Recibe el mensaje desde el script de background...
chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.action === "define") {
        if(!msg.data.error) {
            sweetAlert({
                title   : msg.data.word,
                text    : `Significado: <b>${msg.data.meaning}</b>`,
                type    : "success",
                html    : true
            });
        }
        else {
            popupSave(msg.url, msg.data);
        }
    }
});
