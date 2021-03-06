import React, { Component } from 'react';

import style from './style.css';

class Subsection extends Component {
  render() {
    return (
      <div className={style.subsection}>
        {this.props.hardcoded && <span className='tag tag-danger'>Hardcoded Example Data</span>}
        {this.props.title && <h3>{this.props.title}</h3>}
        {typeof this.props.hasData !== 'undefined' && !this.props.hasData ?
          <i className="text-muted">No Data Available</i> :
          this.props.children}
      </div>
    );
  }
}

Subsection.propTypes = {
  children: React.PropTypes.element.isRequired,
  hardcoded: React.PropTypes.bool,
  hasData: React.PropTypes.bool,
  title: React.PropTypes.string,
};

export default Subsection;
