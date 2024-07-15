import { Button } from "./components/button/button.js";
const page = document.getElementById('page')

const button1 = Button({
    text: 'defaultBtn',
    action: () => {
        console.log("acao");
    },
    imgSrc: "/assets/register.svg"
})
page.appendChild(button1)

const button12 = Button({
    size: "medium",
    text: 'defaultBtn',
    action: () => {
        console.log("acao");
    },
    imgSrc: "/assets/register.svg"
})
page.appendChild(button12)
console.log(button12);

const button2 = Button({
    text: 'outlinedBtn',
    type: 'outline',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button2)

const button3 = Button({
    text: 'destructiveBtn',
    type: 'destructive',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button3)

const button4 = Button({
    text: 'destrulinedBtn',
    type: 'destructive-outline',
    action: () => {
        console.log("acao");
    }
})
page.appendChild(button4)


