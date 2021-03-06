import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addComment } from '../../../store/actions/product';

import styles from './Comments.module.scss';
import Comment from '../Comment/Comment';
import Button from '../../UI/Button/Button';

const Comments = ({ addComment, auth, comments, history, match }) => {
    const [loading, setLoading] = useState(false);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        setNewComment(() => "");
    }, [comments]);

    const onChangeHandler = (e) => {
        e.persist();
        setNewComment(e.target.value);
    };

    const onSubmit = e => {
        if (!auth.isAuthenticated) return history.push('/auth');
        if (newComment === "") return alert("Comment needed");

        setLoading(true);
        addComment(match.params.id, newComment, () => setLoading(false));
    }

    return (
        <Fragment>
            <h3 className={styles.Header}>Comments</h3>
            <div className={styles.Comments}>
                {comments.length === 0 && <p>No Comment yet</p>}
                {comments.map(comment => <Comment key={comment._id} comment={comment} />)}
                <textarea
                    className={styles.Textarea}
                    placeholder="New comment here"
                    value={newComment}
                    onChange={onChangeHandler}
                ></textarea>
                <Button
                    btnType="color-primary"
                    className={styles.button}
                    onClick={onSubmit}
                    loading={loading}
                >SEND
                </Button>
            </div>
        </Fragment>
    )
}

Comments.propTypes = {
    comments: PropTypes.array,
    auth: PropTypes.object,
};

const mapStateToProps = state => ({
    comments: state.product.product.comments,
    auth: state.auth,
    addComment: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { addComment })(withRouter(Comments));
