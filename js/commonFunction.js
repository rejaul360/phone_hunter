const processSearch = (daraLimit) => {
    toggleSpinner(true);
    const inputField =  document.getElementById('input_field');
    const searchText = inputField.value;
    loadPhones(searchText);
}