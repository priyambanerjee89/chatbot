import React from 'react';

const QuickReply = ( props ) => {
    if ( props.reply.structValue.fields.payload ) {
        return <a style={{ margin: 3 }} href="/" 
            onClick={ event => props.click(
                        event,
                        props.reply.structValue.fields.payload.stringValue,
                        props.reply.structValue.fields.text.stringValue
            )}
            className="waves-effect waves-light btn-large teal">{ props.reply.structValue.fields.text.stringValue }</a>
    }
    else {
        return <a className="waves-effect waves-light btn-large teal" target="_blank" rel="noopener" href={ props.reply.structValue.fields.link.stringValue }>{ props.reply.structValue.fields.text.stringValue }</a>
    }
}

export default QuickReply;