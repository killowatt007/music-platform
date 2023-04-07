import {Button} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  link: string;
}

const Back: React.FC<Props> = ({link}) => {
  const router = useRouter()
  
  return (
    <Button
      variant={"outlined"}
      onClick={() => router.push(link)}
    >
      К списку
    </Button>
  );
};

export default Back;