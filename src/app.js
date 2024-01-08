/* TODO doesn't seem to be running? */
document.querySelectorAll('.number').forEach(function(number){ 
    /* ROUND BY 4 ON ALL NUMBERS FOR 8PT SYSTEM */
    let val = Math.trunc(parseFloat(number.innerHTML));
    console.log(val);
    let diff = val % 4;
    number.innerHTML = (diff < 2) ? val - diff : val + (4 - diff); //0 1 / 2 3 0
});
/*event < menu < content > nav > nav-items : swap display between flex and none */
function dropdown(elem) {
    let drop = document.getElementById("nav-items");
    (drop.style.display == "none") ?  drop.style.display = "flex" : drop.style.display = "none";
}
/*event < chevron < card-header < project-card #id > card-expand : swap display between flex and none
    NOTE also change style of chevron */
function expandCard(btn) {
    let drop = document.getElementById(id).getElementsByClassName("card-expand")[0];
    (drop.style.display == "none") ?  drop.style.display = "flex" : drop.style.display = "none";

}

function swapStyles(elem, currClass, newClass) {
    document.getElementById(elem).classList.replace(currClass, newClass)
}

document.querySelectorAll(".card-header > a").forEach(addEventListener("click", (e) => expandCard(e.currentTarget));

function expandCard(elem) {
    let expansion = elem.parentElement.nextElementSibling;
    (expansion.style.display == "none") ? expansion.style.display = "flex" : expansion.style.display = "none";
}