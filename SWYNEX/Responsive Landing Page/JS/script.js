const heroTitle = document.querySelector(".sec1 h1");

const text = "Healthy Crops, Bright Future!";

heroTitle.innerHTML = "";

let index = 0;

function typeEffect() {

    if (index < text.length) {

        heroTitle.innerHTML += text.charAt(index);

        index++;

        setTimeout(typeEffect, 100);
    }
}

typeEffect();


document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");

    if (window.scrollY > 50) {

        header.style.background =
            "#1B5E20";

        header.style.boxShadow =
            "0 4px 15px rgba(0,0,0,0.25)";

    }

    else {

        header.style.background =
            "#14532d";

        header.style.boxShadow =
            "none";

    }

});


const hiddenElements =
    document.querySelectorAll(".hidden");

const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    });

hiddenElements.forEach(el => {

    observer.observe(el);

});


const startBtn =
    document.querySelector(".cta-btn");

if (startBtn) {

    startBtn.addEventListener("click", () => {

        alert(
            "🌱 Welcome to Smart Farm! Let's grow together."
        );

    });

}