import { Collapse, Empty, Spin } from "antd";
import { Level } from "../../../data/level/level";
const { Panel } = Collapse;

interface Props {
  data: Level[];
  isLoading: boolean;
}

const LevelCollapse = ({ data, isLoading }: Props) => {
  const renderPanels = (parentId: number) => {
    return data
      .filter((item) => Number(item.superiorId) === parentId)
      .map((item) => (
        <Panel header={item.name} key={item.id}>
          {item.description}
          {renderPanels(Number(item.id)).length > 0 && (
            <Collapse>{renderPanels(Number(item.id))}</Collapse>
          )}
        </Panel>
      ));
  };
  return (
    <>
      {data.length > 0 ? (
        <Collapse>{renderPanels(0)}</Collapse>
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
      <Spin spinning={isLoading} fullscreen />
    </>
  );
};

export default LevelCollapse;
