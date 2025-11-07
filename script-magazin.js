  const items = [
    { name: "Footbl1", category: "Футболки", price: 3999, oldPrice: 4999, img: "img/10.png" },
    { name: "Footbl2", category: "Футболки", price: 3999, oldPrice: 5499, img: "img/1.png" },
    { name: "Footbl3", category: "Футболки", price: 3999, oldPrice: 4799, img: "img/2.png" },
    { name: "Footbl4", category: "Футболки", price: 4299, oldPrice: 5199, img: "img/3.png" },
    { name: "Footbl5", category: "Футболки", price: 2699, oldPrice: 2999, img: "img/4.png" },
    { name: "Footbl6", category: "Футболки", price: 2599, oldPrice: 2899, img: "img/5.png" },
    { name: "Footbl7", category: "Футболки", price: 3299, oldPrice: 3699, img: "img/6.png" },
    { name: "Footbl8", category: "Футболки", price: 3199, oldPrice: 3599, img: "img/7.png" },
    { name: "Footbl9", category: "Футболки", price: 2499, oldPrice: 2799, img: "img/8.png" },
    { name: "Footbl10", category: "Футболки", price: 3899, oldPrice: 4599, img: "img/9.png" },
    { name: "Hoodie1", category: "Толстовки", price: 3999, oldPrice: 4999, img: "img/11.png" },
    { name: "Hoodie2", category: "Толстовки", price: 3999, oldPrice: 5499, img: "img/22.png" },
    { name: "Hoodie3", category: "Толстовки", price: 3999, oldPrice: 4799, img: "img/33.png" },
    { name: "Hoodie4", category: "Толстовки", price: 4299, oldPrice: 5199, img: "img/44.png" },
    { name: "Hoodie5", category: "Толстовки", price: 2699, oldPrice: 2999, img: "img/55.png" },
    { name: "Hoodie6", category: "Толстовки", price: 2599, oldPrice: 2899, img: "img/66.png" },
    { name: "Hoodie7", category: "Толстовки", price: 3299, oldPrice: 3699, img: "img/77.png" },
    { name: "Hoodie8", category: "Толстовки", price: 3199, oldPrice: 3599, img: "img/88.png" },
    { name: "Hoodie9", category: "Толстовки", price: 2499, oldPrice: 2799, img: "img/99.png" },
    { name: "Hoodie10", category: "Толстовки", price: 3899, oldPrice: 4599, img: "img/100.png" },
    { name: "Zeep1", category: "Толстовки на молнии", price: 3999, oldPrice: 4999, img: "img/111.png" },
    { name: "Zeep2", category: "Толстовки на молнии", price: 3999, oldPrice: 5499, img: "img/222.png" },
    { name: "Zeep3", category: "Толстовки на молнии", price: 3999, oldPrice: 4799, img: "img/333.png" },
    { name: "Zeep4", category: "Толстовки на молнии", price: 4299, oldPrice: 5199, img: "img/444.png" },
    { name: "Zeep5", category: "Толстовки на молнии", price: 2699, oldPrice: 2999, img: "img/555.png" },
    { name: "Zeep6", category: "Толстовки на молнии", price: 2599, oldPrice: 2899, img: "img/666.png" },
    { name: "Zeep7", category: "Толстовки на молнии", price: 3299, oldPrice: 3699, img: "img/777.png" },
    { name: "Zeep8", category: "Толстовки на молнии", price: 3199, oldPrice: 3599, img: "img/888.png" },
    { name: "Zeep9", category: "Толстовки на молнии", price: 2499, oldPrice: 2799, img: "img/999.png" },
    { name: "Zeep10", category: "Толстовки на молнии", price: 3899, oldPrice: 4599, img: "img/1000.png" },
  ];

    const productsDiv = document.getElementById("products");
    const categories = document.querySelectorAll(".category");
    const priceRange = document.getElementById("priceRange");
    const maxPriceLabel = document.getElementById("maxPrice");

    let activeCategory = "Все";

    function renderProducts() {
      productsDiv.innerHTML = "";
      const maxPrice = +priceRange.value;
      const filtered = items.filter(p =>
        (activeCategory === "Все" || p.category === activeCategory) &&
        p.price <= maxPrice
      );

      filtered.forEach(p => {
        const el = document.createElement("div");
        el.className = "product";
        el.innerHTML = `
          <img src="${p.img}" alt="${p.name}">
          <h3>${p.name}</h3>
          <div><span class="price">${p.price} ₽</span><span class="old-price">${p.oldPrice} ₽</span></div>
          <button class="btn" onclick="addToCart('${p.name}', ${p.price})">Добавить в корзину</button>
        `;
        productsDiv.appendChild(el);
      });

      if (filtered.length === 0) {
        productsDiv.innerHTML = "<p style='text-align:center;color:#777;'>Нет товаров по выбранным параметрам</p>";
      }
    }

    categories.forEach(cat => {
      cat.addEventListener("click", () => {
        categories.forEach(c => c.classList.remove("active"));
        cat.classList.add("active");
        activeCategory = cat.dataset.category;
        renderProducts();
      });
    });

    priceRange.addEventListener("input", () => {
      maxPriceLabel.textContent = priceRange.value + " ₽";
      renderProducts();
    });

    renderProducts();



let cart = [];

// Открытие/закрытие панели
const cartIcon = document.getElementById('cart-icon');
const cartPanel = document.getElementById('cart-panel');
const cartItemsContainer = document.getElementById('cart-items');
cartIcon.addEventListener('click', ()=>cartPanel.classList.toggle('open'));

// Функция добавления товара из твоей кнопки
function addToCart(name, price){
  const product = items.find(p=>p.name===name);
  if(!product) return;
  const existing = cart.find(c=>c.name===name);
  if(existing) existing.qty++;
  else cart.push({...product, qty:1});
  updateCart();
}

// Обновление корзины
function updateCart(){
  const totalQty = cart.reduce((s,i)=>s+i.qty,0);
  if(totalQty>0){
    cartIcon.classList.add('show');
    cartIcon.textContent = totalQty;
  } else {
    cartIcon.classList.remove('show');
    cartPanel.classList.remove('open');
  }

  cartItemsContainer.innerHTML = '';
  cart.forEach((item,i)=>{
    const div = document.createElement('div');
    div.className='cart-item';

    const img = document.createElement('img');
    img.src = item.img;

    const info = document.createElement('div');
    info.className='cart-item-info';
    info.innerHTML = `
      <span><b>${item.name}</b></span>
      <span>Цена: ${item.price} ₽</span>
      <span>Кол-во: ${item.qty}</span>
    `;

    const btns = document.createElement('div');
    btns.className='cart-item-buttons';

    const btnMinus = document.createElement('button');
    btnMinus.textContent='-';
    btnMinus.onclick = ()=>{
      if(item.qty>1) item.qty--; else cart.splice(i,1);
      updateCart();
    }

    const btnPlus = document.createElement('button');
    btnPlus.textContent='+';
    btnPlus.onclick = ()=>{
      item.qty++;
      updateCart();
    }

    btns.appendChild(btnMinus);
    btns.appendChild(btnPlus);

    div.appendChild(img);
    div.appendChild(info);
    div.appendChild(btns);

    cartItemsContainer.appendChild(div);
  });
}