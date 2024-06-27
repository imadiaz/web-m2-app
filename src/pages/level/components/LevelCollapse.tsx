import { Collapse, Empty, Spin } from "antd";
import { Level } from "../../../data/level/level";
import RegisterNodeButton from "./RegisterNodeButton";

interface Props {
  data: Level[];
  isLoading: boolean;
}
const generateItems = (parentId: number, data: Level[], nodesName: string[]): any => {
  return data
    .filter((item) => Number(item.superiorId) === parentId)
    .map((item) => {
      const updatedNodesName = [...nodesName, item.name];
      const childrenItems = generateItems(Number(item.id), data, updatedNodesName);
      return {
        key: item.id.toString(),
        label: <h1 className="flex-1 text-base md:text-lg">{item.name}</h1>,
        extra: <RegisterNodeButton superiorId={item.id} nodesName={updatedNodesName} />,
        children: (
          <>
            <h2 className="mb-2 font-light text-base md:text-lg">
              {item.description}
            </h2>
            {childrenItems.length > 0 && (
              <Collapse items={childrenItems} />
            )}
          </>
        ),
      };
    });
};
const LevelCollapse = ({ data, isLoading }: Props) => {
  const items = generateItems(0, data, []);
  return (
    <>
      {data.length > 0 ? (
        <Collapse items={items} />
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};

export default LevelCollapse;
