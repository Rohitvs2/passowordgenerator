const inputslider=document.querySelector("[datalengthslider]");
const lengthnumber=document.querySelector("[datalengthnumber]");
const passowrddisplay=document.querySelector("[passowrddisplay]");
const datacopymsg=document.querySelector("[datacopymsg]");
const dataindicator=document.querySelector("[dataindicator]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const characters=document.querySelector("#characters");
const generatebtn=document.querySelector(".generatebutton");
const strength=document.querySelector(".strength");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const symbols = "~!@#$%^&*()_+`-={}|[]::\"'<>,.?/;";
const copybtn=document.querySelector("#copyicon")

let passowrd="";
let passowrdlength=10;
let checkcount=0;
handleslider();
 


function handleslider(){
    inputslider.value=passowrdlength;
    lengthnumber.innerText=passowrdlength;


}
function lengthsldier(){

    passowrdlength=inputslider.value;
    lengthnumber.innerText=passowrdlength;
}
inputslider.addEventListener('input', lengthsldier);




function setIndicator(color){
    dataindicator.style.backgroundColor=color;


}
function getrandominteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
function getrandomnumber(){
    return getrandominteger(0,9);
}

function generatelowercase(){
        return String.fromCharCode(getrandominteger(97,123));
}


function generateuppercase(){
    return String.fromCharCode(getrandominteger(65,91));
}

function generatesymbol(){
    const randnum=getrandominteger(0,symbols.length);
    return symbols.charAt(randnum);
}
function shufflepassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        // find out random j
        const j = Math.floor(Math.random() * (i + 1));
        // swap 2 numbers
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}

function calcstrength(){
    let hasupper=false;
    let haslower=false;
    let hasnum=false;
    let hassym=false;
    if(uppercase.checked) hasupper=true;
    if(lowercase.checked) haslower=true;
    if(numbers.checked) hasnum=true;
    if(characters.checkd) hassym=true;

    if(hasupper && haslower && (hasnum  || hassym) && passowrdlength >=8 )
    {
        setIndicator("0f0");
        }
        else if ((hasupper || haslower) && (hasnum || hassym) && passwordlength >= 6) {
            setIndicator("ff0"); // Yellow - moderate password
        }

        else {
            setIndicator("f00"); // Red - very weak password
        }
}

async function copycontent(){
    try{
        await navigator.clipboard.writeText(passowrddisplay.value);
        datacopymsg.innerText="copied";
        
    }
    catch(e){
        datacopymsg.innerText="failed";
    }

    datacopymsg.classList.add("active");
    
    setTimeout(() =>{
        datacopymsg.classList.remove("active");
    },2000);


}

copybtn.addEventListener('click',() =>{
    if(passowrddisplay.value)
        copycontent(); 
})


function handlecheckboxchange(){
    checkcount=0;
    allcheckbox.forEach( (checkbox) => {
        if(checkbox.checked)
            checkcount++;

    });
    if(checkcount>passowrdlength){
        passowrdlength=checkcount;
        handleslider(); 
    }

}
allcheckbox.forEach( (checkbox) =>{
    checkbox.addEventListener('change',handlecheckboxchange);
}
)
  
generatebtn.addEventListener('click',()=>{
    if(checkcount==0)
        return;
    if(passowrdlength<checkcount){
        passowrdlength=checkcount;
        handleslider();
    }
    

    //remove old passowrd
    passowrd="";
    
    //checkboxes stuff mentioned
    /* if(uppercase.checked){
        passowrd+=generateuppercase();
    }
    if(lowercase.checked){
        passowrd+=generatelowercase();

    }
    if(numbers.cheked){
        passowrd+=getrandomnumber();
    }
    if(characters.checked){
        passowrd+=generatesymbol();
    }
     */
    
    let funcarr=[]
    if(uppercase.checked){
        funcarr.push(generateuppercase);

    }
    if(lowercase.checked){
        funcarr.push(generatelowercase);
         
    }
    if(numbers.checked){
        funcarr.push(getrandomnumber);
         
    }
    if(characters.checked){
        funcarr.push(generatesymbol);

    }

    for(i=0;i<funcarr.length;i++){
        passowrd +=funcarr[i]();
    }
    console.log("compulsory done ")




   
    

    for(let i=0; i < (passowrdlength - funcarr.length); i++){
        let randomIndex = getrandominteger(0, funcarr.length-1);
        passowrd += funcarr[randomIndex]();
    }
    console.log("remaining done")



    //shuffle passowrd


passowrd=shufflepassword(Array.from(passowrd));
console.log("shuffling done")

passowrddisplay.value=passowrd;
console.log("ui done")


}




)
