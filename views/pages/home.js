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
    <div class= "">
    <div>
    <h2>Make a Candy</h2>
    <div class="col-5">

    <form class="row g-3" method="post" action="/candyshop?categoryId=">
  
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
    <select id="inputState" class="form-select" name="categoryId">
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
        <div class="col-md-8">
      
   
  </div>
  <h3>Shop by category</h3>
  ${candyCat.map(
    (cat) => htmll`<a href='/category/${cat.id}'>
    <p value ="${cat.id}">${cat.name}</p>
    </a>    
    `
  )}
        <ul class="col-5">
          ${results.map(
            (result) => htmll`<div class"col-6">
            <a href="/detail/${result.categoryId}">
             <img
              src='${result.image}'
              class="img-fluid"
              alt="..."
            />
            </a>
             
              <li>${result.name}</li>
              <li>${result.price}</li>
              <form method="POST" action="/candyshop/delete/${result.id}?_method=delete">
              <button> DELETE</button>
  </form>
  <br>
              <br />
            </div>`
          )}
        </ul>
        </div>
        
        
    
    </div>
      
    </body>
  </html>`;
