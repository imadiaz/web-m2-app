import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";

interface props {
  id: string;
  companyName: string;
}

const ViewPrioritiesButton = ({ id, companyName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (id: string, companyName: string) => {
    navigate("/priority/all", { state: { id, companyName } });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(id, companyName)}
    >
      {Strings.viewPriorities}
    </CustomButton>
  );
};

export default ViewPrioritiesButton
