import { Box, Button, Link, Typography } from "@mui/material";
import Image from "next/image";
import imageLeft from "../../../public/assets/imageLeft.svg";
import imageRight from "../../../public/assets/imageRight.svg";

const Success = () => {
  return (
    <Box className="flex h-full">
      <Box className="flex flex-col grow w-full justify-center items-center z-50">
        <Typography variant="h1" fontWeight="bold">
          Sucesso
        </Typography>
        <Typography
          variant="body1"
          width="45%"
          textAlign="center"
          marginBottom="50px"
          marginTop="20px"
        >
          Sua nova conta foi criada com sucesso. Mas antes de começar você terá
          que ativá-la. Enviamos um e-mail de ativação para o e-mail que você
          forneceu durante o registro. Deve chegar em alguns minutos.
        </Typography>
        <Typography variant="body1" width="35%" textAlign="center">
          Se o e-mail não chegar dentro de 30 segundos você ainda pode clicar no
          botão abaixo para reenviá-lo. Garantimos que desta vez chegará!
        </Typography>
        <Link
          marginY="50px"
          className="cursor-pointer"
          underline="none"
          fontWeight="500"
        >
          Enviar e-mail de verificação novamente
        </Link>
        <Button variant="contained" className="cursor-pointer">
          Fechar
        </Button>
      </Box>
      <Box className="flex w-full justify-between items-end bottom-0 absolute z-0">
        <Image className="max-w-2xl w-1/3" src={imageLeft} />
        <Image className="max-w-2xl w-[30%]" src={imageRight} />
      </Box>
    </Box>
  );
};

export default Success;
