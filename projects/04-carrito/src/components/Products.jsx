export function Products ({ products }) {
  return (
    <section className='product-container'>
      <ul className='product-list'>
        {products.map(product => {
          return (
            <div className='product-item' key={product.id} aria-label={`Producto ${product.title}`}>
              <figure aria-label={`Imagen del producto ${product.title}`}>
                <img src={product.thumbnail} alt={`Imagen del producto ${product.title}`} />
              </figure>
              <div className='product-info'>
                <h3>{product.title}</h3> 
                <p>{product.price} <span> €</span></p>
              </div>
              <div className='product-actions'>
                <button>Añadir</button>
                <button>Eliminar</button>
              </div>
            </div>
          )
        })}
      </ul>
    </section>
  )
}
