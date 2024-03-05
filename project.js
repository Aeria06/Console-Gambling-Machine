//this is the first step where we are getting the user to input what deposit he wants to make

const prompt=require("prompt-sync")();

const ROWS= 3;
const COLS=3;

const SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}
//multiplier of the bet
const SYMBOL_VALUES={
    A:5,
    B:4,
    C:3,
    D:2


}


const deposit=()=>{
    while(true)
{    const depositAmount=prompt("enter a deposit amount : ")
    const numberDepositAmount= parseFloat(depositAmount);
    if (isNaN(numberDepositAmount)|| numberDepositAmount<=0){
        console.log("Invalid deposit amount, Try again!");
    } else{
        return numberDepositAmount;
    }

}
};

//this step is the to get input of the number of lines user wants to bet on

const getNumberOfLines=()=>{
    while (true){ 
    const lines=prompt("enter the number of lines to bet on (1-3) : ")
    const numberOfLines= parseFloat(lines);
    if (isNaN(numberOfLines)|| numberOfLines<=0||numberOfLines>3){
        console.log("Invalid number of lines, Try again!");
    } else{
        return numberOfLines;
    }

}
}

const getBet=(balance,lines)=>{
    while (true){ 
        const bet=prompt("enter the total bet per line: ")
        const numberBet= parseFloat(bet);
        if (isNaN(numberBet)||numberBet<=0|| numberBet>balance / lines){
            console.log("Invalid Bet, Try again!");
        } else{
            return numberBet;
        }
    
    }

}

const spin=()=>{
    const symbols=[];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
    for(let i =0;i<count;i++){
        symbols.push(symbol);

    }
    }
    const reels=[];
    for (let i =0 ; i<COLS;i++ ){
        reels.push([])
        const reelSymbols=[...symbols];
        //... is known as spread operator in js and used to make shallow copies of js objects
        //we are maiking another list because we dont want to eliminate symbols from orignal list since we need thosed symbols for the other columns
        for (let j =0;j<ROWS;j++){
            const randomIndex=Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol=reelSymbols[randomIndex];
            //we selected one random position symbol from our copied array
            reels[i].push(selectedSymbol);
            //pushing it in first column as we increment i value we will go to column 2
            reelSymbols.splice(randomIndex,1);
            //splice is a method of array that changes the content of an array by removing or replaciong exosting element or by adding new elements in the place 
            //syntax of splice is splice(start , deleteCount , item1 , item2...) these items will be the one replacing the exiting elements at that particular index
        }
    

    }
    return reels;
}

//our information is in form of colums rn 
// we need to transpose the matrix

const transpose=(reels)=>{
    const rows =[];
    for (let i=0 ; i<ROWS;i++){
        rows.push([]);
        for(let j=0; j<COLS ; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows

}
//really weird block of code but kinda makes sense

const printRows=(rows)=>{
    for (const row of rows){
        let rowString=""
        for (const [i , symbol ] of row.entries()){
            rowString+=symbol
            //we dnt want A|B|C| 
            if (i!=row.length-1){
                rowString+=" | "
            }
            

        }
        console.log(rowString)
    }
}

const getWinnings=(rows , bet, lines)=>{
    let winning=0;
    for (let row=0; row<lines ; row++){
        const symbols=rows[row];
        let allSame=true;
        console.log(symbols)

        const allRowsSame=symbols.every(value=>value===symbols[0]);
        if (allRowsSame){
            winning +=bet*SYMBOL_VALUES[symbols[0]]
        }
        
    }
    return winning;
};

const game=()=>{
    let balance =deposit();
    while (true){
        console.log("You have a balance of $", balance)
        const numberOfLines=getNumberOfLines();
        const bet=getBet(balance, numberOfLines);
        balance-=bet*numberOfLines;
        const reel =spin();
        const rows=transpose(reel);
        printRows(rows);
        const winnings= getWinnings(rows , bet , numberOfLines);
        balance+=winnings;
        console.log("COngratulations! You won , $" + winnings.toString());

        if (balance<=0){
            console.log("You ran out of money");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");
        if(playAgain!="y")break;

    }
};
game();














