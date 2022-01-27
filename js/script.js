let control = document.getElementById("control");
let inp = document.getElementById("input");
let yourName = document.querySelector(".info-container .name span")
let controlButton = document.querySelector(".control-buttons")

control.addEventListener("click" , function(){
    if(inp.value == null || inp.value == "") 
    {
        yourName.innerHTML = "unknown";
    }
    else
    {
        yourName.innerHTML = inp.value;
        inp.value = "";
    }

    controlButton.remove();
})

let duration = 1000;

let blocksMemory = document.querySelector(".container");
let blocks = Array.from(blocksMemory.children);
let orderRange = [ ...Array(blocks.length).keys()] // keys => indexes 0 :19
// console.log(orderRange)
shuffleOreder(orderRange)
// console.log(orderRange)

// Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
// Add CSS Order Property
block.style.order = orderRange[index];

//add flipped
block.addEventListener("click" , function(){

    isFlipped(block);

})
});


// shuffle function
function shuffleOreder(array)
{
    let currenIndex = array.length, 
        temp,
        randomIndex;
    while(currenIndex > 0)
    {
        randomIndex = Math.floor(Math.random() *currenIndex) // رقم عشوائي
        currenIndex--;
        // swap
        temp = array[currenIndex];
        array[currenIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    // get randomIndex in temproral variable
    return array;
}

function isFlipped(selected)
{
    // add class flipped
    selected.classList.add("isFlipped");

    // filter
    let flippedBlocks =  blocks.filter(flipped => flipped.classList.contains("isFlipped"));
    if(flippedBlocks.length === 2)
    {
        console.log("flippedBlocks")
        //stop clicking function
        clicking();
        //check matching function
        checkMatchedBlocks(flippedBlocks[0], flippedBlocks[1])
    }
}

function clicking()
{
    //add class noClicking
    blocksMemory.classList.add("noClicking");

    setTimeout(()=>
    {
    blocksMemory.classList.remove("noClicking");
    },duration)
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.technology  === secondBlock.dataset.technology)
    {
        //noMatching
        firstBlock.classList.remove("isFlipped");
        secondBlock.classList.remove("isFlipped");
        firstBlock.classList.add("noMatching");
        secondBlock.classList.add("noMatching");
    }
    else
    {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1
        setTimeout(()=>
        {
            firstBlock.classList.remove("isFlipped");
            secondBlock.classList.remove("isFlipped");
        },duration)
    }
}  

// Current Array [9, 2, 10, 4, 5, 6, 7, 3, 1, 8]
/*
[1] Save Current Element in Stash
[2] Current Element = Random Element
[3] Random Element = Get Element From Stash
*/