/* TODO determine if this is viable - any values that won't do well rounded by 4?
document.querySelectorAll('.number').forEach(function(number){ 
    /* ROUND BY 4 ON ALL NUMBERS FOR 8PT SYSTEM
    let val = Math.trunc(parseFloat(number.innerHTML));
    console.log(val);
    let diff = val % 4;
    number.innerHTML = (diff < 2) ? val - diff : val + (4 - diff); //0 1 / 2 3 0
});
*/
/* CONSTANTS, HELPERS */
const MOBILE = 0, DESKTOP = 1;
const S = 600, M = 905, L = 1240, XL = 1440; //minimum breakpoints of each screen size, XS-M: mobile/tablet, L-XL: desktop 

/* ResponsiveElem: HTMLElement wrapper to more efficiently update based on responsive resizing
    Properties: this.elem => the HTML element that the instance wraps
    Methods: update() => swaps between -mobile and -desktop variants for the given element
*/
class ResponsiveElem {
    constructor (element) {
        this.elem = element;
        //console.log(this.elem);
    }
    update() {
        // console.log(this.elem);
        isViewDesktop() && this.elem.classList.replace("-mobile", "-desktop");
        isViewMobile() && this.elem.classList.replace("-desktop", "-mobile");
        // console.log("updated classes: " + this.elem.classList);
    }
}
/* ResponsiveCard: ResponsiveElement made to wrap Card components
    Properties: this.elem, this.toggle, this.toggleIcon, this.link, this.details, this.expanded
    Methods: update(), setExpanded(), changeIcon(), changeLink(), handleEvent(e)
*/
class ResponsiveCard extends ResponsiveElem {
    constructor (elem) {
        super(elem);
        this.toggle = this.elem.querySelector("[data-js-toggle]");
        this.toggleIcon = this.toggle.firstElementChild;
        this.link = this.toggle.dataset.href;
        this.details = this.elem.querySelector("[data-js-expand]");
        this.expanded = false; //flags whether a card's details are expanded
    }
    setExpanded() {this.expanded = !this.expanded}

    //change icon to match expanded property and current view
    changeIcon() { 
        this.toggleIcon.textContent = (!this.expanded && isViewMobile()) ? "expand_more" : 
        (isViewMobile()) ? "expand_less" : "chevron_right";
    }
    //updates href to the separate page for a given card
    changeLink() {
        this.toggle.href = (this.toggle.href == "#") ? this.link : "#";
    }

    update() {
        super.update();
        this.changeIcon();
        this.changeLink();
        updateCardEvents(this); //assigns event listeners
    }

    handleEvent(Event) {
        if (Event.type == "click") {
            onCardClick(this);
            Event.preventDefault();
        } else if (Event.type == "mouseenter" || Event.type == "mouseleave") {
            onCardHover(this);
        } else throw new Error("Event type not handled!");
    }

}
/* ResponsiveNav: ResponsiveElement made to wrap Nav component
    Properties: this.elem, this.toggle, this.dropdown
    Methods: update(), switchNav(), handleEvent(e)
*/
class ResponsiveNav extends ResponsiveElem {
    constructor (element) {
        super(element);
        this.dropdown = this.elem.querySelector("[data-js-dropdown]");
        this.toggle = this.elem.querySelector("[data-js-toggle]");
        this.items = [...this.elem.querySelectorAll("[data-js-nav]")];
        this.active = this.items[0]; //default = first item
    }
    switchNav() {
        collapseElement(this.dropdown);
        this.dropdown.classList.toggle("-fixed", isViewDesktop());
    }
    /*getNavItem(id) {
        for (const item of this.items) {
            console.log("retrieving navitem for id " + id + "...");
            if (item.dataset.jsNav == id){
                console.log("success!");
                return item;
            } else {
                console.log("failed.")
            }
        }
    }*/
    update() {
        super.update();
        this.switchNav();
        updateNavEvent(this);
    }
    handleEvent(Event) {
        if (Event.currentTarget === this.toggle) {
            onNavClick(this);
        /*} else if (Event.type == "scroll") {
            onSectionScroll(this);*/
        } else {
            console.log(Event.currentTarget);
            
            onNavItemClick(this, Event.currentTarget);
        }
        
    }

}
/* ResponsiveSection: ResponsiveElement made to wrap sections, and initializing other responsive elements
    Properties: this.elem, this.children[]
    Methods: update(), find(element)
*/
class ResponsiveSection extends ResponsiveElem {
    constructor (element) {
        super(element);
        /*this.top = this.elem.offsetTop;
        this.height = this.elem.offsetHeight;*/
        this.children = Array.from(this.elem.querySelectorAll("[data-js-responsive]"),
            child => {
                console.log(child.dataset);
                if ('jsExpandableCard' in child.dataset) { //card element case
                    // console.log("card found");
                    const Card = new ResponsiveCard(child);
                    return Card;
                    //return new ResponsiveCard(child);
                } else if ('jsCollapsibleNav' in child.dataset) {
                    // console.log("nav found");
                    const Nav = new ResponsiveNav(child) //store and use for its event listener, TODO rough
                    // console.log(Nav);
                    return Nav;
                    
                }
                return new ResponsiveElem(child); //normal element case
            })
    }
    find(element) {
        return this.children.find(child => (child.elem === element) ? child : false)
    }
    /*isVisible() {
        const topWindow = window.scrollY;
        return (topWindow > this.top && topWindow < (this.top + this.height));
    }*/
    update() {
        // console.log(this.elem);
        super.update();
        // console.log("entering child updates");
        this.children.forEach(c => c.update());
    }

}

/* STATE */
const state = {
    view : (window.innerWidth < L) ? MOBILE : DESKTOP, //initialize which screen view
    //initialize responsive elements
    responsives : Array.from(document.querySelectorAll('[data-js-responsive-layout] > [data-js-responsive]'),
        s => {
            const section = new ResponsiveSection(s);
            console.log(section);
            return section;
        })
    //console.log(this.responsives.length);
}

/* STATE ACCESSOR FUNCTIONS */
getView = () => state.view;
setViewMobile = () => state.view = MOBILE;
setViewDesktop = () => state.view = DESKTOP;
isViewDesktop = () => getView() === DESKTOP;
isViewMobile = () => getView() === MOBILE;

//takes HTMLElement and returns responsive element class instance (DFS, 2 levels)
/* currently not necessary, everything now encapsulated into classes
state.getResponsiveInstance = function(element) {
    for (const section of this.responsives) {
        // console.log(this.responsives);
        // console.log(section);
        const search = section.find(element);
        // console.log("second-level search: ");
        // console.log(search);
        if (search) {
            // console.log("search is truthy")
            return search; //TODO DFS BEST?
        } 
        else { 
            // console.log("search false");
        }
    }
}  */

/* DOM node references - none necessary atm */

/* DOM update functions */
const toggleElement = element => element.classList.toggle("-expanded");
const collapseElement = element => element.classList.toggle("-expanded", false);
const activateElement = element => element.classList.toggle("-active", true);
const deactivateElement = element => element.classList.toggle("-active", false);

const updateViewUI = () => {
    //console.log("updating...")
    //console.log(state.responsives);
    state.responsives.forEach(r => r.update());
}

/* Event Handlers */
function onWindowResize() {
    (window.innerWidth < L) && setViewMobile();
    (window.innerWidth >= L) && setViewDesktop();
    updateViewUI();

}
/*function onSectionScroll(Nav){
    let iter;
    //for each section, compare scrolly position to that of the section top and the section height
    for (const section of state.responsives) {
        console.log("checking section " + section.elem.id + " visibility..." )
        if (section.elem.id && section.isVisible()) {
             iter = Nav.getNavItem(section.elem.id); //get nav item matching the given section; id and >a[href] matches
             console.log("section is visible!")
        } else {
            console.log("not visible.")
        }
    }
    if(iter && iter !== Nav.active) {
        deactivateElement(Nav.active);
        activateElement(iter);
    } else {
        console.log("section is same as current active nav item: " + Nav.active);
    }
    
}*/
function onNavClick(Nav) { 
    toggleElement(Nav.dropdown);
}
function onNavItemClick(Nav, item) {
    deactivateElement(Nav.active);
    activateElement(item);
    Nav.active = item;

    collapseElement(Nav.dropdown); //only applies to mobile
}

function onCardClick(Card) {
    //console.log(Card);
    toggleElement(Card.details);
    toggleElement(Card.toggle);
    Card.setExpanded();
    Card.changeIcon();
    
}
function onCardHover(Card) {
    toggleElement(Card.details);
    Card.setExpanded();
}

/* Event Handler Bindings */
window.addEventListener("resize", onWindowResize);
function updateNavEvent(Nav) {
    Nav.items.forEach((item) => item.addEventListener("click", Nav));
    if (isViewMobile()) {
        Nav.toggle.addEventListener("click", Nav);
    } else if (isViewDesktop()) {
        Nav.toggle.removeEventListener("click", Nav);
        /*window.addEventListener("scroll", Nav);*/
    } else throw new Error("Nav event updating failed!");
}

function updateCardEvents (Card) {
    //console.log("updateCardEvents");
    if (isViewMobile()) {
        Card.toggle.addEventListener("click", Card);
        ["mouseenter", "mouseleave"].forEach(t => Card.elem.removeEventListener(t, Card));
    } else if (isViewDesktop()) {
        //console.log("adding desktop event listeners, removing mobile if necessary");
        ["mouseenter", "mouseleave"].forEach(t => Card.elem.addEventListener(t, Card));
        Card.toggle.removeEventListener("click", Card);
    } else throw new Error ("Card event updating failed!");
}

/* Initial Setup */
console.log(state);
updateViewUI();