# دليل التثبيت والنشر - متجر النيترو

## متطلبات النظام

### الحد الأدنى
- متصفح ويب حديث (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- JavaScript مفعل
- دقة شاشة 320px كحد أدنى (دعم الهواتف المحمولة)

### للتطوير
- Python 3.6+ أو Node.js 12+ (لتشغيل خادم محلي)
- محرر نصوص (VS Code, Sublime Text, Atom)
- Git (اختياري للتحكم في الإصدارات)

## التثبيت المحلي

### الطريقة الأولى: باستخدام Python
```bash
# 1. تحميل المشروع
git clone https://github.com/your-username/nitro-store.git
cd nitro-store

# 2. تشغيل الخادم المحلي
python3 -m http.server 8000

# 3. فتح المتصفح
# انتقل إلى http://localhost:8000
```

### الطريقة الثانية: باستخدام Node.js
```bash
# 1. تحميل المشروع
git clone https://github.com/your-username/nitro-store.git
cd nitro-store

# 2. تثبيت serve (إذا لم يكن مثبتاً)
npm install -g serve

# 3. تشغيل الخادم
serve .

# 4. فتح المتصفح
# انتقل إلى http://localhost:3000
```

### الطريقة الثالثة: فتح مباشر
```bash
# 1. تحميل المشروع
git clone https://github.com/your-username/nitro-store.git
cd nitro-store

# 2. فتح الملف مباشرة في المتصفح
# اضغط مرتين على index.html
# أو اسحبه إلى نافذة المتصفح
```

**ملاحظة:** الطريقة الثالثة قد لا تعمل مع جميع المميزات بسبب قيود CORS.

## النشر على الإنترنت

### 1. GitHub Pages (مجاني)

#### الخطوات:
1. **إنشاء مستودع GitHub جديد**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/nitro-store.git
   git push -u origin main
   ```

2. **تفعيل GitHub Pages**
   - اذهب إلى إعدادات المستودع
   - انتقل إلى قسم "Pages"
   - اختر "Deploy from a branch"
   - اختر "main" branch
   - اضغط "Save"

3. **الوصول للموقع**
   - الرابط سيكون: `https://username.github.io/nitro-store`
   - قد يستغرق بضع دقائق للتفعيل

### 2. Netlify (مجاني مع مميزات إضافية)

#### الطريقة الأولى: السحب والإفلات
1. اذهب إلى [netlify.com](https://netlify.com)
2. اسحب مجلد المشروع إلى منطقة "Deploy"
3. انتظر انتهاء النشر
4. احصل على رابط الموقع

#### الطريقة الثانية: ربط Git
1. ادفع المشروع إلى GitHub
2. اربط حساب Netlify بـ GitHub
3. اختر المستودع
4. اضبط إعدادات البناء:
   - Build command: (اتركه فارغاً)
   - Publish directory: `.`
5. اضغط "Deploy site"

### 3. Vercel (مجاني للمشاريع الشخصية)

```bash
# 1. تثبيت Vercel CLI
npm install -g vercel

# 2. تسجيل الدخول
vercel login

# 3. نشر المشروع
vercel

# 4. اتبع التعليمات التفاعلية
```

### 4. Firebase Hosting (مجاني مع حصة سخية)

```bash
# 1. تثبيت Firebase CLI
npm install -g firebase-tools

# 2. تسجيل الدخول
firebase login

# 3. تهيئة المشروع
firebase init hosting

# 4. اختيار الإعدادات:
# - Public directory: . (النقطة)
# - Single-page app: No
# - Overwrite index.html: No

# 5. النشر
firebase deploy
```

## إعداد النطاق المخصص

### مع Netlify
1. اذهب إلى إعدادات الموقع
2. انقر على "Domain management"
3. انقر على "Add custom domain"
4. أدخل نطاقك (مثل: nitro-store.com)
5. اتبع تعليمات DNS

### مع GitHub Pages
1. أضف ملف `CNAME` في جذر المشروع
2. اكتب النطاق بداخله (بدون http://)
3. اضبط DNS records عند مزود النطاق:
   ```
   Type: CNAME
   Name: www
   Value: username.github.io
   ```

## تحسين الأداء

### ضغط الملفات
```bash
# ضغط CSS
npm install -g clean-css-cli
cleancss -o assets/css/style.min.css assets/css/style.css

# ضغط JavaScript
npm install -g uglify-js
uglifyjs assets/js/*.js -o assets/js/bundle.min.js
```

### تحسين الصور
```bash
# تثبيت أداة تحسين الصور
npm install -g imagemin-cli

# ضغط الصور
imagemin assets/images/*.png --out-dir=assets/images/optimized
```

### إعداد CDN
لتحسين سرعة التحميل، يمكن استخدام CDN:

```html
<!-- في index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://cdnjs.cloudflare.com">
```

## مراقبة الأداء

### Google Analytics
```html
<!-- أضف في <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Google Search Console
1. أضف الموقع في Search Console
2. تحقق من الملكية
3. أرسل sitemap.xml

## النسخ الاحتياطي

### إعداد النسخ الاحتياطي التلقائي
```bash
# إنشاء سكريبت النسخ الاحتياطي
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
tar -czf "backup_nitro_store_$DATE.tar.gz" nitro-store/
```

### استعادة النسخة الاحتياطية
```bash
# استخراج النسخة الاحتياطية
tar -xzf backup_nitro_store_YYYYMMDD_HHMMSS.tar.gz
```

## استكشاف الأخطاء

### مشاكل شائعة وحلولها

#### 1. الموقع لا يظهر بشكل صحيح
**السبب:** مشاكل في مسارات الملفات
**الحل:**
```bash
# تحقق من بنية المجلدات
ls -la
# تأكد من وجود جميع الملفات
find . -name "*.css" -o -name "*.js" -o -name "*.png"
```

#### 2. الخطوط لا تظهر
**السبب:** مشكلة في تحميل Google Fonts
**الحل:**
```html
<!-- تأكد من وجود هذا في <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap" rel="stylesheet">
```

#### 3. الأيقونات لا تظهر
**السبب:** مشكلة في تحميل Font Awesome
**الحل:**
```html
<!-- تأكد من وجود هذا في <head> -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

#### 4. JavaScript لا يعمل
**السبب:** أخطاء في الكود أو ترتيب تحميل الملفات
**الحل:**
```html
<!-- تأكد من ترتيب تحميل ملفات JS -->
<script src="assets/js/main.js"></script>
<script src="assets/js/products.js"></script>
<script src="assets/js/cart.js"></script>
<script src="assets/js/animations.js"></script>
```

#### 5. الصور لا تظهر
**السبب:** مسارات خاطئة أو ملفات مفقودة
**الحل:**
```bash
# تحقق من وجود الصور
ls -la assets/images/
# تحقق من المسارات في products.js
grep -n "assets/images" assets/js/products.js
```

## الأمان

### حماية الملفات الحساسة
```bash
# إنشاء ملف .htaccess (للخوادم Apache)
echo "Options -Indexes" > .htaccess
```

### تحديث التبعيات
```bash
# تحديث CDN links بانتظام
# تحقق من إصدارات Font Awesome و Google Fonts
```

## الدعم الفني

### قنوات الدعم
- **الوثائق:** README.md
- **المشاكل:** GitHub Issues
- **المجتمع:** Discord Server
- **البريد الإلكتروني:** support@nitro-store.com

### معلومات مفيدة للدعم
عند طلب الدعم، يرجى تقديم:
1. نوع المتصفح والإصدار
2. نظام التشغيل
3. وصف المشكلة بالتفصيل
4. خطوات إعادة إنتاج المشكلة
5. لقطات شاشة (إن أمكن)
6. رسائل الخطأ من وحدة تحكم المطور

---

**نصائح إضافية:**
- اختبر الموقع على متصفحات مختلفة قبل النشر
- استخدم أدوات مطور المتصفح لاستكشاف الأخطاء
- احتفظ بنسخ احتياطية منتظمة
- راقب أداء الموقع باستمرار
- حدث المحتوى والأسعار بانتظام

*دليل التثبيت والنشر - متجر النيترو*
*إعداد: Manus AI | يوليو 2025*

