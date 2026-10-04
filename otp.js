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

      // رفتن خودکار به کادر بعدی
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      }

    } else {

      input.classList.remove("filled");

    }

    clearError();

    // بعد از وارد شدن رقم ششم
    if (getCode().length === 6) {
      startVerification();
    }

  });


  /* ================= BACKSPACE ================= */

  input.addEventListener("keydown", (event) => {

    if (event.key === "Backspace") {

      if (input.value) {

        input.value = "";
        input.classList.remove("filled");

      } else if (index > 0) {

        inputs[index - 1].focus();

        inputs[index - 1].value = "";

        inputs[index - 1].classList.remove("filled");

      }

    }


    /* ================= ARROW KEYS ================= */

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputs[index - 1].focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < inputs.length - 1
    ) {
      inputs[index + 1].focus();
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

    const nextIndex = Math.min(
      pasted.length,
      inputs.length - 1
    );

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

  clearError();

  /* جلوگیری از ورود دوباره */
  inputs.forEach(input => {
    input.disabled = true;
  });


  /* دکمه در حال بررسی */
  verifyButton.classList.add("verifying");

  verifyButton.querySelector("span").textContent =
    "در حال بررسی...";


  /*
  شروع انیمیشن کادرهای OTP
  */

  otpBoxes.classList.add("checking");


  /*
  بعد از چرخش کادرها
  نمایش تیک سبز
  */

  setTimeout(() => {

    otpBoxes.classList.remove("checking");

    otpBoxes.classList.add("success");

  }, 900);


  /*
  نمایش صفحه موفقیت
  */

  setTimeout(() => {

    successScreen.classList.add("show");

  }, 1250);

}


/* ================= BUTTON ================= */

verifyButton.addEventListener("click", () => {

  if (getCode().length !== 6) {

    showError(
      "لطفاً کد ۶ رقمی را کامل وارد کنید."
    );

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

  otpBoxes.classList.remove(
    "checking",
    "success"
  );

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
