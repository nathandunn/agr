import React, { Component } from 'react';
import { connect } from 'react-redux';

import fetchData from '../../lib/fetchData';
import { fetchGene, fetchGeneSuccess, fetchGeneFailure } from '../../actions/genes';
import { selectGene } from '../../selectors/geneSelectors';

import BasicGeneInfo from './basicGeneInfo';
import GenePageHeader from './genePageHeader';
import { OrthologyTable, mockOrthologData } from '../../components/orthology';
import { DiseaseTable, mockDiseaseData } from '../../components/disease';
import Subsection from '../../components/subsection';
import TranscriptViewer from './transcriptViewer';
import TranscriptInlineViewer from './transcriptInlineViewer';


class GenePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchGene());
    fetchData(`/api/gene/${this.props.params.geneId}`)
      .then(data => this.props.dispatch(fetchGeneSuccess(data)))
      .catch(error => this.props.dispatch(fetchGeneFailure(error)));
  }

  render() {
    if (this.props.loading) {
      return <span>loading...</span>;
    }

    if (this.props.error) {
      return <div className='alert alert-danger'>{this.props.error}</div>;
    }

    if (!this.props.data) {
      return null;
    }

    // todo, add chromosome
    var genomeLocation ;
    if(this.props.data.genomeLocations.length==1){
      genomeLocation = this.props.data.genomeLocations[0];
    }
    else
    if(this.props.data.genomeLocations.length>1){
      // TODO: figure out the proper assembly
      genomeLocation = this.props.data.genomeLocations[0];
    }


    return (
      <div className='container'>

        <GenePageHeader symbol={this.props.data.symbol} />

        <Subsection>
          <BasicGeneInfo geneData={this.props.data} />
        </Subsection>

        <Subsection title='Transcript Inline Viewer'>
          {genomeLocation
            ?
            <TranscriptInlineViewer geneSymbol={this.props.data.symbol} species={this.props.data.species} fmin={genomeLocation.fmin } fmax={genomeLocation.fmax} chromosome={genomeLocation.chromosome}/>
            :
            <div className="alert alert-warning">Genome Location Data Unavailable</div>
          }
        </Subsection>

        <Subsection title='Transcript Viewer'>
          {genomeLocation
            ?
            <TranscriptViewer geneSymbol={this.props.data.symbol} species={this.props.data.species} fmin={genomeLocation.fmin } fmax={genomeLocation.fmax} chromosome={genomeLocation.chromosome}/>
            :
            <div className="alert alert-warning">Genome Location Data Unavailable</div>
          }
        </Subsection>

        <Subsection hardcoded title='Orthology'>
          <OrthologyTable data={mockOrthologData} />
        </Subsection>

        <Subsection hardcoded title='Disease Associations'>
          <DiseaseTable data={mockDiseaseData} />
        </Subsection>

      </div>
    );
  }
}

GenePage.propTypes = {
  data: React.PropTypes.object,
  dispatch: React.PropTypes.func,
  error: React.PropTypes.object,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object,
};

function mapStateToProps(state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
