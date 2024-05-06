import { detecIcon, detecType, setStorage } from "./helpers.js";


// Fonksiyonu kullanma

//! HTML'den gelenler
const form = document.querySelector("form");
const List = document.querySelector("ul");

//! olay izleyicisi

form.addEventListener("submit", handleSubmit);
List.addEventListener("click", handleClick);

//! ortak kullanım alanları
let map;
let coords = [];
let notes =JSON.parse(localStorage.getItem("notes")) || [];
let layerGroup = [];


//* kullanıcının konumunu öğrenme
navigator.geolocation.getCurrentPosition(
    loadMap,
    console.log("Kullanıcı kabul etmedi")
);
//* kullanıcının konumuna göre ekrana haritayı gösterme

//* haritaya tıklanınca çalışır
function onMapClick(e) {
    form.style.display = "flex";
    coords = [e.latlng.lat, e.latlng.lng];
    console.log(coords);
}


function loadMap(e) {
    
    // haritanın kurulumu
    map = new L.map("map").setView([e.coords.latitude, e.coords.longitude], 10);
    L.control;
    // haritanın nasıl gözükeceğini belirler
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // haritada ekrana basılacak imleçleri tutacagımız katman
    layerGroup = L.layerGroup().addTo(map);

    // localden gelen notları listeleme
    renderNoteList(notes);

    map.on("click", onMapClick);
}

function renderMarker(item) {
   console.log(item);
    // markerı oluşturur
     L.marker(item.coords, { icon: detecIcon(item.status) })
      // imleçlerin olduğu katmana ekler
      .addTo(layerGroup)
      // üzerine tıklanınca açılacak popup ekleme
      .bindPopup(`${item.desc}`);

     
  }


  


// form gönderildiğinde çalışır
function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const desc = e.target[0].value
    const date = e.target[1].value
    const status = e.target[2].value

    // note dizisine eleman ekleme
    notes.push({ id: new Date().getTime(), desc, date, status, coords });
    console.log(notes);
    // localstorage güncelleme
    setStorage(notes);
    // notları ekrana aktarabilmek için fonksiyone notes dizisini parametre olarak gönderdik
    renderNoteList(notes);

    //* form gönderildiğinde kapanır
    form.style.display = "none";
}

function renderNoteList(item) {
    List.innerHTML = "";
     // markerları temizler
    layerGroup.clearLayers();
    item.forEach((item) => {
        const listElement = document.createElement("li");
        listElement.dataset.id = item.id;
        listElement.innerHTML = `
        <div>
                        <p>${item.desc}</p>
                        <p><span>Tarih:</span>${item.date}</p>
                        <p><span>Durum:</span>${detecType(item.status)}</p>
                    </div>
                    <i class="bi bi-x" id="delete"></i>
                    <i class="bi bi-airplane-fill" id="fly"></i>

        `;
        List.insertAdjacentElement("afterbegin", listElement);

        renderMarker(item);
    });
}

function handleClick(e) {
    console.log(e.target.id);
    // güncellencek elemanın id'sini öğrenme
   const id = e.target.parentElement.dataset.id;
   console.log(notes);
   if(e.target.id === "delete"){
    console.log("tıklanıldı");
    // id'sini bildiğimiz elemanı diziden kaldırma
    notes = notes.filter((note) => note.id != id);
    console.log(notes);

    // localstorage güncelleme
    setStorage(notes);
    // ekranı güncelle
    renderNoteList(notes);
    
   }
   if (e.target.id === "fly"){
    const note = notes.find((note) => note.id == id );
    map.flyTo(note.coords); 
   }

}