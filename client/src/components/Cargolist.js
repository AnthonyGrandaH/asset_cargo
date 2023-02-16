import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Button, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function CargoList() {
    const [cargo, setCargo] = useState([]);
    const navigate = useNavigate();

    const loadcargos = async () => {
        const response = await fetch('http://localhost:4000/cargo')
        const data = await response.json()
        setCargo(data)
    };

    const handleDelete = async (id) => {
        await fetch(`http://localhost:4000/cargo/${id}`, {
            method: "DELETE",
        })
        setCargo(cargo.filter(cargo => cargo.id !== id))
    }

    useEffect(() => {
        loadcargos()
    }, []);
    
    return (
        <>
            <h1>Cargos</h1>

            <Button variant='contained' color='success' onClick={() => navigate("/cargo/new")}>
                <AddCircleIcon />
                &nbsp; Nuevo Cargo
            </Button>

            <TableContainer component={Paper} sx={{ maxHeight: '550PX' }} style={{ backgroundColor: '#37474f' }} >
                <Table sx={{ minWidth: 650 }} aria-label='simple table' stickyHeader >
                    <TableHead >
                        <TableRow >

                            <TableCell align='center' sx={{ fontWeight: 'bold' }} >CARGO</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>DESCRIPCION</TableCell>
                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>OPCIONES</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            cargo.map((cargo) => (
                                <TableRow key={cargo.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align='center' style={{ color: 'white' }}>{cargo.tipocargo}</TableCell>
                                    <TableCell align='center' style={{ color: 'white' }}>{cargo.descripcioncargo}</TableCell>

                                    <TableCell align='center'>

                                        &nbsp; &nbsp;

                                        <Button variant='contained' color='primary' onClick={() => navigate(`/cargo/${cargo.id}/edit`)} >
                                            <EditIcon style={{ color: 'white' }} />
                                        </Button>

                                        <Button variant='contained' color='error' onClick={() => handleDelete(cargo.id) && window.location.reload()} style={{ marginLeft: ".5rem" }}>
                                            <DeleteIcon style={{ color: 'white' }} />
                                        </Button>

                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>



        </>
    )
}