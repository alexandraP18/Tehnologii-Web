// in folder-ul test, fisierul rle-decomp.test.js, la aceste linii:
// it("returns correct value for string 3A2B1C4D", function () {
//         const result = textProcessor("rle", false, "AAABBCDDDD");
//         assert.strictEqual(result, "AAABBCDDDD");
//     });
// exista o eroare. Deoarece noi dorim sa facem decompress, input-ul ar fi trebuit sa fie 
// cel de la care obtinem noi rezultatul "AAABBCDDDD", si anume "3A2B1C4D", insa acesta nu este cazul.
// testul nu va functiona in acest context, decat daca in fisier, va fi modificata acea linie. 
// daca este modificata, testul ruleaza perfect.

class InvalidType extends Error{
    constructor(message="InvalidType"){
        super(message);
        this.name = "InvalidType";
    }
}



class InvalidInput extends Error{
    constructor(message="InvalidInput"){
        super(message);
        this.name = "InvalidInput";
    }
}

function rleCompress(input){
    if(!/^[a-zA-Z]+$/.test(input) && input.length > 0){
        throw new InvalidInput();
    }

    let result = "";
    let count = 1;

    for(let i = 1; i <= input.length; i++){
        if(input[i] == input[i-1]){
            count++;
        }else{
            result += count + input[i-1];
            count = 1;
        }
    }

    return result;

}

function rleDecompress(input) {
    if (!/^[0-9A-Za-z]+$/.test(input) && input.length > 0) {
        throw new InvalidInput();
    }

    let result = "";
    let stringCount = "";

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (char >= "0" && char <= "9") {
            stringCount += char;
        } else {
            if (stringCount === "") {
                throw new InvalidInput();
            }

            let count = parseInt(stringCount, 10);
            result += char.repeat(count);

            stringCount = "";
        }
    }

    return result;
}


function caesarCrypt(input, shift){
    let result ="";

    for(let i = 0; i< input.length; i++){
        const char = input[i];
        if(char ===" "){
            result += " ";
            continue;
        }

        const base = char === char.toUpperCase() ? 65 : 97;
        const code = char.charCodeAt(0) - base;
        const shifted = (code + shift) % 26;

        result += String.fromCharCode(base + shifted);
    }
    return result;
}

function caesarDecrypt(input, shift){
    return caesarCrypt(input, 26-(shift%26));
}

const textProcessor = (algo, operation, input, options) => {
    
    if(typeof input !=="string"){
        throw new InvalidType();
    }
    if(typeof operation !== "boolean"){
        return new InvalidType();
    }

    if(input.length === 0){
            return "";
    }

    if(algo !== 'caesar' && algo !== 'rle'){
        throw new InvalidInput();
    }else if(algo === 'caesar'){
        if(typeof input !== 'string'){
            throw new InvalidInput();
        }
        
        if(!/^[a-zA-Z\s]+$/.test(input)){
            throw new InvalidInput();
        }   

        if(!options || typeof options.shift !== 'number' || options.shift < 0){
            throw new InvalidInput();
        }

        if(operation === true){
            return caesarCrypt(input, options.shift);
        }else{
            return caesarDecrypt(input, options.shift);
        }
       
    }else if(algo === "rle"){
        if(operation === true){
             if(!/^[a-zA-Z\s]+$/.test(input)){
                throw new InvalidInput();
            }
            return rleCompress(input);
        }else{
            if(!/^[0-9a-zA-Z]+$/.test(input)){
                throw new InvalidInput();
            }    
                return rleDecompress(input);
        }
    }
    
    return "result";
}

module.exports = {
    textProcessor
}
