/* ================= MOBILE MENU ================= */

function toggleMenu() {

    const nav =
        document.getElementById("navLinks");

    nav.classList.toggle("show");

}


/* ================= SELECT ROOM ================= */

function selectRoom(roomName) {

    document.getElementById("room").value =
        roomName;

    document.getElementById("booking")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================= BOOKING VALIDATION ================= */

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value.trim();

        const email =
            document.getElementById("email")
            .value.trim();

        const phone =
            document.getElementById("phone")
            .value.trim();

        const room =
            document.getElementById("room")
            .value;

        const checkin =
            document.getElementById("checkin")
            .value;

        const checkout =
            document.getElementById("checkout")
            .value;

        const guests =
            document.getElementById("guests")
            .value;

        const message =
            document.getElementById(
                "bookingMessage"
            );


        message.style.color = "red";


        /* NAME */

        if (name.length < 3) {

            message.textContent =
                "Please enter your full name.";

            return;
        }


        /* EMAIL */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            message.textContent =
                "Please enter a valid email address.";

            return;
        }


        /* PHONE */

        if (!/^[0-9]{10}$/.test(phone)) {

            message.textContent =
                "Please enter a valid 10-digit phone number.";

            return;
        }


        /* ROOM */

        if (room === "") {

            message.textContent =
                "Please select a room.";

            return;
        }


        /* DATES */

        if (!checkin || !checkout) {

            message.textContent =
                "Please select check-in and check-out dates.";

            return;
        }


        if (
            new Date(checkout)
            <= new Date(checkin)
        ) {

            message.textContent =
                "Check-out must be after check-in.";

            return;
        }


        /* GUESTS */

        if (guests === "") {

            message.textContent =
                "Please select the number of guests.";

            return;
        }


        /* SAVE BOOKING */

        const booking = {

            name: name,

            email: email,

            phone: phone,

            room: room,

            checkin: checkin,

            checkout: checkout,

            guests: guests,

            date: new Date().toLocaleString()

        };


        const bookings =
            JSON.parse(
                localStorage.getItem(
                    "hotelBookings"
                )
            ) || [];


        bookings.push(booking);


        localStorage.setItem(
            "hotelBookings",
            JSON.stringify(bookings)
        );


        /* SUCCESS */

        message.style.color = "green";

        message.textContent =
            "✓ Booking submitted successfully!";


        bookingForm.reset();

    }
);


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "contactName"
            ).value.trim();


        const email =
            document.getElementById(
                "contactEmail"
            ).value.trim();


        const message =
            document.getElementById(
                "contactMessage"
            ).value.trim();


        const result =
            document.getElementById(
                "contactMessageResult"
            );


        result.style.color = "red";


        if (name.length < 2) {

            result.textContent =
                "Please enter your name.";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            result.textContent =
                "Please enter a valid email.";

            return;
        }


        if (message.length < 10) {

            result.textContent =
                "Message must contain at least 10 characters.";

            return;
        }


        result.style.color = "green";

        result.textContent =
            "✓ Your message has been sent successfully!";


        contactForm.reset();

    }
);


/* ================= DATE VALIDATION ================= */

const today =
    new Date()
    .toISOString()
    .split("T")[0];


document
    .getElementById("checkin")
    .setAttribute("min", today);


document
    .getElementById("checkout")
    .setAttribute("min", today);


document
    .getElementById("checkin")
    .addEventListener(
        "change",
        function() {

            document
                .getElementById("checkout")
                .setAttribute(
                    "min",
                    this.value
                );

        }
    );
