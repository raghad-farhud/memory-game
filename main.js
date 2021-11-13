let gameBlock= document.querySelectorAll('.game-container .img-block');

let btn = document.querySelector('.start-game span').onclick = function(){
    let playerName = prompt('what is your name?');
    if(playerName== null || playerName==""){
        document.querySelector('.info-container .name span').textContent= 'there';
    }else{
        document.querySelector('.info-container .name span').textContent= playerName;
    }

    gameBlock.forEach(el =>{
        el.classList.add('flipped');
        gameContainer.classList.add('stop-click');
    })
    this.parentNode.remove();

    window.setTimeout(() => {
        gameBlock.forEach(el =>{
            el.classList.remove('flipped');
            gameContainer.classList.remove('stop-click');
        })
    }, 2000);
    window.setInterval(playingTime,1000);
}

let during = parseFloat(document.querySelector('#during span').textContent);
function playingTime(){
    return during++;
}

let duration = 1000;
let gameContainer = document.querySelector('.game-container');
let blocks = Array.from(gameContainer.children);
let orderRange = [...Array(blocks.length).keys()]
console.log(orderRange);
shuflle(orderRange);
console.log(orderRange)

blocks.forEach( (block, index)=>{
    block.style.order = orderRange[index]

    block.addEventListener('click', ()=>{
        flippedBlocks(block)
    })

});


function flippedBlocks(block){
    block.classList.add('flipped');
    document.querySelector('#flip-sound').play();

    let filteringFlippedBlocks = blocks.filter(flippedBlocks => flippedBlocks.classList.contains('flipped'));

    if (filteringFlippedBlocks.length === 2){
        stopClicking();

        checkBlock(filteringFlippedBlocks[0], filteringFlippedBlocks[1]);
    }

    let matchingBlocksCount = blocks.filter(flippedBlocks => flippedBlocks.classList.contains('matched'));
    if (matchingBlocksCount.length == blocks.length){
        let winMsg = document.querySelector('#win-msg');
        winMsg.style.display = 'block';
        document.querySelector('.wrong-tries span').innerHTML = document.querySelector('.tries span').innerHTML;
        document.querySelector('.during-time span').innerHTML = during;
        document.querySelector('#big-win-sound').play();

    }
}

document.querySelector('#win-msg span').addEventListener('click' , ()=>{
    location.reload();
})

function checkBlock(first,second){

    let tries = document.querySelector('.tries span');
    if (first.dataset.img == second.dataset.img){

        document.querySelector('#win-sound').play();

        first.classList.remove('flipped');
        second.classList.remove('flipped');
        
        first.classList.add('matched');
        second.classList.add('matched');
    }
    
    else{
        tries.innerHTML = parseInt(tries.innerHTML)+1;
        setTimeout(() => {
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            document.querySelector('#lose-sound').play();
        }, duration);
    }

}

function stopClicking(){
    gameContainer.classList.add('stop-click');
    setTimeout(() => {
        gameContainer.classList.remove('stop-click');
    }, duration);
}
function shuflle(arr){
    let current = arr.length;
    let temp, random;

    while(current>0){
        random = Math.floor(Math.random() * current);
        current -- ;
        temp = arr[current];
        arr[current] = arr[random];
        arr[random]= temp;
    }
    return arr
}
// [0,1,2,3,4,5,6]