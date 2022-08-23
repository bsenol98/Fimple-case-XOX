window.addEventListener('DOMContentLoaded', () => {
    const winningConditions = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["1", "4", "7"],
        ["2", "5", "8"],
        ["3", "6", "9"],
        ["1", "5", "9"],
        ["3", "5", "7"],
    ];

    let gameStatus = true;
    let playerType = false;
    const playerOneOption = [];
    const playerTwoOption = [];

    document.querySelectorAll(".box")
        .forEach(input => input.addEventListener('click', () => {
            if (gameStatus) {
                const key = input.getAttribute("key");
                input.setAttribute("disabled", true);
                input.innerHTML = playerType ? "O" : "X";

                playerType = !playerType;
                document.getElementById("gameMsg").innerHTML = playerType ?
                    "Player O's Turn" :
                    "Player X's Turn";
                if (playerType) {
                    playerOneOption.push(key);
                    IsWin(playerOneOption);
                } else {
                    playerTwoOption.push(key);
                    IsWin(playerTwoOption);
                }
            }
        }));

    function IsWin(options) {
        let check = 0;
        winningConditions.forEach(condition => {
            const filteredArray = options.filter(secenek => condition.includes(secenek));
            check = filteredArray.length > check ? filteredArray.length : check;
        });
        if (check == 3) {
            document.getElementById("gameMsg").innerHTML = `${playerType ? "PLAYER X" : "PLAYER O"} WON!`;
            gameStatus = false;
            document.querySelectorAll(".box")
                .forEach(box => box.setAttribute("disabled", true));
        } else if (playerOneOption.length == 5) {
            document.getElementById("gameMsg").innerHTML = `No One Win!`;
        }
    }

    document.getElementById("btn-reset").addEventListener("click", () => {
        document.querySelectorAll(".box").forEach(box => {
            box.innerHTML = "";
            box.removeAttribute("disabled");
        });
        document.getElementById("gameMsg").innerHTML = "Player X's Turn";
        playerOneOption.splice(0);
        playerTwoOption.splice(0);
        gameStatus = true;
        playerType = false;
    })
});