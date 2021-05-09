// Letras ó caracteres que seran reconocidos en la encryptacion
const letras = '0123456789abcdefghijklmnñopqrstuvwxyzáéíóúABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ*/-+#.$%&()¿?¡!@,:;_´`<>{}[]*|°¬~`^ ';

// Encripta la contraseña
const enc =(clave, mensaje) => {
    let c = 0;
    let nl = [];
    let nm = ''
    mensaje = mensaje.split('').reverse().join('');
    for (const [index, element] of mensaje.split('').entries()) {
      if (c == clave.length-1){
        c = 0;
      }
      let im = letras.indexOf(element);
      let ic = letras.indexOf(clave[c]);
      let inl = im +ic;
      if (inl > letras.length-1){
        temp = inl - letras.length;
        nm += letras[temp];
      }
      else{
        nm += letras[inl];
      }
      c++;
    }
    return nm.split('').reverse().join('');
}

// Desencripta la contraseña
const deCrypt = (clave, mensaje) => {
    let c = 0;
    let dc = '';
    let d = '';
    mensaje = mensaje.split('').reverse().join('');
    for (const [index, element]  of mensaje.split('').entries()) {
      if (c == clave.length-1){
        c = 0;
      }
      d = letras.indexOf(element) - letras.indexOf(clave[c]);
      if (d.length > 0){
        d = d + letras.length;
      }
      dc += letras[d];
      c++;
    }
    return dc.split('').reverse().join('');
}
  
// Encripta la clave de inicio de sesion a la app
const encPass = (pass) => {
    return enc(pass, pass).split('').reverse().join('');
}

module.exports = {enc, deCrypt, encPass, letras};