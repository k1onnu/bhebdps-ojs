let dead = 0;
let lost = 0;

const deadCounter = document.getElementById('dead');
const lostCounter = document.getElementById('lost');

function resetGame() {
    dead = 0;
    lost = 0;

    deadCounter.textContent = dead;
    lostCounter.textContent = lost;
}

function checkGameOver() {
    if (dead === 10) {
        alert('Вы победили!');
        resetGame();
        return true;
    } else if (lost === 5) {
        alert('Вы проиграли!');
        resetGame();
        return true;
    } else {
        return false;
    }
}

for (let i = 1; i <= 9; i++) {
    const hole = document.getElementById(`hole${i}`);
    
    if (hole) {
        hole.onclick = function() {
            if (this.classList.contains('hole_has-mole')) {
                dead++;
                deadCounter.textContent = dead;
            } else {
                lost++;
                lostCounter.textContent = lost;
            }
            
            checkGameOver();
        };
    }
}