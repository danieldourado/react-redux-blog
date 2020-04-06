import React from "react";
import {Helmet} from "react-helmet";

class MetaValues extends React.Component {
  render () {
  const appName = process.env.REACT_APP_NAME
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{appName}</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
        </div>
    );
  }
};

export default MetaValues