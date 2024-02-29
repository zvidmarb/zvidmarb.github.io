/*HEADER: RESPONSIVE SWITCH SITE-NAV MODIFIER DESKTOP<-> MOBILE (top-level modifier?),
              automatically toggles nav icon
          + SWITCH NAVITEMS FIXED -> HIDDEN, HIDDEN/EXPANDED -> FIXED
          
          CLICK NAV-ICON (MOBILE ONLY) FOR HIDDEN <-> EXPANDED
*/


/* HERO: SWITCH HERO-SECTION MODIFIER DESKTOP <-> MOBILE 
            simply changes layout and sizing, no additional  functions
*/
/* PROJECTS: SWITCH PROJECT-SECTION MODIFIER DESKTOP <-> MOBILE
                simply changes layout and sizing, no additional functions
             SWITCH PROJECT-CARD MODIFIER DESKTOP <-> MOBILE 
                automatically toggles details button
             +SWITCH ICON-MEDIA -CARD AND DETAILS HIDDEN/EXPANDED => HIDDEN
                SHOULD reset unlike nav items cuz new functionality
             +SWITCH more/less <-> chevron right
             SWITCH EVENTLISTENERS DESKTOP <-> MOBILE

        MOBILE CLICK ICON-MEDIA: details hidden <-> expanded + change more <-> less icon
        DESKTOP HOVER PROJECT-CARD: details hidden <-> expanded
*/

/* 
   site-header:
   site-nav: switchLayout(), switchNav()
   hero-section: switchLayout()
   icon-media: 
      -nav: toggleDropdown(), clickEvent
      -card: toggleDetails(), changeIcon(), clickEvent
   project-section: responsiveLayout()
   project-card: responsiveLayout(), responsive(), icon-media-card, hoverEvent
 */


/* TODO doesn't seem to be running?
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

//HTMLElement wrapper to more efficiently update based on responsive resizing
class ResponsiveElem {
    constructor (element) {
        this.elem = element;
        //console.log(this.elem);
    }
    update() {
        console.log(this.elem);
        isViewDesktop() && this.elem.classList.replace("-mobile", "-desktop");
        isViewMobile() && this.elem.classList.replace("-desktop", "-mobile");
        console.log("updated classes: " + this.elem.classList);
    }
}
//ResponsiveElement wrapper for cards, allowing to change button, link, details
class ResponsiveCard extends ResponsiveElem {
    constructor (elem) {
        super(elem);
        this.toggle = this.elem.querySelector("[data-js-toggle]");
        this.toggleIcon = this.toggle.firstElementChild;
        this.link = this.toggle.getAttribute("data-href");
        this.details = this.elem.querySelector("[data-js-expand]");
        this.expanded = false;
    }
    setExpanded() {
        console.log("expanded before: " + this.expanded);
        this.expanded = !this.expanded;
        console.log("expanded changed: " + this.expanded);
    }

    changeIcon() { //change icon to match expanded property and current view
        console.log(this.toggleIcon);
        this.toggleIcon.textContent = (!this.expanded && isViewMobile()) ? "expand_more" : 
        (isViewMobile()) ? "expand_less" : "chevron_right";
        console.log(this.toggleIcon);
    }
    changeLink() {
        this.toggle.href = (this.toggle.href == "#") ? this.link : "#";
    }
    update() {
        super.update();
        this.changeIcon();
        this.changeLink();
        updateCardEvents(this);
    }
    handleEvent(Event) {
        if (Event.type == "click") {
            onCardClick(this);
        } else {
            onCardHover(this);
        } 
    }

}
//ResponsiveElement wrapper for nav elements, giving functionality for enabling dropdown and changing styles
class ResponsiveNav extends ResponsiveElem {
    constructor (element) {
        super(element);
        this.dropdown = this.elem.querySelector("[data-js-dropdown]");
        this.toggle = this.elem.querySelector("[data-js-toggle]");
    }
    switchNav() {
        collapseElement(this.dropdown);
        console.log(isViewDesktop());
        console.log(this.dropdown.classList.toggle("-fixed", isViewDesktop()));
        console.log("HERE " + this.dropdown.classList);
    }
    update() {
        super.update();
        this.switchNav();
    }

}
//special wrapper for page sections, initializing and observing other elements  
class ResponsiveSection extends ResponsiveElem {
    constructor (element) {
        super(element);
        this.children = Array.from(this.elem.querySelectorAll("[data-js-responsive]"),
            child => {
                console.log(child.dataset);
                if ('jsExpandableCard' in child.dataset) { //card element case
                    console.log("card found");
                    const Card = new ResponsiveCard(child);
                    return Card;
                    //return new ResponsiveCard(child);
                } else if ('jsCollapsibleNav' in child.dataset) {
                    console.log("nav found");
                    const Nav = new ResponsiveNav(child) //store and use for its event listener, TODO rough
                    console.log(Nav);
                    return Nav;
                    
                }
                return new ResponsiveElem(child); //normal element case
            })
    }
    find(element) {
        return this.children.find(child => (child.elem === element) ? child : false)
    }
    update() {
        console.log(this.elem);
        super.update();
        console.log("entering child updates");
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
state.getResponsiveInstance = function(element) {
    for (const section of this.responsives) {
        if (element === section.elem) {
            console.log("matched with section");
        }
        console.log(this.responsives);
        console.log(section);
        const search = section.find(element);
        console.log("second-level search: ");
        console.log(search);
        if (search) {
            console.log("search is truthy")
            return search; //TODO DFS BEST?
        } 
        else { 
            console.log("search false");
        }
    }
}  

/* DOM node references */
//const root = document.querySelector('[data-js-responsive-layout]');
const navToggle = document.querySelector('[data-js-toggle]'); //TODO not ideal, since class member access difficult
const navDropdown = document.querySelector('[data-js-dropdown]');


/* project-card, expandable-card.js:
    toggleElement() - toggles expanded class for card details and for card icon
    changeIcon() - updates icon inner text to change to selected material name
    changeLink() - updates href link "#" <-> link from button href
    project-card, hover (desktop): toggleElement on details
    project-card, click (mobile): toggleElement on details/card icon, changeIcon more<->less
*/

/* DOM update functions */
const toggleElement = element => element.classList.toggle("-expanded");
const collapseElement = element => element.classList.toggle("-expanded", false);

const updateViewUI = () => {
    console.log("updating...")
    console.log(state.responsives);
    state.responsives.forEach(r => {
        console.log(r);
        r.update();
        });
}

/* site-nav, collapsible-nav.js:
    toggleDropdown() - toggles expanded class
    switchNav() - toggle fixed class on nav-items, toggleDropdown if expanded class is present
    icon-media-nav, clickEvent: toggleDropdown on nav-items
*/


/* Event Handlers */
function onResize() {
    (window.innerWidth < L) && setViewMobile();
    (window.innerWidth >= L) && setViewDesktop();
    updateViewUI();
}
function onDropClick() { 
    toggleElement(navDropdown);
}
function onCardClick(Card) {
    console.log(Card);
    toggleElement(Card.details);
    toggleElement(Card.toggle);
    Card.setExpanded();
    Card.changeIcon();
    
}
function onCardHover(Card) {
    toggleElement(Card.details);
    Card.setExpanded();
    console.log("hover event triggered");
}

/* Event Handler Bindings */
window.addEventListener("resize", onResize);
navToggle.addEventListener("click", onDropClick);
function updateCardEvents (Card) {
    console.log("updateCardEvents");
    if (isViewMobile()) {
        Card.toggle.addEventListener("click", Card);
        ["mouseenter", "mouseleave"].forEach(t => Card.elem.removeEventListener(t, Card));
    } else if (isViewDesktop()) {
        console.log("adding desktop event listeners, removing mobile if necessary");
        ["mouseenter", "mouseleave"].forEach(t => Card.elem.addEventListener(t, Card));
        Card.toggle.removeEventListener("click", Card);
    }
}

/* Initial Setup */
console.log(state);
updateViewUI();