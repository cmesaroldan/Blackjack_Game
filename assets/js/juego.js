(() => {

    'use strict'

    let deck = [];

    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0;
    // let puntosComputadora = 0;

    let puntosJugadores = [];




    //Refrencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');


    const puntosHtml = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');

    const inicializarJuego = ( numJugadores = 2) =>{

        deck = crearDeck();

        for ( let i = 0; i < numJugadores; i++ ){

            puntosJugadores.push(0);

        }

        
        puntosHtml.forEach( elem =>elem.innerText = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '');


         btnDetener.disabled = false;
         btnPedir.disabled = false;

        
        
    }

    //FUNCION PARA CREAR UNA NUEVA DECK
    const crearDeck = () => {

        deck = [];

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
        
        return _.shuffle(deck);
    }


    const pedirCarta = () => {
        
        if( deck.length === 0){
            throw 'No hay Cartas en el Deck'
        }
        return deck.pop();
    }


    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        
        return (isNaN( valor ) ) ?
                ( valor === 'A') ? 11 : 10
            : valor * 1;

    }
    //Turno: 0 = primer jugador
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[ turno ] + valorCarta( carta );
        puntosHtml[turno].innerText = puntosJugadores[turno];
        
        return puntosJugadores[turno];

    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append ( imgCarta );
        //divCartasComputadora.append( imgCarta ); 
    }

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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

    //Turno de la computadora

    const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
        do {

            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length -1 );

            crearCarta( carta, puntosJugadores.length -1 );


        } while ( (puntosComputadora < puntosMinimos) && ( puntosMinimos <= 21 )) ;

        determinarGanador();

    }


    //Eventos

    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos ( carta, 0);

        crearCarta( carta, 0);


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

        
        inicializarJuego();

        
    });

}) ();

































 