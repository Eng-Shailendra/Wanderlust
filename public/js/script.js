
(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()


const flashMessage = document.getElementById('flash-message');
setTimeout(() => {
    flashMessage.style.display = 'none';
}, 4000);


const image = document.getElementById('image');
const Select = document.getElementById("item-select");

// create new
// select for and showing selection in input box
Select.addEventListener("change", function () {
    const input = document.getElementById("filter-input");
    const selectedItem = Select.value;
    const currentItems = input.value;
    if (currentItems.includes(selectedItem)) {
        return;
    }
    if (currentItems) {
        input.value = `${currentItems}, ${selectedItem}`;
    } else {
        input.value = selectedItem;
    }
    input.placeholder = input.value;
});
// create new 
// image priview 
image.addEventListener('change', function (event) {
    const previewContainer = document.getElementById('preview');
    previewContainer.innerHTML = '';
    const files = event.target.files;

    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});