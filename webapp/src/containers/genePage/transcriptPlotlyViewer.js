import React, {Component} from 'react';

import style from './style.css';
// import createPlotlyComponent from 'react-plotlyjs';
// import Plotly from 'plotly.js/dist/plotly-cartesian';
// const PlotlyComponent = createPlotlyComponent(Plotly);



class TranscriptPlotlyViewer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let jbrowsePrefx = 'http://bw.scottcain.net/jbrowse/?data=data%2F';
    // location based data
    let locationString = this.props.fmin && this.props.fmax ? this.props.chromosome + ':' + this.props.fmin + '..' + this.props.fmax : this.props.geneSymbol;
    let jbrowseUrl = jbrowsePrefx + encodeURI(this.props.species) + '&loc=' + encodeURI(locationString) + '&tracks=DNA%2CAll%20Genes&highlight=';

    let config = {
      showLink: false,
      displayModeBar: true
    };
    let data = [
      {
        type: 'scatter',  // all "scatter" attributes: https://plot.ly/javascript/reference/#scatter
        x: [1, 2, 3],     // more about "x": #scatter-x
        y: [6, 2, 3],     // #scatter-y
        marker: {         // marker is an object, valid marker keys: #scatter-marker
          color: 'rgb(16, 32, 77)' // more about "marker.color": #scatter-marker-color
        }
      },
      {
        type: 'bar',      // all "bar" chart attributes: #bar
        x: [1, 2, 3],     // more about "x": #bar-x
        y: [6, 2, 3],     // #bar-y
        name: 'bar chart example' // #bar-name
      }
    ];
    let layout = {                     // all "layout" attributes: #layout
      title: 'simple example',  // more about "layout.title": #layout-title
      xaxis: {                  // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time'         // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [            // all "annotation" attributes: #layout-annotations
        {
          text: 'simple annotation',    // #layout-annotations-text
          x: 0,                         // #layout-annotations-x
          xref: 'paper',                // #layout-annotations-xref
          y: 0,                         // #layout-annotations-y
          yref: 'paper'                 // #layout-annotations-yref
        }
      ]
    };


    return (
      <div className={style.jbrowse}>
        <a href={jbrowseUrl} rel="noopener noreferrer" target='_blank'>
                <PlotlyComponent className="whatever" data={data} layout={layout} config={config} />
        </a>
      </div>
    );
  }
}

TranscriptPlotlyViewer.propTypes = {
  chromosome: React.PropTypes.string,
  fmax: React.PropTypes.number,
  fmin: React.PropTypes.number,
  geneSymbol: React.PropTypes.string.isRequired,
  species: React.PropTypes.string.isRequired,
};

export default TranscriptPlotlyViewer;
