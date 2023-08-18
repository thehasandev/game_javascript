let allPost = document.querySelector(".allpost");
let names = document.querySelector(".name");
let password = document.querySelector(".password");
let post = document.querySelector(".post");
let update = document.querySelector(".update");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let game = document.querySelector(".game");
let gameInput = document.querySelector(".gameInput");
let gameButton = document.querySelector(".gameButton");
let result = document.querySelector(".result");
let chance = document.querySelector(".chance");
let error = document.querySelector(".error");
let no = document.querySelector(".no");
no.innerHTML = "No Game";

//Disable Btn Add
names.addEventListener("input", updateValue);
function updateValue() {
  if (names.value != "" && password.value != "") {
    post.classList.remove("disabled");
  }
}

password.addEventListener("input", updateValue);
function updateValue() {
  if (names.value != "" && password.value != "" && password.value - 99.99) {
    post.classList.remove("disabled");
  }
}
//Disable Btn End

post.addEventListener("click", () => {
  allPost.innerHTML = "";
  demoArray.push({
    name: names.value,
    des: password.value,
  });
  dispaly();
  result.innerHTML = ""
  names.value = "";
  password.value = "";
  post.classList.add("disabled");
  if (demoArray.length > 0) {
    no.innerHTML = "";
  } else {
    no.innerHTML = "No Game";
  }
});

let demoArray = [];

function dispaly() {
  demoArray.map((item) => {
    allPost.innerHTML += `
        <div
        class="card"
        style="width: 18rem; margin-right: 10px; margin-top: 10px"
      >
        <div class="card-body">
          <h5 class="card-title">${item.name}</h5>
          <p class="card-text">
            ${item.des}
          </p>
          <a href="#" class="btn btn-primary start">Start</a>
          <a href="#" class="btn btn-success edit">Edit</a>
          <a href="#" class="btn btn-danger delete">Delete</a>
        </div>
      </div>`;
  });
  //Delete btn Start
  let deleteBtn = document.querySelectorAll(".delete");
  let deleteArray = Array.from(deleteBtn);
  deleteArray.map((item, index) => {
    item.addEventListener("click", () => {
      allPost.innerHTML = "";
      demoArray.splice(index, 1);
      dispaly();
      if (demoArray.length > 0) {
        no.innerHTML = "";
      } else {
        no.innerHTML = "No Game";
        result.innerHTML =""
      }
    });
  });
  //Delete btn end

  //Edit btn Start
  let edit = document.querySelectorAll(".edit");
  let editArray = Array.from(edit);

  editArray.map((item, index) => {
    item.addEventListener("click", () => {
      updateIndex = index;
      names.value = demoArray[index].name;
      password.value = demoArray[index].des;
      post.style.display = "none";
      update.style.display = "inline-block";
    });
  });
  //Edit btn End

  //Start btn Start
  let start = document.querySelectorAll(".start");
  let startArray = Array.from(start);

  startArray.map((item, index) => {
    item.addEventListener("click", () => {
      item.classList.add("disabled");
      startIndex = index;
      one.style.display = "none";
      game.style.display = "inline-block";
      chance.innerHTML = `Chance : ${count}`;
      result.innerHTML = "";
    });
  });
  //Start btn End
}

//update btn Start
let updateIndex;

update.addEventListener("click", () => {
  allPost.innerHTML = "";
  demoArray[updateIndex] = {
    name: names.value,
    des: password.value ,
  };

  dispaly();
  names.value = "";
  password.value = "";
  post.classList.add("disabled");
  update.style.display = "none";
  post.style.display = "inline-block";
});

//update btn End

let startIndex;
let count = 5;
//Game Start
gameButton.addEventListener("click", () => {
  if (!gameInput.value) {
    error.innerHTML = "Plase entar somthing";
  } else if (!(gameInput.value - 99)) {
    error.innerHTML = "Plase entar number";
  } else {
    error.innerHTML = "";
    if (count > 1) {
      count--;
      chance.innerHTML = `Chance : ${count}`;
      if (gameInput.value == demoArray[startIndex].des) {
        result.innerHTML = `${demoArray[startIndex].name} is Pass`;
        one.style.display = "inline-block";
        game.style.display = "none";
        count = 5;
        gameInput.value = ""
      }
    } else {
      count = 0;
      chance.innerHTML = `Chance : ${count}`;
      // gameButton.style.display = "none";
      result.innerHTML = `${demoArray[startIndex].name} is Fail`;
      game.style.display = "none";
      one.style.display = "inline-block";
      count = 5;
      gameInput.value = ""
    }
  }
});
//Game End
