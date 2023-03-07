let ataqueDigimonJugador
let ataqueDigimonEnemigo
let vidasJugador = 3;
let vidasEnemigo = 3;


function iniciarJuego(){
    let seleccionarAtaque = document.getElementById('seleccionar-ataque');
    seleccionarAtaque.style.display = 'none';
    let bntReiniciar = document.getElementById('reiniciar');
    bntReiniciar.style.display = 'none';
    
    let btnSeleccionarDigimonJugador = document.getElementById('btn-digimon');
        btnSeleccionarDigimonJugador.addEventListener('click', 
        seleccionarDigimonJugador); //escuchamos sus eventos
    
    //variables para los botones de ataque, lo hacemos en esta funcion por que la logica es similar al boton de seleccionar digimon del jugador.
    let btnFire = document.getElementById('btn-fire');
    btnFire.addEventListener('click', ataqueDigimonFire);
    let btnWater = document.getElementById('btn-water');
    btnWater.addEventListener('click', ataqueDigimonWater);
    let btnEarth = document.getElementById('btn-earth');
    btnEarth.addEventListener('click', ataqueDigimonEarth);

    //misma logica pero para el boton de reiniciar
    let btnReiniciar = document.getElementById('btn-reiniciar');
    btnReiniciar.addEventListener('click', reiniciarJuego);
}

//Eligiendo al digimon del jugador 
function seleccionarDigimonJugador(){
    let seleccionarDigimon = document.getElementById('seleccionar-digimon');
    seleccionarDigimon.style.display = 'none';
    
    let seleccionarAtaque = document.getElementById('seleccionar-ataque');
    seleccionarAtaque.style.display = 'flex';

    let inputDigimonEmymon = document.getElementById('emymon');
    let inputDigimonShangamon = document.getElementById('shangamon');
    let inputDigimonViramon = document.getElementById('viramon');
    
    let spanDigimonJugador = document.getElementById('digimon-jugador');

    if(inputDigimonEmymon.checked){
        spanDigimonJugador.innerHTML = 'EMYMON';//metodo para manipular el DOM
        seleccionarDigimonEnemigo()
    } else if(inputDigimonShangamon.checked){
        spanDigimonJugador.innerHTML = 'SHANGAMON';
        seleccionarDigimonEnemigo()
    }else if(inputDigimonViramon.checked){
        spanDigimonJugador.innerHTML = 'VIRAMON';
        seleccionarDigimonEnemigo()
    }else{
        alert('Ups!❌ Debes seleccionar a un Monstruo.');
        reiniciarJuego();/*si no selecciono mascota einicia la pagina*/
    }
    

    
    
    /* 
    Con alert
    Pripiedad checked 
    Me ayuda a revisar en cada uno de los inputs si esta seleccionado o no con valores de true (seleccionado), false (no seleccionado). 
    */

    /*
    if(inputDigimonEmymon.checked){//si el input con id emymon esta con el valor de true por la propiedad checked entra en el flujo.
        alert('Tu Digimon es Emymon');
    } else if(inputDigimonShangamon.checked){
        alert('Tu Digimon es Shangamon');
    }else if(inputDigimonViramon.checked){
        alert('Tu Digimon es Viramon');
    }else{
        alert('Ups!❌ Debes seleccionar a un Digimon.')
    }
     */
}

//Eligiendo al digimon del enemigo con aleatoriedad
function seleccionarDigimonEnemigo(){
    let digimonAleatorioEnemigo = aleatoriedad(1, 3);
    let spanDigimonEnemigo = document.getElementById('digimon-enemigo');

    if(digimonAleatorioEnemigo == 1){
        spanDigimonEnemigo.innerHTML = 'EMYMON';
    } else if(digimonAleatorioEnemigo == 2){
        spanDigimonEnemigo.innerHTML = 'SHANGAMON';
    }else{
        spanDigimonEnemigo.innerHTML = 'VIRAMON';
    }
    desabilitarBotonSelecionarDigimon();
}

function ataqueDigimonFire(){
    ataqueDigimonJugador = 'FUEGO'
    ataqueEnemigoAleatorio()
}

function ataqueDigimonWater(){
    ataqueDigimonJugador = 'AGUA'
    ataqueEnemigoAleatorio()
}

function ataqueDigimonEarth(){
    ataqueDigimonJugador = 'TIERRA'
    ataqueEnemigoAleatorio()
}

function ataqueEnemigoAleatorio(){
    let ataqueAleatorioEnemigo = aleatoriedad(1, 3);

    if(ataqueAleatorioEnemigo == 1){
        ataqueDigimonEnemigo = 'FUEGO';
    }else if(ataqueAleatorioEnemigo == 2){
        ataqueDigimonEnemigo = 'AGUA';
    }else{
        ataqueDigimonEnemigo = 'TIERRA';
    }

    batallaFinal()
}

function crearMensajes(resultado){    
    let sectionMensajes = document.getElementById('resultado');
    let ataquesJugador = document.getElementById('ataques-jugador');
    let ataquesEnemigo = document.getElementById('ataques-enemigo');
    
    let nuevoAtaqueJugador = document.createElement('p');
    let nuevoAtaqueEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueJugador.innerHTML = ataqueDigimonJugador;
    nuevoAtaqueEnemigo.innerHTML = ataqueDigimonEnemigo;

    ataquesJugador.appendChild(nuevoAtaqueJugador);
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo);
}

function batallaFinal(){
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if(ataqueDigimonJugador == ataqueDigimonEnemigo){
        crearMensajes('EMPATE 🙌');
    }else if((ataqueDigimonJugador == 'AGUA' && ataqueDigimonEnemigo == 'FUEGO') || (ataqueDigimonJugador == 'TIERRA' && ataqueDigimonEnemigo == 'AGUA') || (ataqueDigimonJugador == 'FUEGO' && ataqueDigimonEnemigo == 'TIERRA')){
        crearMensajes('GANASTE 😎');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    }else{
        crearMensajes('PERDISTE 😭');
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }

    //revisar si las vidas llegan a 0 mostrar quien gano el juego.
    revisarVidas();
}

function mostrarGanador(resultadoFinal){    
    let sectionMensajes = document.getElementById('resultado');
    
    sectionMensajes.innerHTML = resultadoFinal;
    
    let bntReiniciar = document.getElementById('reiniciar');
    bntReiniciar.style.display = 'block';
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        mostrarGanador('Eres un crack! 👌 El Monstruo del jugador gana la Partida! 😉');
        desabilitarBotones();
    }else if(vidasJugador == 0){
        mostrarGanador('Ups! ❌El Monstruo del jugador Pierde 😭');
        desabilitarBotones();
    }
}

function desabilitarBotones(){
    //desabilitando los botones cuando lleguen las vidas a 0
    let btnFire = document.getElementById('btn-fire');
    btnFire.disabled = true;
    let btnWater = document.getElementById('btn-water');
    btnWater.disabled = true;
    let btnEarth = document.getElementById('btn-earth');
    btnEarth.disabled = true;
}

function desabilitarBotonSelecionarDigimon(){
    //desabilitar el boton despues de elegir al digimon
    let btnSeleccionarDigimonJugador = document.getElementById('btn-digimon');
    btnSeleccionarDigimonJugador.disabled = true;
}

function aleatoriedad(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function reiniciarJuego(){
    window.location.reload();
}
iniciarJuego()




