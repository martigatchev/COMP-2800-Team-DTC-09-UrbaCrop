// GARDENER PROFILE JAVASCRIPT

var logo_button = document.getElementById('logo_button')

console.log("bless")

var buttonCounter = 1

logo_button.addEventListener('click', function () {

   console.log(buttonCounter)


   var animation_div = document.getElementById('animation_div')
   var animation_image = document.getElementById('ani_test_image')
   var animation_class = document.getElementsByClassName("animation_class_two")
   var profilePicture = document.getElementById("profile_img")
   var button_group = document.getElementsByClassName("profile_button")
   var profileName = document.getElementById("profile_name_title")
   var profileType = document.getElementById("profile_name_type")

   if (buttonCounter == 3) {

      buttonCounter ++

      profileName.innerHTML = "Suaveman Frog"
      profileType.innerHTML = "Lover, Revolutionary, Spiritual Leader"
      animation_image.style.animationPlayState = "running";
      animation_class[0].style.animationPlayState = "running";
      profilePicture.setAttribute("src", "https://i.kym-cdn.com/entries/icons/original/000/029/498/Frog_relaxing_0-9_screenshot.png")

      for (i = 0; i < button_group.length; i++) {
         button_group[i].style.animationPlayState = "running";
         console.log(button_group[i])
      }

   } else if (buttonCounter == 4) {

      location.reload();

      // animation_image.style.animationPlayState = "paused";
      // animation_class[0].style.animationPlayState = "paused";
      // animation_class[0].style.backgroundColor = "#eef5eb";
      // profilePicture.setAttribute("src", "https://i.pinimg.com/originals/04/1e/bf/041ebf5acc320b19a03c903a419f14a2.jpg")

      // for (i = 0; i < button_group.length; i++) {
      //    button_group[i].style.animationPlayState = "paused";
      // }

   } else {
      buttonCounter ++
   }




   //  if( $("#animation_div").css('display') == 'block') {
   //      animation_div.style.display = "none";
   //      console.log("ok")
   //   } else {
   //      animation_div.style.display = "block"
   //   }

   // if( $("#ani_test_image").css('animation-play-state') == 'paused') {
   //    animation_image.style.animationPlayState = "running";
   //    animation_class[0].style.animationPlayState = "running";
   //    profilePicture.setAttribute("src", "https://i.kym-cdn.com/entries/icons/original/000/029/498/Frog_relaxing_0-9_screenshot.png")
   // } else {
   //    animation_image.style.animationPlayState = "paused";
   //    animation_class[0].style.animationPlayState = "paused";
   //    animation_class[0].style.backgroundColor = "#eef5eb";
   //    profilePicture.setAttribute("src", "https://i.pinimg.com/originals/04/1e/bf/041ebf5acc320b19a03c903a419f14a2.jpg")
   // }

   // if( $(".profile_button").css('animation-play-state') == 'paused') {

   //    for (i = 0; i < button_group.length; i++) {
   //       button_group[i].style.animationPlayState = "running";
   //       console.log(button_group[i])
   //    }
   // } else {

   //    for (i = 0; i < button_group.length; i++) {
   //       button_group[i].style.animationPlayState = "paused";
   //    }
   // }

  });

function initialize() {
   var input = document.getElementById('addressSearch');
   new google.maps.places.Autocomplete(input);
 }

 google.maps.event.addDomListener(window, 'load', initialize);



