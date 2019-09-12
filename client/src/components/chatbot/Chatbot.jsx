import React, { Component } from 'react';
import axios from 'axios/index';
import Message from './Message';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import Card from './Card';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

class Chatbot extends Component {

    constructor(props) {
        super(props);

        this.messagesEnd = React.createRef();
        this.inputField = React.createRef();

        if( cookies.get('userID') === undefined ) {
            cookies.set( 'userID', uuid(), { path: '/' } );
        }
        console.log(cookies.get('userID'));
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.state = {
            messages: []
        }
    }

    async df_text_query( text ) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };

        this.setState({ messages: [...this.state.messages, says] });
        const res = await axios.post('/api/df_text_query', { text: text, userID: cookies.get('userID') });
        for( let msg of res.data.fulfillmentMessages ) {
            says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({ messages: [...this.state.messages, says] });
        }

    }

    async df_event_query( event ) {
        const res = await axios.post('/api/df_event_query', { event: event, userID: cookies.get('userID')  });
        for( let msg of res.data.fulfillmentMessages ) {
            let says = {
                speaks: 'bot',
                msg: msg
            };
            this.setState({ messages: [...this.state.messages, says] });
        }
    }

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.current.scrollIntoView( { behavior: 'smooth' } );
        this.inputField.current.focus();
    }

    _handleQuickReplyPayload( event, payload, text ) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query( text );
    }

    renderCards( cards ) {
        return cards.map( ( card, i ) => <Card key={ i } payload={ card.structValue } /> );
    }

    renderOneMessage( message, i ) {
        console.log(message);
        if ( message.msg && message.msg.text && message.msg.text.text ) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
        }
        else if( message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.cards ) {
            return <div key={ i }>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{ overflow: 'hidden' }}>
                        <div className="col s2">
                            <a className="btn-floating btn-large waves-effect waves-light red">
                                { message.speaks }
                            </a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll' }}>
                           <div style={{ height: 300, width: message.msg.payload.fields.cards.listValue.values.length * 270 }}>
                                { this.renderCards( message.msg.payload.fields.cards.listValue.values ) }
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        else if( message.msg && message.msg.payload && message.msg.payload.fields && message.msg.payload.fields.quick_replies ) {
            return <QuickReplies
                    text={ message.msg.payload.fields.text ? message.msg.payload.fields.text : null } 
                    key={ i }
                    replyClick={ this._handleQuickReplyPayload }
                    speaks={ message.speaks }
                    payload={ message.msg.payload.fields.quick_replies.listValue.values }
                    />
        }
    }

    renderMessages( stateMessages ) {
        if ( stateMessages ) {
            return stateMessages.map( ( message, i ) => {
                return this.renderOneMessage( message, i );
            });
        }
        else {
            return null;
        }
    }

    _handleInputKeyPress( e ) {
        if( e.key === 'Enter' ) {
            this.df_text_query( e.target.value );
            e.target.value = '';
        }
    }
    
    render() {
        return (
            <div style={{ height: 500, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgrey' }}>
                <nav>
                    <div className="nav-wrapper">
                        <a style={{ paddingLeft: '10px' }} className="brand-logo">Chatbot</a>
                    </div>
                </nav>
                <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto' }}>
                    { this.renderMessages( this.state.messages ) }
                    <div ref={ this.messagesEnd } 
                        style={{ float: 'left', clear: 'both' }}></div>
                </div>
                <div className="col s12">
                    <input style={{ margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%' }} placeholder="type a message" ref={ this.inputField } type="text" onKeyPress={ this._handleInputKeyPress }/>
                </div>
            </div>
        )
    }

}

export default Chatbot;