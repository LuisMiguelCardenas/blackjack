const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K']

    let puntosJugadores = [];
    // Referencias

    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small')
          
  

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        puntosJugadores = [];
        for (let i = 0; i<numJugadores; i++){
            puntosJugadores.push(0)
        }

        puntosHTML.forEach( element => element.innerText = 0)
        divCartasJugadores.forEach( element => element.innerHTML = '')

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Esta funcion crea una nueva bajara
    const crearDeck = () => {
        deck = [];
        for( let i = 2; i<= 10; i++) {
            for (const tipo of tipos) {
                deck.push( i + tipo);
            };
        };
        for (const tipo of tipos) {
            for (const especial of especiales) {
                deck.push( especial + tipo)
            };
        };
        
        return _.shuffle (deck);
    };

    // Esta funcion me permite tomar una carta

    const pedirCarta = () => {
        if(deck.length === 0){
            throw 'No hay cartas en el deck'
        }
        return deck.pop()
    };

    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length -1 );
        isNaN( valor ) ? 
            (valor = ( valor === 'A') ? 11 : 10 ) 
            : valor = parseInt(valor);    
        return valor
    }

    // Turno 0 jugador y el último la computadora
    const acumlarPuntos = (carta, turno) =>  {
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta )
            puntosHTML[turno].innerText =puntosJugadores[turno];
            return puntosJugadores[turno]
    }


    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta)
    }

    const determinarGanador = () => {
        const [ puntosMinimos, puntosComputadora] = puntosJugadores
        
        setTimeout(() => {    
    
            if( puntosComputadora === puntosMinimos){
                alert('Empate');
            }else if ( puntosMinimos > 21 ) {
                alert('Computadora gana');
            }else if( puntosComputadora >21 ){
                alert('Victoria')
            }else {
                alert('computadora gana')
            }
        }, 100);
    }
    // tuno de la computadora

    const turnoComputadora = ( puntosMinimos ) => {
        
        let puntosComputadora = 0;
        
        do {
            const carta = pedirCarta();  
            puntosComputadora = acumlarPuntos(carta, puntosJugadores.length -1)
            
            crearCarta(carta, puntosJugadores.length - 1)
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);
            if (puntosMinimos > 21){
                break;
            }
            
        } while ( (puntosComputadora < puntosMinimos) && puntosMinimos <=21  );
        
        determinarGanador();

        
    }


    //Eventos

    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();  
        const puntosJugador = acumlarPuntos(carta, 0)

        crearCarta(carta, 0)


        if ( puntosJugador >21 ){
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if ( puntosJugador === 21) {
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        }

    })

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugadores[0]);
    })

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();

    })

    return {
         nuevoJuego: inicializarJuego
    };
})()


