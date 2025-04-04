import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css' 

export function ToastfyPopUp(text: string, color: string) {
  Toastify({
    text,
    duration: 3000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: color, 
  }).showToast()
}
