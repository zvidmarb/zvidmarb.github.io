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
   site-header: switchLayout()
   site-nav: switchLayout(), switchNav()
   hero-section: switchLayout()
   icon-media: 
      -nav: toggleDropdown(), clickEvent
      -card: toggleDetails(), changeIcon(), clickEvent
   project-section: responsiveLayout()
   project-card: responsiveLayout(), responsive(), icon-media-card, hoverEvent
 */
function toggleElement(element) {
    return element.classList.toggle("-expanded");
}
function collapseElement(element) {
    return element.classList.toggle("-expanded", false);
}

function switchLayout(element) {
    
}
function switchLayout(root) {
    if (window.innerWidth < 1240) {
        
    } else {

    }
}

window.addEventListener("resize", )


/* site-nav, collapsible-nav.js:
    toggleDropdown() - toggles expanded class
    switchNav() - toggle fixed class on nav-items, toggleDropdown if expanded class is present
    icon-media-nav, clickEvent: toggleDropdown on nav-items
*/
    var siteNav = document.querySelector('[data-js-collapsible-nav]');
    var navItems = nav.querySelector('[data-js-dropdown]');
    
    function switchNav(element) {
        collapseElement(element);
        return element.classList.toggle("-fixed");
    }
    
    nav.querySelector('[data-js-toggle]').addEventListener('click', toggleElement(navItems));

/* project-card, expandable-card.js:
    toggleElement() - toggles expanded class for card details and for card icon
    changeIcon() - updates icon inner text to change to selected material name
    changeLink() - updates href link "#" <-> link from button href
    project-card, hover (desktop): toggleElement on details
    project-card, click (mobile): toggleELement on details/card icon, changeIcon more<->less
*/

function changeIcon(element) {
    element.innerHTML = (element.innerHTML == "chevron_right") ? "expand_more" : "chevron_right"; 
    return element.innerHTML;
}
function changeLink(element) {
    anchor.href = (anchor.href == '#') ? element.getAttribute("data-href") : "#";
    return anchor.href
}
function responsiveCard() {

}

var projectCard = document.querySelectorAll('[data-js-expandable-card]').forEach(addEventListener('click'))
