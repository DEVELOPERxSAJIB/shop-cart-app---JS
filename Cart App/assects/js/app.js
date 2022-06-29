// get elements
const product_form = document.getElementById('product_form');
const product_update_form = document.getElementById('product_update_form');
const msg = product_form.querySelector('.msg');
const single_product = document.querySelector('.single-product');
const product_list = document.getElementById('product_list');


// get all products
const getAllProducts = () => {

    // init value
    let data = readLSData('product');

    // check LS data to show
    if(!data) {
        product_list.innerHTML = `
            <tr>
                <td colspan="8">No product Found</td>
            </tr>
        `;
    }

    // show LS data into front-end
    if(data) {

        // init value
        let list = '';
        let final_amount = 0;

        // loop for data
        data.map((item, index) => {
            final_amount += item.price * item.quantity;
            list += `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.photo}" alt=""></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>${item.price * item.quantity} BDT</td>
                <td>
                    <a data-bs-toggle="modal" product_index = ${index} href="#shop_single_modal" class="btn btn-success btn-sm product-view"><i class="fas fa-eye"></i></a>
                    <a data-bs-toggle="modal" product_index = ${index} href="#shop_edit_modal" class="btn btn-warning btn-sm product-edit"><i class="fas fa-edit"></i></a>
                    <a href="" class="btn btn-danger btn-sm product-delete" product_index = ${index}><i class="fas fa-trash"></i></a>
                </td>
            </tr>
        `;
        })

        list += `
            <tr>
                <td colspan="6" class="text-end ttl" style="padding-right: 35px">Totol Ammount = ${final_amount} BDT</td>
            </tr>
        `

        product_list.innerHTML = list;
        
    }

}

getAllProducts();









// Product Form Submition
product_form.onsubmit = (e) => {

    // form submit no reload
    e.preventDefault();

    // validation for product_form
    let form_data = new FormData(e.target);
    let productData = Object.fromEntries(form_data.entries());
    let {name, price, quantity, photo} = Object.fromEntries(form_data.entries());

    if(!name || !price || !quantity || !photo) {
        msg.innerHTML = setAlert('All feilds are required');
    }else {
        createLSData('product', productData)
        
        msg.innerHTML = setAlert('Data Stable !', 'success');
        product_form.reset(); 
        getAllProducts();
        getLSData();
    }
}


// single Product show
product_list.onclick = (e) => {

    e.preventDefault();

    if(e.target.classList.contains('product-view')){

        // get single product data ID
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

        // get data key
        let {name, photo, price} = data[index];


        // send data to modal
        single_product.innerHTML = `
            <img src="${photo}" alt="">
            <h1>${name}</h1>
            <h4>Price : ${price} BDT</h4>
        `
    } else if (e.target.classList.contains('product-edit')){

        // Single Product Edit
        let index = e.target.getAttribute('product_index');

        // get product value
        let data = readLSData('product');
        const {name, price, quantity, photo} = data[index];

        // value set into product_update_form
        product_update_form.innerHTML = `
            
                <div class="msg"></div>
                <div class="mt-3">
                    <label for="">Name</label>
                    <input name="name" value="${name}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <label for="">Price</label>
                    <input name="price" value="${price}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <label for="">Quantity</label>
                    <input name="quantity" value="${quantity}" type="text" class="form-control">
                </div>
                <div class="mt-0">
                    <label for=""></label>
                    <input name="index" value="${index}" type="hidden" class="form-control">
                </div>
                <div class="mt-0">
                    <label class="text-center" for="">Previous Photo</label>
                    <img class="w-100" src="${photo}" alt="">
                </div>
                <div class="mt-3">
                    <label for="">Photo</label>
                    <input name="photo" value="${photo}" type="text" class="form-control">
                </div>
                <div class="mt-3">
                    <input name="submit" type="submit" value="Update Now" class="form-control boton">
                </div>
        `;
    } else if (e.target.classList.contains('product-delete')){

        // get data index
        let index = e.target.getAttribute('product_index');
        let data = readLSData('product');

        // delete index data
        data.splice(index, 1);
        
        // update latest recored
        updateLSData('product', data);
        getAllProducts();
    }

  
}



// product update form submit
product_update_form.onsubmit = (e) => {
    e.preventDefault();

    const form_data = new FormData(e.target);
    const {name, price, quantity, photo, index} = Object.fromEntries(form_data.entries());

    // get all data
    let all_data  = readLSData('product');
    all_data[index] = {name, price, quantity, photo};

    // update your data
    updateLSData('product', all_data);
    getAllProducts();
}

