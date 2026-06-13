/* =========================================
   GLOBAL APP
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);

function initializeApp()
{
    initializeNavbarEffects();
}

/* =========================================
   NAVBAR SCROLL EFFECT
   ========================================= */

function initializeNavbarEffects()
{
    const navbar =
        document.querySelector(
            ".navbar"
        );

    window.addEventListener(
        "scroll",
        () => {

            if(window.scrollY > 50)
            {
                navbar.style.background =
                    "rgba(9,13,17,.95)";
            }
            else
            {
                navbar.style.background =
                    "rgba(9,13,17,.8)";
            }

        }
    );
}