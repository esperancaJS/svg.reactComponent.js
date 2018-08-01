// import React from "react";
// import ReactDOM from "react-dom";
// import SVG from "svg.js";

SVG.ReactComponent = SVG.invent({
  // Initialize node
  create: "foreignObject",

  // Inherit from
  inherit: SVG.Shape,

  // Add parent method
  construct: {
    // Create a rect element
    reactComponent: function(width, height) {
      return this.put(new SVG.ReactComponent()).size(width, height);
    }
  },
  extend: {
    appendChild: async function(Component) {
      function renderReactComponent(Component) {
        return new Promise(resolve => {
          const nodeRef = React.createRef();
          const el = document.createElement("div");
          ReactDOM.render(<div ref={nodeRef}>{Component}</div>, el, () => {
            const DOMnode = ReactDOM.findDOMNode(nodeRef.current);
            resolve(DOMnode);
          });
        });
      }

      const el = document.createElement("div");

      var rederedComponent = await renderReactComponent(Component);

      this.node.appendChild(rederedComponent);
      return this;
    },
    getChild: function(index) {
      return this.node.childNodes[index];
    }
  }
});
