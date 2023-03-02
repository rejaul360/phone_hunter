const loadPhones = async(searchText,daraLimit) =>{
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(URL)
    const data =  await res.json()
    displayData(data.data , daraLimit);
}
const displayData = (phones, daraLimit) => {
    const phonesContainer =  document.getElementById('phones_container')
    phonesContainer.innerText = '';

    // --------Slice phones ----------
    const showall = document.getElementById('show_all');
    if(daraLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showall.classList.remove('d-none');
    }else{
        showall.classList.add('d-none');
    }

    //phone not found messange show
    const noPhoneFound =  document.getElementById('no_phone_found')
    if(phones.length === 0){
        noPhoneFound.classList.remove('d-none')
    }else{
        noPhoneFound.classList.add('d-none')
    }

    phones.forEach(phone => {
       const phoneDiv = document.createElement('div');
       phoneDiv.classList.add('col');
       phoneDiv.innerHTML = `
       <div class="card h-100 p-1 ">
       <img class = "p-4" src="${phone.image}" class="card-img-top" alt="...">
       <div class="card-body">
         <h4 class="card-title">${phone.brand}</h4>
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick= "loadPhoneDetails('${phone.slug}')" id="phone_details" type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneModal">Phone Details</button>
       </div>
       `;
       phonesContainer.appendChild(phoneDiv);
       
    });
    // stop spinner loader
    toggleSpinner(false);
}
// search input field to enter key handler 
document.getElementById ('input_field').addEventListener ('keypress' , function(e){
    console.log(e.key);
    if(e.key === 'Enter'){
        processSearch(10)
    }
})

// commonFunction pass by btn_search  and btn_showall
const processSearch = (daraLimit) => {
    toggleSpinner(true);
    const inputField =  document.getElementById('input_field');
    const searchText = inputField.value;
    loadPhones(searchText, daraLimit);
}

// heandler phone search input field
document.getElementById('btn_search').addEventListener('click' , function () {
    //start spinner
    processSearch(10);
})

// toggleSpinner handler area

const toggleSpinner =  isLoader => {
    const spinnerSections =  document.getElementById('spinner_section');
    if(isLoader){
        spinnerSections.classList.remove('d-none')
    }else{
        spinnerSections.classList.add('d-none')
    }
}

document.getElementById('btn_showAll').addEventListener('click' , function(){
    processSearch()
})

//------ loadPhonesDetails ------------

const loadPhoneDetails = async id => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(URL);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    console.log(phone);
    const phoneTitle =  document.getElementById('phoneModalLabel');
    phoneTitle.innerText = phone.name;
    const relaceData =  document.getElementById('phone_details_release');
    relaceData.innerHTML = `
    <h6 > Phone Releasedate : ${phone.releaseDate ? phone.releaseDate : 'release date not available' } </h6>
    <p> ${phone.others.Bluetooth ? phone.others.Bluetooth : ' not available'} </p>
    <p> ${phone.others.USB? phone.others.USB: ' not available'} </p>
    <p> ${phone.mainFeatures? phone.mainFeatures.memory: ' not available'} </p>
    `

}

loadPhones('apple');