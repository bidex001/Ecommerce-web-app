const homeBtn3 = document.querySelector(".homebtn3")
const shopBtn3 = document.querySelector(".shopbtn")
const profileBtn = document.querySelector(".profilebtn")
const inputProfile = document.querySelector("#inputprofile")
const profileDiv = document.querySelector(".sign-img")
const form = document.querySelector("form")
const fname = document.querySelector("#name")
const lname = document.querySelector("#name2")
const email = document.querySelector("#email")
const password = document.querySelector("#pass1")
const confirmPass = document.querySelector("#pass2")
const signBlur = document.querySelector(".signblur")
const signImg = document.querySelector(".signimg-container")
let proArr = []

shopBtn3.addEventListener("click",()=>{
    console.log("click")
    window.location.href = "/shop.html"
})

profileDiv.addEventListener("click",()=>{
    inputProfile.click()
})

inputProfile.addEventListener("change",()=>{
    let file = inputProfile.files[0]
    getUrl(file)
})

function getUrl(file){
    const reader = new FileReader()
    
    if(file && file.type.startsWith("image")){
        reader.readAsDataURL(file)
        reader.addEventListener("loadend",()=>{
           getImg( reader.result)
        })
    }
}

function getImg(url){
    profileDiv.textContent = ""
    const img = document.createElement("img")
    img.src = url
    profileDiv.append(img)
}

const user = {
    name: "",
    fname : "",
    email : "",
    password : "",
    confirm : "",
    profile : ""
}


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    user.name = fname.value
    user.fname = lname.value
    user.email = email.value
    user.password = password.value
    user.confirm = confirmPass.value
    user.profile = profileDiv.querySelector("img").src
    console.log(user)
    proArr.push(user)

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/


    if(!user.name || user.name.length < 3){
        console.log("running")
        const fnameErr = form.querySelector(".surname-err")
        fnameErr.textContent = "fill in a valid name"
        return
    }
    else if(!user.fname || user.fname.length < 3){
        console.log("running")
        const lnameErr =form.querySelector(".fname-err")
        lnameErr.textContent = "fill in a valid name"
        return
    }
    else if (!user.email || !user.email.includes("@") || !user.email.includes(".")){
        console.log("running")
        const emailErr = form.querySelector(".email-err")
        emailErr.textContent = "invalid email address"
        return
    }
    else if(!user.password || !passwordRegex.test(user.password)  ){
        console.log("running")
        const passErr = form.querySelector(".pass-err")
        passErr.textContent = "password must contains atleast uppercase,special character and number"
        return
    }
    else if(user.confirm !== user.password){
        console.log("running")
        const conErr = form.querySelector(".conpass-err")
        conErr.textContent = "password does not match"
        return
    }


    else{
            localStorage.setItem("proArr",JSON.stringify(proArr))

    signBlur.classList.toggle("signhidden")
    showsuccessful()
    }
})

function showsuccessful(){
    const successfulDiv = document.querySelector(".sucessful")
    successfulDiv.textContent = ""
   const profileInfo = JSON.parse(localStorage.getItem("proArr"))
   console.log(profileInfo)

   profileInfo.map((item)=>{
    const img = document.createElement("img")
    img.src = item.profile
    const name = document.createElement("h2")
    name.textContent = `${item.name + item.fname}`
    const innerDiv = document.createElement("div")
    const para = document.createElement("p")
    para .textContent = `account created successful`
    const icon = document.createElement("span")
    icon.innerHTML = `<i class="fa-solid fa-user-check"></i>`
    const btn = document.createElement("a")
    btn.textContent = "continue"
   btn.href = "/"
   btn.className = "continuebtn"
    innerDiv.append(para,icon)
    successfulDiv.append(img,name,innerDiv,btn)
   })
}


async function fetchData(){
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    console.log(data)
    showSignItem(data)
}
fetchData()
function showSignItem(data){
    // signImg.textContent = ""
    const images = data.products.slice(14,15)
    images.map((item)=>{
        const img = document.createElement("img")
        img.src = item.images[0]
        signImg.append(img)
    })
}

