import React, { useState , useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
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
  RadioGroup,
} from "@material-ui/core";
import Web3 from "web3";
import Escrow from "../truffle_abis/Escrowx.json"
import ReactLoading from 'react-loading';

import { createTheme } from "@material-ui/core/styles";
const web3 = window.web3
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF4B14",
    },
    secondary: {
      main: "#FF4B14",
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ContractReadOnly = () => {

  const [eth, seteth]=  useState({ address: '1', benefactor: ' ', benefactee: '' })
  const [loading, setLoading] = useState(true)
  const [isFinished, setfinished] = useState(true)

  const [ethContract, setethContract  ] = useState({})
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
  const account = await  web3.eth.getAccounts()

  seteth({address: account[0] , benefactor:' ' , benefactee: ''})
  console.log("fired")
  await loadBlockchainData(account)
  }
  async function loadBlockchainData(acc) {





    const web3 = window.web3
    

    const networkId = await web3.eth.net.getId()
    const escrowData = await Escrow.networks[networkId]

    if (escrowData ) {
      const escrowC = new web3.eth.Contract(Escrow.abi, escrowData.address)
      setethContract({ escrowC })
    
     
    }
  
  }


  useEffect(   () => {
 

    
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

  const { state } = useLocation();
  console.log(state)
  const navigate = useNavigate();
  const [formState, setformState] = useState({
    value: "overlay popup-hidden",
    email: "",
    ether: state.contract.ether
  });
  const classes = useStyles(theme);

  if (!state) {
    navigate("/contractform");
    return;
  }
  const { contract } = state;

  const handOpenPopup = (e) => {
    e.preventDefault(); 
    setformState({ ...formState, ["value"]: "overlay popup-visible" }); 
  };

  const handClosePopup = (e) => {
    e.preventDefault();
    setformState({ ...formState, ["value"]: "overlay popup-hidden" }); 
  };

  const handleChange2 = (e) => {
    //setformState({ email: e.target.value });
    console.log(e.target.value);
    setformState({ ...formState, ["email"]: e.target.value });
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    setformState({ ...formState, ["value"]: "overlay popup-hidden" }); 
    console.log(formState);
  };

  const handleSign1 = (e) => {
 console.log(ethContract)
  ethContract.escrowC.methods.sign().send({from: eth.address}).on('transactionHash', (hash) => {
     setLoading(false)
    })
    e.preventDefault();
    
   
  };
  const handleSign2 = async (e) => {
    let data = await ethContract.escrowC.methods.benefactorData(eth.address).call()
    console.log(data.escrowBenefactee)
    ethContract.escrowC.methods.releaseTokens(eth.address).send({from: eth.address}).on('transactionHash', (hash) => {
      setLoading(false)
     })
    e.preventDefault();
    console.log(formState);
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="contract-container">
        
      
      <Grid item xs={12}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              
             
              className={classes.submit}
              onClick={handleSign1}
            >
              contract in In Progress...
            </Button>
          </Grid>
        <h2 className="center m-b">FREELANCER AGREEMENT</h2>

        <p className="center m-b bold">
          DATED{" "}
          {!contract.agreementDate
            ? "__________________"
            : contract.agreementDate}
        </p>

        <p>
          <b>THIS FREELANCER AGREEMENT</b> (this <b>Agreement</b>) is entered
          into on the date indicated above (the Effective Date) between:
        </p>

        <p>
          {!contract.name ? "________________" : contract.name}, a{" "}
          {!contract.nationality ? "________________" : contract.nationality}{" "}
          national with passport number{" "}
          {!contract.passportNumber
            ? "________________"
            : contract.passportNumber}
          , whose address is at{" "}
          {!contract.address ? "________________" : contract.address} email:{" "}
          {!contract.address ? "________________" : contract.address}{" "}
          (hereinafter referred as the Freelancer); AND
        </p>

        <p>
          ________________, a ________________ national with passport number
          ___________________, whose address is at ______________email:
          __________________(hereinafter referred as the Client)
        </p>

        <p>
          __________________________, a company registered in
          _____________________with commercial registration number
          ______________________, whose address is
          ____________________________________________________, duly represented
          by its ____________________, ________________email:
          _______________(hereinafter referred to as the Client).
        </p>

        <p>
          The Freelancer and the Client shall be referred to, individually, as a
          Party, and, together as the Parties.{" "}
        </p>

        <p>
          <b>WHEREAS:</b>
        </p>

        <p>(A) The Freelancer is __________________.</p>

        <p>(B) The Client wants to ____________________________.</p>

        <p>
          (C) The Client wishes to hire the Freelancer for the performance of
          the Services as set forth below and the Freelancer is willing to
          complete the Services.
        </p>

        <p>THEREFORE, the Parties agree as follows:</p>

        <p>
          <b>SERVICES</b>
        </p>

        <p>
          The Client hereby hires the Freelancer to perform the following
          services (the Services):
        </p>

        <p>__________________________________,</p>

        <p>
          or other such services as mutually agreed upon in writing by the
          Parties.
        </p>

        <p>
          The manner in which the Services are to be performed is determined as
          follows: _______________.
        </p>

        <p>
          In consideration for the Services to be performed by the Freelancer,
          the Client agrees to pay the Freelancer as follows:
          ______________________________________.
        </p>

        <p>
          <b>EXPENSES</b>
        </p>

        <p>
          Except as otherwise specified in this Agreement, Client shall
          reimburse Freelancer for all pre-approved, reasonable and necessary
          costs and expenses incurred in connection with the performance of the
          Services.
        </p>

        <p>
          <b>TERM AND TERMINATION</b>
        </p>

        <p>
          Unless terminated earlier pursuant to the Clause below, the term of
          this Agreement shall commence as of the Effective Date and shall
          terminate upon completion of the Services, or any other date agreed
          upon between the Parties in writing.{" "}
        </p>

        <p>
          <b>INDEPENDENT CONTRACTOR STATUS</b>
        </p>

        <p>
          The Parties agree and acknowledge that Freelancer is an independent
          contractor and is not, for any purpose, an employee of Client.
          Freelancer does not have any authority to enter into agreements or
          contracts on behalf of Client, and shall not represent that it
          possesses any such authority. Freelancer shall not be entitled to any
          of Client's benefits, including, but not limited to, coverage under
          medical, dental, retirement, or other plans. Client shall not be
          obligated to pay worker's compensation insurance, unemployment
          compensation, social security tax, withholding tax, or other taxes or
          withholdings for or on behalf of the Freelancer in connection with the
          performance of the Services under this Agreement. Nothing contained in
          this Agreement shall be deemed or construed by the Parties to create
          the relationship of a partnership, a joint venture, or any other
          fiduciary relationship.
        </p>

        <p>
          <b>OWNERSHIP OF WORK PRODUCT</b>
        </p>

        <p>
          The Parties agree that all work product, information or other
          materials created and developed by Freelancer in connection with the
          performance of the Services under this Agreement and any resulting
          intellectual property rights (collectively, the Work Product) are the
          sole and exclusive property of Client. The Parties acknowledge that
          the Work Product shall, to the extent permitted by law, be considered
          a “work made for hire”. If the work product is not deemed to be a
          “work made for hire”, then Freelancer hereby assigns to Client all of
          Freelancer's rights, title, and interest in and to the Work Product,
          including but not limited to all copyrights, publishing rights and
          rights to use, reproduce and otherwise exploit any and all formats,
          media, or all channels, whether now known or hereafter created.
        </p>

        <p>
          <b>CONFIDENTIALITY</b>
        </p>

        <p>
          The Freelancer agrees not to disclose or communicate, in any manner,
          either during or after Freelancer’s agreement with the Client, any
          Confidential Information to any third party without the prior written
          consent of the Client. The Freelancer shall not make use of any
          Confidential Information for the Freelancer’s own purposes, or through
          any failure to exercise due care and diligence, cause any unauthorized
          disclosure of Confidential Information. “Confidential Information”
          means any information or material possessed by or relating to the
          Client, in whatever form including, without limitation, written, oral,
          visual or electronic form, or on tape or disk of which Freelancer may
          obtain knowledge, directly or indirectly, through or as a result of
          Freelancer’s agreement with the Client, including, without limitation,
          any and all materials,
          __________________________________________________________________or
          other documents, including documents prepared by the Freelancer, which
          contain or otherwise reflect such information as described above.
        </p>

        <p>
          The Freelancer is bound by the confidentiality provisions of this
          Agreement, and the Freelancer may not use the Confidential
          Information, whether, directly or indirectly, for the benefit of third
          parties.
        </p>

        <p>
          Upon termination of this Agreement, the Freelancer shall deliver all
          records, notes, data, memoranda, models, and products of any nature
          that are in the Freelancer’s possession or under the Freelancer
          control and that is the Client's property or relates to the Client's
          business.
        </p>

        <p>MUTUAL REPRESENTATIONS AND WARRANTIES</p>

        <p>
          Both Client and Freelancer represent and warrant that each Party has
          full power, authority, and right to execute and deliver this
          Agreement, has full power and authority to perform its obligations
          under this Agreement, and has taken all necessary action to authorize
          the execution and delivery of this Agreement. No other consents are
          necessary to enter into or perform this Agreement.
        </p>

        <p>FREELANCER REPRESENTATION AND WARRANTIES</p>

        <p>
          Freelancer represents and warrants that it has all the necessary
          licenses, permits, and registrations, if any, required to perform the
          Services under this Agreement in accordance with applicable federal,
          state and local laws, rules and regulations and that it will perform
          the Services according to the Client's guidelines and specifications
          and with the standard of care prevailing in the industry.
        </p>

        <p>
          <b>GOVERNING LAW AND JURISDICTION</b>
        </p>

        <p>
          This Agreement shall be governed by the laws of
          __________________________________. The Parties agree that, should any
          litigation arise out of, in connection with, or relating to this
          Agreement, such litigation will be commenced in the courts of
          _______________________________. The Parties specifically agree that
          these courts shall have personal jurisdiction and venue.
        </p>

        <p>
          <b>BINDING EFFECT</b>
        </p>

        <p>
          This Agreement shall be binding upon and inure to the benefit of the
          Parties and their respective successors and permitted assigns
        </p>

        <p>
          <b>ASSIGNMENT.</b>
        </p>

        <p>
          The interests of Freelancer are personal to Freelancer and cannot be
          assigned, transferred, or sold without the prior written consent of
          Client.
        </p>

        <p>
          <b>ENTIRE AGREEMENT</b>
        </p>

        <p>
          This Agreement constitutes the entire agreement between the Parties
          hereto with respect to the subject matter hereof, and supersedes all
          prior negotiations, understandings, and agreements of the Parties.
        </p>

        <p>
          <b>AMENDMENTS</b>
        </p>

        <p>
          No supplement, modification, or amendment of this Agreement will be
          binding unless executed in writing by both of the Parties.
        </p>

        <p>
          <b>NOTICES</b>
        </p>

        <p>
          Any notice or other communication given or made to either Party under
          this Agreement shall be in writing and delivered by email to the
          address stated above or to another address as that Party may
          subsequently designate by notice, and shall be deemed given on the
          date of delivery.
        </p>

        <p>
          <b>WAIVER</b>
        </p>

        <p>
          Neither Party shall be deemed to have waived any provision of this
          Agreement or the exercise of any rights held under this Agreement
          unless such waiver is made expressly and in writing. Waiver by either
          Party of a breach or violation of any provision of this Agreement
          shall not constitute a waiver of any subsequent or other breach or
          violation.
        </p>

        <p>
          <b>FURTHER ASSURANCE</b>
        </p>

        <p>
          At the request of one Party, the other Party shall execute and deliver
          such other documents and take such other actions as may be reasonably
          necessary to effect the terms of this Agreement.
        </p>

        <p>
          <b>SEVERABILITY</b>
        </p>

        <p>
          If any provision of this Agreement is held to be invalid, illegal or
          unenforceable in whole or in part, the remaining provisions shall not
          be affected and shall continue to be valid, legal, and enforceable as
          though the invalid, illegal or unenforceable parts had not been
          included in this Agreement.
        </p>

        <p>
          IN WITNESS WHEREOF, this Agreement has been executed and delivered as
          of the date first written above.
        </p>

        <p>Agreed to and accepted by:</p>

        <p>(THE FREELANCER): </p>

        <p>Name: </p>

        <p>_________________</p>

        <p>(SIGNATURE)</p>

        <p>_____________________ </p>

        <p>(DATE)</p>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSign1}
            >
              Sign as Complete
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSign2}
            >
             Confirm Fund Release
            </Button>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
};
export default ContractReadOnly;
