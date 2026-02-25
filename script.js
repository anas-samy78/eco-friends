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
    q: { ar: "شربت عصير ومفيش سلة قريبة؟", en: "You drank juice and there’s no trash bin nearby?" },
    good: { ar: "تحتفظ بها", en: "Keep it until a bin" },
    bad: { ar: "ترميها في الشارع", en: "Throw it on the street" }
  },
  {
    q: { ar: "لقيت نور شغال ومفيش حد؟", en: "You see a light on and no one around?" },
    good: { ar: "تطفيه", en: "Turn it off" },
    bad: { ar: "تسيبه", en: "Leave it on" }
  },
  {
    q: { ar: "عايز تشتري شنطة؟", en: "Want to buy a bag?" },
    good: { ar: "قماش", en: "Cloth bag" },
    bad: { ar: "بلاستيك", en: "Plastic bag" }
  },
  {
    q: { ar: "لقيت شاطئ مليان قمامة؟", en: "You find a beach full of trash?" },
    good: { ar: "تنضف جزء", en: "Clean part of it" },
    bad: { ar: "تتجاهل", en: "Ignore it" }
  },
  {
    q: { ar: "معاك بطارية قديمة؟", en: "Do you have old batteries?" },
    good: { ar: "تعيد تدويرها", en: "Recycle them" },
    bad: { ar: "ترميها عادي", en: "Throw them away normally" }
  },
  {
    q: { ar: "رايح مشوار قريب؟", en: "Going a short trip?" },
    good: { ar: "تمشي", en: "Walk" },
    bad: { ar: "تركب عربية", en: "Take the car" }
  },
  {
    q: { ar: "هتغسل عربيتك؟", en: "Going to wash your car?" },
    good: { ar: "مياه قليلة", en: "Use less water" },
    bad: { ar: "تسيب الخرطوم مفتوح", en: "Leave the hose open" }
  },
  {
    q: { ar: "شفت شجرة صغيرة؟", en: "You see a small tree?" },
    good: { ar: "تسقيها", en: "Water it" },
    bad: { ar: "تقطعها", en: "Cut it" }
  },
  {
    q: { ar: "هتطبع ورق؟", en: "Going to print paper?" },
    good: { ar: "الوجهين", en: "Double-sided" },
    bad: { ar: "وجه واحد", en: "Single side" }
  },
  {
    q: { ar: "هتشتري مياه؟", en: "Going to buy water?" },
    good: { ar: "زجاجة reusable", en: "Reusable bottle" },
    bad: { ar: "بلاستيك كل مرة", en: "Plastic every time" }
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