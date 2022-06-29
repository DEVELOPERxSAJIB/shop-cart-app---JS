const setAlert = (msg, type = 'danger') => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}<button data-bs-dismiss="alert" class="btn-close"></button></p>`
}


// get all LS data
const readLSData = (key) => {
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key));
    }else {
        return false;
    }
}


// LS Data Getting
const createLSData = (key, value) => {

    // init value of data
    let data = [];
    
    // check key exist or not
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }

    // now push data into LS
    data.push(value);
    
    // set data
    localStorage.setItem(key, JSON.stringify(data));
}



// Update our LS data
const updateLSData = (key, array) => {
    localStorage.setItem(key, JSON.stringify(array));
}