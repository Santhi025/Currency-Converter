const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg=document.querySelector(".msg");
const loader=document.querySelector(".loadcontainer");
for(select of dropdowns){
    for(curCode in countryList){
    let newOption=document.createElement("option");
    newOption.innerText=curCode;
    newOption.value=curCode;
    if(select.name==="from"&&curCode==="USD"){
        newOption.selected="selected";
    }
    else if(select.name==="to"&&curCode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);

}
select.addEventListener("change",(event)=>{
updateFlag(event.target);
});
}
const updateFlag=(element)=>{
    let curCode=element.value;
   let countryCode=countryList[curCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    msg.style.display = "none";     
    loader.style.display = "flex"; 

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if (amtVal.trim() === "" || amtVal < 1 || isNaN(amtVal)) {
        amtVal = 1;
        amount.value = "1";
    }

    try {
        let response = await fetch(`https://v6.exchangerate-api.com/v6/1bca9cf6677475259efb3bd8/latest/${fromCurr.value}`);
        let data = await response.json();
        let rate = data.conversion_rates[toCurr.value];
        let finalamt = (amtVal * rate).toFixed(2);
        let fromsmbl = currencySymbols[fromCurr.value];
        let tosmbl = currencySymbols[toCurr.value];
        msg.innerText = `${fromsmbl}${amtVal}  =  ${tosmbl}${finalamt}`;
        msg.style.display = "block";
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Something went wrong. Please try again.";
        msg.style.display = "block";
    } finally {
          loader.style.display = "none"; 
    }
});
