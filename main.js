//parallax header start

const fantasy = document.querySelector('.fantasy'),
    clouds = document.querySelectorAll('.cloud'),
    boat = document.querySelector('.boat');
window.addEventListener('scroll', function(){
   fantasy.style.objectPosition = `0 ${window.scrollY / 10}%`;
   clouds.forEach(item => {
        const speed = item.getAttribute('data-speed');
        item.style.transform = `translateX(${window.scrollY * speed}px)`;
   });
   boat.style.transform = `translateX(${window.scrollY * -0.5}px)`;
});

//parallax header end

//section parallax start

const sectionBox = document.querySelector('.section__box'),
    layers = document.querySelectorAll('.layer');
sectionBox.addEventListener('mousemove', (e) => {
    layers.forEach(item => {
        const speed = item.getAttribute('data-speed');
        const x = e.clientX * speed / 100;
        const y = e.clientY * speed / 100;
        item.style.transform = `translate(${x}px, ${y}px)`;
    });
})

//section parallax end

//count numbers on scroll start

const timer = document.querySelector('.timer'),
    timerNum = document.querySelectorAll('.timer__num');
    // console.log(timer.offsetTop); //отступ от элемента до начала сайта
function scrollCount(dur = 2000){
    timerNum.forEach(item => {
        const count = item.getAttribute('data-num');
        item.innerHTML = 0;
        item.parentElement.classList.add('active');
        plus(0, item, count);
    });
    function plus(i, elem, num){
        if(i < num) {
            i++;
            elem.innerHTML = i;
            setTimeout(plus, dur/num, i, elem, num);
            // setTimeout(() => {
            //     plus(i, elem, num);
            // }, dur/num);
        }
    }
}

window.addEventListener('scroll', function onScroll(){
    if(window.scrollY > timer.offsetTop - window.innerHeight/2) {
        scrollCount(3000);
        window.removeEventListener('scroll', onScroll);
    }
});
//count numbers on scroll end

//todo list start

const form = document.querySelector('.box'),
    formInput = document.querySelector('.box__inp'),
    list = document.querySelector('.list');
form.addEventListener('submit', function(e){
    e.preventDefault();
    let li = document.createElement('li');
    li.classList.add('list__item');
    li.innerHTML = `${formInput.value} <button class="list__btn remove">X</button>`;
    list.append(li);
    this.reset();
    rmList();
});

function rmList(){
    const rm = document.querySelectorAll('.remove');
    if(rm) {
        rm.forEach(item => {
            item.addEventListener('click', function(e){
                e.preventDefault();
                this.parentElement.remove();
            })
        })
    }
}
rmList();

//todo list end

//accordion start

const accordName = document.querySelectorAll('.accord__name');
accordName.forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault();
        if(!this.classList.contains('active')){
            accordName.forEach(item => {
                item.classList.remove('active');
                item.nextElementSibling.style.height = '0px';
            })
            this.classList.add('active');
            item.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
        }
        else {
            this.classList.remove('active');
            this.nextElementSibling.style.height = '0px';
        }
    })
})

//accordion end

// hover rotating images start

const hoverImg = document.querySelectorAll('.hover__item img');
hoverImg.forEach(item => {
    item.addEventListener('mousemove', function(e){
        let bound = this.getBoundingClientRect();
        const x = (e.clientX - bound.x - this.clientWidth / 2) *-1;
        const y = (e.clientY - bound.y - this.clientHeight / 2);
        this.style.transform = `perspective(${this.clientWidth}px) rotateX(${x/20}deg) rotateY(${y/10}deg)`;
    });
    item.addEventListener('mouseout', function(){
        this.style.transform = '';
    });
})

// hover rotating images end
function some(entries){
    if(entries[0].isIntersecting){
        entries[0].target.classList.add('active');
    }
}
hoverImg.forEach(item => {
    let elem = new IntersectionObserver(some);
    elem.observe(item.parentElement);
});