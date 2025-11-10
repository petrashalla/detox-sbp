Fancybox.bind("[data-fancybox]", {
    // Your custom options
});

// animation 
const animationItems = document.querySelectorAll('.animation-item');
if (animationItems.length > 0) {
    function onEntry(e) {
        e.forEach(e => {
            e.isIntersecting && e.target.classList.add("animation-active")
        }
        )
    }
    let options = {
        threshold: [.5]
    }, observer = new IntersectionObserver(onEntry, options)
    for (let e of animationItems)
        observer.observe(e);
}
// end animation


let scrollWidthFunc = () => {
    let scrollWidth = window.innerWidth - document.body.clientWidth;
    document.querySelector('html').style.paddingRight = scrollWidth + 'px';
    document.querySelector('.header__top').style.paddingRight = scrollWidth + 'px';
}


const scrollTop = document.querySelector('.scroll-top');
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTop.classList.remove('hidden');
        } else {
            scrollTop.classList.add('hidden');
        }
    });
    
    // Инициализация
    if (window.scrollY > 300) {
        scrollTop.classList.add('scroll-top--visible');
    } else {
        scrollTop.classList.add('hidden');
    }
}


document.addEventListener("DOMContentLoaded", function () {
    /* burger menu */
    const burgerMenu = document.querySelector('#burger');
    if (burgerMenu) {
        const headerMobile = document.querySelector('.header__bottom');
        const header = document.querySelector('.header');
        burgerMenu.addEventListener("click", () => {
            if (burgerMenu.classList.contains('open')) {
                document.body.classList.remove('burger-lock');
            }
            else {
                document.body.classList.add('burger-lock');
            }
            headerMobile.classList.toggle("open");
            burgerMenu.classList.toggle("open");
            header.classList.toggle("header--active");
            document.querySelector('html').classList.toggle('burger-lock');
        });
    }
    /* end burger menu */


    /* mobile menu */
    // Функция пересчёта полной высоты (с учётом вложенных списков)
    function getFullHeight(element) {
        let clone = element.cloneNode(true);
        clone.style.maxHeight = "none";
        clone.style.height = "auto";
        clone.style.opacity = "0";
        clone.style.position = "absolute";
        clone.style.pointerEvents = "none";
        document.body.appendChild(clone);
        let height = clone.scrollHeight;
        document.body.removeChild(clone);
        return height;
    }

    const navButtons = document.querySelectorAll(".header__nav-item");
    // Первый уровень аккордеона
    navButtons.forEach(btn => {
        const sublist = btn.querySelector(".header__nav-submenu");
        const arrow = btn.querySelector(".header__nav-arrow");

        arrow?.addEventListener("click", (e) => {
            if (window.innerWidth >= 1024) return;
            if (sublist.contains(e.target)) return;

            btn.classList.toggle("active");

            if (btn.classList.contains("active")) {
                sublist.style.maxHeight = getFullHeight(sublist) + "px";
            } else {
                sublist.style.maxHeight = null;
            }
        });

        // Второй уровень аккордеона
        const arrows = sublist?.querySelectorAll(".header__nav-arrow");
        arrows?.forEach(arrow => {
            const link = arrow.previousElementSibling;
            const subsublist = arrow.nextElementSibling;

            arrow.addEventListener("click", (e) => {
                e.stopPropagation();
                arrow.classList.toggle("active");
                link.classList.toggle("active");

                if (arrow.classList.contains("active")) {
                    subsublist.style.maxHeight = subsublist.scrollHeight + "px";
                } else {
                    subsublist.style.maxHeight = null;
                }

                // пересчитать высоту родителя с учётом всех элементов
                sublist.style.maxHeight = getFullHeight(sublist) + "px";
            });
        });
    });
    /* end mobile menu */



    // Popups
    function popupClose(popupActive) {
        popupActive.classList.remove('open');
        setTimeout(() => {
            if (!popupActive.classList.contains('open')) {
                popupActive.classList.remove('active');
            }
        }, 400);
        document.body.classList.remove('lock');
        document.querySelector('html').style.paddingRight = 0;
        document.querySelector('html').classList.remove('lock');
        document.querySelector('.header__top').style.paddingRight = 0;
    }

    const popupOpenBtns = document.querySelectorAll('.popup-btn');
    const popups = document.querySelectorAll('.popup');
    const originalTitlePopup2 = document.querySelector('.original-title')?.innerHTML;
    const closePopupBtns = document.querySelectorAll('.close-popup-btn');
    closePopupBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            popupClose(e.target.closest('.popup'));
        });
    });
    popupOpenBtns.forEach(function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault();
            const path = e.currentTarget.dataset.path;
            const currentPopup = document.querySelector(`[data-target="${path}"]`);
            if (currentPopup) {
                popups.forEach(function (popup) {
                    popupClose(popup);
                    popup.addEventListener('click', function (e) {
                        if (!e.target.closest('.popup__content')) {
                            popupClose(e.target.closest('.popup'));
                        }
                    });
                });
                currentPopup.classList.add('active');
                setTimeout(() => {
                    currentPopup.classList.add('open');
                }, 10);
                if (currentPopup.getAttribute('data-target') == 'popup-change') {

                    let originaTitle = currentPopup.querySelector('.original-title');
                    if (el.classList.contains('change-item__btn')) {

                        if (el.classList.contains('doctor__btn-js')) {
                            let currentItem = el.closest('.change-item');
                            let currentTitile = currentItem.querySelector('.change-item__title');
                            originaTitle.innerHTML = 'Записаться на приём к врачу: ' + currentTitile.innerHTML
                        }
                        else {
                            if (el.classList.contains('change-item__btn_current')) {
                                originaTitle.textContent = el.textContent;
                            }
                            else {
                                let currentItem = el.closest('.change-item');
                                let currentTitile = currentItem.querySelector('.change-item__title');
                                originaTitle.innerHTML = currentTitile.innerHTML
                            }
                        }
                    }
                    else {
                        originaTitle.innerHTML = originalTitlePopup2;
                    }
                }

                if (currentPopup.getAttribute('data-target') == 'popup-jobs') {
                    let currentItems = el.closest('.jobs__items') 
                    let originalText = currentPopup.querySelector('.jobs__inner_original');
                    if(originalText && currentItems.querySelector('.jobs__inner')) {
                        originalText.innerHTML = currentItems.querySelector('.jobs__inner').innerHTML;
                    }
                }
                e.stopPropagation();
                scrollWidthFunc();
                document.querySelector('html').classList.add('lock');
            }
        });
    });
    // end popups



    /* yandex map */
    const mapPlaceholder = document.getElementById('map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.addEventListener('mouseenter', loadMap, { once: true });
        mapPlaceholder.addEventListener('click', loadMap, { once: true });
    } else {
        loadMap();
    }

    function loadMap() {
        if (!document.querySelector('[src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"]')) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
            script.onload = initMap;
            document.head.appendChild(script);
        } else {
            initMap();
        }
    }
    
    function initMap() {
        const mapPlaceholder = document.getElementById('map-placeholder');
        if (mapPlaceholder) {
            mapPlaceholder.remove();
        }
    
        ymaps.ready(function () {
            const myMap = new ymaps.Map('map', {
                center: [47.231129, 39.728721],
                zoom: 13,
                controls: []
            });
    
            const myPlacemark = new ymaps.Placemark(
                [47.231129, 39.728721],
                {
                    hintContent: 'Клиника «Детокс СПБ»',
                    balloonContent: 'Клиника «Детокс СПБ»'
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: 'assets/img/icons/location.png', 
                    iconImageSize: [21, 26],
                    iconImageOffset: [-15, -31],
                }
            );
    
            myMap.geoObjects.add(myPlacemark);
            myMap.behaviors.disable(['scrollZoom']);
        });
    }
    /* end yandex map */



    /* пагинация на отзывах и статьях */
    const paginationContent = document.querySelector('.pagination-content'); 
    
    if(paginationContent) {
        const itemsPerPage = paginationContent.dataset.pagination;
        let currentPage = 0;
        const items = Array.from(paginationContent.querySelectorAll('.pagination-item')).slice(0);
        console.log(items.length / itemsPerPage);
        
        function showPage(page) {
            const startIndex = page * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            items.forEach((item, index) => {
                item.classList.toggle('hidden', index < startIndex || index >= endIndex);
            });
            updateActiveButtonStates();
        }
        
        function createPageButtons() {
            const totalPages = Math.ceil(items.length / itemsPerPage);
            const paginationContainer = document.createElement('div');
            const paginationDiv = document.body.appendChild(paginationContainer);
            paginationContainer.classList.add('pagination');
        
            // Add previous button
            const prevButton = document.createElement('button');
            prevButton.innerHTML = '<span>Назад</span>';
            prevButton.classList.add('prev-button');
            prevButton.classList.add('link');
            prevButton.addEventListener('click', () => {
                if (currentPage > 0) {
                    currentPage--;
                    showPage(currentPage);
                }
            });
        
            // Add page buttons
            for (let i = 0; i < totalPages; i++) {
                const pageButton = document.createElement('button');
                pageButton.classList.add('pagination-btn');
                pageButton.textContent = i + 1;
                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    showPage(currentPage);
                });
                paginationDiv.appendChild(pageButton);
            }
        
            // Add next button
            const nextButton = document.createElement('button');
            nextButton.innerHTML = '<span>Вперед</span>';
            nextButton.classList.add('next-button');
            nextButton.classList.add('link');
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages - 1) {
                    currentPage++;
                    showPage(currentPage);
                }
            });
        
            paginationDiv.insertBefore(prevButton, paginationDiv.firstChild);
            paginationDiv.appendChild(nextButton);
        
            paginationContent.appendChild(paginationContainer);
        }
        
        function updateActiveButtonStates() {
            const totalPages = Math.ceil(items.length / itemsPerPage);
            const pageButtons = document.querySelectorAll('.pagination button');
            const prevButton = document.querySelector('.prev-button');
            const nextButton = document.querySelector('.next-button');
    
            pageButtons.forEach((button, index) => {
                if (button.classList.contains('prev-button') || button.classList.contains('next-button')) {
                    return; 
                }
                
                if (index - 1 === currentPage) { 
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
        
            if (prevButton) {
                prevButton.disabled = currentPage === 0;
                prevButton.classList.toggle('disabled', currentPage === 0);
            }
            
            if (nextButton) {
                nextButton.disabled = currentPage === totalPages - 1;
                nextButton.classList.toggle('disabled', currentPage === totalPages - 1);
            }
        }
        
        if(items.length / itemsPerPage > 1) {
            createPageButtons();
            showPage(currentPage);
        }
    }
    /* конец пагинации */


    /*  фильтрация карточек на стр статей */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    if(filterButtons.length > 0 && filterItems.length > 0) {
        const originalDisplay = window.getComputedStyle(filterItems[0]).display;
        
        function filterCards(category) {
            filterItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-id') === category) {
                    item.style.display = originalDisplay;
                    item.classList.add('active');
                    item.classList.remove('hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('active');
                    item.classList.add('hidden');
                }
            });
        }
        
        function activateButton(button) {
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');
        }
    
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-id');
                activateButton(this);
                filterCards(category);
            });
        });
        
        filterCards('all');
    }
    /*  конец фильтрации  */




    /*  search */
	const inputSearch = document.querySelectorAll('input[type=search]')
	if (inputSearch.length > 0) {
		inputSearch.forEach(elem => {
			const wrapper = elem.closest('.search-wrapper')
			if (wrapper) {
				const searchResultBlock = wrapper.querySelector('.search__result')
				const noResultsMessage = wrapper.querySelector('.search__no-result')

				function search() {
					let filter = elem.value.toUpperCase()
					let ul = wrapper.querySelectorAll('.search-list')
					let totalResults = 0

					ul.forEach(item => {
						let li = item.getElementsByTagName('li')
						for (let i = 0; i < li.length; i++) {
							let a = li[i].querySelector('.search-name')
							if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
								li[i].classList.remove('none')
								totalResults++
							} else {
								li[i].classList.add('none')
							}
						}
					})

					if (elem.value.trim() === '') {
						searchResultBlock.classList.add('none')
					} else {
						searchResultBlock.classList.remove('none')
                        searchResultBlock.classList.toggle('none', totalResults == 0);
					}

                    noResultsMessage.classList.toggle('none', totalResults > 0);
				}
				elem.addEventListener('input', search)

                document.addEventListener('click', (event) => {
                    if (!wrapper.contains(event.target)) {
                        searchResultBlock.classList.add('none')
                    }
                })
			}
		})
	}
    /*  end search  */  


    /*  accordion  */
	const acc = document.getElementsByClassName('accordion')
	for (let i = 0; i < acc.length; i++) {
        if(acc[i]) {
            acc[i].addEventListener('click', function () {
                const accContent = this.querySelector('.accordion__content')  || this.parentElement.querySelector('.accordion__content') 
                if (accContent.classList.contains('accordion__content--active')) {
                    accContent.classList.remove('accordion__content--active');
                    this.classList.remove('accordion--active');
                    accContent.style.maxHeight = '0'; 
                } else {
                    accContent.classList.add('accordion__content--active');
                    this.classList.add('accordion--active');
    
                    const contentHeight = accContent.scrollHeight;
                    accContent.style.maxHeight = `${contentHeight}px`;
                }
            })
        }
	}
	/*  end accordion   */


    /*  tab  */
	const showTab = elTabBtn => {
		const elTab = elTabBtn.closest('.tab');
		if (elTabBtn.classList.contains('tab-btn--active')) {
			return;
		}
		const targetId = elTabBtn.dataset.id;
		const elTabPanes = elTab.querySelectorAll(`.tab-content[data-id="${targetId}"]`);

		const elTabBtnActive = elTab.querySelector('.tab-btn--active');
		if (elTabBtnActive) {
			elTabBtnActive.classList.remove('tab-btn--active');
		}

		const elTabPaneShow = elTab.querySelectorAll('.tab-content--active');
		elTabPaneShow.forEach(pane => pane.classList.remove('tab-content--active'));

		elTabBtn.classList.add('tab-btn--active');
		elTabPanes.forEach(pane => pane.classList.add('tab-content--active'));
	};

    const tabButtons = document.querySelectorAll('.tab-btn')
	tabButtons.forEach(btn => {
        if(btn) {
            btn.addEventListener('click', function (e) {
                showTab(this);
                quantityElem();
            });            
        }
	});
	/*  end tab */


    // quantity-card
    function quantityElem() {
        const quantityCards = document.querySelectorAll('.quantity-card');
        const quantityElement = document.querySelector('.quantity span');
        if (quantityElement) {
            let visibleCards = 0;
            quantityCards.forEach(card => {
                if (card.offsetParent !== null) {
                    visibleCards++;
                }
            });
            quantityElement.textContent = visibleCards;
        }
    }
    setTimeout(quantityElem, 100);


    /*  btn more  */
    const moreBtns = document.querySelectorAll('.btn-more');
    moreBtns.forEach(moreBtn => {
        if (moreBtn) {
            const moreContent = moreBtn.previousElementSibling;

            if (moreContent.scrollHeight <= moreContent.clientHeight) {
                moreBtn.style.display = 'none'; 
            } else {
                const textBtn = moreBtn.innerHTML; 
                moreBtn.addEventListener('click', function() {
                    const heightMoreContent = moreContent.style.maxHeight; 
                    this.classList.toggle('active');

                    if (moreContent.style.maxHeight) {
                        moreContent.style.maxHeight = null;
                        this.textContent = textBtn;
                    } else {
                        moreContent.style.maxHeight = moreContent.scrollHeight + "px"; 
                        this.textContent = 'Свернуть';
                    }
                });
            }
        }
    });
    /*  end btn more  */


    /*   scroll buttons  */
	const scrollButtons = document.querySelectorAll('.scroll')
    scrollButtons.forEach(scrollButton => {
        if (scrollButton) {
            scrollButton.addEventListener("click", function (e) {
                e.preventDefault();
                let href = this.getAttribute("href").substring(1);
                const scrollTarget = document.getElementById(href);
                const elementPosition = scrollTarget.getBoundingClientRect().top;
                const offsetPosition = elementPosition - 110;
                window.scrollBy({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            });
        }
    });
    /*   end scroll buttons  */


    /* navigation */
    
    const articleNavigation = document.querySelector(".navigation");
    if (articleNavigation) {
        const jsScrollBlockList = document.querySelectorAll(
            ".text-block h1, .text-block h2, .text-block h3, .text-block h4"
        );
    
        if (jsScrollBlockList.length > 0) {
            for (let i = 0; i < jsScrollBlockList.length; i += 1) {
                const jsScrollBlock = jsScrollBlockList[i];
                const titleBlock = jsScrollBlock.textContent;
                const articleNavigationList =
                    document.querySelector(".navigation__list");
                const articleNavigationItem = document.createElement("li");
                const articleNavigationLink = document.createElement("a");
                if (jsScrollBlock.tagName == "H1") {
                    articleNavigationItem.classList.add("nav-title-h1");
                }
                articleNavigationItem.classList.add("navigation__item");
                if (jsScrollBlock.tagName == "H2") {
                    articleNavigationItem.classList.add("nav-title-h2");
                } else if (jsScrollBlock.tagName == "H3") {
                    articleNavigationItem.classList.add("nav-title-h3");
                } else if (jsScrollBlock.tagName == "H4") {
                    articleNavigationItem.classList.add("nav-title-h4");
                } else if (jsScrollBlock.tagName == "H5") {
                    articleNavigationItem.classList.add("nav-title-h5");
                } else if (jsScrollBlock.tagName == "H6") {
                    articleNavigationItem.classList.add("nav-title-h6");
                }
                articleNavigationLink.classList.add("navigation__link");
                jsScrollBlock.setAttribute("id", `${i}`);
                articleNavigationLink.setAttribute("href", `$${i}`);
                articleNavigationLink.textContent = " " + titleBlock;
                articleNavigationItem.append(articleNavigationLink);
                articleNavigationList.append(articleNavigationItem);
            }
            document.querySelectorAll('a[href^="$"').forEach((link) => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    let href = this.getAttribute("href").substring(1);
                    const scrollTarget = document.getElementById(href);
                    const topOffset = 280;
                    const elementPosition = scrollTarget.getBoundingClientRect().top;
                    const offsetPosition = elementPosition - topOffset;
                    window.scrollBy({
                        top: offsetPosition,
                        behavior: "smooth",
                    });
                });
            });
        } else {
            if(articleNavigation.querySelector(".navigation")) {
                articleNavigation.querySelector(".navigation").remove();
            }
        }
    }
    /* end navigation */



})


document.addEventListener('DOMContentLoaded', function() {
    const formWrapper = document.querySelector('.alcotest__form');
    let drinkCount = 1;
    const maxDrinks = 5;

    function createDrinkBlock() {
        drinkCount++;
        const newBlock = document.querySelector('#drink-block-1').cloneNode(true);
        
        // Обновляем ID и значения
        newBlock.id = `drink-block-${drinkCount}`;
        
        const inputs = newBlock.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.value = '';
            const oldId = input.id;
            const newId = oldId.replace(/\d+$/, drinkCount);
            input.id = newId;
            
            // Обновляем for атрибут у label
            const label = newBlock.querySelector(`label[for="${oldId}"]`);
            if (label) {
                label.setAttribute('for', newId);
            }
        });
        
        // Показываем кнопку удаления
        const removeBtn = newBlock.querySelector('.remove-drink-btn');
        removeBtn.style.display = 'inline-block';
        
        return newBlock;
    }

    function updateButtons() {
        const addButtons = document.querySelectorAll('.add-drink-btn');
        const removeButtons = document.querySelectorAll('.remove-drink-btn');
        if(addButtons) {
            // Скрываем все кнопки добавления
            addButtons.forEach(btn => btn.style.display = 'none');
            
            // Показываем кнопку добавления только в последнем блоке
            if (drinkCount < maxDrinks) {
                addButtons[0].style.display = 'inline-block';
            }
            
            // Управляем кнопками удаления
            removeButtons.forEach((btn, index) => {
                btn.style.display = index === (0) ? 'none' : 'inline-block';
            });
        }      
    }

    formWrapper?.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-drink-btn')) {
            if (drinkCount < maxDrinks) {
                const currentBlock = e.target.closest('.alcotest__form-block');
                const newBlock = createDrinkBlock();
                
                // Вставляем сразу после текущего блока
                currentBlock.after(newBlock);
                updateButtons();
            }
        }
        
        if (e.target.classList.contains('remove-drink-btn')) {
            const blockToRemove = e.target.closest('.alcotest__form-block');
            if (blockToRemove && blockToRemove.id !== 'drink-block-1') {
                blockToRemove.remove();
                drinkCount--;
                updateButtons();
            }
        }
    });

    updateButtons();
});

