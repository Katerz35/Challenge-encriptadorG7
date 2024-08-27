const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");

function removerTildesYCaracteresEspeciales(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z\s]/g, "")
        .replace(/ñ/g, "n");
}

function validarEntrada(evento) {
    const tecla = evento.key;
    
    // Permitir teclas de control (Ctrl, Alt, Meta), teclas especiales y una sola tecla normal
    if (evento.ctrlKey || evento.altKey || evento.metaKey || tecla.length > 1) {
        return;
    }

    // Prevenir la entrada de caracteres no permitidos
    if (!/^[a-z\s]$/.test(tecla)) {
        evento.preventDefault();
    }
}

function procesarPegado(evento) {
    evento.preventDefault();
    const textoPegado = (evento.clipboardData || window.clipboardData).getData('text');
    const textoFiltrado = removerTildesYCaracteresEspeciales(textoPegado);
    document.execCommand('insertText', false, textoFiltrado);
}

textArea.addEventListener('keydown', validarEntrada);
textArea.addEventListener('paste', procesarPegado);
textArea.addEventListener('input', function() {
    this.value = removerTildesYCaracteresEspeciales(this.value);
});

function encriptar(stringEncriptado) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    matrizCodigo.forEach(([letra, codigo]) => {
        stringEncriptado = stringEncriptado.replaceAll(letra, codigo);
    });
    
    return stringEncriptado;
}

function desencriptar(stringDesencriptado) {
    const matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    
    matrizCodigo.forEach(([letra, codigo]) => {
        stringDesencriptado = stringDesencriptado.replaceAll(codigo, letra);
    });
    
    return stringDesencriptado;
}

function btnEncriptar() {
    const textoEncriptado = encriptar(textArea.value);
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(textArea.value);
    mensaje.value = textoDesencriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

document.querySelector(".btn-copiar").addEventListener("click", () => {
    const textoCopiado = mensaje.value;
    navigator.clipboard.writeText(textoCopiado).then(() => {
        mensaje.value = "";
        alert("Texto copiado al portapapeles!");
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
});



