import React, {Component} from 'react';

import DataSourceCard from './dataSourceCard';
import DataSourceLink from '../../components/dataSourceLink';

class BasicGeneInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      geneData: this.props.geneData,
      speciesData: {
        species: this.props.geneData.species,
        dataProvider: this.props.geneData.dataProvider,
        primaryId: this.props.geneData.primaryId,
      }
    };
  }

  placeholderIfBlank(text) {
    if (text) {
      return text;
    }
    return <i className='text-muted'>Not Available</i>;
  }

  render() {
    return (
      <div className='row'>
        <div className='col-sm-4 push-sm-8'>
          <DataSourceCard sourceData={this.state.speciesData} />
        </div>
        <div className='col-sm-8 pull-sm-4'>
          <dl className='row'>
            <dt className='col-sm-2'>Symbol</dt>
            <dd className='col-sm-10'>{this.state.geneData.symbol}</dd>

            <dt className='col-sm-2'>Name</dt>
            <dd className='col-sm-10'>{this.placeholderIfBlank(this.state.geneData.name)}</dd>

            <dt className='col-sm-2'>Synonyms</dt>
            <dd className='col-sm-10'>{this.placeholderIfBlank(
                this.state.geneData.synonyms ? this.state.geneData.synonyms.join(', ') : ''
            )}</dd>

            <dt className='col-sm-2'>Biotype</dt>
            <dd className='col-sm-10'>{this.state.geneData.soTermId}</dd>

            <dt className='col-sm-2'>Description</dt>
            <dd className='col-sm-10'>{this.placeholderIfBlank(this.state.geneData.geneSynopsis)}</dd>

            <dt className='col-sm-2'>Genomic Resources</dt>
            <dd className='col-sm-10'>
              {
                this.state.geneData.crossReferences
                  .sort((a, b) => `${a.dataProvider}:${a.id}`.localeCompare(`${b.dataProvider}:${b.id}`))
                  .map((ref, idx) => {
                    return (
                      <div key={`ref-${idx}`}>
                        <DataSourceLink dataProvider={ref.dataProvider} id={ref.id} />
                      </div>
                    );
                  })
              }
            </dd>

            <dt className='col-sm-2'>Additional Information</dt>
            <dd className='col-sm-10'><a href={this.state.geneData.geneLiteratureUrl}>Literature</a></dd>
          </dl>
        </div>
      </div>
    );
  }
}

BasicGeneInfo.propTypes = {
  geneData: React.PropTypes.object
};

export default BasicGeneInfo;
