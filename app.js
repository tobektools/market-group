const state={products:[],filter:"all",query:"",category:"all",brand:"all"};

const categories=[
 ["01","Perkakas Tangan","Hand tools untuk pekerjaan harian."],
 ["02","Perkakas Listrik","Power tools dan perlengkapannya."],
 ["03","Peralatan Bengkel","Kebutuhan bengkel dan servis."],
 ["04","Peralatan Bangunan","Peralatan untuk pekerjaan konstruksi."],
 ["05","Golok & Arit","Perkakas potong untuk berbagai kebutuhan."],
 ["06","Kapak & Gergaji","Perkakas potong dan pemotong material."],
 ["07","Pertanian & Outdoor","Perkakas pertanian dan kegiatan luar ruang."],
 ["08","Produk Lainnya","Produk pendukung kebutuhan umum."]
];

const fallbackProducts=[
 {sku:"DEMO-001",name:"Palu Serbaguna 16 Oz",brand:"TOBEK",category:"Perkakas Tangan",retail:75000,wholesale:68000,status:"Tersedia",featured:true,newest:true,description:"Contoh produk katalog. Ganti dengan data produk asli melalui products.json."},
 {sku:"DEMO-002",name:"Tang Kombinasi 8 Inch",brand:"TOBEK",category:"Perkakas Tangan",retail:50000,wholesale:45000,status:"Tersedia",featured:true},
 {sku:"DEMO-003",name:"Bor Tangan 13 mm",brand:"TOBEK",category:"Perkakas Listrik",retail:425000,wholesale:395000,status:"Tersedia",newest:true},
 {sku:"DEMO-004",name:"Gergaji Tangan 20 Inch",brand:"TOBEK",category:"Kapak & Gergaji",retail:95000,wholesale:85000,status:"Tersedia"},
 {sku:"DEMO-005",name:"Arit Serbaguna",brand:"TOBEK",category:"Golok & Arit",retail:85000,wholesale:76000,status:"Tersedia",featured:true},
 {sku:"DEMO-006",name:"Kapak Fiberglass",brand:"TOBEK",category:"Kapak & Gergaji",retail:180000,wholesale:165000,status:"Tersedia"},
 {sku:"DEMO-007",name:"Set Kunci Sok",brand:"TOBEK",category:"Peralatan Bengkel",retail:320000,wholesale:295000,status:"Tersedia",newest:true},
 {sku:"DEMO-008",name:"Cangkul Serbaguna",brand:"TOBEK",category:"Perkakas Pertanian & Outdoor",retail:110000,wholesale:99000,status:"Tersedia"}
];

function rupiah(n){return new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0)}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function renderCategories(){
 const el=document.getElementById("categoryGrid");
 el.innerHTML=categories.map(([no,name,desc])=>`<button class="category-card" data-cat="${esc(name)}"><span class="category-no">${no}</span><h3>${esc(name)}</h3><p>${esc(desc)}</p></button>`).join("");
 el.querySelectorAll(".category-card").forEach(b=>b.onclick=()=>{document.getElementById("categoryFilter").value=b.dataset.cat;state.category=b.dataset.cat;renderProducts();document.getElementById("produk").scrollIntoView({behavior:"smooth"})});
}

function populateFilters(){
 const cats=[...new Set(state.products.map(p=>p.category).filter(Boolean))].sort();
 const brands=[...new Set(state.products.map(p=>p.brand).filter(Boolean))].sort();
 document.getElementById("categoryFilter").innerHTML='<option value="all">Semua kategori</option>'+cats.map(x=>`<option>${esc(x)}</option>`).join("");
 document.getElementById("brandFilter").innerHTML='<option value="all">Semua brand</option>'+brands.map(x=>`<option>${esc(x)}</option>`).join("");
}

function matches(p){
 const q=state.query.toLowerCase();
 const text=[p.name,p.sku,p.brand,p.category,p.description].join(" ").toLowerCase();
 if(q && !text.includes(q))return false;
 if(state.category!=="all"&&p.category!==state.category)return false;
 if(state.brand!=="all"&&p.brand!==state.brand)return false;
 if(state.filter==="best"&&!p.featured)return false;
 if(state.filter==="new"&&!p.newest)return false;
 return true;
}

function productCard(p){
 const photo=p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">`:`<span>PRODUCT PHOTO</span>`;
 return `<article class="product-card">
   <div class="product-photo">${photo}</div>
   <div class="product-info">
    <div class="product-brand">${esc(p.brand||"TOBEK")}</div>
    <div class="product-name">${esc(p.name)}</div>
    <div class="product-sku">SKU: ${esc(p.sku)}</div>
    ${p.retail?`<div class="product-price">${rupiah(p.retail)}</div>`:""}
    <div class="product-status">${esc(p.status||"Tersedia")}</div>
    <div class="product-actions"><button class="small-btn" data-detail="${esc(p.sku)}">Detail</button><a class="small-btn primary-small wa-link" data-wa="${esc(p.name)}" href="#" target="_blank" rel="noopener">Tanya</a></div>
   </div>
 </article>`;
}

function renderProducts(){
 const visible=state.products.filter(matches);
 const grid=document.getElementById("productGrid"), empty=document.getElementById("emptyState");
 grid.innerHTML=visible.map(productCard).join("");
 empty.hidden=visible.length>0;
 grid.querySelectorAll("[data-detail]").forEach(b=>b.onclick=()=>openProduct(b.dataset.detail));
 grid.querySelectorAll(".wa-link").forEach(a=>a.href=waUrl(`Halo TOBEK TOOLS, saya ingin menanyakan produk: ${a.dataset.wa}`));
}

function waUrl(message){const number=window.TOBEK_WHATSAPP||"6280000000000";return `https://wa.me/${number}?text=${encodeURIComponent(message)}`}

function openProduct(sku){
 const p=state.products.find(x=>x.sku===sku);if(!p)return;
 const photo=p.image?`<img src="${esc(p.image)}" alt="${esc(p.name)}">`:`<span>PRODUCT PHOTO</span>`;
 document.getElementById("productDetailContent").innerHTML=`<div class="detail-grid"><div class="detail-photo">${photo}</div><div class="detail-content"><div class="product-brand">${esc(p.brand||"TOBEK")}</div><h2>${esc(p.name)}</h2><div class="detail-meta">SKU ${esc(p.sku)} · ${esc(p.category||"")}</div>${p.retail?`<div class="detail-price">${rupiah(p.retail)}</div>`:""}<p class="detail-desc">${esc(p.description||"Informasi produk tersedia di TOBEK TOOLS. Hubungi kami untuk spesifikasi dan ketersediaan terbaru.")}</p><a class="btn primary" href="${waUrl(`Halo TOBEK TOOLS, saya ingin informasi tentang ${p.name} (SKU ${p.sku}).`)}" target="_blank" rel="noopener">Tanya Produk</a></div></div>`;
 document.getElementById("productModal").classList.add("open");
}

function openSearch(){
 const modal=document.getElementById("searchModal");modal.classList.add("open");
 const input=document.getElementById("searchInput");input.focus();input.value="";
 renderSearchResults("");
 input.oninput=()=>renderSearchResults(input.value);
}
function renderSearchResults(q){
 const results=state.products.filter(p=>[p.name,p.sku,p.brand,p.category].join(" ").toLowerCase().includes(q.toLowerCase())).slice(0,12);
 document.getElementById("searchResults").innerHTML=results.map(p=>`<div class="search-result" data-sku="${esc(p.sku)}"><strong>${esc(p.name)}</strong><small>${esc(p.brand)} · ${esc(p.sku)} · ${esc(p.category)}</small></div>`).join("")||`<div class="empty-state">Tidak ada hasil.</div>`;
 document.querySelectorAll(".search-result").forEach(x=>x.onclick=()=>{document.getElementById("searchModal").classList.remove("open");openProduct(x.dataset.sku)});
}

async function loadProducts(){
 try{
  const r=await fetch("products.json",{cache:"no-store"});
  if(!r.ok)throw new Error();
  const data=await r.json();
  state.products=Array.isArray(data)?data:fallbackProducts;
 }catch(e){state.products=fallbackProducts}
 renderCategories();populateFilters();renderProducts();
}

document.addEventListener("DOMContentLoaded",()=>{
 document.getElementById("year").textContent=new Date().getFullYear();
 document.getElementById("searchBtn").onclick=openSearch;
 document.getElementById("closeSearch").onclick=()=>document.getElementById("searchModal").classList.remove("open");
 document.getElementById("closeProduct").onclick=()=>document.getElementById("productModal").classList.remove("open");
 document.querySelectorAll(".modal").forEach(m=>m.addEventListener("click",e=>{if(e.target===m)m.classList.remove("open")}));
 document.getElementById("catalogSearch").oninput=e=>{state.query=e.target.value;renderProducts()};
 document.getElementById("categoryFilter").onchange=e=>{state.category=e.target.value;renderProducts()};
 document.getElementById("brandFilter").onchange=e=>{state.brand=e.target.value;renderProducts()};
 document.querySelectorAll(".filter").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.filter=b.dataset.filter;renderProducts()});
 const links=["headerContact","promoContact","contactBtn"];links.forEach(id=>document.getElementById(id).href=waUrl("Halo TOBEK TOOLS, saya ingin informasi produk."));
 loadProducts();
});
