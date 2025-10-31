document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("studentForm");
  const studentImage = document.getElementById("studentImage");
  const imagePreview = document.getElementById("imagePreview");
  const emailField = document.getElementById("email");

  // ===== Image preview and size check =====
  studentImage.addEventListener("change", function() {
    const file = this.files[0];
    if(!file) return;

    if(file.size > 5 * 1024 * 1024){
      alert("File size must be less than 5 MB!");
      this.value = "";
      imagePreview.classList.add("d-none");
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      imagePreview.src = e.target.result;
      imagePreview.classList.remove("d-none");
    };
    reader.readAsDataURL(file);
  });

  // ===== Name fields uppercase + onBlur =====
  ["studentName","fatherName","motherName"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("change", function() { this.value = this.value.toUpperCase(); });
    input.addEventListener("blur", function() { console.log(id+" lost focus"); });
  });

  // ===== Email focus highlight =====
  emailField.addEventListener("focus", function(){ this.style.backgroundColor="#e7f1ff"; });
  emailField.addEventListener("blur", function(){ this.style.backgroundColor=""; });

  // ===== Form submission and modal =====
  form.addEventListener("submit", function(e){
    e.preventDefault();
    if(!form.checkValidity()){
      form.reportValidity();
      return;
    }

    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();

    setTimeout(() => {
      form.reset();
      imagePreview.classList.add("d-none");
    }, 1500);
  });
});



