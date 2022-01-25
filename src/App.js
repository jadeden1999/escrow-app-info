import React, { Component } from 'react'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import PaymentForm from './components/PaymentForm'
import ContractForm from './components/ContractForm'
import ContractDone from './components/Contractdone'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ContractReadOnly from './components/ContractReadOnly'

class App extends Component {
  render() {
    return (
      // <Router>
      //   <div>
      //     <NavBar />

      //     {/* A <Switch> looks through its children <Route>s and
      //       renders the first one that matches the current URL. */}
      //     <Routes >
      //       <Route path="/login" element={LoginForm}/>
      //       <Route path="/payment" element={PaymentForm}/>
      //       <Route path="/" element={LoginForm}/>
      //     </Routes >
      //   </div>
      // </Router>
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="/payment" element={<PaymentForm />} />
          <Route exact path="/contractform" element={<ContractForm />} />
          <Route exact path="/contract" element={<ContractReadOnly />} />
          <Route exact path="/contractdone" element={<ContractDone />} />
          <Route path="*" element={<LoginForm />} />
        </Routes>

      </Router>

    )
  }
}
export default App