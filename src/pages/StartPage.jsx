import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outline" onClick={() => navigate("/login")}>
      Go to Login
    </Button>
  );
};

export default StartPage;
