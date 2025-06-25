$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
const tenderView = $(".tender-view");
const listItem = $(".list-item");
let moveCheck = 0;
let isMove = false;
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
  let check = (point.x - pointStart.x) / 50;
  moveCheck = check;
  if (items.length > 1) {
    if (Math.abs(check) < 1) {
      check < 0
        ? (overlay.style.background = `rgba(243, 72, 4, 0.5)`)
        : (overlay.style.background = `rgba(11, 230, 102, 0.5)`);

      item.style.transform = `rotate(${check * 45}deg) translateX(${
        check * 150
      }%) translateY(-${Math.abs(check) * 35}%)`;
    } else {
      isMove = false;
      if (check < 0) {
        item.style.transform = `translateX(-150%)`;
        disliked.push(item.id);
      } else {
        item.style.transform = `translateX(150%)`;
        likes.push(item.id);
      }
      setTimeout(() => {
        item.remove();
      }, 500);
      pointStart = null;
    }
  } else {
    if (Math.abs(check) < 1) {
      check < 0
        ? (overlay.style.background = `rgba(243, 72, 4, 0.5)`)
        : (overlay.style.background = `rgba(11, 230, 102, 0.5)`);

      item.style.transform = `rotate(${check * 45}deg) translateX(${
        check * 150
      }%) translateY(-${Math.abs(check) * 35}%)`;
    } else {
      isMove = false;
      item.style.transform = `none`;
      if (check < 0) {
        if (likes.includes(item.id)) likes.pop();
        if (!disliked.includes(item.id)) disliked.push(item.id);
      } else {
        if (disliked.includes(item.id)) disliked.pop();
        if (!likes.includes(item.id)) likes.push(item.id);
      }
      pointStart = null;
    }
  }
});

tenderView.addEventListener("mouseup", function (e) {
  isMove = false;
  pointStart = null;
  const item = getTopItem();
  if (!item) return;
  const overlay = item.querySelector(".overlay");
  if (Math.abs(moveCheck) < 1) {
    item.style.transform = `none`;
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
  let check = (point.x - pointStart.x) / 50;
  moveCheck = check;
  if (items.length > 1) {
    if (Math.abs(check) < 1) {
      check < 0
        ? (overlay.style.background = `rgba(243, 72, 4, 0.5)`)
        : (overlay.style.background = `rgba(11, 230, 102, 0.5)`);
      item.style.transform = `rotate(${check * 45}deg) translateX(${
        check * 150
      }%) translateY(-${Math.abs(check) * 35}%)`;
    } else {
      isMove = false;
      if (check < 0) {
        item.style.transform = `translateX(-150%)`;
        disliked.push(item.id);
      } else {
        item.style.transform = `translateX(150%)`;
        likes.push(item.id);
      }
      setTimeout(() => {
        item.remove();
      }, 500);
      pointStart = null;
    }
  } else {
    //Xử lý phần tử cuối sẽ không next, chỉ xoay đê báo đã click vào
    if (Math.abs(check) < 1) {
      check < 0
        ? (overlay.style.background = `rgba(243, 72, 4, 0.5)`)
        : (overlay.style.background = `rgba(11, 230, 102, 0.5)`);

      item.style.transform = `rotate(${check * 45}deg) translateX(${
        check * 150
      }%) translateY(-${Math.abs(check) * 35}%)`;
    } else {
      isMove = false;
      item.style.transform = `none`;
      if (check < 0) {
        if (likes.includes(item.id)) likes.pop();
        if (!disliked.includes(item.id)) disliked.push(item.id);
      } else {
        if (disliked.includes(item.id)) disliked.pop();
        if (!likes.includes(item.id)) likes.push(item.id);
      }
      pointStart = null;
    }
  }
});

tenderView.addEventListener("touchend", function (e) {
  isMove = false;
  pointStart = null;
  const item = getTopItem();
  if (!item) return;
  if (Math.abs(moveCheck) < 1) {
    item.style.transform = `none`;
  }
});
