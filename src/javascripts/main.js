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
const MOBILE = 0, DESKTOP = 1;
let state = {
    view : ,

};

let getView = () => state.view;
let setMobile = () => state.view = MOBILE;
let setDesktop = () => state.view = DESKTOP;
let isMobile = () => state.view === MOBILE;
let isDesktop = () => state.view === DESKTOP;





var toggleElement = element => element.classList.toggle("-expanded");
var collapseElement = element => element.classList.toggle("-expanded", false);
function switchLayout (element) {
    element.classList.toggle("-desktop");
    element.classList.toggle("-mobile");
    console.log("switchLayout results in: " + element.class);
}

function topLevelResponsive() {
    var start = document.querySelector("[data-js-responsive]");
    //top-level?
    start.querySelectorAll("[data-js-responsive]").forEach(elem => switchLayout(elem));
    
    //header - switchLayout() on site-nav; switchNav() on navitems

    //hero - switchLayout() on hero-section

    //projects - switchLayout() on project-section, project-cards; 
    //           changeicon()s, changelink()s, change event listeners

    //footer?
}
window.addEventListener("resize", topLevelResponsive());


/* site-nav, collapsible-nav.js:
    toggleDropdown() - toggles expanded class
    switchNav() - toggle fixed class on nav-items, toggleDropdown if expanded class is present
    icon-media-nav, clickEvent: toggleDropdown on nav-items
*/
 let nav = document.querySelector('[data-js-collapsible-nav]');
 let dropdown = nav.querySelector('[data-js-dropdown]');
 let toggle = nav.querySelector('[data-js-toggle]');

function switchNav(nav) {
    App.collapseElement(nav);
    return nav.classList.toggle("-fixed");
}

toggle.addEventListener('click', toggleElement(dropdown));

CollapsibleNav.responsive = switchNav(dropdown);

/* hero-section */
/* project-card, expandable-card.js:
    toggleElement() - toggles expanded class for card details and for card icon
    changeIcon() - updates icon inner text to change to selected material name
    changeLink() - updates href link "#" <-> link from button href
    project-card, hover (desktop): toggleElement on details
    project-card, click (mobile): toggleELement on details/card icon, changeIcon more<->less
*/
function ResponsiveCard(node) {
    this.node = node;
    this.toggle = node.querySelector("[data-js-toggle]");
    this.href = toggle.dataset.href;
    this.details = node.querySelector("[data-js-expand]");
}
cards = document.querySelectorAll("[data-js-expandable-card]").forEach(el => new ResponsiveCard(el));

function changeIcon(element, isMobile) {
    element.innerHTML = (element.innerHTML == "expand_more" && isMobile) ? "expand_less" : 
                            (isMobile) ? "expand_more" : "chevron_right"; 
}
function changeLink(element) {
    anchor.href = (anchor.href == '#') ? element.getAttribute("data-href") : "#";
}

function cardExpand(card) {
    toggleElement(card.details);
    changeIcon(card.toggle, isMobile);
}
//project-section responsive
function responsive(element) {

    changeLink(element);
    changeIcon(element, isMobile);
    // mobile version - changeicon, changelink, add click, remove hover events

    // desktop version - changeicon, changelink, add hover events, remove click

}

var projectCard = document.querySelectorAll('[data-js-expandable-card]').forEach(addEventListener('click'))