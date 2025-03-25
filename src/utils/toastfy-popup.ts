import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css'; // Importando os estilos do Toastify

export function ToastfyPopUp( text: string, color: string ){
    Toastify({
        text: text,
        duration: 3000,
        close: true, 
        gravity: "top", 
        position: "right", 
        backgroundColor: color, // Cor de fundo
      }).showToast();
}