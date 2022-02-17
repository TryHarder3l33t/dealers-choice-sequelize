const htmll = require("html-template-tag");

module.exports = (results, candyCat) => htmll`<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=h, initial-scale=1.0" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
      <title>Document</title>
    </head>
    
 

    <body>
    <div class="container">
    <div class= "col-3">
       <form class="row g-3" method="post" action="/candyshop">
  
  <div class="col-12">
    <label for="inputAddress" class="form-label">Image Url</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="www.google.com/pic.jpg" name="image">
  </div>

  <div class="col-12">
    <label for="inputAddress2" class="form-label">Name</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Gummie Bear" name="name">
  </div>

  <div class="col-md-8">
    <label for="inputCity" class="form-label">Price</label>
    <input type="text" class="form-control" id="inputCity" placeholder="3.00" name="price">
  </div>

  <div class="col-md-8">
    <label for="inputState" class="form-label">Category</label>
    <select id="inputState" class="form-select">
      <option selected>Category</option>
     
      ${candyCat.map(
        (cat) => htmll`
        <option value ="${cat.id}">${cat.name}</option>
           <br />
        `
      )}
    </select>
  </div>
 
 
  <div class="col-12">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
    </div>

 
        <div >
        <ul class="col-5">
          ${results.map(
            (result) => htmll`<div class"col-6">
              <img
              src='${result.image}'
              class="img-fluid"
              alt="..."
            />
              <li>${result.name}</li>
              <li>${result.price}</li>
              <br />
            </div>`
          )}
        </ul>
        </div>
        
        
    
    </div>
      
    </body>
  </html>`;

//   <option value="2">Two</option>
//   <option value="3">Three</option>
