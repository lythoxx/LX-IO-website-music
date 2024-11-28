const inputField = document.querySelector(".form-control.form-control-dark");
const dropdownValues = document.getElementsByClassName('dropdown-list-item');
const dropdownMenu = document.querySelector(".list-unstyled");

inputField.addEventListener('input', (event) => {
    // Filter the dropdown for possible values
    for (let item of dropdownValues) {
        if (!item.children[0].childNodes[2].textContent.toLowerCase().includes(event.target.value.toLowerCase())) {
            item.style = 'display: none;';
        } else {
            console.log(item.children[0].childNodes[2].textContent.toLowerCase());
            item.style = 'display: block;';
        }
    }
    if (event.target.value.length === 0) {
        for (let i = 3; i < dropdownValues.length; i++) {
            dropdownValues[i].style = 'display: none;';
        }
    }
});

document.getElementsByClassName('search-form')[0].addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission
    search();
});

function search() {
    const content = inputField.value;
    var redirect = new URL('/projects/search.html', window.location.origin);
    redirect.searchParams.append('content', content);
    window.location.href = redirect.href;
}