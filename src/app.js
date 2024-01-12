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
    event.preventDefault();
    let nav = this.nextElementSibling; //this = #menu
    nav.classList.toggle("expanded"); 
    nav.firstElementChild.classList.toggle("expanded");
}

document.getElementById("menu").addEventListener("click", expandNav);

/* expandCard - abstracts JS styling changes thru a single CSS modifier class
    @param elem: the target button element
    @return: none */
function expandCard(event) {
    event.preventDefault();
    
    this.classList.toggle("expanded"); // swap button styling - MIGHT BE POSSIBLE W JUST CSS?

    //swap icon and icon styling
    let span = this.firstElementChild;
    span.classList.toggle("expanded");
    (span.innerHTML == "expand_more") ? span.innerHTML = "expand_less" : 
                                            span.innerHTML = "expand_more";
    //change dropdown visibility
    this.parentElement.nextElementSibling.classList.toggle("expanded");
}
function revealCard(event){
    this.lastElementChild.classList.toggle("expanded"); //just the hovered text
    console.log("hover event triggered");
}

function setCard(){ /* TODO all the event listeners starting to look cluttered*/
    if (window.innerWidth < 1240) {
        document.querySelectorAll(".card-header a").forEach((elem) => {
            elem.href = "#"
            elem.firstElementChild.innerHTML = "expand_more";
            elem.addEventListener("click", expandCard);
        });
        document.querySelectorAll(".project-card").forEach( elem => {
            elem.removeEventListener("mouseenter", revealCard)
            elem.removeEventListener("mouseleave", revealCard)});
    } else {
        document.querySelectorAll(".card-header a").forEach((elem) => {
            elem.href = "/" + elem.parentElement.parentElement.id;
            elem.firstElementChild.innerHTML = "chevron_right";
            elem.removeEventListener("click", expandCard);
        });
        document.querySelectorAll(".project-card").forEach( elem => {
            elem.addEventListener("mouseenter", revealCard);
            elem.addEventListener("mouseleave", revealCard);
        });
    }
}
setCard(); // initial ?
window.addEventListener("resize", setCard); //check any time window is resized