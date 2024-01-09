/* TODO doesn't seem to be running? */
document.querySelectorAll('.number').forEach(function(number){ 
    /* ROUND BY 4 ON ALL NUMBERS FOR 8PT SYSTEM */
    let val = Math.trunc(parseFloat(number.innerHTML));
    console.log(val);
    let diff = val % 4;
    number.innerHTML = (diff < 2) ? val - diff : val + (4 - diff); //0 1 / 2 3 0
});

/*expanded class toggles display:flex by default */
function expandNav(event) {
    let nav = this.nextElementSibling; //this = #menu
    nav.classList.toggle("expanded"); 
    nav.firstElementChild.classList.toggle("expanded");
}

document.getElementById("menu").addEventListener("click", expandNav);

/* expandCard - abstracts JS styling changes thru a single CSS modifier class
    @param elem: the target button element
    @return: none */
function expandCard(event) {
    this.classList.toggle("expanded"); // swap button styling

    //swap icon and icon styling
    let span = this.firstElementChild;
    span.classList.toggle("expanded");
    (span.innerHTML == "expand_more") ? span.innerHTML = "expand_less" : 
                                            span.innerHTML = "expand_more";
    //change dropdown visibility
    this.parentElement.nextElementSibling.classList.toggle("expanded");
}
document.querySelectorAll(".card-header a").forEach((elem) => 
                                elem.addEventListener("click", expandCard));