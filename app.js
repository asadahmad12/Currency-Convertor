
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


for (let select of dropdown) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
      updatedflag(evt.target);
    });
}    
const updatedflag=(element) => {
  let currCode=element.value;
  let countrycode=countryList[currCode];
  let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newSrc;
};
const exchangeRate=async()=>{
  let amount =document.querySelector(".amount input");
  let amtval=amount.value;
  if(amtval===""||amtval<1){
    amtval=1;
    amount.value="1";
  }
  // console.log(fromCurr.value,toCurr.value);
  
  
  const URL = ` https://v6.exchangerate-api.com/v6/379fea4a55f388d95d8b7147/latest/${fromCurr.value}`;
  await fetch(URL).then(response=> response.json()).then(result => {
    let exchangerate=result.conversion_rates[toCurr.value];
    
    
    let finalamt=amtval*exchangerate;
    console.log(finalamt);
    
    msg.innerText=`${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
  })

}
btn.addEventListener("click",async (evt)=>{
evt.preventDefault();

exchangeRate();

})
window.addEventListener("load",()=>{
  exchangeRate();
})