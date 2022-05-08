const key_local="show_commit"
var action = document.querySelector("#active");
// var img = document.getElementById("action");
var addcomic = document.getElementById("addComic");
var closes = document.getElementsByClassName("close")[0];
var show = document.getElementById("show");

closes.onclick = function(){
 addcomic.style.display= "none"
}

show.onclick = function(){
    addcomic.style.display="block"
}
 


 var manga=[]
class Manga {
    constructor(photo, nameManga, chap,category) {
        this.photo = photo,
        this.nameManga = nameManga,
        this.chap = chap,
        this.category=category
    }
} 
function init(){
    if(getLocal(key_local)==null){
    manga = [
    new Manga ("https://cachtrongrausach.vn/hinh-nen-one-piece-cho-dien-thoai/imager_10659.jpg","One Piece","Chap 1039","Phiêu Lưu" ),
    new Manga ("https://m.media-amazon.com/images/M/MV5BZDM2NjI5ODUtYWM4OC00Zjg2LWE5MzUtYThjYWFhOWQzN2M4XkEyXkFqcGdeQXVyODMyNTM0MjM@._V1_.jpg","Eden Zero","Chap 2903","Phiêu Lưu" ),
    new Manga ("https://bigdata-vn.com/wp-content/uploads/2021/10/1633718263_618_Hinh-anh-Fairy-Tail-dep-an-tuong-doc-dao-nhat.jpg","Fairy Tail","Chap 9999","Phiêu Lưu"),
    new Manga ("https://upload.wikimedia.org/wikipedia/vi/0/07/Blue_Lock_vol_1.jpg","Blue Lock","Chap 543","Sport"  ),
    new Manga ("https://s199.imacdn.com/ta/2021/11/02/452eccce1041092b_a325f1ea09b77b45_17702516358393546769722.jpg","Spy xFamily","Chap 9669","Trinh Thám" ),
    new Manga ("http://i.truyentranh8.net/2021/0316/31385-x.jpg","Ao Ashi","Chap 14","Sport" ),
    new Manga ("https://product.hstatic.net/200000343865/product/14_54_0153a83d17e042bcba3b21140eae00e4_master.jpg","Black Clover","Chap 333","Phiêu Lưu" ),
    new Manga ("https://kenh14cdn.com/2019/9/3/pic1-1567495080914785829052.jpg","Doraemon","Chap 824","Thiếu Nhi"  ),
    new Manga ("https://product.hstatic.net/200000343865/product/22_27_1dceee12826d4be9bac1e201cf1392e5.jpg","Shin cbbc","Chap 55","Thiếu Nhi" ),
    new Manga ("https://ssl.latcdn.com/img/zK39gB8M9-boruto_chapter_23.png","Boruto","Chap 3000","Phiêu Lưu" ),
    new Manga ("https://upload.wikimedia.org/wikipedia/vi/3/3e/Naruto_01_m.jpg","Naruto","Chap 8888","Phiêu Lưu" ),
    new Manga ("https://photo-cms-anninhthudo.zadn.vn/w660/Uploaded/2022/abhusbb/2021_04_24/tham-tu-lung-danh-conan-vien-dan-do-dang-chieu-thanh-cong-tai-nhat-va-cac-thi-truong-khac-8795.jpg","Conan","Chap 2022","Trinh Thám" ),
            ];
 
setLocal(key_local,manga);}
else{
    manga = getLocal(key_local);
}
}

function getLocal (key){
    return JSON.parse(localStorage.getItem(key))
   }
   function setLocal(key,value){
       localStorage.setItem(key, JSON.stringify(value))
        }
function renderManga (listManga){
    var html = listManga.map(function(mana,index){
        return`
        <ul class="item-photo">
                    <li>
                        <div>
                            <a href="#">
                            <span  id="chap${index}" class="photo1">${mana.chap}</span>
                            <span id="category${index}" class="photo2">${mana.category}</span>
                            <img id="photo${index}" onclick="pic()" class="item-thumbai"
                            src="${mana.photo}"
                            alt="">
                             
                            </a>
                            <div>
                                <h3 id="nameManga${index}"  class="item-title">${mana.nameManga}</h3>
                            </div>
                            <div id="active" style="display: " ;>
                                <div class="active-btn">
                                     
                                      <button onclick="removeComic(${index})"><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                        <div>
                         
                        </div>
                    </li>
                </ul>
        `
    });
    document.querySelector(".show-manga").innerHTML=html.join("");
}
{/* <button onclick="editComic(${index})"><i class="fa-solid fa-pen-to-square"></i></button> */}
 function addComic(){
     let namemanga = document.getElementById("ipname").value;
     if(!validation(namemanga)){
         alert("Please enter information")
         return;
     }
     const newcomic = new Manga();
     newcomic.photo= document.querySelector("#ipphoto").value;
     newcomic.nameManga= document.querySelector("#ipname").value;
     newcomic.chap= document.querySelector("#ipchap").value;
     newcomic.category= document.querySelector("#ipcategory").value;
     manga.push(newcomic);
     resetForm ()
renderManga(manga)
localStorage.setItem(key_local, JSON.stringify(manga));
 }
 function validation(field) {
    return field != null && field.trim() != '';
}

 function resetForm (){
     document.querySelector("#ipphoto").value=""
     document.querySelector("#ipname").value=""
     document.querySelector("#ipchap").value=""
     document.querySelector("#ipcategory").value=""
 }


     //Ô tìm kiếm TRUYỆN
function searcher(event){
    //  var seach = document.querySelector("#searchh").value;
    var keyword = event.target.value;
    var result = manga.filter(function(mangaValue){
        return mangaValue.nameManga.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
   });

   renderManga(result);
   
      
}
// ---- Xóa phần từ
function removeComic(index){
  let confirmed = window.confirm("You Are Sure ?¿");
  if(confirmed){

    manga.splice(index,1 );
    }
      renderManga(manga);
      localStorage.setItem(key_local, JSON.stringify(manga))
}

// function editComic(index){
//     document.querySelector("#ipphoto").value=manga[index].photo;
//      document.querySelector("#ipname").value=manga[index].nameManga;
//      document.querySelector("#ipchap").value=manga[index].chap;
//      document.querySelector("#ipcategory").value=manga[index].category;
//     //  document.querySelector('#index').value = index;
//      document.getElementById("add").style.display="none";
//      document.getElementById("update").style.display="inline-block"
    
//      localStorage.setItem(key_local, JSON.stringify(manga));
//     renderManga(manga) 
// }

  
 
function phieuluu(){
     var result = manga.filter(function(categoryAdventure){
         return categoryAdventure.category.indexOf("Phiêu Lưu") !=-1
     })
     
    renderManga(result)
}

function thieunhi(){
    var result = manga.filter(function(categoryChildren){
         return categoryChildren.category.indexOf("Thiếu Nhi") !=-1
    })
    renderManga(result)
}

function trinhtham(){
    var result = manga.filter(function(categoryDetective){
         return categoryDetective.category.indexOf("Trinh Thám") !=-1
    })
    renderManga(result)
}

function sport(){
    var result = manga.filter(function(categorySport){
         return categorySport.category.indexOf("Sport") !=-1
    })
    renderManga(result)
}

function run(){
init();
renderManga(manga);
}
run()
  
 