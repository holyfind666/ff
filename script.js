// Инициализация анимаций
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Изменение навигации при скролле
window.addEventListener('scroll', function () {
    const nav = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Плавный скролл
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    const originalBtnText = submitBtn.innerHTML;

    // Показываем загрузку
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Отправка...';
    submitBtn.disabled = true;

    const formData = new FormData(this);

    try {
        // Замени 'your-form-id' на ID твоей формы из Formspree
        const response = await fetch('https://formspree.io/f/xpqggara', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formMessage.style.display = 'block';
            formMessage.className = 'alert alert-success mt-3';
            formMessage.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Заявка успешно отправлена! Я свяжусь с вами в ближайшее время.';
            this.reset();
        } else {
            throw new Error('Ошибка отправки');
        }
    } catch (error) {
        formMessage.style.display = 'block';
        formMessage.className = 'alert alert-warning mt-3';
        formMessage.innerHTML = '<i class="bi bi-exclamation-triangle-fill me-2"></i>Что-то пошло не так. Напишите мне напрямую в Telegram: <a href="https://t.me/your_username">@your_username</a>';
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;

        // Скрываем сообщение через 5 секунд
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});