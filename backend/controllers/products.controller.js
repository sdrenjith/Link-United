const pool = require("../config/db");

const getProducts = async (req, res) => {
    try {
        const response = await pool.query("SELECT * from products");
        res.json(response.rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "No products found" });

    }
}

const createProducts = async (req, res) => {
    const {name, category, description , price} = req.body;
    try {
        const result = await pool.query("INSERT INTO products (name, category, description , price) values ($1, $2, $3, $4) RETURNING *",
            [name, category, description , price]
        );

        res.json({
            message: "Product Created",
            product: result.rows[0],
        }
        )
    } catch (e) {
        console.log(error);
        res.status(500).json({message: "server error"});
    }
};

const updateProducts = async (req,res) => {
    const {id} = req.params;
    const {name , category , description, price} = req.body;
    try{
        const response = await pool.query("UPDATE products SET name=$1, category=$2, description=$3, price= $4 where id=$5 RETURNING *",
            [name, category , description , price , id]
            )

            if(response.rows.length === 0){
                return res.status(404).json({message:"product not found"});
            }

            res.json({
                message: "product updated",
                product: response.rows[0],
            })

    }catch (e){
        console.log(e);
        res.status(500).json({message: "server error"});
    }
}

const deleteProducts = async (req,res) => {
    const {id} = req.params;
    try {
const response = await pool.query("DELETE from products where id=$1 RETURNING *",
    [id]
);
if(response.rows.length === 0) {
    res.status(404).json({message:"product not found"});


}
res.status(200).json({
    message: "product deleted",
    product: response.rows[0],
});
    }catch(e){
        console.log(e);
        res.status(500).json({message:"server error"});
    }
}

module.exports = { getProducts, createProducts, updateProducts, deleteProducts }; 