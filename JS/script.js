document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.getElementsByClassName("formation-detail-btn");
    const details = document.getElementsByClassName("formation-detail");

    // Fonction pour fermer un détail
    function closeDetail(index) {
        const detail = details[index];
        const button = buttons[index];
        let currentHeight = detail.scrollHeight;

        const interval = setInterval(() => {
            currentHeight -= 10;
            if (currentHeight <= 0) {
                currentHeight = 0;
                clearInterval(interval);
                detail.style.height = "0px";
                detail.classList.remove("show");
                button.textContent = "+";
            }
            detail.style.height = currentHeight + "px";
        }, 20);
    }

    // Fonction pour ouvrir un détail
    function openDetail(index) {
        const detail = details[index];
        const button = buttons[index];
        const maxHeight = detail.scrollHeight;
        let currentHeight = 0;

        detail.style.height = "0px"; 
        detail.classList.add("show");

        const interval = setInterval(() => {
            currentHeight += 10;
            if (currentHeight >= maxHeight) {
                currentHeight = maxHeight;
                clearInterval(interval);
            }
            detail.style.height = currentHeight + "px";
            button.textContent = "−";
        }, 20);
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function () {
            if (details[i].classList.contains("show")) {
                closeDetail(i);
            } else {
                
                for (let j = 0; j < details.length; j++) {
                    if (j !== i && details[j].classList.contains("show")) {
                        closeDetail(j);
                    }
                }
                openDetail(i);
            }
        });
    }
});



document.addEventListener("DOMContentLoaded", function () {
  const compItems = document.querySelectorAll(".comp-item");
  let tooltip = null;

  function createTooltip() {
    tooltip = document.createElement("div");
    tooltip.className = "tooltip-box";
    document.body.appendChild(tooltip);
  }

  compItems.forEach(item => {
    item.addEventListener("mouseover", function (e) {
      const text = item.getAttribute("data-desc");
      if (!tooltip) {
        createTooltip();
      }
      tooltip.textContent = text;
      tooltip.classList.add("show");
    });

    item.addEventListener("mousemove", function (e) {
      if (tooltip) {
        
        const offsetX = 10;
        const offsetY = 20;
        tooltip.style.left = (e.pageX + offsetX) + "px";
        tooltip.style.top = (e.pageY + offsetY) + "px";
      }
    });

    item.addEventListener("mouseout", function () {
      if (tooltip) {
        tooltip.classList.remove("show");
      }
    });
  });
});


/*
// Question 7 : auto-evaluation avec les etoiles
document.addEventListener("DOMContentLoaded", function () {
  fetch("JS/skills.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du JSON");
      }
      return response.json();
    })
    .then(data => {
      const ul = document.getElementById("auto-eval");
      data.competences.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.nom + " : ";

        const max = 5;
        for (let i = 1; i <= max; i++) {
          const span = document.createElement("span");
          span.classList.add("star");
          if (i <= item.note) {
            span.textContent = "★";
          } else {
            span.textContent = "☆";
            span.classList.add("empty");
          }
          li.appendChild(span);
        }

        ul.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Problème avec le JSON :", error);
    });
});

*/


//Auto evaluation 

document.addEventListener("DOMContentLoaded", function () {
  fetch("JS/skills.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du JSON");
      }
      return response.json();
    })
    .then(data => {
      const competences = data.competences;
      
      const canvas = document.getElementById("competences");
      const ctx = canvas.getContext("2d");
      
      const W = canvas.width;
      const H = canvas.height;
      
      const paddingTop = 40;
      const paddingBottom = 30;
      const paddingLeft = 60;
      const paddingRight = 20;
      
      const count = competences.length;
      const spaceTotal = H - paddingTop - paddingBottom;
      const barHeight = spaceTotal / count * 0.6;
      const gap = spaceTotal / count * 0.4;
      
      const maxNote = Math.max(...competences.map(c => c.note));
      const usableWidth = W - paddingLeft - paddingRight;
      
      ctx.textBaseline = "middle";
      ctx.font = "14px sans-serif";
      ctx.fillStyle = "#333";
      
      competences.forEach((c, i) => {
        const yBarTop = paddingTop + i * (barHeight + gap) + gap / 2;
        const barWidth = (c.note / maxNote) * usableWidth;
        
      
        ctx.textAlign = "left";
        ctx.fillText(c.nom, paddingLeft, yBarTop - 10);
        
       
        ctx.fillStyle = "#3498db";
        ctx.fillRect(paddingLeft, yBarTop, barWidth, barHeight);
        
       
        ctx.strokeStyle = "#2c3e50";
        ctx.strokeRect(paddingLeft, yBarTop, barWidth, barHeight);
        
        
       
        ctx.fillStyle = "#333";
        ctx.font = "14px sans-serif";
      });
    })
    .catch(error => {
      console.error("Problème avec le JSON ou le canvas :", error);
    });
});

