const categories=['Perkakas Tangan','Perkakas Listrik','Peralatan Bengkel','Peralatan Bangunan','Golok & Arit','Kapak & Gergaji','Pertanian & Outdoor','Produk lainnya'];
const brands=['GOLO','Makita','DeWALT','Bosch','Milwaukee','Krisbow'];
const products=[
 {id:1,brand:'GOLO',name:'Golok Professional Series',sku:'TBK-DEMO-001',price:185000,wholesale:165000,tags:['best']},
 {id:2,brand:'Makita',name:'Cordless Drill Driver 18V',sku:'TBK-DEMO-002',price:1295000,wholesale:1195000,tags:['best','new']},
 {id:3,brand:'DeWALT',name:'Circular Saw Professional',sku:'TBK-DEMO-003',price:2350000,wholesale:2195000,tags:['new']},
 {id:4,brand:'Bosch',name:'Angle Grinder Professional',sku:'TBK-DEMO-004',price:975000,wholesale:895000,tags:['best']},
 {id:5,brand:'GOLO',name:'Arit Premium',sku:'TBK-DEMO-005',price:145000,wholesale:129000,tags:['new']},
 {id:6,brand:'Milwaukee',name:'Impact Driver M18',sku:'TBK-DEMO-006',price:2895000,wholesale:2695000,tags:['best']},
 {id:7,brand:'Bosch',name:'Gergaji Tangan Heavy Duty',sku:'TBK-DEMO-007',price:225000,wholesale:199000,tags:['new']},
 {id:8,brand:'DeWALT',name:'Set Mata Bor Industrial',sku:'TBK-DEMO-008',price:625000,wholesale:575000,tags:['best']}
];
let cart=[];
const rupiah=n=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
function renderCategories(){document.querySelector('#categoryGrid').innerHTML=categories.map((x,i)=>`<a class="category" href="#produk"><span>0${i+1}</span><h3>${x}</h3></a>`).join('')}
function renderBrands(){document.querySelector('#brandGrid').innerHTML=brands.map(x=>`<a class="brand-tile" href="#produk">${x}</a>`).join('')}
function renderProducts(filter='all'){const list=filter==='all'?products:products.filter(p=>p.tags.includes(filter));document.querySelector('#productGrid').innerHTML=list.map(p=>`<article class="product"><div class="product-img"><span class="badge">${p.tags.includes('best')?'BEST SELLER':'FEATURED'}</span></div><div class="product-info"><div class="product-brand">${p.brand}</div><h3>${p.name}</h3><div class="sku">SKU ${p.sku}</div><div class="price">${rupiah(p.price)}</div><div class="wholesale">Grosir mulai 4 pcs • ${rupiah(p.wholesale)}/pcs</div><div class="available">● Tersedia</div><div class="product-actions"><button class="add" onclick="addToCart(${p.id})">🛒 Masukkan</button><button onclick="alert('Detail produk demo: '+${JSON.stringify(p.name)})">Detail</button></div></div></article>`).join('')}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);document.querySelector('#cartCount').textContent=cart.length;renderCart()}
function renderCart(){const el=document.querySelector('#cartItems');if(!cart.length){el.innerHTML='<p class="muted">Keranjang masih kosong.</p>';document.querySelector('#cartTotal').textContent='Rp0';return}el.innerHTML=cart.map((p,i)=>`<div class="cart-row"><div><b>${p.name}</b><div class="muted">${rupiah(p.price)}</div></div><button onclick="cart.splice(${i},1);document.querySelector('#cartCount').textContent=cart.length;renderCart()">×</button></div>`).join('');document.querySelector('#cartTotal').textContent=rupiah(cart.reduce((s,p)=>s+p.price,0))}
function open(id){document.querySelector(id).classList.add('open')};function close(id){document.querySelector(id).classList.remove('open')}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProducts(b.dataset.filter)}));
document.querySelector('#cartBtn').onclick=()=>open('#cartDrawer');document.querySelector('#closeCart').onclick=()=>close('#cartDrawer');document.querySelector('#searchBtn').onclick=()=>open('#searchModal');document.querySelector('#closeSearch').onclick=()=>close('#searchModal');
const chatWidget=document.querySelector('#chatWidget');document.querySelector('#chatBtn').onclick=()=>{chatWidget.classList.add('open');chatWidget.setAttribute('aria-hidden','false')};document.querySelector('#closeChat').onclick=()=>{chatWidget.classList.remove('open');chatWidget.setAttribute('aria-hidden','true')};
document.querySelector('#searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();const hits=products.filter(p=>`${p.name} ${p.brand} ${p.sku}`.toLowerCase().includes(q));document.querySelector('#searchResults').innerHTML=q?hits.map(p=>`<div class="search-result"><b>${p.name}</b><div class="muted">${p.brand} • ${p.sku} • ${rupiah(p.price)}</div></div>`).join(''):'<p class="muted">Ketik nama produk, brand, SKU, atau spesifikasi.</p>'});
document.querySelector('#year').textContent=new Date().getFullYear();renderCategories();renderBrands();renderProducts();renderCart();
