// التحكم في اختيار المحافظة وإظهار قسم التقييم
function handleGovernorateChange() {
    const gov = document.getElementById('governorate').value;
    const alertBox = document.getElementById('alertBox');
    const evaluationSection = document.getElementById('evaluationSection');
    const successBox = document.getElementById('successBox');

    successBox.classList.add('hidden');

    if (gov === 'كفر الشيخ') {
        alertBox.style.display = 'none';
        evaluationSection.classList.remove('hidden');
    } else if (gov !== '') {
        alertBox.style.display = 'block';
        evaluationSection.classList.add('hidden');
    } else {
        alertBox.style.display = 'none';
        evaluationSection.classList.add('hidden');
    }
}

// معالجة إرسال النموذج والربط بـ EmailJS
document.getElementById('evaluationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.innerText = "جاري الإرسال...";
    submitBtn.disabled = true;

    // حساب الدرجة الكلية (80 اختيار من متعدد + 20 درجة للمقال)
    const q1 = parseInt(document.getElementById('q1').value);
    const q2 = parseInt(document.getElementById('q2').value);
    const q3 = parseInt(document.getElementById('q3').value);
    const q4 = parseInt(document.getElementById('q4').value);
    const totalScore = q1 + q2 + q3 + q4 + 20;

    const templateParams = {
        user_name: document.getElementById('evaluatorName').value,
        governorate: document.getElementById('governorate').value,
        total_score: totalScore + ' / 100',
        essay_feedback: document.getElementById('essay').value
    };

    // الإرسال المباشر باستخدام المفاتيح المؤكدة
    emailjs.send('service_ml50ldw', 'template_13w7co5', templateParams)
        .then(function(response) {
            document.getElementById('evaluationSection').classList.add('hidden');
            document.getElementById('successBox').classList.remove('hidden');
        }, function(error) {
            alert('حدث خطأ أثناء الإرسال، يرجى إعادة المحاولة.');
            submitBtn.innerText = "إرسال التقييم واعتماد الدرجة";
            submitBtn.disabled = false;
        });
});
