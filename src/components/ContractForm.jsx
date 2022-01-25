import {
  AppBar,
  colors,
  Avatar,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Box,
  Grid,
  makeStyles,
  Button,
  SvgIcon,
  FormControlLabel,
  Checkbox,
  TextField,
  Link,
  Radio,
  RadioGroup

} from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';

import React, { useState, useEffect, useSetState } from "react";
import { useNavigate } from "react-router-dom";
import { isAwaitExpression } from "typescript";
import Web3 from "web3";
import Escrow from "../truffle_abis/Escrowx.json"
import ReactLoading from 'react-loading';


// Create a theme instance.

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF4B14"
    },
    secondary: {
      main: "#FF4B14"
    },
    error: {
      main: colors.red.A400
    },
    background: {
      default: "#fff"
    }
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));





const ContractForm = () => {
  const [loading, setLoading] = useState(true)


  const [eth, seteth] = useState({ address: '1', benefactor: ' ', benefactee: '' })



  const [ethContract, setethContract] = useState({})
  async function loadWeb3() {

    if (window.ethereum) {

      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

    }
    else if (window.web3) {

      window.web3 = new Web3(window.web3.currentProvider)

    }
    else {
      window.alert("Kindly install Metamask wallet  ")
    }
    const web3 = window.web3
    const account = await web3.eth.getAccounts()

    seteth({ address: account[0], benefactor: ' ', benefactee: '' })
    console.log("fired")
    await loadBlockchainData(account)
  }
  async function loadBlockchainData(acc) {


    console.log("acc", acc)


    const web3 = window.web3


    const networkId = await web3.eth.net.getId()
    const escrowData = await Escrow.networks[networkId]

    if (escrowData) {
      const escrowC = new web3.eth.Contract(Escrow.abi, escrowData.address)
      setethContract({ escrowC })

     

    }

  }





  const navigate = useNavigate();
  const classes = useStyles(theme);

  const [contract, setContract] = useState({
    name: "",
    nationality: "",
    passportNumber: "",
    agreementDate: null,
    whereAgreementExecuted: "",
    infoToBeConfidential: "",
    howToBePaid: "",
    howServiceBeDelivered: "",
    typeOfServiceToProvide: "",
    lookingFor: "",
    business: "",
    email: "",
    address: "",
    ether: 0

  });

  const [errors, setErrors] = useState({});
  const validate = (fieldValues = contract) => {
    // this function will check if the form values are valid
    let temp = { ...errors }

    if ("name" in fieldValues)
      temp.name = fieldValues.name ? "" : "This field is required."
    if ("nationality" in fieldValues)
      temp.nationality = fieldValues.nationality ? "" : "This field is required."
    if ("passportNumber" in fieldValues)
      temp.passportNumber = fieldValues.passportNumber ? "" : "This field is required."
    if ("addresss" in fieldValues)
      temp.addresss = fieldValues.addresss ? "" : "This field is required."

    if ("email" in fieldValues) {
      temp.email = fieldValues.email ? "" : "This field is required."
      if (fieldValues.email)
        temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
          ? ""
          : "Email is not valid."
    }

    if ("business" in fieldValues)
      temp.business = fieldValues.business ? "" : "This field is required."

    if ("lookingFor" in fieldValues)
      temp.lookingFor = fieldValues.lookingFor ? "" : "This field is required."
    if ("typeOfServiceToProvide" in fieldValues)
      temp.typeOfServiceToProvide = fieldValues.typeOfServiceToProvide ? "" : "This field is required."

    if ("howServiceBeDelivered" in fieldValues)
      temp.howServiceBeDelivered = fieldValues.howServiceBeDelivered ? "" : "This field is required."
    if ("howToBePaid" in fieldValues)
      temp.howToBePaid = fieldValues.howToBePaid ? "" : "This field is required."
    if ("infoToBeConfidential" in fieldValues)
      temp.infoToBeConfidential = fieldValues.infoToBeConfidential ? "" : "This field is required."
    if ("whereAgreementExecuted" in fieldValues)
      temp.whereAgreementExecuted = fieldValues.whereAgreementExecuted ? "" : "This field is required."
    if ("agreementDate" in fieldValues)
      temp.agreementDate = fieldValues.agreementDate ? "" : "This field is required."

    if (fieldValues.companyOrIndividual === 'company' && "clientNameItem20" in fieldValues) {
      temp.clientNameItem20 = fieldValues.clientNameItem20 ? "" : "This field is required."
    }
    // if ("message" in fieldValues)
    //   temp.message =
    //     fieldValues.message ? "" : "This field is required."

    setErrors({
      ...temp
    });
  }

  const formIsValid = (fieldValues = contract) => {
    // this function will check if the form values and return a boolean value

    const isValid =
      fieldValues.name &&
      fieldValues.nationality &&
      fieldValues.email &&
      fieldValues.business &&
      fieldValues.lookingFor &&
      fieldValues.typeOfServiceToProvide &&
      fieldValues.howServiceBeDelivered &&
      fieldValues.howToBePaid &&
      fieldValues.infoToBeConfidential &&
      fieldValues.whereAgreementExecuted &&
      fieldValues.agreementDate &&
      (fieldValues.companyOrIndividual === 'company' && fieldValues.clientNameItem20)
    Object.values(errors).every((x) => x === "");

    return isValid;
  }
  const handleChange = (e) => {

    // this function will be triggered by the text field's onBlur and onChange events
    const { name, value } = e.target;
    setContract({ ...contract, [name]: value });
    validate({ [name]: value });
  }


  const handleSubmit = (e) => {
    e.preventDefault();


    console.log(contract);

    //if (formIsValid()) {
    // await postContactForm(values); 
    setContract({ contract: contract });

    navigate('/contract', { state: { contract: contract } });
    // }
  };
  const handleReset = (e) => {

  };

 



  // useEffect(  async() => {

  //    await setTimeout(() => {
  //     console.log('working')
  //   }, 3000)

  //   console.log('TESTEDzz');

  //   window.ethereum.on('chainChanged', () => {
  //     window.location.reload();
  //   })
  //   window.ethereum.on('accountsChanged', () => {
  //     window.location.reload();
  //   })
    
  //   loadWeb3()
  //   setLoading(false)
  // }, []);
  // async function performApiCall () {
  //   const x = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  //   const y = await x.json();

  //   console.log('',y);
  // }


  useEffect(() => {

    
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    })
    window.ethereum.on('accountsChanged', () => {
      window.location.reload();
    })
  console.log("fired")

   loadWeb3()

 
    setLoading(false)
  
 




}, []);

  if (!loading) {

    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <div className={classes.paper}>

            <Typography component="h1" variant="h5">
              A Few Required Details
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField name="name" variant="outlined" required fullWidth label="First Name" onChange={handleChange} onBlur={handleChange} autoFocus {...(errors["name"] && { error: true, helperText: errors["name"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="nationality" variant="outlined" required fullWidth label="Freelancer's Nationality" onChange={handleChange} onBlur={handleChange}  {...(errors["nationality"] && { error: true, helperText: errors["nationality"] })} />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="passportNumber" variant="outlined" required fullWidth label="Freelancer's Passport Number" onChange={handleChange}  {...(errors["passportNumber"] && { error: true, helperText: errors["passportNumber"] })} />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="addresss" variant="outlined" required fullWidth label="Freelancer's physical address" onChange={handleChange} onBlur={handleChange}  {...(errors["addresss"] && { error: true, helperText: errors["addresss"] })} />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="email" variant="outlined" required fullWidth label="Freelancer's email" onChange={handleChange} onBlur={handleChange}  {...(errors["email"] && { error: true, helperText: errors["email"] })} />
                </Grid>


                <Grid item xs={12}>
                  <p>Is the Client a company or individual?</p>

                  <RadioGroup onChange={handleChange} onBlur={handleChange}
                    aria-label="Is the Client a company or individual?"
                    defaultValue=""
                    name="companyOrIndividual"
                  >
                    <FormControlLabel value="company" control={<Radio />} label="Company" onChange={handleChange} />
                    <FormControlLabel value="individual" control={<Radio />} label="Individual" onChange={handleChange} />
                  </RadioGroup>

                </Grid>


                <CustomInputField companyOrIndividual={contract.companyOrIndividual} fieldFor="company" fieldName="clientNameItem20" label="Client's name - item 20" errors={errors} handleChange={handleChange}></CustomInputField>
                <CustomInputField companyOrIndividual={contract.companyOrIndividual} fieldFor="company" fieldName="clientCountryOfIncorportation" label="Client's country of incorportation" errors={errors} handleChange={handleChange}></CustomInputField>
                <CustomInputField companyOrIndividual={contract.companyOrIndividual} fieldFor="company" fieldName="clientRegistrationNumber" label="Client's registration number" errors={errors} handleChange={handleChange}></CustomInputField>



                <CustomInputField companyOrIndividual={contract.companyOrIndividual} fieldFor="individual" fieldName="clientName2" label="Client's name" errors={errors} handleChange={handleChange}></CustomInputField>


                <Grid item xs={12}>
                  <TextField name="business" variant="outlined" required fullWidth label="What is the Freelancer's business" onChange={handleChange} onBlur={handleChange}  {...(errors["business"] && { error: true, helperText: errors["business"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="lookingFor" variant="outlined" required fullWidth label="What is the Client looking for" onChange={handleChange} onBlur={handleChange}  {...(errors["lookingFor"] && { error: true, helperText: errors["lookingFor"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="typeOfServiceToProvide" variant="outlined" required fullWidth label="What types of services will the Freelancer provide?" onChange={handleChange} onBlur={handleChange}  {...(errors["typeOfServiceToProvide"] && { error: true, helperText: errors["typeOfServiceToProvide"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="howServiceBeDelivered" variant="outlined" required fullWidth label="How will the Services be delivered?" onChange={handleChange} onBlur={handleChange}  {...(errors["howServiceBeDelivered"] && { error: true, helperText: errors["howServiceBeDelivered"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="howToBePaid" variant="outlined" required fullWidth label="How will the Freelancer be paid?" onChange={handleChange} onBlur={handleChange}  {...(errors["howToBePaid"] && { error: true, helperText: errors["howToBePaid"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="infoToBeConfidential" variant="outlined" required fullWidth label="What information should the Freelancer keep confidentials?" onChange={handleChange} onBlur={handleChange}  {...(errors["infoToBeConfidential"] && { error: true, helperText: errors["infoToBeConfidential"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField name="whereAgreementExecuted" variant="outlined" required fullWidth label="Where will the agreement be executed" onChange={handleChange} onBlur={handleChange}  {...(errors["whereAgreementExecuted"] && { error: true, helperText: errors["whereAgreementExecuted"] })} />
                </Grid>
                <Grid item xs={12}>
                  <TextField type="date" name="agreementDate" variant="outlined" required fullWidth label="What is the date of the agreement?" onChange={handleChange} InputLabelProps={{ shrink: true }} onBlur={handleChange}  {...(errors["agreementDate"] && { error: true, helperText: errors["agreementDate"] })} />
                </Grid>

                <Grid item xs={12}>
                  <TextField name="ether" variant="outlined" required fullWidth label="Payment in eth" onChange={handleChange} onBlur={handleChange}  {...(errors["Payment"] && { error: true, helperText: errors["Payment"] })} />
                </Grid>

              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              {/* <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
            </form>
          </div>

        </Container>
      </ThemeProvider>
    );

  }
  else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} ><ReactLoading type={"spin"} color={"orange"} height={'20%'} width={'20%'} /></div>)
  }

}



const CustomInputField = (props) => {
  if (!props.companyOrIndividual) { return (<div></div>) }
  if (props.companyOrIndividual === 'individual' && props.fieldFor === 'company') {
    return (
      <div></div>
    )
  }
  if (props.companyOrIndividual === 'company' && props.fieldFor === 'individual') {
    return (
      <div></div>
    )
  }
  return (
    <Grid item xs={12}>
      <TextField name={props.fieldName} variant="outlined" required fullWidth label={props.label} onChange={props.handleChange} onBlur={props.handleChange}  {...(props.errors[props.fieldname] && { error: true, helperText: props.errors[props.fieldname] })} />
    </Grid>
  )
};

export default ContractForm;

