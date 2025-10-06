document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#pw").addEventListener("click", suggestedPassword);
document.querySelector("#pw").addEventListener("input", validatePassword);
document.querySelector("#pw2").addEventListener("input", matchPasswords);
document.querySelector("#anything").addEventListener("input", availUsername);
document.querySelector("#state").addEventListener("change", displayCounty);

displayStates();

// Updated counties such that they match with the state that was chosen
async function displayCounty() {
    let state = document.querySelector("#state").value;
    let countySelect = document.querySelector("#county");
    countySelect.innerHTML = '<option value="">Select a county...</option>';

    if (!state) return;

    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    try {
        let response = await fetch(url);
        let data = await response.json();

        for (let i of data) {
            let optionElement = document.createElement("option");
            optionElement.textContent = i.county;
            optionElement.value = i.county;
            countySelect.append(optionElement);
        }
    } catch (error) {
        console.log("Network ERROR " + error);
    }
}

// Showing the US states
async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        let data = await response.json();

        let stateSelect = document.querySelector("#state");
        stateSelect.innerHTML = '<option value="">Select a state...</option>';

        for (let i of data) {
            let optionElement = document.createElement("option");
            optionElement.textContent = i.state;
            optionElement.value = i.usps;
            stateSelect.append(optionElement);
        }
    } catch (error) {
        console.log("Network ERROR " + error);
    }
}

// Displaying city, latitude, longitude from ZIP code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let zipError = document.querySelector("#zip-error");
    zipError.textContent = "";

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (!data.city) {
            zipError.textContent = "Zip code not found";
            document.querySelector("#city").textContent = "";
            document.querySelector("#lat").textContent = "";
            document.querySelector("#long").textContent = "";
            return;
        }

        document.querySelector("#city").textContent = data.city;
        document.querySelector("#lat").textContent = data.latitude;
        document.querySelector("#long").textContent = data.longitude;
    } catch (error) {
        console.log("Network ERROR " + error);
        zipError.textContent = "Zip code not found";
        document.querySelector("#city").textContent = "";
        document.querySelector("#lat").textContent = "";
        document.querySelector("#long").textContent = "";
    }
}

// Showing suggested password
async function suggestedPassword() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        let data = await response.json();
        document.querySelector("#pass").textContent = data.password;
    } catch (error) {
        console.log("Network ERROR " + error);
    }
}

// Making sure username is valid
async function availUsername() {
    let choice = document.querySelector("#anything").value;
    let feedback = document.querySelector("#avail");

    if (!choice.trim()) {
        feedback.textContent = "";
        return;
    }

    if (choice.length < 3) {
        feedback.textContent = "Username must be at least 3 characters";
        feedback.style.color = "orange";
        return;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${choice}`;
    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.available) {
            feedback.textContent = "Username Available";
            feedback.style.color = "green";
        } else {
            feedback.textContent = "Username Not Available";
            feedback.style.color = "red";
        }
    } catch (error) {
        console.log("Network ERROR " + error);
        feedback.textContent = "Error checking username";
        feedback.style.color = "red";
    }
}

// Validating password length
function validatePassword() {
    let password = document.querySelector("#pw").value;
    let errorDiv = document.querySelector("#password-error");

    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.id = "password-error";
        errorDiv.style.color = "red";
        document.querySelector("#pw").parentNode.appendChild(errorDiv);
    }

    if (password.length < 6) {
        errorDiv.textContent = "Password must be at least 6 characters long";
        errorDiv.style.display = "block";
    } else {
        errorDiv.textContent = "";
        errorDiv.style.display = "none";
    }
}

// Do passwords match?
function matchPasswords() {
    let pw1 = document.querySelector("#pw").value;
    let pw2 = document.querySelector("#pw2").value;
    let matchSpan = document.querySelector("#match");

    if (pw1 && pw2 && pw1 !== pw2) {
        matchSpan.textContent = "Passwords do not match";
        matchSpan.style.color = "red";
    } else {
        matchSpan.textContent = "";
    }
}
