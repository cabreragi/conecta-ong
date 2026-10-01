/* =========================================
   MENU HAMBÚRGUER
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const opened = navMenu.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", opened);

    menuToggle.textContent = opened ? "✕" : "☰";

});


/* =========================================
   MODAL DE DOAÇÃO
========================================= */

const modal = document.getElementById("donationModal");

const openDonate = document.getElementById("openDonate");
const donateMenu = document.getElementById("donateMenu");

const closeModal = document.getElementById("closeModal");

const projectButtons =
    document.querySelectorAll(".project-button");


function openDonationModal() {

    modal.classList.add("active");

}


function closeDonationModal() {

    modal.classList.remove("active");

}


openDonate.addEventListener("click", openDonationModal);

donateMenu.addEventListener("click", openDonationModal);


projectButtons.forEach(button => {

    button.addEventListener("click", openDonationModal);

});


closeModal.addEventListener("click", closeDonationModal);


modal.addEventListener("click", event => {

    if (event.target === modal) {

        closeDonationModal();

    }

});


/* =========================================
   VALORES DA DOAÇÃO
========================================= */

const donationValues =
    document.querySelectorAll(".donation-value");


donationValues.forEach(button => {

    button.addEventListener("click", () => {

        donationValues.forEach(item =>
            item.classList.remove("selected")
        );

        button.classList.add("selected");

    });

});


/* =========================================
   TOAST
========================================= */

const toast = document.getElementById("toast");

const toastTitle =
    document.getElementById("toastTitle");

const toastMessage =
    document.getElementById("toastMessage");


function showToast(title, message) {

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


/* =========================================
   CONFIRMAR DOAÇÃO
========================================= */

const confirmDonation =
    document.getElementById("confirmDonation");


confirmDonation.addEventListener("click", () => {

    const selected =
        document.querySelector(".donation-value.selected");


    if (!selected) {

        showToast(
            "Selecione um valor",
            "Escolha uma opção antes de continuar."
        );

        return;

    }


    closeDonationModal();


    showToast(
        "Obrigado por apoiar!",
        `Você selecionou uma doação de ${selected.textContent}.`
    );

});


/* =========================================
   FORMULÁRIO
========================================= */

const form =
    document.getElementById("volunteerForm");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const interestInput =
    document.getElementById("interest");


function setError(input, message) {

    const group = input.closest(".form-group");

    const feedback =
        group.querySelector(".feedback");


    group.classList.remove("success");

    group.classList.add("error");

    feedback.textContent = message;

}


function setSuccess(input, message) {

    const group = input.closest(".form-group");

    const feedback =
        group.querySelector(".feedback");


    group.classList.remove("error");

    group.classList.add("success");

    feedback.textContent = message;

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


form.addEventListener("submit", event => {

    event.preventDefault();


    let valid = true;


    /* NOME */

    if (nameInput.value.trim().length < 3) {

        setError(
            nameInput,
            "Informe seu nome completo."
        );

        valid = false;

    } else {

        setSuccess(
            nameInput,
            "Nome preenchido corretamente."
        );

    }


    /* EMAIL */

    if (!validateEmail(emailInput.value)) {

        setError(
            emailInput,
            "Informe um e-mail válido."
        );

        valid = false;

    } else {

        setSuccess(
            emailInput,
            "E-mail válido."
        );

    }


    /* INTERESSE */

    if (interestInput.value === "") {

        setError(
            interestInput,
            "Selecione uma área de interesse."
        );

        valid = false;

    } else {

        setSuccess(
            interestInput,
            "Área selecionada."
        );

    }


    /* SUCESSO */

    if (valid) {

        showToast(
            "Inscrição enviada!",
            "Obrigado por querer fazer parte da nossa equipe."
        );

    } else {

        showToast(
            "Verifique o formulário",
            "Existem campos que precisam ser corrigidos."
        );

    }

});


/* =========================================
   ESC FECHA O MODAL
========================================= */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        modal.classList.contains("active")
    ) {

        closeDonationModal();

    }

});