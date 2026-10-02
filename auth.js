const SUPABASE_URL = "https://vfkfrjobbkgkvztbqzbi.supabase.co";
const SUPABASE_KEY = "sb_publishable_w60DsuaplSnwg7LYSsgqDA_M_1W8t9g";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// =========================
// نمایش / مخفی کردن رمز
// =========================

document.querySelectorAll(".show-password").forEach(button => {

  button.addEventListener("click", () => {

    const targetId = button.dataset.target || "password";
    const input = document.getElementById(targetId);

    if (!input) return;

    input.type =
      input.type === "password"
        ? "text"
        : "password";

  });

});


// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

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
      "در حال ساخت حساب...";

    message.style.color = "#9a8061";


    const { error } =
      await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {
          data: {
            full_name: name
          }
        }

      });


    if (error) {

      console.error("Supabase signup error:", error);

      message.textContent =
        error.message;

      message.style.color = "#b34d35";

      return;
    }


    message.textContent =
      "حساب با موفقیت ساخته شد.";

    message.style.color = "#5d806d";

  });

}


// =========================
// LOGIN
// =========================

const loginForm =
  document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;


    const message =
      document.getElementById("loginMessage");


    if (!email || !password) {

      message.textContent =
        "لطفاً ایمیل و رمز عبور را وارد کنید.";

      message.style.color = "#b34d35";

      return;
    }


    message.textContent =
      "در حال ورود...";

    message.style.color = "#9a8061";


    const { error } =
      await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

      });


    if (error) {

      console.error("Supabase login error:", error);

      message.textContent =
        "ایمیل یا رمز عبور اشتباه است.";

      message.style.color = "#b34d35";

      return;
    }


    message.textContent =
      "ورود موفق بود.";

    message.style.color = "#5d806d";


    setTimeout(() => {

      window.location.href =
        "index.html";

    }, 800);

  });

}
// =========================
// USER MENU
// =========================

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const userMenu = document.getElementById("userMenu");
const userWelcome = document.getElementById("userWelcome");
const logoutBtn = document.getElementById("logoutBtn");

async function updateUserMenu() {

  if (!loginBtn || !registerBtn || !userMenu) {
    return;
  }

  const {
    data: {
      user
    }
  } = await supabaseClient.auth.getUser();


  if (user) {

    loginBtn.style.display = "none";
    registerBtn.style.display = "none";

    userMenu.style.display = "flex";

    const name =
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "کاربر";

    userWelcome.textContent =
      `سلام ${name} 👋`;

  } else {

    loginBtn.style.display = "inline-flex";
    registerBtn.style.display = "inline-flex";

    userMenu.style.display = "none";

  }

}


// =========================
// LOGOUT
// =========================

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    logoutBtn.disabled = true;
    logoutBtn.textContent = "در حال خروج...";

    const { error } =
      await supabaseClient.auth.signOut();

    if (error) {

      console.error("Logout error:", error);

      logoutBtn.disabled = false;
      logoutBtn.textContent = "خروج";

      return;
    }

    window.location.reload();

  });

}


updateUserMenu();
// =========================
// USER MENU
// =========================

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const userMenu = document.getElementById("userMenu");
const userWelcome = document.getElementById("userWelcome");
const logoutBtn = document.getElementById("logoutBtn");


async function updateUserMenu() {

  if (!loginBtn || !registerBtn || !userMenu) {
    return;
  }

  const {
    data: {
      user
    }
  } = await supabaseClient.auth.getUser();


  if (user) {

    loginBtn.style.display = "none";
    registerBtn.style.display = "none";

    userMenu.style.display = "flex";

    const name =
      user.user_metadata?.full_name ||
      user.email?.split("@")[0] ||
      "کاربر";

    userWelcome.textContent =
      `سلام ${name} 👋`;

  } else {

    loginBtn.style.display = "inline-flex";
    registerBtn.style.display = "inline-flex";

    userMenu.style.display = "none";

  }

}


// =========================
// LOGOUT
// =========================

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    logoutBtn.disabled = true;
    logoutBtn.textContent = "در حال خروج...";


    const { error } =
      await supabaseClient.auth.signOut();


    if (error) {

      console.error("Logout error:", error);

      logoutBtn.disabled = false;
      logoutBtn.textContent = "خروج";

      return;
    }


    window.location.reload();

  });

}


updateUserMenu();
