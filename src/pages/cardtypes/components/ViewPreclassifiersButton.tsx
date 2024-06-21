import { useNavigate } from "react-router-dom";
import CustomButton from "../../../components/CustomButtons";
import Strings from "../../../utils/localizations/Strings";
import Routes from "../../../utils/Routes";

interface props {
  cardTypeId: string;
  cardTypeName: string
}

const ViewPreclassifiersButton = ({ cardTypeId, cardTypeName }: props) => {
  const navigate = useNavigate();

  const handleOnViewPriorities = (cardTypeId: string) => {
    navigate(Routes.PreclassifiersAllByCardType, { state: { cardTypeId, cardTypeName } });
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
