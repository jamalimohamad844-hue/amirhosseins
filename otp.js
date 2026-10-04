```javascript
const inputs = [...document.querySelectorAll(".otp-input")];

const otpBoxes = document.getElementById("otpBoxes");
const verifyButton = document.getElementById("verifyButton");
const resendButton = document.getElementById("resendButton");

const timerElement = document.getElementById("timer");
const statusElement = document.getElementById("otpStatus");

const successScreen = document.getElementById("successScreen");

let isVerifying = false;


/* ================= INPUT ================= */

inputs.forEach((input, index) => {

  input.addEventListener("input", () => {

    let value = input.value.replace(/\D/g, "");

    input.value = value.slice(-1);

    if (input.value) {

      input.classList.add("filled");

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

    } else {

      input.classList.remove("filled");

    }

    clearError();

    /* وقتی رقم ششم وارد شد */
    if (getCode().length === 6) {
      startVerification();
    }

  });


  input.addEventListener("keydown", (event) => {

    if (
      event.key === "Backspace" &&
      !input.value &&
      index > 0
    ) {

      inputs[index - 1].focus();

      inputs[index - 1].value = "";

      inputs[index - 1].classList.remove("filled");

    }

  });

});


/* ================= PASTE ================= */

inputs[0].addEventListener("paste", (event) => {

  event.preventDefault();

  const pasted = event.clipboardData
    .getData("text")
    .replace(/\D/g, "")
    .slice(0, 6);

  pasted.split("").forEach((digit, index) => {

    if (inputs[index]) {

      inputs[index].value = digit;
      inputs[index].classList.add("filled");

    }

  });

  if (pasted.length === 6) {
    startVerification();
  } else {

    const nextIndex =
      Math.min(pasted.length, inputs.length - 1);

    inputs[nextIndex].focus();

  }

});


/* ================= GET CODE ================= */

function getCode() {

  return inputs
    .map(input => input.value)
    .join("");

}


/* ================= ERROR ================= */

function showError(message) {

  statusElement.textContent = message;

  statusElement.classList.add("show");

  otpBoxes.classList.remove("error");

  void otpBoxes.offsetWidth;

  otpBoxes.classList.add("error");

}

function clearError() {

  statusElement.textContent = "";

  statusElement.classList.remove("show");

  otpBoxes.classList.remove("error");

}


/* ================= VERIFY ================= */

function startVerification() {

  if (isVerifying) return;

  if (getCode().length !== 6) return;

  isVerifying = true;

  verifyButton.classList.add("verifying");

  verifyButton.querySelector("span").textContent =
    "در حال بررسی...";

  inputs.forEach(input => {
    input.disabled = true;
  });

  /*
    فعلاً تستی است.
    بعداً اینجا OTP واقعی Supabase قرار می‌گیرد.
  */

  setTimeout(() => {

    successScreen.classList.add("show");

  }, 1200);

}


/* ================= BUTTON ================= */

verifyButton.addEventListener("click", () => {

  if (getCode().length !== 6) {

    showError("لطفاً کد ۶ رقمی را کامل وارد کنید.");

    return;

  }

  startVerification();

});


/* ================= TIMER ================= */

let remainingTime = 30;
let timerInterval;

function startTimer() {

  clearInterval(timerInterval);

  remainingTime = 30;

  resendButton.disabled = true;

  updateTimer();

  timerInterval = setInterval(() => {

    remainingTime--;

    updateTimer();

    if (remainingTime <= 0) {

      clearInterval(timerInterval);

      resendButton.disabled = false;

      timerElement.textContent = "";

    }

  }, 1000);

}

function updateTimer() {

  timerElement.textContent =
    `00:${String(remainingTime).padStart(2, "0")}`;

}


/* ================= RESEND ================= */

resendButton.addEventListener("click", () => {

  clearError();

  isVerifying = false;

  verifyButton.classList.remove("verifying");

  verifyButton.querySelector("span").textContent =
    "تأیید کد";

  inputs.forEach(input => {

    input.disabled = false;

    input.value = "";

    input.classList.remove("filled");

  });

  inputs[0].focus();

  startTimer();

});


/* ================= START ================= */

startTimer();

inputs[0].focus();
```
