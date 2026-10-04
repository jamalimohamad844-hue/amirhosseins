```javascript
const inputs = [...document.querySelectorAll(".otp-input")];
const otpBoxes = document.getElementById("otpBoxes");

const verifyButton = document.getElementById("verifyButton");
const resendButton = document.getElementById("resendButton");

const timerElement = document.getElementById("timer");
const statusElement = document.getElementById("otpStatus");

const successScreen = document.getElementById("successScreen");


/* ================= INPUT ================= */

inputs.forEach((input, index) => {

  input.addEventListener("input", (event) => {

    let value = event.target.value;

    value = value.replace(/\D/g, "");

    event.target.value = value.slice(-1);

    if (value) {

      input.classList.add("filled");

      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

    } else {

      input.classList.remove("filled");

    }

    clearError();

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

  const nextIndex = Math.min(pasted.length, inputs.length - 1);

  inputs[nextIndex].focus();

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

verifyButton.addEventListener("click", () => {

  const code = getCode();

  if (code.length !== 6) {

    showError("لطفاً کد ۶ رقمی را کامل وارد کنید.");

    return;

  }

  /*
    موقتاً برای تست ظاهر:
    هر کد ۶ رقمی پذیرفته می‌شود.

    بعداً این قسمت را به Supabase OTP واقعی وصل می‌کنیم.
  */

  verifyButton.disabled = true;

  verifyButton.querySelector("span").textContent =
    "در حال بررسی...";

  setTimeout(() => {

    successScreen.classList.add("show");

  }, 700);

});


/* ================= TIMER ================= */

let remainingTime = 30;

function startTimer() {

  remainingTime = 30;

  resendButton.disabled = true;

  updateTimer();

  const interval = setInterval(() => {

    remainingTime--;

    updateTimer();

    if (remainingTime <= 0) {

      clearInterval(interval);

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

  inputs.forEach(input => {

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
