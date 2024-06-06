import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  cardTypeId: string;
}

const ViewPreclassifiersButton = ({ cardTypeId }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (cardTypeId: string) => {
    navigate(Routes.PreclassifiersAllByCardType, { state: { cardTypeId } });
  };

  return (
    <CustomButton
      type="action"
      onClick={() => handleOnViewPriorities(cardTypeId)}
    >
      {Strings.viewPreclassifiers}
    </CustomButton>
  );
};

export default ViewPreclassifiersButton;
