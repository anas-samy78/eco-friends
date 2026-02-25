// Navbar color on scroll
window.addEventListener("scroll", function(){
    let navbar = document.getElementById("navbar");
    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// تغيير اللغة
document.getElementById("languageSwitcher").addEventListener("change", function () {
    let lang = this.value;

    if(lang === "ar"){
        document.documentElement.lang = "ar";
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.lang = "en";
        document.documentElement.dir = "ltr";
    }

    document.querySelectorAll("[data-ar]").forEach(el => {
        el.textContent = el.getAttribute("data-" + lang);
    });

    // بعد تغيير اللغة، أعد تحميل الأسئلة
    loadQuiz(lang);
});

// الاسئلة التفاعلية بدعم الترجمة
let quizData = [
  {
    q: { ar: "شربتَ عصيرًا ولا توجد سلة مهملات قريبة؟", en: "You drank juice and there’s no trash bin nearby?" },
    good: { ar: "تحتفظ بها حتى تجد سلة", en: "Keep it until a bin" },
    bad: { ar: "ترميها في الشارع", en: "Throw it on the street" }
  },
  {
    q: { ar: "وجدتَ ضوءًا مُشغَّلًا ولا يوجد أحد؟", en: "You see a light on and no one around?" },
    good: { ar: "تُطفِئه", en: "Turn it off" },
    bad: { ar: "تتركه مُشغَّلًا", en: "Leave it on" }
  },
  {
    q: { ar: "تريد شراء حقيبة؟", en: "Want to buy a bag?" },
    good: { ar: "حقيبة قماشية", en: "Cloth bag" },
    bad: { ar: "حقيبة بلاستيكية", en: "Plastic bag" }
  },
  {
    q: { ar: "وجدتَ شاطئًا مليئًا بالقمامة؟", en: "You find a beach full of trash?" },
    good: { ar: "تُنظِّف جزءًا منه", en: "Clean part of it" },
    bad: { ar: "تتجاهله", en: "Ignore it" }
  },
  {
    q: { ar: "هل لديك بطاريات قديمة؟", en: "Do you have old batteries?" },
    good: { ar: "تُعيد تدويرها", en: "Recycle them" },
    bad: { ar: "ترميها بشكل عادي", en: "Throw them away normally" }
  },
  {
    q: { ar: "ذاهب في مشوار قريب؟", en: "Going a short trip?" },
    good: { ar: "تمشي على الأقدام", en: "Walk" },
    bad: { ar: "تستخدم السيارة", en: "Take the car" }
  },
  {
    q: { ar: "هل ستغسل سيارتك؟", en: "Going to wash your car?" },
    good: { ar: "تستخدم كمية قليلة من الماء", en: "Use less water" },
    bad: { ar: "تترك الخرطوم مفتوحًا", en: "Leave the hose open" }
  },
  {
    q: { ar: "رأيت شجرة صغيرة؟", en: "You see a small tree?" },
    good: { ar: "تسقيها", en: "Water it" },
    bad: { ar: "تقطعها", en: "Cut it" }
  },
  {
    q: { ar: "هل ستطبع أوراقًا؟", en: "Going to print paper?" },
    good: { ar: "الطباعة على الوجهين", en: "Double-sided" },
    bad: { ar: "الطباعة على وجه واحد", en: "Single side" }
  },
  {
    q: { ar: "هل ستشتري ماءً؟", en: "Going to buy water?" },
    good: { ar: "زجاجة قابلة لإعادة الاستخدام", en: "Reusable bottle" },
    bad: { ar: "زجاجة بلاستيكية في كل مرة", en: "Plastic every time" }
  }
];

let score = 0;
let quiz = document.getElementById("quiz");

// دالة لإنشاء الأسئلة بحسب اللغة المختارة
function loadQuiz(lang) {
    quiz.innerHTML = "";
    quizData.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = `
            <h3>${item.q[lang]}</h3>
            <button onclick="addScore(true,this)"> ${item.good[lang]}</button>
            <button onclick="addScore(false,this)"> ${item.bad[lang]}</button>
            <hr>
        `;
        quiz.appendChild(div);
    });
}

// في البداية نحمّل الأسئلة بالعربية
loadQuiz("ar");

function addScore(isGood,btn){
    if(isGood){
        score++;
        btn.style.background="green";
    } else {
        btn.style.background="red";
    }
    document.getElementById("score").innerText =
      (document.getElementById("languageSwitcher").value === "ar" ? "نقاطك: " : "Your Score: ")
      + score;
}
