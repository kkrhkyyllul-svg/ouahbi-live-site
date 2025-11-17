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

// *** منطق التبويبات (Tabs Logic) الجديد ***
const navItems = document.querySelectorAll('.main-nav .nav-item');
const sections = document.querySelectorAll('.news-section');

function showSection(sectionId) {
    // 1. إخفاء جميع الأقسام
    sections.forEach(section => {
        section.classList.remove('active-section');
    });

    // 2. إظهار القسم المطلوب
    const targetSection = document.getElementById(sectionId + '-section');
    if (targetSection) {
        targetSection.classList.add('active-section');
    }
    
    // 3. مسح نتائج البحث عند تغيير القسم
    searchInput.value = '';
    const articles = document.querySelectorAll('.news-card, .feature-article, .match-item');
    articles.forEach(article => {
        article.style.display = ''; // إعادة إظهار جميع المقالات
    });
}

// إضافة مُستمعي الأحداث لأزرار التنقل
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // إزالة حالة النشاط من جميع الأزرار
        navItems.forEach(nav => nav.classList.remove('active'));
        
        // إضافة حالة النشاط للزر الحالي
        item.classList.add('active');
        
        // عرض القسم المقابل
        const sectionId = item.getAttribute('data-section');
        showSection(sectionId);
    });
});

// وظيفة البحث داخل الصفحة
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    
    // البحث يكون ضمن القسم النشط فقط
    const activeSection = document.querySelector('.news-section.active-section');
    if (!activeSection) return; // لا يوجد قسم نشط

    const articles = activeSection.querySelectorAll('.news-card, .feature-article, .match-item');
    let resultsFound = false;

    articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        // إخفاء أو إظهار العنصر
        if (text.includes(query) || query === '') {
            article.style.display = 'block';
            resultsFound = true;
        } else {
            article.style.display = 'none';
        }
    });

    // يمكن إضافة رسالة "لا توجد نتائج" هنا إذا لزم الأمر
    if (query !== '' && !resultsFound) {
        // يمكنك هنا عرض رسالة أو تنبيه بعدم وجود نتائج
        console.log("No results found in the active section.");
    }
});


// وظيفة الmodal للتفاصيل (المنطق الموحد للخبر والفيديو)
const modal = document.getElementById('newsModal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalVideoFrame = document.getElementById('modalVideoFrame');
const modalContent = document.getElementById('modalContent');
const modalDate = document.getElementById('modalDate');
const modalComments = document.getElementById('modalComments');
const closeBtn = document.querySelector('.close-btn');

// استخدام تفويض الحدث (Event Delegation) للتعامل مع جميع الأزرار details-btn
document.addEventListener('click', (e) => {
    if (e.target.matches('.details-btn')) {
        e.preventDefault();
        const btn = e.target;
        const dataType = btn.getAttribute('data-type');
        
        // إخفاء جميع عناصر الميديا الافتراضية قبل العرض
        modalImage.style.display = 'none';
        modalVideoFrame.style.display = 'none';
        modalVideoFrame.innerHTML = ''; // مسح iframe القديم
        modalContent.textContent = ''; 
        modalDate.textContent = '';
        modalComments.textContent = '';
        
        // تعيين العنوان
        // نبحث عن العنوان إما في data-title أو في العنصر السابق إذا كان بثاً مباشراً
        const articleTitleElement = btn.closest('.article-content') ? btn.closest('.article-content').querySelector('.article-title') : btn.closest('.match-item').querySelector('span');
        modalTitle.textContent = btn.getAttribute('data-title') || articleTitleElement.textContent;


        if (dataType === 'news') {
            // منطق عرض الخبر العادي (صورة + نص)
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
            // منطق عرض البث المباشر (فيديو iframe)
            let videoUrl = btn.getAttribute('data-url');
            
            // التأكد من أن الرابط هو رابط تضمين (embed) وليس رابط مشاهدة عادي
            // تم إزالة autoplay لتجنب مشاكل المتصفحات، سيحتاج المستخدم للضغط على زر التشغيل يدوياً.
            const youtubeIframe = `
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="${videoUrl}" 
                    frameborder="0" 
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                ></iframe>`;

            // إضافة iframe إلى حاوية الفيديو
            modalVideoFrame.innerHTML = youtubeIframe;
            modalVideoFrame.style.display = 'block';
            
            // إظهار المعلومات المناسبة للبث
            modalContent.textContent = 'شاهد البث المباشر للأخبار العاجلة الآن.';
            modalDate.textContent = 'بث مباشر الآن';
            modalComments.textContent = ''; 
        }

        modal.style.display = 'block';
    }
});


closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    // إيقاف تشغيل الفيديو عند إغلاق الـ Modal لمنع استمرار الصوت
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
    // نعتمد على onerror في HTML للـ divs
    if (el.tagName === 'IMG') {
        el.addEventListener('error', () => {
            el.src = 'https://via.placeholder.com/300x200?text=صورة+غير+متاحة';
        });
    }
});