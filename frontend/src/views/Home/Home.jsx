import { useState, useEffect } from "react"
import { Layout } from "../../components/Layout"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { FormUpdate } from "../../components/FormUpdate"
import productosPrueba from "../../productos.json"

const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [isEditing, setIsEditing] = useState(null)
  const [productEditing, setProductEditing] = useState(null)
  const [search, setSearch] = useState("");



  const { user, logout, token } = useAuth()

  const fetchingProducts = async () => {
    try {
      /*const response = await fetch("http://localhost:1234/api/products")

      if (!response.ok) {
        setError("Sesión terminada, vuelve a loguearte.")
        logout()
        throw new Error("Falló el fetch :(")
      }
      const dataProducts = await response.json()*/

      setProducts(productosPrueba)
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchingProducts()
  }, [])


  useEffect(() => {
    if (search === "") return;
  const handleSearch = async () => {
      /*try {
        const res = await fetch(`http://localhost:1234/api/products/search?search=${encodeURIComponent(search)}`);
        const data = await res.json();*/
        setProducts(productosPrueba);
    };

    handleSearch();
  }, [search]);



  const handleDelete = async (product) => {
    if (confirm("Esta seguro que quieres borrar el producto?")) {
      try {
        const response = await fetch(`http://localhost:1234/api/products/${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        })
        if (response.ok) {
          fetchingProducts()
        }
      } catch (error) {
        setError(error.message)
      }
    }
  }

  const handleUpdate = async (product) => {
    setIsEditing(true)
    setProductEditing(product)
  }


  const handleCancelEditing = () => {
    setIsEditing(null)
    setProductEditing(null)
  }

  return (
    <Layout>
      <h1>Lista de productos</h1>
      {user && <p>Bienvenido, {user.email}</p>}
      <div className="search-conteiner">
      <input className="search-input"
          id="searchInput"
          type="text"
          placeholder="Buscar producto..."
          value={search || ""}
          onChange={(e) => setSearch(e.target.value || "")}
        />

        <div id="results" style={{ marginTop: "20px" }}>
          {products.map((product) => (
            <div key={product._id}>{product.title}</div>
          ))}
        </div>
      </div>
      {error && <>
        <div className="error-home">
          <h2>{error}</h2>
          <Link to={"/login"}>Ir al login</Link>
        </div>
      </>}
      {
        isEditing && <FormUpdate product={productEditing} handleCancelEditing={handleCancelEditing} fetchingProducts={fetchingProducts} />
      }
      <section className="grid-products">
        {
          products.map((product) => {
            return (
              <div key={product._id}>
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <p className="category-product">{product.category}</p>
                {
                  user && <div className="control-product">
                    <button className="btn-update" onClick={() => { handleUpdate(product) }}>Actualizar</button>
                    <button className="btn-delete" onClick={() => { handleDelete(product) }}>Borrar</button>
                  </div>
                }
              </div>
            )
          })
        }
      </section>
    </Layout>
  )
}

export { Home }