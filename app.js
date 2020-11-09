//khai báo mảng giá và giá chờ cho các loại xe 

const ARRAY_GIA_UBER_X = [8000, 12000, 10000];
const GIA_CHO_UBER_X = 2000;

const ARRAY_GIA_SUV = [9000, 14000, 12000];
const GIA_CHO_SUV = 3000;

const ARRAY_GIA_BLACK = [10000, 16000, 14000];
const GIA_CHO_BLACK = 4000;
//hàm getEL ID 
const getID = (id) => {
    return document.getElementById(id);
}
const kiemTraLoaiXe = () => {
    let uberX = getID("uberX");
    let uberSUV = getID("uberSUV");
    let uberBlack = getID("uberBlack");
    if (uberX.checked) {
        return "uberX";
    } else if (uberSUV.checked) {
        return "uberSUV";
    } else if (uberBlack.checked) {
        return "uberBlack";
    }
}

const validation = () => {
    let soKm = getID("soKM").value;
    if (document.querySelectorAll("input[type='radio']:checked").length === 0) {
        alert("Vui lòng chọn 1 loại xe");
        return;
    }
    if (soKm == "" || soKm == undefined) {
        alert("Vui lòng điền vào số KM");
        return;
    }
}
//trên 3 phút tính tiền chờ, cứ 3 phút tính 1 lần => chia cho 3 => làm tròn 
const tinhTienCho = (thoiGianCho, giaCho) => {
    let tienCho = 0;
    if (thoiGianCho > 3) {
        tienCho = Math.round((thoiGianCho / 3) * giaCho);
    }
    return tienCho;
}

const tinhTien = (soKm, thoiGianCho, arrayPrice, giaCho) => {
    let tienCho = tinhTienCho(thoiGianCho, giaCho);
    if (soKm <= 1) {
        return arrayPrice[0] + tienCho;
    } else if (soKm > 1 && soKm <= 20) {
        return arrayPrice[0] + (soKm - 1) * arrayPrice[1] + tienCho;
    } else if (soKm > 20) {
        return arrayPrice[0] + (soKm - 1) * arrayPrice[1] + (soKm - 20) * arrayPrice[2] + tienCho;
    }
}
const tinhTongTien = () => {
    let soKm = getID("soKM").value;
    let thoiGianCho = getID("thoiGianCho").value;

    soKm = parseFloat(soKm);
    thoiGianCho = parseFloat(thoiGianCho);

    let tongTien = 0;
    let loaiXe = kiemTraLoaiXe();

    switch (loaiXe) {
        case "uberX":
            tongTien = tinhTien(soKm, thoiGianCho, ARRAY_GIA_UBER_X, GIA_CHO_UBER_X);
            break;
        case "uberSUV":
            tongTien = tinhTien(soKm, thoiGianCho, ARRAY_GIA_SUV, GIA_CHO_SUV);
            break;
        case "uberBlack":
            tongTien = tinhTien(soKm, thoiGianCho, ARRAY_GIA_BLACK, GIA_CHO_BLACK);
            break;

        default:
            alert("Vui lòng chọn loại xe");
    }
    return tongTien; 
}

getID("btnTinhTien").onclick = () => {
    let tongTien = tinhTongTien();
    getID("divThanhTien").style.display = "block";
    getID("xuatTien").innerHTML = tongTien;
}

const renderRowChiTietKm = (loaiXe, arrayKm, arrayPrice, tblBody) =>{
for (let i = 0; i < arrayKm.length; i++){
    let tr = document.createElement("tr");
    let tdLoaiXe = document.createElement("td");
    let tdSuDung = document.createElement("td");
    let tdDonGia = document.createElement("td");
    let tdThanhTien = document.createElement("td");
    tdLoaiXe.innerHTML = loaiXe; 
    tdSuDung.innerHTML = arrayKm[i];
    tdDonGia.innerHTML = arrayPrice[i];
    tdThanhTien.innerHTML = arrayKm[i] * arrayPrice[i]; 
    tr.appendChild(tdLoaiXe); 
    tr.appendChild(tdSuDung); 
    tr.appendChild(tdDonGia); 
    tr.appendChild(tdThanhTien); 
    tblBody.appendChild(tr); 
}
}
const renderRowThoiGianCho = (thoiGianCho, giaCho, tblBody) =>{
let tienCho = tinhTienCho(thoiGianCho, giaCho);
let trThoiGianCho = document.createElement("tr");
let tdPhutTitle = document.createElement("td");
let tdPhut = document.createElement("td");
let tdDonGia = document.createElement("td");
let tdThanhTien = document.createElement("td");

tdPhutTitle.innerHTML = " Thời Gian Chờ";
tdPhut.innerHTML = thoiGianCho + " phút";
tdDonGia.innerHTML = giaCho;
tdThanhTien.innerHTML = tienCho;

trThoiGianCho.appendChild(tdPhutTitle);
trThoiGianCho.appendChild(tdPhut);
trThoiGianCho.appendChild(tdDonGia);
trThoiGianCho.appendChild(tdThanhTien);
tblBody.appendChild(trThoiGianCho);
}

const renderRowTongCong = (tongTien, tblBody) =>{
    let trTotal = document.createElement("tr"); 
    trTotal.className = "alert alert-success"; 
    
    let tdTotalTitle = document.createElement("td"); 
    tdTotalTitle.setAttribute("colspan",3); 

    let tdTotal = document.createElement("td");

    tdTotalTitle.innerHTML(" Tổng tiền phải trả"); 
    tdTotal.innerHTML = tongTien; 

    trTotal.appendChild(tdTotalTitle); 
    trTotal.appendChild(tdTotal); 
    tblBody.appendChild(trTotal); 
};
const inHoaDon = (loaiXe, soKm, thoiGianCho, giaCho, arrayPrice, tongTien) => {
let tblBody = getID("tblBody");
tblBody.innerHTML = ""; // reset lại body; 
if(soKm <= 1){
    renderRowChiTietKm(loaiXe, [1], arrayPrice, tblBody); 
} else if (soKm > 1 && soKm <= 20){
    renderRowChiTietKm(loaiXe, [1, soKm -1], arrayPrice, tblBody); 
} else if (soKm > 20){
    renderRowChiTietKm(loaiXe, [1,19,soKm -20], arrayPrice, tblBody); 
}
if(thoiGianCho > 2) {
    renderRowThoiGianCho(thoiGianCho, giaCho, tblBody);
}
renderRowTongCong(tongTien, tblBody); 
}; 
getID("btnInHD").onclick = () =>{
    let kq = getData();
    let tongTien = tinhTongTien(); 
    let loaiXe = kiemTraLoaiXe(); 
    validation(); 
    switch(loaiXe){
        case "uberX": 
        inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_UBER_X, ARRAY_GIA_UBER_X, tongTien); 
        break; 
        case "uberSUV": 
        inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_SUV, ARRAY_GIA_SUV, tongTien); 
        break; 
        case "uberBlack": 
        inHoaDon(loaiXe, kq[0], kq[1], GIA_CHO_BLACK, ARRAY_GIA_BLACK, tongTien); 
        break; 
        default:
            alert("Vui Lòng Chọn Loại Xe"); 
    }
}
const getData = () => {
    let kq = [];
    let soKm = document.getElementById("soKM").value;
    soKm = parseFloat(soKm);
    kq.push(soKm);
    let thoiGianCho = document.getElementById("thoiGianCho").value;
    thoiGianCho = parseFloat(thoiGianCho);
    kq.push(thoiGianCho);
    return kq;
}
