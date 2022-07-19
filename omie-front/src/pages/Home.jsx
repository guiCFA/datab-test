import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styles from './Home.module.css';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { Search } from '../components/Search';
import { api } from '../services/api';

export function Home() {
  const [search, setSearch] = useState('');

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsByClient, setProductsByClient] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();

    const findClient = clients.find(client => client.cnpj_cpf === search);

    if (findClient) {
      const filterProducts = products.filter(product => product.cabecalho.codigo_cliente === findClient.codigo_cliente_omie);
      
      if (filterProducts.length > 0) {
        setProductsByClient(filterProducts);

        return;
      }
    }

    setProductsByClient([]);

    toast.error('Cliente não encontrado!');
  }

  async function getClients() {
    try {
      const response = await api.get('clients');
      
      setClients(response.data.clientes_cadastro);
    } catch (error) {
      toast.error('Clients not found!');
    }
  } 

  async function getProducts() {
    try {
      const response = await api.get('products');
      
      setProducts(response.data.pedido_venda_produto);
    } catch (error) {
      toast.error('Products not found!');
    }
  } 

  useEffect(() => {
    getClients();
    getProducts();
  }, []);

  console.log(clients)
  console.log(productsByClient)

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          <Search>
            <form className={styles.searchForm} onSubmit={handleSubmit}>
              <strong> Busque por um usuário </strong>

              <input 
                name="search"
                placeholder='Busque por um usuário' 
                onChange={(event) => {
                  setSearch(event.target.value)
                }}
                required
              />
              
              <footer>
                <button type='submit' >
                  Buscar
                </button>
              </footer>
            </form>
          </Search>

          <ul>
            {productsByClient.map((product, key) => {
              return (
                <li key={key}>{product.det[0].produto.descricao} </li>
              )
            })}
          </ul>

          {productsByClient.map((product, key) => {
            return (
              <p className={styles.valueTotal} key={key}>Valor total: {product.total_pedido.valor_total_pedido} </p>
            )
          })}
        </main>
      </div>
    </div>
  );
}