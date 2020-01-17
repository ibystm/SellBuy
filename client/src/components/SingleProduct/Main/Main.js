import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import imageConverter from '../../../utils/imageConverter';
import styles from './Main.module.scss';

import Comments from '../Comments/Comments';
import UserInfo from '../UserInfo/UserInfo';

const Main = ({
    product: {
        productImage,
        productImageLow,
        avatar,
        name,
        description,
        category,
        meetupAt,
        title,
        user
    }
}) => {
    const imageSrc = productImage
        ? imageConverter(productImage.data)
        : imageConverter(productImageLow.data);

    return (
        <div className={styles.Main}>
            <img alt="pic" className={styles.Image} src={`data:image/jpeg;base64,${imageSrc}`} />
            <div className={styles.Container}>
                <h2 >{title}</h2>
                <ul className={styles.ItemList}>
                    <li>Category: {category}</li>
                    <li>Meetup Place: {meetupAt}</li>
                </ul>
                <Link to={`/profile/${user}`}>
                    <UserInfo name={name} avatar={avatar} />
                </Link>
                <h3>Description</h3>
                <div>{description}</div>
                <Comments />
            </div>
        </div>
    )
}

Main.propTypes = {
    product: PropTypes.object,
}

const mapStateToProps = state => ({
    product: state.product.product
});

export default connect(mapStateToProps, null)(Main);