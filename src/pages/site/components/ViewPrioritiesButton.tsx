import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  companyId: string;
  companyName: string;
}

const ViewPrioritiesButton = ({ companyId, companyName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (companyId: string, companyName: string) => {
    navigate(Routes.PriorityAll, { state: { companyId, companyName } });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(companyId, companyName)}
    >
      {Strings.viewPriorities}
    </CustomButton>
  );
};

export default ViewPrioritiesButton
