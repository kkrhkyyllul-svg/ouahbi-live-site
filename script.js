// وظيفة الوضع المظلم
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// تحميل الوضع المظلم من localStorage
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

darkModeToggle.addEventListener('click', toggleDarkMode);

// وظيفة البحث داخل الصفحة
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const articles = document.querySelectorAll('.news-card, .feature-article');
    articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        // إخفاء أو إظهار العنصر
        if (text.includes(query) || query === '') {
            article.style.display = 'block';
        } else {
            article.style.display = 'none';
        }
    });
    // يمكن إضافة رسالة "لا توجد نتائج" هنا إذا لزم الأمر
});

// وظيفة الmodal للتفاصيل (تم تحديثها لدعم الفيديو)
const modal = document.getElementById('newsModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalVideoFrame = document.getElementById('modalVideoFrame');
const modalContent = document.getElementById('modalContent');
const modalDate = document.getElementById('modalDate');
const modalComments = document.getElementById('modalComments');
const closeBtn = document.querySelector('.close-btn');

// دالة لمعالجة فتح الـ Modal
document.addEventListener('click', (e) => {
    if (e.target.matches('.details-btn')) {
        e.preventDefault();
        const btn = e.target;
        const dataType = btn.getAttribute('data-type');
        
        // إخفاء جميع العناصر قبل العرض
        modalImage.style.display = 'none';
        modalVideoFrame.style.display = 'none';
        modalContent.textContent = ''; // مسح المحتوى القديم
        modalDate.textContent = '';
        modalComments.textContent = '';
        
        // تعيين العنوان (من data-title أو من العنصر السابق)
        const articleTitleElement = btn.closest('.article-content') ? btn.closest('.article-content').querySelector('.article-title') : btn.closest('.match-item').querySelector('span');
        modalTitle.textContent = btn.getAttribute('data-title') || articleTitleElement.textContent;


        if (dataType === 'news') {
            // عرض الخبر العادي
            const image = btn.getAttribute('data-image');
            const content = btn.getAttribute('data-content');
            const date = btn.getAttribute('data-date');
            const comments = btn.getAttribute('data-comments');

            modalImage.style.backgroundImage = `url(${image})`;
            modalContent.textContent = content;
            modalDate.textContent = date;
            modalComments.textContent = comments;
            
            modalImage.style.display = 'block';
            
        } else if (dataType === 'live') {
            // عرض البث المباشر - الكود المحدث
            let videoUrl = btn.getAttribute('data-url');
            
            // إزالة معلمات التشغيل التلقائي/الصوت إن وجدت لضمان التوافق
            videoUrl = videoUrl.replace('?autoplay=1&mute=0', '').replace('?autoplay=1&mute=1', '');

            // بناء كود iframe يوتيوب
            const youtubeIframe = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>`;

            // إضافة iframe إلى حاوية الفيديو
            modalVideoFrame.innerHTML = youtubeIframe;
            modalVideoFrame.style.display = 'block';
            
            // إخفاء المحتوى النصي المخصص للأخبار
            modalContent.textContent = '';
            modalDate.textContent = 'بث مباشر الآن';
            modalComments.textContent = ''; 
        }

        modal.style.display = 'block';
    }
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    // إيقاف تشغيل الفيديو عند إغلاق الـ Modal
    modalVideoFrame.innerHTML = ''; 
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        // إيقاف تشغيل الفيديو عند إغلاق الـ Modal
        modalVideoFrame.innerHTML = '';
    }
});

// fallback للصور
document.querySelectorAll('img, .card-img, .article-img').forEach(el => {
    // هذه الوظيفة تعمل فقط للـ divs التي تستخدم background-image
    if (el.classList.contains('card-img') || el.classList.contains('article-img')) {
        // نعتمد على onerror في HTML
    } else if (el.tagName === 'IMG') {
        el.addEventListener('error', () => {
            el.src = 'https://via.placeholder.com/300x200?text=صورة+غير+متاحة';
        });
    }
});