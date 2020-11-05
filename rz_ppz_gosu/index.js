let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error);

//Set behavior for number counting
let pp = new CountUp('pp', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: "",
  decimal: "."
})
let h100 = new CountUp('h100', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: " ",
  decimal: "."
})
let h50 = new CountUp('h50', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: " ",
  decimal: "."
})
let h0 = new CountUp('h0', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: " ",
  decimal: "."
})
let sb = new CountUp('sb', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: " ",
  decimal: "."
})
let fcpp = new CountUp('fcpp', 0, 0, 0, .5, {
  useEasing: true,
  useGrouping: true,
  separator: " ",
  decimal: "."
})

//Declare some values
let base = document.getElementsByClassName('base')[0];
let box = document.getElementsByClassName('box')[0];
let hits = document.getElementsByClassName('hits')[0];
let sliderbreak = document.getElementById("sb");
let gameState;

socket.onmessage = event => {
  try {
    let data = JSON.parse(event.data);
    if (gameState !== data.menu.state) {
      gameState = data.menu.state;
      if (gameState === 2) {
        //Gameplay
        base.style.transform = "translateX(0)";
      } else if (gameState == 5 || gameState == 0 || gameState == 11) {
        base.style.transform = "translateX(420px)";
      }
    }

    //Visible sliderbreak count if sliderbroke
    if (data.gameplay.hits.sliderBreaks > 0) {
      sliderbreak.style.display = "block";
      box.style.width = "350px";
      hits.style.width = "60%";
    } else { //Disable sliderbreak count
      sliderbreak.style.display = "none";
      box.style.width = "320px";
      hits.style.width = "55%";
    }

    pp.update(data.gameplay.pp.current);
    h100.update(data.gameplay.hits[100]);
    h50.update(data.gameplay.hits[50]);
    h0.update(data.gameplay.hits[0]);
    sb.update(data.gameplay.hits.sliderBreaks);
    // fcpp.update(data.gameplay.pp.fc);
  } catch (err) {
    console.log(err);
  };
};
