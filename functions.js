const quotesBox = document.getElementById("quotes");
const bandeiras = {
  USD: "./img/EUA.png",
  EUR: "./img/Euro.png",
  BTC: "./img/China.png",
};

function createQuote(quote) {
  const coinName = quote.name.split("/")[0];
  const bid = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(quote.bid);

  var price = document.createElement("div");
  price.classList.add("price");

  var image = document.createElement("img");
  image.setAttribute("src", bandeiras[quote.code]);

  var coin = document.createElement("div");
  coin.classList.add("coin");

  var title = document.createElement("h3");
  var shortTitle = document.createElement("span");

  title.innerHTML = coinName;
  shortTitle.innerHTML = quote.code;

  coin.appendChild(title);
  coin.appendChild(shortTitle);

  var values = document.createElement("div");
  values.classList.add("values");

  var value = document.createElement("h4");
  var variation = document.createElement("span");
  var icon = document.createElement("i");

  value.innerHTML = bid;

  if (quote.varBid > 0) {
    icon.setAttribute("data-feather", "arrow-up");
    variation.classList.add("positive");
  } else {
    icon.setAttribute("data-feather", "arrow-down");
    variation.classList.add("negative");
  }

  variation.appendChild(icon);

  values.appendChild(value);
  values.appendChild(variation);
  variation.append("-5.50%");

  quotesBox.appendChild(price);
  price.appendChild(image);
  price.appendChild(coin);
  price.appendChild(values);

  feather.replace();
}

async function getQuotesAPI() {
  const response = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
  );
  const quotes = await response.json();
  const keys = Object.keys(quotes);

  console.log(keys);
  keys.map((key) => {
    createQuote(quotes[key]);
  });
}

getQuotesAPI();
