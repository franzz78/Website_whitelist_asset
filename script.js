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

function showDashboard() {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('admin-screen').classList.remove('hidden');
    loadData();
}

function loadData() {
    db.ref('whitelist/kendaraan').on('value', (snap) => {
        let list = document.getElementById('list');
        list.innerHTML = "";
        snap.forEach((child) => {
            list.innerHTML += `<tr class="border-b border-white/10">
                <td class="p-4">${child.key}</td>
                <td class="p-4">${child.val().nama}</td>
                <td class="p-4"><button onclick="del('${child.key}')" class="text-red-500">Hapus</button></td>
            </tr>`;
        });
    });
}

function addData() {
    let id = document.getElementById('id-in').value;
    let name = document.getElementById('name-in').value;
    db.ref('whitelist/kendaraan/' + id).set({ nama: name });
}

function del(id) {
    db.ref('whitelist/kendaraan/' + id).remove();
}
