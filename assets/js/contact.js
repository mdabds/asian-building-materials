/**
 * ===========================================
 * Contact Form Handler
 * ===========================================
 */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".contact-form");

    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const email = form.querySelector('input[type="email"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const subject = form.querySelectorAll('input[type="text"]')[1].value.trim();
        const message = form.querySelector("textarea").value.trim();

        if (!name || !email || !phone || !message) {

            showNotification(
                "Please fill in all required fields.",
                "error"
            );

            return;

        }

        if (!validateEmail(email)) {

            showNotification(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        try {

            /**
             * Replace this with your backend endpoint
             */

            /*
            await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    subject,
                    message
                })
            });
            */

            await new Promise(resolve => setTimeout(resolve, 1200));

            showNotification(
                "Thank you! Your enquiry has been sent successfully.",
                "success"
            );

            form.reset();

        } catch (error) {

            console.error(error);

            showNotification(
                "Unable to send your enquiry. Please try again.",
                "error"
            );

        } finally {

            submitButton.disabled = false;
            submitButton.innerHTML = "Send Enquiry";

        }

    });

});

/**
 * ===========================================
 * Email Validation
 * ===========================================
 */

function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

/**
 * ===========================================
 * Toast Notification
 * ===========================================
 */

function showNotification(message, type = "success") {

    let notification = document.querySelector(".notification");

    if (notification) {

        notification.remove();

    }

    notification = document.createElement("div");

    notification.className = `notification ${type}`;

    notification.innerHTML = message;

    document.body.appendChild(notification);

    requestAnimationFrame(() => {

        notification.classList.add("show");

    });

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        }, 300);

    }, 3500);

}