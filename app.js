const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from_curr = document.querySelector(".from select");
const to_curr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for(let select of dropdowns){
    for (curr_code in countryList) {
        let new_option = document.createElement("option");
        new_option.innerText = curr_code;
        new_option.value = curr_code;
        if(select.name === "from" && curr_code === "USD"){
            new_option.selected = "selected";
        }else if(select.name === "to" && curr_code === "INR"){
            new_option.selected = "selected";
        }
        select.append(new_option);
    }
    select.addEventListener("change", (e) => {
        update_flag(e.target);
    })
}

const update_flag = (e) => {
    let currency_code = e.value;
    console.log(currency_code);
    let country_code = countryList[currency_code];
    let new_src = `https://flagsapi.com/${country_code}/flat/64.png`
    let img = e.parentElement.querySelector("img");
    img.src = new_src;

}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amt_val = amount.value;
    if(amt_val === "" || amt_val < 1){
        amt_val = 1;
        amount.value = "1";
    }
    // console.log(amt_val);
    console.log(from_curr.value, to_curr.value);
    const URL = `https://api.frankfurter.dev/v1/latest?base=${from_curr.value}&symbols=${to_curr.value}`;
    let res = await fetch(URL);
    let data = await res.json();
    console.log(data.rates[to_curr.value]);

    let final_amt = amount.value* (data.rates[to_curr.value]);
    msg.innerText = `${amount.value} ${from_curr.value} = ${final_amt} ${to_curr.value}`
})
