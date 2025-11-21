document.addEventListener('DOMContentLoaded', function() {
    // البحث
    document.getElementById('search').addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const lessons = document.querySelectorAll('.lesson-row');
        lessons.forEach(lesson => {
            const text = lesson.textContent.toLowerCase();
            lesson.style.display = text.includes(query) ? 'flex' : 'none';
        });
    });

    // Dark mode
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });

    // Lazy loading للفيديوهات
    const videos = document.querySelectorAll('.video-btn');
    videos.forEach(video => {
        video.addEventListener('click', function() {
            // تحميل الفيديو عند النقر (يمكن إضافة iframe هنا)
        });
    });

    // إشعارات
    function showNotification(message) {
        const notif = document.createElement('div');
        notif.textContent = message;
        notif.style.position = 'fixed';
        notif.style.top = '10px';
        notif.style.right = '10px';
        notif.style.background = 'green';
        notif.style.color = 'white';
        notif.style.padding = '10px';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 3000);
    }

    // مفضلة
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lesson = this.dataset.lesson;
            let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
            if (!favorites.includes(lesson)) {
                favorites.push(lesson);
                localStorage.setItem('favorites', JSON.stringify(favorites));
                showNotification('تم إضافة إلى المفضلة!');
            }
        });
    });

    // تتبع التحميلات
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            showNotification('جاري التحميل...');
        });
    });
});