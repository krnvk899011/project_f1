//Mobile Menu Toggle
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('active');
        }
    });
});
// Gallery Data - замените на реальные URL
const galleryData = {
    photos: [
        { src: '1.JPG', alt: 'Команда в боксах' },
        { src: 'm1.JPG', alt: 'Команда в боксах' },
        { src: '2.JPG', alt: 'Пилоты на подиуме' },
        { src: 'm2.JPG', alt: 'Команда в боксах' },
        { src: '4.JPG', alt: 'Болид на трассе' },
        { src: '5.JPG', alt: 'Командная встреча' },
        { src: 'm3.JPG', alt: 'Команда в боксах' },
        {src: '6.JPG', alt: 'Команда в боксах' },
        { src: 'm4.JPG', alt: 'Команда в боксах' },
        { src: '7.JPG', alt: 'Пилоты на подиуме' },
        { src: 'm5.JPG', alt: 'Команда в боксах' },
        { src: '8.JPG', alt: 'Техническая команда' },
        { src: 'm6.JPG', alt: 'Команда в боксах' },
        { src: '9.JPG', alt: 'Болид на трассе' },
        { src: 'm7.JPG', alt: 'Команда в боксах' },
        { src: '10.JPG', alt: 'Командная встреча' },
        { src: 'm8.JPG', alt: 'Команда в боксах' },
        { src: '11.JPG', alt: 'Болид на трассе' },
        { src: 'm9.JPG', alt: 'Команда в боксах' },
        { src: '12.JPG', alt: 'Командная встреча' },
        { src: 'm10.JPG', alt: 'Команда в боксах' },
        { src: '13.JPG', alt: 'Командная встреча' }

    ],
    videos: [
        { src: 'video1.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'mv1.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video2.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'mv2.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video3.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'video4.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'mv3.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video5.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video16.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'mv4.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video7.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video8.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'mv5.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video9.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video10.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'mv6.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video11.MP4', poster: '11.JPG', title: '',muted: false },
        { src: 'video12.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'mv7.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video13.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'video14.MP4', poster: '11.JPG', title: '' ,muted: false},
        { src: 'mv8.MP4', poster: '11.JPG', title: '' ,muted: false}
  
    ]
    
       
};

// Gallery functionality
class Gallery {
    constructor(type, data) {
        this.type = type;
        this.data = data;
        this.currentIndex = 0;
        this.init();
    }
    

    init() {
        this.createGallery();
        this.setupControls();
        this.showItem(0);
    }

    

    createGallery() {
        const galleryTrack = document.getElementById(`${this.type}Gallery`);
        const thumbnails = document.getElementById(`${this.type}Thumbnails`);
        
        galleryTrack.innerHTML = '';
        thumbnails.innerHTML = '';
        
        this.data.forEach((item, index) => {
            // Создаем основной элемент галереи
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            if (this.type === 'photo') {
                const img = document.createElement('img');
                img.src = item.src;
                img.alt = item.alt;
                galleryItem.appendChild(img);
            } else {
                const videoWrapper = document.createElement('div');
                videoWrapper.className = 'video-wrapper';
                
                const video = document.createElement('video');
                video.src = item.src;
                video.poster = item.poster;
                video.controls = false;
                video.preload = 'metadata';
                
                const overlay = document.createElement('div');
                overlay.className = 'video-overlay';
                
                const playBtn = document.createElement('button');
                playBtn.className = 'play-btn';
                playBtn.innerHTML = '▶';
                playBtn.addEventListener('click', () => {
                    video.play();
                    overlay.style.display = 'none';
                });
                
                overlay.appendChild(playBtn);
                videoWrapper.appendChild(video);
                videoWrapper.appendChild(overlay);
                
                // Контролы для видео
                const videoControls = document.createElement('div');
                videoControls.className = 'video-controls';
                
                const muteBtn = document.createElement('button');
                muteBtn.innerHTML = '🔇 Выкл звук';
                muteBtn.addEventListener('click', () => {
                    video.muted = !video.muted;
                    muteBtn.innerHTML = video.muted ? '🔊 Вкл звук' : '🔇 Выкл звук';
                });
                
                videoControls.appendChild(muteBtn);
                videoWrapper.appendChild(videoControls);
                
                galleryItem.appendChild(videoWrapper);
                
                // Пауза при переключении
                video.addEventListener('play', () => {
                    document.querySelectorAll(`${this.type}Gallery video`).forEach(v => {
                        if (v !== video) v.pause();
                    });
                });
            }
            
            galleryTrack.appendChild(galleryItem);
            
            // Создаем миниатюру
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.dataset.index = index;
            
            if (this.type === 'photo') {
                const thumbImg = document.createElement('img');
                thumbImg.src = item.src;
                thumbImg.alt = item.alt;
                thumbnail.appendChild(thumbImg);
            } else {
                const thumbVideo = document.createElement('video');
                thumbVideo.src = item.src;
                thumbVideo.poster = item.poster;
                thumbVideo.muted = true;
                thumbVideo.preload = 'metadata';
                thumbnail.appendChild(thumbVideo);
            }
            
            thumbnail.addEventListener('click', () => this.showItem(index));
            thumbnails.appendChild(thumbnail);
        });
    }

    setupControls() {
        const prevBtn = document.getElementById(`prev${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Btn`);
        const nextBtn = document.getElementById(`next${this.type.charAt(0).toUpperCase() + this.type.slice(1)}Btn`);
        
        prevBtn.addEventListener('click', () => this.prevItem());
        nextBtn.addEventListener('click', () => this.nextItem());
        
        // Добавляем управление клавиатурой
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevItem();
            if (e.key === 'ArrowRight') this.nextItem();
        });
    }

    showItem(index) {
        
    this.currentIndex = (index + this.data.length) % this.data.length;
    
    const galleryTrack = document.getElementById(`${this.type}Gallery`);
    const thumbnails = document.querySelectorAll(`#${this.type}Thumbnails .thumbnail`);
    
    // Перемещаем трек галереи
    galleryTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    
    // Обновляем активную миниатюру
    thumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === this.currentIndex);
        
        // Прокручиваем к активной миниатюре
        if (idx === this.currentIndex) {
            thumb.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }
    });
    
    // Пауза всех видео при переключении
    if (this.type === 'video') {
        document.querySelectorAll('#videoGallery video').forEach(video => {
            video.pause();
            video.currentTime = 0;
            const overlay = video.parentElement.querySelector('.video-overlay');
            if (overlay) overlay.style.display = 'flex';
        });
    
}
    }

    prevItem() {
        this.showItem(this.currentIndex - 1);
    }

    nextItem() {
        this.showItem(this.currentIndex + 1);
    }
}

// Инициализация галерей при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('photoGallery')) {
            new Gallery('photo', galleryData.photos);
        }
        if (document.getElementById('videoGallery')) {
            new Gallery('video', galleryData.videos);
        }
        if (document.getElementById('memeGallery')) { // НОВОЕ
            new Gallery('meme', galleryData.memes);
        }
    }, 100);
});
// History Show/Hide Functions
function showFullHistory() {
    document.getElementById('historyShort').style.display = 'none';
    document.getElementById('historyFull').style.display = 'block';
}

function hideFullHistory() {
    document.getElementById('historyFull').style.display = 'none';
    document.getElementById('historyShort').style.display = 'block';
}

// Функция отображения ошибок
function showFormErrors(errors) {
    const errorsContainer = document.getElementById('formErrors');
    errorsContainer.innerHTML = '';
    
    if (errors.length > 0) {
        errors.forEach(error => {
            const errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.textContent = error;
            errorsContainer.appendChild(errorElement);
        });
        errorsContainer.classList.add('active');
    } else {
        errorsContainer.classList.remove('active');
    }
}

// Функция отображения успешной отправки
function showFormSuccess(message) {
    const errorsContainer = document.getElementById('formErrors');
    errorsContainer.innerHTML = '';
    
    const successElement = document.createElement('div');
    successElement.className = 'form-success active';
    successElement.textContent = message;
    errorsContainer.appendChild(successElement);
    errorsContainer.classList.add('active');
}

// Функция валидации формы
// Функция валидации формы
// Функция валидации формы
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const agree = document.getElementById('agree').checked;
    
    const errors = [];
    
    // Валидация имени (только буквы русского и английского алфавита)
    if (name === '') {
        errors.push('Пожалуйста, введите ваше имя');
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
        errors.push('Имя должно содержать только буквы русского или английского алфавита');
    } else if (name.length < 2) {
        errors.push('Имя должно содержать не менее 2 символов');
    }
    
    // Валидация email (формат: example@mail.ru)
    if (email === '') {
        errors.push('Пожалуйста, введите ваш email');
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push('Пожалуйста, введите корректный email адрес (формат: example@mail.ru)');
        }
    }
    
    // Валидация телефона (только 11 цифр)
    if (phone === '') {
        errors.push('Пожалуйста, введите ваш телефон');
    } else {
        // Проверяем, что введены только цифры
        if (!/^\d+$/.test(phone)) {
            errors.push('Телефон должен содержать только цифры (без пробелов и других символов)');
        }
        // Проверяем длину (ровно 11 цифр)
        else if (phone.length !== 11) {
            errors.push('Телефон должен содержать ровно 11 цифр');
        }
    }
    
    // Валидация сообщения (просто должно быть заполнено)
    if (message === '') {
        errors.push('Пожалуйста, введите ваше сообщение');
    } else if (message.length < 10) {
        errors.push('Сообщение должно содержать не менее 10 символов');
    }
    
    // Валидация согласия
    if (!agree) {
        errors.push('Пожалуйста, согласитесь с обработкой персональных данных');
    }
    
    return errors;
}


        // Form Submission
// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Скрываем предыдущие сообщения
    document.getElementById('formErrors').classList.remove('active');
    
    // Валидация формы
    const errors = validateForm();
    
    if (errors.length > 0) {
        showFormErrors(errors);
        return false;
    }
    
    // Показываем индикатор загрузки
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Формируем данные для отправки
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        message: document.getElementById('message').value.trim(),
        agree: document.getElementById('agree').checked,
        timestamp: new Date().toISOString(),
        source: 'Mercedes F1 Contact Form'
    };

    // Отправка данных на Formcarry
    fetch('https://formcarry.com/s/TOPOuH54Qma', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка при отправке формы');
        }
        return response.json();
    })
    .then(data => {
        showFormSuccess('Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.');
        document.getElementById('contactForm').reset();
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Автоматически скрываем сообщение об успехе через 5 секунд
        setTimeout(() => {
            document.getElementById('formErrors').classList.remove('active');
        }, 5000);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        showFormErrors(['Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.']);
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Автоматически скрываем сообщение об ошибке через 5 секунд
        setTimeout(() => {
            document.getElementById('formErrors').classList.remove('active');
        }, 5000);
    });
});

// Ограничение ввода для телефона - только цифры
document.getElementById('phone').addEventListener('input', function(e) {
    // Удаляем все нецифровые символы
    this.value = this.value.replace(/\D/g, '');
    
    // Ограничиваем длину до 11 символов
    if (this.value.length > 11) {
        this.value = this.value.substring(0, 11);
    }
    
    // Скрываем ошибки
    document.getElementById('formErrors').classList.remove('active');
});

// Очистка ошибок при изменении других полей формы
['name', 'email', 'message'].forEach(fieldId => {
    document.getElementById(fieldId).addEventListener('input', function() {
        document.getElementById('formErrors').classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // Если это ссылка на "Главная" или "#home", прокручиваем в самый верх
        if (href === '#home' || href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            // Для остальных якорных ссылок
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
        
        // Close mobile menu after clicking
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.dropdown-parent')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    }
});

// Resize handler to reset mobile menu on desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.nav-links').classList.remove('active');
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Scroll to top when clicking on logo
document.querySelector('.logo').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
