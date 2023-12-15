/* TODO doesn't seem to be running? */
document.querySelectorAll('.number').forEach(function(number){ 
    /* ROUND BY 4 ON ALL NUMBERS FOR 8PT SYSTEM */
    let val = Math.trunc(parseFloat(number.innerHTML));
    console.log(val);
    let diff = val % 4;
    number.innerHTML = (diff < 2) ? val - diff : val + (4 - diff); //0 1 / 2 3 0
});

function dropdown() {
    var drop = document.getElementById("nav-items");
    (drop.style.display == "none") ?  drop.style.display = "flex" : drop.style.display = "none";
}
