import { useEffect, useState } from "react";

const Playground = ({rand}) => {
    const [wordArray,setWordArray] = useState(new Array(5).fill("").map( () => new Array(5).fill('')));
    const [x, setX] = useState(0);
    const [y,setY] = useState(0);
    const wordlist = ["ZYRIL","NAMER","LYRIC","HOIST","FIVES","TWEAK","FIERY","VANES","GUEST","TAMED","BARED","TAXIS","LEASH","ROOFS","UNBAR","CLOVE","MARCH","FUROR","SWUNG","GENES","SKIES","FABLE","ROYAL","BLEAT","HOMES","RENEW","BOLTS","DRUNK","PRICK","WORRY","GLASS","HOPED","GROWS","BERRY","HAPPY","SMITH","GROVE","ONSET","GLAZE","BEVEL","TREAD","WHIRL","EYING","WACKY","TRUCE","CLEAN","RACER","SPLIT","SABLE","SWEAT","RAINY","LIVED","TRUST","EXACT","SWORE","BLIPS","MIDAS","MAGIC","DUMMY","EXILE","PEAKS","TONED","WAKES","POWER","STIFF","CRISP","BLAME","SWEPT","SAILS","SABLE","SWEAT","RAINY","LIVED","TRUST","EXACT","SWORE","BLIPS","MIDAS","MAGIC","DUMMY","EXILE","PEAKS","TONED","WAKES","POWER","STIFF","CRISP","BLAME","SWEPT","SAILS","MEANT","DRAPE","VOCAL","TRIBE","FLOOD","BLAST","FAXES","PENNY","TRASH","KNOCK","HASTE","VIXEN","LAYER","DUTCH","CURVE","BLOWS","ENJOY","CONES","SNEAK","SINGS","HILLS","PEERS","SABLE","SWEAT","RAINY","LIVED","TRUST","EXACT","SWORE","BLIPS","MIDAS","MAGIC","DUMMY","EXILE","PEAKS","TONED","WAKES","POWER","STIFF","CRISP","BLAME","SWEPT","SAILS","MOTEL","WIPED","BROOM","HONEY","VINES","TAKEN","TODAY","TRIAL","VIBES","BANKS","PICKS","BLIND","REIGN","MINUS","FLASH","REUSE","CLASH","YOUNG","SPRAY","DOVES","NINJA","GAUGE","STILL","CIDER","FABLE","ROYAL","BLEAT","HOMES","RENEW","BOLTS","DRUNK","PRICK","WORRY","GLASS","HOPED","GROWS","BERRY","HAPPY","SMITH","GROVE","ONSET","GLAZE","BEVEL","TREAD","WHIRL","EYING","WACKY","TRUCE","CLEAN","RACER","SPLIT","SABLE","SWEAT","RAINY","LIVED","TRUST","EXACT","SWORE","BLIPS","MIDAS","MAGIC","DUMMY","EXILE","PEAKS","TONED","WAKES","POWER","STIFF","CRISP","BLAME","SWEPT","SAILS","CATCH","ALOFT","WAVED","CRISP","BOUND","SIGNS","EAGLE","CHALK","JUICY","BANDS","MINDS","SNEAK","LIMBS","DRYER","TOADS","POLES","FUDGE","BLAZE"];
    let guessWord = wordlist[rand];
    const EMPTY = "empty", CORRECT = "correct", MISPLACED = "misplaced", WRONG = "wrong";
    const WON = 1, LOST = 0, RUNNING = -1;
    const [colorArray,setColorArray] = useState(new Array(5).fill("").map( () => new Array(5).fill(EMPTY)));
    const [gameState, setGameState] = useState(RUNNING);

    const onKeyPressed = (val) => {
        console.log(val);
        switch(val.toUpperCase()){
            case 'DEL': if(x!==0){
                setX(x-1);
                let tempArray = wordArray.slice();
                tempArray[y][x-1] = '';
                setWordArray(tempArray);
            }
            break;
            case 'ENTER': if(x<5){
                //shake
            }
            else{
                //validate
                let tempArray = colorArray.slice();
                let c = 0;
                for(let i=0;i<5;++i){
                    if(wordArray[y][i]===guessWord[i]){
                        tempArray[y][i] = CORRECT;
                        c++;
                    }
                    else if(guessWord.includes(wordArray[y][i])){
                        tempArray[y][i] = MISPLACED;
                    }
                    else{
                        tempArray[y][i] = WRONG;
                    }
                }
                setColorArray(tempArray);
                setX(0);
                setY(y+1);
                if(c===5){
                    setGameState(WON);
                }
                else if(y===4){
                    setGameState(LOST);
                }
            }
            break;
            default: if(y<5 && x<5){
                let tempArray = wordArray.slice();
                tempArray[y][x] = val.toUpperCase();
                setWordArray(tempArray);
                setX(x+1);
            }
        }
    }

    useEffect( () => {
        function onKeyUp(e) {
            let keypressed = e.key.toUpperCase();
            if(keypressed === "BACKSPACE"){
                onKeyPressed("DEL");
            }
            else if(keypressed === "ENTER"){
                onKeyPressed("ENTER");
            }
            else if(keypressed <= 'Z' && keypressed>='A'){
                onKeyPressed(keypressed);
            }
        }
        window.addEventListener("keyup", onKeyUp);

        return () => {
            window.removeEventListener("keyup", onKeyUp);
        };
    });

    const KeyBoard = () => {
        const keys = [
            ['Q','W','E','R','T','Y','U','I','O','P'],
            ['A','S','D','F','G','H','J','K','L','DEL'],
            ['Z','X','C','V','B','N','M','ENTER']
        ]
        return (
            <div className = "keyboard">
                {
                    keys.map(
                        (rows, index) => (
                                <div className="flex-row" key={index}>
                                    {
                                        rows.map((k) => (<button className="key" onClick = { () => { onKeyPressed(k) } } key={k}>{k}</button>))
                                    }
                                </div>
                            )
                    )
                }
            </div>
        );
    }

    if(gameState===WON){
        return (
            <div className = "playground">
                <div className="letters-container">
                    <h1 className="word-span">YOU WON!</h1>
                </div>
            </div>
        );
    }
    else if(gameState===LOST){
        return (
            <div className = "playground">
                <div className="letters-container">
                    <h1 className="word-span">YOU LOST!</h1>
                    <h5 className="word-span">THE ANSWER IS <b style={{color: "green"}}>{guessWord}</b></h5>
                </div>
            </div>
        );

    }
    else{
        const doBounce = (i, j) => {
            if(j<y || (j===y && i<x) ){
                return " pop";
            }
            else{
                return "";
            }
        }
        return (
            <div className = "playground">
                <div className="letters-container">
                    {
                        wordArray.map(
                            (rows, rindex) => (
                                    <div className="flex-row" key={rindex}>
                                        {
                                            rows.map((k,cindex) => (
                                                <div className = {"letterbox "+colorArray[rindex][cindex]+doBounce(cindex,rindex)} key={cindex}>
                                                    {k}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                        )
                    }
                </div>
                <KeyBoard/>
            </div>
        );
    }
}

export default Playground;