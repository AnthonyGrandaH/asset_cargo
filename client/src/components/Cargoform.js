import { Button, Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";


export default function CargoForm() {

    const [cargo, setCargo] = useState({
        tipocargo: "",
        descripcioncargo: "",
    });
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const navigate = useNavigate();
    const params = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (editing) {
            const response = await fetch(`http://localhost:4000/cargo/${params.id}`, {
                method: "PUT",
                body: JSON.stringify(cargo),
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            console.log(data);

        } else {
            await fetch("http://localhost:4000/cargo", {
                method: 'POST',
                body: JSON.stringify(cargo),
                headers: { "Content-Type": "application/json" },
            });

        }

        setLoading(false);
        navigate("/cargo");
    };
    const handleChange = e => {
        setCargo({ ...cargo, [e.target.name]: e.target.value })
    };

    const loadcargo = async (id) => {
        const res = await fetch(`http://localhost:4000/cargo/${id}`)
        const data = await res.json()
        setCargo({ tipocargo: data.tipocargo, descripcioncargo: data.descripcioncargo })
        setEditing(true)
    };

    useEffect(() => {
        if (params.id) {
            loadcargo(params.id);
        }
    }, [params.id])

    return (
        <Grid container  alignItems='center' justifyContent='center'>
            <Grid item xs={3} alignContent='center'>
                <Card sx={{ mt: 5 }} style={{
                    backgroundColor: "#12272e",
                    padding: "1rem"
                }}>
                    <Typography variant="h5" textAlign='center' color='white'>
                        {editing ? "Editar Cargo" : "Agregar Cargo"}

                    </Typography>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                variant='filled'
                                label='Cargo'
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                name='tipocargo'
                                value={cargo.tipocargo}
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />
                            <TextField
                                variant='filled'
                                label='Descripcion cargo'
                                multiline
                                rows={4}
                                sx={{
                                    display: 'block',
                                    margin: '.5rem 0',
                                }}
                                value={cargo.descripcioncargo}
                                name='descripcioncargo'
                                onChange={handleChange}
                                inputProps={{ style: { color: "white" } }}
                                InputLabelProps={{ style: { color: "white" } }}
                            />

                            <Button variant='contained' style={{ display: 'block', margin: '0 auto' }} textAlign='center' color='primary' type='submit' disabled={
                                !cargo.tipocargo ||
                                !cargo.descripcioncargo
                            }>
                                {loading ? (<CircularProgress color="inherit" size={24} />) : (editing ? "Modificar cargo" : "Registrar cargo")}
                            </Button>

                        </form>
                    </CardContent>
                </Card>

            </Grid>

        </Grid>

    )
}