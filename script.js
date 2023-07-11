
const GameBoard = (() => {
    let board = new Array(9);
    let buttons = Array.from(document.querySelectorAll(".item"));
    let resetBtn = document.getElementById("reset");
    let player1 = '';
    let player2 = '';
    let xTurn = true;

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

    const reset = () => {
        buttons.forEach(btn => {
            xTurn = true;
            btn.textContent = '';
            btn.disabled = false;
        });
    }

    resetBtn.addEventListener("click", reset);

    const checkWin = () => {
        winningConditions.forEach(wc => {
            if(wc.every((element) => {
                return (document.querySelector(`[data="${element}"]`).textContent == 'x');
            })){
                console.log(player1 + " won");
                stopGame();
            }

            if(wc.every((element) => {
                return (document.querySelector(`[data="${element}"]`).textContent == 'o');
            })){
                console.log(player2 + " won");
                stopGame();
            }
        });
    }

    const stopGame = () => {
        buttons.forEach(btn => {
            btn.disabled = true;
        })
    }

    const playerOne = (name) => {
        player1 = name;
    }
    const playerTwo = (name) => {
        player2 = name;
    }

    return{
        playerOne,
        playerTwo
    };

});

let n =  GameBoard();
n.playerOne('Steve');
n.playerTwo('Jason');