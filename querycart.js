const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test1',
  password: 'rita',
  port: 5432,
})

const getProduct = (request, response) => {
  pool.query('SELECT * FROM product ORDER BY name ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProductById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM product WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const createProduct = (request, response) => {
  const { id, name, image, company, price, quantity, quan } = request.body
  pool.query('INSERT INTO product (name, image, company, price, quantity, quan) VALUES ($1, $2, $3, $4, $5, $6)',
    [name,image,  company, price, quantity,quan], (error, results) => {
      if (error) {
        console.log('error--', error)
        throw error
      }
      response.status(201).send(results) 
    })
}
const deleteDubleProduct = (request, response) => {
  const id = parseInt(request.params.id)
 pool.query( 'DELETE FROM product a USING product b WHERE a.id<b.id and a.name=b.name ' ,(error, results)=>{
    if (error) { throw error }
    response.status(201).send(results)
     })
}

const updateProduct = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, image, company, price, quantity, quan } = request.body
  pool.query(
    'UPDATE product SET name = $1, image = $2,company = $3, price = $4, quantity = $5, quan = $6 WHERE id = $7',
    [name, image, company, price, quantity,quan,  id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  )
}

const getCarts = (request, response) => {
      pool.query('SELECT * FROM carts ORDER BY name ASC', (error, results) => {
     if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCartsById = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query('SELECT * FROM carts WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
}

const updateCarts = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, image, company, price, quantity, quan } = request.body
  pool.query(
    'UPDATE carts SET name = $1, image = $2,company = $3, price = $4, quantity = $5, quan = $6 WHERE id = $7',
    [name, image, company, price, quantity,quan,  id],
    (error, results) => {
      if (error) { throw error }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  )
}

const createCarts = (request, response) => {
  const { name, image, company, price, quantity, quan } = request.body
  pool.query('INSERT INTO carts (name, image, company, price, quantity,quan) VALUES ($1, $2, $3, $4, $5, $6)',
    [name, image, company, price, quantity, quan], (error, results) => {
      if (error) {
        console.log('error--', error)
        throw error
      }
      response.status(201).send(results)  
    })
}

const deleteDublecarts = (request, response) => {
  const id = parseInt(request.params.id)
 pool.query( 'DELETE FROM carts a USING carts b WHERE a.id<b.id and a.name=b.name ' ,(error, results)=>{
    if (error) { throw error }
    response.status(201).send(results)
     })
}

const deleteCarts= (request, response) => {
  const id = parseInt(request.params.id)
 pool.query('DELETE FROM carts WHERE id = $1', [id], (error, results) => {
    if (error) { throw error }
    response.status(201).send(results)
     })
}

module.exports = {
 getCarts,
 getCartsById,
 getProduct,
 getProductById,
 deleteDubleProduct,
 updateProduct,
  createCarts,
  updateCarts,
  deleteCarts,
  deleteDublecarts,
  createProduct, 
}