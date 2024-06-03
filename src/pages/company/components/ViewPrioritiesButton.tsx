import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  id: string;
  companyName: string;
}

const ViewPrioritiesButton = ({ id, companyName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (id: string, companyName: string) => {
    navigate(Routes.PriorityAll, { state: { id, companyName } });
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
