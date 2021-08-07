import React, {useState} from 'react';
import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {Tween} from 'react-gsap';

const FavoriteHeart = ({
  data,
  localStorageArr,
}) => {

  const [ heartSelected, setHeartSelected] = useState(localStorageArr.includes(data.id) ? true : false);

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = data.id;

    if(!localStorageArr.includes(id)){
      localStorageArr.push(id);
      setHeartSelected(true);
      localStorage.setItem('allFavoriteMoviesArr', JSON.stringify(localStorageArr));
    }else{
      var index = localStorageArr.indexOf(id);
      if (index > -1) {
        localStorageArr.splice(index, 1);
        setHeartSelected(false);
        localStorage.setItem('allFavoriteMoviesArr', JSON.stringify(localStorageArr));
      }
    }
  };

  return (
    <>
      {
        heartSelected
          ?
          <Tween
            from={{scale:1.5}}
            duration={0.2}
          >
            <FavoriteIcon
              onClick={ handleFavorite }
              className="favorite"
            />
          </Tween>
          :
          <FavoriteBorderIcon
            onClick={ handleFavorite }
            className="favorite"
          />
      }
    </>

  );
};

FavoriteHeart.defaultProps = {
  data: [],
  localStorageArr: [],
};

FavoriteHeart.propTypes = {
  data: PropTypes.object,
  localStorageArr: PropTypes.array,

};

export default FavoriteHeart;
