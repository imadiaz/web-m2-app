import { Card, Dropdown, MenuProps, Tag, theme } from "antd";
import { Company } from "../../../data/company/company";
import { getStatusAndText } from "../../../utils/Extensions";
import { SlOptionsVertical } from "react-icons/sl";
import Strings from "../../../utils/localizations/Strings";
import { useAppDispatch } from "../../../core/store";
import {
  resetChangeIndicator,
  resetRowData,
  setRowData,
} from "../../../core/genericReducer";
import { CardTypes } from "../../../data/cardtypes/cardTypes";
import CustomButton from "../../../components/CustomButtons";

interface CardProps {
  data: CardTypes;
}

const CardTypesCard = ({ data }: CardProps) => {
  const { status, text } = getStatusAndText(data.status);
  const dispatch = useAppDispatch();
  const {
    token: { colorBgContainer, colorPrimary },
  } = theme.useToken();

  const handleUpdateClick = (row: Company) => {
    dispatch(resetRowData());
    dispatch(setRowData(row));
    dispatch(resetChangeIndicator());
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <CustomButton></CustomButton>
      ),
    },
    {
      key: "5",
      label: <CustomButton></CustomButton>
    },
  ];

  const titleCard = (
    <div className="flex flex-row justify-center items-center">
      <div className="ml-2 max-w-xs">
        <p className="break-words text-wrap text-sm md:text-base text-white">
          {data.name}
        </p>
      </div>
      <div className="absolute left-1">
        <Dropdown menu={{ items }} arrow>
          <SlOptionsVertical
            color={colorPrimary}
            size={20}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      </div>
    </div>
  );

  return (
    <Card
      styles={{ body: { backgroundColor: colorBgContainer } }}
      key={data.id}
      type="inner"
      title={titleCard}
      className="h-max shadow-xl overflow-hidden text-sm md:text-base relative"
    >
      <div className="absolute right-0 top-11">
        {" "}
        <Tag color={status}>{text}</Tag>
      </div>
      <div className="">
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.methodology}: </h1>
          <p>{data.methodology}</p>
        </div>
        <div className="flex  flex-row">
          <h1 className="font-semibold mr-1">{Strings.name}: </h1>
          <p>{data.name}</p>
        </div>
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.contact}: </h1>
          <p>{data.description}</p>
        </div>
        <div className="flex flex-row">
          <h1 className="font-semibold mr-1">{Strings.responsible}: </h1>
          <p>{data.responsableName}</p>
        </div>
        <div className="flex flex-row flex-wrap">
          <h1 className="font-semibold mr-1">{Strings.color}: </h1>
          <div style={{ backgroundColor: `#${data.color}`, width: 50, height: 20 }} />
        </div>
      </div>
    </Card>
  );
};

export default CardTypesCard;
