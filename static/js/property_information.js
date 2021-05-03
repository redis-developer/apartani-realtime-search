//Test images for testing purposes 
const stockImages = [
  "https://c8.alamy.com/comp/C1G52K/art-deco-apartment-block-dar-es-salaam-tanzania-C1G52K.jpg",
  "https://st2.depositphotos.com/1015412/7702/i/600/depositphotos_77024653-stock-photo-apartments.jpg",
  "https://thumbs.dreamstime.com/b/modern-apartment-building-5569745.jpg",
  "https://st2.depositphotos.com/1658611/6903/i/950/depositphotos_69030443-stock-photo-typical-suburban-apartment-building.jpg",
  "https://t4.ftcdn.net/jpg/01/22/80/93/360_F_122809314_qqF2qH028iOn3FC43M0TL40hdXz6B5Mr.jpg",
  "https://s.realpage.com/wp-content/uploads/sites/20/2016/02/shutterstock_141042463-1-e1619105338909.jpg",
  "https://pixnio.com/free-images/2017/10/21/2017-10-21-07-59-49.jpg",
];
var numClicks = 0;
socket.on("property_result", function (data) {
  document.getElementById("selection-price").innerText = "$" + data.price;
  document.getElementById("selection-area").innerText = data.area;
  document.getElementById("selection-bathrooms").innerText = data.baths;
  document.getElementById("selection-rooms").innerText = data.rooms;
  document.getElementById("selection-img").src = stockImages[numClicks];
  //Loop over stock images
  numClicks++;
  if (numClicks >= stockImages.length ) {
      numClicks = 0
  }
});
