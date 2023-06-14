// 2C = Two of clubs
// 2D = Two od diaminds
// 2H = Two of Hearts
// 2S = Two of spades

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;


//Refrencias HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');


let puntosHtml = document.querySelectorAll('small');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');


//FUNCION PARA CREAR UNA NUEVA DECK
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }  
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }  
    
    deck = _.shuffle(deck);

    //console.log(deck);

    return deck;
}

crearDeck();

const pedirCarta = () => {
    
    if( deck.length === 0){
        throw 'No hay Cartas en el Deck'
    }
    return deck.pop();
}


const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN( valor ) ) ?
            ( valor === 'A') ? 11 : 10
        : valor * 1;

}

const valor = valorCarta(pedirCarta());

//Turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {


        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );

        puntosHtml[1].innerText = puntosComputadora;

        // <img src="assets/cartas/cartas/10H.png" class="carta" alt=""></img>0

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );      
        
        if( puntosMinimos > 21 ){
            break;
        }

    } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 )) ;

        setTimeout(() => {

        if ( (puntosComputadora === puntosMinimos) ){
            alert('Nadie Gana');
        } else if ( puntosMinimos > 21){
            alert(' Computadora Gana');
        } else if ( puntosComputadora > 21){
            alert ( 'Jugador gana');
        }else{
            alert ('Computadora Gana');
        }
    }, 10);

}






//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );

    puntosHtml[0].innerText = puntosJugador;

    // <img src="assets/cartas/cartas/10H.png" class="carta" alt=""></img>0

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
        
    } else if (puntosJugador === 21){
        console.warn('Ganaste');
        turnoComputadora( puntosJugador );
        
    }
});

btnDetener.addEventListener( 'click' , () => {
    
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora( puntosJugador );
});

btnNuevo.addEventListener( 'click', () =>{

    deck = [];

    deck = crearDeck();

    puntosComputadora = 0;
    puntosJugador = 0;
    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText  = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnDetener.disabled = false;
    btnPedir.disabled = false;

    
});





























 