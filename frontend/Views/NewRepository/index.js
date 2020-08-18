import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import classnames from 'classnames';

import RichEditor from 'Components/RichEditor';
import PinButton from 'Components/newRepository/PinButton';
import TagsInput from 'Components/newRepository/TagsInput';

import {
  postDiscussion,
  updateDiscussionTitle,
  updateDiscussionContent,
  updateDiscussionPinStatus,
  updateDiscussionTags,
} from './actions';

import styles from './styles.css';
import appLayout from 'SharedStyles/appLayout.css';

class newRepository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      forumId: null,
      userId: null,
      fatalError: null,
    };
  }

  componentDidMount() {
    const {
      user,
      currentForum,
      forums,
    } = this.props;

    this.setUserAndForumID(user, forums, currentForum);
  }

  componentWillReceiveProps(nextProps) {
    const {
      user,
      currentForum,
      forums,
    } = nextProps;

    this.setUserAndForumID(user, forums, currentForum);
  }

  setUserAndForumID(user, forums, currentForum) {
    const forumId = _.find(forums, { forum_slug: currentForum });
    if (forumId) {
      const currentForumId = forumId._id;
      this.setState({
        forumId: currentForumId,
        userId: user._id,
      });
    } else {
      this.setState({
        fatalError: 'Invalid forum buddy, go for the right one!',
      });
    }
  }

  renderEditor() {
    const {
      authenticated,
      role,
    } = this.props.user;

    const {
      updateDiscussionTitle,
      updateDiscussionContent,
      updateDiscussionPinStatus,
      updateDiscussionTags,
      postDiscussion,
      currentForum,
    } = this.props;

    const {
      title,
      content,
      tags,
      pinned,
    } = this.props.newRepository;

    const {
      forumId,
      userId,
    } = this.state;

    // only show the editor when user is authenticated
    if (authenticated) {
      return [
        <input
          key={'title'}
          type="text"
          className={styles.titleInput}
          placeholder={'Discussion title...'}
          value={title}
          onChange={(event) => { updateDiscussionTitle(event.target.value); }}
        />,
        (role === 'admin') && <PinButton
          key={'pinned'}
          value={pinned}
          onChange={(value) => { updateDiscussionPinStatus(value); }}
        />,
        <TagsInput
          key={'tags'}
          value={tags}
          onChange={(tags) => { updateDiscussionTags(tags); }}
        />,
        <RichEditor
          key={'content'}
          type='newRepository'
          value={content}
          onChange={(value) => { updateDiscussionContent(value); }}
          onSave={() => { postDiscussion(userId, forumId, currentForum); }}
        />,
      ];
    }

    return (
      <div className={classnames(appLayout.constraintWidth, styles.signInMsg)}>
        Please sign in before posting a new repository.
      </div>
    );
  }

  render() {
    const { fatalError } = this.state;

    if (fatalError) { return (<div className={classnames(styles.errorMsg, styles.fatalError)}>{fatalError}</div>); }

    const { currentForum } = this.props;
    const {
      errorMsg,
      postingSuccess,
      postingDiscussion,
    } = this.props.newRepository;

    return (
      <div className={classnames(appLayout.constraintWidth, styles.content)}>
        <Helmet><title>MIT | New Repository</title></Helmet>

        <div className={styles.forumInfo}>
          You are creating a repository on <span className={styles.forumName}>{currentForum}</span>.
        </div>
        <div className={styles.errorMsg}>{errorMsg}</div>
        { postingSuccess && <div className={styles.successMsg}>Your repository is created :-)</div> }
        { this.renderEditor() }
        { postingDiscussion && <div className={styles.postingMsg}>Upload repository...</div> }
      </div>
    );
  }
}

export default connect(
  (state) => { return {
    user: state.user,
    forums: state.app.forums,
    currentForum: state.app.currentForum,
    newRepository: state.newRepository,
  }; },
  (dispatch) => { return {
    postDiscussion: (userId, forumId, currentForum) => { dispatch(postDiscussion(userId, forumId, currentForum)); },
    updateDiscussionTitle: (value) => { dispatch(updateDiscussionTitle(value)); },
    updateDiscussionContent: (value) => { dispatch(updateDiscussionContent(value)); },
    updateDiscussionPinStatus: (value) => { dispatch(updateDiscussionPinStatus(value)); },
    updateDiscussionTags: (value) => { dispatch(updateDiscussionTags(value)); },
  }; }
)(newRepository);