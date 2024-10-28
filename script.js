const boxes = document.querySelectorAll(".box");
const winnerText = document.querySelector('.winner');
const resetBtn = document.querySelector('.reset');
const newGameBtn = document.querySelector('.newGame');

let curtPlayerX = true;
const winningPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]

boxes.forEach((box)=>{
    box.addEventListener("click",(e)=>{
            if(curtPlayerX){
                box.innerHTML = `<i class="fa-solid fa-xmark" style="color: #ff6500;"></i>`;
                curtPlayerX = false;
            }else{
                box.innerHTML = '<i class="fa-solid fa-o" style="color: #000;"></i>';
                curtPlayerX = true;
            }
            box.disabled = true;
            checkWinner(e)
    })
})


const resetGame = ()=>{
    boxes.forEach((box)=>{
        box.innerHTML = '';
        box.disabled = false;
    })
    winnerText.style.opacity = '0';
}
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener('click',resetGame);

const disebledBtn = ()=>{   
    boxes.forEach((box)=>{
        box.disabled = true;
    })
}

const checkWinner = ()=>{
    let isFull = true;
    for(let pattern of winningPatterns){
        let postition1 = boxes[pattern[0]].innerHTML;
        let postition2 = boxes[pattern[1]].innerHTML;
        let postition3 = boxes[pattern[2]].innerHTML;

       if((postition1 !== '' && postition2 !== '' && postition3 !== '') && (postition1 === postition2 && postition2 === postition3)){
         if(curtPlayerX === false){
            winnerText.innerHTML = 'Player X wins the game!';
        }else{
            winnerText.innerHTML = 'Player O wins the game!';
        }
        disebledBtn();
        winnerText.style.opacity = '1';
        return;
       }
    }

    boxes.forEach((box) => {
        if (box.innerHTML === '') {
            isFull = false;
        }
    });

    if (isFull) {
        winnerText.innerHTML = "It's a tie!";
        winnerText.style.opacity = '1';
        disebledBtn();
    }
}