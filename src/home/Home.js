import React, { Component } from 'react'
import axios from 'axios'
import { properties } from '../components/properties.js'
import './home.css'

class Home extends Component {
   
    constructor() {
        super()
        this.state = {
            message : '',
            field:'',
            answers : ''
        };
    }

    componentDidMount() {
        this.scrollToBottom();
      }
    
      componentDidUpdate() {
        this.scrollToBottom();
      }
    
      scrollToBottom() {
        this.el.scrollIntoView({ behavior: 'smooth' });
      }

    handleChange = (event) => {
        this.setState({
            message : event.target.value,
            field : event.target.value
        })
    }

    handleClick = () => {

            let body = {
                queries: [{
                    query: this.state.message,
                    top_k:1
                }]
            }

            let url = properties.server;

            axios.post(url, JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json',
                    'withCredentials': false,
                    'Authorization': 'Bearer ' + properties.key
                },
            }).then((resp) => {
                let ans = this.state.answers
                ans = ans.concat('\n\n','You: ',this.state.message,'\n','DataBerry: ',resp.data.results[0].results[0].text);
                
                this.setState({
                    answers : ans,
                    field: ''
                })
            }).catch(function (error) {
            });

    }

    render() {
        
        return (
            <>
                <div id="panelMain">
                    <div id="panelContent">
                        <div className="text1_container">
                            <div className="title1">Carine's DataBerry</div>
                            <div className="text1">Ask your question in the box below!</div>
                        </div>
                        <div className="questionContainer">
                            <input className="questionBox" type="text" ref={this.questionBox} placeholder="Type your question here" value={this.state.field} onChange={this.handleChange} />
                            <div className="buttonTimer sendButton" onClick={this.handleClick}>Send</div>
                        </div>
                        <div className="answerContainer">
                            <div className="display-linebreak">{this.state.answers}<div ref={el => { this.el = el; }} /></div>
                            <div ref={this.messagesEndRef} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Home;