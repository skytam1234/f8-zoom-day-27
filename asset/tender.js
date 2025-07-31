$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const tenderView = $(".tender-view");
const listItem = $(".list-item");
const likeBtn = $(`.around-like`);
const dislikeBtn = $(`.around-dislike`);
let isMove = false;
let isNext = false;
let balance = 0;
let pointStart = { x: 0, y: 0 };
const players = [
  { id: 0, avatar: "tender1.jpg" },
  { id: 1, avatar: "tender2.jpg" },
  { id: 2, avatar: "tender3.jpg" },
  { id: 3, avatar: "tender4.jpg" },
  { id: 4, avatar: "tender5.jpg" },
  { id: 5, avatar: "tender6.jpg" },
];
const disliked = [];
const likes = [];
function handleMouseenter(element) {
  element.style.background = `rgb(238, 167, 188)`;
  element.style.transform = `translateY(-10px)`;
}
function handleMouseleave(element) {
  element.style.background = `#fff`;
  element.style.transform = `none`;
}
likeBtn.onmouseenter = function () {
  handleMouseenter(this);
};
dislikeBtn.onmouseenter = function () {
  handleMouseenter(this);
};
likeBtn.onmouseleave = function () {
  handleMouseleave(this);
};
dislikeBtn.onmouseleave = function () {
  handleMouseleave(this);
};

function renderPlayer(players) {
  players.forEach((player, index) => {
    const html = ` <div class="overlay"></div>
                            <img
                                src="./asset/img/${player.avatar}"
                                alt="anh-tender"
                                class="item-img"
                            />`;
    const divElement = document.createElement("div");
    divElement.className = "item";
    divElement.id = player.id;

    divElement.innerHTML = html;
    listItem.appendChild(divElement);
  });
}
renderPlayer(players);
function getTopItem() {
  const items = $$(".item");
  return items[items.length - 1];
}

tenderView.addEventListener("mousedown", function (e) {
  e.preventDefault();
  const item = getTopItem();
  if (!item || !e.target.closest(".item") || e.target.closest(".item") !== item)
    return;
  isMove = true;
  pointStart = { x: e.clientX, y: e.clientY };
});

tenderView.addEventListener("mousemove", function (e) {
  if (!isMove) return;
  const items = $$(".item");
  const item = getTopItem();
  if (!item) return;
  const overlay = item.querySelector(".overlay");
  let point = { x: e.clientX, y: e.clientY };
  let check = (point.x - pointStart.x) / 75;

  if (Math.abs(check) < 1) {
    isNext = false;
    if (check < 0) {
      overlay.style.background = `rgba(243, 72, 4, 0.5)`;
      dislikeBtn.onmouseenter();
      balance = -1;
    } else if (check > 0) {
      overlay.style.background = `rgba(11, 230, 102, 0.5)`;
      likeBtn.onmouseenter();
      balance = 1;
    } else {
      overlay.style.background = `rgba(11, 230, 102, 0)`;
      likeBtn.onmouseleave();
      dislikeBtn.onmouseleave();
      balance = 0;
    }

    item.style.transform = `rotate(${check * 45}deg) translateX(${
      check * 150
    }%) translateY(-${Math.abs(check) * 35}%)`;
  } else {
    isNext = true;
  }
});

tenderView.addEventListener("mouseup", function (e) {
  likeBtn.onmouseleave();
  dislikeBtn.onmouseleave();
  isMove = false;
  pointStart = null;
  const item = getTopItem();
  if (!item) return;
  const overlay = item.querySelector(".overlay");
  if (isNext) {
    isNext = false;
    balance < 0
      ? (item.style.transform = `translateX(-150%)`)
      : (item.style.transform = `translateX(150%)`);
    setTimeout(() => {
      item.remove();
    }, 100);
  } else {
    item.style.transform = `none`;
    overlay.style.background = `rgba(11, 230, 102, 0)`;
  }
});

tenderView.addEventListener("touchstart", function (e) {
  const item = getTopItem();
  if (!item || !e.target.closest(".item") || e.target.closest(".item") !== item)
    return;
  isMove = true;
  let point = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };
  pointStart = point;
});

tenderView.addEventListener("touchmove", function (e) {
  e.preventDefault();
  if (!isMove) return;
  const items = $$(".item");
  const item = getTopItem();
  if (!item) return;
  const overlay = item.querySelector(".overlay");
  let point = {
    x: e.touches[0].clientX,
    y: e.touches[0].clientY,
  };
  let check = (point.x - pointStart.x) / 100;
  if (Math.abs(check) < 1) {
    isNext = false;
    if (check < 0) {
      overlay.style.background = `rgba(243, 72, 4, 0.5)`;
      dislikeBtn.onmouseenter();
      balance = -1;
    } else if (check > 0) {
      overlay.style.background = `rgba(11, 230, 102, 0.5)`;
      likeBtn.onmouseenter();
      balance = 1;
    } else {
      overlay.style.background = `rgba(11, 230, 102, 0)`;
      dislikeBtn.onmouseleave();
      likeBtn.onmouseleave();
      balance = 0;
    }

    item.style.transform = `rotate(${check * 45}deg) translateX(${
      check * 150
    }%) translateY(-${Math.abs(check) * 35}%)`;
  } else {
    isNext = true;
  }
});

tenderView.addEventListener("touchend", function (e) {
  dislikeBtn.onmouseleave();
  likeBtn.onmouseleave();
  isMove = false;
  pointStart = null;
  const item = getTopItem();
  if (!item) return;
  const overlay = item.querySelector(".overlay");
  if (isNext) {
    isNext = false;
    balance < 0
      ? (item.style.transform = `translateX(-150%)`)
      : (item.style.transform = `translateX(150%)`);
    setTimeout(() => {
      item.remove();
    }, 100);
  } else {
    item.style.transform = `none`;
    overlay.style.background = `rgba(11, 230, 102, 0)`;
  }
});
