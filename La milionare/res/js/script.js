const PlayB = document.getElementById("start")
const SettingB = document.getElementById("settings")
const firstScene = document.getElementById("startwrapper")

const questWrap = document.getElementById("questWrapp")

const Intro = document.getElementById("enterIntro")
const Video = document.getElementById("myVideo")


PlayB.onclick = () => {
    Intro.classList.remove('disable')
    Video.play()
    firstScene.classList.add('disable')

    setTimeout(()=> {
        StartGame();
        Intro.classList.add('disable')
    }, 44000)
}

const StartGame = () => {

    questWrap.classList.remove('disable')




}

