import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'react-bootstrap';
import Youtube from 'react-youtube';
import { createSelector } from 'reselect';
import debug from 'debug';

import { toggleQuestionView } from '../../redux/actions';
import { challengeSelector } from '../../redux/selectors';

const log = debug('fcc:videos');

const mapStateToProps = createSelector(
  challengeSelector,
  ({
    challenge: {
      id = 'foo',
      dashedName,
      description,
      challengeSeed: [ videoId ] = [ '1' ]
    }
  }) => ({
    id,
    videoId,
    dashedName,
    description
  })
);

export class Lecture extends React.Component {
  static displayName = 'Lecture';

  static propTypes = {
    // actions
    toggleQuestionView: PropTypes.func,
    // ui
    id: PropTypes.string,
    videoId: PropTypes.string,
    description: PropTypes.array,
    dashedName: PropTypes.string
  };

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    return nextProps.id !== props.id;
  }

  handleError: log;

  renderTranscript(transcript, dashedName) {
    return transcript.map((line, index) => (
      <p
        className='lead text-left'
        dangerouslySetInnerHTML={{__html: line}}
        key={ dashedName + index }
      />
    ));
  }

  render() {
    const {
      id,
      videoId,
      description = [],
      toggleQuestionView
    } = this.props;

    const dashedName = 'foo';

    return (
      <Col xs={ 12 }>
        <Row>
          <div className='embed-responsive embed-responsive-16by9'>
            <Youtube
              className='embed-responsive-item'
              id={ id }
              onError={ this.handleError }
              videoId={ videoId }
            />
          </div>
        </Row>
        <Row>
          <Col
            md={ 10 }
            mdOffset={ 1 }
            xs={ 12 }
            >
            <article>
              { this.renderTranscript(description, dashedName) }
            </article>
            <Button
              block={ true }
              bsSize='large'
              bsStyle='primary'
              onClick={ toggleQuestionView }
              >
              Take me to the Questions
            </Button>
            <div className='spacer' />
          </Col>
        </Row>
      </Col>
    );
  }
}

export default connect(
  mapStateToProps,
  { toggleQuestionView }
)(Lecture);
