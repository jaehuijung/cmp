const tabClicked = (e) => {
  const tab = document.querySelectorAll(".tab-menu ul li");
  const tabItem = document.querySelectorAll(".tab .tab-item");

  for (let i = 0; i < tabItem.length; i++) {
    tab[i].classList.remove("active");
    e.classList.add("active");
    tabItem[i].classList.remove("active");
    if (e.dataset.tabmenu === tabItem[i].dataset.tab) {
      tabItem[i].classList.add("active");
      // setTimeout(() => {
      //   tabItem[i].classList.add("active");
      // }, 400);
    }
  }
};
