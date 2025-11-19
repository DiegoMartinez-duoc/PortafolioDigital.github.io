const track = document.getElementById("estudios");

            
let info = "Certificación profesional en ciencias de la computación";
let seleccion = "window.location.href='https://www.codecademy.com/about';";

document.getElementById("perfil").addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.body.classList.add('lightbox-open');
    document.getElementById("lightbox-img").src = "img/perfil.png"
});

document.getElementById("expandir").addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.body.classList.add('lightbox-open');

    if (track.dataset.percentage >= -65 && track.dataset.percentage < -45) {
        document.getElementById("lightbox-img").src = "img/fullStack.png"
    } else if (track.dataset.percentage >= -45 && track.dataset.percentage < -25) {
        document.getElementById("lightbox-img").src = "img/computerScience.png"
    } else if (track.dataset.percentage >= -25) {
        document.getElementById("lightbox-img").src = "img/duocOnline.png"
    } else if (track.dataset.percentage >= -85 && track.dataset.percentage < -65) {
        document.getElementById("lightbox-img").src = "img/dataScientist.png"
    } else if (track.dataset.percentage < -85) {
        document.getElementById("lightbox-img").src = "img/uc.PNG"    
    }
});

document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target !== document.getElementById("lightbox").querySelector("img")) {
        document.getElementById("lightbox").style.display = "none";
        document.body.classList.remove('lightbox-open');
    };
});


window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
    isDragging = false;
}

window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    if (isDragging) {
        track.dataset.prevPercentage = track.dataset.percentage;
    }
}

window.onmousemove = e => {

    if (parseFloat(track.dataset.mouseDownAt) === 0) return;

    isDragging = true;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

    track.dataset.percentage = Math.max(Math.min(nextPercentage, -15), -95);

    track.animate({
        transform: `translate(${Math.max(Math.min(nextPercentage, -15), -95)}%, -50%)`
    }, { duration: 1200, fill:"forwards" });
    
    for (const imgen of track.getElementsByClassName("imagen")) {
        imgen.animate({
            objectPosition: `${100 + Math.max(Math.min(nextPercentage, -15), -95)}% center`
        }, { duration: 1200, fill: "forwards" });
    }

    console.log("nextPercentage:", track.dataset.percentage); // Debug

    if (track.dataset.percentage >= -65 && track.dataset.percentage < -45) {
        info = "Certificación profesional de ingeniería full-stack";
        seleccion = "window.location.href='https://www.codecademy.com/about'";
        document.getElementById("link").textContent = "Codecademy";
    } else if (track.dataset.percentage >= -45 && track.dataset.percentage < -25) {
        info = "Certificación profesional en ciencias de la computación";
        seleccion = "window.location.href='https://www.codecademy.com/about'";
        document.getElementById("link").textContent = "Codecademy";
    } else if (track.dataset.percentage >= -25) {
        info = "Analista programador computacional";
        seleccion = "window.location.href='https://www.duoc.cl/carreras/analista-programador-computacional/'";
        document.getElementById("link").textContent = "DuocUC";
    } else if (track.dataset.percentage >= -85 && track.dataset.percentage < -65) {
        info = "Certificación profesional en ciencia de datos";
        seleccion = "window.location.href='https://www.codecademy.com/about'";
        document.getElementById("link").textContent = "Codecademy";
    } else if (track.dataset.percentage < -85) {
        info = "Licenciatura en astronomía (inconclusa)";
        seleccion = "window.location.href='https://admision.uc.cl/carreras/astronomia/'";
        document.getElementById("link").textContent = "Pontificia Universad Catolica de Chile";
    }

    document.getElementById("link").onclick = function() {
        window.location.href = seleccion.replace("window.location.href=", "").replace(/'/g, "");
    };
    
    document.getElementById("seccion-info").textContent = info;
}
