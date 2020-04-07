import React from "react";
import {Helmet} from "react-helmet";

class MetaValues extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{process.env.REACT_APP_NAME}</title>
            </Helmet>
        </div>
    );
  }
};

export default MetaValues