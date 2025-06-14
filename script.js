const categoryDiv = document.querySelector(".categorydiv")
const sliderDiv = document.querySelector(".slider")
const trackDiv = document.querySelector(".track")
const leftArrowBtn = document.querySelector(".leftarrow")
const rightArrowBtn = document.querySelector(".rightarrow")
const sec3Container = document.querySelector(".container")
const shopBtn = document.querySelectorAll(".shopbtn")
let homeBtn = document.querySelector(".homebtn")
const signBtn = document.querySelector(".signbtn")
const homeProfile = document.querySelector(".home-profile")
const proDiv = document.querySelector(".prodiv")
const backUp = document.querySelector(".backup")
const navBtn = document.querySelector(".navbtn")
const navBack = document.querySelector(".navback")

navBtn.addEventListener("click",()=>{
    navBack.classList.toggle("navhidden")
})

async function fetchData(){
    const response = await fetch("https://dummyjson.com/products")
    const data = await response.json()
    console.log(data)
    showCategory(data)
    slider(data)
    showSamples(data)
    section3(data)
    showbackup(data)
}
fetchData()

function showbackup(data){
    backUp.textContent = ""
       const sample = data.products.slice(11,17)
    console.log(sample)
    sample.map((item)=>{
        const itemDiv = document.createElement("div")
        itemDiv.classList.add("sample-item-div")
        const imgDiv = document.createElement("div")
        imgDiv.className = "sample-img-div"
        const img = document.createElement("img")
        img.src = item.images[0]
        const name = document.createElement("h2")
        name.textContent = item.title
        const price = document.createElement("span")
        price.textContent = `$${item.price}`
        const availability = document.createElement("p")
        availability.textContent = item.availabilityStatus
        const bottomDiv = document.createElement("div")
        bottomDiv.className = "sample-bottom-div"
        imgDiv.append(img)
        bottomDiv.append(name,price,availability)
        itemDiv.append(imgDiv,bottomDiv)
        backUp.append(itemDiv)
    })

}

function showCategory(data){
    const categoryArr = []
    data.products.map((item)=>{
        categoryDiv.textContent = ""
        if(!categoryArr.includes(item.category)){
            categoryArr.push(item.category)
        }

        categoryArr.map((item)=>{
            const para = document.createElement("p")
            para.textContent = item
            categoryDiv.append(para)
        })
    })
}


let index = 0
const slideWidth = sliderDiv.clientWidth

function slider(data){
    sliderDiv.textContent = ""
    const images = data.products.slice(0,4)
        images.map((item)=>{
        const imgDiv = document.createElement("div")
        imgDiv.className = "imgdiv"

        const img = document.createElement("img")
        img.src = item.images[0]

        const title = document.createElement("h1")
        title.textContent = item.title

        const description = document.createElement("p")
        description.textContent = item.description

        const shopBtn = document.createElement("button")
        shopBtn.innerHTML = `<span>shop now</span>`
        shopBtn.addEventListener("click",()=>{
            window.location.href = "/shop.html"
        })

        const rightDiv = document.createElement("div")
        rightDiv.className = "slirightdiv"
        const overAllDiv = document.createElement("div")
        overAllDiv.className = "sliderall"

        imgDiv.append(img)
        rightDiv.append(title,description,shopBtn)
        overAllDiv.append(imgDiv,rightDiv)
        sliderDiv.append(overAllDiv)

    })

       const firstClone  = sliderDiv.children[0].cloneNode(true)
   sliderDiv.append(firstClone)

   setInterval(()=>{
    index++
    sliderDiv.style.transform = `translateX(-${index * slideWidth}px)`
    sliderDiv.style.transition = `0.5s ease-in-out`

    if(index === images.length){
        setTimeout(()=>{
            sliderDiv.style.transition = "none"
            sliderDiv.style.transform = `translateX(0px)`
            index = 0
        },500)
    }
},6000)

}

function showSamples(data){
    trackDiv.textContent = ""
    const sample = data.products.slice(11,19)
    console.log(sample)
    sample.map((item)=>{
        const itemDiv = document.createElement("div")
        itemDiv.classList.add("sample-item-div")
        const imgDiv = document.createElement("div")
        imgDiv.className = "sample-img-div"
        const img = document.createElement("img")
        img.src = item.images[0]
        const name = document.createElement("h2")
        name.textContent = item.title
        const price = document.createElement("span")
        price.textContent = `$${item.price}`
        const availability = document.createElement("p")
        availability.textContent = item.availabilityStatus
        const bottomDiv = document.createElement("div")
        bottomDiv.className = "sample-bottom-div"
        imgDiv.append(img)
        bottomDiv.append(name,price,availability)
        itemDiv.append(imgDiv,bottomDiv)
        trackDiv.append(itemDiv)
    })
}


let currentIndex = 0
const visibleItem = 4

function totalItem(){
    return trackDiv.children.length
}

function slide(){
   const item = document.querySelector(".sample-item-div")
   if(!item) return;
   const itemWidth = item.offsetWidth + 10;
    trackDiv.style.transform = `translateX(-${currentIndex * itemWidth}px)`
}

leftArrowBtn.addEventListener("click",()=>{
    if (currentIndex > 0){
        currentIndex--
        slide()
    }
})

rightArrowBtn.addEventListener("click",()=>{
    if(currentIndex < totalItem() - visibleItem){
        currentIndex++
        slide()
    }
})

function section3(data){
    const description = document.querySelector("#description")
    const img = document.querySelector("#sec3img")
    let random = Math.floor(Math.random() * 30) + 1
    const images = data.products[random]
    console.log(images)

    description.textContent = images.description
    console.log(description)
    img.src = images.images[0]

}

shopBtn.forEach((btn)=>{
  btn.addEventListener("click",()=>{
    window.location.href = "/shop.html"
  })
})

homeBtn.addEventListener("click",()=>{
    window.location.href = "/index.html"
})

signBtn.addEventListener("click",()=>{
    if(!localStorage.getItem("proArr")){
         window.location.href = "/signup.html"
    }
})

function homeProFunc(){
    homeProfile.textContent = ""
    const profile = JSON.parse(localStorage.getItem("proArr"))
    if(!profile){
        homeProfile.innerHTML =`<i class="fa-regular fa-user"></i>`
        // proDiv.classList.add("prohidden")
        
        homeProfile.addEventListener("click",()=>{
            window.location.href = "/signup.html"
        })
    }

    profile.map((item)=>{
        const img = document.createElement("img")
        img.src = item.profile
        homeProfile.append(img)
    })
}
homeProFunc()

homeProfile.addEventListener("click",()=>{
    if (proDiv.classList.contains("prohidden")){
        proDiv.classList.remove("prohidden")
    }
    else{
        proDiv.classList.add("prohidden")
    }

    proDiv.textContent = ""
    const profile = JSON.parse(localStorage.getItem("proArr"))||[]
    profile.map((item)=>{
        const img = document.createElement("img")
        img.src = item.profile
        const name = document.createElement("h2")
        name.textContent = `${item.name + item.fname}`
        const mail = document.createElement("p")
        mail.textContent = item.email
        const logOut = document.createElement("button")
        logOut.textContent = "log-out"
        logOut.className = "logout"
         logOut.addEventListener("click",()=>{
         localStorage.removeItem("proArr");
         proDiv.textContent = "";
         proDiv.classList.add("prohidden");
         homeProfile.innerHTML = `<i class="fa-regular fa-user"></i>`
        })
        proDiv.append(img,name,mail,logOut)
    })
})