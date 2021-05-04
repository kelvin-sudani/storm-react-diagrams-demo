import React from "react";
import Lodash from "lodash";
import {
  DiagramWidget,
  DiagramEngine,
  DefaultNodeFactory,
  DefaultLinkFactory,
  DefaultNodeModel,
  DefaultPortModel
} from "storm-react-diagrams";
import TrayWidget from "./components/TrayWidget";
import TrayItemWidget from "./components/TrayItemWidget";

import "./srd.css";

class DemoFive extends React.Component {
  componentWillMount() {
    this.engine = new DiagramEngine();
    this.engine.registerNodeFactory(new DefaultNodeFactory());
    this.engine.registerLinkFactory(new DefaultLinkFactory());
  }
  render() {
    return (
      <div className="content">
        <ul>
          <li>Click and drag any node into dark region </li>
          <li>
            Connect any nodes by clicking a port (in bottom left corner of a
            node) and then dragging the cursor to other node's port
          </li>
          <li>
            Shift + Left mouse click to select a link, then press
            Delete/Backspace
          </li>
        </ul>

        <TrayWidget>
          <TrayItemWidget model={{ type: "in" }} name="Red  Node" color="red" />
          <TrayItemWidget
            model={{ type: "out" }}
            name="Yellow Node"
            color="yellow"
          />
          <TrayItemWidget
            model={{ type: "in" }}
            name="Green Node"
            color="lightgreen"
          />
          <TrayItemWidget
            model={{ type: "out" }}
            name="Blue Node"
            color="lightblue"
          />
        </TrayWidget>
        <div
          className="diagram-layer"
          onDrop={(event) => {
            var data = JSON.parse(
              event.dataTransfer.getData("storm-diagram-node")
            );
            var nodesCount = Lodash.keys(
              this.engine.getDiagramModel().getNodes()
            ).length;
            var node = null;
            if (data.type === "in") {
              node = new DefaultNodeModel(
                "Node " + (nodesCount + 1),
                data.color
              );
              node.addPort(new DefaultPortModel(true, "in-1", "In"));
            } else {
              console.log("out data", data);
              node = new DefaultNodeModel(
                "Node " + (nodesCount + 1),
                data.color
              );
              node.addPort(new DefaultPortModel(true, "out-1", "Out"));
            }
            var points = this.engine.getRelativeMousePoint(event);
            node.x = points.x;
            node.y = points.y;
            this.engine.getDiagramModel().addNode(node);
            this.forceUpdate();
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          <DiagramWidget diagramEngine={this.engine} />
        </div>
      </div>
    );
  }
}
export default DemoFive;
