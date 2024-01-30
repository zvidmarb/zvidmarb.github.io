/*HEADER: RESPONSIVE SWITCH SITE-NAV MODIFIER DESKTOP<-> MOBILE (top-level modifier?),
              automatically toggles nav icon
          + SWITCH NAVITEMS FIXED -> HIDDEN, HIDDEN/EXPANDED -> FIXED
          
          CLICK NAV-ICON (MOBILE ONLY) FOR HIDDEN <-> EXPANDED
              TODO should nav items state remain when switching back and forth 
              DESKTOP<->MOBILE? or always reset to hidden
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
   icon-media (toggleable-icons): 
      -nav: toggleDropdown(), clickEvent
      -card: toggleDetails(), changeIcon(), clickEvent
   project-section: responsiveLayout()
   project-card: responsiveLayout(), responsiveCard(), icon-media-card, hoverEvent
 */

/* ICON-MEDIA, behaviors/toggleable-icons.js:
    toggleDropdown():
    clickEvent - toggleDropdown()
    toggleDetails():
    changeIcon()
*/

function responsive () {
    if (window.innerWidth < 1240) {
        document.querySelectorAll(".-desktop").forEach(classList.replace("-desktop","-mobile"));

    } else {
        document.querySelectorAll(".-mobile").forEach(classList.replace("-mobile","-desktop"));
    }
}
window.addEventListener("resize", responsive)