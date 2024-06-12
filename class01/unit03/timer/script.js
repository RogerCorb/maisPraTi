let minutes = 0;
let seconds = 0;
let timerInterval;
/*
function startTimer() {
    clearInterval(timerInterval); // Limpa qualquer timer anterior
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer(){

}

function updateTimer() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }
    document.getElementById("minutes").textContent = formatTime(minutes);
    document.getElementById("seconds").textContent = formatTime(seconds);
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

*/

class Cronometro {
    constructor() {
        this.countms = 0;
        this.counterms = null;
    }

    start() {
        if (!this.counterms) {
            this.counterms = setInterval(() => {
                this.countms++;
                const id_label_ms = document.getElementById("count_label_ms");
                const id_label_min = document.getElementById("count_label_min");
                id_label_ms.innerHTML = (this.countms / 100).toFixed(2) + " s";
                if(this.countms / 100 > 60) { 
                    id_label_min.innerHTML = (this.countms /6000) + " m"
                }
            }, 10);
        }
    }

    stop() {
        clearInterval(this.counterms);
        this.counterms = null;
    }

    reset() {
        this.stop();
        this.countms = 0;
        const id_label_ms = document.getElementById("count_label_ms");
        id_label_ms.innerHTML = "00.00 s";
    }
}

// Exemplo de uso:
const cronometro = new Cronometro();
const btnIniciar = document.getElementById('iniciar')
const btnParar = document.getElementById('parar')
const btnZerar = document.getElementById('zerar')

btnIniciar.addEventListener('click',() => { 
    cronometro.start();
})

btnParar.addEventListener('click',() => { 
    cronometro.stop();
})

btnZerar.addEventListener('click',() => { 
    cronometro.reset();
})

