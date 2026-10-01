```javascript
document.addEventListener("DOMContentLoaded", () => {

  // نمایش / مخفی کردن رمز
  document.querySelectorAll(".show-password").forEach(button => {

    button.addEventListener("click", () => {

      const targetId = button.dataset.target;

      const input = targetId
        ? document.getElementById(targetId)
        : document.getElementById("password");

      if (!input) return;

      if (input.type === "password") {
        input.type = "text";
        button.textContent = "◉";
      } else {
        input.type = "password";
        button.textContent = "◉";
      }

    });

  });


  // ورود
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", event => {

      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const message = document.getElementById("loginMessage");

      if (!email || !password) {

        message.textContent = "لطفاً همه فیلدها را کامل کنید.";
        message.style.color = "#b34d35";

        return;
      }

      message.textContent = "فرم ورود آماده است.";
      message.style.color = "#5d806d";

      /*
        این قسمت فعلاً فقط ظاهر و اعتبارسنجی فرم است.
        برای ورود واقعی باید بک‌اند / دیتابیس اضافه شود.
      */

    });

  }


  // ثبت نام
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {

    registerForm.addEventListener("submit", event => {

      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password =
        document.getElementById("registerPassword").value;

      const confirmPassword =
        document.getElementById("confirmPassword").value;

      const message =
        document.getElementById("registerMessage");


      if (!name || !email || !password || !confirmPassword) {

        message.textContent =
          "لطفاً همه فیلدها را کامل کنید.";

        message.style.color = "#b34d35";

        return;
      }


      if (password.length < 8) {

        message.textContent =
          "رمز عبور باید حداقل ۸ کاراکتر باشد.";

        message.style.color = "#b34d35";

        return;
      }


      if (password !== confirmPassword) {

        message.textContent =
          "رمزهای عبور با هم مطابقت ندارند.";

        message.style.color = "#b34d35";

        return;
      }


      message.textContent =
        "ثبت‌نام با موفقیت انجام شد.";

      message.style.color = "#5d806d";

    });

  }

});
```
