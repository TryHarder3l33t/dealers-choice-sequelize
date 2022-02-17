const htmll = require("html-template-tag");

module.exports = (candy) => htmll`<!DOCTYPE html>
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
  <h3>Details</h3>
    </div>

 
        <div >
        <ul class="col-5">
          <div class"col-6">
            <a href="/category/${candy.categoryId}">
             <img
              src='${candy.image}'
              class="img-fluid"
              alt="..."
            />
            </a>
             
              <li>${candy.name}</li>
              <li>${candy.price}</li>
              <br />
              <a href="/"> << Back </a>
            </div>
          
        </ul>
        </div>
        
        
    
    </div>
      
    </body>
  </html>`;
