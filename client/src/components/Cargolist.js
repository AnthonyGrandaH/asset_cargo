import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function CargoList() {
    const [cargo, setCargo] = useState([]);
    const navigate=useNavigate();

    const loadcargos = async () => {
        const response = await fetch('http://localhost:4000/cargo')
        const data = await response.json()
        setCargo(data)
    };

    const handleDelete = async(id)=>{
       const res= await fetch(`http://localhost:4000/cargo/${id}`,{
            method: "DELETE",
        })
       setCargo(cargo.filter(cargo=> cargo.id !== id))
    }

    useEffect(() => {
        loadcargos()
    }, []);
    return (
        <>
            <h1>Lista de Cargos</h1>
            {
                cargo.map((cargo) => (
                    <Card style={{
                        marginBottom: "7.rem0",
                        backgroundColor:'#1e2712'
                    }}
                    key={cargo.id}
                    >
                        <CardContent style={{
                            display:"flex",
                            justifyContent:"space-between"
                        }}>
                            <div style={{color:"white"}}>
                            <Typography>{cargo.tipocargo}</Typography>
                            <Typography>{cargo.descripcioncargo}</Typography>
                            </div>
                            <div>
                            <Button variant="contained" color="inherit" 
                            onClick={()=> navigate(`/cargo/${cargo.id}/edit`)}>
                                Editar
                            </Button>
                            <Button variant="contained" color="warning" 
                            onClick={()=> handleDelete(cargo.id)}>
                                Eliminar
                            </Button>
                            </div>
                        </CardContent>
                    </Card>

                ))
            }
        </>
    )
}