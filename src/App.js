import React, { Component } from 'react';
import './App.css';
import ResultComponent from './components/ResultComponent';
import KeyPadComponent from "./components/KeyPadComponent";

let decimalAdded = false;
let memo = 0;
class App extends Component {
    constructor(){
        super();

        this.state = {
            result: ""
        }
    }

    onClick = button => {

        if(button === "="){
            this.calculate()
            decimalAdded = false
        }
        else if(button === "MC"){
            decimalAdded = false
            this.setState({
                result: memo
            })
            memo = 0
        }
        else if(button === "MR"){
            decimalAdded = false
            this.setState({
                result: memo
            })
        }
        else if(button ==="M+"){
            memo = parseFloat(this.state.result) + parseFloat(memo)
        }
        else if(button ==="MS"){
            memo = this.state.result
        }

        else if(button === "C"){
            this.reset()
            decimalAdded = false
        }
        else if(button === "CE"){
            this.backspace()
        }
        else if(button === "."){
            if(decimalAdded === false){
                decimalAdded = true
                this.setState({
                    result: this.state.result + button
                })
            }

        }
        else if(button === "+"||button ==="-"||button ==="*"||button==="/"){
            decimalAdded = false
            this.setState({
                result: this.state.result + button
            })
        }

        else {
            this.setState({
                result: this.state.result + button
            })
        }
    };


    calculate = () => {
        var checkResult = ''
        if(this.state.result.includes('--')){
            checkResult = this.state.result.replace('--','-')
        }
        else if(this.state.result.includes('++')){
            checkResult = this.state.result.replace('++','+')
        }
        else if(this.state.result.includes('**')){
            checkResult = this.state.result.replace('**','*')
        }
        else if(this.state.result.includes('//')){
            checkResult = this.state.result.replace('//','/')
        }
        else {
            checkResult = this.state.result
        }

        try {
            this.setState({
                // eslint-disable-next-line
                result: (eval(checkResult) || "" ) + ""
            })
        } catch (e) {
            this.setState({
                result: "error"
            })

        }
    };

    reset = () => {
        this.setState({
            result: ""
        })
    };

    backspace = () => {
        this.setState({
            result: this.state.result.slice(0, -1)
        })
    };

    render() {
        return (
            <div>
                <div className="calculator-body">
                    <h1>Calculadora com Memória</h1>
                    <ResultComponent result={this.state.result}/>
                    <KeyPadComponent onClick={this.onClick}/>
                </div>
            </div>
        );
    }
}

export default App;