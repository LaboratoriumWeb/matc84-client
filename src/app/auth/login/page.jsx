import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import login_background from '/public/img/login_background.svg';


export default function Login() {
  return (
    <div
      className="flex bg-white w-full h-screen"
      style={{border: '1px solid red'}}
    >
      <div className="w-3/6 flex justify-center content-center">
        <FormControl className="flex justify-center content-center" style={{border: '1px solid blue'}}>
          <TextField
            id="outlined-basic"
            label="E-mail"
            variant="outlined"
          />

          <TextField
            id="outlined-basic"
            label="Senha"
            variant="outlined"
          />
        </FormControl>
      </div>
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-3/6">
        <Image src={login_background} alt="" />
      </div>
    </div>
  )
}
