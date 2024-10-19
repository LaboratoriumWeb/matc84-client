import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Link,
  TextField,
  Typography
} from "@mui/material";
import Image from "next/image";
import cadastro_img from "../../../../public/assets/cadastro.svg";

const Cadastro = () => (
  <Box
    className="flex mr-0 pr-0"
    sx={{ "&.MuiContainer-root": { paddingRight: 0, margin: 0 } }}
  >
    {/* SECTION FORM */}
    <Box component="section" className="flex-[2] flex flex-col ml-6 mt-5">
      {/* HEADER */}
      <Box className="flex flex-col w-full">
        <Box component="header" className="flex justify-end items-center gap-3">
          <Link
            variant="subtitle1"
            textAlign="end"
            underline="none"
            sx={{ cursor: "pointer" }}
          >
            Ja tem uma conta?
          </Link>
          <FontAwesomeIcon icon={faUser} />
        </Box>
        <Box className="">
          <Typography variant="h3" fontWeight="bold">
            Cadastre-se
          </Typography>
          <Typography variant="subtitle1" className="max-w-sm">
            Junte-se a nós! Crie sua conta gratuita e descubra tudo o que
            podemos fazer por você.
          </Typography>
        </Box>
      </Box>

      {/* FORMULARIO */}
      <FormControl
        className="w-full"
        sx={{ "&.MuiFormControl-root": { marginTop: "40px" } }}
      >
        <Box className="flex justify-between gap-5">
          <Box className="flex flex-col w-full">
            <FormLabel>Nome</FormLabel>
            <TextField id="my-input" variant="outlined" placeholder="Jonh" />
          </Box>
          <Box className="flex flex-col w-full">
            <FormLabel>Sobrenome</FormLabel>
            <TextField
              id="my-input"
              placeholder="Sobrenome"
              variant="outlined"
            />
          </Box>
        </Box>

        <Box className="flex justify-between gap-5">
          <Box className="flex flex-col w-full">
            <FormLabel>E-mail</FormLabel>
            <TextField
              id="my-input"
              placeholder="E-mail"
              variant="outlined"
              type="email"
            />
          </Box>

          <Box className="flex flex-col w-full">
            <FormLabel>Telefone</FormLabel>
            <TextField
              id="my-input"
              placeholder="Telefone"
              variant="outlined"
              type="tel"
            />
          </Box>
        </Box>

        <Box className="flex justify-between gap-5">
          <Box className="flex flex-col w-full">
            <FormLabel>Senha</FormLabel>
            <TextField
              id="my-input"
              placeholder="Senha"
              variant="outlined"
              type="password"
            />
          </Box>
          <Box className="flex flex-col w-full">
            <FormLabel>Comfime sua senha</FormLabel>
            <TextField
              id="my-input"
              placeholder="Confirmar senha"
              variant="outlined"
              type="password"
            />
          </Box>
        </Box>
      </FormControl>

      <Box textAlign="end" paddingTop={5}>
        <Button variant="contained">Cadastra-se</Button>
      </Box>
    </Box>
    {/* SECTION RIGHT IMAGE */}
    <Box component="section" className="flex justify-center items-end w-1/2">
      <Image
        src={cadastro_img}
        // width={500}
        className="h-full"
        alt="Picture of the author"
      />
    </Box>
  </Box>
);

export default Cadastro;
