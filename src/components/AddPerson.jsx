import axios from 'axios';
import { useState } from 'react';

function AddPerson() {
    const URL = process.env.REACT_APP_ADDPERSON_TO_DB;
    const[input, setInput] = useState({
        firstName: "",
        lastName: "",
        address: "",
    })

    const handleChange = (e) => {
        const{name, value} = e.target;
        setInput(prevState => {
            return {
                ...prevState,
                [name]: value,
            }
        })
        console.log(input.firstName, input.lastName, input.address)
    }

    const submitPerson = async () => {
        try{
            const person = {
                firstName: input.firstName,
                lastName: input.lastName,
                address: input.address,
            };
            await axios.post(URL, person)
            .then((res) => {
                console.log(res);
                setInput({
                    firstName: "",
                    lastName: "",
                    address: "",
                })
            })
        } catch(error){
            console.log(error)
        }
    }

  return (
    <div style={{
        display:'flex', 
        flexDirection:'column',
        justifyContent:'center', 
        alignItems:'center', 
        width:'50%', 
        minWidth:'550px',
        maxWidth:'800px',
        height:'40vh',
        minHeight:'400px', 
        maxHeight: '600px',
        // border:'1px solid',
        margin:'30px'
        }}>
        <div style={{
            display:'flex', 
            justifyContent:'space-between', 
            flexDirection:'column', 
            alignItems:'center',
            // maxHeight:'400px',
            // minHeight:'200px',
            height:'100%',
            width:'70%',
            border:'1px solid',
            borderRadius:'25px',
            paddingBottom:'30px',
            boxShadow:'4px 4px 4px rgba(200, 200, 200, .5)'
            }}>
            <h1 style={{color:'gray'}}>POST to DynamoDB</h1>
            <input style={{padding:'15px', fontSize:'25px', textAlign:'center'}} name='firstName' type='text' placeholder='firstName' value={input.firstName} onChange={(e) =>handleChange(e)}/>
            <input style={{padding:'15px', fontSize:'25px', textAlign:'center'}} name='lastName' type='text' placeholder='lastName' value={input.lastName} onChange={handleChange}/>
            <input style={{padding:'15px', fontSize:'25px', textAlign:'center'}} name='address' type='text' placeholder='address' value={input.address} onChange={handleChange}/>
            <div style={{
                display:'flex',
                justifyContent:'center',
                width:'60%'
            }}>
                <button style={{fontSize:'25px',padding:'10px'}} onClick={submitPerson}>submit data</button>
            </div>
        </div>
    </div>
  );
}

export default AddPerson;
