// Default layout template
const React = require('react');
const jsBundle = require('../../build/utils.js').getJsBundle();

export default class Index extends React.Component {
  render() {
    const title = 'WHATLYRIC';
    const jsBundlePath = `/static/js/${jsBundle}`;

    return (
      <html>
      <head>

        <meta
          charSet="utf-8">
        </meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1">
        </meta>
        <title>
          {title}
        </title>
            <link
              href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css"
              rel="stylesheet">
            </link>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:300"
          rel="stylesheet"
          type="text/css">
        </link>
      </head>
      <body>
        <div className="main">
          <header className="header">
            <img src="/static/images/logo.png" />
            <br />&nbsp;
            <br />&nbsp;
            FIND THE LYRICS FOR THE SONGS YOU LOVE
          </header>
          <content className="content">
            <component id="SearchPanel"></component>
          </content>
          <div className="sidebar sidebar-left">&nbsp;</div>
          <div className="sidebar sidebar-right">&nbsp;</div>
        </div>
        <script
          src="http://code.jquery.com/jquery-2.1.3.min.js">
        </script>
        <script
          src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js">
        </script>
        <script
          src={jsBundlePath}>
        </script>
      </body>
      </html>
    );
  }
}

