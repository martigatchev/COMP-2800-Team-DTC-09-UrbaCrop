function main() {
  document.getElementById("list_toggle_button").addEventListener("click", toggle_visibility)
}
function toggle_visibility() {
  document.getElementById("accordionPanelsStayOpenExample").classList.toggle("invisible");
}

main();