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

class ResponsiveCard extends ResponsiveElem {
    constructor (elem) {
        super(elem);
        this.toggle = this.elem.querySelector("[data-js-toggle]");
        this.link = this.toggle.getAttribute("data-href");
        this.details = this.elem.querySelector("[data-js-expand]");
        this.update();
    }
    expanded = false;
    
    changeIcon() {
        this.toggle.innerHTML = (!expanded && State.isViewMobile) ? "expand_less" : 
        (State.isViewMobile) ? "expand_more" : "chevron_right"; 
    }
    changeLink() {
        this.toggle.href = (this.toggle.href == "#") ? this.link : "#";
    }
    update() {
        super.update();
        this.changeIcon();
        this.changeLink();
        updateCardEvents(this.elem, this.toggle);
    }

}
class ResponsiveNav extends ResponsiveElem {
    constructor (element) {
        super(element);
        this.dropdown = this.elem.querySelector("[data-js-dropdown]");
        this.toggle = this.elem.querySelector("[data-js-toggle]");
    }

    update() {
        super.update();
        switchNav();
    }
    switchNav() {
        collapseElement(this.dropdown);
        this.dropdown.classList.toggle("-fixed", State.isViewDesktop);
    }
}
class ResponsiveSection extends ResponsiveElem {
    constructor (element) {
        super(element);
        this.children = this.node.querySelectorAll("[data-js-responsive]").forEach(
        function (child) {
            if ('js-expandable-card' in child.dataset) { //card element case
                return new ResponsiveCard(child);
            } else if ('js-collapsible-nav' in child.dataset) {
                return new ResponsiveNav(child);
            }
            return new ResponsiveElem(child); //normal element case
        })
    }
    update() {
        super.update();
        this.children.forEach(c => c.update());
    }

}
class ResponsiveElem {
    constructor (element) {
        this.elem = element;
    }
    update() {
        State.isViewDesktop && this.elem.classList.replace("-mobile", "-desktop");
        State.isViewMobile && this.elem.classList.replace("-desktop", "-mobile");
        console.log("updated classes: " + this.elem.class);
    }
}
/* STATE */
let State = function () {
    this.view = (window.innerWidth < L) ? MOBILE : DESKTOP;
    this.Responsives = root.querySelectorAll('> [data-js-responsive]')
                                .forEach(s => new ResponsiveSection(s)); 
}

/* STATE ACCESSOR FUNCTIONS */
State.getView = () => this.view;
State.setViewMobile = () => this.view = MOBILE;
State.setViewDesktop = () => this.view = DESKTOP;
State.isViewMobile = () => this.view === MOBILE;
State.isViewDesktop = () => this.view === DESKTOP;


/* DOM node references */
const root = document.querySelector('[data-js-responsive-layout]');

let nav = document.querySelector('[data-js-collapsible-nav]');
let navDropdown = nav.querySelector('[data-js-dropdown]');
let toggle = nav.querySelector('[data-js-toggle]');

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

function updateViewUI() {
    
    State.Responsives.forEach(update)
}

/* site-nav, collapsible-nav.js:
    toggleDropdown() - toggles expanded class
    switchNav() - toggle fixed class on nav-items, toggleDropdown if expanded class is present
    icon-media-nav, clickEvent: toggleDropdown on nav-items
*/


/* Event Handlers */
function onResize() {
    (window.innerWidth < L) && State.setViewMobile;
    (window.innerWidth >= L) && State.setViewDesktop;
    updateViewUI();
}

function onCardClick() {
    toggleElement(card.details);
    changeIcon(card.toggle, State.isViewMobile);
}
function onCardHover() {
    toggleElement(card.details);
    console.log("hover event triggered");
}

/* Event Handler Bindings */
window.addEventListener("resize", onResize);
toggle.addEventListener('click', toggleElement(dropdown));

function updateCardEvents (card, toggle) {
    if (State.isViewMobile) {
        toggle.addEventListener("click", onCardClick);
        ["mouseenter", "mouseleave"].forEach(t => card.removeEventListener(t, onCardHover));
    } else if (State.isViewDesktop) {
        ["mouseenter", "mouseleave"].forEach(t => card.addEventListener(t, onCardHover));
        toggle.removeEventListener("click", onCardClick);
    }
}

/* Initial Setup */
const state = new State();