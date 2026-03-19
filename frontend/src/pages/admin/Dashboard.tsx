import { useEffect , useState } from "react";

function Dashboard() {
const [products, setProducts] = useState<any[]>([]);

const fetchProducts = async () =>  {
    const result = await fetch("http://localhost:5002/api/products");
    const data = await result.json();
    setProducts(data);
}

useEffect(()=> {
    fetchProducts();
},[]);



return (
            <h1>products: {products.map((p)=> p.name).join(",")}</h1>
)

}

export default Dashboard;