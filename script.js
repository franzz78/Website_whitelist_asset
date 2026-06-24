const firebaseConfig = {
    apiKey: "AIzaSyD9BmV4XKXuMWa4PZHpb7Bbt-rHs61m3lE",
    authDomain: "absensi-polri.firebaseapp.com",
    databaseURL: "https://absensi-polri-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "absensi-polri",
    storageBucket: "absensi-polri.firebasestorage.app",
    messagingSenderId: "19006760644",
    appId: "1:19006760644:web:b7dac0410e47877ded4b91",
    measurementId: "G-82KHRYZBN0"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
let currentCat = "kendaraan";

function changeCategory(cat) {
    currentCat = cat;
    document.getElementById('cat-title').innerText = "Whitelist: " + cat;
    db.ref('whitelist/' + cat).on('value', (snap) => {
        let list = document.getElementById('list');
        list.innerHTML = "";
        snap.forEach((child) => {
            list.innerHTML += `<tr><td>${child.key}</td><td>${child.val().nama}</td>
            <td><button onclick="del('${child.key}')">Hapus</button></td></tr>`;
        });
    });
}

function addData() {
    let id = document.getElementById('id-in').value;
    let name = document.getElementById('name-in').value;
    db.ref('whitelist/' + currentCat + '/' + id).set({ nama: name });
}

function del(id) {
    db.ref('whitelist/' + currentCat + '/' + id).remove();
}
