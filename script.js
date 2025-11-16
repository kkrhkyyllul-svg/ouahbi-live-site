document.addEventListener('DOMContentLoaded', () => {
    // 1. تحديد العناصر الرئيسية
    const serverButtons = document.querySelectorAll('.stream-controls .control-btn');
    const videoPlayerBox = document.querySelector('.video-player-box');
    
    // =======================================================
    // ** هذا هو المكان الوحيد الذي يجب تعديله لكل مباراة جديدة **
    // =======================================================
    
    // ضع هنا أكواد الـ IFRAME الكاملة التي تجلبها من مصدر البث.
    // يجب أن تكون القيمة الموضوعة بين علامتي التنصيص هي كود iframe كامل.
    const streams = {
        'سيرفر 1': '<iframe src="https://REAL-STREAM-LINK-SERVER-1.com/embed/example" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>', 
        
        'سيرفر 2': '<iframe src="https://REAL-STREAM-LINK-SERVER-2.com/embed/example" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>',
        
        'سيرفر 3 (HD)': '<iframe src="https://REAL-STREAM-LINK-SERVER-3-HD.com/embed/example" width="100%" height="100%" allowfullscreen frameborder="0"></iframe>',
    };
    
    // =======================================================
    
    
    // 2. دالة تبديل السيرفرات
    const switchServer = (button) => {
        const serverName = button.textContent.trim();

        // معالجة أزرار الإعدادات والشاشة الكاملة (بدون تغيير)
        if (serverName.includes('إعدادات')) {
            videoPlayerBox.innerHTML = '<div class="placeholder-text">الإعدادات تُظهر في مشغل البث الفعلي.</div>';
            return;
        }
        if (serverName.includes('شاشة كاملة')) {
            const iframe = videoPlayerBox.querySelector('iframe');
            if (iframe) {
                 iframe.requestFullscreen ? iframe.requestFullscreen() : alert('المتصفح لا يدعم الشاشة الكاملة لـ iframe تلقائياً.');
            } else {
                 alert('يرجى اختيار سيرفر أولاً لتفعيل وضع الشاشة الكاملة.');
            }
            return;
        }

        // إزالة حالة النشاط من جميع أزرار السيرفرات
        serverButtons.forEach(btn => {
             if (!btn.textContent.includes('إعدادات') && !btn.textContent.includes('شاشة كاملة')) {
                 btn.classList.remove('active');
             }
        });
        button.classList.add('active');

        // تحديث محتوى مشغل الفيديو برابط السيرفر
        if (streams[serverName]) {
            videoPlayerBox.innerHTML = streams[serverName];
        } else {
            videoPlayerBox.innerHTML = '<div class="placeholder-text">خطأ: لم يتم العثور على رابط البث لهذا السيرفر.</div>';
        }
    };

    // 3. إضافة مستمعي الأحداث وتحميل السيرفر الأول افتراضياً
    serverButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            switchServer(event.currentTarget);
        });
    });

    // يتم تحميل السيرفر الأول افتراضياً
    const defaultServer = Array.from(serverButtons).find(btn => btn.textContent.includes('سيرفر 1'));
    if (defaultServer) {
        // نطبق حالة النشاط يدوياً ونشغل السيرفر
        defaultServer.classList.add('active');
        switchServer(defaultServer);
    }
});