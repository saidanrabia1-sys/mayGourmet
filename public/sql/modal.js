


// Toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "toast show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Fonction modifier
function modifier(id, nom, prenom, mail, telephone, poste, adresse, presentation, date_recrutement) {
  // Changer le titre du modal
  document.querySelector(".modal-header h2").textContent = "Modifier un membre";

  // Pré-remplir le formulaire
  document.getElementById("nom").value = nom || "";
  document.getElementById("ville").value = ville|| "";
  document.getElementById("mail").value = mail || "";
  document.getElementById("telephone").value = telephone || "";
  document.getElementById("poste").value = poste || "";
  document.getElementById("adresse_postale").value = adresse_postale || "";
  document.getElementById("presentation").value = presentation || "";
  document.getElementById("date_recrutement").value = date_recrutement || "";

  // Ouvrir le modal
  modal.style.display = "block";

  // Gérer le submit du formulaire
  const form = document.querySelector("form");
  form.onsubmit = (e) => {
    e.preventDefault();
    
    const data = {
      nom: document.getElementById("nom").value,
      ville: document.getElementById("ville").value,
      mail: document.getElementById("mail").value,
      telephone: document.getElementById("telephone").value,
      poste: document.getElementById("poste").value,
      adresse_postale: document.getElementById("adresse_postale").value,
      presentation: document.getElementById("presentation").value,
      date_recrutement: document.getElementById("date_recrutement").value
    };

    fetch(`/api/equipe/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => {
      if (res.ok) {
        showToast("Modification réussie !");
        setTimeout(() => location.reload(), 1200);
      } else {
        showToast("Erreur lors de la modification");
      }
    })
    .catch(() => showToast("Erreur lors de la modification"));
  };
}