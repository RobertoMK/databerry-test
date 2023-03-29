import React, { Component } from 'react'
import axios from 'axios'
import { properties } from '../components/properties.js'
import './home.css'

class Home extends Component {
   
    constructor() {
        super()
        this.state = {
            message : '',
            answers : ''
        };

        this.textLog = React.createRef();
        this.questionBox = React.createRef();
    }

    componentDidUpdate() {
        this.textLog.current.scrollTop = this.textLog.current.scrollHeight;
    }

    handleClick = (event) => {
        this.setState({
            message : event.target.value
        })

            let body = {
                queries: [{
                    query: this.state.message,
                    top_k:1
                }]
            }

            let urlUpdate = properties.server;

            axios.post(urlUpdate, JSON.stringify(body), {
                headers: {
                    'Content-Type': 'application/json',
                    'withCredentials': false,
                    'Authorization': 'Bearer ' + properties.key
                },
            }).then((resp) => {
                let ans = this.state.answers

                ans = ans.concat('\n\n','You: ',this.state.message,'\n\n','DataBerry: ',resp.data.results[0].results[0].text);
                this.questionBox.value = ''
                
                this.setState({
                    answers : ans
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
                            <input type="text" ref={this.questionBox} placeholder="Type your question here" value={this.state.value} onChange={this.handleChange} />
                            <div className="sendButton" onClick={this.handleClick}>Send</div>
                        </div>
                        <div className="answerContainer">
                            <textarea ref={this.textLog} value={this.state.answers} />
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Home;