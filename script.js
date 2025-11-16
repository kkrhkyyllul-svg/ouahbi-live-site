document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد العناصر الرئيسية
    const serverButtons = document.querySelectorAll('.stream-controls .control-btn');
    const videoPlayerBox = document.querySelector('.video-player-box');
    
    // تعريف روابط البث (Embed Codes) لكل سيرفر 
    // **يجب استبدال هذه الروابط بالروابط الحقيقية (Embed Iframe) للبث عند بدء المباراة**
    const streams = {
        'سيرفر 1': '<iframe src="https://example.com/embed/match-1-server1" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>',
        'سيرفر 2': '<iframe src="https://example.com/embed/match-1-server2" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>',
        'سيرفر 3 (HD)': '<iframe src="https://example.com/embed/match-1-server3-hd" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>',
    };

    // 2. دالة تبديل السيرفرات
    const switchServer = (button) => {
        const serverName = button.textContent.trim();

        // معالجة الأزرار الخاصة (إعدادات وشاشة كاملة)
        if (serverName.includes('إعدادات')) {
            videoPlayerBox.innerHTML = '<div class="placeholder-text">الإعدادات تُظهر في مشغل البث الفعلي.</div>';
            return;
        }
        if (serverName.includes('شاشة كاملة')) {
            // وظيفة الشاشة الكاملة (تعتمد على المتصفح)
            if (videoPlayerBox.querySelector('iframe')) {
                 const iframe = videoPlayerBox.querySelector('iframe');
                 // طلب وضع الشاشة الكاملة
                 iframe.requestFullscreen ? iframe.requestFullscreen() : alert('المتصفح لا يدعم الشاشة الكاملة لـ iframe تلقائياً.');
            } else {
                 alert('يرجى اختيار سيرفر أولاً لتفعيل وضع الشاشة الكاملة.');
            }
            return;
        }

        // إزالة حالة النشاط من جميع الأزرار وتطبيقها على الزر المحدد
        serverButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // تحديث محتوى مشغل الفيديو برابط السيرفر
        if (streams[serverName]) {
            videoPlayerBox.innerHTML = streams[serverName];
        } else {
            videoPlayerBox.innerHTML = '<div class="placeholder-text">خطأ: لم يتم العثور على رابط البث لهذا السيرفر.</div>';
        }
    };

    // 3. إضافة مستمعي الأحداث (Event Listeners)
    serverButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            switchServer(event.currentTarget);
        });
    });

    // تحميل السيرفر الأول افتراضياً عند فتح الصفحة
    const defaultServer = Array.from(serverButtons).find(btn => btn.textContent.includes('سيرفر 1'));
    if (defaultServer) {
        switchServer(defaultServer);
    }
});