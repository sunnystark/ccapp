import React, { Component } from 'react';
import AppBar from '../_components/appbar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Nav from '../_components/nav'; 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { vendorAction } from '../_actions';
import { withRouter } from 'react-router-dom';


const drawerWidth = 240;

const styles = theme => ({

    root: {
        flexGrow: 1,
      },

  contentRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  appFrame: {
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class AddVendor extends Component {

    state = {
        Limit:'',
        Name:'',
        Cn:'',
        Balance:''
    }

   
  
    handleChange = prop => event => {
        const { dispatch } = this.props;
        dispatch(vendorAction.onChangeProps(prop, event));
    };

    componentDidMount() {
        const { match : {params } } = this.props;

        if(params.id){
            const { dispatch } = this.props;
            dispatch(vendorAction.getVendorById(params.id));
        }
    }


    handleClick(event){
        const { match : {params } } = this.props;
        const { dispatch } = this.props;
        const Name = this.props.vendor.name;
        const mobile = this.props.vendor.mobile;
        const phone_number = this.props.vendor.phone_number;
        const address = this.props.vendor.address;
        let CnIsValid = false;
        let nameIsValid = false;
        let addressIsValid = false;
        let phoneNoIsValid = false;

            
 
        if (mobile === ""  || !mobile) {
            this.setState({
                Cn: 'Required'
            });
        } else {

        if( isNaN(mobile) && /\D/.test(mobile)){ 
            console.log('hello')
            CnIsValid = true;
            this.setState({
                Cn: "card number input must be numeric "
            });
        }
            else {
                this.setState({
                    Cn: null
                });
            }
        }
        if (Name === "" ) {
            this.setState({
                Name: 'Required'
            });
        } 
        else if(!/^[a-zA-Z]*$/g.test(Name)){
            this.setState({
                Name: 'Input should be String '
            });

        }
        else {
            if (Name.length >= 3) {
                nameIsValid = true 
                this.setState({
                   Name: null
                });
            } else {
                this.setState({
                   Name: "Sorry, this is not a valid name"
                });
            }
        }
        if (address === "") {
            this.setState({
                Limit: 'Required'
            });
        } else {
            if (address.length >= 1) {
                addressIsValid = true
                this.setState({
                   Limit: null
                });
            } else {
                this.setState({
                   Limit: "Limit would be at least $0"
                });
            }
        }
        if (phone_number === "") {
            this.setState({
                Balance: 'Required'
            });
        } else {
            if (phone_number.length >= 1) {
                phoneNoIsValid = true
                this.setState({
                   Balance: null
                });
            } else {
                this.setState({
                   Balance: "Limit would be a $0"
                });
            }
        }

       if(CnIsValid && addressIsValid && phoneNoIsValid && nameIsValid === true) {
              console.log('null ')
       }
        else{
            
            let payload={
                Name: this.props.vendor.name,
                mobile: this.props.vendor.mobile,
                phone_number: this.props.vendor.phone_number,
                address: this.props.vendor.address,
            }
            if(params.id){
                dispatch(vendorAction.editVendorInfo(params.id, payload));
            }else{
                dispatch(vendorAction.createVendor(payload));
            }
        }
        
       }
       

render() {
     const { classes } = this.props;
     const { match : {params } } = this.props;
     console.log(this.props.vendor);
    
     

     function InsertText(props) {
        return <Typography>{'Add New Vendor Card'}</Typography>;
      }
      
      function EditText(props) {
          return <Typography>{'Edit Vendor Card'}</Typography>;
      }


    function SegHeader() {
        if(params.id){
            return <EditText />;
        }
        return <InsertText />;
    }
     
      return (
        
        <div className={classes.root}>
            <div className={classes.appFrame}>
            <AppBar/>
            <Nav />
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <SegHeader />
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={3} container justify="flex-end">                            
                    </Grid>
                </Grid>
                <br />
                <br />
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <div>
                            <Paper className={classes.contentRoot} elevation={1}>
                                <form className={classes.container}>
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="name"
                                                label="Name"
                                                className={classes.textField}
                                                value={this.props.vendor.name}
                                                onChange={this.handleChange('name')}
                                                margin="normal"
                                                helperText={this.state.Name}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="mobile"
                                                label="Card Number"
                                                className={classes.textField}
                                                value={this.props.vendor.mobile}
                                                onChange={this.handleChange('mobile')}
                                                margin="normal"
                                                helperText={this.state.Cn}
                                                inputProps = {{ maxLength: 10}}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="phone_number"
                                                label="Balance"
                                                className={classes.textField}
                                                value={this.props.vendor.phone_number}
                                                onChange={this.handleChange('phone_number')}
                                                margin="normal"
                                                helperText={this.state.Balance}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="address"
                                                label="Limit"
                                                multiline
                                                rowsMax="4"
                                                className={classes.textField}
                                                value={this.props.vendor.address}
                                                onChange={this.handleChange('address')}
                                                margin="normal"
                                                min='0'
                                                helperText={this.state.Limit}
                                            />
                                        </Grid>
                                    </Grid>
                                    <br />
                                    <Grid container spacing={24}>
                                        <Grid item xs={3}>
                                        </Grid>
                                        <Grid item xs={6}>
                                        </Grid>
                                        <Grid item xs={3} container justify="center">
                                            <Grid container spacing={24}>
                                                <Grid item xs={6} container justify="center">
                                                    <Button variant="contained" color="secondary" className={classes.button} component='a' href="/vendor">
                                                        Cancel
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={6} container justify="flex-start">
                                                    <Button variant="contained" color="primary" className={classes.button} onClick={(event) => this.handleClick(event)}>
                                                        Save
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </form>
                            </Paper>
                        </div>
                    </Grid>
                </Grid>
            </main>
            </div>
        </div>
      );
   }
}

//export default Home;

AddVendor.propTypes = {
    classes: PropTypes.object.isRequired,
};


//export default BoxCon
const mapStateToProps = (state) =>{
    return state;
}


const connectedAddVendorPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(AddVendor)));

export { connectedAddVendorPage as AddVendor };