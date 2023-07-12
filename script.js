const GameBoard = (() => {
    let board = new Array(9);
    let buttons = Array.from(document.querySelectorAll(".item"));
    let resetBtns = document.querySelectorAll(".reset");
    const popupContainer = document.getElementById("popup-container")
    let popupMsg = document.querySelector(".popup");
    let player1 = '';
    let player2 = '';
    let xTurn = true;

    const setPlayerOne = (name) => {
        player1 = name;
    }

    const setPlayerTwo = (name) => {
        player2 = name;
    }

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWin = () => {
        winningConditions.forEach(wc => {
            if(wc.every((element) => {
                return (document.querySelector(`[data="${element}"]`).textContent == 'x');
            })){
                popupMsg.textContent = player1 + " won";
                popupContainer.style.display = "flex";
                stopGame();
            }

            if(wc.every((element) => {
                return (document.querySelector(`[data="${element}"]`).textContent == 'o');
            })){
                popupMsg.textContent = player2 + " won";
                popupContainer.style.display = "flex";
                stopGame();
            }
        });
    }



    const startGame = () => {
        buttons.forEach(btn => {
            btn.addEventListener("click", function() {
                if(xTurn){
                    btn.textContent = "x";
                    btn.disabled = true;
                }else{
                    btn.textContent = "o";
                    btn.disabled = true;
                }
                xTurn = !xTurn;
                checkWin();
            });
        });

        resetBtns.forEach(btn => {
            btn.addEventListener("click", reset);
        });
        
    }

    const reset = () => {
        buttons.forEach(btn => {
            xTurn = true;
            btn.textContent = '';
            btn.disabled = false;
        });

        popupContainer.style.display = "none";
    }

    const stopGame = () => {
        buttons.forEach(btn => {
            btn.disabled = true;
        })
    }

    return{
        setPlayerOne,
        setPlayerTwo,
        startGame
    };

})();

const displayController = ((gb) => {
    let form = document.getElementById("start-form");
    let formButton = document.querySelector("[type='submit']");
    let player1 = document.getElementById("player1");
    let player2 = document.getElementById("player2");
    let content = document.querySelector(".content");

    form.addEventListener("submit", function (e){
        e.preventDefault();
        gb.setPlayerOne(player1.value);
        gb.setPlayerTwo(player2.value);
        form.style.display = "none";
        content.style.display = "flex";
    });
});



let n =  GameBoard;
displayController(n);
n.startGame();