const PlayB = document.getElementById("start");
const SettingB = document.getElementById("settings");
const firstScene = document.getElementById("startwrapper");

const questWrap = document.getElementById("questWrapp");
const Intro = document.getElementById("enterIntro");
const Video = document.getElementById("myVideo");

const quest = document.getElementById("question");
const ansText = document.getElementsByClassName("ansText");
const answers = document.getElementsByClassName("ans");

const moneyWrap = document.getElementById("moneyCount");
const money = document.getElementsByClassName("money");

let JSON;
let round = 1;
let questIndex;
let prize = 5000;

let clicked = false;

const readFile = async () => {
  try {
    const file = await fetch("./res/json/questions.json");
    return await file.json();
  } catch (e) {
    console.log(e);
  }
};

const rn = (min, max) => {
  return Math.round(Math.random() * (max - min)) + min;
};

PlayB.onclick = () => {
  Intro.classList.remove("disable");
  Video.play()
  firstScene.classList.add("disable");
  setTimeout(() => {
    Intro.classList.add("disable");
    StartGame();
  }, 42000);
};

const placeQuest = async (json) => {
  for (let i = 0; i < 4; i++) {
    ansText[i].innerText = "";
  }

  questIndex = rn(0, 9);

  quest.innerText = json[`${round}`][questIndex]["Question"];

  for (let i = 0; i < 4; i++) {
    let c = i;
    if (i == 1) i = 2;
    else if (i == 2) i = 1;
    setTimeout(() => {
      ansText[i].innerText = json[`${round}`][questIndex]["ans"][i];
    }, i * 1300);
    i = c;
  }
  setTimeout(() => (clicked = true), 3 * 1300);
};

const addMoney = () => {
  for (let i = 2; i > 0; i--) {
    money[i].innerText = money[i - 1].textContent;
  }
  money[0].innerText = `${round + 3}. ${prize}`;
  prize *= 2;
};

[...answers].forEach((target, index) => {
  target.onclick = () => {
    if (clicked) {
      clicked = false;
      switch (index) {
        case 0:
          new Audio("./res/Sounds/a.mp3").play();
          break;
        case 2:
          new Audio("./res/Sounds/b.mp3").play();
          break;
        case 1:
          new Audio("./res/Sounds/c.mp3").play();
          break;
        case 3:
          new Audio("./res/Sounds/d.mp3").play();
          break;
      }

      target.classList.add("clicked");
      setTimeout(() => {
        target.classList.remove("clicked");

        if (index == JSON[`${round}`][questIndex]["correct"]) {
          target.classList.add("correct");
          new Audio("./res/Sounds/win.mp3").play();
          addMoney();
          setTimeout(() => nextRound(), 6000);
        } else {
          target.classList.add("wrong");
          answers[JSON[`${round}`][questIndex]["correct"]].classList.add(
            "correct"
          );
          new Audio("./res/Sounds/lose.mp3").play();
          setTimeout(() => endGame(), 6000);
        }
      }, rn(1500, 3000));
    }
  };
});

const nextRound = () => {
  round++;
  placeQuest(JSON);
  [...answers].forEach((target) => {
    target.classList.remove("correct");
    target.classList.remove("wrong");
  });
};

const endGame = () => {
  firstScene.classList.remove("disable");
  questWrap.classList.add("disable");
  round = 0;
};

const StartGame = async () => {
  JSON = await readFile();
  placeQuest(JSON);
  questWrap.classList.remove("disable");
  moneyWrap.classList.remove("disable");
};
