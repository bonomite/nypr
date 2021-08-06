import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Hidden,
  IconButton,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import NavigationDrawer from '../../shared/components/NavigationDrawer';
import SVG from 'react-inlinesvg';

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.darkBlack,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    color: theme.palette.common.white,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
});

function NavBar(props) {
  const {
    classes,
    selectedTab,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
  } = props;
  const menuItems = [
    {
      link: '/',
      name: 'Home',
      icon: <HomeIcon className="text-white" />,
    },
    {
      link: '/about',
      name: 'About',
      icon: <InfoIcon className="text-white" />,
    },
  ];
  return (
    <div className={ classes.root }>
      <AppBar position="fixed" className={ classes.appBar }>
        <Toolbar className={ classes.toolbar }>

          <SVG
            description="TMDB Logo"
            loader={ <span>Loading...</span> }
            src="images/logo.svg"
            title="TMDB Logo"
            width={ 120 }
            height={ 40 }
          />

          <div>
            <Hidden mdUp>
              <IconButton
                className={ classes.menuButton }
                onClick={ handleMobileDrawerOpen }
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map(element => {
                if (element.link) {
                  return (
                    <Link
                      key={ element.name }
                      to={ element.link }
                      className={ classes.noDecoration }
                      onClick={ handleMobileDrawerClose }
                    >
                      <Button
                        size="large"
                        classes={ {text: classes.menuButtonText} }
                      >
                        {element.name}
                      </Button>
                    </Link>
                  );
                }
                return (
                  <Button
                    color="secondary"
                    size="large"
                    onClick={ element.onClick }
                    classes={ {text: classes.menuButtonText} }
                    key={ element.name }
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={ menuItems }
        anchor="right"
        open={ mobileDrawerOpen }
        selectedItem={ selectedTab }
        onClose={ handleMobileDrawerClose }
      />
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
};

export default withStyles(styles, {withTheme: true})(memo(NavBar));
