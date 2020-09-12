




for (var i = 0; i < document.querySelectorAll(".fab").length; i++) {
  document.querySelectorAll(".fab")[i].addEventListener("click", function() {
    switch (this.id) {
      case 'git':
        window.location.href = "https://github.com/abhishekD97"
        break;
      case 'lin':
        window.location.href = "https://www.linkedin.com/in/abhishek-dolli-0526b4196"
        break;
      case 'ins':
        window.location.href = "https://www.instagram.com/cyborg_8274/"
        break;
      default:
    }
  });
}
